"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload a Photo or Enter a Prompt",
    description: "Choose any photo from your device or type a creative description. We support JPG and PNG formats up to 10MB.",
  },
  {
    title: "Let the AI Generate Your Coloring Page",
    description: "Our AI analyzes the image, detects edges, and creates clean line art with preserved details. Processing takes just a few seconds.",
  },
  {
    title: "Download in Printable Formats",
    description: "Save your coloring page as a high-resolution PNG. Print it at home or share it digitally with friends and family.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-lg text-gray-500">Three simple steps to your coloring page</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B6B] via-[#FF8E53] to-[#FF6B9D] hidden lg:block -translate-x-1/2" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 last:mb-0 ${i % 2 === 1 ? "lg:text-right" : ""}`}
            >
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white font-bold text-lg mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""} hidden lg:block`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
