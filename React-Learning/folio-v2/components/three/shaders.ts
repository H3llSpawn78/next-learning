/**
 * components/three/shaders.ts
 * ---------------------------------------------------------------------------
 * GLSL shaders for the particle spaceship.
 *
 * All explode/implode animation happens on the GPU: JavaScript only updates a
 * single `uProgress` uniform (0 = assembled, 1 = fully exploded) from the
 * page scroll position, and the vertex shader moves ~20k particles per frame.
 */

/**
 * Vertex shader
 * - Interpolates each particle between its ship position and exploded
 *   position, with a per-particle delay so the ship tears apart in waves.
 * - Adds a swirl (rotation around Y) and turbulence that grow with the
 *   explosion, so debris drifts organically rather than in straight lines.
 * - Sizes points by depth for proper perspective.
 */
export const shipVertexShader = /* glsl */ `
  // Custom per-particle attributes created in shipGeometry.ts
  attribute vec3 aExploded;   // destination when fully exploded
  attribute float aRandom;    // 0..1 seed
  attribute float aHeat;      // 0..1 glow temperature

  uniform float uProgress;    // 0 = ship assembled, 1 = fully exploded
  uniform float uTime;        // seconds since start (for shimmer)
  uniform float uSize;        // base point size
  uniform float uPixelRatio;  // device pixel ratio (keeps size consistent on HiDPI)

  // Passed to the fragment shader for colouring.
  varying float vProgress;
  varying float vRandom;
  varying float vHeat;

  void main() {
    // --- Staggered progress -------------------------------------------------
    // Each particle starts moving at a slightly different scroll point
    // (delay up to 0.35), creating a rippling break-up instead of a pop.
    float delay = aRandom * 0.35;
    float p = smoothstep(delay, delay + 0.65, uProgress);

    // --- Explode / implode -------------------------------------------------
    vec3 pos = mix(position, aExploded, p);

    // --- Swirl -------------------------------------------------------------
    // Rotate debris around the Y axis; direction & strength vary per particle.
    float angle = p * (aRandom - 0.5) * 4.0;
    float c = cos(angle);
    float s = sin(angle);
    pos.xz = mat2(c, -s, s, c) * pos.xz;

    // --- Turbulence --------------------------------------------------------
    // Cheap sine-based noise. Tiny when assembled (gives a holographic
    // shimmer), large when exploded (floating debris field).
    vec3 wobble = vec3(
      sin(uTime * 1.3 + aRandom * 40.0),
      cos(uTime * 1.1 + aRandom * 25.0),
      sin(uTime * 0.9 + aRandom * 60.0)
    );
    pos += wobble * (0.015 + p * 0.6);

    // --- Engine flicker ----------------------------------------------------
    // Hot exhaust particles jitter along X to look like burning thrust.
    pos.x -= aHeat * (1.0 - p) * 0.15 * sin(uTime * 20.0 + aRandom * 100.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective-correct size: farther particles are smaller.
    // Debris grows a little as it scatters to keep the cloud visible.
    float size = uSize * (0.5 + aRandom) * (1.0 + p * 0.6) * (1.0 + aHeat * 0.6);
    gl_PointSize = size * uPixelRatio / -mvPosition.z;

    vProgress = p;
    vRandom = aRandom;
    vHeat = aHeat;
  }
`;

/**
 * Fragment shader
 * - Draws each point as a soft round glow (no texture needed).
 * - Colours shift from lime (assembled) toward emerald/teal (exploded),
 *   hot particles blend toward white-lime, and a flash peaks mid-explosion.
 */
export const shipFragmentShader = /* glsl */ `
  uniform vec3 uColorA;     // assembled hull colour (lime)
  uniform vec3 uColorB;     // exploded debris colour (emerald)
  uniform vec3 uColorHot;   // engine / cockpit colour (white-lime)

  varying float vProgress;
  varying float vRandom;
  varying float vHeat;

  void main() {
    // Distance from the centre of the point sprite (0 centre, 0.5 edge).
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard; // make sprites circular

    // Soft radial falloff -> glowing dot.
    float strength = pow(1.0 - d * 2.0, 2.2);

    // Base colour: lime -> emerald as the ship breaks apart (+ per-particle variety).
    vec3 color = mix(uColorA, uColorB, clamp(vProgress * 0.9 + vRandom * 0.2, 0.0, 1.0));

    // Hot parts glow toward white-lime.
    color = mix(color, uColorHot, vHeat * 0.75);

    // Shockwave flash: brightest halfway through each particle's explosion.
    float flash = sin(vProgress * 3.14159) * 0.6;
    color += flash * uColorA * 0.6;

    // Additive blending is enabled, so alpha mainly scales brightness.
    gl_FragColor = vec4(color * strength, strength * 0.85);
  }
`;
