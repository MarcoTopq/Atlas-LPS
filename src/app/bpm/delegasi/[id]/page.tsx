"use client";

import AppBar from "@/components/AppBar";
import { Lock, FileText, CheckCircle2, Sparkles, User, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function BpmDelegasiDetailPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24">
      <AppBar title="Detail Delegasi" showBack />
      
      <div className="px-5 mt-4 space-y-5">
        {/* Header */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50">
          <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-full mb-3">
            Status: Aktif
          </div>
          <h1 className="text-[17px] font-bold text-ink mb-2">Delegasi Wewenang Approval BPM e-Procurement</h1>
          <p className="text-[12px] text-muted leading-relaxed">
            Peralihan hak akses approval persetujuan sementara selama penugasan rapat luar kota.
          </p>
        </div>

        {/* AI Decision Brief */}
        <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#4C46D9]" />
            <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2 py-0.5 rounded-full shadow-sm">
              AI On-Prem LPS
            </span>
          </div>
          
          <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief AI Atlas</h3>
          <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
            Delegasi ini telah diverifikasi sesuai dengan Matriks Kewenangan LPS No. 12/2024. Penerima wewenang memiliki level jabatan yang sesuai untuk menggantikan sementara.
          </p>
          
          <div className="bg-white rounded-[16px] p-4 mb-4 shadow-sm border border-[#4C46D9]/10">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Masa Berlaku</span>
                <span className="font-bold text-ink text-[13px]">15 Hari Kerja</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Matriks Wewenang</span>
                <span className="font-bold text-ink text-[13px]">Sesuai SOP ✓</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-4 flex gap-3">
            <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-blue-800 mb-1">Dasar Peraturan</p>
              <p className="text-[12px] text-blue-900/80 leading-relaxed">
                Peraturan Tata Kelola LPS Bab III Pasal 9: &quot;Delegasi wewenang maksimal 30 hari kalender dengan persetujuan atasan langsung.&quot;
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-[13px] font-bold p-3 rounded-xl border bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20">
            <CheckCircle2 size={18}/>
            Delegasi Valid & Terverifikasi Audit Trail
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4">
          <h2 className="text-[15px] font-bold text-ink mb-2">Informasi Delegasi</h2>
          <div className="flex items-center gap-3">
            <User size={18} className="text-muted" />
            <div>
              <span className="text-[11px] text-muted block">Pemberi Wewenang</span>
              <span className="text-[13px] font-semibold text-ink">Budi Santoso (Kadiv GRC)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-emerald-600" />
            <div>
              <span className="text-[11px] text-muted block">Penerima Wewenang</span>
              <span className="text-[13px] font-semibold text-ink">Andi Susanto (Kepala Subdivisi)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-muted" />
            <div>
              <span className="text-[11px] text-muted block">Periode Delegasi</span>
              <span className="text-[13px] font-semibold text-ink">01 Juli 2026 - 15 Juli 2026</span>
            </div>
          </div>
        </div>

        {/* Action button to AI */}
        <Link href="/ai" className="w-full bg-[#ECEBFB] hover:bg-[#E0DEFA] border border-[#4C46D9]/30 text-[#4C46D9] font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all">
          <Sparkles size={18} />
          Tanya AI Atlas Tentang Delegasi Ini
        </Link>
      </div>
    </div>
  );
}
