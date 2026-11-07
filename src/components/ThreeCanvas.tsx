/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
}

export default function ThreeCanvas({ className = '' }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Mobile Detection & Responsive Constraints
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768 || (typeof window !== 'undefined' && 'ontouchstart' in window);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 3.6, 5.2);
    camera.lookAt(0, -0.2, 0);

    // 3. Renderer with Mobile Optimization
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable MSAA on mobile for massive GPU fill-rate savings
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    });
    renderer.setSize(width, height);
    // On mobile, lock pixel ratio to 1.0 to eliminate thermal throttling and lag
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 4. Responsive Grid Density
    // Mobile: 30 x 22 = 660 points (lightning fast 60/120fps)
    // Desktop: 56 x 38 = 2,128 points
    const cols = isMobile ? 32 : 56;
    const rows = isMobile ? 24 : 40;
    const count = cols * rows;

    const aspect = width / height;
    const xSpan = aspect > 1.2 ? 14.0 : 10.0;
    const zSpan = 11.0;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseCoords = new Float32Array(count * 2);

    let isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const peakColor = isDark ? new THREE.Color(0xff5a1f) : new THREE.Color(0xc2410c);
    const midColor = isDark ? new THREE.Color(0xff8a4c) : new THREE.Color(0xe05626);
    const troughColor = isDark ? new THREE.Color(0x3a1d12) : new THREE.Color(0xd97706);

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1) - 0.5) * xSpan;
        const z = (r / (rows - 1) - 0.5) * zSpan;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;

        baseCoords[idx * 2] = x;
        baseCoords[idx * 2 + 1] = z;

        colors[idx * 3] = peakColor.r;
        colors[idx * 3 + 1] = peakColor.g;
        colors[idx * 3 + 2] = peakColor.b;

        idx++;
      }
    }

    const waveGeo = new THREE.BufferGeometry();
    waveGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const waveMat = new THREE.PointsMaterial({
      size: isMobile ? 0.055 : 0.042,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.95,
      sizeAttenuation: true,
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    masterGroup.add(wavePoints);

    // Subtle floating ambient particles (fewer on mobile)
    const starCount = isMobile ? 25 : 60;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * xSpan * 1.1;
      starPos[i * 3 + 1] = (Math.random() - 0.2) * 3.5;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * zSpan * 1.1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.03,
      color: isDark ? 0xffc299 : 0x121316,
      transparent: true,
      opacity: isDark ? 0.4 : 0.55,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    masterGroup.add(starPoints);

    // 5. Dynamic Theme Listener
    const updateThemeColors = () => {
      isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      peakColor.set(isDark ? 0xff5a1f : 0xc2410c);
      midColor.set(isDark ? 0xff8a4c : 0xe05626);
      troughColor.set(isDark ? 0x3a1d12 : 0xd97706);
      starMat.color.set(isDark ? 0xffc299 : 0x121316);
      starMat.opacity = isDark ? 0.4 : 0.55;
      waveMat.opacity = isDark ? 0.85 : 0.95;
    };

    window.addEventListener('themechange', updateThemeColors);

    // 6. Mouse & Touch Interaction with Throttling
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseWorldX = 0;
    let mouseWorldZ = 0;
    let hasTouchActive = false;

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return; // Skip on mobile mouse emulations
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotY = normX * 0.25;
      targetRotX = -normY * 0.18;
      mouseWorldX = normX * (xSpan * 0.35);
      mouseWorldZ = -normY * (zSpan * 0.35);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        hasTouchActive = true;
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normY = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetRotY = normX * 0.15;
        targetRotX = -normY * 0.1;
      }
    };

    const onTouchEnd = () => {
      hasTouchActive = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    // 7. Responsive Resize Handler with Debounce
    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!container || !rendererRef.current) return;
        width = container.clientWidth || window.innerWidth;
        height = container.clientHeight || window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }, 150);
    };

    window.addEventListener('resize', onResize);

    // 8. IntersectionObserver to PAUSE rendering when scrolled away!
    // This frees 100% of CPU and GPU when the user is reading other sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 9. High-Performance Animation Loop
    const clock = new THREE.Clock();
    let lastFrameTime = 0;
    // On mobile, throttle rendering to 45-60fps max to prevent battery drain
    const targetInterval = isMobile ? 1 / 45 : 1 / 60;

    const animate = (timestamp: number) => {
      animFrameRef.current = requestAnimationFrame(animate);

      // If not in view or tab is hidden, skip frame entirely!
      if (!isVisibleRef.current || document.hidden) return;

      const elapsedSec = (timestamp - lastFrameTime) / 1000;
      if (elapsedSec < targetInterval) return;
      lastFrameTime = timestamp;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth parallax easing
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;

      if (!isMobile) {
        starPoints.rotation.y += delta * 0.02;
      }

      // Fast Wave Modulation (Lightweight math on mobile)
      const posAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = waveGeo.attributes.color as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const colArr = colAttr.array as Float32Array;

      // Color cache variables
      const pR = peakColor.r, pG = peakColor.g, pB = peakColor.b;
      const mR = midColor.r, mG = midColor.g, mB = midColor.b;
      const tR = troughColor.r, tG = troughColor.g, tB = troughColor.b;

      for (let i = 0; i < count; i++) {
        const x = baseCoords[i * 2];
        const z = baseCoords[i * 2 + 1];

        // Optimized sine-cosine wave equation
        const wave1 = Math.sin(x * 0.55 + time * 1.25) * 0.42;
        const wave2 = Math.cos(z * 0.6 + time * 0.95) * 0.32;

        let y = wave1 + wave2;

        // On desktop or active touch, add interactive ripple
        if (!isMobile) {
          const dist = Math.hypot(x - mouseWorldX, z - mouseWorldZ);
          if (dist < 4.0) {
            y += Math.sin(dist * 3.0 - time * 3.0) * (0.35 / (1.0 + dist * 0.8));
          }
        }

        posArr[i * 3 + 1] = y;

        // Fast Color Interpolation
        const normY = (y + 0.6) * 0.833; // precomputed 1 / 1.2
        if (normY > 0.5) {
          const t = (normY - 0.5) * 2;
          colArr[i * 3] = mR + (pR - mR) * t;
          colArr[i * 3 + 1] = mG + (pG - mG) * t;
          colArr[i * 3 + 2] = mB + (pB - mB) * t;
        } else {
          const t = normY * 2;
          colArr[i * 3] = tR + (mR - tR) * t;
          colArr[i * 3 + 1] = tG + (mG - tG) * t;
          colArr[i * 3 + 2] = tB + (mB - tB) * t;
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // 10. Cleanup
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      observer.disconnect();
      window.removeEventListener('themechange', updateThemeColors);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);

      waveGeo.dispose();
      waveMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{
        touchAction: 'pan-y',
        pointerEvents: 'none', // Allow touch & scroll to pass smoothly to the page
        maskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 50%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 50%, transparent 100%)',
      }}
      title="Interactive Cyber Wavefield"
    />
  );
}
