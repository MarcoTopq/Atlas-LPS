"use client";

import { MOCK_TASKS } from "@/lib/mock/data";
import { ChevronLeft, FileText, CheckCircle2, AlertTriangle, Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SwipeToApprove from "@/components/SwipeToApprove";
import { useState } from "react";
import { use } from "react";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return [
    { id: encodeURIComponent("ND-1610/2026") },
    { id: "BPM-4521" },
    { id: "VT-0912" },
    { id: "ST-2207" }
  ];
}

export default function PersetujuanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = decodeURIComponent(resolvedParams.id);
  const task = MOCK_TASKS.find(t => t.id === id);
  const [showToast, setShowToast] = useState(false);

  if (!task) return notFound();

  const handleApprove = () => {
    // Show biometric mock or just show toast
    setTimeout(() => {
      setShowToast(true);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-bg relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-2 px-4 py-4 text-white shadow-md flex items-center gap-3 sticky top-0 z-40">
        <Link href="/persetujuan" className="p-1 -ml-1 rounded-full bg-white/10 active:bg-white/20">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-sm font-bold leading-tight">{task.judul}</h1>
          <p className="text-[10px] text-white/70">{task.id} · {task.jenis.replace('_', ' ').toUpperCase()}</p>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* Meta Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-line">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-muted mb-1">Pemohon</p>
              <p className="text-xs font-bold text-ink">{task.pemohon}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted mb-1">Sistem Sumber</p>
              <p className="text-xs font-bold text-ink">{task.sistem}</p>
            </div>
            {task.total && (
              <div className="col-span-2">
                <p className="text-[10px] text-muted mb-1">Total Pengajuan</p>
                <p className="text-lg font-bold text-navy">Rp {task.total.toLocaleString('id-ID')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Decision Brief */}
        {task.brief && (
          <div className="bg-ai-soft rounded-2xl p-4 shadow-sm border border-ai/20">
            <div className="flex items-center gap-2 mb-3">
              <Lock size={14} className="text-ai" />
              <span className="text-xs font-bold text-ai bg-white px-2 py-0.5 rounded-full shadow-sm">
                AI On-Prem LPS
              </span>
            </div>
            
            <h3 className="text-sm font-bold text-navy mb-2">Decision Brief</h3>
            <p className="text-xs text-ink/80 mb-4 leading-relaxed">
              {task.brief.ringkasan}
            </p>
            
            <div className="bg-white rounded-xl p-3 mb-4 shadow-sm border border-ai/10">
              <div className="grid grid-cols-2 gap-3 text-xs">
                {task.brief.kv.map((item, idx) => (
                  <div key={idx}>
                    <span className="text-muted block text-[10px] mb-0.5">{item.k}</span>
                    <span className="font-semibold text-ink">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2">
              <FileText size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-blue-800 mb-0.5">Sumber Terverifikasi</p>
                <p className="text-[10px] text-blue-900/80 leading-relaxed">{task.brief.sitasi}</p>
              </div>
            </div>
            
            <div className={cn(
              "mt-3 flex items-center gap-2 text-xs font-bold p-2 rounded-lg border",
              task.brief.flag === 'normal' ? "bg-ok-soft text-ok border-ok/20" : "bg-warn-soft text-warn border-warn/20"
            )}>
              {task.brief.flag === 'normal' ? <CheckCircle2 size={16}/> : <AlertTriangle size={16}/>}
              {task.brief.flag === 'normal' ? "Tidak ditemukan anomali" : "Perlu perhatian khusus"}
            </div>
          </div>
        )}

        {/* Budget Breakdown */}
        {task.budget && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-line">
            <h3 className="text-sm font-bold text-navy mb-3">Rincian Anggaran</h3>
            <div className="flex justify-between items-end mb-1">
              <div>
                <p className="text-[10px] font-bold text-ink">{task.budget.mataAnggaran}</p>
                <p className="text-[10px] text-muted">Kode: {task.budget.kode}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted">Tersedia</p>
                <p className="text-sm font-bold text-ok">Rp {(task.budget.tersedia / 1000000).toFixed(1)} Jt</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-3 bg-line rounded-full mt-3 overflow-hidden flex">
              <div className="bg-muted h-full" style={{ width: `${(task.budget.terpakai / task.budget.pagu) * 100}%` }}></div>
              <div className="bg-orange h-full" style={{ width: `${(task.budget.pengajuan / task.budget.pagu) * 100}%` }}></div>
            </div>
            
            <div className="mt-2 text-[10px] text-muted flex justify-between">
              <span>Terpakai: Rp {(task.budget.terpakai / 1000000).toFixed(1)} Jt</span>
              <span className="font-semibold text-orange">Pengajuan: Rp {(task.budget.pengajuan / 1000000).toFixed(1)} Jt</span>
            </div>
            
            <div className="mt-4 pt-3 border-t border-line text-xs font-bold text-ok flex items-center gap-1">
              <CheckCircle2 size={14}/> Anggaran cukup
            </div>
          </div>
        )}

        {/* Lampiran */}
        {task.lampiran && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-line">
            <h3 className="text-sm font-bold text-navy mb-3">Lampiran</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {task.lampiran.map((lamp, idx) => (
                <div key={idx} className="min-w-[120px] bg-bg border border-line rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <span className="text-[10px] font-medium text-ink break-all line-clamp-2">{lamp.nama}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Actions for Nota Dinas */}
        {task.jenis === 'nota_dinas' && (
          <div className="flex gap-3">
            <button className="flex-1 bg-white border border-orange text-orange font-bold text-xs py-3 rounded-xl">
              Edit Redaksi
            </button>
            <button className="flex-1 bg-white border border-navy text-navy font-bold text-xs py-3 rounded-xl">
              Tanya AI
            </button>
          </div>
        )}
      </div>

      {/* Fixed Bottom Approval Bar */}
      <div className="fixed bottom-0 w-full max-w-[430px] bg-white border-t border-line p-4 shadow-[0_-4px_14px_rgba(0,0,0,0.05)] z-50">
        <SwipeToApprove onApprove={handleApprove} />
        <button className="w-full mt-3 text-xs font-bold text-danger py-2">
          Kembalikan untuk revisi
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-4 right-4 bg-navy text-white p-4 rounded-2xl shadow-xl flex gap-3 animate-in fade-in slide-in-from-top-4 z-50">
          <CheckCircle2 className="text-ok shrink-0" />
          <div>
            <h4 className="text-sm font-bold">Disetujui</h4>
            <p className="text-[10px] text-white/70">Tercatat di Core System · Audit trail tersimpan real-time.</p>
          </div>
        </div>
      )}
    </div>
  );
}
