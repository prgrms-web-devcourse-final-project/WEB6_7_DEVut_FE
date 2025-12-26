let portalRoot: HTMLDivElement | null = null;

export function getPortalRoot() {
  if (typeof document === "undefined") return null;

  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.id = "portal-root";
    document.body.appendChild(portalRoot);
  }

  return portalRoot;
}
