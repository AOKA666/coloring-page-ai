"use client";

import Link from "next/link";
import { Palette } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
        <Palette className="text-white" size={18} />
      </div>
      <span className="text-xl font-bold text-gray-800 tracking-tight">
        ColorMe
      </span>
    </Link>
  );
}
