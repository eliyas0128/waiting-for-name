import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNetworkStatusContext } from "@/context/NetworkStatusContext";
import {
  addToSyncQueue,
  getFeedback,
  saveFeedback,
} from "@/lib/offlineStorage";
import type { Feedback, OfflineFeedback } from "@/types/index";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Send, Star, ThumbsUp, WifiOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const RATING_PREFIX = "RATING:";

function encodeMessage(rating: number, text: string) {
  return `${RATING_PREFIX}${rating}|${text}`;
}

function decodeMessage(raw: string): { rating: number; text: string } {
  if (raw.startsWith(RATING_PREFIX)) {
    const sep = raw.indexOf("|");
    if (sep > 0) {
      const r = Number.parseInt(raw.slice(RATING_PREFIX.length, sep), 10);
      return { rating: Number.isNaN(r) ? 5 : r, text: raw.slice(sep + 1) };
    }
  }
  return { rating: 5, text: raw };
}

function StarRating({
  value,
  onChange,
  readOnly = false,
  size = 24,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
  size?: number;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          disabled={readOnly}
          className={
            readOnly
              ? "cursor-default"
              : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          }
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          onClick={() => !readOnly && onChange?.(star)}
        >
          <Star
            size={size}
            className={
              star <= (hovered || value)
                ? "fill-accent-teal text-accent-teal transition-smooth"
                : "text-muted-foreground/30 transition-smooth"
            }
          />
        </button>
      ))}
    </div>
  );
}

function FeedbackCard({ fb }: { fb: Feedback }) {
  const date = new Date(Number(fb.timestamp) / 1_000_000);
  const formatted = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const { rating, text } = decodeMessage(fb.message);

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 shadow-card"
      data-ocid="feedback-card"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-sm text-accent-teal">
              {fb.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-body font-semibold text-sm text-foreground">
              {fb.name}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              {formatted}
            </p>
          </div>
        </div>
        <div className="flex gap-0.5 shrink-0 pt-0.5">
          <StarRating value={rating} readOnly size={13} />
        </div>
      </div>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  );
}

export function FeedbackSection() {
  const { actor, isFetching } = useActor(createActor);
  const { isBackendReachable } = useNetworkStatusContext();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  // Backend feedbacks
  const { data: backendFeedbacks = [], isLoading } = useQuery<Feedback[]>({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeedbacks();
    },
    enabled: !!actor && !isFetching && isBackendReachable,
  });

  // Offline feedbacks (always read from localStorage)
  const { data: offlineFeedbacks = [] } = useQuery<OfflineFeedback[]>({
    queryKey: ["offline-feedbacks"],
    queryFn: () => getFeedback().filter((f) => !f.synced),
    // Always enabled — reads from localStorage only
  });

  // Build unified feedback list: backend first, then unsynced offline entries
  const backendIds = new Set(backendFeedbacks.map((f) => String(f.id)));
  const offlineOnly = offlineFeedbacks.filter((f) => !backendIds.has(f.id));

  // Convert offline feedback to the Feedback display shape
  const offlineAsFeedback: Feedback[] = offlineOnly.map((f) => ({
    id: BigInt(0), // placeholder — won't conflict since we key by f.id string
    name: f.name,
    email: f.email,
    message: encodeMessage(5, f.message),
    timestamp: BigInt(f.createdAt) * 1_000_000n,
  }));

  const allFeedbacks: Feedback[] = [...backendFeedbacks, ...offlineAsFeedback];

  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setRating(5);
  };

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async () => {
      if (isBackendReachable && actor) {
        await actor.submitFeedback(
          name.trim(),
          email.trim(),
          encodeMessage(rating, message.trim()),
        );
      } else {
        // Save offline
        const offlineFb: OfflineFeedback = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          createdAt: Date.now(),
          synced: false,
        };
        saveFeedback(offlineFb);
        // Enqueue sync item
        addToSyncQueue({
          id: crypto.randomUUID(),
          type: "submitFeedback",
          refId: offlineFb.id,
          status: "pending",
          retries: 0,
          createdAt: Date.now(),
        });
      }
    },
    onSuccess: () => {
      if (isBackendReachable && actor) {
        toast.success("Thank you! Your feedback has been submitted.");
        queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      } else {
        toast.success("Message saved — will be sent when you go online.");
        queryClient.invalidateQueries({ queryKey: ["offline-feedbacks"] });
      }
      clearForm();
    },
    onError: () => {
      toast.error("Failed to submit feedback. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    submit();
  };

  const isDisabled = isPending || isFetching;

  return (
    <section id="feedback" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Feedback
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Share Your Opinion
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          We value your thoughts. Tell us about your experience with Perfect
          Designing Hub — your feedback helps us improve.
        </p>
      </div>

      {/* Offline notice */}
      {!isBackendReachable && (
        <div
          className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 mb-6 text-sm font-body"
          data-ocid="feedback.offline_notice"
        >
          <WifiOff size={15} className="text-amber-600 shrink-0" />
          <span className="text-amber-700 dark:text-amber-400">
            You're currently offline. Your feedback will be saved and sent
            automatically when you reconnect.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6 shadow-card sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare size={15} className="text-accent-teal" />
              </div>
              <h3 className="font-display font-bold text-base text-foreground">
                Leave a Review
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="fb-name"
                  className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Your Name
                </Label>
                <Input
                  id="fb-name"
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-ocid="feedback-name-input"
                  className="font-body text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fb-email"
                  className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Email Address
                </Label>
                <Input
                  id="fb-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-ocid="feedback-email-input"
                  className="font-body text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Rating
                </Label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="fb-message"
                  className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Your Feedback
                </Label>
                <Textarea
                  id="fb-message"
                  placeholder="Share your experience with Perfect Designing Hub..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  data-ocid="feedback-message-input"
                  className="font-body text-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isDisabled}
                className="w-full font-body font-semibold gap-2"
                data-ocid="feedback-submit-btn"
              >
                <Send size={14} />
                {isPending ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <ThumbsUp size={15} className="text-accent-teal" />
            <h3 className="font-display font-bold text-base text-foreground">
              What People Are Saying
            </h3>
            {allFeedbacks.length > 0 && (
              <span className="ml-auto text-xs bg-primary/10 text-accent-teal px-2.5 py-0.5 rounded-full font-body font-semibold">
                {allFeedbacks.length} review
                {allFeedbacks.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {isLoading && isBackendReachable ? (
            <div className="flex flex-col gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Skeleton className="w-9 h-9 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-3.5 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-3.5 w-full mb-1" />
                  <Skeleton className="h-3.5 w-4/5" />
                </div>
              ))}
            </div>
          ) : allFeedbacks.length === 0 ? (
            <div
              className="bg-card border border-dashed border-border rounded-xl p-10 text-center"
              data-ocid="feedback-empty-state"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={22} className="text-accent-teal" />
              </div>
              <h4 className="font-display font-bold text-base text-foreground mb-2">
                Be the first to share your feedback!
              </h4>
              <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
                Your opinion helps us grow. Share your experience and inspire
                others.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {allFeedbacks.map((fb, idx) => (
                <FeedbackCard
                  key={fb.id === 0n ? `offline-${idx}` : String(fb.id)}
                  fb={fb}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
