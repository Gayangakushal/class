import { useEffect, useState } from "react";

const FULL_TEXT = "Think like a|business|mind.";
let hasCompleted = false;

export function TypewriterHero() {
  const [characterIndex, setCharacterIndex] = useState(0);
  const [cursor, setCursor] = useState<"hidden" | "visible" | "fading">("hidden");
  // Resolve the client preference before scheduling any timers.
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      clearTimeout(timer);
      hasCompleted = true;
      setCharacterIndex(FULL_TEXT.length);
      setCursor("hidden");
    };
    const update = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) finish();
    };
    setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    if (preference.matches || hasCompleted) {
      finish();
    } else {
      const speed = window.matchMedia("(max-width: 600px)").matches ? 55 : 75;
      let index = 0;
      const type = () => {
        index += 1;
        // Separators establish the lines without appearing as typed characters.
        if (FULL_TEXT[index - 1] === "|") index += 1;
        setCharacterIndex(index);
        setCursor("visible");
        if (index === FULL_TEXT.length) {
          hasCompleted = true;
          timer = setTimeout(() => {
            setCursor("fading");
            timer = setTimeout(() => setCursor("hidden"), 300);
          }, 900);
        } else {
          timer = setTimeout(type, index === "Think like a".length ? 250 : speed);
        }
      };
      timer = setTimeout(type, 400);
    }
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", update);
    };
  }, []);

  const parts = (reducedMotion ? FULL_TEXT : FULL_TEXT.slice(0, characterIndex)).split("|");
  const activeLine = parts.length - 1;
  const renderLines = (reserved: boolean) => {
    const lines = reserved ? FULL_TEXT.split("|") : parts;
    const line = (index: number) => (
      <span className="heading-line">
        <span className="heading-line-text">
          {lines[index] ?? ""}
          {!reserved && !reducedMotion && cursor !== "hidden" && activeLine === index && (
            <span className={`typing-cursor typing-cursor--${cursor}`} aria-hidden="true" />
          )}
        </span>
      </span>
    );
    return <>
      <span className="heading-solid">{line(0)}</span>
      <span className="heading-outline">{line(1)}{line(2)}</span>
    </>;
  };

  return (
    <h1 className="hero-typewriter" aria-label="Think like a business mind.">
      <span className="typewriter-reserved" aria-hidden="true">{renderLines(true)}</span>
      <span className="typewriter-visible" aria-hidden="true">{renderLines(false)}</span>
    </h1>
  );
}
