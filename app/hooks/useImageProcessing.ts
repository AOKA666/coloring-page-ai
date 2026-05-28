"use client";

import { useCallback } from "react";

export type ProcessingMode = "client" | "ai";

/**
 * Compress an image using Canvas to a max dimension.
 * Returns a base64 data URL.
 */
function compressImage(
  imageSrc: string,
  maxDimension: number = 1024
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}

/**
 * Client-side Sobel edge detection for fallback mode.
 */
function sobelProcess(
  imageSrc: string,
  edgeSensitivity: number,
  lineThickness: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      const maxSize = 1200;
      let width = img.width;
      let height = img.height;
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const output = ctx.createImageData(width, height);
      const outData = output.data;

      const gray = new Float32Array(width * height);
      for (let i = 0; i < data.length; i += 4) {
        const idx = i / 4;
        gray[idx] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      }

      const threshold = Math.max(10, 255 - edgeSensitivity * 2.5);
      const thickness = Math.max(1, Math.floor(lineThickness / 25));

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let gx = 0;
          let gy = 0;

          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const val = gray[(y + ky) * width + (x + kx)];
              const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
              const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
              const ki = (ky + 1) * 3 + (kx + 1);
              gx += val * sobelX[ki];
              gy += val * sobelY[ki];
            }
          }

          const magnitude = Math.sqrt(gx * gx + gy * gy);
          const idx4 = (y * width + x) * 4;

          if (magnitude > threshold) {
            const intensity = Math.min(255, magnitude / 4);
            outData[idx4] = intensity;
            outData[idx4 + 1] = intensity;
            outData[idx4 + 2] = intensity;
            outData[idx4 + 3] = 255;
          } else {
            outData[idx4] = 255;
            outData[idx4 + 1] = 255;
            outData[idx4 + 2] = 255;
            outData[idx4 + 3] = 255;
          }
        }
      }

      if (thickness > 1) {
        const temp = new Uint8ClampedArray(outData);
        for (let y = thickness; y < height - thickness; y++) {
          for (let x = thickness; x < width - thickness; x++) {
            const idx4 = (y * width + x) * 4;
            let hasEdge = false;
            for (let dy = -thickness; dy <= thickness && !hasEdge; dy++) {
              for (let dx = -thickness; dx <= thickness && !hasEdge; dx++) {
                const nIdx4 = ((y + dy) * width + (x + dx)) * 4;
                if (temp[nIdx4] < 240) {
                  hasEdge = true;
                }
              }
            }
            if (hasEdge) {
              outData[idx4] = 30;
              outData[idx4 + 1] = 30;
              outData[idx4 + 2] = 30;
              outData[idx4 + 3] = 255;
            }
          }
        }
      }

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          if (x < thickness || x >= width - thickness || y < thickness || y >= height - thickness) {
            const idx4 = (y * width + x) * 4;
            outData[idx4] = 255;
            outData[idx4 + 1] = 255;
            outData[idx4 + 2] = 255;
            outData[idx4 + 3] = 255;
          }
        }
      }

      ctx.putImageData(output, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageSrc;
  });
}

export function useImageProcessing() {
  const processImage = useCallback(
    async (
      imageSrc: string,
      mode: ProcessingMode,
      edgeSensitivity: number = 50,
      lineThickness: number = 50
    ): Promise<{ result: string; mode: ProcessingMode; fromCache?: boolean }> => {
      if (mode === "client") {
        const result = await sobelProcess(imageSrc, edgeSensitivity, lineThickness);
        return { result, mode: "client" };
      }

      // AI mode: compress image, call backend API
      const compressed = await compressImage(imageSrc, 1024);

      const response = await fetch("/api/colorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: compressed }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If backend returns 503 (not configured), fall back to client mode
        if (response.status === 503) {
          console.warn("AI backend not configured, falling back to client-side processing");
          const result = await sobelProcess(imageSrc, edgeSensitivity, lineThickness);
          return { result, mode: "client" };
        }
        throw new Error(data.error || "AI processing failed");
      }

      // Return the generated image URL or base64
      const result = data.imageUrl || `data:image/png;base64,${data.imageBase64}`;
      return { result, mode: "ai" };
    },
    []
  );

  return { processImage };
}
