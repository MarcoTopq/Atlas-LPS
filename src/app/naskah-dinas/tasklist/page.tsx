"use client";

import AppBar from "@/components/AppBar";
import { MOCK_NASKAH_TASKLIST } from "@/lib/mock/bpm";
import { Search, SlidersHorizontal, Sparkles, FileText, ArrowRight, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NaskahDinasTasklistPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = MOCK_NASKAH_TASKLIST.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.noND.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.pemohon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24 relative">
      <AppBar title="Tasklist Naskah Dinas" showBack />
      
      <div className="px-5 mt-4 space-y-6">
        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light group-focus-within:text-orange transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari naskah dinas..." 
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
          {filteredTasks.map((task) => (
            <Link 
              key={task.id} 
              href={`/naskah-dinas/tasklist/${task.id}`}
              className="flex flex-col bg-white rounded-[28px] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] border border-slate-50 transition-all duration-300 group relative"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-[46px] h-[46px] rounded-[16px] bg-slate-100 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    <div className={cn(
                      "absolute inset-0 opacity-20",
                      task.prioritas === 'hi' ? 'bg-danger' : 
                      task.prioritas === 'mid' ? 'bg-warn' : 'bg-slate-400'
                    )}></div>
                    <FileText className={cn(
                      "relative z-10 w-5 h-5",
                      task.prioritas === 'hi' ? 'text-danger' : 
                      task.prioritas === 'mid' ? 'text-warn' : 'text-slate-500'
                    )} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-orange block mb-0.5">{task.noND}</span>
                    <h3 className="font-bold text-[15px] text-ink leading-tight group-hover:text-orange transition-colors line-clamp-2">{task.title}</h3>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-light group-hover:bg-orange/10 group-hover:text-orange transition-colors flex-shrink-0 ml-2">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </div>

              <p className="text-[12px] text-muted mb-4 leading-relaxed line-clamp-2">{task.brief}</p>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-3 border-t border-line">
                <div className={cn(
                  "px-3 py-1 rounded-xl text-[11px] font-bold border flex items-center gap-1.5",
                  task.prioritas === 'hi' ? 'bg-danger/5 border-danger/10 text-danger' :
                  task.prioritas === 'mid' ? 'bg-warn/5 border-warn/10 text-warn' :
                  'bg-slate-50 border-slate-100 text-slate-500'
                )}>
                  {task.prioritas === 'hi' && <AlertCircle className="w-3 h-3" />}
                  {task.prioritas === 'mid' && <Clock className="w-3 h-3" />}
                  {task.prioritas === 'lo' && <CheckCircle2 className="w-3 h-3" />}
                  {task.sla}
                </div>

                <span className="text-[11px] font-semibold text-muted">Pemohon: <strong className="text-ink">{task.pemohon}</strong></span>
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
