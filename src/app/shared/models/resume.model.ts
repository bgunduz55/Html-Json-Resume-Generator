export interface Resume {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    website?: string;
    github?: string;
    summary: string;
  };
  workExperience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    keywords: string[];  // ATS keywords for this role
    technologies: string[];  // Technical skills used
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    achievements: string[];
    relevantCourses?: string[];
  }>;
  skills: {
    technical: Array<{
      category: string;  // e.g., "Programming Languages", "Frameworks", etc.
      items: Array<{
        name: string;
        level?: string;  // e.g., "Expert", "Intermediate", "Beginner"
        yearsOfExperience?: number;
      }>;
    }>;
    softSkills: string[];  // e.g., "Leadership", "Communication", etc.
    languages: Array<{
      name: string;
      proficiency: string;  // e.g., "Native", "Fluent", "Intermediate", etc.
    }>;
  };
  certifications?: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    startDate?: string;
    endDate?: string;
    url?: string;
    technologies: string[];
    keywords: string[];  // ATS keywords for this project
    achievements: string[];
  }>;
  awards?: Array<{
    title: string;
    issuer: string;
    date: string;
    description?: string;
  }>;
  publications?: Array<{
    title: string;
    publisher: string;
    date: string;
    url?: string;
    description?: string;
  }>;
  volunteerWork?: Array<{
    organization: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
  }>;
  customSections?: Array<{
    title: string;
    items: Array<{
      title: string;
      subtitle?: string;
      date?: string;
      description?: string;
      bullets?: string[];
    }>;
  }>;
} 