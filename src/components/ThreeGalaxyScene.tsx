import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RomanticTheme } from '../types';

interface ThreeGalaxySceneProps {
  theme: RomanticTheme;
  interactiveSpeed?: number;
  onHeartClick?: () => void;
}

export const ThreeGalaxyScene: React.FC<ThreeGalaxySceneProps> = ({
  theme,
  interactiveSpeed = 1,
  onHeartClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const shockwavesRef = useRef<Array<{ mesh: THREE.Points; life: number }>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Texture Generator for Glowing Soft Particle Sprites
    const createParticleTexture = (glowColor: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.3, glowColor);
      gradient.addColorStop(0.7, 'rgba(201, 123, 107, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleTexture = createParticleTexture('#c97b6b');
    const goldParticleTexture = createParticleTexture('#cda882');

    // 3. Create 3D Heart Geometry
    const heartParticleCount = 2800;
    const heartPositions = new Float32Array(heartParticleCount * 3);
    const heartOriginals = new Float32Array(heartParticleCount * 3);
    const heartColors = new Float32Array(heartParticleCount * 3);
    const heartSizes = new Float32Array(heartParticleCount);

    const baseColor = new THREE.Color(
      theme === 'terracotta-clay' ? '#a65341' :
      theme === 'rose-blush' ? '#d98e7d' :
      theme === 'sage-earth' ? '#7c8b74' : '#c97b6b'
    );
    const goldColor = new THREE.Color('#cda882');
    const whiteColor = new THREE.Color('#fffaf8');

    for (let i = 0; i < heartParticleCount; i++) {
      // Parametric heart formula:
      // x = 16 sin^3(t)
      // y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
      const t = Math.random() * Math.PI * 2;
      const u = (Math.random() - 0.5) * Math.PI; // Depth spread

      const scale = 0.72 + (Math.random() * 0.12 - 0.06);
      const x = 16 * Math.pow(Math.sin(t), 3) * scale;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
      // 3D thickness with volume distribution
      const z = Math.sin(u) * (5.5 * Math.cos(t / 2) + 2.5) * scale * (Math.random() * 0.9 + 0.1);

      heartPositions[i * 3] = x;
      heartPositions[i * 3 + 1] = y;
      heartPositions[i * 3 + 2] = z;

      heartOriginals[i * 3] = x;
      heartOriginals[i * 3 + 1] = y;
      heartOriginals[i * 3 + 2] = z;

      // Color variation: Blend between romantic rose, shimmering gold and bright starlight
      const rand = Math.random();
      const mixedColor = rand > 0.85 ? goldColor : rand > 0.7 ? whiteColor : baseColor;
      heartColors[i * 3] = mixedColor.r;
      heartColors[i * 3 + 1] = mixedColor.g;
      heartColors[i * 3 + 2] = mixedColor.b;

      heartSizes[i] = Math.random() * 0.85 + 0.35;
    }

    const heartGeometry = new THREE.BufferGeometry();
    heartGeometry.setAttribute('position', new THREE.BufferAttribute(heartPositions, 3));
    heartGeometry.setAttribute('color', new THREE.BufferAttribute(heartColors, 3));

    const heartMaterial = new THREE.PointsMaterial({
      size: 0.9,
      map: particleTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });

    const heartMesh = new THREE.Points(heartGeometry, heartMaterial);
    scene.add(heartMesh);

    // 4. Romantic Cosmic Nebula / Starfield
    const starCount = 1800;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 25 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = Math.random() > 0.6 ? goldColor : Math.random() > 0.3 ? baseColor : whiteColor;
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.65,
      map: goldParticleTexture || undefined,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.75,
      depthWrite: false,
    });

    const starMesh = new THREE.Points(starGeometry, starMaterial);
    scene.add(starMesh);

    // 5. Orbiting Stardust Rings around Heart
    const ringCount = 600;
    const ringPositions = new Float32Array(ringCount * 3);
    const ringAngles = new Float32Array(ringCount);
    const ringRadii = new Float32Array(ringCount);
    const ringSpeeds = new Float32Array(ringCount);

    for (let i = 0; i < ringCount; i++) {
      const r = 14 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      ringAngles[i] = angle;
      ringRadii[i] = r;
      ringSpeeds[i] = 0.006 + Math.random() * 0.008;

      ringPositions[i * 3] = Math.cos(angle) * r;
      ringPositions[i * 3 + 1] = Math.sin(angle) * (r * 0.35);
      ringPositions[i * 3 + 2] = Math.sin(angle) * (r * 0.75);
    }

    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));

    const ringMaterial = new THREE.PointsMaterial({
      size: 0.55,
      color: 0xffe4e6,
      map: goldParticleTexture || undefined,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
      depthWrite: false,
    });

    const ringMesh = new THREE.Points(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 5;
    ringMesh.rotation.z = Math.PI / 8;
    scene.add(ringMesh);

    // 6. Interactive Click Shockwave function
    const triggerShockwave = (originX = 0, originY = 0) => {
      const shockCount = 180;
      const shockPos = new Float32Array(shockCount * 3);
      const shockVels = new Float32Array(shockCount * 3);

      for (let i = 0; i < shockCount; i++) {
        shockPos[i * 3] = originX;
        shockPos[i * 3 + 1] = originY;
        shockPos[i * 3 + 2] = 0;

        const theta = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.5;
        shockVels[i * 3] = Math.cos(theta) * speed;
        shockVels[i * 3 + 1] = Math.sin(theta) * speed;
        shockVels[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.8;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(shockPos, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.85,
        color: 0xfde047,
        map: goldParticleTexture || undefined,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 1.0,
      });

      const pMesh = new THREE.Points(geom, mat);
      scene.add(pMesh);
      shockwavesRef.current.push({ mesh: pMesh, life: 1.0 });
    };

    // 7. Mouse and Touch Event Handlers
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.8;
      mouseRef.current.targetY = y * 0.8;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 12;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1) * 12;
      triggerShockwave(x, y);
      if (onHeartClick) onHeartClick();
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('click', handleClick);
    container.addEventListener('mouseenter', () => (isHoveredRef.current = true));
    container.addEventListener('mouseleave', () => {
      isHoveredRef.current = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    });

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime() * interactiveSpeed;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Romantic Heartbeat mathematical formula: Lub-dub expansion rhythm
      const heartbeatCycle = (elapsed * 1.6) % (Math.PI * 2);
      const heartbeatScale = 1 + 0.07 * Math.pow(Math.sin(heartbeatCycle), 6) + 0.04 * Math.pow(Math.sin(heartbeatCycle - 0.4), 6);

      // Rotate Heart & apply parallax
      heartMesh.rotation.y = elapsed * 0.25 + mouseRef.current.x * 0.6;
      heartMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.1 - mouseRef.current.y * 0.6;
      heartMesh.rotation.z = Math.cos(elapsed * 0.2) * 0.05;

      // Update positions with pulse
      const posAttr = heartGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < heartParticleCount; i++) {
        const ox = heartOriginals[i * 3];
        const oy = heartOriginals[i * 3 + 1];
        const oz = heartOriginals[i * 3 + 2];

        // Breathing particle jitter
        const jitter = 1 + 0.03 * Math.sin(elapsed * 3 + i);
        posAttr.setXYZ(
          i,
          ox * heartbeatScale * jitter,
          oy * heartbeatScale * jitter,
          oz * heartbeatScale * jitter
        );
      }
      posAttr.needsUpdate = true;

      // Rotate Starfield and Orbiting Ring
      starMesh.rotation.y = -elapsed * 0.04;
      starMesh.rotation.x = elapsed * 0.02;

      ringMesh.rotation.y = elapsed * 0.35;
      ringMesh.rotation.z = Math.sin(elapsed * 0.2) * 0.2;

      // Process click shockwaves
      const activeShockwaves: typeof shockwavesRef.current = [];
      for (const shock of shockwavesRef.current) {
        shock.life -= 0.025;
        const geom = shock.mesh.geometry;
        const pos = geom.attributes.position as THREE.BufferAttribute;
        for (let j = 0; j < pos.count; j++) {
          pos.setXYZ(
            j,
            pos.getX(j) * 1.04,
            pos.getY(j) * 1.04,
            pos.getZ(j) * 1.04
          );
        }
        pos.needsUpdate = true;
        (shock.mesh.material as THREE.PointsMaterial).opacity = Math.max(0, shock.life);

        if (shock.life > 0) {
          activeShockwaves.push(shock);
        } else {
          scene.remove(shock.mesh);
          shock.mesh.geometry.dispose();
        }
      }
      shockwavesRef.current = activeShockwaves;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handleClick);

      scene.remove(heartMesh);
      heartGeometry.dispose();
      heartMaterial.dispose();

      scene.remove(starMesh);
      starGeometry.dispose();
      starMaterial.dispose();

      scene.remove(ringMesh);
      ringGeometry.dispose();
      ringMaterial.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, interactiveSpeed, onHeartClick]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
};
