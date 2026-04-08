import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));

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

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <HomePage />
      </Suspense>
    </Layout>
  );
}
