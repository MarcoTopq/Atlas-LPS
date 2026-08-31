"use client";

import AppBar from "@/components/AppBar";
import { MOCK_NASKAH_OUTBOX_DETAIL } from "@/lib/mock/bpm";
import { Lock, FileText, CheckCircle2, Sparkles, ExternalLink, Paperclip, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NaskahDinasOutboxDetailPage() {
  const data = MOCK_NASKAH_OUTBOX_DETAIL;
  const [activeTab, setActiveTab] = useState("Detail");

  const tabs = ["Detail", "Lampiran", "Posisi Surat"];

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-24">
      <AppBar title="Detail Outbox" showBack />
      
      <div className="px-5 mt-4 space-y-5">
        {/* Header Title & Badge */}
        <div>
          <h1 className="text-[18px] md:text-[22px] font-bold text-ink tracking-tight mb-2">{data.title}</h1>
          <div className="inline-block px-3 py-1 bg-[#0055FF] text-white text-[11px] font-bold rounded-full mb-3">
            {data.jenisBadge}
          </div>
        </div>

        {/* AI Decision Brief Card (ATLAS AI Feature) */}
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
            {data.brief.ringkasan}
          </p>

          <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-xl p-3 flex gap-3">
            <FileText size={16} className="text-[#F56621] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-[#172033] mb-0.5">Dasar Aturan & Sumber Terverifikasi</p>
              <p className="text-[11.5px] text-[#475467] leading-relaxed">{data.brief.sitasi}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[11.5px] font-semibold p-2.5 rounded-xl border bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]">
            <CheckCircle2 size={15} className="text-[#12B76A]" />
            <span>Tervalidasi Sistem Otentikasi e-Correspondence LPS</span>
          </div>
        </div>

        {/* Top Summary Card (Pengajuan & Tindak Lanjut) */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Pengajuan</span>
            <span className="text-[13px] font-bold text-ink">{data.metadata.pengajuan}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Tindak Lanjut</span>
            <span className="text-[13px] font-bold text-ink">{data.metadata.tindakLanjut}</span>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
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

        {/* Tab 1: Detail Persetujuan */}
        {activeTab === "Detail" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Detail Persetujuan</h2>

            <div className="space-y-3.5 text-[13px]">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex flex-col">
                  <span className="text-[11px] text-muted mb-0.5">Nomor Dokumen</span>
                  <span className="font-bold text-ink">{data.detail.nomorDokumen}</span>
                </div>
                <button className="text-[12px] font-bold text-orange hover:underline flex items-center gap-1">
                  Lihat Dokumen
                </button>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Tipe Surat</span>
                <span className="font-semibold text-ink">{data.detail.tipeSurat}</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Jenis Surat</span>
                <span className="font-semibold text-ink">{data.detail.jenisSurat}</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Tanggal</span>
                <span className="font-semibold text-ink">{data.detail.tanggal}</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Perihal</span>
                <span className="font-semibold text-ink">{data.detail.perihal}</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Deskripsi</span>
                <span className="font-semibold text-ink">{data.detail.deskripsi}</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Cross Reference</span>
                <span className="font-semibold text-ink">{data.detail.crossReference}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Dikirim Oleh</span>
                <span className="font-semibold text-ink">{data.detail.dikirimOleh}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Lampiran */}
        {activeTab === "Lampiran" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Lampiran Persetujuan</h2>
            
            <div className="space-y-3">
              {data.lampiran.map((lamp, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-line">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange/10 text-orange rounded-xl flex items-center justify-center">
                      <Paperclip size={18} />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-ink">{lamp.nama}</p>
                      <p className="text-[11px] text-muted">{lamp.ukuran}</p>
                    </div>
                  </div>
                  <button className="p-2 text-muted hover:text-orange transition-colors">
                    <ExternalLink size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Posisi Surat */}
        {activeTab === "Posisi Surat" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Posisi Surat</h2>

            {/* Reviewer Section */}
            <div>
              <h3 className="text-[13px] font-bold text-ink mb-3">Reviewer</h3>
              <div className="space-y-4 pl-2 border-l-2 border-slate-100 ml-2">
                {data.posisiSurat.reviewer.map((item, idx) => (
                  <div key={idx} className="relative pl-5">
                    <div className="absolute -left-[17px] top-0.5 w-5 h-5 rounded-full bg-[#1E9E6A] text-white flex items-center justify-center border-2 border-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <p className="text-[11px] text-muted">{item.docNo}</p>
                    <p className="text-[13px] font-bold text-ink">{item.name}</p>
                    <p className="text-[12px] text-muted italic mt-0.5">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Penyetuju Section */}
            <div>
              <h3 className="text-[13px] font-bold text-ink mb-3">Penyetuju</h3>
              <div className="space-y-4 pl-2 border-l-2 border-slate-100 ml-2">
                {data.posisiSurat.penyetuju.map((item, idx) => (
                  <div key={idx} className="relative pl-5">
                    <div className="absolute -left-[17px] top-0.5 w-5 h-5 rounded-full bg-[#1E9E6A] text-white flex items-center justify-center border-2 border-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <p className="text-[11px] text-muted">{item.docNo}</p>
                    <p className="text-[13px] font-bold text-ink">{item.name}</p>
                    <p className="text-[12px] text-muted italic mt-0.5">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pejabat Penanda Tangan Section */}
            <div>
              <h3 className="text-[13px] font-bold text-ink mb-3">Pejabat Penanda Tangan</h3>
              <div className="space-y-4 pl-2 border-l-2 border-slate-100 ml-2">
                {data.posisiSurat.penandaTangan.map((item, idx) => (
                  <div key={idx} className="relative pl-5">
                    <div className="absolute -left-[17px] top-0.5 w-5 h-5 rounded-full bg-[#1E9E6A] text-white flex items-center justify-center border-2 border-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <p className="text-[11px] text-muted">{item.docNo}</p>
                    <p className="text-[13px] font-bold text-ink">{item.name}</p>
                    <p className="text-[12px] text-muted italic mt-0.5">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Button to AI */}
        <Link href="/ai" className="w-full bg-[#FFF4ED] hover:bg-[#FFE6D5] border border-[#F56621]/30 text-[#F56621] font-bold text-xs sm:text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xs">
          <Sparkles size={16} />
          Tanya Asisten AI ATLAS Tentang Naskah Dinas Ini
        </Link>
      </div>
    </div>
  );
}
