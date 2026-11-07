/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type Three3DStyle = 'knot' | 'gyro' | 'wave' | 'polyhedron';

interface ThreeCanvasProps {
  className?: string;
  styleMode?: Three3DStyle;
}

export default function ThreeCanvas({ className = '', styleMode = 'knot' }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

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

    // 2. Theme Colors
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    let primaryColor = isDark ? 0xff5a1f : 0xc2410c;
    let secondaryColor = isDark ? 0xff8a4c : 0xff5a1f;
    let pointColor = isDark ? 0xffc299 : 0x121316;

    // Master Group container
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Geometries & Objects tracking for animation and cleanup
    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];
    let animateCallback: (delta: number, time: number) => void = () => {};

    // 3. Build Style based on styleMode
    if (styleMode === 'knot') {
      // MODE 1: Kinetic Torus Knot (Quantum Ribbon)
      // Open center, continuous flowing twist, elegant depth
      const knotGeo = new THREE.TorusKnotGeometry(1.35, 0.38, 120, 18, 2, 3);
      disposables.push(knotGeo);

      const knotMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.35 : 0.48,
      });
      disposables.push(knotMat);

      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      masterGroup.add(knotMesh);

      // Outer accent rings
      const ringGeo = new THREE.TorusGeometry(2.3, 0.012, 16, 120);
      disposables.push(ringGeo);
      const ringMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        transparent: true,
        opacity: isDark ? 0.3 : 0.4,
      });
      disposables.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      masterGroup.add(ringMesh);

      // Ambient Particles
      const particleCount = 140;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = 1.8 + Math.random() * 1.0;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const partGeo = new THREE.BufferGeometry();
      partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      disposables.push(partGeo);
      const partMat = new THREE.PointsMaterial({
        color: pointColor,
        size: 0.032,
        transparent: true,
        opacity: isDark ? 0.7 : 0.85,
      });
      disposables.push(partMat);
      const points = new THREE.Points(partGeo, partMat);
      masterGroup.add(points);

      animateCallback = (delta) => {
        knotMesh.rotation.x += delta * 0.25;
        knotMesh.rotation.y += delta * 0.35;
        ringMesh.rotation.z += delta * 0.15;
        points.rotation.y -= delta * 0.08;
      };

    } else if (styleMode === 'gyro') {
      // MODE 2: Gyroscopic Orbital Armillary (Precision Celestial Rings)
      // 3 independent gimbal rings, completely clear central view
      const ring1Geo = new THREE.TorusGeometry(2.1, 0.016, 16, 120);
      const ring2Geo = new THREE.TorusGeometry(1.65, 0.014, 16, 100);
      const ring3Geo = new THREE.TorusGeometry(1.2, 0.012, 16, 80);
      disposables.push(ring1Geo, ring2Geo, ring3Geo);

      const ring1Mat = new THREE.MeshBasicMaterial({ color: primaryColor, transparent: true, opacity: isDark ? 0.45 : 0.55 });
      const ring2Mat = new THREE.MeshBasicMaterial({ color: secondaryColor, transparent: true, opacity: isDark ? 0.4 : 0.5 });
      const ring3Mat = new THREE.MeshBasicMaterial({ color: primaryColor, transparent: true, opacity: isDark ? 0.35 : 0.45 });
      disposables.push(ring1Mat, ring2Mat, ring3Mat);

      const r1 = new THREE.Mesh(ring1Geo, ring1Mat);
      const r2 = new THREE.Mesh(ring2Geo, ring2Mat);
      const r3 = new THREE.Mesh(ring3Geo, ring3Mat);
      masterGroup.add(r1, r2, r3);

      // Core faceted floating octahedron
      const coreGeo = new THREE.OctahedronGeometry(0.55, 1);
      disposables.push(coreGeo);
      const coreMat = new THREE.MeshBasicMaterial({ color: secondaryColor, wireframe: true, transparent: true, opacity: isDark ? 0.6 : 0.75 });
      disposables.push(coreMat);
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      masterGroup.add(coreMesh);

      // Constellation points along rings
      const ptCount = 90;
      const ptPos = new Float32Array(ptCount * 3);
      for (let i = 0; i < ptCount; i++) {
        const rad = 2.1;
        const ang = (i / ptCount) * Math.PI * 2;
        ptPos[i * 3] = rad * Math.cos(ang);
        ptPos[i * 3 + 1] = rad * Math.sin(ang);
        ptPos[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      }
      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
      disposables.push(ptGeo);
      const ptMat = new THREE.PointsMaterial({ color: pointColor, size: 0.04, transparent: true, opacity: 0.8 });
      disposables.push(ptMat);
      const ptMesh = new THREE.Points(ptGeo, ptMat);
      r1.add(ptMesh);

      animateCallback = (delta) => {
        r1.rotation.x += delta * 0.3;
        r1.rotation.y += delta * 0.15;
        r2.rotation.y += delta * 0.4;
        r2.rotation.z += delta * 0.2;
        r3.rotation.z += delta * 0.5;
        r3.rotation.x += delta * 0.25;
        coreMesh.rotation.x -= delta * 0.4;
        coreMesh.rotation.y += delta * 0.3;
      };

    } else if (styleMode === 'wave') {
      // MODE 3: Interactive Cyber Topography Wave (Digital Terrain / GIS Lattice)
      const rows = 35;
      const cols = 35;
      const count = rows * cols;
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const idx = (i * cols + j) * 3;
          positions[idx] = (j - cols / 2) * 0.14;
          positions[idx + 1] = (i - rows / 2) * 0.14;
          positions[idx + 2] = 0;
        }
      }

      const waveGeo = new THREE.BufferGeometry();
      waveGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      disposables.push(waveGeo);

      const waveMat = new THREE.PointsMaterial({
        color: primaryColor,
        size: 0.045,
        transparent: true,
        opacity: isDark ? 0.75 : 0.85,
      });
      disposables.push(waveMat);

      const wavePoints = new THREE.Points(waveGeo, waveMat);
      wavePoints.rotation.x = -Math.PI / 3;
      masterGroup.add(wavePoints);

      animateCallback = (_delta, time) => {
        const posAttr = waveGeo.attributes.position as THREE.BufferAttribute;
        const array = posAttr.array as Float32Array;

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const idx = (i * cols + j) * 3;
            const x = array[idx];
            const y = array[idx + 1];
            // Sine & Cosine undulating wave
            array[idx + 2] = Math.sin(x * 1.5 + time * 1.8) * 0.32 + Math.cos(y * 1.5 + time * 1.4) * 0.25;
          }
        }
        posAttr.needsUpdate = true;
      };

    } else {
      // MODE 4: Geodesic Polyhedron (Original Classic)
      const outerGeo = new THREE.IcosahedronGeometry(1.65, 2);
      disposables.push(outerGeo);
      const outerMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.32 : 0.45,
      });
      disposables.push(outerMat);
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      masterGroup.add(outerMesh);

      const innerGeo = new THREE.OctahedronGeometry(0.9, 1);
      disposables.push(innerGeo);
      const innerMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.6 : 0.72,
      });
      disposables.push(innerMat);
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      masterGroup.add(innerMesh);

      const ringGeo = new THREE.TorusGeometry(2.35, 0.012, 16, 100);
      disposables.push(ringGeo);
      const ringMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        transparent: true,
        opacity: isDark ? 0.35 : 0.5,
      });
      disposables.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      masterGroup.add(ringMesh);

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
      disposables.push(particleGeo);
      const particleMat = new THREE.PointsMaterial({
        color: pointColor,
        size: 0.035,
        transparent: true,
        opacity: isDark ? 0.75 : 0.85,
      });
      disposables.push(particleMat);
      const particlePoints = new THREE.Points(particleGeo, particleMat);
      masterGroup.add(particlePoints);

      animateCallback = (delta) => {
        outerMesh.rotation.x += delta * 0.2;
        outerMesh.rotation.y += delta * 0.3;
        innerMesh.rotation.x -= delta * 0.3;
        innerMesh.rotation.y -= delta * 0.4;
        ringMesh.rotation.z += delta * 0.1;
        particlePoints.rotation.y -= delta * 0.05;
      };
    }

    // 4. Dynamic Theme Listener
    const updateThemeColors = () => {
      const darkNow = document.documentElement.getAttribute('data-theme') !== 'light';
      primaryColor = darkNow ? 0xff5a1f : 0xc2410c;
      secondaryColor = darkNow ? 0xff8a4c : 0xff5a1f;
      pointColor = darkNow ? 0xffc299 : 0x121316;

      disposables.forEach((item) => {
        if ('color' in item && item.color instanceof THREE.Color) {
          if (item instanceof THREE.PointsMaterial) {
            item.color.setHex(pointColor);
          } else {
            item.color.setHex(primaryColor);
          }
        }
      });
    };

    window.addEventListener('themechange', updateThemeColors);

    // 5. Mouse Interaction
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
      targetRotationY = mouseX * 0.6;
      targetRotationX = -mouseY * 0.5;
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
      masterGroup.rotation.y += deltaX * 0.008;
      masterGroup.rotation.x += deltaY * 0.008;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onDragMove);

    // 6. Resize Handler
    const onResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    // 7. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse follow
      if (!isDragging) {
        masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.04;
        masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.04;
      }

      animateCallback(delta, time);
      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener('themechange', updateThemeColors);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('resize', onResize);

      disposables.forEach((item) => item.dispose());
      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [styleMode]);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'none' }}
      title="Interactive 3D — Drag to rotate"
    />
  );
}
