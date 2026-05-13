'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function IndustriesSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const scene = new THREE.Scene();
    let w = parent.clientWidth;
    let h = parent.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 25;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dir = new THREE.DirectionalLight(0xF2D126, 1);
    dir.position.set(10, 10, 10);
    scene.add(dir);

    const group = new THREE.Group();
    scene.add(group);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(8, 24, 16)),
      new THREE.LineBasicMaterial({ color: 0xF2D126, transparent: true, opacity: 0.2 })
    );
    group.add(wire);
    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(7.95, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x1E1E1E, transparent: true, opacity: 0.6 })
    );
    group.add(inner);

    const dots: { dot: THREE.Mesh; ring: THREE.Mesh }[] = [];
    for (let i = 0; i < 9; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / 9);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const x = 8.2 * Math.sin(phi) * Math.cos(theta);
      const y = 8.2 * Math.sin(phi) * Math.sin(theta);
      const z = 8.2 * Math.cos(phi);
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xF2D126 })
      );
      dot.position.set(x, y, z);
      group.add(dot);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.5, 16),
        new THREE.MeshBasicMaterial({ color: 0xF2D126, transparent: true, opacity: 0.4, side: THREE.DoubleSide })
      );
      ring.position.set(x, y, z);
      ring.lookAt(0, 0, 0);
      group.add(ring);
      dots.push({ dot, ring });
    }

    const lineMat = new THREE.LineBasicMaterial({ color: 0xF2D126, transparent: true, opacity: 0.15 });
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        if (Math.random() > 0.7) continue;
        const geom = new THREE.BufferGeometry().setFromPoints([dots[i].dot.position, dots[j].dot.position]);
        group.add(new THREE.Line(geom, lineMat));
      }
    }

    let isDragging = false;
    let prev = { x: 0, y: 0 };
    let rotation = { x: 0.3, y: 0 };
    let targetRotation = { x: 0.3, y: 0 };
    let auto = true;

    const onDown = (e: MouseEvent) => {
      isDragging = true; auto = false;
      prev = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      targetRotation.y += (e.clientX - prev.x) * 0.008;
      targetRotation.x += (e.clientY - prev.y) * 0.008;
      prev = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => {
      isDragging = false;
      setTimeout(() => { auto = true; }, 2000);
    };
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    const onResize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (auto) targetRotation.y += 0.003;
      rotation.x += (targetRotation.x - rotation.x) * 0.08;
      rotation.y += (targetRotation.y - rotation.y) * 0.08;
      group.rotation.x = rotation.x;
      group.rotation.y = rotation.y;
      dots.forEach((m, i) => {
        const p = 1 + Math.sin(t * 2 + i) * 0.15;
        m.dot.scale.setScalar(p);
        (m.ring.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 2 + i) * 0.2;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="industries-canvas" />;
}
