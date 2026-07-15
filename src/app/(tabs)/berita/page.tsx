"use client";

import { useState } from "react";
import AppBar from "@/components/AppBar";
import { MOCK_BERITA } from "@/lib/mock/data";
import { Search, CalendarClock, User, ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BeritaPage() {
  const [activeTab, setActiveTab] = useState<'internal' | 'eksternal'>('internal');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBerita = MOCK_BERITA.filter(b => 
    b.tipe === activeTab && 
    b.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC] pb-32 md:pb-12 relative w-full items-center">
      <div className="w-full">
      <AppBar title="Berita Terkini" showBack />
      
      <div className="px-5 md:px-8 mt-4 space-y-6">
        
        {/* Toggle Nav (Dribbble style) */}
        <div className="bg-white p-2 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.03)] flex">
          <button 
            onClick={() => setActiveTab('internal')}
            className={cn(
              "flex-1 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300",
              activeTab === 'internal' 
                ? "bg-orange text-white shadow-[0_4px_12px_rgba(242,110,34,0.3)]" 
                : "bg-transparent text-muted hover:text-ink"
            )}
          >
            Berita Internal
          </button>
          <button 
            onClick={() => setActiveTab('eksternal')}
            className={cn(
              "flex-1 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300",
              activeTab === 'eksternal' 
                ? "bg-orange text-white shadow-[0_4px_12px_rgba(242,110,34,0.3)]" 
                : "bg-transparent text-muted hover:text-ink"
            )}
          >
            Berita Eksternal
          </button>
        </div>

        {/* Search */}
        <div className="relative group shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-light group-focus-within:text-orange transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Cari berita..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-transparent rounded-full py-4 pl-12 pr-6 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all placeholder:text-light text-ink" 
          />
        </div>
        
        {/* List Section */}
        <div className="space-y-4 pb-8">
          {filteredBerita.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBerita.map(berita => (
              <div key={berita.id} className="bg-white rounded-[32px] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group">
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1.5 rounded-xl bg-orange/10 text-[10px] font-bold text-orange tracking-wider uppercase">
                    {berita.kategori}
                  </div>
                </div>
                
                <h3 className="text-[16px] font-bold text-ink leading-snug mb-3 tracking-tight group-hover:text-orange transition-colors">{berita.judul}</h3>
                
                <p className="text-[13px] text-muted leading-relaxed mb-5 line-clamp-2">
                  {berita.ringkas}
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-3 text-[11px] font-medium text-muted">
                    <span className="flex items-center gap-1.5"><User size={14} /> {berita.penulis}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="flex items-center gap-1.5"><CalendarClock size={14} /> {berita.tanggal}</span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-light group-hover:bg-[#E8F0FE] group-hover:text-blue-600 transition-colors flex-shrink-0 cursor-pointer">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))
            }</div>
          ) : (
            <div className="text-center py-16 flex flex-col items-center justify-center bg-white rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 text-slate-400">
                <Newspaper size={36} strokeWidth={1.5} />
              </div>
              <p className="text-[16px] font-bold text-ink tracking-tight">Tidak ada berita</p>
              <p className="text-[13px] font-medium text-muted mt-2 max-w-[70%] leading-relaxed">
                Coba gunakan kata kunci lain untuk mencari berita.
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
