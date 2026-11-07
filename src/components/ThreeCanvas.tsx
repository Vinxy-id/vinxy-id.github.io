/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
}

// Vertex shader running directly on GPU micro-cores
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorPeak;
  uniform vec3 uColorMid;
  uniform vec3 uColorTrough;
  uniform float uPixelRatio;
  uniform float uPointSize;

  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    // GPU-accelerated harmonic multi-octave wave
    float wave1 = sin(pos.x * 0.55 + uTime * 1.35) * 0.42;
    float wave2 = cos(pos.z * 0.60 + uTime * 1.10) * 0.32;
    float wave3 = sin((pos.x * 0.38 + pos.z * 0.38) + uTime * 0.85) * 0.22;

    // Interactive ripple emanating from cursor/touch point
    float dist = length(vec2(pos.x - uMouse.x, pos.z - uMouse.y));
    float ripple = sin(dist * 3.2 - uTime * 3.5) * (0.42 / (1.0 + dist * 0.7));

    float y = wave1 + wave2 + wave3 + ripple;
    pos.y = y;

    // Dynamic ember elevation gradient computed natively on GPU
    float normY = clamp((y + 0.6) / 1.2, 0.0, 1.0);
    if (normY > 0.5) {
      float t = (normY - 0.5) * 2.0;
      vColor = mix(uColorMid, uColorPeak, t);
    } else {
      float t = normY * 2.0;
      vColor = mix(uColorTrough, uColorMid, t);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation: circular points naturally scale with distance
    gl_PointSize = (uPointSize * uPixelRatio) / -mvPosition.z;
  }
`;

// Fragment shader rendering smooth circular glowing beads
const fragmentShader = `
  varying vec3 vColor;
  uniform float uOpacity;

  void main() {
    // Convert square sprite to antialiased circular bead
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Smooth Gaussian-like glowing falloff
    float alpha = smoothstep(0.5, 0.08, dist) * uOpacity;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function ThreeCanvas({ className = '' }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 3.6, 5.2);
    camera.lookAt(0, -0.2, 0);

    // 2. Hardware-Accelerated Renderer
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

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 3. Dense Grid Points (Now possible with ZERO lag thanks to GPU Vertex Shaders!)
    const cols = isMobile ? 54 : 72;
    const rows = isMobile ? 38 : 50;
    const count = cols * rows;

    const aspect = width / height;
    const xSpan = aspect > 1.2 ? 14.0 : 10.5;
    const zSpan = 11.0;

    const positions = new Float32Array(count * 3);
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1) - 0.5) * xSpan;
        const z = (r / (rows - 1) - 0.5) * zSpan;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0; // modulated on GPU!
        positions[idx * 3 + 2] = z;
        idx++;
      }
    }

    const waveGeo = new THREE.BufferGeometry();
    waveGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // 4. Uniforms & ShaderMaterial
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const peakColor = isDark ? new THREE.Color(0xff5a1f) : new THREE.Color(0xc2410c);
    const midColor = isDark ? new THREE.Color(0xff8a4c) : new THREE.Color(0xe05626);
    const troughColor = isDark ? new THREE.Color(0x3a1d12) : new THREE.Color(0xd97706);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uColorPeak: { value: peakColor },
      uColorMid: { value: midColor },
      uColorTrough: { value: troughColor },
      uOpacity: { value: isDark ? 0.88 : 0.95 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uPointSize: { value: isMobile ? 32.0 : 28.0 },
    };

    const waveMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    masterGroup.add(wavePoints);

    // Ambient floating star constellation
    const starCount = isMobile ? 40 : 80;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * xSpan * 1.15;
      starPos[i * 3 + 1] = (Math.random() - 0.2) * 3.8;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * zSpan * 1.15;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.035,
      color: isDark ? 0xffc299 : 0x121316,
      transparent: true,
      opacity: isDark ? 0.45 : 0.6,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    masterGroup.add(starPoints);

    // 5. Dynamic Theme Listener
    const updateThemeColors = () => {
      const darkNow = document.documentElement.getAttribute('data-theme') !== 'light';
      uniforms.uColorPeak.value.set(darkNow ? 0xff5a1f : 0xc2410c);
      uniforms.uColorMid.value.set(darkNow ? 0xff8a4c : 0xe05626);
      uniforms.uColorTrough.value.set(darkNow ? 0x3a1d12 : 0xd97706);
      uniforms.uOpacity.value = darkNow ? 0.88 : 0.95;
      starMat.color.set(darkNow ? 0xffc299 : 0x121316);
      starMat.opacity = darkNow ? 0.45 : 0.6;
    };

    window.addEventListener('themechange', updateThemeColors);

    // 6. Smooth Mouse Interaction (only updates one 2D vector uniform!)
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotY = normX * 0.22;
      targetRotX = -normY * 0.15;

      // Pass world space coordinates to GPU shader
      uniforms.uMouse.value.x = normX * (xSpan * 0.38);
      uniforms.uMouse.value.y = -normY * (zSpan * 0.38);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 7. Responsive Resize Handler
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
        uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
      }, 100);
    };

    window.addEventListener('resize', onResize);

    // 8. IntersectionObserver to PAUSE rendering when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 9. Ultra-Fast 60-120fps Animation Loop
    // Notice: ZERO JavaScript math calculations inside! The GPU computes all 2,000+ points in parallel!
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current || document.hidden) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Send single time float to GPU
      uniforms.uTime.value = time;

      // Gentle parallax rotation
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;
      starPoints.rotation.y += delta * 0.02;

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
        pointerEvents: 'none', // Touch & scroll passes through 100% unimpeded to page
        maskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 50%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 50%, black 50%, transparent 100%)',
      }}
      title="Interactive Cyber Wavefield"
    />
  );
}
