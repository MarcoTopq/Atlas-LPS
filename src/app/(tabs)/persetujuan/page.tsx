"use client";

import AppBar from "@/components/AppBar";
import { MOCK_TASKS } from "@/lib/mock/data";
import Link from "next/link";
import { Filter, Search, Clock, ArrowRight, CheckCircle2, FileText, AlertCircle, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PersetujuanPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = ["Semua", "e-Correspondence", "BPM", "Voucher", "Surat Tugas"];

  const filteredTasks = MOCK_TASKS.filter(task => {
    if (activeTab === "Semua") return true;
    if (activeTab === "e-Correspondence") return task.sistem === "e-Correspondence";
    if (activeTab === "BPM") return task.sistem === "BPM";
    if (activeTab === "Voucher") return task.jenis === "voucher";
    if (activeTab === "Surat Tugas") return task.jenis === "surat_tugas";
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC] pb-32 md:pb-12 relative w-full items-center">
      <div className="w-full">
        <AppBar title="Persetujuan" showBack />

        <div className="px-5 md:px-8 mt-4 space-y-6">
        
        {/* Toggle Nav (Dribbble "Add Task / Task Box" style) */}
        <div className="bg-white p-2 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.03)] flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap px-6 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300",
                activeTab === tab 
                  ? "bg-orange text-white shadow-[0_4px_12px_rgba(242,110,34,0.3)]" 
                  : "bg-transparent text-muted hover:text-ink"
              )}
            >
              {tab === 'e-Correspondence' ? 'Nota Dinas' : tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative group shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-full md:rounded-[32px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-light group-focus-within:text-orange transition-colors w-[18px] h-[18px] md:w-6 md:h-6" />
          <input 
            type="text" 
            placeholder="Cari persetujuan..." 
            className="w-full bg-white border-transparent rounded-full md:rounded-[32px] py-4 md:py-6 pl-12 md:pl-16 pr-6 md:text-[16px] text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all placeholder:text-light text-ink" 
          />
        </div>

        {/* Task List (Dribbble "Device" style) */}
        <div className="space-y-4">
          <h2 className="text-[17px] md:text-[22px] font-bold text-ink tracking-tight mb-2 md:mb-4 px-1">Daftar Tugas</h2>
          
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center bg-white rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-5 text-emerald-500">
                <CheckCircle2 size={36} />
              </div>
              <p className="text-[16px] font-bold text-ink tracking-tight">Semua Tuntas!</p>
              <p className="text-[13px] font-medium text-muted mt-2 max-w-[70%] leading-relaxed">
                Tidak ada persetujuan yang sedang menunggu keputusan Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map(task => (
              <Link key={task.id} href={`/persetujuan/${encodeURIComponent(task.id)}`} className="flex flex-col bg-white rounded-[32px] md:rounded-[40px] p-4 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group relative">
                
                {/* Top Row: Icon, Title, Arrow */}
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-[46px] md:w-[60px] h-[46px] md:h-[60px] rounded-[16px] md:rounded-[20px] bg-slate-100 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                      <div className={cn(
                        "absolute inset-0 opacity-20",
                        task.prioritas === 'hi' ? 'bg-danger' : 
                        task.prioritas === 'mid' ? 'bg-warn' : 'bg-slate-400'
                      )}></div>
                      <FileText className={cn(
                        "relative z-10 w-5 h-5 md:w-7 md:h-7",
                        task.prioritas === 'hi' ? 'text-danger' : 
                        task.prioritas === 'mid' ? 'text-warn' : 'text-slate-500'
                      )} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] md:text-[18px] text-ink leading-tight mb-1 md:mb-1.5 group-hover:text-orange transition-colors line-clamp-2">{task.judul}</h3>
                      <p className="text-[12px] md:text-[14px] font-medium text-muted">
                        {task.sistem}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 md:w-12 h-8 md:h-12 rounded-full bg-slate-50 flex items-center justify-center text-light group-hover:bg-orange/10 group-hover:text-orange transition-colors flex-shrink-0 ml-2">
                    <ArrowRight className="w-4 h-4 md:w-6 md:h-6 -rotate-45" />
                  </div>
                </div>

                {/* Bottom Row: Status/Info Chips */}
                <div className="flex items-center gap-2 mt-auto">
                  <div className={cn(
                    "px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[11px] md:text-[13px] font-bold border flex items-center gap-1.5 md:gap-2",
                    task.prioritas === 'hi' ? 'bg-danger/5 border-danger/10 text-danger' :
                    task.prioritas === 'mid' ? 'bg-warn/5 border-warn/10 text-warn' :
                    'bg-slate-50 border-slate-100 text-slate-500'
                  )}>
                    {task.prioritas === 'hi' && <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />}
                    {task.prioritas === 'mid' && <Clock className="w-3 h-3 md:w-4 md:h-4" />}
                    {task.prioritas === 'lo' && <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />}
                    {task.prioritas === 'hi' ? 'Prioritas Tinggi' : task.prioritas === 'mid' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
                  </div>

                  <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] md:text-[13px] font-bold text-muted flex items-center gap-1.5 md:gap-2 ml-auto">
                    <User className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="truncate max-w-[100px] md:max-w-[150px]">{task.pemohon}</span>
                  </div>
                </div>

              </Link>
              ))}
            </div>
          )}
        </div>

        </div>
      </div>
    </div>
  );
}
