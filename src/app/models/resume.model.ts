export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary?: string;
    title?: string;
    website?: string;
    linkedin?: string;
    github?: string;
}

export interface WorkExperience {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
    achievements?: string[];
}

export interface Education {
    school: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    achievements?: string[];
}

export interface Skill {
    name: string;
    level?: string;
    category?: string;
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    achievements?: string[];
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    url?: string;
    expiryDate?: string;
    description?: string;
}

export interface Resume {
    personalInfo: PersonalInfo;
    workExperience: WorkExperience[];
    education: Education[];
    skills: Skill[];
    projects?: Project[];
    certifications?: Certification[];
    languages?: string[];
    interests?: string[];
} 