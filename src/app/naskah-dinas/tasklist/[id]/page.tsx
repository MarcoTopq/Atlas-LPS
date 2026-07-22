"use client";

import AppBar from "@/components/AppBar";
import SwipeToApprove from "@/components/SwipeToApprove";
import { Lock, FileText, CheckCircle2, Sparkles, User, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NaskahDinasTasklistDetailPage() {
  const [showToast, setShowToast] = useState(false);

  const handleApprove = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-36 relative">
      <AppBar title="Detail Nota Dinas" showBack />
      
      <div className="px-5 mt-4 space-y-5">
        {/* Header Title & Meta */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-orange/10 text-orange text-[11px] font-bold rounded-full">
              e-Correspondence / Nota Dinas
            </span>
            <span className="text-[11px] font-bold text-danger flex items-center gap-1">
              <AlertCircle size={13} /> SLA 2 jam lagi
            </span>
          </div>
          <h1 className="text-[17px] font-bold text-ink mb-2">ND-1610/STI/2026 - Nota Dinas Perjalanan Dinas Proyek X Surabaya</h1>
          <div className="flex items-center gap-2 text-[12px] text-muted">
            <User size={14} />
            <span>Pemohon: <strong>Budi Santoso (Kadiv GRC)</strong></span>
          </div>
        </div>

        {/* AI Decision Brief */}
        <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#4C46D9]" />
            <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2 py-0.5 rounded-full shadow-sm">
              🔒 AI On-Prem LPS Verification
            </span>
          </div>
          
          <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief AI Atlas</h3>
          <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
            AI Atlas menterjemahkan: Nota dinas ini mengajukan penugasan 3 anggota tim ke Surabaya selama 3 hari. Nominal anggaran yang diajukan sesuai dengan batas perdiun standar LPS.
          </p>
          
          <div className="bg-white rounded-[16px] p-4 mb-4 shadow-sm border border-[#4C46D9]/10">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Tujuan & Durasi</span>
                <span className="font-bold text-ink text-[13px]">Surabaya (3 Hari)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Pola Pengajuan</span>
                <span className="font-bold text-emerald-600 text-[13px]">Normal / Biasa ✓</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-4 flex gap-3">
            <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-blue-800 mb-1">Sumber Terverifikasi</p>
              <p className="text-[12px] text-blue-900/80 leading-relaxed">
                Peraturan Kepegawaian LPS Bab VI Pasal 32 (1): "Perjalanan dinas luar kota wajib diajukan maksimal H-2 sebelum keberangkatan."
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-[13px] font-bold p-3 rounded-xl border bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20">
            <CheckCircle2 size={18}/>
            Dokumen Lolos Verifikasi & Tidak Ada Anomali
          </div>
        </div>

        {/* Lampiran */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-3">
          <h3 className="text-[14px] font-bold text-ink">Lampiran Dokumen</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-line rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[12px] font-semibold text-ink truncate">RAB_Perdin.pdf</p>
                <p className="text-[10px] text-muted">245 KB</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-line rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[12px] font-semibold text-ink truncate">Undangan_Rapat.pdf</p>
                <p className="text-[10px] text-muted">180 KB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit & Ask AI Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-white border border-orange text-orange font-bold text-[13px] py-3 rounded-2xl">
            Edit Redaksi
          </button>
          <Link href="/ai" className="flex-1 bg-[#ECEBFB] border border-[#4C46D9]/30 text-[#4C46D9] font-bold text-[13px] py-3 rounded-2xl flex items-center justify-center gap-1.5">
            <Sparkles size={16} />
            Tanya AI
          </Link>
        </div>
      </div>

      {/* Swipe Approval Bottom Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-line p-4 shadow-[0_-4px_14px_rgba(0,0,0,0.05)] z-50">
        <SwipeToApprove onApprove={handleApprove} />
        <button className="w-full mt-2 text-[12px] font-bold text-danger py-1">
          Kembalikan untuk revisi
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-4 right-4 bg-navy text-white p-4 rounded-2xl shadow-xl flex gap-3 animate-in fade-in slide-in-from-top-4 z-50">
          <CheckCircle2 className="text-ok shrink-0" />
          <div>
            <h4 className="text-[14px] font-bold">Nota Dinas Disetujui</h4>
            <p className="text-[11px] text-white/70">Tercatat di Core System e-Correspondence · Audit trail tersimpan.</p>
          </div>
        </div>
      )}
    </div>
  );
}
