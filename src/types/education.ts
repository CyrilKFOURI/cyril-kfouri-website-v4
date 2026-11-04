export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: {
    start: string;
    end: string;
  };
  details?: string[];
}

export interface Certification {
  id: string;
  issuer: string;
  name: string;
  date?: string;
  credentialUrl?: string;
  topics: string[];
}
