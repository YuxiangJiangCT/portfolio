import { ReactNode } from 'react';

export interface Profile {
  name: string;
  title: string;
  location: string;
  avatar: string;
  social: {
    linkedin: string;
    github: string;
    resume: string;
  };
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  major: string;
  gpa: number;
  startDate: string;
  endDate: string;
  icon?: ReactNode;
}

export interface Skill {
  id: string;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'database' | 'other';
  proficiency?: number;
  color?: string;
  animationDelay?: string;
}

export interface Competition {
  id: string;
  title: string;
  organizer: string;
  award: string;
  date: string;
  description: string;
  image: string;
  projects: CompetitionProject[];
}

export interface CompetitionProject {
  id: string;
  name: string;
  description: string;
  achievement: string;
  link: string;
  icon?: ReactNode;
}

export interface AboutContent {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

export interface ExpandableSectionProps {
  id: string;
  icon: ReactNode;
  title: string;
  content: ReactNode;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}