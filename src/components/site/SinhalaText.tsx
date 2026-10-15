import { Fragment } from "react";
import wordAssets from "@/lib/sinhala-text.generated.json";

type Weight = 400 | 500 | 600 | 700;
type Asset = { id: string; widths: Record<Weight, number>; clusters: number };
const assets: Record<string, Asset> = wordAssets;

/** Inline outlined words retain the parent's font size, baseline and color.
 * Spaces remain native break opportunities; no Sinhala text node is emitted.
 * The accessible name is intentional: image rendering is not encryption.
 */
export function SinhalaText({
  children,
  weight = 400,
  tracking = 0,
}: {
  children: string;
  weight?: Weight;
  tracking?: 0 | "faq" | -0.04;
}) {
  if (!/[\u0d80-\u0dff]/u.test(children)) return <>{children}</>;
  return (
    <span className="sinhala-image-text" role="img" aria-label={children} lang="si">
      {children.split(/(\s+)/u).map((word, index) => {
        if (!word || /^\s+$/u.test(word)) return <Fragment key={index}>{word}</Fragment>;
        const asset = assets[word];
        if (!asset)
          throw new Error("Sinhala outline asset is missing. Run npm run generate:sinhala.");
        // FAQ letter spacing is inherited as -0.24px at 14.4px, rather
        // than recalculated from the button's own font size.
        const spacing = tracking === "faq" ? -1 / 60 : tracking;
        const width = asset.widths[weight] + asset.clusters * spacing;
        return (
          <span
            key={index}
            className="sinhala-image-word"
            aria-hidden="true"
            style={{ width: `${width}em` }}
          >
            <svg viewBox={`0 -1000 ${width * 1000} 1000`} focusable="false" aria-hidden="true">
              <use
                href={`/assets/sinhala-text/noto-${weight}.svg#${asset.id}${tracking === "faq" ? "-faq" : tracking ? "t-40" : ""}`}
              />
            </svg>
          </span>
        );
      })}
    </span>
  );
}
