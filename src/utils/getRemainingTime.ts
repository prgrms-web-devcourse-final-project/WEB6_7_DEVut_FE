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

// 일반 경매 마감 시간 전용
export function delayAuctionformatRemain(ms: number) {
  if (ms <= 0) return "마감";

  const totalSeconds = Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(days).padStart(2, "0")}일 ${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
