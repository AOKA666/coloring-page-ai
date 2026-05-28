"use client";

import { motion } from "framer-motion";
import { AccordionItem } from "../components/Accordion";

const faqs = [
  {
    question: "Is ColorMe.ai completely free to use?",
    answer: "Yes! ColorMe.ai offers a free, no-login way to turn your photos into coloring pages. We also plan to introduce premium features for power users who want batch processing and higher resolutions.",
  },
  {
    question: "What photo formats are supported?",
    answer: "We support the most common image formats: JPEG, PNG, and WebP. For best results, we recommend uploading clear, well-lit photos with a resolution of at least 800x800 pixels.",
  },
  {
    question: "How does the photo-to-coloring conversion work?",
    answer: "Our client-side algorithm analyzes your photo using edge detection (Sobel filter) to identify outlines and shapes. It then converts those edges into clean black lines on a white background — perfect for coloring!",
  },
  {
    question: "Can I use the generated coloring pages commercially?",
    answer: "Pages generated through our free tool are for personal use. If you need commercial usage rights, stay tuned for our upcoming Pro plan which will include a commercial license.",
  },
  {
    question: "Is my photo data safe?",
    answer: "Absolutely. All image processing happens directly in your browser. Your photos are never uploaded to our servers, ensuring complete privacy and security.",
  },
  {
    question: "Can I adjust the line thickness or detail level?",
    answer: "Yes! Our tool page includes sliders to adjust edge sensitivity and line thickness, so you can fine-tune the result to match your preferences.",
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Yes, ColorMe.ai is fully responsive and works on smartphones, tablets, and desktop computers. Just open the site in your mobile browser and start creating.",
  },
  {
    question: "What is the maximum image size I can upload?",
    answer: "We recommend keeping images under 10MB for the best performance. Larger images are automatically scaled down to 1200px on the longest side before processing.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need to know about our AI coloring page generator
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
