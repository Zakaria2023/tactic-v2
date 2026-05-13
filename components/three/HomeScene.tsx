"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

interface LetterUserData {
  originalPos: THREE.Vector3;
  initialPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  targetRot: { x: number; y: number; z: number };
  floatOffset: number;
  floatSpeed: number;
  hovered: boolean;
  color: number;
}

export default function HomeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetRequestedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ============ SETUP ============
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      500,
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x1e1e1e, 1);

    // ============ LIGHTS ============
    scene.add(new THREE.AmbientLight(0xf2d126, 0.4));
    const pl1 = new THREE.PointLight(0xf2d126, 3, 100);
    pl1.position.set(20, 20, 20);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xf2d126, 2, 100);
    pl2.position.set(-20, -20, 20);
    scene.add(pl2);

    // ============ TAKTEEQ 3D LETTERS ============
    const letters: THREE.Mesh[] = [];
    const letterGroup = new THREE.Group();
    scene.add(letterGroup);

    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json",
      (font) => {
        const text = "TAKTEEQ";
        const letterSpacing = 0.3;
        const letterSize = 4;

        let totalWidth = 0;
        const letterWidths: number[] = [];
        for (let i = 0; i < text.length; i++) {
          const tg = new TextGeometry(text[i], {
            font,
            size: letterSize,
            height: 1.2,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.15,
            bevelSize: 0.08,
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
            height: 1.2,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.15,
            bevelSize: 0.08,
            bevelSegments: 3,
          });
          geom.computeBoundingBox();
          const w = geom.boundingBox!.max.x - geom.boundingBox!.min.x;
          const h = geom.boundingBox!.max.y - geom.boundingBox!.min.y;
          geom.translate(-w / 2, -h / 2, 0);

          const mat = new THREE.MeshStandardMaterial({
            color: 0xf2d126,
            emissive: 0xf2d126,
            emissiveIntensity: 0.15,
            metalness: 0.85,
            roughness: 0.25,
          });

          const mesh = new THREE.Mesh(geom, mat);
          mesh.position.set(xPos + w / 2, 0, 0);
          const userData: LetterUserData = {
            originalPos: mesh.position.clone(),
            initialPos: mesh.position.clone(),
            targetPos: mesh.position.clone(),
            targetRot: { x: 0, y: 0, z: 0 },
            floatOffset: Math.random() * Math.PI * 2,
            floatSpeed: 0.5 + Math.random() * 0.5,
            hovered: false,
            color: 0xf2d126,
          };
          mesh.userData = userData;

          letters.push(mesh);
          letterGroup.add(mesh);
          xPos += w + letterSpacing;
        }
      },
    );

    // ============ MOUSE INTERACTION ============
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    const smoothMouse = new THREE.Vector2();
    let isDragging = false;
    let draggedLetter: THREE.Mesh | null = null;
    const dragOffset = new THREE.Vector3();

    const getPointer = (e: MouseEvent | Touch) => ({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });

    const onMouseMove = (e: MouseEvent) => {
      const p = getPointer(e);
      mouseVector.set(p.x, p.y);
      targetMouse.set(p.x, p.y);

      if (isDragging && draggedLetter) {
        raycaster.setFromCamera(mouseVector, camera);
        const planeZ = (draggedLetter.userData as LetterUserData).originalPos.z;
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -planeZ);
        const intersection = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, intersection)) {
          (draggedLetter.userData as LetterUserData).targetPos.x =
            intersection.x - dragOffset.x;
          (draggedLetter.userData as LetterUserData).targetPos.y =
            intersection.y - dragOffset.y;
        }
        return;
      }

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(letters);
      letters.forEach((l) => {
        if (
          (l.userData as LetterUserData).hovered &&
          !intersects.find((i) => i.object === l)
        ) {
          (l.userData as LetterUserData).hovered = false;
        }
      });
      if (intersects.length > 0) {
        (
          (intersects[0].object as THREE.Mesh).userData as LetterUserData
        ).hovered = true;
        canvas.style.cursor = "grab";
      } else {
        canvas.style.cursor = "default";
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const p = getPointer(e);
      mouseVector.set(p.x, p.y);
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(letters);
      if (intersects.length > 0) {
        isDragging = true;
        draggedLetter = intersects[0].object as THREE.Mesh;
        const pt = intersects[0].point;
        dragOffset.set(
          pt.x - draggedLetter.position.x,
          pt.y - draggedLetter.position.y,
          0,
        );
        canvas.style.cursor = "grabbing";
      }
    };

    const onMouseUp = () => {
      if (draggedLetter) {
        const ud = draggedLetter.userData as LetterUserData;
        ud.originalPos.copy(ud.targetPos);
      }
      isDragging = false;
      draggedLetter = null;
      canvas.style.cursor = "default";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      const p = getPointer(t);
      mouseVector.set(p.x, p.y);
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(letters);
      if (intersects.length > 0) {
        isDragging = true;
        draggedLetter = intersects[0].object as THREE.Mesh;
        const pt = intersects[0].point;
        dragOffset.set(
          pt.x - draggedLetter.position.x,
          pt.y - draggedLetter.position.y,
          0,
        );
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      const p = getPointer(t);
      mouseVector.set(p.x, p.y);
      targetMouse.set(p.x, p.y);
      if (isDragging && draggedLetter) {
        raycaster.setFromCamera(mouseVector, camera);
        const planeZ = (draggedLetter.userData as LetterUserData).originalPos.z;
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -planeZ);
        const intersection = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, intersection)) {
          (draggedLetter.userData as LetterUserData).targetPos.x =
            intersection.x - dragOffset.x;
          (draggedLetter.userData as LetterUserData).targetPos.y =
            intersection.y - dragOffset.y;
        }
      }
    };
    const onTouchEnd = () => {
      if (draggedLetter) {
        const ud = draggedLetter.userData as LetterUserData;
        ud.originalPos.copy(ud.targetPos);
      }
      isDragging = false;
      draggedLetter = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Reset button
    const onReset = () => {
      letters.forEach((l) => {
        const ud = l.userData as LetterUserData;
        ud.targetPos.copy(ud.initialPos);
        ud.originalPos.copy(ud.initialPos);
      });
    };
    window.addEventListener("takteeq-reset-letters", onReset);

    // Scroll
    let scrollY = 0,
      targetScroll = 0;
    const onScroll = () => {
      targetScroll = window.scrollY / window.innerHeight;
    };
    window.addEventListener("scroll", onScroll);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ============ ANIMATION ============
    const clock = new THREE.Clock();
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;
      scrollY += (targetScroll - scrollY) * 0.05;

      // Letters
      letters.forEach((letter, i) => {
        const ud = letter.userData as LetterUserData;
        if (letter !== draggedLetter) {
          const floatY = Math.sin(t * ud.floatSpeed + ud.floatOffset) * 0.4;
          const tY = ud.targetPos.y + floatY;
          letter.position.x += (ud.targetPos.x - letter.position.x) * 0.1;
          letter.position.y += (tY - letter.position.y) * 0.1;
          letter.position.z += (ud.targetPos.z - letter.position.z) * 0.1;
        } else {
          letter.position.x += (ud.targetPos.x - letter.position.x) * 0.3;
          letter.position.y += (ud.targetPos.y - letter.position.y) * 0.3;
        }

        const mat = letter.material as THREE.MeshStandardMaterial;
        if (ud.hovered && letter !== draggedLetter) {
          ud.targetRot.y = Math.sin(t * 3) * 0.3;
          ud.targetRot.x = Math.cos(t * 2) * 0.2;
          letter.scale.x += (1.15 - letter.scale.x) * 0.1;
          letter.scale.y += (1.15 - letter.scale.y) * 0.1;
          letter.scale.z += (1.15 - letter.scale.z) * 0.1;
          mat.emissiveIntensity += (0.5 - mat.emissiveIntensity) * 0.1;
        } else if (letter === draggedLetter) {
          ud.targetRot.y += 0.05;
          letter.scale.x += (1.25 - letter.scale.x) * 0.1;
          letter.scale.y += (1.25 - letter.scale.y) * 0.1;
          letter.scale.z += (1.25 - letter.scale.z) * 0.1;
          mat.emissiveIntensity += (0.7 - mat.emissiveIntensity) * 0.1;
        } else {
          ud.targetRot.y = Math.sin(t * 0.8 + i * 0.5) * 0.15;
          ud.targetRot.x = Math.cos(t * 0.6 + i * 0.3) * 0.1;
          letter.scale.x += (1 - letter.scale.x) * 0.1;
          letter.scale.y += (1 - letter.scale.y) * 0.1;
          letter.scale.z += (1 - letter.scale.z) * 0.1;
          mat.emissiveIntensity += (0.15 - mat.emissiveIntensity) * 0.05;
        }

        letter.rotation.x += (ud.targetRot.x - letter.rotation.x) * 0.1;
        letter.rotation.y += (ud.targetRot.y - letter.rotation.y) * 0.1;
        letter.rotation.z += (ud.targetRot.z - letter.rotation.z) * 0.1;
      });

      letterGroup.rotation.y = smoothMouse.x * 0.15;
      letterGroup.rotation.x = -smoothMouse.y * 0.1;

      // Camera position follows mouse + scroll
      camera.position.x = smoothMouse.x * 5;
      camera.position.y = -smoothMouse.y * 3 - scrollY * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ============ CLEANUP ============
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("takteeq-reset-letters", onReset);
      renderer.dispose();
      letters.forEach((l) => {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      });
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
}
