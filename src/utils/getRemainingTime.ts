export function getRemainingSeconds(expiresAt: string) {
  const expiresMs = new Date(expiresAt).getTime();
  const nowMs = Date.now();
  const diffSec = Math.floor((expiresMs - nowMs) / 1000);
  return Math.max(diffSec, 0);
}

export function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
