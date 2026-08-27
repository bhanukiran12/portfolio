const env = import.meta.env;

export const contactConfig = {
  email: 'bhanukiran750@gmail.com',
  linkedin: 'https://linkedin.com/in/bhanu-kiranvemula',
  portfolio: 'https://bhanulinks.ccbp.tech/',
  calendlyUrl: env.VITE_CALENDLY_URL ?? 'https://calendly.com/bhanukiran750/book-a-call',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? '916309499278',
  signalUrl:
    env.VITE_SIGNAL_URL ??
    'https://signal.me/#eu/vtBrPsC8x0eFwO_QZcu1kUFr7yeaWsyHtCtp81SOI3bjqFE_KUtJQb5jCikMNHni',
  /** Flip to false when fully booked — hides the availability band CTA copy. */
  availableForFreelance: true,
  freelanceCapacity: 'Taking 1–2 new projects',
  responseTime: 'Replies within 24–48 hours',
} as const;

export function getWhatsAppUrl(): string {
  const digits = contactConfig.whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(
    "Hi Bhanu, I'd like to discuss an AI / automation project — RAG, a chatbot, or a workflow build."
  );
  return `https://wa.me/${digits}?text=${text}`;
}
