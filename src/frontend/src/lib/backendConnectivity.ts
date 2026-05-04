/**
 * backendConnectivity.ts
 * Detects whether the ICP canister backend is reachable.
 */

const CANISTER_HEALTH_TIMEOUT_MS = 5000;

function getCanisterUrl(): string {
  // Vite injects import.meta.env at build time; use unknown cast for strict TS
  const env = (import.meta as unknown as { env: Record<string, string> }).env;
  const canisterId = env?.VITE_CANISTER_ID_BACKEND ?? "";
  if (!canisterId) return "";
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");
  if (isLocal) {
    return `http://localhost:4943/?canisterId=${canisterId}`;
  }
  return `https://${canisterId}.icp0.io/`;
}

/**
 * Pings the backend canister with an AbortController timeout.
 * Returns true if canister responds within CANISTER_HEALTH_TIMEOUT_MS.
 */
export async function checkCanisterHealth(): Promise<boolean> {
  const url = getCanisterUrl();
  if (!url) return false;
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    CANISTER_HEALTH_TIMEOUT_MS,
  );
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    });
    // Any HTTP response (including 4xx) means the canister is alive
    return res.status < 600;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Synchronous quick-check: navigator.onLine only.
 * Call checkCanisterHealth() for a full async check.
 */
export function isOnlineMode(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine;
}
