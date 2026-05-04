export interface TocItem {
  id: string;
  label: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectItem {
  title: string;
  client: string;
  location: string;
  year: string;
  category: string;
  description: string;
}

/** Unified display shape used in the Projects section UI */
export interface DisplayProject {
  id: string;
  title: string;
  client: string;
  location: string;
  year: string;
  category: string;
  description: string;
  photos: string[];
}

export interface CaseStudy {
  title: string;
  challenge: string;
  solution: string;
  result: string;
  sector: string;
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface Feedback {
  id: bigint;
  name: string;
  email: string;
  message: string;
  timestamp: bigint;
}

export const COMPANY_CONTACT: ContactInfo = {
  phone: "+91 78690-91028",
  email: "pdh.tech.consultancy@gmail.com",
  address:
    "2nd floor, tiranga bhawan, junwani Road, near Aman dhaba, bhilai, durg (C.G.)-490023",
};

export const TOC_ITEMS: TocItem[] = [
  { id: "company-profile", label: "Company Profile" },
  { id: "why-choose-us", label: "Why Choose Us" },
  { id: "what-we-do", label: "What We Do" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "case-studies", label: "Case Studies" },
  { id: "gallery", label: "Gallery", icon: "\uD83D\uDDBC\uFE0F" },
  { id: "feedback", label: "Feedback" },
];

// ── Offline / Sync types ────────────────────────────────────────
// Shared by offlineStorage.ts, useOfflineSync, and useNetworkStatus

/** A project stored locally before being synced to the canister */
export interface OfflineProject {
  /** Local string ID (crypto.randomUUID()) — NOT a bigint canister ID */
  id: string;
  name: string;
  description: string;
  client: string;
  location: string;
  year: string;
  photoUrls: string[];
  createdAt: number; // Date.now()
  /** Whether the item has been confirmed saved to the canister */
  synced: boolean;
}

/** A feedback entry stored locally before being synced to the canister */
export interface OfflineFeedback {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: number;
  synced: boolean;
}

/** A queued operation waiting to be replayed against the canister */
export interface SyncQueueItem {
  id: string;
  type: "createProject" | "submitFeedback";
  /** ID of the local OfflineProject or OfflineFeedback this action references */
  refId: string;
  status: "pending" | "retrying" | "failed";
  /** Number of retry attempts made so far */
  retries: number;
  createdAt: number;
}
