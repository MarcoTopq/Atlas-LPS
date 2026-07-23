"use client";

import AppBar from "@/components/AppBar";
import { MOCK_NASKAH_OUTBOX_LIST } from "@/lib/mock/bpm";
import { Search, Sparkles, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NaskahDinasOutboxPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Nota Dinas");

  const tabs = ["Nota Dinas", "Disposisi", "Surat Eksternal"];

  const filteredTasks = MOCK_NASKAH_OUTBOX_LIST.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.noND.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.dikirimOleh.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24 relative">
      <AppBar title="Outbox" showBack />
      
      {/* Sub-Navigation Tabs */}
      <div className="bg-white border-b border-line px-5 flex gap-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "py-3.5 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap",
              activeTab === tab 
                ? "border-orange text-orange" 
                : "border-transparent text-muted hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="px-5 mt-4 space-y-5">
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
            <Filter size={20} className="text-muted" />
          </button>
        </div>

        {/* List Items */}
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task, idx) => (
            <Link 
              href={`/naskah-dinas/outbox/${encodeURIComponent(task.id)}`} 
              key={idx}
              className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] border border-slate-50 transition-all flex flex-col relative"
            >
              {/* Badge */}
              <div className="mb-2">
                <span className="px-3 py-1 bg-[#0055FF] text-white text-[11px] font-bold rounded-full inline-block">
                  {task.jenisBadge}
                </span>
              </div>

              {/* Title & Code */}
              <div className="mb-4">
                <h3 className="text-[15px] font-bold text-ink leading-tight mb-1">{task.title}</h3>
                <p className="text-[13px] font-semibold text-muted">{task.noND}</p>
              </div>

              {/* Grid Metadata Footer */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-line text-[11px] md:text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted">Tanggal Surat</span>
                  <span className="font-semibold text-ink">{task.tgl}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-muted">Dikirim Oleh</span>
                  <span className="font-semibold text-ink">{task.dikirimOleh}</span>
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
