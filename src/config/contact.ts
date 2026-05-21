export const contactConfig = {
  email: 'bhanukiran750@gmail.com',
  linkedin: 'https://linkedin.com/in/bhanu-kiranvemula',
  portfolio: 'https://bhanulinks.ccbp.tech/',
  calendlyUrl: 'https://calendly.com/bhanukiran750/book-a-call',
  whatsappNumber: '916309499278',
  signalUrl:
    'https://signal.me/#eu/vtBrPsC8x0eFwO_QZcu1kUFr7yeaWsyHtCtp81SOI3bjqFE_KUtJQb5jCikMNHni',
} as const;

export function getWhatsAppUrl(): string {
  const digits = contactConfig.whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(
    "Hi Bhanu, I'd like to discuss a freelance web or AI project."
  );
  return `https://wa.me/${digits}?text=${text}`;
}
