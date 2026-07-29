"use client";

import { ChevronLeft, Search, Phone, MessageSquare, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DirektoriPage() {
  const [search, setSearch] = useState("");
  
  // Mock data for direktori with visibility scope
  const employees = [
    { name: "Budi Santoso", role: "Staf IT", noHp: "081234567890", visible: true },
    { name: "Siti Aminah", role: "Kepala Divisi SDM", noHp: "089876543210", visible: false },
    { name: "Andi Saputra", role: "Staf Keuangan", noHp: "085612345678", visible: true },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-bg pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-2 px-4 py-4 text-white shadow-md flex items-center gap-3 sticky top-0 z-40">
        <Link href="/home" className="p-1 -ml-1 rounded-full bg-white/10 active:bg-white/20">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-sm font-bold leading-tight">Direktori Pegawai</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-light" />
          </div>
          <input 
            type="text" 
            placeholder="Cari nama atau unit kerja..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-line rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/50 transition-all shadow-sm"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {employees.map((emp, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-line flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">{emp.name}</h3>
                  <p className="text-[10px] text-muted">{emp.role}</p>
                </div>
              </div>
              
              <div className="flex gap-2 border-t border-line pt-3">
                {emp.visible ? (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 text-green-700 border border-green-200 py-2 rounded-xl text-[10px] font-bold">
                      <Phone size={14} /> Telepon
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded-xl text-[10px] font-bold">
                      <MessageSquare size={14} /> Pesan
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 py-2 text-[10px] text-muted italic flex items-center">
                      Nomor disembunyikan
                    </div>
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-navy text-navy py-2 rounded-xl text-[10px] font-bold">
                      <MessageSquare size={14} /> Chat In-App
                    </button>
                  </>
                )}
                <button className="w-10 flex items-center justify-center bg-white border border-line text-ink rounded-xl">
                  <Mail size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
