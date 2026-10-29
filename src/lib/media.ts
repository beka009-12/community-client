// The API sends uploads as absolute links to its own host. next.config.ts
// proxies /media/ to it, so the page loads them same-origin over our HTTPS
// and never shows the API's address.
export function mediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const { pathname, search } = new URL(url);
    return pathname.startsWith("/media/") ? `${pathname}${search}` : url;
  } catch {
    return url;
  }
}
