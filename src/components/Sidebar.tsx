"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  CheckSquare, 
  Sparkles, 
  LayoutDashboard, 
  Newspaper, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load preferred state from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("atlas_sidebar_collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem("atlas_sidebar_collapsed", String(next));
      return next;
    });
  };

  const mainTabs = [
    { name: "Beranda", href: "/home", icon: Home },
    { name: "Persetujuan", href: "/persetujuan", icon: CheckSquare },
    { name: "Sistem Informasi & Management", href: "/dashboard", icon: LayoutDashboard },
    { name: "Berita", href: "/berita", icon: Newspaper },
  ];

  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col bg-white h-dvh sticky top-0 border-r border-[#EAECF0] shadow-[2px_0_16px_rgba(23,32,51,0.03)] z-50 transition-all duration-300 ease-in-out flex-shrink-0 select-none relative",
        isCollapsed ? "w-[76px]" : "w-[260px]"
      )}
    >
      {/* Floating Border Edge Toggle Button (Centered Vertically) */}
      <button
        type="button"
        onClick={toggleSidebar}
        title={isCollapsed ? "Buka Menu Sidebar" : "Ciutkan Menu Sidebar"}
        className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-50 w-7 h-7 rounded-full bg-white border border-[#EAECF0] shadow-[0_2px_8px_rgba(23,32,51,0.08)] flex items-center justify-center text-[#667085] hover:text-[#F56621] hover:border-[#F56621]/50 hover:bg-[#F9FAFB] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        aria-label={isCollapsed ? "Buka Menu" : "Ciutkan Menu"}
      >
        {isCollapsed ? (
          <ChevronRight size={15} strokeWidth={2.5} />
        ) : (
          <ChevronLeft size={15} strokeWidth={2.5} />
        )}
      </button>

      {/* Header & Logo */}
      <div className={cn(
        "h-[74px] flex items-center border-b border-[#EAECF0] px-4 transition-all duration-300",
        isCollapsed ? "justify-center" : "justify-start gap-2.5"
      )}>
        <Link 
          href="/home"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F56621] flex items-center justify-center text-white font-black text-sm shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
            A
          </div>
          {!isCollapsed && (
            <span className="text-[19px] font-extrabold text-[#172033] tracking-tight group-hover:text-[#F56621] transition-colors">
              ATLAS
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto scrollbar-hide">
        {!isCollapsed && (
          <div className="px-3 mb-2.5">
            <span className="text-[10.5px] font-bold text-[#98A2B3] uppercase tracking-wider">
              Menu Utama
            </span>
          </div>
        )}
        
        {mainTabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              title={isCollapsed ? tab.name : undefined}
              className={cn(
                "flex items-center rounded-xl transition-all duration-200 group relative",
                isCollapsed 
                  ? "justify-center p-3 w-12 h-12 mx-auto" 
                  : "gap-3.5 px-3.5 py-3 w-full",
                isActive 
                  ? "bg-[#F56621]/10 text-[#F56621] font-bold" 
                  : "text-[#667085] hover:bg-[#F9FAFB] hover:text-[#172033]"
              )}
            >
              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.3 : 1.8} 
                className={cn(
                  "transition-colors flex-shrink-0",
                  isActive ? "text-[#F56621]" : "text-[#667085] group-hover:text-[#172033]"
                )} 
              />
              
              {!isCollapsed && (
                <span className={cn(
                  "text-[13.5px] truncate",
                  isActive ? "text-[#F56621] font-bold" : "text-[#344054] font-medium"
                )}>
                  {tab.name}
                </span>
              )}
            </Link>
          );
        })}

        {/* AI Assistant Special Button */}
        <div className={cn("pt-4 pb-1", isCollapsed ? "px-0" : "")}>
          {!isCollapsed && (
            <div className="px-3 mb-2.5">
              <span className="text-[10.5px] font-bold text-[#98A2B3] uppercase tracking-wider">
                Kecerdasan Buatan
              </span>
            </div>
          )}

          <Link
            href="/ai"
            title={isCollapsed ? "Asisten AI" : undefined}
            className={cn(
              "flex items-center rounded-xl transition-all duration-200 group border",
              isCollapsed
                ? "justify-center w-12 h-12 mx-auto bg-gradient-to-r from-[#D95E15] to-[#A83D05] text-white border-[#EA6722]/40 shadow-xs"
                : "gap-3.5 px-3.5 py-3 w-full",
              !isCollapsed && (pathname.startsWith("/ai")
                ? "bg-gradient-to-r from-[#D95E15] to-[#A83D05] text-white border-[#EA6722]/40 shadow-xs font-bold"
                : "bg-[#F6F7F9] border-[#EAECF0] hover:border-[#F56621]/40 text-[#172033]")
            )}
          >
            <Sparkles 
              size={19} 
              strokeWidth={2}
              className={cn(
                "flex-shrink-0 transition-transform group-hover:scale-110",
                (isCollapsed || pathname.startsWith("/ai")) ? "text-white" : "text-[#F56621]"
              )} 
            />
            {!isCollapsed && (
              <span className={cn(
                "text-[13.5px] truncate",
                pathname.startsWith("/ai") ? "text-white font-bold" : "text-[#172033] font-semibold"
              )}>
                Asisten AI
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Bottom Area (Profile/Settings) */}
      <div className="p-3 border-t border-[#EAECF0] space-y-1">
        <Link 
          href="/profil" 
          title={isCollapsed ? "Pengaturan Profil" : undefined}
          className={cn(
            "flex items-center rounded-xl hover:bg-[#F9FAFB] text-[#667085] hover:text-[#172033] transition-colors",
            isCollapsed ? "justify-center p-3 w-12 h-12 mx-auto" : "gap-3 px-3 py-2.5 w-full"
          )}
        >
          <Settings size={19} strokeWidth={1.8} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-[13px] font-medium text-[#344054]">Pengaturan</span>}
        </Link>

        <Link 
          href="/" 
          title={isCollapsed ? "Keluar" : undefined}
          className={cn(
            "flex items-center rounded-xl hover:bg-red-50 text-[#667085] hover:text-red-600 transition-colors group",
            isCollapsed ? "justify-center p-3 w-12 h-12 mx-auto" : "gap-3 px-3 py-2.5 w-full"
          )}
        >
          <LogOut size={19} strokeWidth={1.8} className="flex-shrink-0 group-hover:text-red-500" />
          {!isCollapsed && <span className="text-[13px] font-medium text-[#344054] group-hover:text-red-600">Keluar</span>}
        </Link>
      </div>
    </aside>
  );
}
