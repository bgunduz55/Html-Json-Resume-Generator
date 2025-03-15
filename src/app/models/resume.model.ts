export interface PersonalInfo {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    website: string;
    github: string;
    summary: string;
}

export interface WorkExperience {
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
}

export interface Education {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
    location: string;
    achievements?: string[];
    description?: string;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface Project {
    name: string;
    description: string;
    role: string;
    url: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    achievements: string[];
}

export interface Certification {
    name: string;
    organization: string;
    issueDate: string;
    expiryDate: string;
    credentialId: string;
    credentialUrl: string;
    description: string;
}

export interface Resume {
    personalInfo: PersonalInfo;
    workExperience: WorkExperience[];
    education: Education[];
    skills: SkillCategory[];
    projects: Project[];
    certifications: Certification[];
} 