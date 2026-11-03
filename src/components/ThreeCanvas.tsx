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
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Geometries & Materials
    // Group container for collective rotation
    const group = new THREE.Group();
    scene.add(group);

    // Check current theme colors
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const primaryColor = isDark ? 0x3B82F6 : 0x2563EB;
    const secondaryColor = isDark ? 0x60A5FA : 0x0284C7;
    const pointColor = isDark ? 0x93C5FD : 0x1D4ED8;

    // Outer Geodesic Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.28 : 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Inner Solid Wireframe Core
    const innerGeo = new THREE.OctahedronGeometry(0.9, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Floating Particles Constellation
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: pointColor,
      size: 0.035,
      transparent: true,
      opacity: isDark ? 0.75 : 0.85,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    group.add(particlePoints);

    // Outer Ring
    const ringGeo = new THREE.TorusGeometry(2.35, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: isDark ? 0.35 : 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // 3. Mouse & Drag Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.8;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        group.rotation.y += deltaX * 0.01;
        group.rotation.x += deltaY * 0.01;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (isDragging) {
          const deltaX = touch.clientX - previousMouseX;
          const deltaY = touch.clientY - previousMouseY;
          group.rotation.y += deltaX * 0.015;
          group.rotation.x += deltaY * 0.015;
          previousMouseX = touch.clientX;
          previousMouseY = touch.clientY;
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 4. Resize Handling
    const onResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    // 5. Visibility / Intersection Observer to save 100% GPU when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 6. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();

      // Continuous subtle ambient spinning
      if (!isDragging) {
        group.rotation.y += 0.25 * delta;
        group.rotation.x += 0.15 * delta;

        // Smooth Lerp towards mouse tilt
        group.rotation.y += (targetRotationY - (group.rotation.y % (Math.PI * 2))) * 0.05;
        group.rotation.x += (targetRotationX - (group.rotation.x % (Math.PI * 2))) * 0.05;
      }

      // Inner core counter-rotation
      innerMesh.rotation.y -= 0.4 * delta;
      innerMesh.rotation.z += 0.2 * delta;

      // Ring gentle wobble
      ringMesh.rotation.z += 0.15 * delta;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Interactive 3D Core: Click and drag to inspect"
    />
  );
}
