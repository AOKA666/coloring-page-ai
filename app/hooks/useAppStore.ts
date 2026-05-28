import { create } from "zustand";

interface AppState {
  uploadedImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  edgeSensitivity: number;
  lineThickness: number;
  setUploadedImage: (image: string | null) => void;
  setProcessedImage: (image: string | null) => void;
  setIsProcessing: (processing: boolean) => void;
  setEdgeSensitivity: (value: number) => void;
  setLineThickness: (value: number) => void;
  reset: () => void;
}

const initialState = {
  uploadedImage: null,
  processedImage: null,
  isProcessing: false,
  edgeSensitivity: 50,
  lineThickness: 50,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setUploadedImage: (image) => set({ uploadedImage: image }),
  setProcessedImage: (image) => set({ processedImage: image }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setEdgeSensitivity: (value) => set({ edgeSensitivity: value }),
  setLineThickness: (value) => set({ lineThickness: value }),
  reset: () => set({ ...initialState }),
}));
