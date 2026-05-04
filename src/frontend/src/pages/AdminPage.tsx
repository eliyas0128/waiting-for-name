import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { OfflinePinAuth } from "@/components/admin/OfflinePinAuth";
import { useNetworkStatusContext } from "@/context/NetworkStatusContext";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useState } from "react";

export default function AdminPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const {
    isOnline,
    isBackendReachable,
    isChecking: networkChecking,
  } = useNetworkStatusContext();
  const [offlineAuthed, setOfflineAuthed] = useState(false);

  // While auth state is loading, show nothing (prevents flash)
  if (isInitializing || networkChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-accent-teal/30 border-t-accent-teal rounded-full animate-spin" />
          <p className="font-body text-sm text-muted-foreground">
            Checking session…
          </p>
        </div>
      </div>
    );
  }

  // Online: use Internet Identity (existing behavior)
  if (isOnline && isBackendReachable) {
    if (!identity) return <AdminLogin />;
    return <AdminDashboard />;
  }

  // Offline: use PIN auth
  if (!offlineAuthed) {
    return <OfflinePinAuth onSuccess={() => setOfflineAuthed(true)} />;
  }

  return <AdminDashboard />;
}
