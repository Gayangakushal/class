import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/site-data";

/**
 * Floating WhatsApp CTA. Renders nothing until a real number is set in
 * site-data.ts, so we never ship a dead or fabricated link.
 */
export function WhatsAppFab() {
  if (!WHATSAPP_NUMBER) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
