import { SinhalaText } from "@/components/site/SinhalaText";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const EXIT_DURATION = 240;

export function SiteLoader() {
  const pagePath = useRouterState({ select: (state) => state.location.pathname });
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const hasEntered = useRef(false);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const content = document.getElementById("site-content");
    const previousInert = content?.inert ?? false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let disposed = false;
    let finished = false;
    const later = (fn: () => void, delay: number) => timers.push(setTimeout(fn, delay));
    const restore = () => {
      body.style.overflow = previousOverflow;
      if (content) content.inert = previousInert;
    };
    const finish = () => {
      if (disposed || finished) return;
      finished = true;
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
    setVisible(true);
    body.style.overflow = "hidden";
    if (content) content.inert = true;

    // Wait for typography on entry, without imposing a long delay on navigation.
    const minimum = motion.matches ? 0 : hasEntered.current ? 180 : 750;
    hasEntered.current = true;
    const ready = document.fonts?.ready.catch(() => undefined) ?? Promise.resolve();
    const minimumElapsed = new Promise<void>((resolve) => later(resolve, minimum));
    void Promise.all([ready, minimumElapsed]).then(finish);
    // A slow font provider must never trap visitors behind the overlay.
    later(finish, motion.matches ? 150 : 2200);

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
      aria-label="Loading Deshan Business Studies"
      aria-live="polite"
    >
      <div className="loader-content">
        <div className="loader-brand" aria-hidden="true">
          <span className="loader-monogram">
            BS
            <span className="loader-mark-dot" />
          </span>
          <span className="loader-brand-rule" />
          <span className="loader-educator">
            DESHAN
            <br />
            PATHINAYAKE
          </span>
        </div>
        <div className="loader-copy">
          <p className="loader-eyebrow">YOUR NEXT CHAPTER</p>
          <p className="loader-title">
            Business Studies<span>.</span>
          </p>
          <p lang="si" className="si loader-sinhala">
            <SinhalaText>{"දැනුමෙන් ඉදිරියට..."}</SinhalaText>
          </p>
        </div>
        <div className="loader-progress" aria-hidden="true">
          <span />
        </div>
        <p className="loader-caption" aria-hidden="true">
          <span />
          Preparing your classroom
        </p>
      </div>
      <span className="loader-footer" aria-hidden="true">
        CLARITY. CONFIDENCE. RESULTS.
      </span>
    </div>
  );
}
