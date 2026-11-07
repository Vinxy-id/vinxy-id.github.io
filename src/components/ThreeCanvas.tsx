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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    // Elevated perspective looking down at the spatial topography plane
    camera.position.set(0, 3.8, 5.2);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Master Group container for subtle parallax tilting
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. Responsive Grid Configuration
    // Desktop: 70 x 50 grid points; Mobile: 45 x 35 grid points
    const isMobile = width < 768;
    const cols = isMobile ? 48 : 72;
    const rows = isMobile ? 36 : 52;
    const count = cols * rows;

    // Grid bounds calculated dynamically to cover the full FOV
    const aspect = width / height;
    const xSpan = aspect > 1.2 ? 14.0 : 10.0;
    const zSpan = 11.0;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseCoords = new Float32Array(count * 2); // original x, z

    // Check Theme
    let isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    // Ember palette RGB
    const peakColor = isDark ? new THREE.Color(0xff5a1f) : new THREE.Color(0xc2410c);
    const midColor = isDark ? new THREE.Color(0xff8a4c) : new THREE.Color(0xe05626);
    const troughColor = isDark ? new THREE.Color(0x3a1d12) : new THREE.Color(0xd97706);

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1) - 0.5) * xSpan;
        const z = (r / (rows - 1) - 0.5) * zSpan;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0; // y will be modulated in animate loop
        positions[idx * 3 + 2] = z;

        baseCoords[idx * 2] = x;
        baseCoords[idx * 2 + 1] = z;

        // Initial default color
        colors[idx * 3] = peakColor.r;
        colors[idx * 3 + 1] = peakColor.g;
        colors[idx * 3 + 2] = peakColor.b;

        idx++;
      }
    }

    const waveGeo = new THREE.BufferGeometry();
    waveGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Dynamic point material with vertexColors enabled
    const waveMat = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.042,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.95,
      sizeAttenuation: true,
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    masterGroup.add(wavePoints);

    // Accent constellation particles orbiting around the spatial wave
    const starCount = isMobile ? 50 : 90;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * xSpan * 1.1;
      starPos[i * 3 + 1] = (Math.random() - 0.2) * 4.0;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * zSpan * 1.1;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.03,
      color: isDark ? 0xffc299 : 0x121316,
      transparent: true,
      opacity: isDark ? 0.45 : 0.6,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    masterGroup.add(starPoints);

    // 3. Dynamic Theme Listener
    const updateThemeColors = () => {
      isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      peakColor.set(isDark ? 0xff5a1f : 0xc2410c);
      midColor.set(isDark ? 0xff8a4c : 0xe05626);
      troughColor.set(isDark ? 0x3a1d12 : 0xd97706);
      starMat.color.set(isDark ? 0xffc299 : 0x121316);
      starMat.opacity = isDark ? 0.45 : 0.6;
      waveMat.opacity = isDark ? 0.85 : 0.95;
    };

    window.addEventListener('themechange', updateThemeColors);

    // 4. Mouse & Touch Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseWorldX = 0;
    let mouseWorldZ = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotY = normX * 0.35;
      targetRotX = -normY * 0.25;

      mouseWorldX = normX * (xSpan * 0.4);
      mouseWorldZ = -normY * (zSpan * 0.4);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onDragMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;
      masterGroup.rotation.y += deltaX * 0.005;
      masterGroup.rotation.x += deltaY * 0.005;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onDragMove);

    // Touch support for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normY = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetRotY = normX * 0.25;
        targetRotX = -normY * 0.18;
        mouseWorldX = normX * (xSpan * 0.3);
        mouseWorldZ = -normY * (zSpan * 0.3);
      }
    };
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // 5. Responsive Resize Handler
    const onResize = () => {
      if (!container || !rendererRef.current) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // 6. Smooth Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth parallax follow
      if (!isDragging) {
        masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
        masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;
      }

      // Constellation slow orbit
      starPoints.rotation.y += delta * 0.03;

      // Modulate Wave Elevations & Colors
      const posAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = waveGeo.attributes.color as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const colArr = colAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const x = baseCoords[i * 2];
        const z = baseCoords[i * 2 + 1];

        // Multi-octave harmonic wave (simulating geospatial elevation / fluid wavefield)
        const wave1 = Math.sin(x * 0.55 + time * 1.35) * 0.42;
        const wave2 = Math.cos(z * 0.6 + time * 1.1) * 0.32;
        const wave3 = Math.sin((x * 0.4 + z * 0.4) + time * 0.8) * 0.22;

        // Subtle interactive mouse ripple
        const distToCursor = Math.hypot(x - mouseWorldX, z - mouseWorldZ);
        const ripple = Math.exp(-distToCursor * 0.7) * Math.sin(distToCursor * 3.5 - time * 3.5) * 0.4;

        const y = wave1 + wave2 + wave3 + ripple;
        posArr[i * 3 + 1] = y;

        // Elevation-based dual-tone color interpolation
        // Normalized elevation: -0.8 to +0.8 -> 0 to 1
        const normY = THREE.MathUtils.clamp((y + 0.6) / 1.2, 0, 1);

        let r = 0, g = 0, b = 0;
        if (normY > 0.5) {
          const t = (normY - 0.5) * 2;
          r = THREE.MathUtils.lerp(midColor.r, peakColor.r, t);
          g = THREE.MathUtils.lerp(midColor.g, peakColor.g, t);
          b = THREE.MathUtils.lerp(midColor.b, peakColor.b, t);
        } else {
          const t = normY * 2;
          r = THREE.MathUtils.lerp(troughColor.r, midColor.r, t);
          g = THREE.MathUtils.lerp(troughColor.g, midColor.g, t);
          b = THREE.MathUtils.lerp(troughColor.b, midColor.b, t);
        }

        colArr[i * 3] = r;
        colArr[i * 3 + 1] = g;
        colArr[i * 3 + 2] = b;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener('themechange', updateThemeColors);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onDragMove);
      container.removeEventListener('touchmove', onTouchMove);
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
      className={`relative w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      style={{
        touchAction: 'none',
        maskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 55%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 55%, transparent 100%)',
      }}
      title="Interactive Cyber Wavefield — Drag to pan"
    />
  );
}
