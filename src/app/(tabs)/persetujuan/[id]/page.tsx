"use client";

import AppBar from "@/components/AppBar";
import { MOCK_TASKS } from "@/lib/mock/data";
import { getNaskahDetail } from "@/lib/mock/bpm";
import ApprovalAuth from "@/components/research/ApprovalAuth";
import { Lock, FileText, CheckCircle2, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect, useRef, use } from "react";
import { cn } from "@/lib/utils";
import { useResearch } from "@/lib/research";

export default function PersetujuanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = decodeURIComponent(resolvedParams.id);
  
  // Find task from MOCK_TASKS or fallback to getNaskahDetail
  const taskFromList = MOCK_TASKS.find(t => t.id === id);
  const naskahDetail = getNaskahDetail(id);

  const [activeTab, setActiveTab] = useState("Detail");
  const [modalType, setModalType] = useState<"Setuju" | "Revisi" | "Tolak" | null>(null);
  const [catatan, setCatatan] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const log = useResearch((s) => s.log);
  const openedAt = useRef<number>(0);

  // Riset: catat pembukaan dokumen (untuk mengukur TAT)
  useEffect(() => {
    openedAt.current = Date.now();
    if (taskFromList) {
      log("approval_open", { id: taskFromList.id, jenis: taskFromList.jenis });
    } else {
      log("approval_open", { id, jenis: "nota_dinas" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!taskFromList && !naskahDetail) return notFound();

  // Combine unified detail properties
  const title = taskFromList?.judul ?? naskahDetail.title;
  const sistem = taskFromList?.sistem ?? "e-Correspondence";
  const jenisBadge = taskFromList ? taskFromList.sistem : naskahDetail.jenisBadge;
  const isHiPriority = taskFromList?.prioritas === "hi" || naskahDetail.statusBadge === "Prioritas Tinggi";
  const statusBadge = isHiPriority ? "Prioritas Tinggi" : "Menunggu Persetujuan";
  const isRahasia = naskahDetail.isRahasia ?? false;
  const pemohon = taskFromList?.pemohon ?? naskahDetail.metadata.pengajuan;
  const totalAmount = taskFromList?.total;
  const budget = taskFromList?.budget;
  const slaText = taskFromList?.sla ?? "SLA 2 jam lagi";

  const briefSummary = taskFromList?.brief?.ringkasan ?? naskahDetail.brief.ringkasan;
  const briefSitasi = taskFromList?.brief?.sitasi ?? naskahDetail.brief.sitasi;

  const detailInfo = {
    nomorDokumen: id,
    tipeSurat: taskFromList ? `${taskFromList.sistem} - ${taskFromList.jenis.toUpperCase()}` : naskahDetail.detail.tipeSurat,
    jenisSurat: taskFromList?.judul ?? naskahDetail.detail.jenisSurat,
    perihal: title,
    deskripsi: briefSummary,
    crossReference: naskahDetail.detail.crossReference ?? "-",
    reviewer: naskahDetail.detail.reviewer ?? "Pejabat Penelaah GRC / Keuangan",
    pemohon: pemohon,
    sistem: sistem,
  };

  const lampiranList = taskFromList?.lampiran?.map(l => ({ nama: l.nama, ukuran: "1.2 MB", tipe: l.tipe })) ?? naskahDetail.lampiran;

  const riwayatList = naskahDetail.riwayatPengajuan ?? [
    { action: "Pemohon Mengajukan", date: "Hari ini, 08:30 WIB", statusTitle: `Diajukan oleh ${pemohon}`, note: "Mohon persetujuan untuk proses selanjutnya" },
    { action: "Sistem Menyiapkan Decision Brief", date: "Hari ini, 08:31 WIB", statusTitle: "Diverifikasi AI On-Premise LPS", note: "Otentikasi & analisis korelasi aturan selesai" },
    { action: "Menunggu Persetujuan Anda", date: "Saat Ini", statusTitle: "Dalam Antrean Approver", note: `SLA: ${slaText}` }
  ];

  const tbp = taskFromList?.tbpData;

  const tabs = tbp
    ? ["Detail", "Data Approval TBP", "Lampiran", "Riwayat Pengajuan"]
    : budget 
    ? ["Detail", "Rincian Anggaran", "Lampiran", "Riwayat Pengajuan"]
    : ["Detail", "Lampiran", "Riwayat Pengajuan"];

  const handleOpenModal = (type: "Setuju" | "Revisi" | "Tolak") => {
    setModalType(type);
    setCatatan("");
  };

  const handleConfirmAction = () => {
    if (!catatan.trim()) return;

    if (modalType === "Setuju") {
      setModalType(null);
      setShowAuth(true);
      return;
    }

    log("approval_return", { id, jenis: taskFromList?.jenis ?? "nota_dinas", aksi: modalType ?? "" });
    setToastMessage(`Pengajuan ${modalType === "Revisi" ? "Dikembalikan untuk Revisi" : "Ditolak"}.`);
    setModalType(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    log("approval_done", {
      id,
      jenis: taskFromList?.jenis ?? "nota_dinas",
      durasiMs: Date.now() - openedAt.current,
    });
    setToastMessage(`Pengajuan Berhasil Disetujui! Tercatat di Core System ${sistem}.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-[#F6F7F9] pb-32 md:pb-24 relative w-full items-center font-sans text-[#172033]">
      <div className="w-full max-w-5xl">
        {/* Header Bar */}
        <AppBar title="Detail Persetujuan" showBack />
        
        <div className="px-4 sm:px-6 md:px-8 pt-4 space-y-5 w-full">
          
          {/* Header Title & Badges */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 bg-[#172033] text-white text-[11px] font-bold rounded-full shadow-2xs">
                {jenisBadge}
              </span>
              <span className={cn(
                "px-3 py-0.5 text-[11px] font-bold rounded-full border",
                isHiPriority 
                  ? "bg-[#FEF3F2] text-[#D92D20] border-[#FEE4E2]" 
                  : "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]"
              )}>
                {statusBadge}
              </span>
              {isRahasia && (
                <span className="px-3 py-0.5 bg-[#FEF3F2] text-[#D92D20] border border-[#FEE4E2] text-[11px] font-bold rounded-full">
                  Rahasia
                </span>
              )}
              <span className="px-3 py-0.5 bg-[#F2F4F7] text-[#475467] text-[11px] font-medium rounded-full flex items-center gap-1.5 border border-[#EAECF0]">
                <Clock size={12} className="text-[#F56621]" />
                {slaText.replace('⏱ ', '')}
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-extrabold text-[#172033] tracking-tight leading-snug">
              {title}
            </h1>
          </div>

          {/* AI Decision Brief Card (Amarta AI Feature) */}
          <div className="bg-[#ECEBFB] rounded-[22px] p-5 shadow-2xs border border-[#4C46D9]/25 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-[#4C46D9]" />
                <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2.5 py-0.5 rounded-full shadow-xs border border-[#4C46D9]/20">
                  🔒 AI On-Prem LPS Verification
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#4C46D9]">Amarta AI</span>
            </div>
            
            <div>
              <h2 className="text-[13.5px] font-bold text-[#172033] mb-1">Decision Brief AI Amarta</h2>
              <p className="text-[12.5px] text-[#344054] leading-relaxed">
                {briefSummary}
              </p>
            </div>

            <div className="bg-white border border-[#4C46D9]/20 rounded-xl p-3 flex gap-3">
              <FileText size={17} className="text-[#4C46D9] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-[#4C46D9] mb-0.5">Sumber Terverifikasi</p>
                <p className="text-[11.5px] text-[#475467] leading-relaxed">{briefSitasi}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-[11.5px] font-bold p-2.5 rounded-xl border bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]">
              <CheckCircle2 size={15} />
              <span>Tervalidasi Otentikasi System {sistem} LPS</span>
            </div>
          </div>

          {/* Top Summary Card (Pengajuan & Total) */}
          <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0] grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-[#667085] mb-0.5">Pemohon</span>
              <span className="text-[13.5px] font-bold text-[#172033] truncate">{pemohon}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-[#667085] mb-0.5">Total Pengajuan</span>
              <span className="text-[13.5px] font-extrabold text-[#172033]">
                {totalAmount ? `Rp ${totalAmount.toLocaleString('id-ID')}` : 'Sesuai Nota'}
              </span>
            </div>
          </div>

          {/* Sub-Navigation Tabs (Unified Modern Pill Filter Style) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all flex-shrink-0 whitespace-nowrap cursor-pointer",
                  activeTab === tab 
                    ? "bg-[#172033] text-white shadow-xs" 
                    : "bg-white text-[#667085] hover:text-[#172033] border border-[#EAECF0] hover:bg-[#F9FAFB]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab 1: Detail Persetujuan */}
          {activeTab === "Detail" && (
            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-[14.5px] font-bold text-[#172033] pb-2 border-b border-[#EAECF0]">Detail Informasi Persetujuan</h2>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAECF0]">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#667085] mb-0.5">Nomor Dokumen</span>
                    <span className="font-bold text-[#172033] font-mono">{detailInfo.nomorDokumen}</span>
                  </div>
                  <button className="text-xs font-bold text-[#F56621] hover:underline flex items-center gap-1 cursor-pointer">
                    Lihat Dokumen
                  </button>
                </div>

                <div className="pb-3 border-b border-[#EAECF0] flex flex-col">
                  <span className="text-[11px] text-[#667085] mb-0.5">Tipe Pengajuan</span>
                  <span className="font-semibold text-[#172033]">{detailInfo.tipeSurat}</span>
                </div>

                <div className="pb-3 border-b border-[#EAECF0] flex flex-col">
                  <span className="text-[11px] text-[#667085] mb-0.5">Perihal</span>
                  <span className="font-semibold text-[#172033]">{detailInfo.perihal}</span>
                </div>

                <div className="pb-3 border-b border-[#EAECF0] flex flex-col">
                  <span className="text-[11px] text-[#667085] mb-0.5">Reviewer Terakhir</span>
                  <span className="font-semibold text-[#172033]">{detailInfo.reviewer}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[11px] text-[#667085] mb-0.5">Deskripsi Ringkas</span>
                  <p className="font-normal text-[#475467] leading-relaxed">{detailInfo.deskripsi}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Lampiran */}
          {activeTab === "Lampiran" && (
            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-[14.5px] font-bold text-[#172033] pb-2 border-b border-[#EAECF0]">Berkas & Dokumen Lampiran</h2>

              <div className="space-y-2">
                {lampiranList.map((lampiran, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[#EAECF0] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#FEF3F2] text-[#D92D20] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-[#172033] truncate">{lampiran.nama}</p>
                        <span className="text-[10.5px] text-[#667085]">{lampiran.ukuran}</span>
                      </div>
                    </div>

                    <button className="text-xs font-bold text-[#F56621] hover:underline flex-shrink-0 cursor-pointer">
                      Unduh
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Riwayat Pengajuan */}
          {activeTab === "Riwayat Pengajuan" && (
            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-[14.5px] font-bold text-[#172033] pb-2 border-b border-[#EAECF0]">Riwayat Jejak Persetujuan</h2>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EAECF0]">
                {riwayatList.map((item, index) => (
                  <div key={index} className="relative space-y-1">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#ECFDF3] border-2 border-[#12B76A] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#172033]">{item.statusTitle}</span>
                      <span className="text-[10.5px] text-[#667085]">{item.date}</span>
                    </div>
                    <p className="text-xs text-[#475467] font-normal leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contextual AI Assistant Entry */}
          <Link
            href={`/ai?q=${encodeURIComponent(`Apakah pengajuan ${id} (${title}) dari ${pemohon} sejumlah ${totalAmount ? 'Rp ' + totalAmount.toLocaleString('id-ID') : 'sesuai nota'} sudah sesuai aturan LPS?`)}`}
            className="w-full bg-[#ECEBFB] hover:bg-[#E0DEFA] border border-[#4C46D9]/30 text-[#4C46D9] font-bold text-xs sm:text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Sparkles size={16} />
            <span>Tanya AI Amarta Tentang Persetujuan Ini</span>
          </Link>

        </div>
      </div>

      {/* Floating Action Bar (Tolak, Revisi, Setuju) */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-[#EAECF0] p-4 pb-6 md:pb-4 flex justify-center z-30 shadow-[0_-8px_30px_rgba(23,32,51,0.06)]">
        <div className="w-full max-w-5xl flex justify-end gap-2.5 px-4 sm:px-6 md:px-8">
          <button 
            onClick={() => handleOpenModal("Tolak")}
            className="flex-1 md:flex-initial md:px-7 bg-[#FEF3F2] border border-[#FEE4E2] hover:bg-red-100 text-[#D92D20] font-bold py-2.5 rounded-xl transition-all active:scale-95 text-xs sm:text-sm shadow-2xs flex items-center justify-center cursor-pointer"
          >
            Tolak
          </button>

          <button 
            onClick={() => handleOpenModal("Revisi")}
            className="flex-1 md:flex-initial md:px-7 bg-white border border-[#EAECF0] hover:bg-[#F9FAFB] text-[#344054] font-bold py-2.5 rounded-xl transition-all active:scale-95 text-xs sm:text-sm shadow-2xs flex items-center justify-center cursor-pointer"
          >
            Revisi
          </button>

          <button 
            onClick={() => handleOpenModal("Setuju")}
            className="flex-1 md:flex-initial md:px-9 bg-[#12B76A] hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-all active:scale-95 text-xs sm:text-sm shadow-xs flex items-center justify-center cursor-pointer"
          >
            Setuju
          </button>
        </div>
      </div>

      {/* Bottom Sheet / Desktop Centered Modal Konfirmasi */}
      {modalType && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center animate-in fade-in duration-200 p-0 md:p-4">
          <div className="w-full max-w-[430px] bg-white rounded-t-[32px] md:rounded-[32px] p-6 space-y-5 animate-in slide-in-from-bottom duration-300 shadow-2xl relative">
            
            {/* Grabber */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />

            {/* Modal Title & Description */}
            <div>
              <h3 className="text-[17px] font-bold text-[#172033] mb-1">
                Konfirmasi {modalType}
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Apakah Anda yakin ingin {modalType === "Setuju" ? "menyetujui" : modalType === "Revisi" ? "mengembalikan untuk direvisi" : "menolak"} pengajuan ini?
              </p>
            </div>

            {/* Form Input Catatan* */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172033]">
                Catatan<span className="text-[#D92D20]">*</span>
              </label>
              <textarea
                rows={3}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Berikan catatan terkait persetujuan (wajib)"
                className="w-full bg-[#F6F7F9] border border-[#EAECF0] rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-[#172033] transition-all placeholder:text-[#98A2B3] text-[#172033] resize-none"
              />
            </div>

            {/* Buttons Row */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setModalType(null)}
                className="flex-1 bg-white border border-[#EAECF0] hover:bg-[#F9FAFB] text-[#344054] font-bold py-2.5 rounded-xl transition-all active:scale-95 text-xs cursor-pointer"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmAction}
                disabled={!catatan.trim()}
                className={cn(
                  "flex-1 font-bold py-2.5 rounded-xl transition-all active:scale-95 text-xs text-white shadow-xs cursor-pointer",
                  !catatan.trim() 
                    ? "bg-[#EAECF0] text-[#98A2B3] cursor-not-allowed" 
                    : modalType === "Setuju"
                      ? "bg-[#12B76A] hover:bg-emerald-700"
                      : modalType === "Revisi"
                        ? "bg-[#F79009] hover:bg-amber-700"
                        : "bg-[#D92D20] hover:bg-red-700"
                )}
              >
                {modalType}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verifikasi PIN/Biometrik sebelum eksekusi (Secure Borderless Approval) */}
      {showAuth && (
        <ApprovalAuth onSuccess={handleAuthSuccess} onCancel={() => setShowAuth(false)} />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-4 right-4 max-w-md mx-auto bg-[#172033] text-white p-4 rounded-2xl shadow-xl flex gap-3 animate-in fade-in slide-in-from-top-4 z-50 border border-white/10">
          <CheckCircle2 className="text-[#12B76A] shrink-0" />
          <div>
            <h4 className="text-xs font-bold">Status Diperbarui</h4>
            <p className="text-[11px] text-white/70">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
