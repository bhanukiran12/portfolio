const env = import.meta.env;

export const contactConfig = {
  email: 'hello@bhanubeyound.com',
  linkedin: 'https://www.linkedin.com/in/bhanu-kiran-vemula/',
  portfolio: 'https://bbtech.bhanubeyond.com/',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER ?? '+917075824369',
  /** Flip to false when fully booked — hides the availability band CTA copy. */
  availableForFreelance: true,
  freelanceCapacity: 'Taking on new projects',
  responseTime: 'Replies within 1–2 business days',
} as const;

export function getWhatsAppUrl(): string {
  const digits = contactConfig.whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(
    "Hi BB Technologies, I'd like to discuss a website, software, or AI automation project."
  );
  return `https://wa.me/${digits}?text=${text}`;
}
