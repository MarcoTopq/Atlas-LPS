"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CheckSquare, Sparkles, LayoutDashboard, Newspaper, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const mainTabs = [
    { name: "Beranda", href: "/home", icon: Home },
    { name: "Persetujuan", href: "/persetujuan", icon: CheckSquare },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Berita", href: "/berita", icon: Newspaper },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[280px] bg-white h-dvh sticky top-0 border-r border-slate-100 shadow-[2px_0_24px_rgba(0,0,0,0.02)] z-50">
      {/* Logo Area */}
      <div className="h-[88px] flex items-center px-8 border-b border-slate-50">
        <h1 className="text-[24px] font-extrabold text-ink tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange flex items-center justify-center text-white text-lg">
            A
          </div>
          ATLAS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto scrollbar-hide">
        <div className="px-4 mb-4">
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Menu Utama</span>
        </div>
        
        {mainTabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-orange/10 text-orange" 
                  : "text-muted hover:bg-slate-50 hover:text-ink"
              )}
            >
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={cn(
                  "transition-colors duration-300",
                  isActive ? "text-orange" : "text-light group-hover:text-ink"
                )} 
              />
              <span className={cn(
                "text-[14px] font-bold",
                isActive ? "text-orange" : "text-ink"
              )}>
                {tab.name}
              </span>
            </Link>
          );
        })}

        {/* AI Assistant Special Button */}
        <div className="pt-6 pb-2">
          <div className="px-4 mb-4">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Kecerdasan Buatan</span>
          </div>
          <Link
            href="/ai"
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
              pathname.startsWith("/ai") 
                ? "bg-gradient-to-r from-[#5D55F3] to-[#433BCA] text-white shadow-[0_4px_12px_rgba(76,70,217,0.3)]" 
                : "bg-white border border-slate-100 hover:border-[#5D55F3]/30 hover:shadow-sm"
            )}
          >
            <Sparkles 
              size={20} 
              className={cn(
                "transition-all duration-300",
                pathname.startsWith("/ai") ? "text-white" : "text-[#5D55F3] group-hover:scale-110"
              )} 
            />
            <span className={cn(
              "text-[14px] font-bold",
              pathname.startsWith("/ai") ? "text-white" : "text-[#5D55F3]"
            )}>
              Asisten AI
            </span>
          </Link>
        </div>
      </nav>

      {/* Bottom Area (Profile/Settings) */}
      <div className="p-4 border-t border-slate-50">
        <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors">
          <Settings size={20} className="text-light" />
          <span className="text-[14px] font-bold text-ink">Pengaturan</span>
        </Link>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-colors mt-1 group">
          <LogOut size={20} className="text-light group-hover:text-red-500" />
          <span className="text-[14px] font-bold text-ink group-hover:text-red-600">Keluar</span>
        </Link>
      </div>
    </aside>
  );
}
