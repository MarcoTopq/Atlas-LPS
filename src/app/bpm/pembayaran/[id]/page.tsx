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
            Invoice & Faktur Pajak telah dicocokkan otomatis oleh AI ATLAS dengan dokumen BAST dan SPK. Seluruh data rekening vendor terverifikasi cocok dengan Master Vendor SAP.
          </p>
          
          <div className="bg-[#F9FAFB] rounded-[16px] p-3.5 border border-[#EAECF0]">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-[#667085] text-[11px] mb-0.5">Verifikasi Rekening</span>
                <span className="font-bold text-emerald-600 text-[13px]">Valid & Cocok ✓</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#667085] text-[11px] mb-0.5">Faktur Pajak</span>
                <span className="font-bold text-[#172033] text-[13px]">Valid (e-Faktur)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-xl p-3 flex gap-3">
            <FileText size={16} className="text-[#F56621] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-[#172033] mb-0.5">Dasar Peraturan Keuangan</p>
              <p className="text-[11.5px] text-[#475467] leading-relaxed">
                PDK LPS No. 08/2024: &quot;Pembayaran termin fisik wajib disertai BAST dan Berita Acara Pembayaran dari Pejabat Pembuat Komitmen.&quot;
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[11.5px] font-semibold p-2.5 rounded-xl border bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]">
            <CheckCircle2 size={15} className="text-[#12B76A]" />
            <span>Dokumen Keuangan Lengkap & Aman Ditransfer</span>
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

        <Link href="/ai" className="w-full bg-[#FFF4ED] hover:bg-[#FFE6D5] border border-[#F56621]/30 text-[#F56621] font-bold text-xs sm:text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xs">
          <Sparkles size={16} />
          Tanya Asisten AI ATLAS Tentang Pembayaran Ini
        </Link>
      </div>
    </div>
  );
}
