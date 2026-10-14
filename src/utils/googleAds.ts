type GoogleAdsWindow = Window & {
  gtag_report_conversion?: (url?: string) => boolean
}

/** Reports a qualified WhatsApp contact action to the Google Ads conversion tag. */
export function reportWhatsAppConversion(): void {
  (window as GoogleAdsWindow).gtag_report_conversion?.()
}
