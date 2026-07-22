"use client";

import AppBar from "@/components/AppBar";
import { Lock, FileText, CheckCircle2, Sparkles, Send, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function NaskahDinasInboxDetailPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24">
      <AppBar title="Detail Surat Masuk" showBack />
      
      <div className="px-5 mt-4 space-y-5">
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-rose-100 text-rose-800 text-[11px] font-bold rounded-full flex items-center gap-1">
              <ShieldAlert size={12} /> Sangat Rahasia
            </span>
            <span className="text-[11px] font-semibold text-muted">21 Juli 2026</span>
          </div>
          <h1 className="text-[17px] font-bold text-ink mb-2">ND-402/DSDA/2026 - Permohonan Pendampingan Audit Sistem Informasi</h1>
          <p className="text-[12px] text-muted leading-relaxed">
            Pengirim: <strong>Divisi Audit Internal</strong>
          </p>
        </div>

        {/* AI Decision Brief */}
        <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#4C46D9]" />
            <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2 py-0.5 rounded-full shadow-sm">
              AI On-Prem LPS Summary
            </span>
          </div>
          
          <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief AI Atlas</h3>
          <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
            AI Atlas meringkas: Permohonan pendampingan audit TI tahunan selama 5 hari kerja. Memerlukan penunjukan 2 personel teknis STI sebagai pendamping auditor internal.
          </p>
          
          <div className="bg-white rounded-[16px] p-4 mb-4 shadow-sm border border-[#4C46D9]/10">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Klasifikasi Rahasia</span>
                <span className="font-bold text-rose-600 text-[13px]">Sangat Rahasia 🔒</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Target Penyelesaian</span>
                <span className="font-bold text-ink text-[13px]">28 Juli 2026</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-4 flex gap-3">
            <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-blue-800 mb-1">Sumber Terverifikasi</p>
              <p className="text-[12px] text-blue-900/80 leading-relaxed">
                Pedoman Audit Internal LPS No. 02/2023 Bab IV: "Divisi TI wajib memfasilitasi pendampingan data log dan arsitektur teknis."
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-[13px] font-bold p-3 rounded-xl border bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20">
            <CheckCircle2 size={18}/>
            Dokumen Resmi Terotentikasi TTD Digital e-Correspondence
          </div>
        </div>

        {/* Action button to AI */}
        <Link href="/ai" className="w-full bg-[#ECEBFB] hover:bg-[#E0DEFA] border border-[#4C46D9]/30 text-[#4C46D9] font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all">
          <Sparkles size={18} />
          Ringkas & Tanya AI Atlas Mengenai Nota Dinas Ini
        </Link>
      </div>
    </div>
  );
}
