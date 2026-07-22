"use client";

import AppBar from "@/components/AppBar";
import { Lock, FileText, CheckCircle2, Sparkles, CreditCard, Building2 } from "lucide-react";
import Link from "next/link";

export default function BpmPembayaranDetailPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24">
      <AppBar title="Detail Pembayaran" showBack />
      
      <div className="px-5 mt-4 space-y-5">
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[11px] font-bold rounded-full">
              Proses Transfer SAP Core
            </span>
            <span className="text-[16px] font-bold text-emerald-600">Rp 145.000.000</span>
          </div>
          <h1 className="text-[17px] font-bold text-ink mb-2">Pembayaran Vendor Pengadaan Server DRC</h1>
          <p className="text-[12px] text-muted leading-relaxed">
            Pencairan dana tagihan termin ke-2 untuk unit server infrastruktur DRC LPS.
          </p>
        </div>

        {/* AI Decision Brief */}
        <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#4C46D9]" />
            <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2 py-0.5 rounded-full shadow-sm">
              AI On-Prem LPS Verification
            </span>
          </div>
          
          <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief AI Atlas</h3>
          <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
            Invoice & Faktur Pajak telah dicocokkan otomatis oleh AI Atlas dengan dokumen BAST dan SPK. Seluruh data rekening vendor terverifikasi cocok dengan Master Vendor SAP.
          </p>
          
          <div className="bg-white rounded-[16px] p-4 mb-4 shadow-sm border border-[#4C46D9]/10">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Verifikasi Rekening</span>
                <span className="font-bold text-emerald-600 text-[13px]">Valid & Cocok ✓</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted text-[11px] mb-1">Faktur Pajak</span>
                <span className="font-bold text-ink text-[13px]">Valid (e-Faktur)</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-4 flex gap-3">
            <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-blue-800 mb-1">Dasar Peraturan Keuangan</p>
              <p className="text-[12px] text-blue-900/80 leading-relaxed">
                PDK LPS No. 08/2024: "Pembayaran termin fisik wajib disertai BAST dan Berita Acara Pembayaran dari Pejabat Pembuat Komitmen."
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-[13px] font-bold p-3 rounded-xl border bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20">
            <CheckCircle2 size={18}/>
            Dokumen Keuangan Lengkap & Aman Ditransfer
          </div>
        </div>

        {/* Informational Cards */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4">
          <h2 className="text-[15px] font-bold text-ink mb-2">Informasi Transfer SAP</h2>
          <div className="flex items-center gap-3">
            <Building2 size={18} className="text-muted" />
            <div>
              <span className="text-[11px] text-muted block">Nama Vendor / Penerima</span>
              <span className="text-[13px] font-semibold text-ink">PT Sistem Data Nusantara</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard size={18} className="text-muted" />
            <div>
              <span className="text-[11px] text-muted block">Bank & Rekening Target</span>
              <span className="text-[13px] font-semibold text-ink">Bank Mandiri (122-000-888-7711)</span>
            </div>
          </div>
        </div>

        <Link href="/ai" className="w-full bg-[#ECEBFB] hover:bg-[#E0DEFA] border border-[#4C46D9]/30 text-[#4C46D9] font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all">
          <Sparkles size={18} />
          Tanya AI Atlas Tentang Pembayaran Ini
        </Link>
      </div>
    </div>
  );
}
