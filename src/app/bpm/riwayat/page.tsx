"use client";

import AppBar from "@/components/AppBar";
import { MOCK_BPM_RIWAYAT_LIST } from "@/lib/mock/bpm";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BpmRiwayatPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = MOCK_BPM_RIWAYAT_LIST.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.jenis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-8">
      <AppBar title="Riwayat" showBack />
      
      <div className="px-5 mt-4 space-y-6">
        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light group-focus-within:text-orange transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-line rounded-[16px] py-3 pl-12 pr-4 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all placeholder:text-light text-ink shadow-sm" 
            />
          </div>
          <button className="w-12 h-12 bg-white border border-line rounded-[16px] flex items-center justify-center text-ink shadow-sm hover:bg-slate-50 transition-colors flex-shrink-0">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task, idx) => (
            <Link 
              href={`/bpm/riwayat/${task.id}`} 
              key={idx}
              className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] border border-slate-50 transition-all flex flex-col relative"
            >
              {/* Badge Disetujui */}
              <div className="mb-3 flex items-start">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-bold text-white",
                  task.status === "Disetujui" ? "bg-[#338148]" : "bg-slate-400"
                )}>
                  {task.status}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-[12px] font-medium text-muted block mb-1">{task.jenis}</span>
                <h3 className="text-[15px] font-bold text-ink leading-tight">{task.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-muted mb-0.5">No SAP</span>
                  <span className="text-[13px] font-semibold text-ink">{task.noSAP}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-muted mb-0.5">ID BPM</span>
                  <span className="text-[13px] font-semibold text-ink">{task.idBPM}</span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="text-[11px] font-medium text-muted mb-0.5">Pemohon</span>
                  <span className="text-[13px] font-semibold text-ink leading-tight">{task.pemohon}</span>
                </div>
              </div>
            </Link>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-10 text-muted text-sm">
              Tidak ada data yang ditemukan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
