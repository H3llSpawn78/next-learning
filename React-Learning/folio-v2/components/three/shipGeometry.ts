/**
 * components/three/shipGeometry.ts
 * ---------------------------------------------------------------------------
 * Procedurally generates the particle spaceship.
 *
 * Instead of loading a 3D model, we *sample random points* on simple
 * mathematical shapes (a tapered hull, delta wings, a tail fin, twin engines,
 * exhaust plumes and a cockpit canopy). Thousands of points on these shapes
 * read as a glowing holographic starship.
 *
 * For every particle we produce:
 *   - position  : where it sits when the ship is assembled
 *   - exploded  : where it flies to when the ship is fully blown apart
 *   - random    : a 0..1 seed used in the shader for stagger, size & shimmer
 *   - heat      : 0..1 "temperature" - engines/exhaust/cockpit glow hotter
 *
 * Coordinate system: the nose points toward +X, Y is up, Z is the wingspan.
 */

/** Typed arrays ready to be uploaded as BufferGeometry attributes. */
export interface ShipBuffers {
  positions: Float32Array;
  exploded: Float32Array;
  randoms: Float32Array;
  heat: Float32Array;
}

/** A sampled point: [x, y, z, heat]. */
type Sample = [number, number, number, number];

/** Random float in [min, max). */
const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Random sign: -1 or +1 (used to mirror parts to port/starboard). */
const side = () => (Math.random() < 0.5 ? -1 : 1);

/**
 * Uniformly sample a point inside triangle ABC using barycentric coordinates.
 * The "fold" (u+v>1) keeps the point inside the triangle rather than the
 * parallelogram, giving an even distribution.
 */
function inTriangle(
  a: [number, number, number],
  b: [number, number, number],
  c: [number, number, number],
): [number, number, number] {
  let u = Math.random();
  let v = Math.random();
  if (u + v > 1) {
    u = 1 - u;
    v = 1 - v;
  }
  return [
    a[0] + u * (b[0] - a[0]) + v * (c[0] - a[0]),
    a[1] + u * (b[1] - a[1]) + v * (c[1] - a[1]),
    a[2] + u * (b[2] - a[2]) + v * (c[2] - a[2]),
  ];
}

/** Linear interpolation between two 3D points. */
function along(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

/* ------------------------------------------------------------------------
 * Part samplers - each returns ONE random point on that part of the ship.
 * --------------------------------------------------------------------- */

/** Main hull: a tube along X whose radius swells then tapers to a nose. */
function fuselage(): Sample {
  const t = Math.random(); // 0 = tail, 1 = nose tip
  let x = -3 + t * 6.4;

  // Hull profile: slightly narrower at the tail, widest at ~40%, then a
  // curved taper (power < 1 keeps the nose "bullet" shaped, not a cone).
  const r =
    t < 0.4
      ? 0.45 + 0.17 * (t / 0.4)
      : 0.62 * Math.pow(1 - (t - 0.4) / 0.6, 0.7);

  // ~15% of points snap to evenly spaced rings -> reads as hull panel lines.
  if (Math.random() < 0.15) x = Math.round(x * 2) / 2;

  const theta = Math.random() * Math.PI * 2;
  // Squash vertically (0.75) so the hull is a sleek ellipse, not a cylinder.
  return [x, Math.cos(theta) * r * 0.75, Math.sin(theta) * r, 0];
}

/** Swept delta wings, mirrored port/starboard, with denser edge outlines. */
function wing(): Sample {
  const s = side();
  const root: [number, number, number] = [1.0, 0, 0.5 * s];
  const tip: [number, number, number] = [-2.3, 0, 3.6 * s];
  const rear: [number, number, number] = [-2.7, 0, 0.55 * s];

  // 30% of wing points trace the leading/trailing edges for crisp silhouettes.
  const r = Math.random();
  const p =
    r < 0.15
      ? along(root, tip, Math.random())
      : r < 0.3
        ? along(tip, rear, Math.random())
        : inTriangle(root, tip, rear);

  // Slight upward dihedral toward the tips + thin thickness jitter.
  p[1] += Math.abs(p[2]) * 0.06 + rand(-0.03, 0.03);
  return [p[0], p[1], p[2], 0];
}

/** Vertical tail fin sitting on top of the rear hull. */
function fin(): Sample {
  const p = inTriangle([-1.4, 0.4, 0], [-3.0, 1.8, 0], [-3.0, 0.4, 0]);
  return [p[0], p[1], p[2] + rand(-0.025, 0.025), 0.1];
}

/** Twin engine nacelles: short cylinders either side of the tail. */
function engine(): Sample {
  const s = side();
  const x = rand(-3.4, -1.8);
  const theta = Math.random() * Math.PI * 2;
  const r = 0.32;
  return [x, -0.05 + Math.cos(theta) * r, 0.9 * s + Math.sin(theta) * r, 0.35];
}

/** Exhaust plumes: volumetric cones streaming out the back - the "hottest" particles. */
function exhaust(): Sample {
  const s = side();
  const t = Math.pow(Math.random(), 1.6); // bias density toward the nozzle
  const len = 2.6;
  const radius = 0.28 * (1 - t) * Math.sqrt(Math.random()); // fill the cone volume
  const theta = Math.random() * Math.PI * 2;
  return [
    -3.4 - t * len,
    -0.05 + Math.cos(theta) * radius,
    0.9 * s + Math.sin(theta) * radius,
    1 - t * 0.6, // fades from white-hot to lime along the plume
  ];
}

/** Cockpit canopy: the top half of a stretched ellipsoid near the nose. */
function cockpit(): Sample {
  // Random direction on a unit sphere (normalised Gaussian-ish vector).
  const u = rand(-1, 1);
  const theta = Math.random() * Math.PI * 2;
  const k = Math.sqrt(1 - u * u);
  const nx = k * Math.cos(theta);
  const ny = Math.abs(u); // upper hemisphere only
  const nz = k * Math.sin(theta);
  return [1.5 + nx * 0.75, 0.32 + ny * 0.25, nz * 0.3, 0.55];
}

/**
 * Weighted list of parts. Weights are the *fraction of all particles* that
 * each part receives - tweak to change how dense each component looks.
 */
const PARTS: Array<{ weight: number; sample: () => Sample }> = [
  { weight: 0.34, sample: fuselage },
  { weight: 0.3, sample: wing },
  { weight: 0.07, sample: fin },
  { weight: 0.12, sample: engine },
  { weight: 0.12, sample: exhaust },
  { weight: 0.05, sample: cockpit },
];

/**
 * Build all particle buffers for a ship made of `count` points.
 * Called once on mount - cost is a few milliseconds even for ~20k points.
 */
export function buildShip(count: number): ShipBuffers {
  const positions = new Float32Array(count * 3);
  const exploded = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const heat = new Float32Array(count);

  // Pre-compute cumulative weights for fast weighted random part selection.
  const cumulative: number[] = [];
  PARTS.reduce((acc, p) => {
    cumulative.push(acc + p.weight);
    return acc + p.weight;
  }, 0);
  const total = cumulative[cumulative.length - 1];

  for (let i = 0; i < count; i++) {
    // 1) Pick a part according to its weight, then sample a point on it.
    const r = Math.random() * total;
    const part = PARTS[cumulative.findIndex((c) => r <= c)] ?? PARTS[0];
    const [x, y, z, h] = part.sample();

    positions.set([x, y, z], i * 3);
    heat[i] = h;
    randoms[i] = Math.random();

    // 2) Exploded target: push each particle outward from the ship's centre,
    //    blended with a random direction so the debris cloud is spherical
    //    but still roughly "remembers" which side of the ship it came from.
    let dx = x + rand(-3, 3);
    let dy = y + rand(-3, 3);
    let dz = z + rand(-3, 3);
    const len = Math.hypot(dx, dy, dz) || 1;
    dx /= len;
    dy /= len;
    dz /= len;

    // Debris radius: most particles land 6-20 units out; a few fly much farther
    // (cubic bias) to give the explosion long streaking outliers.
    const radius = 6 + Math.pow(Math.random(), 3) * 26 + Math.random() * 8;
    exploded.set([dx * radius, dy * radius * 0.8, dz * radius], i * 3);
  }

  return { positions, exploded, randoms, heat };
}
