import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNetworkStatusContext } from "@/context/NetworkStatusContext";
import {
  addToSyncQueue,
  saveProject as saveOfflineProject,
} from "@/lib/offlineStorage";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2, Plus, WifiOff, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface FormFields {
  name: string;
  description: string;
  client: string;
  location: string;
  year: string;
}

const INITIAL_FIELDS: FormFields = {
  name: "",
  description: "",
  client: "",
  location: "",
  year: new Date().getFullYear().toString(),
};

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
}

interface UploadProgress {
  id: string;
  name: string;
  progress: number;
}

export function AddProjectForm() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isOnline, isBackendReachable } = useNetworkStatusContext();
  const backendAvailable = isOnline && isBackendReachable;

  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploading, setUploading] = useState<UploadProgress[]>([]);

  const setField = (key: keyof FormFields, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    if (fileInputRef.current) fileInputRef.current.value = "";

    for (const file of files) {
      const id = `${Date.now()}-${file.name}`;
      setUploading((prev) => [...prev, { id, name: file.name, progress: 0 }]);

      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onprogress = (event) => {
            if (event.lengthComputable) {
              const pct = Math.round((event.loaded / event.total) * 80);
              setUploading((prev) =>
                prev.map((u) => (u.id === id ? { ...u, progress: pct } : u)),
              );
            }
          };
          reader.onload = () => {
            setUploading((prev) =>
              prev.map((u) => (u.id === id ? { ...u, progress: 100 } : u)),
            );
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        setPhotos((prev) => [...prev, { id, url: dataUrl, name: file.name }]);
      } catch {
        toast.error(`Failed to process ${file.name}`);
      } finally {
        setUploading((prev) => prev.filter((u) => u.id !== id));
      }
    }
  };

  const removePhoto = (id: string) =>
    setPhotos((prev) => prev.filter((p) => p.id !== id));

  /** Save project offline to localStorage and queue for sync */
  const saveOffline = () => {
    const localId = `offline-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const now = Date.now();
    saveOfflineProject({
      id: localId,
      name: fields.name.trim(),
      description: fields.description.trim(),
      client: fields.client.trim(),
      location: fields.location.trim(),
      year: fields.year.trim(),
      photoUrls: photos.map((p) => p.url),
      createdAt: now,
      synced: false,
    });
    addToSyncQueue({
      id: `sq-${localId}`,
      type: "createProject",
      refId: localId,
      status: "pending",
      retries: 0,
      createdAt: now,
    });
    toast.success("Saved offline — will sync when connected.", {
      duration: 5000,
    });
    setFields(INITIAL_FIELDS);
    setPhotos([]);
    queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
  };

  const { mutate: createProject, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.createProject(
        fields.name.trim(),
        fields.description.trim(),
        fields.client.trim(),
        fields.location.trim(),
        fields.year.trim(),
        photos.map((p) => p.url),
      );
    },
    onSuccess: () => {
      toast.success("Project added successfully!");
      setFields(INITIAL_FIELDS);
      setPhotos([]);
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
    onError: () => {
      toast.error("Failed to create project. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name.trim() || !fields.description.trim()) {
      toast.error("Project name and description are required.");
      return;
    }
    if (!backendAvailable) {
      saveOffline();
      return;
    }
    createProject();
  };

  const isDisabled = isPending || isFetching || uploading.length > 0;

  return (
    <div className="bg-card border border-border rounded-2xl shadow-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Plus size={16} className="text-accent-teal" />
        </div>
        <h2 className="font-display font-bold text-lg text-foreground">
          Add New Project
        </h2>
        {!backendAvailable && (
          <span
            className="ml-auto flex items-center gap-1 text-xs font-body font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-400/30 rounded-full px-2 py-0.5"
            data-ocid="add-form-offline-badge"
          >
            <WifiOff size={11} />
            Offline
          </span>
        )}
      </div>

      {!backendAvailable && (
        <div className="mb-5 bg-amber-500/10 border border-amber-400/30 rounded-xl px-4 py-3">
          <p className="font-body text-xs text-amber-700 dark:text-amber-300">
            You are offline. Projects will be saved locally and synced to the
            cloud automatically when you reconnect.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Project Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="proj-name"
            className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Project Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="proj-name"
            value={fields.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="e.g. PMC Services for FGD Project at DB Power Plant"
            required
            className="font-body text-sm"
            data-ocid="admin-proj-name-input"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label
            htmlFor="proj-desc"
            className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="proj-desc"
            value={fields.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Describe the scope of work, deliverables, and outcomes…"
            required
            rows={4}
            className="font-body text-sm resize-none"
            data-ocid="admin-proj-desc-input"
          />
        </div>

        {/* Client + Location (2 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="proj-client"
              className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Client
            </Label>
            <Input
              id="proj-client"
              value={fields.client}
              onChange={(e) => setField("client", e.target.value)}
              placeholder="e.g. SAIL / Vedanta"
              className="font-body text-sm"
              data-ocid="admin-proj-client-input"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="proj-location"
              className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Location
            </Label>
            <Input
              id="proj-location"
              value={fields.location}
              onChange={(e) => setField("location", e.target.value)}
              placeholder="e.g. Bhilai, Chhattisgarh"
              className="font-body text-sm"
              data-ocid="admin-proj-location-input"
            />
          </div>
        </div>

        {/* Year */}
        <div className="space-y-1.5 max-w-xs">
          <Label
            htmlFor="proj-year"
            className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Year
          </Label>
          <Input
            id="proj-year"
            value={fields.year}
            onChange={(e) => setField("year", e.target.value)}
            placeholder="e.g. 2024"
            className="font-body text-sm"
            data-ocid="admin-proj-year-input"
          />
        </div>

        {/* Photo Upload */}
        <div className="space-y-3">
          <Label className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Project Photos
          </Label>

          <label
            htmlFor="photo-upload"
            className="border-2 border-dashed border-border rounded-xl p-5 text-center cursor-pointer hover:border-accent-teal/50 hover:bg-accent/5 transition-smooth group block"
            data-ocid="admin-photo-upload-zone"
          >
            <input
              id="photo-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              className="sr-only"
            />
            <ImagePlus
              size={28}
              className="mx-auto mb-2 text-muted-foreground/50 group-hover:text-accent-teal transition-smooth"
            />
            <p className="font-body text-sm text-muted-foreground">
              <span className="text-accent-teal font-semibold">
                Click to upload
              </span>{" "}
              or drag &amp; drop
            </p>
            <p className="font-body text-xs text-muted-foreground/60 mt-1">
              JPG, PNG, WEBP — multiple files allowed
            </p>
          </label>

          {/* Upload progress indicators */}
          {uploading.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 bg-muted/40 rounded-lg px-3 py-2"
            >
              <Loader2
                size={14}
                className="animate-spin text-accent-teal shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-foreground truncate">
                  {u.name}
                </p>
                <div className="w-full bg-border rounded-full h-1 mt-1">
                  <div
                    className="bg-accent-teal h-1 rounded-full transition-all duration-300"
                    style={{ width: `${u.progress}%` }}
                  />
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground shrink-0">
                {u.progress}%
              </span>
            </div>
          ))}

          {/* Uploaded photo thumbnails */}
          {photos.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    aria-label={`Remove ${photo.name}`}
                    className="absolute top-1 right-1 w-6 h-6 bg-destructive/90 text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive focus-visible:opacity-100"
                    data-ocid="admin-photo-remove-btn"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2 border-t border-border">
          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full font-body font-semibold gap-2"
            size="lg"
            data-ocid="admin-proj-submit-btn"
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            {isPending
              ? "Creating Project…"
              : backendAvailable
                ? "Add Project"
                : "Save Offline"}
          </Button>
        </div>
      </form>
    </div>
  );
}
