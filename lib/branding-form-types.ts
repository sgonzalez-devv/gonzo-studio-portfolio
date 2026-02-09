// Branding Form Types
export interface BrandingFormData {
  // Step 1 - Starting Point
  currentStage?: 'idea' | 'building' | 'operating' | 'undefined';
  brandGoal?: string;
  problemSolving?: string;
  currentFrustrations?: string;

  // Step 2 - Personality
  brandDescriptors?: string[];
  toneScale?: {
    formalCasual: number; // 0-100
    seriousFun: number; // 0-100
    premiumAccessible: number; // 0-100
  };
  likeBrands?: string;
  dislikeBrands?: string;

  // Step 3 - Name & Basics
  brandName?: string;
  slogan?: string;
  domains?: string;
  nameType?: 'descriptive' | 'creative' | 'abstract' | 'personal' | 'undecided';

  // Step 4 - Audience & Market
  targetAudience?: string;
  market?: string;
  businessType?: string[]; // 'b2c', 'b2b', 'both', 'unsure'

  // Step 5 - Brand Contexts
  contexts?: string[]; // 'social', 'website', 'app', 'physical', 'retail', 'team', 'events', 'ads', 'unsure'
  contextDetails?: {
    social?: string;
    website?: string;
    app?: string;
    physical?: string;
  };

  // Step 6 - Branding Depth
  brandingLevel?: 'basic' | 'professional' | 'premium' | 'unsure';
  deadline?: string;
  budgetRange?: 'none' | 'low' | 'medium' | 'high';

  // Step 7 - Final Details
  restrictions?: string;
  references?: string;
  additionalNotes?: string;

  // Meta
  submittedAt?: Date;
  userEmail?: string;
}

export const BRAND_DESCRIPTORS = [
  'Moderna',
  'Profesional',
  'Elegante',
  'Minimalista',
  'Cercana',
  'Atrevida',
  'Tecnológica',
  'Creativa',
  'Confiable',
  'Otra / No estoy seguro'
];

export const BRAND_CONTEXTS = [
  { value: 'social', label: 'Redes sociales' },
  { value: 'website', label: 'Website' },
  { value: 'app', label: 'App / software' },
  { value: 'physical', label: 'Producto físico / packaging' },
  { value: 'retail', label: 'Punto de venta físico' },
  { value: 'team', label: 'Equipo humano (uniformes, credenciales)' },
  { value: 'events', label: 'Eventos / ferias' },
  { value: 'ads', label: 'Publicidad paga' },
  { value: 'unsure', label: 'Aún no lo sé' }
];
