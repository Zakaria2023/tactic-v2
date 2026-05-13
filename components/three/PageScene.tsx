'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type SceneType = 'about' | 'portfolio' | 'blog';

export default function PageScene({ type }: { type: SceneType }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const scene = new THREE.Scene();
    let w = parent.clientWidth;
    let h = parent.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.set(0, 0, 40);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light = new THREE.DirectionalLight(0xF2D126, 1.2);
    light.position.set(10, 10, 10);
    scene.add(light);

    const group = new THREE.Group();
    scene.add(group);

    const cleanupFns: Array<() => void> = [];

    if (type === 'about') {
      // DNA helix
      const count = 80, height = 40, radius = 6, turns = 3;
      const s1: THREE.Vector3[] = [], s2: THREE.Vector3[] = [];
      for (let i = 0; i <= count; i++) {
        const tp = i / count;
        const angle = tp * Math.PI * 2 * turns;
        const y = (tp - 0.5) * height;
        s1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
        s2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
      }
      const t1 = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(s1), 200, 0.12, 8, false),
        new THREE.MeshStandardMaterial({ color: 0xF2D126, emissive: 0xF2D126, emissiveIntensity: 0.3, metalness: 0.8 })
      );
      const t2 = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(s2), 200, 0.12, 8, false),
        new THREE.MeshStandardMaterial({ color: 0xF5F5F5, emissive: 0xF5F5F5, emissiveIntensity: 0.15, metalness: 0.8 })
      );
      group.add(t1, t2);
      for (let i = 0; i < count; i += 4) {
        const geom = new THREE.BufferGeometry().setFromPoints([s1[i], s2[i]]);
        group.add(new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0xF2D126, transparent: true, opacity: 0.4 })));
      }
    } else if (type === 'portfolio') {
      // Hex grid
      const cols = 25, rows = 18, hexRadius = 0.9;
      const horiz = hexRadius * 1.8, vert = hexRadius * 1.55;
      const hexGeom = new THREE.CylinderGeometry(hexRadius, hexRadius, 0.4, 6);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offsetX = (row % 2) * (horiz / 2);
          const x = (col - cols / 2) * horiz + offsetX;
          const z = (row - rows / 2) * vert;
          const gold = Math.random() < 0.15;
          const hex = new THREE.Mesh(hexGeom, new THREE.MeshStandardMaterial({
            color: gold ? 0xF2D126 : 0x2B2B2B,
            emissive: gold ? 0xF2D126 : 0x000000,
            emissiveIntensity: gold ? 0.3 : 0,
            metalness: 0.7,
          }));
          hex.position.set(x, 0, z);
          group.add(hex);
        }
      }
      camera.position.set(0, 25, 30);
      camera.lookAt(0, 0, 0);
    } else if (type === 'blog') {
      // Geometric shapes + lines
      for (let i = 0; i < 25; i++) {
        const types = ['tetra', 'octa', 'icosa'];
        const t = types[i % 3];
        let geom;
        if (t === 'tetra') geom = new THREE.TetrahedronGeometry(0.8 + Math.random() * 0.6);
        else if (t === 'octa') geom = new THREE.OctahedronGeometry(0.7 + Math.random() * 0.5);
        else geom = new THREE.IcosahedronGeometry(0.6 + Math.random() * 0.4);
        const mesh = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({
          color: 0xF2D126, wireframe: true, transparent: true, opacity: 0.6
        }));
        mesh.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30 - 10);
        mesh.userData = {
          basePos: mesh.position.clone(),
          rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
          floatSpeed: 0.3 + Math.random() * 0.4,
          floatOffset: Math.random() * Math.PI * 2,
        };
        group.add(mesh);
      }
    }

    let tMx = 0, tMy = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      tMx = (e.clientX / window.innerWidth) * 2 - 1;
      tMy = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);

    const ro = new ResizeObserver(() => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(parent);

    const clock = new THREE.Clock();
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mx += (tMx - mx) * 0.05;
      my += (tMy - my) * 0.05;

      if (type === 'about') {
        group.rotation.y = t * 0.3 + mx * 0.3;
        group.rotation.x = my * 0.2;
      } else if (type === 'portfolio') {
        group.rotation.y = t * 0.03;
      } else if (type === 'blog') {
        group.children.forEach((c) => {
          if (c.userData.rotSpeed) {
            c.rotation.x += c.userData.rotSpeed.x;
            c.rotation.y += c.userData.rotSpeed.y;
            const bp = c.userData.basePos as THREE.Vector3;
            c.position.y = bp.y + Math.sin(t * c.userData.floatSpeed + c.userData.floatOffset) * 1.2;
          }
        });
        scene.rotation.y = mx * 0.1;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      renderer.dispose();
      cleanupFns.forEach((fn) => fn());
    };
  }, [type]);

  return <canvas ref={canvasRef} />;
}
