import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const LOAD_DURATION = 1500;
const EXIT_DURATION = 220;

export function SiteLoader() {
  const pagePath = useRouterState({ select: (state) => state.location.pathname });
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const content = document.getElementById("site-content");
    const previousInert = content?.inert ?? false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let disposed = false;
    const later = (fn: () => void, delay: number) => timers.push(setTimeout(fn, delay));
    const restore = () => {
      body.style.overflow = previousOverflow;
      if (content) content.inert = previousInert;
    };
    const finish = () => {
      if (disposed) return;
      setProgress(100);
      setExiting(true);
      later(
        () => {
          if (disposed) return;
          setVisible(false);
          restore();
        },
        motion.matches ? 100 : EXIT_DURATION,
      );
    };

    setExiting(false);
    setProgress(0);
    setVisible(true);
    body.style.overflow = "hidden";
    if (content) content.inert = true;

    // Give every page a short, consistent branded transition.
    later(finish, motion.matches ? 100 : LOAD_DURATION);
    if (!motion.matches) {
      [20, 45, 70, 90].forEach((value, index) => later(() => setProgress(value), index * 320));
    }

    return () => {
      disposed = true;
      timers.forEach(clearTimeout);
      restore();
    };
  }, [pagePath]);

  if (!visible) return null;
  return (
    <div
      key={pagePath}
      className={`site-loader${exiting ? " is-exiting" : ""}`}
      role="status"
      aria-label="Loading Business Studies"
    >
      <div className="loader-brand" aria-hidden="true">
        <svg viewBox="0 0 240 240" className="loader-ring">
          <circle cx="120" cy="120" r="114" />
        </svg>
        <strong>BS</strong>
      </div>
      <p>Business Studies</p>
      <p lang="si" className="si">
        දැනුමෙන් ඉදිරියට...
      </p>
      <div className="loader-progress" aria-hidden="true">
        <svg viewBox="0 0 300 35">
          <path d="M0 30H40L70 18L100 25L155 8L190 16L240 3H300" />
        </svg>
        <span style={{ width: `${progress}%` }} />
        <div>
          <small key={Math.floor(progress / 25)} className="loader-label">
            {
              ["Concepts", "Knowledge", "Practice", "Results"][
                Math.min(3, Math.floor(progress / 25))
              ]
            }
          </small>
          <small>{progress}%</small>
        </div>
      </div>
    </div>
  );
}
