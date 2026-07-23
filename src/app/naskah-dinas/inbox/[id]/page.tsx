"use client";

import AppBar from "@/components/AppBar";
import { Lock, FileText, CheckCircle2, Sparkles, ShieldAlert, Paperclip, ExternalLink, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NaskahDinasInboxDetailPage() {
  const [activeTab, setActiveTab] = useState("Detail");
  const tabs = ["Detail", "Lampiran", "Posisi Surat"];

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24">
      <AppBar title="Detail Surat Masuk" showBack />
      
      <div className="px-5 mt-4 space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-[18px] md:text-[22px] font-bold text-ink tracking-tight mb-2">ND-402/DSDA/2026 - Permohonan Pendampingan Audit Sistem Informasi</h1>
          <div className="inline-block px-3 py-1 bg-[#0055FF] text-white text-[11px] font-bold rounded-full mb-3">
            Persetujuan Nota Dinas
          </div>
        </div>

        {/* AI Decision Brief */}
        <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#4C46D9]" />
            <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2 py-0.5 rounded-full shadow-sm">
              🔒 AI On-Prem LPS Summary
            </span>
          </div>
          
          <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief AI Atlas</h3>
          <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
            Permohonan pendampingan audit TI tahunan selama 5 hari kerja. Memerlukan penunjukan 2 personel teknis STI sebagai pendamping auditor internal.
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-3.5 flex gap-3">
            <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-blue-800 mb-0.5">Sumber Terverifikasi</p>
              <p className="text-[12px] text-blue-900/80 leading-relaxed">
                Pedoman Audit Internal LPS No. 02/2023 Bab IV: &quot;Divisi TI wajib memfasilitasi pendampingan data log dan arsitektur teknis.&quot;
              </p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-2 text-[12px] font-bold p-2.5 rounded-xl border bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20">
            <CheckCircle2 size={16}/>
            Dokumen Resmi Terotentikasi TTD Digital e-Correspondence
          </div>
        </div>

        {/* Top Summary Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Pengajuan</span>
            <span className="text-[13px] font-bold text-ink">21 Juli 2026</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Tindak Lanjut</span>
            <span className="text-[13px] font-bold text-ink">Diproses</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors",
                activeTab === tab 
                  ? "bg-orange text-white shadow-sm" 
                  : "bg-transparent text-muted hover:bg-slate-100 hover:text-ink"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Detail */}
        {activeTab === "Detail" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Detail Persetujuan</h2>

            <div className="space-y-3.5 text-[13px]">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex flex-col">
                  <span className="text-[11px] text-muted mb-0.5">Nomor Dokumen</span>
                  <span className="font-bold text-ink">ND-402/DSDA/2026</span>
                </div>
                <button className="text-[12px] font-bold text-orange hover:underline flex items-center gap-1">
                  Lihat Dokumen
                </button>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Tipe Surat</span>
                <span className="font-semibold text-rose-600 flex items-center gap-1">
                  <ShieldAlert size={14} /> Surat Rahasia
                </span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Jenis Surat</span>
                <span className="font-semibold text-ink">Nota Dinas Persetujuan</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Tanggal</span>
                <span className="font-semibold text-ink">21 Juli 2026</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Perihal</span>
                <span className="font-semibold text-ink">Permohonan Pendampingan Audit Sistem Informasi</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Pengirim</span>
                <span className="font-semibold text-ink">Divisi Audit Internal</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Lampiran */}
        {activeTab === "Lampiran" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Lampiran Persetujuan</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-line">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange/10 text-orange rounded-xl flex items-center justify-center">
                    <Paperclip size={18} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-ink">Audit_Scope_Q3_2026.pdf</p>
                    <p className="text-[11px] text-muted">450 KB</p>
                  </div>
                </div>
                <button className="p-2 text-muted hover:text-orange transition-colors">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Posisi Surat */}
        {activeTab === "Posisi Surat" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Posisi Surat</h2>

            <div>
              <h3 className="text-[13px] font-bold text-ink mb-3">Reviewer</h3>
              <div className="space-y-4 pl-2 border-l-2 border-slate-100 ml-2">
                <div className="relative pl-5">
                  <div className="absolute -left-[17px] top-0.5 w-5 h-5 rounded-full bg-[#1E9E6A] text-white flex items-center justify-center border-2 border-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-[11px] text-muted">ND-402/DSDA/2026</p>
                  <p className="text-[13px] font-bold text-ink">Budi Santoso (Kadiv Audit)</p>
                  <p className="text-[12px] text-muted italic mt-0.5">Approve - Mohon ditindaklanjuti</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Link href="/ai" className="w-full bg-[#ECEBFB] hover:bg-[#E0DEFA] border border-[#4C46D9]/30 text-[#4C46D9] font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm">
          <Sparkles size={18} />
          Ringkas & Tanya AI Atlas Mengenai Surat Masuk Ini
        </Link>
      </div>
    </div>
  );
}
