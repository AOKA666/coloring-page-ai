"use client";

import { motion } from "framer-motion";
import { Settings2, Printer, PenTool, Zap, Sparkles, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Customizable Options for Every Need",
    description: "Adjust edge sensitivity, line thickness, and contrast to get the perfect coloring page every time.",
    icon: Settings2,
  },
  {
    title: "High-Quality and Printable Coloring Pages",
    description: "Generate high-resolution PNG files that look great whether printed on letter or A4 paper.",
    icon: Printer,
  },
  {
    title: "Clear Outlines with Preserved Details",
    description: "Our edge detection algorithm keeps the important details while creating clean, easy-to-color lines.",
    icon: PenTool,
  },
  {
    title: "Fast and Batch Generation",
    description: "Process multiple photos at once. Perfect for creating entire coloring books in minutes.",
    icon: Zap,
  },
  {
    title: "Smart Remix Function",
    description: "Combine multiple photos and styles to create entirely new coloring page designs.",
    icon: Sparkles,
    comingSoon: true,
  },
  {
    title: "Privacy and Watermark-Free Downloads",
    description: "Your photos stay on your device. Download clean, watermark-free coloring pages instantly.",
    icon: ShieldCheck,
  },
];

export function KeyFeatures() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Everything you need to create professional-quality coloring pages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-out group h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                    <Icon size={24} className="text-[#FF6B6B]" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                    {feature.comingSoon && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium flex-shrink-0">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
