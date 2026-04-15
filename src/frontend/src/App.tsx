import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

const SKELETON_IDS = ["sk-1", "sk-2", "sk-3", "sk-4"];

function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">
      {SKELETON_IDS.map((id) => (
        <div key={id} className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg hidden sm:block" />
            <Skeleton className="h-32 rounded-lg hidden md:block" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Root (shared Layout wraps all routes for consistent header/footer) ────────
const rootRoute = createRootRoute({ component: Outlet });

// ── Layout shell: all consumer routes share the same header + footer ──────────
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: HomePage,
});

const galleryRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/gallery",
  component: GalleryPage,
});

// ── Admin route — standalone (manages its own auth/login rendering) ────────
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <AdminPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([indexRoute, galleryRoute]),
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
