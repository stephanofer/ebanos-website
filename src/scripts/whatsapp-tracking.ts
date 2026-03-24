declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    __ebanosWaTrackingInit?: boolean;
  }
}

function initWhatsAppTracking(): void {
  if (window.__ebanosWaTrackingInit) return;
  window.__ebanosWaTrackingInit = true;

  document.addEventListener("click", (e: MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
      'a[href*="wa.me"]',
    );
    if (!anchor) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      click_location: anchor.dataset.trackLocation || "unknown",
      page_path: window.location.pathname,
    });
  });
}

initWhatsAppTracking();
