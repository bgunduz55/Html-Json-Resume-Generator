export interface Template {
    id: string;
    name: string;
    description: string;
    isAtsOptimized: boolean;
    previewImageUrl: string;
    keywords?: string[];
    category: 'modern' | 'classic' | 'creative' | 'minimal';
} 