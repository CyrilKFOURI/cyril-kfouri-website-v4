export interface CreativeMediaItem {
  id: string;
  type: 'youtube' | 'video' | 'audio' | 'link';
  title: string;
  subtitle?: string;
  category: 'piano' | 'music' | 'chess' | 'creative';
  url: string; // YouTube embed ID or video URL
  thumbnail?: string;
  description?: string;
  date?: string;
}

export interface CreativeShowcase {
  enabled: boolean;
  sectionTitle: string;
  subtitle?: string;
  description?: string;
  items: CreativeMediaItem[];
}
