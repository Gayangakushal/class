import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site-data";

/**
 * Floating WhatsApp CTA shared across the site.
 */
export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-fab fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
