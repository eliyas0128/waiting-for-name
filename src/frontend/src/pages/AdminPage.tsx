import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export default function AdminPage() {
  const { identity, isInitializing } = useInternetIdentity();

  // While auth state is loading, show nothing (prevents flash)
  if (isInitializing) {
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

  if (!identity) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
