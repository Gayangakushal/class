export function SampleImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <div className={`sample-cover ${className}`}>
    <img src={src} alt={alt} width={960} height={600} loading="lazy" decoding="async"
      onError={event => {
        const fallback = "/images/classes/physical-class.svg";
        if (event.currentTarget.getAttribute("src") !== fallback) event.currentTarget.src = fallback;
      }} />
    <span>REPLACEABLE SAMPLE ASSET</span>
  </div>;
}
