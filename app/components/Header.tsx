"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { useScrollPosition } from "../hooks/useScrollPosition";

const links = [
  { label: "Home", href: "/" },
  { label: "Photo to Coloring", href: "/photo-to-coloring" },
  { label: "Text to Coloring", href: "#", disabled: true, comingSoon: true },
  { label: "Batch Generation", href: "#", disabled: true, comingSoon: true },
  { label: "Pricing", href: "#", disabled: true, comingSoon: true },
];

export function Header() {
  const scrolled = useScrollPosition();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        scrolled ? "glass-strong shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.disabled) e.preventDefault();
              }}
              className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                link.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-1.5">
                {link.label}
                {link.comingSoon && (
                  <span className="px-1.5 py-0 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium">
                    Soon
                  </span>
                )}
              </span>
              {!link.disabled && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/photo-to-coloring"
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 inline-block"
          >
            Create Free
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
