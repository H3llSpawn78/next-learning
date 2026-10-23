"use client";
/**
 * components/three/ParticleShip.tsx
 * ---------------------------------------------------------------------------
 * Full-screen, fixed three.js canvas rendering a large particle spaceship
 * behind the page content.
 *
 * Scroll behaviour (across the ENTIRE page):
 *   - Scrolling DOWN explodes the ship into a swirling debris field.
 *   - Scrolling UP implodes the debris back into the assembled ship.
 * Progress is eased each frame so the motion feels inertial, not jittery.
 *
 * Extras:
 *   - Gentle idle bobbing/banking and mouse-parallax tilt.
 *   - A background starfield that drifts with scroll for depth.
 *   - Fewer particles on small screens; reduced motion is respected.
 *   - Full GPU resource cleanup on unmount (safe with React Strict Mode).
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildShip } from "./shipGeometry";
import { shipFragmentShader, shipVertexShader } from "./shaders";
import { getScrollProgress } from "@/lib/scroll";

/** Linear interpolation helper. */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ParticleShip() {
  // The <div> the WebGL canvas gets appended into.
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ---------------------------------------------------------------
     * Environment checks
     * ------------------------------------------------------------- */
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isSmall = () => window.innerWidth < 768;
    // Particle budget: plenty for desktop, lighter for phones.
    const COUNT = isSmall() ? 9000 : 20000;

    /* ---------------------------------------------------------------
     * Renderer, scene & camera
     * ------------------------------------------------------------- */
    const renderer = new THREE.WebGLRenderer({
      antialias: false, // points don't benefit from MSAA; saves GPU time
      alpha: true, // transparent canvas so CSS gradients show through
      powerPreference: "high-performance",
    });
    // Cap pixel ratio at 2 - 3x screens would triple fill-rate cost for little gain.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      300,
    );

    /** Pull the camera back on portrait screens so the whole ship fits. */
    const frameCamera = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.position.set(0, 0, aspect < 1 ? 22 : 14);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };
    frameCamera();

    /* ---------------------------------------------------------------
     * Particle spaceship
     * ------------------------------------------------------------- */
    const ship = buildShip(COUNT);
    const shipGeometry = new THREE.BufferGeometry();
    // "position" is the assembled ship; the rest are custom shader attributes.
    shipGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(ship.positions, 3),
    );
    shipGeometry.setAttribute(
      "aExploded",
      new THREE.BufferAttribute(ship.exploded, 3),
    );
    shipGeometry.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(ship.randoms, 1),
    );
    shipGeometry.setAttribute("aHeat", new THREE.BufferAttribute(ship.heat, 1));

    const shipMaterial = new THREE.ShaderMaterial({
      vertexShader: shipVertexShader,
      fragmentShader: shipFragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: isSmall() ? 55 : 70 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uColorA: { value: new THREE.Color("#b6ff2e") }, // lime
        uColorB: { value: new THREE.Color("#00ff9d") }, // emerald
        uColorHot: { value: new THREE.Color("#f2ffd1") }, // white-lime
      },
      transparent: true,
      depthWrite: false, // let overlapping glows accumulate instead of occluding
      blending: THREE.AdditiveBlending, // overlapping particles add light -> bloom-like glow
    });

    const shipPoints = new THREE.Points(shipGeometry, shipMaterial);
    // A pleasing 3/4 view: nose toward the viewer's right, slightly from above.
    shipPoints.rotation.set(0.35, -0.55, 0.08);

    // Outer group receives scroll/mouse/idle transforms, keeping the base
    // orientation above untouched.
    const shipGroup = new THREE.Group();
    shipGroup.add(shipPoints);
    scene.add(shipGroup);

    /* ---------------------------------------------------------------
     * Background starfield
     * ------------------------------------------------------------- */
    const STAR_COUNT = isSmall() ? 800 : 1800;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      // Random point in a thick spherical shell around the scene.
      const r = 40 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      color: "#9dff6a",
      size: 0.25,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    /* ---------------------------------------------------------------
     * Interaction state
     * ------------------------------------------------------------- */
    // Start eased progress at the current scroll so a mid-page reload
    // doesn't animate from zero.
    let progress = getScrollProgress();
    // Normalised mouse position (-1..1) and its eased version.
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      shipMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      frameCamera();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    /* ---------------------------------------------------------------
     * Render loop
     * ------------------------------------------------------------- */
    const clock = new THREE.Clock();
    let frameId = 0;

    const tick = () => {
      const t = clock.getElapsedTime();

      // Ease toward the real scroll position. Reduced motion snaps faster
      // (less floaty animation) while still allowing the effect.
      const target = getScrollProgress();
      progress = lerp(progress, target, reducedMotion ? 0.25 : 0.06);

      eased.x = lerp(eased.x, pointer.x, 0.05);
      eased.y = lerp(eased.y, pointer.y, 0.05);

      shipMaterial.uniforms.uProgress.value = progress;
      shipMaterial.uniforms.uTime.value = t;

      // On wide screens the ship starts on the right (beside the hero text)
      // and glides to centre as it explodes, so the debris fills the view.
      const startX = isSmall() ? 0 : 3.2;
      const startY = isSmall() ? 2.2 : 0;
      const centreT = Math.min(progress * 4, 1); // reach centre by 25% scroll
      shipGroup.position.x = lerp(startX, 0, centreT);
      shipGroup.position.y =
        lerp(startY, 0, centreT) +
        (reducedMotion ? 0 : Math.sin(t * 0.8) * 0.15);

      // Rotation: scroll spins the debris, the mouse tilts, idle adds a slow bank.
      const idle = reducedMotion ? 0 : Math.sin(t * 0.3) * 0.12;
      shipGroup.rotation.y = progress * Math.PI * 1.25 + eased.x * 0.35 + idle;
      shipGroup.rotation.x = eased.y * 0.2 + progress * 0.4;
      shipGroup.rotation.z = idle * 0.5;

      // Stars rotate slowly over time and faster with scroll (parallax depth).
      stars.rotation.y = t * 0.008 + progress * 0.6;
      stars.rotation.x = progress * 0.2;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    /* ---------------------------------------------------------------
     * Cleanup - free GPU memory and listeners on unmount
     * ------------------------------------------------------------- */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      shipGeometry.dispose();
      shipMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  // aria-hidden: purely decorative, screen readers should skip it.
  return <div ref={mountRef} className="ship-canvas" aria-hidden="true" />;
}
