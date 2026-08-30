"use client";

import AppBar from "@/components/AppBar";
import { MOCK_TASKS } from "@/lib/mock/data";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PersetujuanPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const tabs = ["Semua", "ICS", "EUIS", "e-Correspondence", "BPM", "OneLPS"];

  const filteredTasks = MOCK_TASKS.filter(task => {
    // 1. Tab filter
    let matchTab = true;
    if (activeTab === "ICS") matchTab = task.sistem === "ICS" || task.jenis === "ics";
    else if (activeTab === "EUIS") matchTab = task.sistem === "EUIS" || task.jenis === "euis";
    else if (activeTab === "e-Correspondence") matchTab = task.sistem === "e-Correspondence" || task.sistem === "Nota Dinas" || task.jenis === "nota_dinas";
    else if (activeTab === "BPM") matchTab = task.sistem === "BPM" || task.jenis === "bpm";
    else if (activeTab === "OneLPS") matchTab = task.sistem === "OneLPS" || task.jenis === "onelps";

    if (!matchTab) return false;

    // 2. Search filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      task.judul.toLowerCase().includes(q) ||
      task.id.toLowerCase().includes(q) ||
      task.pemohon.toLowerCase().includes(q) ||
      task.sistem.toLowerCase().includes(q) ||
      (task.brief?.ringkasan && task.brief.ringkasan.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col min-h-full bg-[#F6F7F9] pb-32 md:pb-12 relative w-full items-center font-sans text-[#172033]">
      <div className="w-full max-w-5xl">
        <AppBar 
          title="Persetujuan" 
          showBack 
          onSearchChange={(q) => setSearchQuery(q)}
          searchValue={searchQuery}
          searchPlaceholder="Cari persetujuan, nomor nota, atau pemohon..."
        />

        <div className="px-4 sm:px-6 md:px-8 pt-4 space-y-5">
          
          {/* Header Description Banner */}
          <div className="bg-white p-4 sm:p-5 rounded-[22px] border border-[#EAECF0] shadow-2xs flex items-center justify-between gap-4">
            <div>
              <h1 className="text-[17px] sm:text-[19px] font-extrabold text-[#172033] tracking-tight">
                Daftar Tugas & Persetujuan
              </h1>
              <p className="text-xs text-[#667085] font-normal mt-0.5">
                {filteredTasks.length} tugas memerlukan evaluasi & keputusan Anda
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F56621]/10 text-[#F56621] rounded-full text-xs font-semibold border border-[#F56621]/20">
              <Sparkles size={13} />
              <span>Decision Brief Aktif</span>
            </div>
          </div>

          {/* Tab Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all flex-shrink-0 whitespace-nowrap cursor-pointer",
                  activeTab === tab
                    ? "bg-[#172033] text-white shadow-xs"
                    : "bg-white text-[#667085] hover:text-[#172033] border border-[#EAECF0] hover:bg-[#F9FAFB]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Result Feedback if searching */}
          {searchQuery.trim() && (
            <div className="flex items-center justify-between text-xs text-[#667085] px-1">
              <span>Hasil pencarian untuk: &ldquo;<strong className="text-[#172033]">{searchQuery}</strong>&rdquo;</span>
              <button 
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#F56621] font-semibold hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}

          {/* Task List Grid with Decision Brief */}
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center bg-white rounded-3xl border border-[#EAECF0] shadow-2xs space-y-2">
              <div className="w-14 h-14 bg-[#ECFDF3] rounded-full flex items-center justify-center text-[#027A48]">
                <CheckCircle2 size={28} />
              </div>
              <p className="text-base font-bold text-[#172033]">Semua Tuntas!</p>
              <p className="text-xs text-[#667085] max-w-xs leading-relaxed">
                Tidak ada persetujuan yang sedang menunggu keputusan Anda untuk kategori ini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/persetujuan/${encodeURIComponent(task.id)}`}
                  className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#EAECF0] shadow-[0_2px_12px_rgba(23,32,51,0.03)] hover:border-[#F56621]/60 hover:shadow-[0_8px_24px_rgba(245,102,33,0.08)] transition-all flex flex-col justify-between space-y-3.5 group active:scale-[0.99]"
                >
                  {/* Top: Priority Badge + System Name */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn(
                        "text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border",
                        task.prioritas === 'hi' 
                          ? 'bg-[#FEF3F2] text-[#D92D20] border-[#FEE4E2]' 
                          : task.prioritas === 'mid'
                          ? 'bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]'
                          : 'bg-[#F2F4F7] text-[#475467] border-[#EAECF0]'
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          task.prioritas === 'hi' ? 'bg-[#D92D20]' : task.prioritas === 'mid' ? 'bg-[#B54708]' : 'bg-[#475467]'
                        )} />
                        <span>Prioritas {task.prioritas === 'hi' ? 'Tinggi' : task.prioritas === 'mid' ? 'Sedang' : 'Rendah'}</span>
                      </span>

                      <span className="text-[11.5px] font-medium text-[#98A2B3]">
                        {task.sistem}
                      </span>
                    </div>

                    {/* Document Title */}
                    <div>
                      <h2 className="font-semibold text-[14.5px] text-[#172033] leading-snug group-hover:text-[#F56621] transition-colors">
                        {task.judul}
                      </h2>
                      <div className="flex items-center gap-2.5 mt-1.5 text-[11.5px] text-[#667085] flex-wrap">
                        <span className="font-mono font-medium text-[#475467] bg-[#F2F4F7] px-1.5 py-0.2 rounded border border-[#EAECF0]">
                          {task.id}
                        </span>
                        <span>oleh <strong>{task.pemohon}</strong></span>
                        <span className="text-[#98A2B3]">• {task.sla.replace('⏱ ', '')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Decision Brief Component (AI On-Premise LPS) */}
                  <div className="bg-[#F9FAFB] rounded-[16px] p-3.5 space-y-2 border border-[#EAECF0] group-hover:border-[#F56621]/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#172033]">
                        <Sparkles size={13} className="text-[#F56621]" /> Decision Brief
                      </span>
                      <span className="text-[10.5px] font-medium bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        ✓ {task.brief?.flag === 'anomali' ? 'Perlu Perhatian' : 'Sesuai SOP'}
                      </span>
                    </div>

                    <div className="space-y-1 text-[11.5px] text-[#475467] leading-relaxed pt-0.5">
                      {task.brief?.ringkasan && (
                        <p className="text-[11.5px] text-[#475467] line-clamp-2">
                          {task.brief.ringkasan}
                        </p>
                      )}
                      
                      {task.brief?.kv && task.brief.kv.length > 0 && (
                        <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-[#EAECF0]/80">
                          {task.brief.kv.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="text-[11px] truncate">
                              <span className="text-[#98A2B3]">{item.k}: </span>
                              <span className="font-semibold text-[#172033]">{item.v}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {task.brief?.sitasi && (
                        <div className="text-[10.5px] text-[#667085] pt-0.5 flex items-start gap-1">
                          <span className="text-[#98A2B3] flex-shrink-0">Dasar:</span>
                          <span className="truncate">{task.brief.sitasi}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-2 border-t border-[#EAECF0] flex items-center justify-between text-[11.5px] font-medium text-[#667085] group-hover:text-[#F56621] transition-colors">
                    <span>Tinjau & Setujui</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#F56621]" />
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
