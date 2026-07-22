"use client";

import AppBar from "@/components/AppBar";
import { MOCK_TASKS } from "@/lib/mock/data";
import { ChevronRight, Search, FileText, CheckSquare, MessageSquare, Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Folder } from "lucide-react";
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
            <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
              <h2 className="text-[17px] md:text-[22px] font-bold text-ink tracking-tight">Agenda Kerja</h2>
              <Link href="/agenda" className="text-[13px] md:text-[15px] font-bold text-blue-500 hover:text-blue-600 transition-colors">
                Lihat Semua
              </Link>
            </div>

            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5 md:-mx-8 md:px-8">
              {mockMeetings.map((mtg, idx) => (
                <div key={idx} className="min-w-[260px] md:min-w-[320px] bg-white rounded-[28px] md:rounded-[32px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col gap-3 group hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all">
                  <div className="flex items-center justify-between">
                    <div className="w-10 md:w-14 h-10 md:h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <CalendarIcon className="w-[18px] h-[18px] md:w-6 md:h-6" />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-bold text-blue-600 bg-blue-50 px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
                      {mtg.time.split(' - ')[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[14.5px] md:text-[18px] text-ink mb-1 md:mb-2 truncate group-hover:text-orange transition-colors">{mtg.title}</h3>
                    <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-[14px] font-medium text-muted">
                      <MapPin className="text-light w-3 h-3 md:w-4 md:h-4" />
                      <span className="truncate">{mtg.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Persetujuan Terbaru */}
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
              <h2 className="text-[17px] md:text-[22px] font-bold text-ink tracking-tight">Persetujuan Terbaru</h2>
              <Link href="/persetujuan" className="text-[13px] md:text-[15px] font-bold text-blue-500 hover:text-blue-600 transition-colors">
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_TASKS.slice(0, 2).map(task => (
                <Link key={task.id} href={`/persetujuan/${task.id}`} className="flex items-center bg-white rounded-[28px] md:rounded-[32px] p-3 md:p-5 pr-4 md:pr-6 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group">
                  {/* Left Icon (Avatar/Circle style) */}
                  <div className="w-[52px] md:w-[64px] h-[52px] md:h-[64px] rounded-full bg-slate-100 flex items-center justify-center relative overflow-hidden flex-shrink-0 mr-4 md:mr-6">
                    {/* Subtle bg based on priority */}
                    <div className={cn(
                      "absolute inset-0 opacity-20",
                      task.prioritas === 'hi' ? 'bg-danger' :
                        task.prioritas === 'mid' ? 'bg-warn' : 'bg-slate-400'
                    )}></div>
                    <FileText className={cn(
                      "relative z-10 w-[22px] h-[22px] md:w-7 md:h-7",
                      task.prioritas === 'hi' ? 'text-danger' :
                        task.prioritas === 'mid' ? 'text-warn' : 'text-slate-500'
                    )} />
                  </div>

                  {/* Center Content */}
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-bold text-[14px] md:text-[17px] text-ink truncate mb-1 md:mb-1.5 pr-2">{task.judul}</h3>
                    <p className="text-[12px] md:text-[14px] font-medium text-muted truncate">
                      {task.sistem} • {task.pemohon}
                    </p>
                  </div>

                  {/* Right Action Button */}
                  <div className="w-10 md:w-14 h-10 md:h-14 rounded-full bg-slate-50 flex items-center justify-center text-light group-hover:bg-[#E8F0FE] group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2">
                    <ArrowRight className="w-[18px] h-[18px] md:w-6 md:h-6" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Menu Utama */}
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
              <h2 className="text-[17px] md:text-[22px] font-bold text-ink tracking-tight">Menu Utama</h2>
              <Link href="#" className="text-[13px] md:text-[15px] font-bold text-blue-500 hover:text-blue-600 transition-colors">
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: "Naskah Dinas", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
                { name: "BPM", icon: CheckSquare, color: "text-emerald-500", bg: "bg-emerald-50" },
                { name: "Dokumen", icon: Folder, color: "text-purple-500", bg: "bg-purple-50" },
                { name: "Anggota", icon: CalendarIcon, color: "text-orange", bg: "bg-orange/10" },
              ].map((item, idx) => {
                const Icon = item.icon;
                const href = item.name === "BPM" ? "/bpm" : "#";
                return (
                  <Link key={idx} href={href} className="bg-white rounded-[24px] md:rounded-[36px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group flex flex-col h-[130px] md:h-[200px] relative">
                    <div className="absolute top-4 md:top-6 right-4 md:right-6 w-7 md:w-12 h-7 md:h-12 bg-slate-50 rounded-full flex items-center justify-center text-light group-hover:bg-orange group-hover:text-white transition-colors">
                      <ArrowRight className="w-[14px] h-[14px] md:w-6 md:h-6 -rotate-45" />
                    </div>

                    <div className={cn("w-12 md:w-20 h-12 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-auto", item.bg, item.color)}>
                      <Icon className="w-6 h-6 md:w-10 md:h-10" strokeWidth={2} />
                    </div>

                    <span className="text-[14px] md:text-[18px] font-bold text-ink tracking-tight leading-tight mt-3 md:mt-4 w-[80%]">
                      {item.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
