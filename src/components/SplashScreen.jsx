import { useEffect, useRef, useState } from "react";
import logo from "../images/dheeram.png";

/**
 * Cinematic studio intro:
 * black → converging fire embers → energy core → logo forged from light → hold → exit
 *
 * Timing (must stay in sync with .splashLogoForge duration in App.css):
 * forge starts → forge ends → hold exactly 2000ms → exit fade → Hero
 */
const FORGE_AT_MS = 2100;
const FORGE_DURATION_MS = 2650; /* matches splashLogoForge in App.css */
const HOLD_MS = 2000;
const LOGO_READY_MS = FORGE_AT_MS + FORGE_DURATION_MS; /* 4750 */
const EXIT_AT_MS = LOGO_READY_MS + HOLD_MS; /* 6750 — exactly 2s after full reveal */
const EXIT_FADE_MS = 1000;
const EMBER_PALETTE = [
  { hot: [255, 230, 170], core: [255, 125, 35], mid: [215, 80, 22], outer: [120, 40, 14], ash: [90, 35, 18] },
  { hot: [255, 210, 140], core: [255, 150, 42], mid: [240, 100, 28], outer: [150, 50, 16], ash: [100, 40, 20] },
  { hot: [255, 240, 180], core: [255, 185, 65], mid: [235, 135, 40], outer: [160, 85, 28], ash: [110, 55, 22] },
  { hot: [255, 245, 195], core: [255, 205, 90], mid: [250, 165, 50], outer: [175, 110, 35], ash: [120, 70, 25] },
  { hot: [255, 195, 130], core: [255, 100, 38], mid: [200, 60, 24], outer: [130, 35, 16], ash: [85, 28, 14] },
  { hot: [255, 220, 155], core: [255, 160, 55], mid: [225, 110, 35], outer: [145, 65, 22], ash: [95, 45, 18] },
];

/** Irregular ember outline — unique blob radii per particle */
function makeEmberShape() {
  const points = 5 + Math.floor(Math.random() * 4); // 5–8
  const radii = Array.from(
    { length: points },
    () => 0.5 + Math.random() * 0.75
  );
  return { points, radii };
}

function drawEmberBlob(ctx, s, shape, squash) {
  const { points, radii } = shape;
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const idx = i % points;
    const a = (idx / points) * Math.PI * 2;
    const r = s * radii[idx];
    const px = Math.cos(a) * r * squash;
    const py = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export default function SplashScreen({ onReveal, onFinish }) {
  const canvasRef = useRef(null);
  const [exiting, setExiting] = useState(false);
  const [gathering, setGathering] = useState(false);
  const [forging, setForging] = useState(false);

  /*
   * Keep latest callbacks in refs so this effect runs ONCE.
   * Previously, onReveal/onFinish were inline App lambdas — calling
   * onReveal re-rendered App, changed those props, cleared these timers,
   * and restarted the entire sequence (so the hold never actually ended).
   */
  const onRevealRef = useRef(onReveal);
  const onFinishRef = useRef(onFinish);
  onRevealRef.current = onReveal;
  onFinishRef.current = onFinish;

  useEffect(() => {
    const timers = [
      setTimeout(() => setGathering(true), 450),
      setTimeout(() => setForging(true), FORGE_AT_MS),
      /*
       * EXIT_AT_MS = forge start + forge duration + HOLD_MS (2000)
       * = 2100 + 2650 + 2000 = 6750ms from splash mount
       */
      setTimeout(() => {
        setExiting(true);
        onRevealRef.current?.();
      }, EXIT_AT_MS),
      setTimeout(() => onFinishRef.current?.(), EXIT_AT_MS + EXIT_FADE_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let raf = 0;
    let running = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    /* Spawn from every direction around / across the viewport */
    const spawnOrigin = (i) => {
      const mode = i % 5;
      if (mode < 4) {
        const side = mode;
        const jitter = Math.random();
        const depth = 8 + Math.random() * 90;
        if (side === 0) return { x: jitter * W(), y: -depth };
        if (side === 1) return { x: W() + depth, y: jitter * H() };
        if (side === 2) return { x: jitter * W(), y: H() + depth };
        return { x: -depth, y: jitter * H() };
      }
      /* Random radial spawn outside the frame */
      const ang = Math.random() * Math.PI * 2;
      const cx = W() / 2;
      const cy = H() / 2;
      const radius = Math.hypot(cx, cy) + 20 + Math.random() * 100;
      return {
        x: cx + Math.cos(ang) * radius,
        y: cy + Math.sin(ang) * radius,
      };
    };

    const PARTICLE_COUNT = 560;
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const origin = spawnOrigin(i);
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.7;
      const orbit = 5 + Math.random() * 34;
      const palette =
        EMBER_PALETTE[Math.floor(Math.random() * EMBER_PALETTE.length)];
      const side = Math.random() < 0.5 ? -1 : 1;
      return {
        ox: origin.x,
        oy: origin.y,
        /* ~30% smaller than prior size — still clearly visible embers */
        size: (1.9 + Math.random() * 1.6) * 0.7,
        delay: 400 + (i % 48) * 28 + Math.random() * 170,
        travel: 1550 + Math.random() * 1250,
        ang: angle,
        orbit,
        glow: 0.62 + Math.random() * 0.38,
        brightness: 0.9 + Math.random() * 0.35,
        flickerSpeed: 0.008 + Math.random() * 0.018,
        flickerPhase: Math.random() * Math.PI * 2,
        flickerAmt: 0.2 + Math.random() * 0.35,
        spin: (Math.random() - 0.5) * 0.004,
        baseRot: Math.random() * Math.PI * 2,
        squash: 0.55 + Math.random() * 0.55,
        curveAmp: side * (18 + Math.random() * 48),
        windAmp: 6 + Math.random() * 16,
        windFreq: 0.0015 + Math.random() * 0.0035,
        windPhase: Math.random() * Math.PI * 2,
        lift: 8 + Math.random() * 22,
        shape: makeEmberShape(),
        coreOffX: (Math.random() - 0.5) * 0.35,
        coreOffY: (Math.random() - 0.5) * 0.35,
        palette,
      };
    });

    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const draw = (now) => {
      if (!running) return;
      const elapsed = now - start;
      const w = W();
      const h = H();
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const energyT = Math.max(0, Math.min(1, (elapsed - 1750) / 2400));
      if (energyT > 0) {
        const e = easeInOut(energyT);
        const radius = 36 + e * 175;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, `rgba(255, 236, 170, ${0.26 * e})`);
        g.addColorStop(0.32, `rgba(255, 215, 0, ${0.15 * e})`);
        g.addColorStop(0.68, `rgba(160, 110, 30, ${0.05 * e})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of particles) {
        const local = elapsed - p.delay;
        if (local < 0) continue;

        const t = Math.min(1, local / p.travel);
        const e = easeInOut(t);

        const targetX = cx + Math.cos(p.ang) * p.orbit * (1 - e * 0.85);
        const targetY = cy + Math.sin(p.ang) * p.orbit * (1 - e * 0.85);

        /* Organic curved drift — not a straight line */
        const dx = targetX - p.ox;
        const dy = targetY - p.oy;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const arc = Math.sin(e * Math.PI) * p.curveAmp;
        const wind =
          Math.sin(elapsed * p.windFreq + p.windPhase) *
          p.windAmp *
          (1 - e * 0.85);
        const float = Math.sin(e * Math.PI) * p.lift * (1 - e * 0.3);

        const x = p.ox + dx * e + nx * arc + nx * wind * 0.35;
        const y = p.oy + dy * e + ny * arc - float + ny * wind * 0.25;

        let alpha = 0;
        if (t < 0.12) alpha = (t / 0.12) * p.glow;
        else if (t < 0.68) alpha = p.glow;
        else alpha = p.glow * (1 - (t - 0.68) / 0.32);

        if (alpha <= 0.01) continue;

        /* Natural multi-frequency flicker */
        const flicker =
          1 +
          Math.sin(elapsed * p.flickerSpeed + p.flickerPhase) * p.flickerAmt +
          Math.sin(elapsed * p.flickerSpeed * 2.3 + p.flickerPhase * 1.7) *
            p.flickerAmt *
            0.45;
        const a = Math.max(0, Math.min(1, alpha * p.brightness * flicker));
        const s = p.size * (0.9 + (1 - e) * 0.2) * (0.92 + flicker * 0.08);

        const [hr, hg, hb] = p.palette.hot;
        const [cr, cg, cb] = p.palette.core;
        const [mr, mg, mb] = p.palette.mid;
        const [or, og, ob] = p.palette.outer;
        const [ar, ag, ab] = p.palette.ash;

        const rot = p.baseRot + elapsed * p.spin + e * 0.9;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);

        /* Soft fading heat aura — brighter for visibility */
        const haloR = s * 3.8;
        const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, haloR);
        halo.addColorStop(0, `rgba(${mr}, ${mg}, ${mb}, ${a * 0.42})`);
        halo.addColorStop(0.4, `rgba(${or}, ${og}, ${ob}, ${a * 0.22})`);
        halo.addColorStop(1, `rgba(${ar}, ${ag}, ${ab}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(0, 0, haloR, 0, Math.PI * 2);
        ctx.fill();

        /* Irregular organic ember body */
        const bodyGrad = ctx.createRadialGradient(
          p.coreOffX * s,
          p.coreOffY * s,
          0,
          0,
          0,
          s * 1.55
        );
        bodyGrad.addColorStop(0, `rgba(${hr}, ${hg}, ${hb}, ${Math.min(1, a * 1.25)})`);
        bodyGrad.addColorStop(0.28, `rgba(${cr}, ${cg}, ${cb}, ${Math.min(1, a * 1.05)})`);
        bodyGrad.addColorStop(0.62, `rgba(${mr}, ${mg}, ${mb}, ${a * 0.72})`);
        bodyGrad.addColorStop(0.88, `rgba(${or}, ${og}, ${ob}, ${a * 0.32})`);
        bodyGrad.addColorStop(1, `rgba(${ar}, ${ag}, ${ab}, 0)`);
        ctx.fillStyle = bodyGrad;
        drawEmberBlob(ctx, s, p.shape, p.squash);
        ctx.fill();

        /* Hot molten core — offset, not a plain gold dot */
        const coreGrad = ctx.createRadialGradient(
          p.coreOffX * s * 0.5,
          p.coreOffY * s * 0.5,
          0,
          p.coreOffX * s * 0.5,
          p.coreOffY * s * 0.5,
          s * 0.42
        );
        coreGrad.addColorStop(0, `rgba(${hr}, ${hg}, ${hb}, ${Math.min(1, a + 0.4)})`);
        coreGrad.addColorStop(0.55, `rgba(${cr}, ${cg}, ${cb}, ${a * 0.85})`);
        coreGrad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.ellipse(
          p.coreOffX * s * 0.5,
          p.coreOffY * s * 0.5,
          s * 0.38,
          s * 0.26,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className={[
        "splash-screen",
        gathering ? "is-gathering" : "",
        forging ? "is-forging" : "",
        exiting ? "is-exiting" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="splash-canvas" />

      <div className="splash-energy" />
      <div className="splash-energy-ring" />

      <div className="splash-logo-stage">
        <div className="splash-logo-forge">
          <img src={logo} alt="" className="splash-logo" draggable={false} />
          <div className="splash-logo-sheen" />
        </div>
      </div>
    </div>
  );
}
