"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ImageIcon, PenTool } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center pt-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B6B]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-[#FF8E53]/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-6 block">
            AI-Powered Creativity
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
            <span className="text-gradient">Free AI Coloring Page</span>
            <br />
            <span className="text-gray-800">Generator Online</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
            Create unique AI coloring pages from photos or text in minutes.
            Batch generation, custom aspect ratios, and printable PNG/PDF formats.
          </p>
          <Link href="/photo-to-coloring">
            <span className="inline-flex items-center bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 text-lg cursor-pointer">
              Create Free Coloring Page
              <ArrowRight className="ml-2" size={20} />
            </span>
          </Link>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-green-500" /> No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-green-500" /> Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-green-500" /> Print-ready
            </span>
          </div>
        </motion.div>

        {/* Right Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0 w-full h-full">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <ImageIcon size={48} className="text-gray-300" />
                </div>
                <div className="bg-white flex items-center justify-center">
                  <PenTool size={48} className="text-gray-300" />
                </div>
              </div>
            </div>
            {/* Floating status badge */}
            <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-full text-sm font-medium text-gray-700">
              Generated in 3 seconds
            </div>
          </div>
          {/* Decorative ring */}
          <div className="absolute -inset-4 border border-[#FF6B6B]/10 rounded-[2.5rem] -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
