import { useEffect, useState } from "react";

const SESSION_KEY = "bs-site-loaded-v2";
export function SiteLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch { /* Storage may be disabled. */ }
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const content = document.getElementById("site-content");
    const previousInert = content?.inert ?? false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let disposed = false;
    let finishing = false;
    let readyTimer: ReturnType<typeof setTimeout> | undefined;
    const startedAt = performance.now();
    const later = (fn: () => void, delay: number) => timers.push(setTimeout(fn, delay));
    const restore = () => {
      body.style.overflow = previousOverflow;
      if (content) content.inert = previousInert;
    };
    const finish = () => {
      if (disposed || finishing) return;
      finishing = true;
      setProgress(100);
      setExiting(true);
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* Continue without persistence. */ }
      later(() => { setVisible(false); restore(); }, motion.matches ? 180 : 240);
    };
    const onAssetsReady = () => {
      if (disposed || finishing || readyTimer !== undefined) return;
      // Cached images must not skip the brand reveal in the same React render.
      readyTimer = setTimeout(finish, Math.max(0, 1200 - (performance.now() - startedAt)));
    };
    setExiting(false);
    setProgress(0);
    setVisible(true);
    body.style.overflow = "hidden";
    if (content) content.inert = true;
    // Hard exit bounds the whole experience to 1.8s even if assets never resolve.
    later(finish, motion.matches ? 60 : 1560);
    if (!motion.matches) {
      [20, 45, 70, 90].forEach((value, i) => later(() => {
        if (!finishing) setProgress(value);
      }, i * 320));
      const hero = document.querySelector<HTMLImageElement>(".hero-teacher-image");
      if (!hero || hero.complete) onAssetsReady();
      else {
        hero.addEventListener("load", onAssetsReady, { once: true });
        hero.addEventListener("error", onAssetsReady, { once: true });
      }
    }
    const onMotion = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", onMotion);
    return () => {
      disposed = true;
      timers.forEach(clearTimeout);
      clearTimeout(readyTimer);
      motion.removeEventListener("change", onMotion);
      const hero = document.querySelector(".hero-teacher-image");
      hero?.removeEventListener("load", onAssetsReady);
      hero?.removeEventListener("error", onAssetsReady);
      restore();
    };
  }, []);

  if (!visible) return null;
  return <div className={`site-loader${exiting ? " is-exiting" : ""}`} role="status" aria-label="Loading Business Studies">
    <div className="loader-brand" aria-hidden="true">
      <svg viewBox="0 0 240 240" className="loader-ring"><circle cx="120" cy="120" r="114" /></svg>
      <strong>BS</strong>
    </div>
    <p>Business Studies</p>
    <p lang="si" className="si">දැනුමෙන් ඉදිරියට...</p>
    <div className="loader-progress" aria-hidden="true">
      <svg viewBox="0 0 300 35"><path d="M0 30H40L70 18L100 25L155 8L190 16L240 3H300" /></svg>
      <span style={{ width: `${progress}%` }} />
      <div><small key={Math.floor(progress / 25)} className="loader-label">{["Concepts", "Knowledge", "Practice", "Results"][Math.min(3, Math.floor(progress / 25))]}</small><small>{progress}%</small></div>
    </div>
  </div>;
}
