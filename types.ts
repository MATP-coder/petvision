export interface ArtStyle {
  id: string;
  title: string;
  tagline: string;
  image: string;
  prompts: string[];
}

// Represents the different pages of the application
export enum AppView {
  HOME,
  STYLES,
  HOW_IT_WORKS,
  PRICING,
  CREATE,
  FAQ,
}

// Represents the steps within the creation flow
export enum CreationStep {
  UPLOAD,
  STYLE,
  PREVIEW,
  PURCHASE,
  CONFIRMATION,
}