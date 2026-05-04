import { checkCanisterHealth, isOnlineMode } from "@/lib/backendConnectivity";
import { useCallback, useEffect, useRef, useState } from "react";

const POLL_INTERVAL_MS = 30_000;

export interface NetworkStatus {
  isOnline: boolean;
  isBackendReachable: boolean;
  isChecking: boolean;
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState(() => isOnlineMode());
  const [isBackendReachable, setIsBackendReachable] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const mountedRef = useRef(true);

  const check = useCallback(async () => {
    if (!mountedRef.current) return;
    setIsChecking(true);
    const networkUp = isOnlineMode();
    setIsOnline(networkUp);
    if (!networkUp) {
      setIsBackendReachable(false);
      setIsChecking(false);
      return;
    }
    const reachable = await checkCanisterHealth();
    if (mountedRef.current) {
      setIsBackendReachable(reachable);
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void check();

    const interval = setInterval(() => void check(), POLL_INTERVAL_MS);

    const onOnline = () => void check();
    const onOffline = () => {
      setIsOnline(false);
      setIsBackendReachable(false);
      setIsChecking(false);
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [check]);

  return { isOnline, isBackendReachable, isChecking };
}
