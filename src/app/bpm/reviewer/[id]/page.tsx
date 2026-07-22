"use client";

import AppBar from "@/components/AppBar";
import { Lock, FileText, CheckCircle2, Sparkles, Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BpmReviewerDetailPage() {
  const [reviewed, setReviewed] = useState(false);

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24">
      <AppBar title="Detail Reviewer" showBack />
      
      <div className="px-5 mt-4 space-y-5">
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full">
              Status: Menunggu Review
            </span>
            <span className="text-[11px] font-bold text-orange">⏱ SLA: 4 Jam lagi</span>
          </div>
          <h1 className="text-[17px] font-bold text-ink mb-2">Reviewer Pengadaan Lisensi Software IT 2026</h1>
          <p className="text-[12px] text-muted leading-relaxed">
            Telaah aspek Hukum, Kepatuhan, dan Kelayakan Biaya Pengadaan Lisensi Software Perusahaan.
          </p>
        </div>

        {/* AI Decision Brief */}
        <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#4C46D9]" />
            <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2 py-0.5 rounded-full shadow-sm">
              AI On-Prem LPS Analysis
            </span>
          </div>
          
          <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief AI Atlas</h3>
          <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
            AI Atlas telah menelaah draft Kontrak & Term of Service software. Tidak ditemukan pasal yang berpotensi melanggar ketentuan privasi data atau perimeter keamanan LPS.
          </p>
          
          <div className="bg-white rounded-[16px] p-4 mb-4 shadow-sm border border-[#4C46D9]/10">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Skor Risikon</span>
                <span className="font-bold text-emerald-600 text-[13px]">Rendah (Low Risk) ✓</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Ketersediaan Pagu</span>
                <span className="font-bold text-ink text-[13px]">Rp 450 Jt (Cukup)</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-4 flex gap-3">
            <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-blue-800 mb-1">Kutipan Aturan Terkait</p>
              <p className="text-[12px] text-blue-900/80 leading-relaxed">
                SE Logistik No. 04/2025 Lampiran B: "Pengadaan perangkat lunak cloud/SaaS wajib melewati pemeriksaan kompatibilitas keamanan TI."
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-[13px] font-bold p-3 rounded-xl border bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20">
            <CheckCircle2 size={18}/>
            Lolos Verifikasi Otomatis AI Atlas
          </div>
        </div>

        {/* Form Catatan Reviewer */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-3">
          <h2 className="text-[15px] font-bold text-ink">Catatan Reviewer</h2>
          <textarea 
            placeholder="Tuliskan masukan atau telaah reviewer di sini..." 
            className="w-full bg-slate-50 border border-line rounded-[16px] p-3 text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-orange/20 h-24"
          />
          {reviewed && (
            <p className="text-emerald-600 text-[12px] font-bold">Reviewer Telah Berhasil Menyelesaikan Tugas!</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => setReviewed(true)}
            className="flex-1 bg-[#1E9E6A] hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Check size={18} />
            Kirim Review
          </button>
          <Link href="/ai" className="bg-[#ECEBFB] hover:bg-[#E0DEFA] border border-[#4C46D9]/30 text-[#4C46D9] font-bold px-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all">
            <Sparkles size={18} />
            Tanya AI
          </Link>
        </div>
      </div>
    </div>
  );
}
