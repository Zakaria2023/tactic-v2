'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MiniScene({ variant = 0 }: { variant?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const scene = new THREE.Scene();
    let w = parent.clientWidth || 400;
    let h = parent.clientHeight || 200;
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 15);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light = new THREE.DirectionalLight(0xF2D126, 1.5);
    light.position.set(5, 5, 5);
    scene.add(light);

    const group = new THREE.Group();
    scene.add(group);
    const v = variant % 6;

    if (v === 0) {
      group.add(new THREE.Mesh(
        new THREE.IcosahedronGeometry(4, 1),
        new THREE.MeshBasicMaterial({ color: 0xF2D126, wireframe: true, transparent: true, opacity: 0.7 })
      ));
      group.add(new THREE.Mesh(
        new THREE.IcosahedronGeometry(2, 0),
        new THREE.MeshStandardMaterial({ color: 0xF2D126, emissive: 0xF2D126, emissiveIntensity: 0.4, metalness: 0.8 })
      ));
    } else if (v === 1) {
      for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) {
        const c = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.6, 0.6),
          new THREE.MeshStandardMaterial({ color: 0xF2D126, emissive: 0xF2D126, emissiveIntensity: 0.2, metalness: 0.7 })
        );
        c.position.set(x * 1.5, y * 1.5, 0);
        c.userData = { baseY: y * 1.5, phase: (x + y) * 0.3 };
        group.add(c);
      }
    } else if (v === 2) {
      group.add(new THREE.Mesh(
        new THREE.TorusKnotGeometry(2.5, 0.5, 100, 16),
        new THREE.MeshStandardMaterial({ color: 0xF2D126, emissive: 0xF2D126, emissiveIntensity: 0.3, metalness: 0.9 })
      ));
    } else if (v === 3) {
      group.add(new THREE.Mesh(
        new THREE.OctahedronGeometry(3, 0),
        new THREE.MeshStandardMaterial({ color: 0xF2D126, emissive: 0xF2D126, emissiveIntensity: 0.4, metalness: 0.8 })
      ));
      for (let i = 0; i < 3; i++) {
        const r = new THREE.Mesh(
          new THREE.TorusGeometry(4.5 + i * 0.8, 0.06, 12, 60),
          new THREE.MeshBasicMaterial({ color: 0xF2D126, transparent: true, opacity: 0.4 })
        );
        r.rotation.x = Math.random() * Math.PI;
        r.rotation.y = Math.random() * Math.PI;
        r.userData.rotSpeed = 0.01 + i * 0.005;
        group.add(r);
      }
    } else if (v === 4) {
      const count = 200;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 8;
        pos[i * 3] = Math.cos(angle) * (t * 5);
        pos[i * 3 + 1] = (t - 0.5) * 8;
        pos[i * 3 + 2] = Math.sin(angle) * (t * 5);
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      group.add(new THREE.Points(geom, new THREE.PointsMaterial({
        color: 0xF2D126, size: 0.25, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending,
      })));
    } else {
      for (let i = 0; i < 6; i++) {
        const hx = new THREE.Mesh(
          new THREE.CylinderGeometry(2, 2, 0.4, 6),
          new THREE.MeshStandardMaterial({
            color: 0xF2D126, emissive: 0xF2D126, emissiveIntensity: 0.2 - i * 0.03,
            metalness: 0.7, transparent: true, opacity: 1 - i * 0.1,
          })
        );
        hx.position.y = (i - 2.5) * 0.8;
        hx.rotation.y = i * 0.3;
        group.add(hx);
      }
    }

    let tMx = 0, tMy = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      tMx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      tMy = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => { tMx = 0; tMy = 0; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    const ro = new ResizeObserver(() => {
      w = parent.clientWidth || 400;
      h = parent.clientHeight || 200;
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
      mx += (tMx - mx) * 0.08;
      my += (tMy - my) * 0.08;
      group.rotation.y = t * 0.3 + mx * 0.6;
      group.rotation.x = my * 0.3;

      if (v === 1) {
        group.children.forEach((c) => {
          if (c.userData.phase !== undefined) {
            c.position.y = c.userData.baseY + Math.sin(t * 2 + c.userData.phase) * 0.3;
            c.rotation.x = t * 0.5;
          }
        });
      } else if (v === 3) {
        group.children.forEach((c) => {
          if (c.userData.rotSpeed) c.rotation.z += c.userData.rotSpeed;
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
      renderer.dispose();
    };
  }, [variant]);

  return <canvas ref={canvasRef} />;
}
