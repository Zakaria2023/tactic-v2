"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

export default function OdooScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      500,
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x060912, 1);

    // Lights
    scene.add(new THREE.AmbientLight(0x22d3ee, 0.3));
    const pl1 = new THREE.PointLight(0x22d3ee, 2.5, 100);
    pl1.position.set(15, 15, 20);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x22d3ee, 1.5, 100);
    pl2.position.set(-15, -15, 20);
    scene.add(pl2);

    // Letters
    const letters: {
      mesh: THREE.Mesh;
      floatOffset: number;
      floatSpeed: number;
    }[] = [];
    const letterGroup = new THREE.Group();
    scene.add(letterGroup);

    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json",
      (font) => {
        const text = "Odoo";
        const letterSpacing = 0.5;
        const letterSize = 7;

        let totalWidth = 0;
        const letterWidths: number[] = [];
        for (let i = 0; i < text.length; i++) {
          const tg = new TextGeometry(text[i], {
            font,
            size: letterSize,
            depth: 1.5,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 3,
          });
          tg.computeBoundingBox();
          const w = tg.boundingBox!.max.x - tg.boundingBox!.min.x;
          letterWidths.push(w);
          totalWidth += w + letterSpacing;
          tg.dispose();
        }
        totalWidth -= letterSpacing;

        let xPos = -totalWidth / 2;
        for (let i = 0; i < text.length; i++) {
          const geom = new TextGeometry(text[i], {
            font,
            size: letterSize,
            depth: 1.5,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 3,
          });
          geom.computeBoundingBox();
          const w = geom.boundingBox!.max.x - geom.boundingBox!.min.x;
          const h = geom.boundingBox!.max.y - geom.boundingBox!.min.y;
          geom.translate(-w / 2, -h / 2, 0);

          const mat = new THREE.MeshStandardMaterial({
            color: 0x22d3ee,
            emissive: 0x22d3ee,
            emissiveIntensity: 0.08,
            metalness: 0.9,
            roughness: 0.2,
            transparent: true,
            opacity: 0.18,
          });

          const mesh = new THREE.Mesh(geom, mat);
          mesh.position.set(xPos + w / 2, 0, -5);
          letters.push({
            mesh,
            floatOffset: Math.random() * Math.PI * 2,
            floatSpeed: 0.4 + Math.random() * 0.3,
          });
          letterGroup.add(mesh);
          xPos += w + letterSpacing;
        }
      },
    );

    // Mouse parallax
    const smoothMouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.04;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.04;

      letters.forEach(({ mesh, floatOffset, floatSpeed }, i) => {
        mesh.position.y +=
          (Math.sin(t * floatSpeed + floatOffset) * 0.3 - mesh.position.y) *
          0.02;
        mesh.rotation.y = Math.sin(t * 0.5 + i * 0.8) * 0.12;
        mesh.rotation.x = Math.cos(t * 0.4 + i * 0.5) * 0.07;
      });

      letterGroup.rotation.y = smoothMouse.x * 0.1;
      letterGroup.rotation.x = -smoothMouse.y * 0.06;

      camera.position.x = smoothMouse.x * 3;
      camera.position.y = -smoothMouse.y * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      letters.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
