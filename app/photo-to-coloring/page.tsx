"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Download,
  ImageIcon,
  Wand2,
  SlidersHorizontal,
  X,
  Check,
  Loader2,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "../hooks/useAppStore";
import { useImageProcessing } from "../hooks/useImageProcessing";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function PhotoToColoringPage() {
  const {
    uploadedImage,
    processedImage,
    isProcessing,
    processingMode,
    edgeSensitivity,
    lineThickness,
    setUploadedImage,
    setProcessedImage,
    setIsProcessing,
    setProcessingMode,
    setEdgeSensitivity,
    setLineThickness,
    reset,
  } = useAppStore();

  const { processImage } = useImageProcessing();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setErrorMsg(null);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setProcessedImage(null);
        setProgress(0);

        setIsProcessing(true);
        const interval = setInterval(() => {
          setProgress((p) => {
            if (p >= 90) {
              clearInterval(interval);
              return 90;
            }
            return p + Math.random() * 15;
          });
        }, 300);

        try {
          const { result: processed, mode: usedMode } = await processImage(
            result,
            processingMode,
            edgeSensitivity,
            lineThickness
          );
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => {
            setProcessedImage(processed);
            if (usedMode !== processingMode) {
              setProcessingMode(usedMode);
            }
            setIsProcessing(false);
          }, 400);
        } catch (err: any) {
          clearInterval(interval);
          setIsProcessing(false);
          setErrorMsg(err.message || "Processing failed. Please try again.");
          console.error("Processing failed:", err);
        }
      };
      reader.readAsDataURL(file);
    },
    [processingMode, edgeSensitivity, lineThickness, processImage, setUploadedImage, setProcessedImage, setIsProcessing, setProcessingMode]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleReprocess = useCallback(async () => {
    if (!uploadedImage) return;
    setProcessedImage(null);
    setProgress(0);
    setErrorMsg(null);
    setIsProcessing(true);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + Math.random() * 15;
      });
    }, 300);

    try {
      const { result: processed, mode: usedMode } = await processImage(
        uploadedImage,
        processingMode,
        edgeSensitivity,
        lineThickness
      );
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setProcessedImage(processed);
        if (usedMode !== processingMode) {
          setProcessingMode(usedMode);
        }
        setIsProcessing(false);
      }, 400);
    } catch (err: any) {
      clearInterval(interval);
      setIsProcessing(false);
      setErrorMsg(err.message || "Processing failed. Please try again.");
      console.error("Processing failed:", err);
    }
  }, [uploadedImage, processingMode, edgeSensitivity, lineThickness, processImage, setProcessedImage, setIsProcessing, setProcessingMode]);

  const handleDownload = useCallback(() => {
    if (!processedImage) return;
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = `coloring-page-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage]);

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Home
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              <span className="text-gradient">Photo to Coloring Page</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Upload any photo and instantly convert it into a printable coloring page.
            </p>
          </div>

          {/* Mode selector */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Cpu size={16} className="text-gray-400" />
                Processing Mode:
              </span>
              <div className="flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setProcessingMode("ai")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    processingMode === "ai"
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Sparkles size={14} />
                  AI Powered (Seedream)
                </button>
                <button
                  onClick={() => setProcessingMode("client")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    processingMode === "client"
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Cpu size={14} />
                  Browser (Instant)
                </button>
              </div>
              {processingMode === "ai" && (
                <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  Higher quality, needs API key
                </span>
              )}
              {processingMode === "client" && (
                <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                  Instant, works offline
                </span>
              )}
            </div>
          </div>

          {/* Error banner */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3"
              >
                <X size={18} className="mt-0.5 shrink-0" />
                <div className="flex-1">{errorMsg}</div>
                <button
                  onClick={() => setErrorMsg(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!uploadedImage ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative rounded-3xl border-2 border-dashed p-12 sm:p-20 text-center cursor-pointer transition-all duration-300 ${
                    dragActive
                      ? "border-[#FF6B6B] bg-[#FF6B6B]/5 shadow-glow"
                      : "border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={onFileInputChange}
                    className="hidden"
                  />
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 flex items-center justify-center mx-auto mb-6">
                    <Upload size={36} className="text-[#FF6B6B]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Drag & drop your photo here
                  </h3>
                  <p className="text-gray-400 mb-6">
                    or click to browse. Supports JPG, PNG, Webp up to 10MB.
                  </p>
                  <span className="inline-flex items-center bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-glow transition-all duration-300">
                    <ImageIcon size={18} className="mr-2" />
                    Choose Photo
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Controls bar */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Upload size={16} className="mr-1.5" />
                      New Photo
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={onFileInputChange}
                      className="hidden"
                    />
                    <button
                      onClick={reset}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <X size={16} className="mr-1.5" />
                      Clear
                    </button>
                  </div>

                  {processedImage && !isProcessing && (
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-glow transition-all duration-300"
                    >
                      <Download size={18} className="mr-2" />
                      Download PNG
                    </button>
                  )}
                </div>

                {/* Sliders - only show in client mode */}
                {processingMode === "client" && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <SlidersHorizontal size={18} className="text-[#FF6B6B]" />
                      <h3 className="font-semibold text-gray-800">Adjust Settings</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm text-gray-600">Edge Sensitivity</label>
                          <span className="text-sm font-medium text-gray-800">{edgeSensitivity}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={edgeSensitivity}
                          onChange={(e) => setEdgeSensitivity(Number(e.target.value))}
                          onMouseUp={handleReprocess}
                          onTouchEnd={handleReprocess}
                          className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-[#FF6B6B] cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm text-gray-600">Line Thickness</label>
                          <span className="text-sm font-medium text-gray-800">{lineThickness}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={lineThickness}
                          onChange={(e) => setLineThickness(Number(e.target.value))}
                          onMouseUp={handleReprocess}
                          onTouchEnd={handleReprocess}
                          className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-[#FF6B6B] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparison view */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Original */}
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                      <ImageIcon size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Original Photo</span>
                    </div>
                    <div className="p-4">
                      <img
                        src={uploadedImage}
                        alt="Original"
                        className="w-full rounded-xl object-contain max-h-[500px]"
                      />
                    </div>
                  </div>

                  {/* Processed */}
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wand2 size={16} className="text-[#FF6B6B]" />
                        <span className="text-sm font-medium text-gray-700">Coloring Page</span>
                      </div>
                      {processedImage && !isProcessing && (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                          <Check size={12} />
                          Ready
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex items-center justify-center min-h-[300px]">
                      {isProcessing ? (
                        <div className="text-center w-full max-w-sm">
                          <Loader2 size={40} className="text-[#FF6B6B] animate-spin mx-auto mb-4" />
                          <p className="text-gray-500 mb-3">
                            {processingMode === "ai"
                              ? "AI is generating your coloring page..."
                              : "Generating your coloring page..."}
                          </p>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(progress, 100)}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-2">{Math.round(Math.min(progress, 100))}%</p>
                          {processingMode === "ai" && (
                            <p className="text-xs text-gray-400 mt-1">This may take 10-30 seconds</p>
                          )}
                        </div>
                      ) : processedImage ? (
                        <img
                          src={processedImage}
                          alt="Coloring page"
                          className="w-full rounded-xl object-contain max-h-[500px]"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <Wand2 size={48} className="mx-auto mb-3 opacity-30" />
                          <p>Your coloring page will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
