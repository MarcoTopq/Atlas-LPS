"use client";

import { useState } from "react";
import AppBar from "@/components/AppBar";
import { MOCK_BERITA } from "@/lib/mock/data";
import { Search, CalendarClock, User, ArrowRight, Newspaper, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

function NewsCardImage({ src, alt }: { src?: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="relative w-full h-40 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-[#1B355E] p-4 flex flex-col justify-between text-white border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-widest uppercase bg-orange/90 text-white px-2.5 py-0.5 rounded-md">LPS RI</span>
          <Newspaper className="w-5 h-5 text-orange opacity-80" />
        </div>
        <p className="text-[11px] font-medium text-slate-200 line-clamp-2 leading-snug">{alt}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-44 mb-4 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        unoptimized
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function BeritaPage() {
  const [activeTab, setActiveTab] = useState<'internal' | 'eksternal'>('internal');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBerita = MOCK_BERITA.filter(b => 
    b.tipe === activeTab && 
    (b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (b.ringkas && b.ringkas.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC] pb-32 md:pb-12 relative w-full items-center font-sans">
      <div className="w-full">
        <AppBar title="Berita Terkini" showBack />
        
        <div className="px-5 md:px-8 mt-4 space-y-6">
          
          {/* Toggle Nav */}
          <div className="bg-white p-2 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.03)] flex border border-slate-100">
            <button 
              onClick={() => setActiveTab('internal')}
              className={cn(
                "flex-1 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 cursor-pointer",
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
                "flex-1 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5",
                activeTab === 'eksternal' 
                  ? "bg-orange text-white shadow-[0_4px_12px_rgba(242,110,34,0.3)]" 
                  : "bg-transparent text-muted hover:text-ink"
              )}
            >
              <Globe className="w-4 h-4" />
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
              className="w-full bg-white border border-slate-200/80 rounded-full py-3.5 pl-12 pr-6 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all placeholder:text-light text-ink shadow-2xs" 
            />
          </div>
          
          {/* List Section */}
          <div className="space-y-4 pb-8">
            {filteredBerita.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBerita.map(berita => (
                  <Link
                    key={berita.id}
                    href={`/berita/${berita.id}`}
                    className="bg-white rounded-[28px] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] border border-slate-200/80 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-orange/40 transition-all duration-300 group flex flex-col justify-between cursor-pointer block overflow-hidden"
                  >
                    <div>
                      {/* Image Thumbnail with Fallback */}
                      <NewsCardImage src={berita.gambar} alt={berita.judul} />

                      <div className="flex items-center gap-2 mb-3">
                        <div className="px-3 py-1 rounded-xl bg-orange/10 text-[10px] font-bold text-orange tracking-wider uppercase">
                          {berita.kategori}
                        </div>
                      </div>
                      
                      <h3 className="text-[15px] font-bold text-navy leading-snug mb-2.5 tracking-tight group-hover:text-orange transition-colors">
                        {berita.judul}
                      </h3>
                      
                      <p className="text-[12.5px] text-slate-600 leading-relaxed mb-5 line-clamp-3 font-normal">
                        {berita.ringkas}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-auto">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <span className="flex items-center gap-1.5"><User size={13} /> {berita.penulis}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5"><CalendarClock size={13} /> {berita.tanggal}</span>
                      </div>
                      
                      <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange/10 group-hover:text-orange transition-colors flex-shrink-0">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 flex flex-col items-center justify-center bg-white rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Newspaper size={32} strokeWidth={1.5} />
                </div>
                <p className="text-[15px] font-bold text-navy">Tidak Ada Berita</p>
                <p className="text-[12.5px] font-medium text-slate-500 mt-1 max-w-[70%] leading-relaxed">
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
