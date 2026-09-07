import type { SVGProps } from "react";
import { Reveal } from "./HomeShowcase";

type BrandIconProps = SVGProps<SVGSVGElement> & {
  brand: "youtube" | "facebook" | "tiktok" | "instagram" | "whatsapp" | "telegram";
};

function BrandIcon({ brand, ...props }: BrandIconProps) {
  const paths = {
    youtube: (
      <>
        <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8Z" />
        <path className="social-icon-cutout" d="m10 15.3 5.2-3.3L10 8.7Z" />
      </>
    ),
    facebook: (
      <path d="M13.6 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.4V13h2.8v8h3.4Z" />
    ),
    tiktok: (
      <path d="M14.1 3c.2 1.7 1.2 3.1 2.7 4 1 .5 1.8.6 2.2.6v3.1c-1.7 0-3.3-.5-4.8-1.5v5.6a6.2 6.2 0 1 1-5.4-6.1v3.2a3 3 0 1 0 2.2 2.9V3h3.1Z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle className="social-icon-cutout" cx="12" cy="12" r="4.1" />
        <circle className="social-icon-cutout" cx="17.4" cy="6.7" r="1" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M12 2.4a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.4Z" />
        <path
          className="social-icon-cutout"
          d="M9.1 7.1c-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.5.1-.8.5-.3.4-1 1.3-1 3.1s1.3 3.6 1.5 3.8c.2.3 2.6 4 6.4 5.4 3.2.7 3.8-1.2 4.1-1.6.2-.4.2-.8.2-1-.1-.1-.3-.2-.6-.4l-2.2-1c-.3-.1-.6-.2-.8.2l-1 1.2c-.2.2-.4.3-.7.1-.4-.2-1.5-.5-2.8-1.7-1-1-1.7-2.1-1.9-2.5-.2-.3 0-.5.2-.7l.5-.6.3-.6c.1-.2 0-.4 0-.6Z"
        />
      </>
    ),
    telegram: (
      <path d="m21.5 3.8-3.2 16c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L5.8 13.5 1 12c-1-.3-1.1-1 .2-1.5L20 3.2c.9-.3 1.7.2 1.5.6Z" />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {paths[brand]}
    </svg>
  );
}

const SOCIALS = [
  {
    brand: "youtube",
    platform: "YouTube",
    account: "BS With Pathinayake",
    cta: "Watch Videos",
    href: "https://youtube.com/@BSWITHPATHINAYAKE",
  },
  {
    brand: "facebook",
    platform: "Facebook",
    account: "Deshan Pathinayake",
    cta: "Follow Us",
    href: "https://www.facebook.com/profile.php?id=100063790710560",
  },
  {
    brand: "tiktok",
    platform: "TikTok",
    account: "@deshanpathinayaka",
    cta: "Watch on TikTok",
    href: "https://www.tiktok.com/@deshanpathinayaka",
  },
  {
    brand: "instagram",
    platform: "Instagram",
    account: "@deshan_pathinayake",
    cta: "Follow Us",
    href: "https://instagram.com/deshan_pathinayake",
  },
  {
    brand: "whatsapp",
    platform: "WhatsApp Channel",
    account: "BS With Pathinayake",
    cta: "Join Channel",
    href: "https://whatsapp.com/channel/0029Va5QmvC0G0XYhHJyeL3F",
  },
  {
    brand: "telegram",
    platform: "Telegram",
    account: "BS With Pathinayake",
    cta: "Join Channel",
    href: "https://t.me/Bspathinayake",
  },
] as const;

export function FooterSocialLinks() {
  return (
    <Reveal>
      <section id="connect" className="footer-connect" aria-labelledby="footer-connect-heading">
        <h2 id="footer-connect-heading" className="sr-only">
          Connect With Us
        </h2>
        <div className="footer-social-grid">
          {SOCIALS.map((social) => (
            <a
              key={social.platform}
              className="footer-social-link"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.cta} on ${social.platform} (opens in a new tab)`}
              title={`${social.platform} — ${social.account}`}
            >
              <BrandIcon brand={social.brand} />
            </a>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
