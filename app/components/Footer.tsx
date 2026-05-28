"use client";

import Link from "next/link";
import { Logo } from "./Logo";

const productLinks = [
  { label: "Photo to Coloring", href: "/photo-to-coloring" },
  { label: "Text to Coloring", href: "#" },
  { label: "Batch Generation", href: "#" },
  { label: "Pricing", href: "#" },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Careers", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            Transform any photo into a beautiful coloring page. Free, fast, and print-ready.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-4">Product</h4>
          <ul className="space-y-3">
            {productLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-4">Company</h4>
          <ul className="space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-4">Legal</h4>
          <ul className="space-y-3">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ColorMe.ai. All rights reserved.
        </span>
        <div className="flex gap-6">
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Terms of Use
          </Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
