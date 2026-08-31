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
        <div className="bg-white rounded-[22px] p-5 shadow-2xs border border-[#EAECF0] space-y-3.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#172033] bg-[#F4F6F9] px-2.5 py-0.5 rounded-full border border-[#EAECF0] flex items-center gap-1.5">
              <Lock size={12} className="text-[#F56621]" />
              <span>AI On-Prem LPS</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#F56621]">
              <Sparkles size={13} />
              <span>ATLAS AI</span>
            </div>
          </div>
          
          <h3 className="text-[14px] font-bold text-[#172033] mb-1">Decision Brief</h3>
          <p className="text-[12.5px] text-[#475467] leading-relaxed">
            AI ATLAS telah menelaah draft Kontrak & Term of Service software. Tidak ditemukan pasal yang berpotensi melanggar ketentuan privasi data atau perimeter keamanan LPS.
          </p>
          
          <div className="bg-[#F9FAFB] rounded-[16px] p-3.5 border border-[#EAECF0]">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-[#667085] text-[11px] mb-0.5">Skor Risiko</span>
                <span className="font-bold text-emerald-600 text-[13px]">Rendah (Low Risk) ✓</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#667085] text-[11px] mb-0.5">Ketersediaan Pagu</span>
                <span className="font-bold text-[#172033] text-[13px]">Rp 450 Jt (Cukup)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-xl p-3 flex gap-3">
            <FileText size={16} className="text-[#F56621] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-[#172033] mb-0.5">Kutipan Aturan Terkait</p>
              <p className="text-[11.5px] text-[#475467] leading-relaxed">
                SE Logistik No. 04/2025 Lampiran B: &quot;Pengadaan perangkat lunak cloud/SaaS wajib melewati pemeriksaan kompatibilitas keamanan TI.&quot;
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[11.5px] font-semibold p-2.5 rounded-xl border bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]">
            <CheckCircle2 size={15} className="text-[#12B76A]" />
            <span>Lolos Verifikasi Otomatis AI ATLAS</span>
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
            className="flex-1 bg-[#1E9E6A] hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-xs sm:text-sm"
          >
            <Check size={18} />
            Kirim Review
          </button>
          <Link href="/ai" className="bg-[#FFF4ED] hover:bg-[#FFE6D5] border border-[#F56621]/30 text-[#F56621] font-bold px-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xs text-xs sm:text-sm">
            <Sparkles size={16} />
            Tanya AI ATLAS
          </Link>
        </div>
      </div>
    </div>
  );
}
