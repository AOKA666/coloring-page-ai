export interface AppState {
  uploadedImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  edgeSensitivity: number;
  lineThickness: number;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
}

export interface UseCaseItem {
  title: string;
  description: string;
  icon: string;
  prompt?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
  disabled?: boolean;
  comingSoon?: boolean;
}
