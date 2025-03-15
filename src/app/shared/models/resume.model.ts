export interface Resume {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certifications?: Certification[];
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  playStore?: string;
  appStore?: string;
  languages?: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  gpa?: string;
  description?: string;
  achievements?: string[];
}

export interface Skills {
  technical?: string[];
  soft?: string[];
  databases?: string[];
  technologies?: string[];
  programs?: string[];
}

export interface Project {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  technologies?: string[];
  achievements?: string[];
  link?: string;
}

export interface Certification {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  description?: string;
  credentialId?: string;
  credentialUrl?: string;
} 