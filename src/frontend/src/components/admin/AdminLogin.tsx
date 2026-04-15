import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";

export function AdminLogin() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-elevated p-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center shadow-elevated">
            <ShieldCheck size={32} className="text-accent-teal" />
          </div>

          <div className="text-center">
            <h1 className="font-display font-bold text-2xl text-foreground mb-1">
              Admin Access
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Perfect Designing Hub — Admin Portal
            </p>
          </div>

          <div className="w-full border-t border-border" />

          <div className="w-full space-y-3 text-center">
            <p className="font-body text-sm text-muted-foreground">
              Sign in with your Internet Identity to access the admin dashboard
              and manage projects.
            </p>

            <Button
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              className="w-full gap-2 bg-primary text-primary-foreground font-body font-semibold"
              data-ocid="admin-login-btn"
              size="lg"
            >
              {isLoggingIn || isInitializing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <KeyRound size={16} />
              )}
              {isLoggingIn
                ? "Connecting…"
                : isInitializing
                  ? "Loading…"
                  : "Login with Internet Identity"}
            </Button>
          </div>

          <div className="w-full border-t border-border" />

          <a
            href="/"
            className="font-body text-xs text-muted-foreground hover:text-accent-teal transition-colors"
          >
            ← Back to main site
          </a>
        </div>

        {/* Branding */}
        <p className="text-center text-xs text-muted-foreground mt-6 font-body">
          © {new Date().getFullYear()} Perfect Designing Hub
        </p>
      </div>
    </div>
  );
}
