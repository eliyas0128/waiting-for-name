import { useNetworkStatusContext } from "@/context/NetworkStatusContext";
import { cn } from "@/lib/utils";

export function NetworkStatusIndicator() {
  const { isOnline, isBackendReachable, isChecking } =
    useNetworkStatusContext();

  let color: string;
  let label: string;
  let pulseClass = "";

  if (isChecking) {
    color = "bg-yellow-400";
    label = "Checking connection…";
    pulseClass = "animate-pulse";
  } else if (!isOnline) {
    color = "bg-red-500";
    label = "No internet connection";
  } else if (!isBackendReachable) {
    color = "bg-yellow-400";
    label = "Online — backend not reachable (offline mode)";
  } else {
    color = "bg-emerald-500";
    label = "Online — backend connected";
  }

  return (
    <output
      className="relative flex items-center justify-center"
      title={label}
      aria-label={label}
      data-ocid="network_status_indicator"
    >
      {/* Outer ring for "connected" pulse animation */}
      {!isChecking && isOnline && isBackendReachable && (
        <span className="absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-60 animate-ping" />
      )}
      <span
        className={cn(
          "relative inline-flex w-2.5 h-2.5 rounded-full",
          color,
          pulseClass,
        )}
      />
    </output>
  );
}
