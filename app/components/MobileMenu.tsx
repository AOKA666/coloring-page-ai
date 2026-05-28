"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Photo to Coloring", href: "/photo-to-coloring" },
  { label: "Text to Coloring", href: "#", disabled: true, comingSoon: true },
  { label: "Batch Generation", href: "#", disabled: true, comingSoon: true },
  { label: "Pricing", href: "#", disabled: true, comingSoon: true },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
      >
        {open ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[72px] left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden z-40"
          >
            <nav className="flex flex-col p-6 gap-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.disabled) {
                      e.preventDefault();
                      return;
                    }
                    setOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                    link.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.comingSoon && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
                      Soon
                    </span>
                  )}
                </Link>
              ))}
              <Link
                href="/photo-to-coloring"
                onClick={() => setOpen(false)}
                className="mt-3 px-4 py-3 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-semibold text-center shadow-md"
              >
                Create Free
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
