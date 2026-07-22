"use client";

import AppBar from "@/components/AppBar";
import { MOCK_NASKAH_INBOX_LIST } from "@/lib/mock/bpm";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NaskahDinasInboxPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = MOCK_NASKAH_INBOX_LIST.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.pengirim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24 relative">
      <AppBar title="Inbox Naskah Dinas" showBack />
      
      <div className="px-5 mt-4 space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light group-focus-within:text-orange transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari surat masuk..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-line rounded-[16px] py-3 pl-12 pr-4 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all placeholder:text-light text-ink shadow-sm" 
            />
          </div>
          <button className="w-12 h-12 bg-white border border-line rounded-[16px] flex items-center justify-center text-ink shadow-sm hover:bg-slate-50 transition-colors flex-shrink-0">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {filteredTasks.map((task, idx) => (
            <Link 
              href={`/naskah-dinas/inbox/${task.id}`} 
              key={idx}
              className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] border border-slate-50 transition-all flex flex-col relative"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-bold text-white",
                  task.status === "Belum Dibaca" ? "bg-orange" : "bg-slate-400"
                )}>
                  {task.status}
                </span>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">{task.sifat}</span>
              </div>

              <div className="mb-3">
                <h3 className="text-[15px] font-bold text-ink leading-tight mb-1">{task.title}</h3>
                <p className="text-[12px] text-muted leading-relaxed line-clamp-2">{task.brief}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-line text-[12px]">
                <div className="flex flex-col">
                  <span className="text-muted text-[10px]">Pengirim</span>
                  <span className="font-semibold text-ink truncate">{task.pengirim}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-muted text-[10px]">Tanggal</span>
                  <span className="font-semibold text-ink">{task.tgl}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Link href="/ai" className="fixed bottom-6 right-6 z-40 bg-ai text-white rounded-full p-4 shadow-[0_8px_24px_rgba(76,70,217,0.4)] hover:scale-105 transition-all flex items-center gap-2">
        <Sparkles size={20} />
        <span className="text-[13px] font-bold pr-1">Tanya AI Atlas</span>
      </Link>
    </div>
  );
}
