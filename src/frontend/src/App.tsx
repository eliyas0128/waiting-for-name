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

const SKELETON_IDS = ["sk-1", "sk-2", "sk-3", "sk-4"];

function PageSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {SKELETON_IDS.map((id) => (
        <div key={id} className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="grid grid-cols-3 gap-4 pt-2">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Root (no shared UI — each child decides its shell) ──────────────────────
const rootRoute = createRootRoute({ component: Outlet });

// ── Home route — wrapped in full Layout with sidebar + header ──────────────
const homeLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "home-layout",
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => homeLayoutRoute,
  path: "/",
  component: HomePage,
});

// ── Gallery route — standalone full-page (has own header) ─────────────────
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <GalleryPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeLayoutRoute.addChildren([indexRoute]),
  galleryRoute,
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
