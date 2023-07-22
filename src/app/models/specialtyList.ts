import { Specialty } from "./specialty";

export interface SpecialtyList{
    cvTitle: string;
    githubUrl: string;
    linkedinUrl: string;
    playStoreUrl: string;
    appStoreUrl: string;
    lineCount: number;
    headerSpecialties: Array<Specialty>;
    specialties: Array<Specialty>;
}