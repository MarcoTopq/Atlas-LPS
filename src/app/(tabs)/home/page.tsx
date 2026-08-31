"use client";

import AppBar from "@/components/AppBar";
import { 
  ChevronRight, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Send, 
  Calendar
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const [aiQuery, setAiQuery] = useState("");
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [activeLpsCardIndex, setActiveLpsCardIndex] = useState(0);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    router.push(`/ai?q=${encodeURIComponent(aiQuery.trim())}`);
  };

  const quickPrompts = [
    "Batas Bunga Penjaminan",
    "Ringkas Decision Brief",
    "Sisa Anggaran Divisi"
  ];

  const mockMeetings = [
    { 
      id: 1, 
      title: "Rapat Koordinasi TI & Infra", 
      time: "10:00 – 11:30 WIB", 
      room: "Ruang Rapat 2, Equity Tower", 
      status: "Terjadwal" 
    },
    { 
      id: 2, 
      title: "Pembahasan Anggaran Q3 LPS", 
      time: "14:00 – 15:30 WIB", 
      room: "Zoom Meeting", 
      status: "Terjadwal" 
    },
  ];

  // Priority tasks with complete Decision Brief structure
  const priorityTasks = [
    {
      id: "ND-1610/2026",
      sistem: "e-Correspondence",
      jenis: "nota_dinas",
      judul: "Nota Dinas Perjalanan Dinas Sosialisasi KPW Surabaya",
      prioritas: "Tinggi",
      brief: {
        status: "Sesuai Aturan",
        anggaran: "Tersedia & mencukupi (sisa pagu 62%)",
        pola: "Sesuai historis pengajuan",
        dasar: "PDK No. 12/2024"
      }
    },
    {
      id: "BPM-4521",
      sistem: "BPM",
      jenis: "bpm",
      judul: "Reimbursement Rapat Evaluasi Kinerja Tim GRC",
      prioritas: "Tinggi",
      brief: {
        status: "Sesuai Aturan",
        anggaran: "Kwitansi konsumsi rapat lengkap & sah",
        pola: "Sesuai plafon harian unit kerja",
        dasar: "SOP Pengeluaran LPS No. 04/2023"
      }
    },
    {
      id: "VT-0912",
      sistem: "OneLPS",
      jenis: "voucher",
      judul: "Voucher Taksi Lembur Tim Divisi Penanganan Klaim",
      prioritas: "Sedang",
      brief: {
        status: "Sesuai Aturan",
        anggaran: "Memenuhi syarat penerbitan voucher",
        pola: "Lembur berakhir >20.00 WIB tercatat valid",
        dasar: "SE Logistik No. 07/2024"
      }
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#F6F7F9] pb-8 md:pb-8 relative w-full items-center font-sans text-[#172033]">
      <div className="w-full max-w-5xl">
        
        {/* HEADER / EXECUTIVE GREETING */}
        <AppBar
          showAvatar
          greeting="Selamat pagi,"
          subtitle="Dian Arief Risdianto"
          role="Direktur Eksekutif Penjaminan"
        />

        <div className="px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 space-y-4 sm:space-y-5">

          {/* SECTION 1: AI ASSISTANT — TANYA AI ATLAS (EXECUTIVE SEARCH) */}
          <section aria-label="Tanya AI ATLAS" className="space-y-2">
            <form onSubmit={handleAiSubmit} className="space-y-2.5">
              <div className="flex items-center bg-white rounded-2xl p-2 sm:p-2.5 border border-[#EAECF0] shadow-[0_2px_12px_rgba(23,32,51,0.03)] focus-within:border-[#F56621] focus-within:ring-2 focus-within:ring-[#F56621]/10 transition-all">
                <div className="pl-2.5 pr-2 text-[#F56621] flex items-center justify-center">
                  <Sparkles size={18} strokeWidth={1.8} />
                </div>
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Tanya AI ATLAS..."
                  className="w-full bg-transparent border-none py-1.5 text-[13.5px] font-normal text-[#172033] focus:outline-none placeholder:text-[#98A2B3] tracking-tight"
                />
                <button
                  type="submit"
                  className="bg-[#F56621] hover:bg-[#D95E15] text-white font-medium px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-xs active:scale-95 text-xs"
                >
                  <span>Tanya</span>
                  <Send size={12} />
                </button>
              </div>

              {/* Neutral Quick Action Chips (2-3 items) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => router.push(`/ai?q=${encodeURIComponent(prompt)}`)}
                    className="bg-white hover:bg-[#F9FAFB] text-[#475467] hover:text-[#172033] text-[11.5px] font-medium px-3.5 py-1.5 rounded-full border border-[#EAECF0] shadow-2xs transition-all flex-shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#98A2B3]" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </form>
          </section>

          {/* SECTION 2: COMPACT HALF-HEIGHT HORIZONTAL CAROUSEL BANNER (BELOW AI FORM) */}
          <section aria-label="Indikator & Bunga Penjaminan LPS" className="space-y-2">
            {/* Carousel Container */}
            <div 
              className="flex gap-3.5 overflow-x-auto pb-1 scrollbar-hide -mx-5 px-5 snap-x snap-mandatory"
              onScroll={(e) => {
                const target = e.currentTarget;
                const scrollLeft = target.scrollLeft;
                const width = target.offsetWidth * 0.85;
                const index = Math.round(scrollLeft / width);
                if (index !== activeLpsCardIndex && (index === 0 || index === 1)) {
                  setActiveLpsCardIndex(index);
                }
              }}
            >
              {/* SLIDE 1: Tingkat Bunga Penjaminan (Compact Half-Height Strip) */}
              <div className="min-w-[85vw] max-w-[340px] sm:min-w-[340px] snap-center bg-gradient-to-r from-[#D95E15] via-[#C44E0E] to-[#A83D05] text-white rounded-2xl p-3 sm:p-3.5 border border-[#EA6722]/30 shadow-[0_4px_16px_rgba(201,71,7,0.18)] flex flex-col justify-between space-y-2 flex-shrink-0 relative overflow-hidden">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold text-white tracking-tight">
                      Tingkat Bunga Penjaminan
                    </span>
                    <span className="text-[9px] font-semibold text-white bg-white/20 px-1.5 py-0.2 rounded-full leading-tight">
                      LPS Rate
                    </span>
                  </div>
                  <span className="text-[9.5px] text-white/80">s.d 30 Sep 2026</span>
                </div>

                {/* 3 Rates Row */}
                <div className="grid grid-cols-3 divide-x divide-white/20 py-0.5">
                  <div className="text-center pr-1.5">
                    <div className="text-[17px] font-bold text-white tracking-tight leading-tight">
                      3,75<span className="text-[10px] font-semibold text-white/90 ml-0.5">%</span>
                    </div>
                    <span className="text-[9px] text-white/75 block mt-0.5 truncate">Bank Umum (IDR)</span>
                  </div>

                  <div className="text-center px-1.5">
                    <div className="text-[17px] font-bold text-white tracking-tight leading-tight">
                      6,25<span className="text-[10px] font-semibold text-white/90 ml-0.5">%</span>
                    </div>
                    <span className="text-[9px] text-white/75 block mt-0.5 truncate">BPR (IDR)</span>
                  </div>

                  <div className="text-center pl-1.5">
                    <div className="text-[17px] font-bold text-white tracking-tight leading-tight">
                      2,00<span className="text-[10px] font-semibold text-white/90 ml-0.5">%</span>
                    </div>
                    <span className="text-[9px] text-white/75 block mt-0.5 truncate">Valas</span>
                  </div>
                </div>

                {/* Compact Footer Line */}
                <div className="pt-1.5 border-t border-white/20 flex items-center justify-between text-[10px] text-white/90 leading-none">
                  <span>Maks. Penjaminan <strong>Rp 2 Miliar</strong></span>
                  <span className="text-white/75">Geser ›</span>
                </div>
              </div>

              {/* SLIDE 2: Kinerja Operasional LPS (Compact Dark / Black Card) */}
              <div className="min-w-[85vw] max-w-[340px] sm:min-w-[340px] snap-center bg-gradient-to-r from-[#172033] via-[#111827] to-[#0B0F19] text-white rounded-2xl p-3 sm:p-3.5 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex flex-col justify-between space-y-2 flex-shrink-0 relative overflow-hidden">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-white tracking-tight">
                    Kinerja Operasional LPS
                  </span>
                  <Link 
                    href="/dashboard" 
                    className="text-[9.5px] font-semibold text-white bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-0.5 hover:bg-white/30 transition-colors leading-tight"
                  >
                    <span>SIM</span>
                    <ChevronRight size={10} />
                  </Link>
                </div>

                {/* 4 Metrics Row */}
                <div className="grid grid-cols-4 divide-x divide-white/20 py-0.5 text-center">
                  <Link href="/dashboard/keuangan" className="px-1 block group">
                    <div className="text-[16px] font-bold text-white tracking-tight leading-tight">68,4%</div>
                    <span className="text-[8.5px] text-white/75 block mt-0.5 truncate">Anggaran</span>
                  </Link>

                  <Link href="/dashboard/ics" className="px-1 block group">
                    <div className="text-[16px] font-bold text-white tracking-tight leading-tight">99,2%</div>
                    <span className="text-[8.5px] text-white/75 block mt-0.5 truncate">Klaim SCV</span>
                  </Link>

                  <Link href="/dashboard/likuidasi" className="px-1 block group">
                    <div className="text-[16px] font-bold text-white tracking-tight leading-tight">16</div>
                    <span className="text-[8.5px] text-white/75 block mt-0.5 truncate">Bank BDL</span>
                  </Link>

                  <Link href="/dashboard/hukum" className="px-1 block group">
                    <div className="text-[16px] font-bold text-white tracking-tight leading-tight">90,5%</div>
                    <span className="text-[8.5px] text-white/75 block mt-0.5 truncate">Hukum</span>
                  </Link>
                </div>

                {/* Compact Footer Line */}
                <div className="pt-1.5 border-t border-white/20 flex items-center justify-between text-[10px] text-white/90 leading-none">
                  <span>Status Terpantau Real-time</span>
                  <span className="text-white/75">‹ Geser</span>
                </div>
              </div>

            </div>

            {/* Page Indicator Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-0.5">
              {[0, 1].map((idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    activeLpsCardIndex === idx 
                      ? "w-4 bg-[#D95E15]" 
                      : "w-1.5 bg-[#D0D5DD]"
                  )}
                />
              ))}
            </div>
          </section>

          {/* SECTION 3: TUGAS & PERSETUJUAN (HORIZONTAL SCROLLING CAROUSEL) */}
          <section aria-label="Tugas & Persetujuan" className="space-y-3">
            {/* Section Header */}
            <div className="flex items-start justify-between px-0.5">
              <div>
                <h2 className="text-[17px] sm:text-[19px] font-semibold text-[#172033] tracking-tight leading-tight">
                  Tugas & Persetujuan
                </h2>
                <p className="text-[12px] text-[#667085] font-normal mt-0.5">
                  3 perlu tindakan · 1 prioritas tinggi
                </p>
              </div>
              <Link 
                href="/persetujuan" 
                className="text-[12.5px] font-semibold text-[#F56621] hover:text-[#D95E15] transition-colors flex items-center gap-0.5 mt-0.5"
              >
                <span>Lihat Semua</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            {/* Horizontal Carousel (84-88% Width Peek) */}
            <div 
              className="flex gap-3.5 overflow-x-auto pb-2 pt-1 scrollbar-hide -mx-5 px-5 snap-x snap-mandatory"
              onScroll={(e) => {
                const target = e.currentTarget;
                const scrollLeft = target.scrollLeft;
                const width = target.offsetWidth * 0.85;
                const index = Math.round(scrollLeft / width);
                if (index !== activeTaskIndex && index >= 0 && index < priorityTasks.length) {
                  setActiveTaskIndex(index);
                }
              }}
            >
              {priorityTasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/persetujuan/${encodeURIComponent(task.id)}`}
                  className="min-w-[85vw] max-w-[340px] sm:min-w-[340px] snap-center bg-white rounded-[20px] p-4.5 sm:p-5 border border-[#EAECF0] shadow-[0_2px_12px_rgba(23,32,51,0.03)] hover:border-[#F56621]/60 hover:shadow-[0_8px_24px_rgba(245,102,33,0.08)] transition-all flex flex-col justify-between space-y-3.5 flex-shrink-0 group active:scale-[0.99]"
                >
                  {/* Level 1: Priority Badge + Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn(
                        "text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border",
                        task.prioritas === 'Tinggi' 
                          ? 'bg-[#FEF3F2] text-[#D92D20] border-[#FEE4E2]' 
                          : 'bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]'
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          task.prioritas === 'Tinggi' ? 'bg-[#D92D20]' : 'bg-[#B54708]'
                        )} />
                        <span>Prioritas {task.prioritas}</span>
                      </span>

                      <span className="text-[11.5px] font-normal text-[#98A2B3]">
                        {task.sistem}
                      </span>
                    </div>

                    {/* Level 2: Document Title */}
                    <div>
                      <h3 className="font-semibold text-[14.5px] text-[#172033] leading-snug line-clamp-2 group-hover:text-[#F56621] transition-colors">
                        {task.judul}
                      </h3>
                      {/* Level 3: System Reference */}
                      <p className="text-[11.5px] text-[#667085] font-normal mt-1 font-mono">
                        {task.id}
                      </p>
                    </div>
                  </div>

                  {/* Level 4: Decision Brief (Decision Support Component) */}
                  <div className="bg-[#F9FAFB] rounded-[16px] p-3.5 space-y-2 border border-[#EAECF0] group-hover:border-[#F56621]/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#172033]">
                        <Sparkles size={13} className="text-[#F56621]" /> Decision Brief
                      </span>
                      <span className="text-[11px] font-medium bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        ✓ {task.brief.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-[12px] text-[#475467] leading-relaxed pt-0.5">
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#98A2B3] flex-shrink-0">•</span>
                        <span><strong>Anggaran:</strong> {task.brief.anggaran}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#98A2B3] flex-shrink-0">•</span>
                        <span><strong>Pola:</strong> {task.brief.pola}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#98A2B3] flex-shrink-0">•</span>
                        <span><strong>Dasar:</strong> {task.brief.dasar}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Footer Tap Indicator */}
                  <div className="pt-2 border-t border-[#EAECF0] flex items-center justify-between text-[11.5px] font-medium text-[#667085] group-hover:text-[#F56621] transition-colors">
                    <span>Buka Persetujuan</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#F56621]" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Carousel Page Indicator */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {priorityTasks.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    activeTaskIndex === idx 
                      ? "w-4 bg-[#F56621]" 
                      : "w-1.5 bg-[#D0D5DD]"
                  )}
                />
              ))}
            </div>
          </section>

          {/* SECTION 4: AGENDA HARI INI */}
          <section aria-label="Agenda Hari Ini" className="space-y-3">
            {/* Section Header */}
            <div className="flex items-start justify-between px-0.5">
              <div>
                <h2 className="text-[17px] sm:text-[19px] font-semibold text-[#172033] tracking-tight leading-tight">
                  Agenda Hari Ini
                </h2>
                <p className="text-[12px] text-[#667085] font-normal mt-0.5">
                  2 agenda terjadwal
                </p>
              </div>
              <Link 
                href="/agenda" 
                className="text-[12.5px] font-semibold text-[#F56621] hover:text-[#D95E15] transition-colors flex items-center gap-0.5 mt-0.5"
              >
                <span>Lihat Semua</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            {/* Agenda Timeline List */}
            <div className="space-y-2.5">
              {mockMeetings.map((mtg) => (
                <Link
                  href="/agenda"
                  key={mtg.id}
                  className="bg-white rounded-[18px] p-4 border border-[#EAECF0] shadow-[0_2px_8px_rgba(23,32,51,0.02)] hover:border-[#F56621]/40 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] border border-[#EAECF0] text-[#667085] flex items-center justify-center flex-shrink-0 group-hover:text-[#F56621] group-hover:border-[#F56621]/30 transition-colors">
                      <Calendar size={18} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11.5px] font-semibold text-[#172033]">
                          {mtg.time}
                        </span>
                        <span className="text-[10px] font-medium text-[#667085] bg-[#F2F4F7] px-1.5 py-0.5 rounded">
                          {mtg.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[13.5px] text-[#172033] truncate mt-0.5 group-hover:text-[#F56621] transition-colors">
                        {mtg.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[11.5px] text-[#667085] font-normal truncate mt-0.5">
                        <MapPin size={11} className="text-[#98A2B3] flex-shrink-0" />
                        <span className="truncate">{mtg.room}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-[#98A2B3] group-hover:text-[#F56621] transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
