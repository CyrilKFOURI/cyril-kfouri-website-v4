export interface Profile {
  name: string;
  title: string;
  headline: string;
  tagline: string;
  nationality: string;
  location: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  projectsOverviewUrl?: string;
  bio: string[];
  interests: string[];
  cv: {
    en: string;
    fr?: string;
  };
}
