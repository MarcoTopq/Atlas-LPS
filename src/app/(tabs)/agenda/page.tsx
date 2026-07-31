"use client";

import AppBar from "@/components/AppBar";
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle2, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type EventCategory = "all" | "rapat" | "klaim" | "hukum" | "it";

type EventItem = {
  id: string;
  date: number;
  dayName: string;
  month: string;
  year: number;
  time: string;
  title: string;
  location: string;
  category: EventCategory;
  color: string;
  bg: string;
  pic: string;
  status: "Lancar" | "Mendekati SLA" | "Selesai";
};

const DATES = [
  { day: 26, isPrevMonth: true },
  { day: 27, isPrevMonth: true },
  { day: 28, isPrevMonth: true },
  { day: 29, isPrevMonth: true },
  { day: 30, isPrevMonth: true },
  { day: 1, isPrevMonth: false },
  { day: 2, isPrevMonth: false },
  { day: 3, isPrevMonth: false },
  { day: 4, isPrevMonth: false },
  { day: 5, isPrevMonth: false },
  { day: 6, isPrevMonth: false },
  { day: 7, isPrevMonth: false },
  { day: 8, isPrevMonth: false },
  { day: 9, isPrevMonth: false },
  { day: 10, isPrevMonth: false },
  { day: 11, isPrevMonth: false },
  { day: 12, isPrevMonth: false },
  { day: 13, isPrevMonth: false },
  { day: 14, isPrevMonth: false },
  { day: 15, isPrevMonth: false },
  { day: 16, isPrevMonth: false },
  { day: 17, isPrevMonth: false },
  { day: 18, isPrevMonth: false },
  { day: 19, isPrevMonth: false },
  { day: 20, isPrevMonth: false },
  { day: 21, isPrevMonth: false },
  { day: 22, isPrevMonth: false },
  { day: 23, isPrevMonth: false },
  { day: 24, isPrevMonth: false },
  { day: 25, isPrevMonth: false },
  { day: 26, isPrevMonth: false },
  { day: 27, isPrevMonth: false },
  { day: 28, isPrevMonth: false },
  { day: 29, isPrevMonth: false },
  { day: 30, isPrevMonth: false },
  { day: 31, isPrevMonth: false },
];

const MOCK_EVENTS: EventItem[] = [
  { id: "e01", date: 8, dayName: "Rabu", month: "Juli", year: 2026, time: "09:00 WIB", title: "Rapat Persiapan Rekapitulasi Klaim BPR", location: "Ruang Rapat 2 - Lt. 3", category: "klaim", color: "text-emerald-800", bg: "bg-emerald-50 border-emerald-200", pic: "Hendra Wijaya", status: "Selesai" },
  { id: "e02", date: 8, dayName: "Rabu", month: "Juli", year: 2026, time: "14:00 WIB", title: "Penelaahan Aturan Peraturan Lembaga (PLPS)", location: "Ruang Hukum Lt. 5", category: "hukum", color: "text-amber-800", bg: "bg-amber-50 border-amber-200", pic: "Tim Divisi GRC", status: "Selesai" },
  { id: "e03", date: 11, dayName: "Sabtu", month: "Juli", year: 2026, time: "10:00 WIB", title: "Sosialisasi Edukasi Penjaminan Simpanan Nasabah", location: "Grand Ballroom Hotel Indonesia", category: "rapat", color: "text-blue-800", bg: "bg-blue-50 border-blue-200", pic: "Sintia Dewi", status: "Selesai" },
  { id: "e04", date: 15, dayName: "Rabu", month: "Juli", year: 2026, time: "09:00 WIB", title: "Konsinyering Tim Rekonsiliasi & Verifikasi Bank CIU", location: "Ruang Rapat Utama", category: "klaim", color: "text-emerald-800", bg: "bg-emerald-50 border-emerald-200", pic: "Pak Budi Santoso", status: "Selesai" },
  { id: "e05", date: 15, dayName: "Rabu", month: "Juli", year: 2026, time: "13:30 WIB", title: "Pembahasan Nota Dinas Pengadaan Perangkat IT", location: "Ruang Kerja Komisioner", category: "it", color: "text-purple-800", bg: "bg-purple-50 border-purple-200", pic: "Divisi SI", status: "Selesai" },
  { id: "e1", date: 16, dayName: "Kamis", month: "Juli", year: 2026, time: "08:30 WIB", title: "Briefing Pagi & Standup Tim Penanganan Klaim", location: "Ruang Rapat 1 - Lt. 4", category: "klaim", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", pic: "Pak Budi Santoso", status: "Selesai" },
  { id: "e2", date: 16, dayName: "Kamis", month: "Juli", year: 2026, time: "09:30 WIB", title: "Konsinyering GRC & Penelaahan Dokumen Peraturan", location: "Hotel Tentrem Yogyakarta", category: "hukum", color: "text-amber-800", bg: "bg-amber-50 border-amber-200", pic: "Tim Divisi GRC", status: "Lancar" },
  { id: "e3", date: 16, dayName: "Kamis", month: "Juli", year: 2026, time: "11:30 WIB", title: "Review Redaksi Nota Dinas & SPJ Perjalanan Dinas", location: "Ruang Kerja Komisioner", category: "rapat", color: "text-blue-800", bg: "bg-blue-50 border-blue-200", pic: "Andi Pratama", status: "Lancar" },
  { id: "e4", date: 16, dayName: "Kamis", month: "Juli", year: 2026, time: "14:00 WIB", title: "Rapat Pleno Pembayaran Klaim Bank CIU", location: "Auditorium Utama LPS", category: "klaim", color: "text-indigo-800", bg: "bg-indigo-50 border-indigo-200", pic: "Direksi Klaim", status: "Mendekati SLA" },
  { id: "e5", date: 16, dayName: "Kamis", month: "Juli", year: 2026, time: "16:30 WIB", title: "Evaluasi Kinerja Sistem SCV BPR & Integrasi APOLO", location: "Online (Microsoft Teams)", category: "it", color: "text-purple-800", bg: "bg-purple-50 border-purple-200", pic: "Divisi Sistem Informasi", status: "Lancar" },
  { id: "e6", date: 16, dayName: "Kamis", month: "Juli", year: 2026, time: "19:00 WIB", title: "Laporan Rekapitulasi Keberatan Nasabah", location: "Ruang Rapat Direksi", category: "hukum", color: "text-rose-800", bg: "bg-rose-50 border-rose-200", pic: "Tim Advokasi", status: "Lancar" },
  { id: "e7", date: 17, dayName: "Jumat", month: "Juli", year: 2026, time: "08:00 WIB", title: "Sosialisasi Ketentuan Voucher Taksi & Lembur Pegawai", location: "Auditorium Lt. 3", category: "rapat", color: "text-blue-800", bg: "bg-blue-50 border-blue-200", pic: "SDM & Logistik", status: "Lancar" },
  { id: "e8", date: 17, dayName: "Jumat", month: "Juli", year: 2026, time: "10:00 WIB", title: "Audiensi Pengurus BPR Terkait Single Customer View", location: "Ruang Rapat Utama", category: "klaim", color: "text-emerald-800", bg: "bg-emerald-50 border-emerald-200", pic: "Tim SCV BPR", status: "Lancar" },
  { id: "e9", date: 17, dayName: "Jumat", month: "Juli", year: 2026, time: "13:30 WIB", title: "Monitoring Penyerapan Pagu Anggaran Q3", location: "Ruang Rapat Keuangan", category: "rapat", color: "text-teal-800", bg: "bg-teal-50 border-teal-200", pic: "Divisi Keuangan", status: "Lancar" },
  { id: "e10", date: 17, dayName: "Jumat", month: "Juli", year: 2026, time: "15:30 WIB", title: "Serah Terima Aset IT Dinas & Pembaruan Sertifikat", location: "Helpdesk IT Center", category: "it", color: "text-purple-800", bg: "bg-purple-50 border-purple-200", pic: "Tim Helpdesk IT", status: "Lancar" },
  { id: "e12", date: 18, dayName: "Sabtu", month: "Juli", year: 2026, time: "09:00 WIB", title: "Workshop Peningkatan Kapasitas Platform ATLAS", location: "Training Hall Lt. 5", category: "it", color: "text-purple-800", bg: "bg-purple-50 border-purple-200", pic: "Tim Pelatihan", status: "Lancar" },
  { id: "e14", date: 20, dayName: "Senin", month: "Juli", year: 2026, time: "08:30 WIB", title: "Executive Summary Presentation to Board of Commissioners", location: "Board Room Lt. 20", category: "rapat", color: "text-blue-800", bg: "bg-blue-50 border-blue-200", pic: "Kepala Divisi", status: "Lancar" },
  { id: "e15", date: 20, dayName: "Senin", month: "Juli", year: 2026, time: "10:30 WIB", title: "Penelaahan Hukum Sengketa Bank Gagal & Litigasi", location: "Ruang Rapat Hukum", category: "hukum", color: "text-amber-800", bg: "bg-amber-50 border-amber-200", pic: "Tim Advokasi", status: "Lancar" },
  { id: "e16", date: 22, dayName: "Rabu", month: "Juli", year: 2026, time: "09:00 WIB", title: "Diskusi Integrasi On-Premise AI Knowledge Hub", location: "Ruang AI Innovation Center", category: "it", color: "text-indigo-800", bg: "bg-indigo-50 border-indigo-200", pic: "Tim AI ATLAS", status: "Lancar" },
  { id: "e18", date: 28, dayName: "Selasa", month: "Juli", year: 2026, time: "08:30 WIB", title: "Evaluasi Penyerapan Pagu Anggaran Operasional Q3", location: "Ruang Keuangan", category: "rapat", color: "text-teal-800", bg: "bg-teal-50 border-teal-200", pic: "Bendahara", status: "Lancar" },
  { id: "e20", date: 30, dayName: "Kamis", month: "Juli", year: 2026, time: "09:00 WIB", title: "Closing Meeting Rapat Kerja Bulanan LPS", location: "Grand Ballroom LPS", category: "rapat", color: "text-indigo-800", bg: "bg-indigo-50 border-indigo-200", pic: "Sekretariat Lembaga", status: "Lancar" },
];

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState<'today' | 'calendar'>('calendar');
  const [selectedDate, setSelectedDate] = useState<number>(16);
  const [currentMonth, setCurrentMonth] = useState<string>("Juli 2026");

  const filteredCalendarEvents = MOCK_EVENTS.filter(e => e.date === selectedDate);
  const todayEvents = MOCK_EVENTS.filter(e => e.date === 16);

  const selectedDateEventsAll = MOCK_EVENTS.filter(e => e.date === selectedDate);
  const selectedDateDayName = selectedDateEventsAll.length > 0 ? selectedDateEventsAll[0].dayName : "Juli";

  return (
    <div className="flex flex-col min-h-dvh bg-slate-50 relative w-full items-center font-sans pb-32 md:pb-12">
      <div className="w-full">
        <AppBar title="Agenda & Kalender" showBack />

        <div className="px-6 flex items-center justify-center my-4">
          <div className="bg-white p-1.5 rounded-2xl flex gap-1 shadow-sm border border-slate-200/60 w-full max-w-[340px]">
            <button 
              onClick={() => setActiveTab('today')}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all text-center cursor-pointer",
                activeTab === 'today' ? "bg-[#12294D] text-white shadow-sm" : "text-muted hover:text-ink"
              )}
            >
              Hari Ini (16 Jul)
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-all text-center cursor-pointer",
                activeTab === 'calendar' ? "bg-[#12294D] text-white shadow-sm" : "text-muted hover:text-ink"
              )}
            >
              Kalender & Bulanan
            </button>
          </div>
        </div>

        {/* Calendar Grid Card */}
        {activeTab === 'calendar' && (
          <div className="px-5 md:px-8 mb-6">
            <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-amber-600" />
                  <h2 className="text-[16px] font-extrabold text-ink">{currentMonth}</h2>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentMonth("Juni 2026")} className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => setCurrentMonth("Juli 2026")} className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-bold text-slate-400">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                {DATES.map((dt, i) => {
                  const isSelected = !dt.isPrevMonth && dt.day === selectedDate;
                  const hasEventsOnDate = MOCK_EVENTS.some(e => e.date === dt.day);

                  return (
                    <div key={i} className="flex justify-center relative">
                      <button 
                        onClick={() => !dt.isPrevMonth && setSelectedDate(dt.day)}
                        className={cn(
                          "w-9 h-9 rounded-2xl flex flex-col items-center justify-center text-[13px] font-bold transition-all relative cursor-pointer",
                          dt.isPrevMonth ? "text-slate-300 pointer-events-none" : "text-ink hover:bg-slate-100",
                          hasEventsOnDate && !isSelected && "bg-amber-50 text-amber-900 border border-amber-300/80 font-black shadow-xs",
                          isSelected && "bg-[#F26E22] text-white shadow-md shadow-orange/30 font-black scale-105"
                        )}
                      >
                        {dt.day}
                        {hasEventsOnDate && !isSelected && (
                          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full absolute bottom-1" />
                        )}
                        {isSelected && (
                          <span className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-1" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Tanggal Bertanda = Ada Agenda
                </span>
                <span className="font-bold text-ink">Klik tanggal untuk buka detail</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'today' ? (
          <div className="px-5 md:px-8 flex flex-col flex-1 space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#12294D] rounded-[22px] p-4 flex flex-col items-center justify-center text-center shadow-md shadow-navy/10 text-white">
                <span className="text-[28px] font-black leading-none mb-1">{todayEvents.length}</span>
                <span className="text-[10.5px] font-bold text-slate-300 uppercase leading-tight">Total Agenda Hari Ini</span>
              </div>
              <div className="bg-[#F26E22] rounded-[22px] p-4 flex flex-col items-center justify-center text-center shadow-md shadow-orange/10 text-white">
                <span className="text-[28px] font-black leading-none mb-1">1j 45m</span>
                <span className="text-[10.5px] font-bold text-orange-100 uppercase leading-tight">Rata-rata Durasi</span>
              </div>
              <div className="bg-white rounded-[22px] p-4 flex flex-col items-center justify-center text-center shadow-sm border border-slate-200 text-ink">
                <span className="text-[28px] font-black leading-none mb-1 text-emerald-600">100%</span>
                <span className="text-[10.5px] font-bold text-muted uppercase leading-tight">Status Terjadwal</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-extrabold text-ink flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Agenda Hari Ini (Kamis, 16 Juli 2026)
              </h2>
              <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                {todayEvents.length} Kegiatan
              </span>
            </div>

              <div className="space-y-4">
                {todayEvents.map((item) => (
                  <div key={item.id} className={cn("bg-white border rounded-[24px] p-5 shadow-xs transition-all hover:shadow-md space-y-3", item.bg)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-white px-3 py-1 rounded-xl text-[11px] font-mono font-bold text-ink shadow-xs border border-slate-200 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {item.time}
                        </span>
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase",
                          item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                          item.status === 'Mendekati SLA' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        )}>
                          {item.status}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-muted flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200">
                        <User className="w-3 h-3 text-slate-500" /> {item.pic}
                      </span>
                    </div>

                    <div>
                      <h3 className={cn("text-[15px] font-extrabold leading-snug", item.color)}>{item.title}</h3>
                      <p className="text-[12px] font-medium text-slate-600 flex items-center gap-1.5 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        ) : (
          <div className="px-5 md:px-8 flex flex-col flex-1 space-y-6">
            <div className="flex items-center justify-between bg-white p-4.5 rounded-[22px] border border-slate-200/80 shadow-xs">
              <div>
                <span className="text-[11px] font-bold text-muted uppercase">Rincian Agenda Terpilih:</span>
                <h3 className="text-[17px] font-black text-ink">{selectedDate} Juli 2026 ({selectedDateDayName})</h3>
              </div>
              <span className="text-[12px] font-extrabold bg-[#12294D] text-white px-3 py-1.5 rounded-xl">
                {filteredCalendarEvents.length} Agenda
              </span>
            </div>

            {filteredCalendarEvents.length > 0 ? (
              <div className="space-y-3.5">
                <h4 className="text-[13px] font-bold text-muted uppercase tracking-wider">Daftar Kegiatan Tanggal {selectedDate} Juli:</h4>
                {filteredCalendarEvents.map((item) => (
                  <div key={item.id} className={cn("bg-white border rounded-[24px] p-4.5 shadow-xs space-y-3 transition-all hover:shadow-md", item.bg)}>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-ink bg-white px-3 py-0.5 rounded-lg border border-slate-200">
                        ⏱ {item.time}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200">
                        <User className="w-3 h-3 text-slate-500" /> {item.pic}
                      </span>
                    </div>

                    <h4 className={cn("text-[15px] font-extrabold leading-snug", item.color)}>{item.title}</h4>
                    
                    <div className="flex items-center justify-between text-[11.5px] text-slate-600 pt-2 border-t border-slate-200/60">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}
                      </span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[24px] p-8 text-center border border-slate-200 space-y-2">
                <span className="text-[32px]">📅</span>
                <h4 className="text-[15px] font-bold text-ink">Tidak Ada Agenda di Tanggal {selectedDate} Juli</h4>
                <p className="text-[12.5px] font-medium text-muted">Silakan klik tanggal bertanda latar kuning/oranye pada kalender untuk melihat kegiatan di tanggal tersebut.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
