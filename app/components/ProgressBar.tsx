"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">AI Processing...</span>
        <span className="text-sm text-gray-400">{progress}%</span>
      </div>
      <div
        className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
