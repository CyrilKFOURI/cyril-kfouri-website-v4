export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  logo?: string;
  location: string;
  type: 'Internship' | 'Full-time' | 'Consultant' | 'Part-time';
  period: {
    start: string;
    end: string;
    isCurrent: boolean;
  };
  summary?: string;
  bulletPoints: string[];
  technologies: string[];
  metrics?: Array<{ label: string; value: string }>;
  media?: {
    documents?: Array<{ title: string; url: string; type: 'pdf'; size?: string }>;
    demoVideo?: { type: string; url: string };
  };
}
