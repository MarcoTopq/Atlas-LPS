"use client";

import AppBar from "@/components/AppBar";
import { MOCK_NASKAH_TASKLIST_DETAIL } from "@/lib/mock/bpm";
import { Lock, FileText, CheckCircle2, Sparkles, ExternalLink, Paperclip, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NaskahDinasTasklistDetailPage() {
  const data = MOCK_NASKAH_TASKLIST_DETAIL;
  const [activeTab, setActiveTab] = useState("Detail");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const tabs = ["Detail", "Lampiran", "Riwayat Pengajuan"];

  const handleApprove = () => {
    setToastMessage("Nota Dinas Berhasil Disetujui! Tercatat di Core System e-Correspondence.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleReject = () => {
    setToastMessage("Nota Dinas Dikembalikan untuk Revisi.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-28 relative">
      <AppBar title="Detail Persetujuan" showBack />
      
      <div className="px-5 mt-4 space-y-5">
        {/* Header Title & Badges */}
        <div>
          <h1 className="text-[18px] md:text-[22px] font-bold text-ink tracking-tight mb-2.5">{data.title}</h1>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[#0055FF] text-white text-[11px] font-bold rounded-full">
              {data.jenisBadge}
            </span>
            <span className="px-3 py-1 bg-[#FFD000] text-[#554000] text-[11px] font-bold rounded-full">
              {data.statusBadge}
            </span>
          </div>
        </div>

        {/* AI Decision Brief Card (Atlas AI Feature) */}
        <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#4C46D9]" />
            <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2 py-0.5 rounded-full shadow-sm">
              🔒 AI On-Prem LPS Verification
            </span>
          </div>
          
          <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief AI Atlas</h3>
          <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
            {data.brief.ringkasan}
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-3.5 flex gap-3">
            <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-blue-800 mb-0.5">Sumber Terverifikasi</p>
              <p className="text-[12px] text-blue-900/80 leading-relaxed">{data.brief.sitasi}</p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-2 text-[12px] font-bold p-2.5 rounded-xl border bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20">
            <CheckCircle2 size={16}/>
            Tervalidasi Otentikasi e-Correspondence LPS
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
                <span className="text-[11px] text-muted mb-0.5">Reviewer</span>
                <span className="font-semibold text-ink">{data.detail.reviewer}</span>
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

        {/* Tab 3: Riwayat Pengajuan */}
        {activeTab === "Riwayat Pengajuan" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Riwayat Persetujuan</h2>

            <div className="relative pl-6 border-l-2 border-slate-100 ml-2 space-y-6">
              {data.riwayatPengajuan.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Status Circle Indicator */}
                  <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-[#1E9E6A] text-white flex items-center justify-center border-4 border-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-[11px] text-muted">{item.action} • {item.date}</p>
                  <p className="text-[13.5px] font-bold text-ink">{item.statusTitle}</p>
                  {item.note && (
                    <p className="text-[12px] text-muted italic mt-0.5">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button to AI */}
        <Link href="/ai" className="w-full bg-[#ECEBFB] hover:bg-[#E0DEFA] border border-[#4C46D9]/30 text-[#4C46D9] font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm">
          <Sparkles size={18} />
          Tanya AI Atlas Tentang Persetujuan Ini
        </Link>
      </div>

      {/* Floating Action Bar (Tolak & Setuju like reference image 2/3/4) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-100 p-4 pb-6 md:pb-4 flex gap-3 z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <button 
          onClick={handleReject}
          className="flex-1 bg-danger hover:bg-danger-d text-white font-bold py-3.5 rounded-full transition-all active:scale-95 text-[15px] shadow-sm"
        >
          Tolak
        </button>
        <button 
          onClick={handleApprove}
          className="flex-1 bg-[#2C8548] hover:bg-emerald-700 text-white font-bold py-3.5 rounded-full transition-all active:scale-95 text-[15px] shadow-sm"
        >
          Setuju
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-4 right-4 bg-navy text-white p-4 rounded-2xl shadow-xl flex gap-3 animate-in fade-in slide-in-from-top-4 z-50">
          <CheckCircle2 className="text-ok shrink-0" />
          <div>
            <h4 className="text-[14px] font-bold">Status Diperbarui</h4>
            <p className="text-[11px] text-white/70">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
