"use client";

import { Bell, ChevronLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AppBarProps {
  greeting?: string;
  subtitle?: string;
  role?: string;
  showAvatar?: boolean;
  title?: string;
  showBack?: boolean;
  onSearchChange?: (q: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
}

export default function AppBar({
  greeting = "Selamat pagi,",
  subtitle = "Dian Arief Risdianto",
  role = "Direktur Eksekutif Penjaminan",
  showAvatar = false,
  title,
  showBack = false,
  onSearchChange,
  searchValue = "",
  searchPlaceholder = "Cari modul..."
}: AppBarProps) {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [internalQuery, setInternalQuery] = useState(searchValue);

  const handleQueryChange = (val: string) => {
    setInternalQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    handleQueryChange("");
  };

  // If search mode is active, render full-width interactive search bar
  if (isSearching) {
    return (
      <header className="sticky top-0 z-40 bg-white border-b border-[#EAECF0] shadow-[0_2px_8px_rgba(23,32,51,0.02)] w-full">
        <div className="w-full max-w-5xl mx-auto px-4 pt-2.5 pb-2.5 flex items-center gap-2">
          <div className="flex-1 flex items-center bg-[#F6F7F9] rounded-xl px-3 py-1.5 border border-[#EAECF0] focus-within:border-[#172033] transition-all">
            <Search size={16} className="text-[#98A2B3] flex-shrink-0 mr-2" />
            <input
              type="text"
              autoFocus
              value={internalQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent border-none text-[13.5px] font-normal text-[#172033] focus:outline-none placeholder:text-[#98A2B3]"
            />
            {internalQuery && (
              <button
                type="button"
                onClick={() => handleQueryChange("")}
                className="text-[#98A2B3] hover:text-[#172033] p-0.5 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleCloseSearch}
            className="text-xs font-semibold text-[#667085] hover:text-[#172033] px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Batal
          </button>
        </div>
      </header>
    );
  }

  // If used as primary home/dashboard header with avatar & greeting -> Compact Sticky White Header
  if (showAvatar || (!title && greeting)) {
    return (
      <header className="sticky top-0 z-40 bg-white border-b border-[#EAECF0] shadow-[0_2px_8px_rgba(23,32,51,0.02)] w-full">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-3 pb-3 flex items-center justify-between">
          {/* Left: Avatar + Executive Greeting */}
          <div className="flex items-center gap-3">
            {showAvatar && (
              <Link 
                href="/profil" 
                className="w-10 h-10 rounded-full bg-[#F6F7F9] border border-[#EAECF0] shadow-xs overflow-hidden flex-shrink-0 flex items-center justify-center text-[#172033] font-semibold text-sm hover:border-[#F56621] transition-colors active:scale-95"
              >
                <span className="w-full h-full flex items-center justify-center bg-[#F9FAFB] text-[#172033] font-bold">
                  D
                </span>
              </Link>
            )}
            
            <div className="flex flex-col justify-center">
              <span className="text-[11.5px] font-normal text-[#667085] leading-tight">{greeting}</span>
              <span className="text-[15px] font-semibold text-[#172033] leading-snug tracking-tight">{subtitle}</span>
              {role && (
                <span className="text-[10.5px] font-normal text-[#98A2B3] leading-none mt-0.5">{role}</span>
              )}
            </div>
          </div>

          {/* Right: Minimalist Notification Bell */}
          <Link 
            href="/notifikasi"
            className="relative w-9 h-9 rounded-full bg-[#F9FAFB] border border-[#EAECF0] shadow-2xs flex items-center justify-center flex-shrink-0 text-[#475467] hover:text-[#172033] hover:border-[#F56621]/40 transition-all active:scale-95"
            aria-label="Notifikasi"
          >
            <Bell size={18} strokeWidth={1.8} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#F56621] rounded-full border border-white"></span>
          </Link>
        </div>
      </header>
    );
  }

  // Inner pages with title or back button -> Compact Sticky White Header
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAECF0] shadow-[0_2px_8px_rgba(23,32,51,0.02)] w-full">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-3 pb-3 flex items-center justify-between relative">
        {/* Left: Back button */}
        <div className="flex items-center gap-3 z-10">
          {showBack && (
            <button 
              onClick={() => router.back()}
              className="w-9 h-9 flex items-center justify-center bg-[#F9FAFB] border border-[#EAECF0] rounded-full text-[#475467] hover:text-[#172033] hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
              aria-label="Kembali"
            >
              <ChevronLeft size={19} strokeWidth={2} />
            </button>
          )}
        </div>
        
        {/* Center: Title */}
        {title && (
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <h1 className="text-[16px] font-semibold text-[#172033] tracking-tight">{title}</h1>
          </div>
        )}
        
        {/* Right: Search Action */}
        <div className="flex items-center gap-2 z-10">
          <button 
            type="button"
            onClick={() => setIsSearching(true)}
            className="w-9 h-9 flex items-center justify-center bg-[#F9FAFB] border border-[#EAECF0] rounded-full text-[#475467] hover:text-[#172033] hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
            aria-label="Cari"
          >
            <Search size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
