import { useEffect, useRef, useState } from "react";
import logo from "../images/dheeram.png";

/**
 * Minimal intro: DHEERAM logo, centered on pure black.
 * Holds for exactly 1.5s, then fades smoothly into the main site.
 * Must stay in sync with the .splash-screen transition duration in App.css.
 */
const DISPLAY_MS = 1500;
const EXIT_FADE_MS = 600; /* matches .splash-screen opacity transition in App.css */

export default function SplashScreen({ onReveal, onFinish }) {
  const [exiting, setExiting] = useState(false);

  /* Keep latest callbacks in refs so this effect runs once and the timers
     are never reset by parent re-renders. */
  const onRevealRef = useRef(onReveal);
  const onFinishRef = useRef(onFinish);
  onRevealRef.current = onReveal;
  onFinishRef.current = onFinish;

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setExiting(true);
        onRevealRef.current?.();
      }, DISPLAY_MS),
      setTimeout(() => onFinishRef.current?.(), DISPLAY_MS + EXIT_FADE_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`splash-screen${exiting ? " is-exiting" : ""}`}
      aria-hidden="true"
    >
      <img src={logo} alt="" className="splash-logo" draggable={false} />
    </div>
  );
}
