"use client";

import AppBar from "@/components/AppBar";
import { MOCK_BPM_DETAIL } from "@/lib/mock/bpm";
import { Receipt, Lock, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { use } from "react";
import { cn } from "@/lib/utils";

export default function BpmTasklistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const data = MOCK_BPM_DETAIL; // In real app, fetch based on resolvedParams.id
  
  const [activeTab, setActiveTab] = useState("Jurnal Detail");
  
  const tabs = ["Jurnal Detail", "Catatan", "Dokumen", "Riwayat"];

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-[100px]">
      <AppBar title="Detail Pengajuan" showBack />
      
      <div className="px-5 mt-4">
        {/* Header Title & Badge */}
        <h1 className="text-[18px] md:text-[22px] font-bold text-ink tracking-tight mb-2">{data.title}</h1>
        <div className="inline-block px-3 py-1.5 bg-[#0055FF] text-white text-[11px] font-bold rounded-full mb-5">
          {data.jenis}
        </div>

        {/* Metadata Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Posting Date</span>
            <span className="text-[13px] font-bold text-ink">{data.metadata.postingDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">No Doc SAP</span>
            <span className="text-[13px] font-bold text-ink">{data.metadata.noDocSAP}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Period</span>
            <span className="text-[13px] font-bold text-ink">{data.metadata.period}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Currency</span>
            <span className="text-[13px] font-bold text-ink">{data.metadata.currency}</span>
          </div>
        </div>

        {/* Decision Brief */}
        {data.brief && (
          <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={14} className="text-[#4C46D9]" />
              <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2 py-0.5 rounded-full shadow-sm">
                AI On-Prem LPS
              </span>
            </div>
            
            <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief</h3>
            <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
              {data.brief.ringkasan}
            </p>
            
            <div className="bg-white rounded-[16px] p-4 mb-4 shadow-sm border border-[#4C46D9]/10">
              <div className="grid grid-cols-2 gap-4 text-xs">
                {data.brief.kv.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-muted text-[11px] mb-1">{item.k}</span>
                    <span className="font-bold text-ink text-[13px]">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-4 flex gap-3">
              <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-blue-800 mb-1">Sumber Terverifikasi</p>
                <p className="text-[12px] text-blue-900/80 leading-relaxed">{data.brief.sitasi}</p>
              </div>
            </div>
            
            <div className={cn(
              "mt-4 flex items-center gap-2 text-[13px] font-bold p-3 rounded-xl border",
              data.brief.flag === 'normal' ? "bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20" : "bg-[#FBF1D6] text-[#E0A100] border-[#E0A100]/20"
            )}>
              {data.brief.flag === 'normal' ? <CheckCircle2 size={18}/> : <AlertTriangle size={18}/>}
              {data.brief.flag === 'normal' ? "Tidak ditemukan anomali" : "Perlu perhatian khusus"}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4 -mx-5 px-5 md:mx-0 md:px-0">
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

        {/* Tab Content */}
        {activeTab === "Jurnal Detail" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[16px] font-bold text-ink">Jurnal Detail</h2>
              <div className="w-6 h-6 rounded-full bg-[#0055FF] text-white flex items-center justify-center text-[11px] font-bold">
                14
              </div>
            </div>

            {/* Ringkasan Jurnal */}
            <div className="bg-[#FFF4ED] border border-[#FFD8C2] rounded-[24px] p-4 text-center">
              <h3 className="text-[12px] font-bold text-ink mb-3">Ringkasan Jurnal</h3>
              <div className="flex justify-between max-w-[200px] mx-auto">
                <div className="flex flex-col">
                  <span className="text-[11px] text-muted mb-1">Debit</span>
                  <span className="text-[14px] font-bold text-ink">{data.jurnal.totalDebit}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-muted mb-1">Credit</span>
                  <span className="text-[14px] font-bold text-ink">{data.jurnal.totalCredit}</span>
                </div>
              </div>
            </div>

            {/* List of Jurnal Items */}
            <div className="space-y-4">
              {data.jurnal.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col">
                  {/* Header Row */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-ink mb-0.5">{item.accountNo}</span>
                      <span className="text-[11px] text-muted uppercase tracking-wider">G/L ACC NO</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-ink mb-0.5">{item.accountName}</span>
                      <span className="text-[11px] text-muted leading-tight">{item.glAccDesc}</span>
                    </div>
                  </div>

                  {/* Grid Data */}
                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-line">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium text-muted mb-1">Cost Center</span>
                      <span className="text-[12px] font-bold text-ink">{item.costCenter}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium text-muted mb-1">GL Order</span>
                      <span className="text-[12px] font-bold text-ink">{item.glOrder}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium text-muted mb-1">Assignment</span>
                      <span className="text-[12px] font-bold text-ink">{item.assignment}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium text-muted mb-1">WBS</span>
                      <span className="text-[12px] font-bold text-ink">{item.wbs}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                      <span className="text-[11px] font-medium text-muted mb-1">Description</span>
                      <span className="text-[12px] font-medium text-ink leading-snug">{item.description}</span>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-bold text-muted">Nilai</span>
                      <span className="text-[13px] font-bold text-emerald-600">{item.nilai}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-bold text-muted">Ppn/Pph</span>
                      <span className="text-[13px] font-bold text-danger">{item.ppn}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="text-[12px] font-bold text-ink">Total</span>
                      <span className="text-[13px] font-bold text-danger">{item.total}</span>
                    </div>
                  </div>

                  {/* Button Lihat Rekening */}
                  <button className="mt-4 flex items-center gap-2 px-4 py-2 border border-line rounded-full self-start hover:bg-slate-50 transition-colors">
                    <Receipt size={14} className="text-light" />
                    <span className="text-[12px] font-bold text-ink">Lihat Rekening</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Catatan" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[16px] font-bold text-ink mb-3">Catatan</h2>
            <p className="text-[14px] text-ink border-b border-line pb-4">{data.catatan}</p>
          </div>
        )}

        {(activeTab === "Dokumen" || activeTab === "Riwayat") && (
          <div className="flex items-center justify-center py-10 bg-white rounded-[24px] shadow-sm border border-slate-50 text-muted text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300">
            Konten {activeTab} akan tampil di sini.
          </div>
        )}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-100 p-4 pb-6 md:pb-4 flex gap-3 z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        <button className="flex-1 bg-danger hover:bg-danger-d text-white font-bold py-3.5 rounded-full transition-colors active:scale-95 text-[15px]">
          Tolak
        </button>
        <button className="flex-1 bg-[#2C8548] hover:bg-emerald-700 text-white font-bold py-3.5 rounded-full transition-colors active:scale-95 text-[15px]">
          Setuju
        </button>
      </div>
    </div>
  );
}
