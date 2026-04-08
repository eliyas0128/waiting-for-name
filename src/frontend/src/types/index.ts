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

export const COMPANY_CONTACT: ContactInfo = {
  phone: "+91 78690-91028",
  email: "pdh.tech.consultancy@gmail.com",
  address:
    "Plot No. 9A, Industrial State, Near Chhawni Chowk, Nandani Road, Bhilai, Durg - 490023, Chhattisgarh, India",
};

export const TOC_ITEMS: TocItem[] = [
  { id: "company-profile", label: "Company Profile" },
  { id: "why-choose-us", label: "Why Choose Us" },
  { id: "what-we-do", label: "What We Do" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "case-studies", label: "Case Studies" },
  { id: "quality-policy", label: "Quality Policy" },
  { id: "sister-company", label: "Sister Company" },
];
