import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ShieldOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PIN_KEY = "pdh_admin_pin";

function hashPin(pin: string): string {
  // Simple deterministic hash — not cryptographic, but adequate for offline UX gating
  return btoa(`pdh:${pin}:adminlock`);
}

interface OfflinePinAuthProps {
  onSuccess: () => void;
}

export function OfflinePinAuth({ onSuccess }: OfflinePinAuthProps) {
  const storedHash = localStorage.getItem(PIN_KEY);
  const isSettingPin = !storedHash;

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError("PIN must be exactly 4 digits.");
      triggerShake();
      return;
    }

    if (isSettingPin) {
      if (pin !== confirmPin) {
        setError("PINs do not match. Please try again.");
        triggerShake();
        setPin("");
        setConfirmPin("");
        return;
      }
      localStorage.setItem(PIN_KEY, hashPin(pin));
      onSuccess();
    } else {
      if (hashPin(pin) !== storedHash) {
        setError("Incorrect PIN. Please try again.");
        triggerShake();
        setPin("");
        return;
      }
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div
          className={`bg-card border border-border rounded-2xl shadow-elevated p-8 flex flex-col items-center gap-6 ${
            shaking ? "animate-[shake_0.5s_ease-in-out]" : ""
          }`}
          data-ocid="offline-pin-auth.dialog"
        >
          {/* Icon */}
          <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center shadow-elevated">
            <ShieldOff size={32} className="text-amber-400" />
          </div>

          {/* Offline badge */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-body text-xs font-semibold text-amber-600 dark:text-amber-400">
              Offline Mode
            </span>
          </div>

          <div className="text-center">
            <h1 className="font-display font-bold text-2xl text-foreground mb-1">
              {isSettingPin ? "Set Admin PIN" : "Admin Access"}
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              {isSettingPin
                ? "Set a 4-digit PIN to enable offline admin access"
                : "Enter your 4-digit PIN to access the admin dashboard"}
            </p>
          </div>

          <div className="w-full border-t border-border" />

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="pin-input"
                className="block font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {isSettingPin ? "Choose PIN" : "Enter PIN"}
              </label>
              <Input
                id="pin-input"
                ref={inputRef}
                type="password"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  setError(null);
                  setPin(e.target.value.replace(/\D/g, "").slice(0, 4));
                }}
                placeholder="• • • •"
                className="font-mono text-center text-xl tracking-[0.5em] h-12"
                data-ocid="offline-pin-auth.input"
              />
            </div>

            {isSettingPin && (
              <div className="space-y-2">
                <label
                  htmlFor="confirm-pin-input"
                  className="block font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Confirm PIN
                </label>
                <Input
                  id="confirm-pin-input"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]{4}"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => {
                    setError(null);
                    setConfirmPin(
                      e.target.value.replace(/\D/g, "").slice(0, 4),
                    );
                  }}
                  placeholder="• • • •"
                  className="font-mono text-center text-xl tracking-[0.5em] h-12"
                  data-ocid="offline-pin-auth.confirm-input"
                />
              </div>
            )}

            {error && (
              <p
                className="font-body text-sm text-destructive text-center"
                data-ocid="offline-pin-auth.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full gap-2 bg-primary text-primary-foreground font-body font-semibold"
              size="lg"
              data-ocid="offline-pin-auth.submit_button"
            >
              <Lock size={16} />
              {isSettingPin ? "Set PIN & Continue" : "Unlock Admin"}
            </Button>
          </form>

          <div className="w-full border-t border-border" />

          <a
            href="/"
            className="font-body text-xs text-muted-foreground hover:text-accent-teal transition-colors"
          >
            ← Back to main site
          </a>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 font-body">
          © {new Date().getFullYear()} Perfect Designing Hub
        </p>
      </div>
    </div>
  );
}
