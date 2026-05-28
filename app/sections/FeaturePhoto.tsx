"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ImageIcon } from "lucide-react";

const features = [
  "Upload any JPG or PNG",
  "AI detects edges and preserves details",
  "Download high-resolution line art",
];

export function FeaturePhoto() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-gradient-brand uppercase tracking-wider">
            Photo to Coloring
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-3 mb-6">
            Turn Any Photo into a Coloring Page
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            Simply upload your favorite photo and watch our AI transform it into a
            clean, printable coloring page. Perfect for portraits, landscapes, pets,
            and anything you can imagine.
          </p>
          <ul className="space-y-4 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-green-500" />
                </div>
                <span className="text-gray-600">{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/photo-to-coloring">
            <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-full hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
              Try Photo to Coloring
              <ArrowRight size={18} className="ml-2" />
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 aspect-square flex items-center justify-center">
            <div className="text-center">
              <ImageIcon size={64} className="text-gray-300 mx-auto mb-4" />
              <span className="text-gray-400 text-sm">Photo Line Art Preview</span>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#FF8E53]/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
