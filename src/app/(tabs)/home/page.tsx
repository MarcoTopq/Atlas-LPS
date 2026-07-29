"use client";

import AppBar from "@/components/AppBar";
import { MOCK_TASKS } from "@/lib/mock/data";
import { ChevronRight, Search, FileText, MessageSquare, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mockMeetings = [
    { id: 1, title: "Rapat Koordinasi IT", time: "10:00 - 11:30 WIB", room: "Ruang Rapat 2, Equity Tower" },
    { id: 2, title: "Pembahasan Anggaran Q3", time: "14:00 - 15:30 WIB", room: "Zoom Meeting" },
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC] pb-32 md:pb-12 relative w-full items-center">
      <div className="w-full">
        <AppBar
          showAvatar
          greeting="Selamat Pagi"
          subtitle="Dian Arief Risdianto"
        />

        <div className="px-5 md:px-8 mt-2 space-y-8">

          {/* Modern Search Bar */}
          <div className="relative group shadow-[0_8px_24px_rgba(0,0,0,0.03)] rounded-full md:rounded-[32px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-light group-focus-within:text-orange transition-colors w-[18px] h-[18px] md:w-6 md:h-6" />
            <input
              type="text"
              placeholder="Cari Layanan..."
              className="w-full bg-white border-transparent rounded-full md:rounded-[32px] py-4 md:py-6 pl-12 md:pl-16 pr-6 md:text-[16px] text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all placeholder:text-light text-ink"
            />
          </div>

          {/* Absen Card Adjusted */}
          <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col gap-5 md:gap-8 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-gradient-to-br from-orange/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-[12px] md:text-[14px] text-orange font-bold uppercase tracking-wider mb-1 md:mb-2">Absensi Hari Ini</p>
                <h2 className="text-[22px] md:text-[32px] font-bold text-ink tracking-tight mb-2 md:mb-3">Selasa, 14 Juli</h2>
                <div className="flex items-center gap-1.5 md:gap-2.5 text-[13px] md:text-[16px] font-medium text-muted">
                  <Clock className="text-orange w-3.5 h-3.5 md:w-5 md:h-5" />
                  <span>07:45 WIB</span>
                </div>
              </div>

              {/* Minimalist Location Pin */}
              <div className="w-10 md:w-16 h-10 md:h-16 rounded-full bg-orange/5 flex items-center justify-center">
                <MapPin className="text-orange w-[18px] h-[18px] md:w-8 md:h-8" />
              </div>
            </div>

            <p className="text-[13px] md:text-[16px] text-muted font-medium leading-relaxed max-w-[85%] md:max-w-[70%] relative z-10">
              Anda belum melakukan absensi. Lakukan sekarang dari Equity Tower, SCBD.
            </p>

            <div className="relative z-10 mt-1 md:mt-4">
              <button className="w-full bg-gradient-to-r from-orange to-[#D95E15] text-white font-bold py-3.5 md:py-5 rounded-full md:rounded-3xl text-[13.5px] md:text-[16px] shadow-[0_8px_20px_rgba(242,110,34,0.3)] hover:shadow-[0_10px_25px_rgba(242,110,34,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all">
                Absen Masuk
              </button>
            </div>
          </div>

          {/* Agenda Section */}
          <section>
            <div className="flex items-center justify-between mb-3 md:mb-5 px-1">
              <div>
                <h2 className="text-[17px] md:text-[22px] font-bold text-ink tracking-tight">Agenda Hari Ini</h2>
                <p className="text-[12px] md:text-[14px] text-muted font-medium">2 rapat terjadwal</p>
              </div>
              <Link href="/agenda" className="text-[13px] md:text-[15px] font-bold text-orange hover:text-orange-d transition-colors flex items-center gap-1">
                <span>Lihat Semua</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex gap-3 md:gap-5 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5 md:-mx-8 md:px-8">
              {mockMeetings.map((mtg, idx) => (
                <Link href="/agenda" key={idx} className="min-w-[260px] md:min-w-[320px] bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col gap-2.5 group hover:border-orange/30 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] md:text-[13px] font-bold text-orange bg-orange/10 px-2.5 py-1 rounded-full">
                      {mtg.time.split(' - ')[0]} WIB
                    </span>
                    {idx === 0 && (
                      <span className="text-[10px] md:text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        Terdekat
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[14.5px] md:text-[17px] text-ink mb-1 truncate group-hover:text-orange transition-colors">{mtg.title}</h3>
                    <div className="flex items-center gap-1.5 text-[12px] md:text-[14px] font-medium text-muted">
                      <MapPin className="text-light w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{mtg.room}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Persetujuan & Tugas Utama - CLEAN PRIORITY WORKLIST */}
          <section>
            <div className="flex items-center justify-between mb-3 md:mb-5 px-1">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[17px] md:text-[22px] font-bold text-ink tracking-tight">Tugas & Persetujuan</h2>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                </div>
                <p className="text-[12px] md:text-[14px] text-muted font-medium">Utamakan tindakan segera</p>
              </div>
              <Link href="/persetujuan" className="text-[13px] md:text-[15px] font-bold text-orange hover:text-orange-d transition-colors flex items-center gap-1">
                <span>Lihat Semua</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {MOCK_TASKS.slice(0, 3).map((task) => (
                <Link
                  key={task.id}
                  href={`/persetujuan/${encodeURIComponent(task.id)}`}
                  className="flex items-center justify-between bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-orange/30 hover:shadow-md transition-all group gap-3"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* Minimal Left Icon */}
                    <div className={cn(
                      "w-11 h-11 md:w-13 md:h-13 rounded-2xl flex items-center justify-center flex-shrink-0",
                      task.jenis === 'nota_dinas' ? 'bg-blue-50 text-blue-600' :
                      task.jenis === 'bpm' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange/10 text-orange'
                    )}>
                      <FileText className="w-5 h-5 md:w-6 md:h-6" />
                    </div>

                    {/* Task Title & Single Meta Line */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[14px] md:text-[16px] text-ink truncate group-hover:text-orange transition-colors">
                        {task.judul}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-[12px] font-medium text-muted truncate">
                        <span className="font-semibold text-ink/80">{task.sistem}</span>
                        <span>•</span>
                        <span>{task.pemohon}</span>
                        {task.total ? (
                          <>
                            <span>•</span>
                            <span className="font-bold text-navy">Rp {task.total.toLocaleString("id-ID")}</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Clean SLA / Urgency Tag & Chevron */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={cn(
                      "text-[11px] md:text-[12px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1",
                      task.prioritas === 'hi' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-700'
                    )}>
                      <Clock className="w-3 h-3" />
                      <span>{task.sla.replace('⏱ ', '')}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-light group-hover:text-orange group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
