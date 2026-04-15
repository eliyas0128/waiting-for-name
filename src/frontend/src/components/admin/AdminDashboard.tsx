import { createActor } from "@/backend";
import type { ProjectItem } from "@/backend";
import { AddProjectForm } from "@/components/admin/AddProjectForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  FolderOpen,
  LogOut,
  MapPin,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";

function ProjectRow({
  project,
  onDelete,
  isDeleting,
}: {
  project: ProjectItem;
  onDelete: (id: bigint) => void;
  isDeleting: boolean;
}) {
  return (
    <div
      className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0"
      data-ocid={`admin-proj-row-${project.id}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-body font-semibold text-sm text-foreground truncate">
            {project.name}
          </h3>
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
        onClick={() => onDelete(project.id)}
        disabled={isDeleting}
        aria-label={`Delete project: ${project.name}`}
        className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
        data-ocid="admin-proj-delete-btn"
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

  const { data: projects = [], isLoading } = useQuery<ProjectItem[]>({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });

  const { mutate: deleteProject, variables: deletingId } = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      toast.success("Project deleted.");
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
    onError: () => {
      toast.error("Failed to delete project.");
    },
  });

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
              <div className="font-display font-bold text-sm text-foreground">
                Admin Dashboard
              </div>
              <div className="text-xs text-muted-foreground font-body">
                Perfect Designing Hub
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
                    {projects.map((project) => (
                      <ProjectRow
                        key={String(project.id)}
                        project={project}
                        onDelete={deleteProject}
                        isDeleting={deletingId === project.id}
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
