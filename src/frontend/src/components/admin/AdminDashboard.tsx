import { createActor } from "@/backend";
import type { ProjectItem } from "@/backend";
import { AddProjectForm } from "@/components/admin/AddProjectForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNetworkStatusContext } from "@/context/NetworkStatusContext";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import {
  deleteProject as deleteOfflineProject,
  getProjects as getOfflineProjects,
} from "@/lib/offlineStorage";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  FolderOpen,
  Loader2,
  LogOut,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/** Combined shape for display — works for both online (backend) and offline (localStorage) projects */
interface DisplayableProject extends ProjectItem {
  offlineId?: string;
  syncStatus: "synced" | "pending" | "failed";
}

function SyncBadge({ status }: { status: DisplayableProject["syncStatus"] }) {
  if (status === "synced") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-1.5 py-0.5 shrink-0">
        <span className="w-1 h-1 rounded-full bg-emerald-500" />
        Synced
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-destructive bg-destructive/10 border border-destructive/20 rounded-full px-1.5 py-0.5 shrink-0">
        <span className="w-1 h-1 rounded-full bg-destructive" />
        Sync Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-1.5 py-0.5 shrink-0">
      <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
      Pending Sync
    </span>
  );
}

function ProjectRow({
  project,
  onDelete,
  isDeleting,
}: {
  project: DisplayableProject;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <div
      className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0"
      data-ocid={`admin-proj-row-${project.offlineId ?? String(project.id)}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-body font-semibold text-sm text-foreground truncate">
            {project.name}
          </h3>
          <SyncBadge status={project.syncStatus} />
          {project.photoUrls.length > 0 && (
            <Badge variant="secondary" className="text-xs font-mono shrink-0">
              {project.photoUrls.length} photo
              {project.photoUrls.length !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
        <p className="font-body text-xs text-muted-foreground line-clamp-2 mb-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {project.client && (
            <span className="flex items-center gap-1">
              <User size={10} className="text-accent-teal" />
              {project.client}
            </span>
          )}
          {project.location && (
            <span className="flex items-center gap-1">
              <MapPin size={10} className="text-accent-teal" />
              {project.location}
            </span>
          )}
          {project.year && (
            <span className="flex items-center gap-1">
              <Calendar size={10} className="text-accent-teal" />
              {project.year}
            </span>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        disabled={isDeleting}
        aria-label={`Delete project: ${project.name}`}
        className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
        data-ocid="admin-proj-delete-btn"
        type="button"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
}

export function AdminDashboard() {
  const { clear, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const { isOnline, isBackendReachable } = useNetworkStatusContext();
  const backendAvailable = isOnline && isBackendReachable;
  const { pendingCount, isSyncing, syncNow } = useOfflineSync();

  // Online: fetch from backend. Offline: read from localStorage.
  const { data: onlineProjects = [], isLoading: onlineLoading } = useQuery<
    ProjectItem[]
  >({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching && backendAvailable,
  });

  const [offlineProjects, setOfflineProjects] = useState(() =>
    getOfflineProjects(),
  );

  const projects: DisplayableProject[] = backendAvailable
    ? onlineProjects.map((p) => ({ ...p, syncStatus: "synced" as const }))
    : offlineProjects.map((p) => ({
        id: BigInt(0),
        name: p.name,
        description: p.description,
        client: p.client,
        location: p.location,
        year: p.year,
        photoUrls: p.photoUrls,
        createdAt: BigInt(p.createdAt),
        offlineId: p.id,
        syncStatus: p.synced ? ("synced" as const) : ("pending" as const),
      }));

  const isLoading = backendAvailable ? onlineLoading : false;

  // Re-read localStorage projects whenever backendAvailable or a mutation fires
  useEffect(() => {
    if (!backendAvailable) {
      setOfflineProjects(getOfflineProjects());
    }
  }, [backendAvailable]);

  const { mutate: deleteProject, variables: deletingId } = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      toast.success("Project deleted.");
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      setOfflineProjects(getOfflineProjects());
    },
    onError: () => {
      toast.error("Failed to delete project.");
    },
  });

  const handleDelete = (project: DisplayableProject) => {
    if (!backendAvailable && project.offlineId) {
      deleteOfflineProject(project.offlineId);
      toast.success("Project removed.");
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      setOfflineProjects(getOfflineProjects());
      return;
    }
    deleteProject(project.id);
  };

  const principalStr = identity?.getPrincipal().toText() ?? "";
  const shortPrincipal =
    principalStr.length > 20
      ? `${principalStr.slice(0, 10)}…${principalStr.slice(-6)}`
      : principalStr;

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-elevated">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <ShieldCheck size={16} className="text-accent-teal" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <div className="font-display font-bold text-sm text-foreground">
                  Admin Dashboard
                </div>
                {!backendAvailable && (
                  <div
                    className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 rounded-full px-2 py-0.5"
                    data-ocid="admin-offline-badge"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-body text-xs font-semibold text-amber-600 dark:text-amber-400">
                      Offline
                    </span>
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground font-body">
                Perfect Designing Hub
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={syncNow}
                disabled={isSyncing || !backendAvailable}
                className="gap-1.5 font-body text-xs text-amber-600 border-amber-400/40 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                data-ocid="admin-sync-btn"
              >
                {isSyncing ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <RefreshCw size={12} />
                )}
                {isSyncing ? "Syncing…" : `${pendingCount} pending`}
              </Button>
            )}
            {shortPrincipal && (
              <span
                className="hidden sm:block font-mono text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full truncate max-w-[180px]"
                title={principalStr}
              >
                {shortPrincipal}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={clear}
              className="gap-1.5 font-body text-sm"
              data-ocid="admin-logout-btn"
            >
              <LogOut size={14} />
              Logout
            </Button>
            <a
              href="/"
              className="text-xs text-muted-foreground hover:text-accent-teal transition-colors font-body"
            >
              ← Main site
            </a>
          </div>
        </div>
      </header>

      {/* Offline warning banner */}
      {!backendAvailable && (
        <div
          className="bg-amber-500/10 border-b border-amber-400/30 px-4 py-2.5 text-center"
          data-ocid="admin-offline-banner"
        >
          <p className="font-body text-xs text-amber-700 dark:text-amber-300">
            <span className="font-semibold">You are in offline mode.</span>{" "}
            Projects saved now will sync automatically when connection is
            restored.
            {pendingCount > 0 && (
              <>
                {" "}
                &nbsp;•&nbsp;{" "}
                <span className="font-semibold">
                  {pendingCount} item{pendingCount > 1 ? "s" : ""} pending sync.
                </span>
                {backendAvailable && (
                  <button
                    type="button"
                    onClick={syncNow}
                    className="ml-1.5 underline font-semibold hover:no-underline"
                  >
                    Sync Now
                  </button>
                )}
              </>
            )}
          </p>
        </div>
      )}

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Add Project Form — sticky on desktop */}
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <AddProjectForm />
          </div>

          {/* Project List */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-muted/30">
                <FolderOpen size={16} className="text-accent-teal" />
                <h2 className="font-display font-bold text-base text-foreground">
                  All Projects
                </h2>
                {!isLoading && (
                  <span className="ml-auto font-mono text-xs text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full">
                    {projects.length}
                  </span>
                )}
              </div>

              <div className="px-5">
                {isLoading ? (
                  <div className="py-4 space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="space-y-2 pb-4 border-b border-border last:border-0"
                      >
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <div
                    className="py-10 text-center"
                    data-ocid="admin-projects-empty"
                  >
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                      <FolderOpen
                        size={18}
                        className="text-muted-foreground/50"
                      />
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      No projects yet. Add one using the form.
                    </p>
                  </div>
                ) : (
                  <div data-ocid="admin-projects-list">
                    {projects.map((project, idx) => (
                      <ProjectRow
                        key={project.offlineId ?? String(project.id) + idx}
                        project={project}
                        onDelete={() => handleDelete(project)}
                        isDeleting={
                          !project.offlineId && deletingId === project.id
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-muted/30 py-5 text-center">
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Perfect Designing Hub — Admin Portal
        </p>
      </footer>
    </div>
  );
}
