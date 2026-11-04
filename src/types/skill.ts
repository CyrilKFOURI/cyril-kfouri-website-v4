export interface SkillItem {
  name: string;
  highlight?: boolean;
  level?: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}
