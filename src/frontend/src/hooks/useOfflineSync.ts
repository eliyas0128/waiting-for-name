import { createActor } from "@/backend";
import { useNetworkStatusContext } from "@/context/NetworkStatusContext";
import {
  addToSyncQueue,
  getFeedback,
  getProjects,
  getSyncQueue,
  removeSyncQueueItem,
  updateSyncQueueItem,
} from "@/lib/offlineStorage";
import type { SyncQueueItem } from "@/types/index";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_RETRIES = 3;

export interface OfflineSyncStatus {
  pendingCount: number;
  isSyncing: boolean;
  syncNow: () => void;
  lastSyncAt: Date | null;
}

export function useOfflineSync(): OfflineSyncStatus {
  const { isBackendReachable } = useNetworkStatusContext();
  const { actor } = useActor(createActor);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(
    () => getSyncQueue().filter((i) => i.status === "pending").length,
  );
  const [lastSyncAt, setLastSyncAt] = useState<Date | null>(null);
  const syncingRef = useRef(false);

  const refreshPending = useCallback(() => {
    setPendingCount(
      getSyncQueue().filter((i) => i.status === "pending").length,
    );
  }, []);

  const syncNow = useCallback(async () => {
    if (syncingRef.current || !actor || !isBackendReachable) return;
    syncingRef.current = true;
    setIsSyncing(true);

    const queue = getSyncQueue().filter(
      (i) => i.status === "pending" || i.status === "retrying",
    );

    for (const item of queue) {
      if (item.retries >= MAX_RETRIES) {
        updateSyncQueueItem(item.id, "failed");
        continue;
      }
      try {
        await processQueueItem(item, actor);
        removeSyncQueueItem(item.id);
      } catch {
        if (item.retries + 1 >= MAX_RETRIES) {
          updateSyncQueueItem(item.id, "failed");
        } else {
          updateSyncQueueItem(item.id, "retrying");
        }
      }
    }

    setLastSyncAt(new Date());
    refreshPending();
    syncingRef.current = false;
    setIsSyncing(false);
  }, [actor, isBackendReachable, refreshPending]);

  // Auto-sync when backend becomes reachable
  const prevReachable = useRef(false);
  useEffect(() => {
    if (isBackendReachable && !prevReachable.current) {
      void syncNow();
    }
    prevReachable.current = isBackendReachable;
  }, [isBackendReachable, syncNow]);

  useEffect(() => {
    refreshPending();
  }, [refreshPending]);

  return {
    pendingCount,
    isSyncing,
    syncNow,
    lastSyncAt,
  };
}

async function processQueueItem(
  item: SyncQueueItem,
  actor: {
    createProject: (
      name: string,
      description: string,
      client: string,
      location: string,
      year: string,
      photoUrls: string[],
    ) => Promise<unknown>;
    submitFeedback: (
      name: string,
      email: string,
      message: string,
    ) => Promise<void>;
  },
): Promise<void> {
  if (item.type === "createProject") {
    const project = getProjects().find((p) => p.id === item.refId);
    if (!project) return;
    await actor.createProject(
      project.name,
      project.description,
      project.client,
      project.location,
      project.year,
      project.photoUrls,
    );
  } else if (item.type === "submitFeedback") {
    const fb = getFeedback().find((f) => f.id === item.refId);
    if (!fb) return;
    await actor.submitFeedback(fb.name, fb.email, fb.message);
  }
}

// Re-export addToSyncQueue for convenience
export { addToSyncQueue };
