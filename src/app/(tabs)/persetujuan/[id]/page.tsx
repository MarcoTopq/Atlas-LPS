"use client";

import AppBar from "@/components/AppBar";
import { MOCK_TASKS } from "@/lib/mock/data";
import { getNaskahDetail } from "@/lib/mock/bpm";
import ApprovalAuth from "@/components/research/ApprovalAuth";
import { Lock, FileText, CheckCircle2, Sparkles, ExternalLink, Paperclip, Check, Clock, AlertTriangle } from "lucide-react";
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
  const statusBadge = taskFromList ? (taskFromList.prioritas === "hi" ? "Prioritas Tinggi" : "Menunggu Persetujuan") : naskahDetail.statusBadge;
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
    setToastMessage(
      modalType === "Revisi"
        ? "Pengajuan Dikembalikan untuk Revisi."
        : "Pengajuan Telah Ditolak."
    );
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
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-28 relative w-full items-center">
      <div className="w-full">
        {/* Header Bar */}
        <AppBar title="Detail Persetujuan" showBack />
        
        <div className="px-5 md:px-8 mt-4 space-y-5 w-full">
        {/* Header Title & Badges */}
        <div>
          <h1 className="text-[18px] md:text-[22px] font-bold text-ink tracking-tight mb-2.5">{title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#0055FF] text-white text-[11px] font-bold rounded-full">
              {jenisBadge}
            </span>
            <span className="px-3 py-1 bg-[#FFD000] text-[#554000] text-[11px] font-bold rounded-full">
              {statusBadge}
            </span>
            {isRahasia && (
              <span className="px-3 py-1 bg-[#FF3B30] text-white text-[11px] font-bold rounded-full">
                Rahasia
              </span>
            )}
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-full flex items-center gap-1 border border-slate-200">
              <Clock size={12} className="text-orange" />
              {slaText}
            </span>
          </div>
        </div>

        {/* AI Decision Brief Card (Atlas AI Feature) */}
        <div className="bg-[#ECEBFB] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#4C46D9]/20">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-[#4C46D9]" />
            <span className="text-[11px] font-bold text-[#4C46D9] bg-white px-2.5 py-0.5 rounded-full shadow-sm">
              🔒 AI On-Prem LPS Verification
            </span>
          </div>
          
          <h3 className="text-[14px] font-bold text-ink mb-2">Decision Brief AI Atlas</h3>
          <p className="text-[13px] text-ink/80 mb-4 leading-relaxed">
            {briefSummary}
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-[16px] p-3.5 flex gap-3">
            <FileText size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-blue-800 mb-0.5">Sumber Terverifikasi</p>
              <p className="text-[12px] text-blue-900/80 leading-relaxed">{briefSitasi}</p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-2 text-[12px] font-bold p-2.5 rounded-xl border bg-[#E4F5EE] text-[#1E9E6A] border-[#1E9E6A]/20">
            <CheckCircle2 size={16}/>
            Tervalidasi Otentikasi System {sistem} LPS
          </div>
        </div>

        {/* Top Summary Card (Pengajuan & Total) */}
        <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Pemohon</span>
            <span className="text-[13.5px] font-bold text-ink truncate">{pemohon}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted mb-1">Total Pengajuan</span>
            <span className="text-[13.5px] font-bold text-navy">
              {totalAmount ? `Rp ${totalAmount.toLocaleString('id-ID')}` : 'Sesuai Nota'}
            </span>
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
                  : "bg-white text-muted hover:bg-slate-100 hover:text-ink border border-slate-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Detail Persetujuan */}
        {activeTab === "Detail" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Detail Informasi Persetujuan</h2>

            <div className="space-y-3.5 text-[13px]">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex flex-col">
                  <span className="text-[11px] text-muted mb-0.5">Nomor Dokumen</span>
                  <span className="font-bold text-ink">{detailInfo.nomorDokumen}</span>
                </div>
                <button className="text-[12px] font-bold text-orange hover:underline flex items-center gap-1">
                  Lihat Dokumen
                </button>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Tipe Pengajuan</span>
                <span className="font-semibold text-ink">{detailInfo.tipeSurat}</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Jenis Sistem</span>
                <span className="font-semibold text-ink">{detailInfo.sistem}</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Perihal</span>
                <span className="font-semibold text-ink">{detailInfo.perihal}</span>
              </div>

              <div className="pb-3 border-b border-line flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Deskripsi Ringkas</span>
                <span className="font-semibold text-ink leading-relaxed">{detailInfo.deskripsi}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] text-muted mb-0.5">Reviewer / Penelaah</span>
                <span className="font-semibold text-ink">{detailInfo.reviewer}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Data Approval TBP (CoreLPS UI) */}
        {activeTab === "Data Approval TBP" && tbp && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Header & Meta Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-[12px] font-extrabold text-navy uppercase tracking-wider">CORELPS — Surveilans (TBP)</span>
                <span className="bg-emerald-100 text-emerald-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md">
                  {tbp.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-[12px]">
                <div>
                  <span className="text-muted block text-[10.5px]">Workflow ID</span>
                  <span className="font-bold text-ink">{tbp.workflowId}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10.5px]">Modul</span>
                  <span className="font-bold text-ink">{tbp.modul}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10.5px]">Created Date</span>
                  <span className="font-bold text-ink">{tbp.createdDate}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10.5px]">Approval Date</span>
                  <span className="font-bold text-ink">{tbp.approvalDate}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted block text-[10.5px]">Workflow Approver</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    {tbp.workflowApprover.map((app, idx) => (
                      <span key={idx} className="bg-orange/20 text-orange-d text-[10.5px] font-bold px-2 py-0.5 rounded-md">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-2">
              <h3 className="text-[14px] font-bold text-ink">Data Observasi & Suku Bunga</h3>
              <div className="grid grid-cols-2 gap-3 text-[12px] bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-muted text-[10.5px] block">Tanggal Observasi</span>
                  <span className="font-bold text-ink">{tbp.tanggalObservasi}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">SBP IDR (%)</span>
                  <span className="font-bold text-navy">{tbp.sbpIdr}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">SBP Valas (%)</span>
                  <span className="font-bold text-navy">{tbp.sbpValas}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">DM IDR (%)</span>
                  <span className="font-bold text-navy">{tbp.dmIdr}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">DM Valas (%)</span>
                  <span className="font-bold text-navy">{tbp.dmValas}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">TBP (%) IDR</span>
                  <span className="font-bold text-navy">{tbp.tbpIdr}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">TBP (%) Valas</span>
                  <span className="font-bold text-navy">{tbp.tbpValas}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">LPS Rate Rounded IDR (%)</span>
                  <span className="font-bold text-navy">{tbp.lpsRateRoundedIdr}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">LPS Rate Rounded Valas (%)</span>
                  <span className="font-bold text-navy">{tbp.lpsRateRoundedValas}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">LPS IDR Keputusan RDK (%)</span>
                  <span className="font-extrabold text-orange">{tbp.lpsIdrKeputusanRdk}</span>
                </div>
                <div>
                  <span className="text-muted text-[10.5px] block">LPS Valas Keputusan RDK (%)</span>
                  <span className="font-extrabold text-orange">{tbp.lpsValasKeputusanRdk}</span>
                </div>
              </div>
            </div>

            {/* Kesimpulan dan Usulan Hasil Evaluasi Matrix Table */}
            <div className="space-y-3">
              <div className="bg-[#FFC000] text-ink py-2 px-3 text-center rounded-t-xl font-extrabold text-[13px]">
                Kesimpulan dan Usulan Hasil Evaluasi
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-amber-200 rounded-xl overflow-hidden bg-amber-50/20">
                  <div className="bg-[#FFC000]/30 p-2 text-center font-bold text-[12px] text-ink border-b border-amber-200">
                    TBP Rupiah Bank Umum
                  </div>
                  <div className="p-3 text-[11.5px] space-y-2 text-slate-700">
                    {tbp.kesimpulanUsulan.tbpRupiahBankUmum.map((pt, idx) => (
                      <p key={idx} className="leading-relaxed">
                        <strong className="text-ink">{idx + 1}.</strong> {pt}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border border-amber-200 rounded-xl overflow-hidden bg-amber-50/20">
                  <div className="bg-[#FFC000]/30 p-2 text-center font-bold text-[12px] text-ink border-b border-amber-200">
                    TBP Valuta Asing Bank Umum
                  </div>
                  <div className="p-3 text-[11.5px] space-y-2 text-slate-700">
                    {tbp.kesimpulanUsulan.tbpValasBankUmum.map((pt, idx) => (
                      <p key={idx} className="leading-relaxed">
                        <strong className="text-ink">{idx + 1}.</strong> {pt}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border border-amber-200 rounded-xl overflow-hidden bg-amber-50/20">
                  <div className="bg-[#FFC000]/30 p-2 text-center font-bold text-[12px] text-ink border-b border-amber-200">
                    TBP Rupiah BPR
                  </div>
                  <div className="p-3 text-[11.5px] space-y-2 text-slate-700">
                    {tbp.kesimpulanUsulan.tbpRupiahBpr.map((pt, idx) => (
                      <p key={idx} className="leading-relaxed">
                        <strong className="text-ink">{idx + 1}.</strong> {pt}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Usulan Rekomendasi Table & Masa Berlaku */}
            <div className="space-y-3 pt-2">
              <div className="bg-[#FFE699] p-3 rounded-xl text-[12px] text-ink font-medium leading-relaxed border border-amber-200">
                Berdasarkan pertimbangan di atas, maka kami mengusulkan untuk <strong className="font-extrabold text-ink">menaikkan Tingkat Bunga Penjaminan Simpanan Rupiah di Bank Umum dan BPR masing-masing 50bps</strong>, serta <strong className="font-extrabold text-ink">mempertahankan Tingkat Bunga Penjaminan Simpanan Valas di Bank Umum</strong>, sebagai berikut:
              </div>

              <div className="overflow-x-auto rounded-xl border border-amber-300">
                <table className="w-full text-[12px] text-center">
                  <thead>
                    <tr className="bg-[#FFC000] text-ink font-bold border-b border-amber-300">
                      <th colSpan={2} className="p-2 border-r border-amber-300">Bank Umum</th>
                      <th className="p-2">BPR</th>
                    </tr>
                    <tr className="bg-[#FFE699] text-ink font-bold border-b border-amber-300">
                      <th className="p-1.5 border-r border-amber-300">Rupiah</th>
                      <th className="p-1.5 border-r border-amber-300">Valuta Asing</th>
                      <th className="p-1.5">Rupiah</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white font-extrabold text-[14px] text-navy">
                      <td className="p-2.5 border-r border-amber-200">{tbp.usulanBunga.bankUmumRupiah}</td>
                      <td className="p-2.5 border-r border-amber-200">{tbp.usulanBunga.bankUmumValas}</td>
                      <td className="p-2.5">{tbp.usulanBunga.bprRupiah}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#D9D9D9]/50 p-3 rounded-xl text-[11.5px] text-slate-700 leading-relaxed border border-slate-300 text-center font-medium">
                Tingkat Bunga Penjaminan tersebut diusulkan <strong className="text-ink">mulai berlaku sejak 1 Juli sampai dengan 30 September 2026</strong>, dan selanjutnya akan dievaluasi secara berkala dan dapat diubah sewaktu-waktu dengan memperhatikan kondisi perekonomian, perbankan, dan pasar keuangan ke depan.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rincian Anggaran (if available) */}
        {activeTab === "Rincian Anggaran" && budget && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Status Rincian Anggaran</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[13px] font-bold text-ink">{budget.mataAnggaran}</p>
                  <p className="text-[11px] text-muted">Kode Anggaran: {budget.kode}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-muted">Sisa Tersedia</p>
                  <p className="text-[16px] font-extrabold text-[#1E9E6A]">Rp {(budget.tersedia / 1000000).toFixed(1)} Jt</p>
                </div>
              </div>

              {/* Multi-layered Progress Bar */}
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                <div className="bg-slate-400 h-full" style={{ width: `${(budget.terpakai / budget.pagu) * 100}%` }}></div>
                <div className="bg-orange h-full" style={{ width: `${(budget.pengajuan / budget.pagu) * 100}%` }}></div>
              </div>

              <div className="flex justify-between text-[11.5px] font-medium text-muted">
                <span>Pagu Total: Rp {(budget.pagu / 1000000).toFixed(0)} Jt</span>
                <span>Terpakai: Rp {(budget.terpakai / 1000000).toFixed(1)} Jt</span>
                <span className="font-bold text-orange">Pengajuan Ini: Rp {(budget.pengajuan / 1000000).toFixed(1)} Jt</span>
              </div>

              <div className="p-3 bg-[#E4F5EE] border border-[#1E9E6A]/20 rounded-xl flex items-center gap-2 text-[#1E9E6A] text-[12.5px] font-bold">
                <CheckCircle2 size={16} />
                <span>Anggaran Cukup — Pengajuan sebesar 0.7% dari sisa anggaran divisi</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Lampiran */}
        {activeTab === "Lampiran" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Lampiran Persetujuan</h2>
            
            <div className="space-y-3">
              {lampiranList.map((lamp, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-line hover:border-orange/30 transition-colors">
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

        {/* Tab 4: Riwayat Pengajuan */}
        {activeTab === "Riwayat Pengajuan" && (
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-[15px] font-bold text-ink pb-2 border-b border-line">Riwayat Jejak Persetujuan</h2>

            <div className="relative pl-6 border-l-2 border-slate-100 ml-2 space-y-6">
              {riwayatList.map((item, idx) => (
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
        <Link 
          href={`/ai?q=${encodeURIComponent(`Apakah pengajuan ${id} (${title}) dari ${pemohon} sejumlah ${totalAmount ? 'Rp ' + totalAmount.toLocaleString('id-ID') : 'sesuai nota'} sudah sesuai aturan LPS?`)}`}
          className="w-full bg-[#ECEBFB] hover:bg-[#E0DEFA] border border-[#4C46D9]/30 text-[#4C46D9] font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Sparkles size={18} />
          Tanya AI Atlas Tentang Persetujuan Ini
        </Link>
      </div>
      </div>

      {/* Floating Action Bar (Tolak, Revisi, Setuju) */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 pb-6 md:pb-4 flex justify-center md:justify-end md:pr-8 z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="w-full max-w-[430px] md:max-w-none md:w-auto flex gap-2.5 px-1 md:px-0">
          <button 
            onClick={() => handleOpenModal("Tolak")}
            className="flex-1 md:flex-initial md:px-8 bg-[#E53935] hover:bg-red-700 text-white font-bold py-3.5 md:py-3 rounded-full transition-all active:scale-95 text-[14px] shadow-sm flex items-center justify-center cursor-pointer"
          >
            Tolak
          </button>

          <button 
            onClick={() => handleOpenModal("Revisi")}
            className="flex-1 md:flex-initial md:px-8 bg-white border border-slate-300 hover:bg-slate-50 text-ink font-bold py-3.5 md:py-3 rounded-full transition-all active:scale-95 text-[14px] shadow-sm flex items-center justify-center cursor-pointer"
          >
            Revisi
          </button>

          <button 
            onClick={() => handleOpenModal("Setuju")}
            className="flex-1 md:flex-initial md:px-10 bg-[#2C8548] hover:bg-emerald-700 text-white font-bold py-3.5 md:py-3 rounded-full transition-all active:scale-95 text-[14px] shadow-sm flex items-center justify-center cursor-pointer"
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
              <h3 className="text-[17px] font-bold text-ink mb-1">
                Konfirmasi {modalType}
              </h3>
              <p className="text-[13px] text-muted leading-relaxed">
                Apakah Anda yakin ingin {modalType === "Setuju" ? "menyetujui" : modalType === "Revisi" ? "mengembalikan untuk direvisi" : "menolak"} pengajuan ini?
              </p>
            </div>

            {/* Form Input Catatan* */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-ink">
                Catatan<span className="text-danger">*</span>
              </label>
              <textarea
                rows={3}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Berikan catatan terkait persetujuan (wajib)"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all placeholder:text-muted/60 text-ink resize-none"
              />
            </div>

            {/* Buttons Row */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setModalType(null)}
                className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-ink font-bold py-3.5 rounded-full transition-all active:scale-95 text-[14px]"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmAction}
                disabled={!catatan.trim()}
                className={cn(
                  "flex-1 font-bold py-3.5 rounded-full transition-all active:scale-95 text-[14px] text-white shadow-sm",
                  !catatan.trim() 
                    ? "bg-slate-300 cursor-not-allowed opacity-70" 
                    : modalType === "Setuju"
                      ? "bg-[#2C8548] hover:bg-emerald-700"
                      : modalType === "Revisi"
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-[#E53935] hover:bg-red-700"
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
