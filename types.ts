import React from 'react';

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  headshot: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export type VantaEffect =
  | 'NONE'
  | 'NET'
  | 'WAVES'
  | 'DOTS'
  | 'FOG'
  | 'CLOUDS'
  | 'CLOUDS2'
  | 'GLOBE'
  | 'BIRDS'
  | 'CELLS'
  | 'TRUNK'
  | 'TOPOLOGY'
  | 'HALO'
  | 'RINGS'
  | 'RIPPLE';

export interface ThemeColors {
  bgColor: string;
  textPrimary: string;
  textSecondary: string;
  textTitle: string;
  borderColor: string;
  cardBg: string;
  cardBgHover: string;
  accentColor: string;
  accentColorTranslucent: string;
  accentGlow: string;
  accentShadow: string;
  accentHoverBg: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
  scrollbarThumbHover: string;
  headerBg: string;
  vantaColor: string;
  vantaBgColor: string;
}

export interface ThemeConfig {
  dark: ThemeColors;
  light: ThemeColors;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  about: string[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: CertificationItem[];
  themeConfig: ThemeConfig;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}