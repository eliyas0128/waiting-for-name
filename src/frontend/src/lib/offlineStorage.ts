/**
 * offlineStorage.ts
 * Typed localStorage helpers for offline-first persistence.
 * All keys are prefixed with 'pdh_' to avoid collisions.
 */

import type {
  OfflineFeedback,
  OfflineProject,
  SyncQueueItem,
} from "@/types/index";

const PREFIX = "pdh_";
const KEYS = {
  projects: `${PREFIX}projects`,
  feedback: `${PREFIX}feedback`,
  syncQueue: `${PREFIX}sync_queue`,
} as const;

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Projects ──────────────────────────────────────────────

export function saveProject(project: OfflineProject): void {
  const existing = getProjects();
  const idx = existing.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    existing[idx] = project;
  } else {
    existing.push(project);
  }
  writeJSON(KEYS.projects, existing);
}

export function getProjects(): OfflineProject[] {
  return readJSON<OfflineProject[]>(KEYS.projects, []);
}

export function deleteProject(id: string): void {
  const filtered = getProjects().filter((p) => p.id !== id);
  writeJSON(KEYS.projects, filtered);
}

// ── Feedback ──────────────────────────────────────────────

export function saveFeedback(feedback: OfflineFeedback): void {
  const existing = getFeedback();
  const idx = existing.findIndex((f) => f.id === feedback.id);
  if (idx >= 0) {
    existing[idx] = feedback;
  } else {
    existing.push(feedback);
  }
  writeJSON(KEYS.feedback, existing);
}

export function getFeedback(): OfflineFeedback[] {
  return readJSON<OfflineFeedback[]>(KEYS.feedback, []);
}

export function deleteFeedback(id: string): void {
  const filtered = getFeedback().filter((f) => f.id !== id);
  writeJSON(KEYS.feedback, filtered);
}

// ── Sync Queue ────────────────────────────────────────────

export function getSyncQueue(): SyncQueueItem[] {
  return readJSON<SyncQueueItem[]>(KEYS.syncQueue, []);
}

export function addToSyncQueue(item: SyncQueueItem): void {
  const queue = getSyncQueue();
  queue.push(item);
  writeJSON(KEYS.syncQueue, queue);
}

export function updateSyncQueueItem(
  id: string,
  status: SyncQueueItem["status"],
): void {
  const queue = getSyncQueue().map((item) =>
    item.id === id ? { ...item, status, retries: item.retries + 1 } : item,
  );
  writeJSON(KEYS.syncQueue, queue);
}

export function removeSyncQueueItem(id: string): void {
  const filtered = getSyncQueue().filter((item) => item.id !== id);
  writeJSON(KEYS.syncQueue, filtered);
}
