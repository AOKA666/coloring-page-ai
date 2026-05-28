"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const prompts = [
  "A magical unicorn in a rainbow forest",
  "A cute astronaut cat on the moon",
  "A detailed mandala with floral patterns",
];

export function FeatureText() {
  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl bg-white aspect-square flex items-center justify-center">
            <div className="text-center">
              <Sparkles size={64} className="text-gray-300 mx-auto mb-4" />
              <span className="text-gray-400 text-sm">Text Prompt AI Generated Coloring Page</span>
            </div>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 lg:order-2"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-semibold text-gradient-brand uppercase tracking-wider">
              Text to Coloring
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
              Coming Soon
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-3 mb-6">
            Describe It, We&apos;ll Draw It
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            Type any description — &quot;a magical unicorn in a rainbow forest&quot; — and our AI
            will generate a unique coloring page instantly. No photo needed.
          </p>
          <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-400 mb-2">Example prompts:</p>
            <div className="space-y-2">
              {prompts.map((p) => (
                <div key={p} className="text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded-lg">
                  &quot;{p}&quot;
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
