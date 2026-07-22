"use client";

import AppBar from "@/components/AppBar";
import { MOCK_BPM_REVIEWER_LIST } from "@/lib/mock/bpm";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BpmReviewerPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = MOCK_BPM_REVIEWER_LIST.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24 relative">
      <AppBar title="Reviewer" showBack />
      
      <div className="px-5 mt-4 space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light group-focus-within:text-orange transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari tugas reviewer..." 
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
              href={`/bpm/reviewer/${task.id}`} 
              key={idx}
              className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] border border-slate-50 transition-all flex flex-col relative"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-bold text-white",
                  task.status === "Menunggu Review" ? "bg-amber-500" : "bg-[#1E9E6A]"
                )}>
                  {task.status}
                </span>
                <span className="text-[11px] font-bold text-orange">{task.sla}</span>
              </div>

              <div className="mb-3">
                <h3 className="text-[15px] font-bold text-ink leading-tight mb-1">{task.title}</h3>
                <p className="text-[12px] text-muted leading-relaxed line-clamp-2">{task.brief}</p>
              </div>

              <div className="pt-3 border-t border-line text-[12px] flex justify-between items-center">
                <span className="text-muted text-[11px]">Assigned: <strong className="text-ink">{task.reviewer}</strong></span>
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
