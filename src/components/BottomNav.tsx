"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CheckSquare, Sparkles, LayoutDashboard, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  // Show bottom menu bar ONLY on Beranda (/home or /) to avoid clutter and overlapping
  if (pathname !== "/home" && pathname !== "/") {
    return null;
  }

  const mainTabs = [
    { name: "Beranda", href: "/home", icon: Home },
    { name: "Persetujuan", href: "/persetujuan", icon: CheckSquare },
    { name: "SIM", href: "/dashboard", icon: LayoutDashboard },
    { name: "Berita", href: "/berita", icon: Newspaper },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[382px] flex items-center gap-3 z-50 md:hidden">
      {/* Main Pill Nav */}
      <div className="flex-1 bg-white h-[68px] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#EAECF0] flex items-center justify-between px-3">
        {mainTabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/home" && pathname.startsWith(tab.href));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className="relative w-[52px] h-[52px] flex items-center justify-center transition-all duration-300 rounded-full"
            >
              {isActive && (
                <div className="absolute inset-0 bg-[#F56621] rounded-full shadow-[0_4px_12px_rgba(245,102,33,0.3)] scale-95 transition-transform"></div>
              )}
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={cn(
                  "relative z-10 transition-colors duration-300",
                  isActive ? "text-white" : "text-[#667085] hover:text-[#172033]"
                )} 
              />
            </Link>
          );
        })}
      </div>

      {/* Detached Circular AI FAB */}
      <Link 
        href="/ai" 
        className="w-[68px] h-[68px] bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#EAECF0] flex-shrink-0 hover:scale-105 active:scale-95 transition-transform group"
        aria-label="Asisten AI"
      >
        <Sparkles size={26} className="text-[#F56621] group-hover:rotate-12 transition-transform duration-300" />
      </Link>
    </div>
  );
}
