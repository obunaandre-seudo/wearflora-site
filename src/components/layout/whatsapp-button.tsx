import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Wearflora on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#e1306c] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(225,48,108,0.4)] transition hover:-translate-y-0.5 hover:bg-[#c92b60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1306c]"
    >
      <MessageCircle size={21} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
