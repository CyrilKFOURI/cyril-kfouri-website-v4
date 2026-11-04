export type ProjectCategory =
  | 'quantitative-finance'
  | 'data-science'
  | 'agentic-ai'
  | 'ai-tooling'
  | 'mobile-software'
  | 'creative-tech';

export type ProjectStatus = 'completed' | 'in-progress' | 'competition' | 'featured';

export interface ProjectLink {
  type: 'github' | 'live' | 'paper' | 'demo' | 'external';
  label: string;
  url: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectMedia {
  thumbnail?: string;
  gallery?: Array<{
    type: 'image' | 'video';
    url: string;
    caption?: string;
  }>;
  demoVideo?: {
    type: 'mp4' | 'youtube' | 'vimeo' | 'embed';
    url: string;
    poster?: string;
  };
  documents?: Array<{
    title: string;
    url: string;
    type: 'pdf' | 'slides' | 'paper';
    size?: string;
  }>;
}

export interface ProjectContentSection {
  title?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  callout?: {
    type: 'info' | 'highlight' | 'quote';
    text: string;
  };
  codeSnippet?: {
    language: string;
    title?: string;
    code: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  featured: boolean;
  order: number;
  dates?: string;
  context?: string;
  summary: string;
  tags: string[];
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
  media?: ProjectMedia;
  sections: ProjectContentSection[];
}
