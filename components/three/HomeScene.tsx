'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const CODE_ITEMS = [
  { text: 'JavaScript', type: 'lang' }, { text: 'TypeScript', type: 'lang' },
  { text: 'Python', type: 'lang' }, { text: 'Java', type: 'lang' },
  { text: 'C++', type: 'lang' }, { text: 'C#', type: 'lang' },
  { text: 'Go', type: 'lang' }, { text: 'Rust', type: 'lang' },
  { text: 'Swift', type: 'lang' }, { text: 'Kotlin', type: 'lang' },
  { text: 'PHP', type: 'lang' }, { text: 'Ruby', type: 'lang' },
  { text: 'Dart', type: 'lang' }, { text: 'SQL', type: 'lang' },
  { text: 'React', type: 'fw' }, { text: 'Vue.js', type: 'fw' },
  { text: 'Next.js', type: 'fw' }, { text: 'Angular', type: 'fw' },
  { text: 'Node.js', type: 'fw' }, { text: 'Django', type: 'fw' },
  { text: 'Laravel', type: 'fw' }, { text: 'Flutter', type: 'fw' },
  { text: '.NET', type: 'fw' }, { text: 'Spring', type: 'fw' },
  { text: 'Docker', type: 'tool' }, { text: 'Kubernetes', type: 'tool' },
  { text: 'AWS', type: 'tool' }, { text: 'GraphQL', type: 'tool' },
  { text: 'MongoDB', type: 'tool' }, { text: 'Redis', type: 'tool' },
  { text: 'Git', type: 'tool' },
  { text: '{ }', type: 'sym' }, { text: '< />', type: 'sym' },
  { text: '=>', type: 'sym' }, { text: '&&', type: 'sym' },
  { text: '/>', type: 'sym' }, { text: '0x1A', type: 'sym' },
  { text: '0b101', type: 'sym' }, { text: '#!/', type: 'sym' },
  { text: '*ptr', type: 'sym' },
];

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

interface LabelUserData {
  basePos: THREE.Vector3;
  currentVel: THREE.Vector3;
  baseOpacity: number;
  floatSpeed: number;
  floatOffsetX: number;
  floatOffsetY: number;
  baseScale: number;
  baseScaleY: number;
}

export default function HomeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetRequestedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ============ SETUP ============
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1E1E1E, 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x1E1E1E, 1);

    // ============ LIGHTS ============
    scene.add(new THREE.AmbientLight(0xF2D126, 0.3));
    const pl1 = new THREE.PointLight(0xF2D126, 3, 100);
    pl1.position.set(20, 20, 20);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xF2D126, 2, 100);
    pl2.position.set(-20, -20, 20);
    scene.add(pl2);
    const pl3 = new THREE.PointLight(0xffffff, 1, 80);
    pl3.position.set(0, 30, -20);
    scene.add(pl3);
    const front = new THREE.DirectionalLight(0xffffff, 0.8);
    front.position.set(0, 0, 30);
    scene.add(front);

    // ============ TAKTEEQ 3D LETTERS ============
    const letters: THREE.Mesh[] = [];
    const letterGroup = new THREE.Group();
    scene.add(letterGroup);

    const fontLoader = new FontLoader();
    fontLoader.load(
      'https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json',
      (font) => {
        const text = 'TAKTEEQ';
        const letterSpacing = 0.3;
        const letterSize = 4;

        let totalWidth = 0;
        const letterWidths: number[] = [];
        for (let i = 0; i < text.length; i++) {
          const tg = new TextGeometry(text[i], {
            font, size: letterSize, height: 1.2, curveSegments: 12,
            bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.08, bevelSegments: 5,
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
            font, size: letterSize, height: 1.2, curveSegments: 12,
            bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.08, bevelSegments: 5,
          });
          geom.computeBoundingBox();
          const w = geom.boundingBox!.max.x - geom.boundingBox!.min.x;
          const h = geom.boundingBox!.max.y - geom.boundingBox!.min.y;
          geom.translate(-w / 2, -h / 2, 0);

          const mat = new THREE.MeshStandardMaterial({
            color: 0xF2D126, emissive: 0xF2D126, emissiveIntensity: 0.15,
            metalness: 0.85, roughness: 0.25,
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
            color: 0xF2D126,
          };
          mesh.userData = userData;

          const wireGeom = new THREE.EdgesGeometry(geom);
          const wireMat = new THREE.LineBasicMaterial({ color: 0xF2D126, transparent: true, opacity: 0.25 });
          mesh.add(new THREE.LineSegments(wireGeom, wireMat));

          letters.push(mesh);
          letterGroup.add(mesh);
          xPos += w + letterSpacing;
        }
      }
    );

    // ============ DECORATIVE ELEMENTS ============
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(20 + i * 4, 0.04, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0xF2D126, transparent: true, opacity: 0.15 + i * 0.05 })
      );
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      rings.push(ring);
      scene.add(ring);
    }

    // Starfield
    const particleCount = 1200;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [new THREE.Color(0xF2D126), new THREE.Color(0xF5F5F5), new THREE.Color(0x9A9A9A)];
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const r = 80 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({
      size: 0.18, vertexColors: true, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    }));
    scene.add(particles);

    // Grid
    const gridHelper = new THREE.GridHelper(200, 40, 0xF2D126, 0xF2D126);
    (gridHelper.material as THREE.Material).opacity = 0.08;
    (gridHelper.material as THREE.Material).transparent = true;
    gridHelper.position.y = -15;
    scene.add(gridHelper);

    // ============ CODE LABELS ============
    function createTextSprite(text: string, opts: { color: string; opacity: number; scale: number; fontSize?: number }) {
      const canv = document.createElement('canvas');
      const ctx = canv.getContext('2d')!;
      const fontSize = opts.fontSize ?? 128;
      ctx.font = `800 ${fontSize}px Manrope, sans-serif`;
      const metrics = ctx.measureText(text);
      const padding = 32;
      canv.width = Math.ceil(metrics.width + padding * 2);
      canv.height = Math.ceil(fontSize * 1.6);
      ctx.font = `800 ${fontSize}px Manrope, sans-serif`;
      ctx.fillStyle = opts.color;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.shadowColor = opts.color;
      ctx.shadowBlur = 16;
      ctx.fillText(text, canv.width / 2, canv.height / 2);
      const texture = new THREE.CanvasTexture(canv);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.needsUpdate = true;
      const material = new THREE.SpriteMaterial({
        map: texture, transparent: true, opacity: opts.opacity,
        depthWrite: false, depthTest: false,
      });
      const sprite = new THREE.Sprite(material);
      const aspect = canv.width / canv.height;
      sprite.scale.set(opts.scale * aspect, opts.scale, 1);
      sprite.renderOrder = 1;
      return sprite;
    }

    const codeLabels: { sprite: THREE.Sprite; userData: LabelUserData }[] = [];
    const getPos = () => {
      let x = 0, y = 0, z = 0;
      for (let i = 0; i < 15; i++) {
        x = (Math.random() - 0.5) * 70;
        y = (Math.random() - 0.5) * 45;
        z = (Math.random() - 0.5) * 25 + 5;
        // Stay away from TAKTEEQ logo center
        if (!(Math.abs(x) < 22 && Math.abs(y) < 7 && z > -5)) return { x, y, z };
      }
      return { x, y, z };
    };

    CODE_ITEMS.forEach((item) => {
      let opacity: number, scale: number, color: string, fontSize: number;
      switch (item.type) {
        case 'lang': opacity = 0.7; scale = 4.5; color = '#F2D126'; fontSize = 128; break;
        case 'fw': opacity = 0.6; scale = 4.0; color = '#F5F5F5'; fontSize = 128; break;
        case 'tool': opacity = 0.55; scale = 3.8; color = '#F2D126'; fontSize = 128; break;
        default: opacity = 0.85; scale = 5.5; color = '#F2D126'; fontSize = 144;
      }
      const sprite = createTextSprite(item.text, { color, opacity, scale, fontSize });
      const pos = getPos();
      sprite.position.set(pos.x, pos.y, pos.z);
      scene.add(sprite);
      codeLabels.push({
        sprite,
        userData: {
          basePos: new THREE.Vector3(pos.x, pos.y, pos.z),
          currentVel: new THREE.Vector3(0, 0, 0),
          baseOpacity: opacity,
          floatSpeed: 0.2 + Math.random() * 0.3,
          floatOffsetX: Math.random() * Math.PI * 2,
          floatOffsetY: Math.random() * Math.PI * 2,
          baseScale: sprite.scale.x,
          baseScaleY: sprite.scale.y,
        },
      });
    });

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
          (draggedLetter.userData as LetterUserData).targetPos.x = intersection.x - dragOffset.x;
          (draggedLetter.userData as LetterUserData).targetPos.y = intersection.y - dragOffset.y;
        }
        return;
      }

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(letters);
      letters.forEach((l) => {
        if ((l.userData as LetterUserData).hovered && !intersects.find((i) => i.object === l)) {
          (l.userData as LetterUserData).hovered = false;
        }
      });
      if (intersects.length > 0) {
        ((intersects[0].object as THREE.Mesh).userData as LetterUserData).hovered = true;
        canvas.style.cursor = 'grab';
      } else {
        canvas.style.cursor = 'default';
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
        dragOffset.set(pt.x - draggedLetter.position.x, pt.y - draggedLetter.position.y, 0);
        canvas.style.cursor = 'grabbing';
      }
    };

    const onMouseUp = () => {
      if (draggedLetter) {
        const ud = draggedLetter.userData as LetterUserData;
        ud.originalPos.copy(ud.targetPos);
      }
      isDragging = false;
      draggedLetter = null;
      canvas.style.cursor = 'default';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

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
        dragOffset.set(pt.x - draggedLetter.position.x, pt.y - draggedLetter.position.y, 0);
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
          (draggedLetter.userData as LetterUserData).targetPos.x = intersection.x - dragOffset.x;
          (draggedLetter.userData as LetterUserData).targetPos.y = intersection.y - dragOffset.y;
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
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Reset button
    const onReset = () => {
      letters.forEach((l) => {
        const ud = l.userData as LetterUserData;
        ud.targetPos.copy(ud.initialPos);
        ud.originalPos.copy(ud.initialPos);
      });
    };
    window.addEventListener('takteeq-reset-letters', onReset);

    // Scroll
    let scrollY = 0, targetScroll = 0;
    const onScroll = () => { targetScroll = window.scrollY / window.innerHeight; };
    window.addEventListener('scroll', onScroll);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

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

      // Rings
      rings.forEach((ring, i) => {
        ring.rotation.x += 0.003 * (i + 1);
        ring.rotation.y += 0.002 * (i + 1);
        ring.rotation.z += 0.001 * (i + 1);
      });

      particles.rotation.y = t * 0.02;
      particles.rotation.x = t * 0.01;

      // Code labels with raycaster repulsion
      const ray = new THREE.Raycaster();
      ray.setFromCamera(targetMouse, camera);
      codeLabels.forEach((lab) => {
        const ud = lab.userData;
        const baseX = ud.basePos.x + Math.sin(t * ud.floatSpeed + ud.floatOffsetX) * 1.5;
        const baseY = ud.basePos.y + Math.cos(t * ud.floatSpeed * 0.7 + ud.floatOffsetY) * 1.2;
        const baseZ = ud.basePos.z + Math.sin(t * ud.floatSpeed * 0.5) * 0.8;
        const labelZ = lab.sprite.position.z;
        const tParam = (labelZ - ray.ray.origin.z) / ray.ray.direction.z;
        const mx = ray.ray.origin.x + ray.ray.direction.x * tParam;
        const my = ray.ray.origin.y + ray.ray.direction.y * tParam;
        const dx = lab.sprite.position.x - mx;
        const dy = lab.sprite.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pushX = 0, pushY = 0, hoverScale = 1, hoverOpacity = ud.baseOpacity;
        if (dist < 12 && dist > 0.001) {
          const strength = 1 - dist / 12;
          const force = strength * strength * 10;
          pushX = (dx / dist) * force;
          pushY = (dy / dist) * force;
          hoverScale = 1 + strength * 0.4;
          hoverOpacity = Math.min(1, ud.baseOpacity + strength * 0.4);
        }
        ud.currentVel.x += (baseX + pushX - lab.sprite.position.x) * 0.1;
        ud.currentVel.y += (baseY + pushY - lab.sprite.position.y) * 0.1;
        ud.currentVel.z += (baseZ - lab.sprite.position.z) * 0.1;
        ud.currentVel.multiplyScalar(0.78);
        lab.sprite.position.x += ud.currentVel.x;
        lab.sprite.position.y += ud.currentVel.y;
        lab.sprite.position.z += ud.currentVel.z;
        const curRatio = lab.sprite.scale.x / ud.baseScale;
        const newRatio = curRatio + (hoverScale - curRatio) * 0.12;
        lab.sprite.scale.x = ud.baseScale * newRatio;
        lab.sprite.scale.y = ud.baseScaleY * newRatio;
        (lab.sprite.material as THREE.SpriteMaterial).opacity += (hoverOpacity - (lab.sprite.material as THREE.SpriteMaterial).opacity) * 0.12;
      });

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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('takteeq-reset-letters', onReset);
      renderer.dispose();
      letters.forEach((l) => {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      });
      rings.forEach((r) => { r.geometry.dispose(); (r.material as THREE.Material).dispose(); });
      codeLabels.forEach((l) => {
        l.sprite.material.map?.dispose();
        l.sprite.material.dispose();
      });
      particlesGeometry.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
}
