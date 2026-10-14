export const COOKIE_PREFERENCES_EVENT = 'bhanubeyond:cookie-preferences'

export function openCookiePreferences() {
  window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))
}
