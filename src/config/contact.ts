const env = import.meta.env;

export const contactConfig = {
  email: 'hello@bhanubeyond.com',
  linkedin: 'https://www.linkedin.com/in/bhanu-kiran-vemula/',
  portfolio: 'https://bhanubeyond.com/',
  calendlyUrl: env.VITE_CALENDLY_URL ?? 'https://calendly.com/bhanukiran750/book-a-call',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? '916309499278',
  signalUrl:
    env.VITE_SIGNAL_URL ??
    'https://signal.me/#eu/vtBrPsC8x0eFwO_QZcu1kUFr7yeaWsyHtCtp81SOI3bjqFE_KUtJQb5jCikMNHni',
  /** Flip to false when fully booked — hides the availability band CTA copy. */
  availableForFreelance: true,
  freelanceCapacity: 'Taking on new projects',
  responseTime: 'Replies within 1–2 business days',
} as const;

export function getWhatsAppUrl(): string {
  const digits = contactConfig.whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(
    "Hi BhanuBeyond, I'd like to discuss a website, software, or AI automation project."
  );
  return `https://wa.me/${digits}?text=${text}`;
}
