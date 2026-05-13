'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Country = 'jordan' | 'syria' | 'ksa';

function drawJordanFlag(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, w, h / 3);
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, h / 3, w, h / 3);
  ctx.fillStyle = '#007A3D'; ctx.fillRect(0, (2 * h) / 3, w, h / 3);
  ctx.fillStyle = '#CE1126';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w * 0.45, h / 2);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();
  const cx = w * 0.13, cy = h / 2, outerR = h * 0.08, innerR = outerR * 0.45;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  for (let i = 0; i < 14; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i / 14) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawSyriaFlag(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#CE1126'; ctx.fillRect(0, 0, w, h / 3);
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, h / 3, w, h / 3);
  ctx.fillStyle = '#000000'; ctx.fillRect(0, (2 * h) / 3, w, h / 3);
  const starY = h / 2, starR = h * 0.09;
  ctx.fillStyle = '#007A3D';
  [w * 0.4, w * 0.6].forEach((cx) => {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? starR : starR * 0.45;
      const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = starY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  });
}

function drawSaudiFlag(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#006C35'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${h * 0.22}px Cairo, Arial, sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('لا إله إلا الله محمد رسول الله', w / 2, h * 0.4);
  const swordY = h * 0.7, swordW = w * 0.7, swordX = (w - swordW) / 2;
  ctx.fillRect(swordX + swordW * 0.08, swordY - h * 0.025, swordW * 0.78, h * 0.05);
  ctx.beginPath();
  ctx.moveTo(swordX, swordY);
  ctx.lineTo(swordX + swordW * 0.1, swordY - h * 0.04);
  ctx.lineTo(swordX + swordW * 0.1, swordY + h * 0.04);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(swordX + swordW * 0.85, swordY - h * 0.05, swordW * 0.04, h * 0.1);
  ctx.beginPath();
  ctx.arc(swordX + swordW * 0.93, swordY, h * 0.04, 0, Math.PI * 2);
  ctx.fill();
}

const FLAGS: Record<Country, (ctx: CanvasRenderingContext2D, w: number, h: number) => void> = {
  jordan: drawJordanFlag,
  syria: drawSyriaFlag,
  ksa: drawSaudiFlag,
};

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float distance = uv.x;
    float wave1 = sin(distance * 8.0 - uTime * 3.0) * 0.15;
    float wave2 = sin(distance * 4.0 - uTime * 2.0 + 1.5) * 0.08;
    float wave3 = cos(distance * 6.0 - uTime * 2.5) * 0.04;
    pos.z += (wave1 + wave2 + wave3) * distance;
    pos.y += sin(distance * 3.0 - uTime * 1.5) * 0.05 * distance;
    vec3 tangent = vec3(1.0, 0.0,
      cos(distance * 8.0 - uTime * 3.0) * 0.15 * 8.0 * distance +
      cos(distance * 4.0 - uTime * 2.0 + 1.5) * 0.08 * 4.0 * distance);
    vec3 bitangent = vec3(0.0, 1.0, 0.0);
    vNormal = normalize(cross(tangent, bitangent));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vec3 baseColor = texture2D(uTexture, vUv).rgb;
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    float ambient = 0.55;
    float lighting = ambient + diffuse * 0.7;
    float fold = clamp(vNormal.z, 0.4, 1.0);
    vec3 color = baseColor * lighting * fold;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WavingFlag({ country }: { country: Country }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const scene = new THREE.Scene();
    let w = parent.clientWidth || 300;
    let h = parent.clientHeight || 200;
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Texture
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 600;
    textureCanvas.height = 400;
    const ctx = textureCanvas.getContext('2d')!;
    FLAGS[country](ctx, textureCanvas.width, textureCanvas.height);
    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 8;
    texture.needsUpdate = true;

    const flagGeom = new THREE.PlaneGeometry(4.5, 3, 60, 40);
    const flagMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uTexture: { value: texture } },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
    const flag = new THREE.Mesh(flagGeom, flagMat);
    flag.position.x = -0.3;
    scene.add(flag);

    // Pole
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0xF2D126, metalness: 0.9, roughness: 0.25,
      emissive: 0xF2D126, emissiveIntensity: 0.15,
    });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 4.2, 12), poleMat);
    pole.position.set(-2.55, -0.4, 0);
    scene.add(pole);
    const topBall = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), poleMat);
    topBall.position.set(-2.55, 1.75, 0);
    scene.add(topBall);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(3, 3, 5);
    scene.add(dl);

    let tMx = 0, tMy = 0, mx = 0, my = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      tMx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      tMy = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onMouseLeave = () => { tMx = 0; tMy = 0; };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const ro = new ResizeObserver(() => {
      w = parent.clientWidth || 300;
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
      flagMat.uniforms.uTime.value = t;
      mx += (tMx - mx) * 0.06;
      my += (tMy - my) * 0.06;
      flag.rotation.y = mx * 0.15;
      flag.rotation.x = my * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      ro.disconnect();
      texture.dispose();
      flagGeom.dispose();
      flagMat.dispose();
      renderer.dispose();
    };
  }, [country]);

  return <canvas ref={canvasRef} />;
}
