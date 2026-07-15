"use client";

import { X, MoreHorizontal, Calendar as CalendarIcon, Search, Plus, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DATES = [
  { day: 26, isPrevMonth: true, hasEvent: false },
  { day: 27, isPrevMonth: true, hasEvent: true },
  { day: 28, isPrevMonth: true, hasEvent: true },
  { day: 29, isPrevMonth: true, hasEvent: true },
  { day: 30, isPrevMonth: true, hasEvent: false },
  { day: 1, isPrevMonth: false, hasEvent: false },
  { day: 2, isPrevMonth: false, hasEvent: false },
  { day: 3, isPrevMonth: false, hasEvent: false },
  { day: 4, isPrevMonth: false, hasEvent: false },
  { day: 5, isPrevMonth: false, hasEvent: false },
  { day: 6, isPrevMonth: false, hasEvent: false },
  { day: 7, isPrevMonth: false, hasEvent: false },
  { day: 8, isPrevMonth: false, hasEvent: true },
  { day: 9, isPrevMonth: false, hasEvent: false },
  { day: 10, isPrevMonth: false, hasEvent: false },
  { day: 11, isPrevMonth: false, hasEvent: true },
  { day: 12, isPrevMonth: false, hasEvent: false },
  { day: 13, isPrevMonth: false, hasEvent: false },
  { day: 14, isPrevMonth: false, hasEvent: false },
  { day: 15, isPrevMonth: false, hasEvent: true },
  { day: 16, isPrevMonth: false, hasEvent: true },
  { day: 17, isPrevMonth: false, hasEvent: true },
  { day: 18, isPrevMonth: false, hasEvent: false },
  { day: 19, isPrevMonth: false, hasEvent: false },
  { day: 20, isPrevMonth: false, hasEvent: false },
  { day: 21, isPrevMonth: false, hasEvent: false },
  { day: 22, isPrevMonth: false, hasEvent: false },
  { day: 23, isPrevMonth: false, hasEvent: false },
  { day: 24, isPrevMonth: false, hasEvent: false },
  { day: 25, isPrevMonth: false, hasEvent: false },
  { day: 26, isPrevMonth: false, hasEvent: false },
  { day: 27, isPrevMonth: false, hasEvent: false },
  { day: 28, isPrevMonth: false, hasEvent: false },
  { day: 29, isPrevMonth: false, hasEvent: false },
  { day: 30, isPrevMonth: false, hasEvent: false },
];

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState<'today' | 'calendar'>('calendar');
  const [selectedDate, setSelectedDate] = useState<number>(16);

  return (
    <div className="flex flex-col min-h-dvh bg-slate-50 relative w-full items-center font-sans pb-10">
      <div className="w-full max-w-[430px] flex flex-col min-h-dvh">
        
        {/* Header Section */}
        <div className="pt-12 px-6 pb-6 flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-xl z-50">
          <Link href="/home" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform">
            <X className="w-5 h-5 text-muted" />
          </Link>
          <h1 className="text-[20px] font-bold text-ink">Kalender</h1>
          <div className="w-12 h-12" />
        </div>

        {/* Tab Toggle & Search */}
        <div className="px-6 flex items-center justify-center mb-6">
          <div className="bg-white p-1.5 rounded-full flex gap-1 shadow-sm border border-slate-100">
            <button 
              onClick={() => setActiveTab('today')}
              className={cn(
                "px-5 py-2.5 rounded-full text-[14px] font-bold transition-all",
                activeTab === 'today' ? "bg-navy text-white shadow-md" : "text-light hover:text-ink"
              )}
            >
              Hari Ini
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={cn(
                "px-5 py-2.5 rounded-full text-[14px] font-bold transition-all",
                activeTab === 'calendar' ? "bg-navy text-white shadow-md" : "text-light hover:text-ink"
              )}
            >
              Kalender
            </button>
          </div>
        </div>

        {/* Calendar Card */}
        {activeTab === 'calendar' && (
        <div className="px-6 mb-8">
          <div className="bg-white rounded-[32px] p-6 md:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-slate-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[17px] font-bold text-ink">Juli 2026</h2>
              <button className="w-10 h-10 border border-slate-200 rounded-[14px] flex items-center justify-center text-ink hover:bg-slate-50 transition-colors">
                <CalendarIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-y-4 mb-2">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, i) => (
                <div key={i} className="text-center text-[12px] font-bold text-light">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-4 gap-x-1">
              {DATES.map((dt, i) => {
                const isSelected = !dt.isPrevMonth && dt.day === selectedDate;
                return (
                <div key={i} className="flex justify-center relative">
                  <button 
                    onClick={() => !dt.isPrevMonth && setSelectedDate(dt.day)}
                    className={cn(
                      "w-10 h-10 rounded-full flex flex-col items-center justify-center text-[14px] font-bold z-10 transition-transform active:scale-95",
                      dt.isPrevMonth ? "text-slate-300" : "text-ink",
                      dt.hasEvent && !isSelected && "bg-slate-100 text-ink",
                      isSelected && "bg-orange text-white shadow-[0_4px_15px_rgba(242,110,34,0.3)]"
                    )}
                  >
                    {dt.day}
                    {dt.hasEvent && !isSelected && <span className="w-1 h-1 bg-orange rounded-full mt-0.5 absolute bottom-1.5" />}
                    {isSelected && <span className="w-1 h-1 bg-white rounded-full mt-0.5 absolute bottom-1.5" />}
                  </button>
                </div>
              )})}
            </div>
          </div>
        </div>
        )}

        {/* Tab Content */}
        {activeTab === 'today' ? (
          <div className="px-6 flex flex-col flex-1 pb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[17px] font-bold text-ink">Penyelesaian Tugas</h2>
            </div>
            
            {/* Summary Cards */}
            <div className="flex gap-3 mb-10 overflow-x-auto scrollbar-hide">
               <div className="min-w-[110px] bg-navy rounded-[24px] p-5 flex flex-col items-center justify-center shadow-lg shadow-navy/20">
                  <h3 className="text-[32px] font-bold text-white leading-none mb-1">36</h3>
                  <p className="text-[11px] font-medium text-slate-300 text-center leading-tight mt-1">Total<br/>Tugas</p>
               </div>
               <div className="min-w-[110px] bg-orange rounded-[24px] p-5 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(242,110,34,0.2)]">
                  <h3 className="text-[32px] font-bold text-white leading-none mb-1">2j</h3>
                  <p className="text-[11px] font-medium text-orange-100 text-center leading-tight mt-1">Rata-rata<br/>Durasi</p>
               </div>
               <div className="min-w-[110px] bg-white rounded-[24px] p-5 flex flex-col items-center justify-center shadow-sm border border-slate-100">
                  <h3 className="text-[32px] font-bold text-ink leading-none mb-1">72j</h3>
                  <p className="text-[11px] font-medium text-muted text-center leading-tight mt-1">Total<br/>Waktu</p>
               </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[17px] font-bold text-ink">Tugas Hari Ini</h2>
              <button className="text-ink bg-white p-2 rounded-full shadow-sm border border-slate-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Stacked Cards */}
            <div className="relative h-[320px]">
               <div className="absolute top-0 left-0 right-0 bg-white border border-slate-100 rounded-[36px] p-8 pb-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] z-30 transition-transform hover:-translate-y-2">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[32px] font-bold text-ink tracking-tight">Rapat Rutin</h3>
                    <div className="flex flex-col items-end">
                       <span className="text-[10px] font-bold text-light uppercase">Start</span>
                       <span className="text-[16px] font-bold text-muted">09:00 WIB</span>
                    </div>
                 </div>
               </div>

               <div className="absolute top-[85px] left-0 right-0 bg-orange rounded-[36px] p-8 pb-12 shadow-[0_10px_30px_rgba(242,110,34,0.3)] z-20 transition-transform hover:-translate-y-2">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[32px] font-bold text-white tracking-tight">Desain</h3>
                    <div className="flex flex-col items-end">
                       <span className="text-[10px] font-bold text-orange-200 uppercase">Start</span>
                       <span className="text-[16px] font-bold text-white">11:30 WIB</span>
                    </div>
                 </div>
               </div>

               <div className="absolute top-[170px] left-0 right-0 bg-navy rounded-[36px] p-8 pb-12 shadow-[0_10px_30px_rgba(18,41,77,0.3)] z-10 transition-transform hover:-translate-y-2">
                 <div className="flex items-center justify-between">
                    <h3 className="text-[32px] font-bold text-white tracking-tight">Presentasi</h3>
                    <div className="flex flex-col items-end">
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Start</span>
                       <span className="text-[16px] font-bold text-slate-200">14:15 WIB</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        ) : (
        <div className="px-6 flex flex-col flex-1 pb-10">
          {/* Monthly Tasks Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[17px] font-bold text-ink">Agenda Bulanan</h2>
            <button className="text-ink bg-white p-2 rounded-full shadow-sm border border-slate-100">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Agenda Item 1 */}
            <div className="flex gap-4">
              <div className="w-[70px] flex flex-col items-center">
                <h3 className="text-[28px] font-bold text-ink leading-none">16</h3>
                <p className="text-[11px] font-medium text-light text-center mt-1">Juli, Kamis</p>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                
                {/* Task Card Light */}
                <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-4 flex gap-4">
                  <div className="flex flex-col items-center gap-1 border-r border-slate-200 pr-4 w-[65px]">
                    <span className="text-[10px] font-bold text-muted uppercase">09:00</span>
                    <span className="text-[10px] font-bold text-muted uppercase">WIB</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-[14px] font-bold text-ink">Konsinyering GRC</h4>
                    <div className="flex items-center gap-1 mt-1 text-light">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[11px] font-medium">Hotel Tentrem</span>
                    </div>
                  </div>
                </div>

                {/* Task Card Orange */}
                <div className="bg-orange/10 border border-orange/20 rounded-[24px] p-4 flex gap-4 shadow-sm">
                  <div className="flex flex-col items-center gap-1 border-r border-orange/20 pr-4 w-[65px]">
                    <span className="text-[10px] font-bold text-orange-d uppercase">14:30</span>
                    <span className="text-[10px] font-bold text-orange-d uppercase">WIB</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-[14px] font-bold text-orange-d">Rapat Divisi</h4>
                    <div className="flex items-center gap-1 mt-1 text-orange/80">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[11px] font-medium">Ruang Rapat 3</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center self-center shadow-md shadow-orange/20">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            <div className="w-full h-[1px] bg-slate-200" />

            {/* Agenda Item 2 */}
            <div className="flex gap-4">
              <div className="w-[70px] flex flex-col items-center">
                <h3 className="text-[28px] font-bold text-ink leading-none">17</h3>
                <p className="text-[11px] font-medium text-light text-center mt-1">Juli, Jumat</p>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                
                {/* Task Card Outline */}
                <div className="bg-white border-2 border-slate-100 rounded-[24px] p-4 flex gap-4">
                  <div className="flex flex-col items-center gap-1 border-r border-slate-100 pr-4 w-[65px]">
                    <span className="text-[10px] font-bold text-light uppercase">08:00</span>
                    <span className="text-[10px] font-bold text-light uppercase">WIB</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-[14px] font-bold text-ink">Sosialisasi Internal</h4>
                    <div className="flex items-center gap-1 mt-1 text-light">
                      <Clock className="w-3 h-3" />
                      <span className="text-[11px] font-medium">Online (Teams)</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 border border-slate-200 rounded-full flex items-center justify-center text-muted self-center">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
        )}

      </div>
    </div>
  );
}
