"use client";

import { motion } from "framer-motion";
import { Sparkles, Laugh, Users, Rainbow } from "lucide-react";

const useCases = [
  {
    title: "Mermaid Coloring Pages",
    description: "Create magical underwater scenes with mermaids, sea creatures, and coral reefs.",
    icon: Sparkles,
    prompt: "A beautiful mermaid sitting on a rock surrounded by tropical fish",
  },
  {
    title: "Brainrot / Meme Pages",
    description: "Turn your favorite memes and funny images into hilarious coloring pages.",
    icon: Laugh,
    prompt: "A silly cat wearing sunglasses riding a skateboard",
  },
  {
    title: "Custom Family Portraits",
    description: "Transform family photos into personalized coloring pages everyone will love.",
    icon: Users,
    prompt: "A happy family standing in front of their house with a dog",
  },
  {
    title: "Rainbow & Fantasy",
    description: "Generate dreamy fantasy worlds with rainbows, unicorns, and castles.",
    icon: Rainbow,
    prompt: "A rainbow castle floating on clouds with a friendly dragon",
  },
];

export function UseCases() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Popular Use Cases</h2>
          <p className="text-lg text-gray-500">See what our users are creating</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 h-full flex flex-col">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                    <Icon size={40} className="text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-2">{useCase.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-grow">{useCase.description}</p>
                    {useCase.prompt && (
                      <div className="mt-3 p-2 bg-gray-50 rounded-lg text-xs text-gray-400 truncate">
                        &quot;{useCase.prompt}&quot;
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
