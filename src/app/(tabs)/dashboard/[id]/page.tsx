"use client";

import { useState } from "react";
import { use } from "react";
import AppBar from "@/components/AppBar";
import { cn } from "@/lib/utils";
import { 
  MOCK_ASET_TIMELINE,
  MOCK_ASET_CLASS,
  MOCK_ASET_LOKASI,
  MOCK_ASET_MONITORING,
  MOCK_ABSENSI_STATUS,
  MOCK_ABSENSI_TERLAMBAT,
  MOCK_ABSENSI_TIDAK_HADIR,
  MOCK_ABSENSI_RATA,
  MOCK_ABSENSI_DETAIL,
  MOCK_KEP_STATUS,
  MOCK_KEP_GENDER,
  MOCK_KEP_USIA,
  MOCK_KEP_PANGKAT_PIE,
  MOCK_KEP_PANGKAT_BAR,
  MOCK_KEP_MASA_KERJA,
  MOCK_KEP_DETAIL,
  MOCK_PERDIN_KPI,
  MOCK_PERDIN_STATUS_TANPA_UM,
  MOCK_PERDIN_STATUS_DENGAN_UM,
  MOCK_PERDIN_SPJ,
  MOCK_PERDIN_PENGAJUAN_SPJ,
  MOCK_PERDIN_SPJ_SLA,
  MOCK_PERDIN_DENGAN_UM,
  MOCK_PERDIN_RESERVASI,
  MOCK_PERDIN_INVOICE_STATUS,
  MOCK_PERDIN_INVOICE_SLA,
  MOCK_PERDIN_JENIS_RESERVASI,
  MOCK_PERDIN_DETAIL,
  MOCK_PEMBAYARAN_JENIS,
  MOCK_PEMBAYARAN_STATUS,
  MOCK_PEMBAYARAN_DETAIL,
  MOCK_UM_STATUS_KEGIATAN,
  MOCK_UM_STATUS_REIMBURSE_KEGIATAN,
  MOCK_UM_SPJ_KEGIATAN,
  MOCK_UM_DETAIL
} from "@/lib/mock/data";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { 
  Scale, 
  Receipt, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Search, 
  Coins, 
  ShieldAlert, 
  Building, 
  FileCheck2, 
  Building2, 
  Landmark,
  Clock,
  Briefcase,
  Layers,
  Filter,
  AlertTriangle,
  MonitorSmartphone,
  CheckCircle,
  XCircle,
  Award,
  CreditCard
} from "lucide-react";

// Mock datasets for Talent Profile
const TALENT_EMPLOYEES = [
  {
    id: "88102",
    nama: "Aditya Pratama",
    initials: "AP",
    jabatan: "Kepala Divisi Advokasi & Penjaminan",
    direktorat: "Direktorat Penanganan Klaim & Advokasi",
    tag: "⭐ STAR TALENT",
    rating: "4.9 / 5.0",
    ready: "Ready in 1 Year",
    boxIndex: 2, // Star (9)
    boxName: "Star (9)",
    kpis: {
      rating: "4.9 / 5.0",
      ratingNote: "Istimewa",
      potensi: "Tinggi",
      potensiNote: "Top 5%",
      idp: "46 Jam",
      idpNote: "Target 40 Jam ✓",
      etik: "100%",
      etikNote: "Bebas Pelanggaran",
    },
    competencies: [
      { name: "Kepemimpinan Strategis", pct: 94, target: "90%" },
      { name: "Penanganan Klaim & Penjaminan", pct: 96, target: "85%" },
      { name: "Governance & Risk Compliance (GRC)", pct: 90, target: "85%" },
      { name: "Inovasi Digital & Adaptasi AI", pct: 92, target: "80%" },
    ],
  },
  {
    id: "89215",
    nama: "Siti Rahmawati",
    initials: "SR",
    jabatan: "Senior Manager Analisis Risiko Penjaminan",
    direktorat: "Divisi Penanganan Klaim",
    tag: "🔥 HIGH PERFORMER",
    rating: "4.7 / 5.0",
    ready: "Ready in 2 Years",
    boxIndex: 5,
    boxName: "High Performer (6)",
    kpis: {
      rating: "4.7 / 5.0",
      ratingNote: "Sangat Baik",
      potensi: "Sedang",
      potensiNote: "Top 20%",
      idp: "40 Jam",
      idpNote: "Target 40 Jam ✓",
      etik: "100%",
      etikNote: "Bebas Pelanggaran",
    },
    competencies: [
      { name: "Kepemimpinan Strategis", pct: 86, target: "85%" },
      { name: "Penanganan Klaim & Penjaminan", pct: 93, target: "85%" },
      { name: "Governance & Risk Compliance (GRC)", pct: 88, target: "85%" },
      { name: "Inovasi Digital & Adaptasi AI", pct: 82, target: "80%" },
    ],
  },
  {
    id: "91044",
    nama: "Budi Santoso",
    initials: "BS",
    jabatan: "Manager Pengawasan Likuidasi",
    direktorat: "Divisi Penanganan Klaim",
    tag: "🚀 GROWTH DRIVER",
    rating: "4.5 / 5.0",
    ready: "Ready in 1 Year",
    boxIndex: 1,
    boxName: "Growth Driver (8)",
    kpis: {
      rating: "4.5 / 5.0",
      ratingNote: "Baik",
      potensi: "Tinggi",
      potensiNote: "Top 15%",
      idp: "44 Jam",
      idpNote: "Target 40 Jam ✓",
      etik: "100%",
      etikNote: "Bebas Pelanggaran",
    },
    competencies: [
      { name: "Kepemimpinan Strategis", pct: 82, target: "80%" },
      { name: "Penanganan Klaim & Penjaminan", pct: 89, target: "85%" },
      { name: "Governance & Risk Compliance (GRC)", pct: 85, target: "80%" },
      { name: "Inovasi Digital & Adaptasi AI", pct: 88, target: "80%" },
    ],
  }
];

// Mock datasets for Hukum
const MOCK_HUKUM_PERKARA = [
  { noPerkara: "842/Pdt.G/2024/PN.Jkt.SEL", namaPerkara: "Gugatan Nasabah Ex BPR Nusantara", jenis: "Perdata", tingkat: "Tingkat Pertama", status: "Menang", nilai: "Rp 1.450 M" },
  { noPerkara: "215/Pdt.G/2025/PN.Sby", namaPerkara: "Sengketa Aset BPR Candra", jenis: "Perdata", tingkat: "Tingkat Banding", status: "Ongoing", nilai: "Rp 320 M" },
  { noPerkara: "104/Pdt.G/2024/PN.Mdn", namaPerkara: "Gugatan PT Mitra Sentosa Utama", jenis: "Perdata", tingkat: "Tingkat Pertama", status: "Menang", nilai: "Rp 890 M" },
  { noPerkara: "512/Pdt.Plw/2023/PN.Jkt.Pst", namaPerkara: "Perlawanan Kurator Pacific Finance", jenis: "Niaga", tingkat: "Tingkat Kasasi", status: "Menang", nilai: "Rp 210 M" },
  { noPerkara: "329/G/2024/PTUN.JKT", namaPerkara: "Gugatan Penetapan Bank Gagal", jenis: "Tata Usaha Negara", tingkat: "Tingkat Pertama", status: "Menang", nilai: "Rp 640 M" }
];

const MOCK_BANK_LIKUIDASI = [
  { namaBank: "PT BPRS Hasanah Mandiri", kode: "41300011", tglCiu: "16 Juli 2026", status: "Proses Likuidasi" },
  { namaBank: "PT BPR Mataram Mitra Manunggal", kode: "32100035", tglCiu: "07 Juli 2026", status: "Proses Likuidasi" },
  { namaBank: "PT BPR Ceper Permata Artha", kode: "3200024", tglCiu: "25 Juni 2026", status: "Proses Likuidasi" },
  { namaBank: "PT BPR Sungai Rumbai", kode: "30800089", tglCiu: "07 April 2026", status: "Proses Likuidasi" },
  { namaBank: "PT BPR Pembangunan Nagari", kode: "30800071", tglCiu: "31 Maret 2026", status: "Tahap Penyelesaian" },
  { namaBank: "PT BPR Koperindo Jaya", kode: "31300225", tglCiu: "09 Maret 2026", status: "Tahap Penyelesaian" }
];

const MOCK_ASURANSI_PESERTA = [
  { nama: "PT Asuransi Jiwa Generasi Baru", jenis: "Asuransi Jiwa", kesiapan: "96%", status: "Memenuhi Syarat" },
  { nama: "PT Asuransi Umum Mega Proteksi", jenis: "Asuransi Umum", kesiapan: "92%", status: "Memenuhi Syarat" },
  { nama: "PT Asuransi Syariah Amanah", jenis: "Syariah", kesiapan: "88%", status: "Verifikasi Data" },
  { nama: "PT Asuransi Jiwa Nusantara Utama", jenis: "Asuransi Jiwa", kesiapan: "84%", status: "Verifikasi Data" },
  { nama: "PT Reasuransi Nasional Mandiri", jenis: "Reasuransi", kesiapan: "98%", status: "Memenuhi Syarat" }
];

const MOCK_KEUANGAN_POS = [
  { kode: "5.1.01", nama: "Belanja Operasional & Penjaminan", pagu: "Rp 1.100 M", realisasi: "Rp 810 M", penyerapan: "73.6%" },
  { kode: "5.1.02", nama: "Pengembangan TI & Sistem On-Prem", pagu: "Rp 650 M", realisasi: "Rp 460 M", penyerapan: "70.7%" },
  { kode: "5.1.03", nama: "Sosialisasi & Edukasi Publik", pagu: "Rp 400 M", realisasi: "Rp 245 M", penyerapan: "61.2%" },
  { kode: "5.1.04", nama: "Operasional Tim Likuidasi & Hukum", pagu: "Rp 300 M", realisasi: "Rp 155 M", penyerapan: "51.6%" }
];

const KEP_COLORS = ['#E0A100', '#F26E22', '#3B82F6', '#8B5CF6', '#D64545', '#10b981', '#64748b'];

export default function DashboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id || "sdm";
  
  // SDM 3 Tabs: "Talent Profile" | "Kepegawaian" | "Absensi"
  const [sdmTab, setSdmTab] = useState<string>(
    id === "absensi" ? "Absensi" : id === "kepegawaian" ? "Kepegawaian" : "Talent Profile"
  );
  
  const [selectedTalentId, setSelectedTalentId] = useState("88102");
  const [searchQuery, setSearchQuery] = useState("");

  const currentTalent = TALENT_EMPLOYEES.find(e => e.id === selectedTalentId) || TALENT_EMPLOYEES[0];

  // Determine Title & Context per ID
  const pageMeta: Record<string, { title: string; category: string; subtitle: string; icon: React.ElementType }> = {
    // 1. Penjaminan Bank
    "penjaminan-lps": { title: "Penjaminan LPS", category: "Penjaminan Bank", subtitle: "Batas Tingkat Bunga & Cakupan Simpanan", icon: ShieldCheck },
    "resolusi-bank": { title: "Resolusi Bank", category: "Penjaminan Bank", subtitle: "Penanganan Bank Bermasalah & Rencana Resolusi", icon: ShieldAlert },
    "pembayaran-klaim": { title: "Pembayaran & Klaim", category: "Penjaminan Bank", subtitle: "Rekonsiliasi Simpanan & Single Customer View (SCV)", icon: Coins },
    "aset-bdl": { title: "Sisa Aset BDL", category: "Penjaminan Bank", subtitle: "Pemberesan & Pemulihan Aset Bank Likuidasi", icon: Landmark },
    "likuidasi": { title: "Bank Dalam Likuidasi", category: "Penjaminan Bank", subtitle: "Daftar Bank Cabut Izin Usaha (CIU) & Likuidasi", icon: Landmark },
    "ics": { title: "Monitoring ICS & SCV", category: "Penjaminan Bank", subtitle: "Proses Klaim Bank Gagal & Rekonsiliasi", icon: ShieldCheck },

    // 2. Penjaminan Asuransi
    "persiapan-kepesertaan": { title: "Persiapan Kepesertaan Asuransi", category: "Penjaminan Asuransi", subtitle: "Kesiapan Regulasi & Integrasi UU P2SK", icon: FileCheck2 },
    "penjaminan-asuransi": { title: "Penjaminan Asuransi", category: "Penjaminan Asuransi", subtitle: "Ruang Lingkup Penjaminan Polis Asuransi", icon: ShieldCheck },
    "resolusi-asuransi": { title: "Resolusi Asuransi", category: "Penjaminan Asuransi", subtitle: "Mekanisme Resolusi Perusahaan Asuransi Bermasalah", icon: ShieldAlert },
    "pembayaran-polis": { title: "Pembayaran Polis", category: "Penjaminan Asuransi", subtitle: "Verifikasi Nilai Tunai & Pembayaran Klaim Polis", icon: Coins },
    "aset-asuransi": { title: "Sisa Aset Asuransi", category: "Penjaminan Asuransi", subtitle: "Penatausahaan Portofolio & Pemulihan Aset", icon: Building },

    // 3. Support & Tata Kelola
    "sdm": { title: "SDM (Sumber Daya Manusia)", category: "Support & Tata Kelola", subtitle: "Talent Snapshot, Struktur Kepegawaian & Presensi", icon: Users },
    "kepegawaian": { title: "SDM (Sumber Daya Manusia)", category: "Support & Tata Kelola", subtitle: "Talent Snapshot, Struktur Kepegawaian & Presensi", icon: Users },
    "absensi": { title: "SDM (Sumber Daya Manusia)", category: "Support & Tata Kelola", subtitle: "Talent Snapshot, Struktur Kepegawaian & Presensi", icon: Clock },
    "keuangan": { title: "Keuangan & Anggaran", category: "Support & Tata Kelola", subtitle: "Pagu vs Realisasi, Penyerapan & Cashflow", icon: Receipt },
    "anggaran-realisasi": { title: "Anggaran & Realisasi", category: "Support & Tata Kelola", subtitle: "Pagu vs Realisasi Belanja Operasional", icon: Receipt },
    "perjalanan-dinas": { title: "Perjalanan Dinas", category: "Support & Tata Kelola", subtitle: "Status Pengajuan SPPD & Pertanggungjawaban SPJ", icon: Briefcase },
    "pj-uang-muka": { title: "PJ Uang Muka", category: "Support & Tata Kelola", subtitle: "Outstanding Uang Muka Kegiatan & Pengadaan", icon: CreditCard },
    "pembayaran": { title: "Pembayaran (SAP/CMS)", category: "Support & Tata Kelola", subtitle: "Antrian Pembayaran SAP & Pembiayaan Vendor", icon: Coins },
    "aset-it": { title: "Aset IT", category: "Support & Tata Kelola", subtitle: "Distribusi Perangkat & Kondisi Aset", icon: MonitorSmartphone },
    "helpdesk": { title: "Ticket Helpdesk", category: "Support & Tata Kelola", subtitle: "Layanan Tiket Dukungan & Insiden TI", icon: AlertTriangle },
    "hukum": { title: "Hukum & Litigasi", category: "Support & Tata Kelola", subtitle: "Status Perkara, Putusan & Nilai Sengketa", icon: Scale },
  };

  const isSdmModule = id === "sdm" || id === "kepegawaian" || id === "absensi";

  const currentMeta = pageMeta[id] || { 
    title: "Modul Analitik Eksekutif", 
    category: "Sistem Informasi & Management", 
    subtitle: "Ringkasan data analitik & operasional LPS", 
    icon: TrendingUp 
  };
  const IconHeader = currentMeta.icon;

  return (
    <div className="flex flex-col min-h-full bg-[#F6F7F9] pb-32 md:pb-12 relative w-full items-center font-sans text-[#172033]">
      <div className="w-full max-w-5xl">
        <AppBar title={currentMeta.title} showBack />

        <div className="px-4 sm:px-6 md:px-8 pt-4 space-y-5">
          
          {/* ======================= SDM MODULE (3 TABS: Talent Profile, Kepegawaian, Absensi) ======================= */}
          {isSdmModule && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Top 3-Tab Switcher (Matching User Screenshot) */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-white p-1.5 rounded-2xl shadow-2xs border border-[#EAECF0] w-full">
                {["Talent Profile", "Kepegawaian", "Absensi"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSdmTab(tab)}
                    className={cn(
                      "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-[13px] font-bold transition-all text-center cursor-pointer select-none whitespace-nowrap",
                      sdmTab === tab 
                        ? "bg-[#F56621] text-white shadow-xs" 
                        : "bg-transparent text-[#667085] hover:text-[#172033] hover:bg-[#F9FAFB]"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* TAB 1: TALENT PROFILE */}
              {sdmTab === "Talent Profile" && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  
                  {/* Subordinate / Employee Selector Dropdown */}
                  <div className="bg-white p-4.5 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-0.5">
                        PILIH PEGAWAI / BAWAHAN
                      </label>
                      <p className="text-xs sm:text-[13px] text-[#172033] font-semibold">
                        Tampilkan Talenta Snapshot & Evaluation Matrix
                      </p>
                    </div>

                    <div className="relative w-full sm:w-80">
                      <select
                        value={selectedTalentId}
                        onChange={(e) => setSelectedTalentId(e.target.value)}
                        className="w-full bg-[#F6F7F9] border border-[#EAECF0] rounded-xl px-3.5 py-2 text-xs sm:text-[13px] font-bold text-[#172033] focus:outline-none focus:border-[#F56621] cursor-pointer"
                      >
                        {TALENT_EMPLOYEES.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.nama} ({item.jabatan})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Executive Deep Orange Hero Banner */}
                  <div className="bg-gradient-to-r from-[#D95E15] via-[#C44E0E] to-[#A83D05] text-white rounded-[26px] p-5 sm:p-6 border border-[#EA6722]/30 shadow-[0_4px_16px_rgba(201,71,7,0.18)] relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-xl sm:text-2xl font-black shadow-inner flex-shrink-0">
                          {currentTalent.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{currentTalent.nama}</h2>
                            <span className="bg-white/20 text-white border border-white/30 text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase shadow-2xs">
                              {currentTalent.tag}
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-white/90 font-medium">NIP: {currentTalent.id} • {currentTalent.jabatan}</p>
                          <p className="text-[11px] text-white/70 mt-0.5">{currentTalent.direktorat}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 self-stretch sm:self-auto justify-around">
                        <div className="text-center px-2">
                          <span className="text-[9.5px] text-white/80 uppercase font-bold block">Rating Kinerja</span>
                          <span className="text-base sm:text-lg font-black text-white">{currentTalent.rating}</span>
                        </div>
                        <div className="h-7 w-px bg-white/25" />
                        <div className="text-center px-2">
                          <span className="text-[9.5px] text-white/80 uppercase font-bold block">Promosi Ready</span>
                          <span className="text-xs sm:text-sm font-bold text-amber-200">{currentTalent.ready}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 KPI Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                    {[
                      { label: "Performance Rating", val: currentTalent.kpis.rating, note: currentTalent.kpis.ratingNote, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                      { label: "Potensi Kepemimpinan", val: currentTalent.kpis.potensi, note: currentTalent.kpis.potensiNote, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
                      { label: "Pembelajaran (IDP)", val: currentTalent.kpis.idp, note: currentTalent.kpis.idpNote, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
                      { label: "Kepatuhan Kode Etik", val: currentTalent.kpis.etik, note: currentTalent.kpis.etikNote, icon: CheckCircle, color: "text-amber-600", bg: "bg-amber-50" },
                    ].map((kpi, idx) => {
                      const Icon = kpi.icon;
                      return (
                        <div key={idx} className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-[#667085]">{kpi.label}</span>
                            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", kpi.bg, kpi.color)}>
                              <Icon size={15} />
                            </div>
                          </div>
                          <div>
                            <p className="text-lg sm:text-xl font-black text-[#172033] tracking-tight">{kpi.val}</p>
                            <p className="text-[11px] font-bold text-emerald-600 mt-0.5">{kpi.note}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 9-Box Talent Grid & Competencies */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* 9-Box Talent Matrix */}
                    <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0]">
                      <div className="flex items-center justify-between mb-3.5">
                        <div>
                          <h3 className="text-sm font-bold text-[#172033]">Matriks Talenta (9-Box Grid)</h3>
                          <p className="text-xs text-[#667085]">Pemetaan Potensi vs Kinerja Pegawai</p>
                        </div>
                        <span className="text-[11px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200 px-3 py-0.5 rounded-full">
                          Kategori: {currentTalent.boxName}
                        </span>
                      </div>

                      {/* 3x3 Grid Visualizer */}
                      <div className="grid grid-cols-3 gap-2 bg-[#F6F7F9] p-2.5 rounded-2xl border border-[#EAECF0]">
                        {[
                          { title: "High Pot", sub: "Enigma", box: 0 },
                          { title: "High Pot", sub: "Growth Driver", box: 1 },
                          { title: "High Pot", sub: "Star Talent", box: 2 },
                          { title: "Med Pot", sub: "Dilemma", box: 3 },
                          { title: "Med Pot", sub: "Core Performer", box: 4 },
                          { title: "Med Pot", sub: "High Performer", box: 5 },
                          { title: "Low Pot", sub: "Under Performer", box: 6 },
                          { title: "Low Pot", sub: "Effective", box: 7 },
                          { title: "Low Pot", sub: "Trusted Pro", box: 8 },
                        ].map((cell, cIdx) => {
                          const isActive = cell.box === currentTalent.boxIndex;
                          return (
                            <div
                              key={cIdx}
                              className={cn(
                                "p-2 rounded-xl min-h-[65px] flex flex-col justify-center items-center text-center transition-all",
                                isActive
                                  ? "bg-gradient-to-br from-[#F56621] to-amber-500 text-white font-bold shadow-md scale-102 ring-2 ring-[#F56621]/40"
                                  : "bg-white text-[#475467] border border-[#EAECF0]"
                              )}
                            >
                              <span className="text-[9px] opacity-80 uppercase tracking-wider block font-semibold">{cell.title}</span>
                              <span className="text-[10.5px] font-bold mt-0.5 leading-tight">{cell.sub}</span>
                              {isActive && <span className="text-[8.5px] bg-white/25 px-1.5 py-0.2 rounded-full mt-1">Posisi {currentTalent.nama.split(' ')[0]} ✨</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Competency Profile */}
                    <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[#172033] mb-0.5">Profil Kompetensi Utama</h3>
                        <p className="text-xs text-[#667085] mb-4">Pencapaian standar kompetensi {currentTalent.nama}</p>

                        <div className="space-y-3.5">
                          {currentTalent.competencies.map((comp, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-xs font-bold mb-1">
                                <span className="text-[#172033]">{comp.name}</span>
                                <span className="text-[#F56621]">{comp.pct}% <span className="text-[#98A2B3] font-normal text-[10.5px]">(Target: {comp.target})</span></span>
                              </div>
                              <div className="w-full h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#F56621] to-amber-500 rounded-full" style={{ width: `${comp.pct}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-[#EAECF0] flex items-center justify-between text-xs">
                        <span className="text-[#667085] font-medium">Individual Development Plan (IDP)</span>
                        <span className="font-bold text-[#027A48] bg-[#ECFDF3] border border-[#A6F4C5] px-2.5 py-0.5 rounded-full">3 Program Aktif</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: KEPEGAWAIAN */}
              {sdmTab === "Kepegawaian" && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  {/* Top Filter & Status Pegawai */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Filters */}
                    <div className="flex flex-col gap-3 bg-white p-4.5 rounded-2xl shadow-2xs border border-[#EAECF0] lg:w-[240px]">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-[#667085]">Unit Kerja</label>
                        <select className="bg-[#F6F7F9] border border-[#EAECF0] px-3 py-2 rounded-xl text-xs font-semibold text-[#172033] focus:outline-none w-full">
                          <option>Semua Unit</option>
                          <option>Group Pengembangan & Operasional TI</option>
                          <option>Group Penjaminan & Resolusi</option>
                          <option>Group Hukum & GRC</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-[#667085]">Jenis Kelamin</label>
                        <select className="bg-[#F6F7F9] border border-[#EAECF0] px-3 py-2 rounded-xl text-xs font-semibold text-[#172033] focus:outline-none w-full">
                          <option>Semua</option>
                          <option>Laki-laki</option>
                          <option>Perempuan</option>
                        </select>
                      </div>
                    </div>

                    {/* KPI Status Pegawai */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-[#FFFAEB] border border-[#FEDF89] rounded-2xl p-4.5 shadow-2xs">
                        <h3 className="text-xs font-bold uppercase text-[#B54708] mb-3 border-b border-[#FEDF89] pb-1.5">
                          Status Pegawai
                        </h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between font-extrabold text-[#172033]">
                            <span>Total Pegawai</span>
                            <span>1,240 Orang</span>
                          </div>
                          <div className="flex justify-between font-medium text-[#344054]">
                            <span>Pegawai Tetap</span>
                            <span>780 Orang (63%)</span>
                          </div>
                          <div className="flex justify-between font-medium text-[#344054]">
                            <span>Tenaga Alih Daya</span>
                            <span>460 Orang (37%)</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#ECFDF3] border border-[#A6F4C5] rounded-2xl p-4.5 shadow-2xs">
                        <h3 className="text-xs font-bold uppercase text-[#027A48] mb-3 border-b border-[#A6F4C5] pb-1.5">
                          Rasio Jenjang Jabatan
                        </h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between font-extrabold text-[#172033]">
                            <span>Struktural / Eselon</span>
                            <span>124 Pejabat</span>
                          </div>
                          <div className="flex justify-between font-medium text-[#344054]">
                            <span>Fungsional & Spesialis</span>
                            <span>656 Pegawai</span>
                          </div>
                          <div className="flex justify-between font-medium text-[#344054]">
                            <span>Pelaksana Teknis</span>
                            <span>460 Pegawai</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Masa Kerja Pegawai */}
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0] lg:w-[260px]">
                      <h3 className="text-xs font-bold uppercase text-[#667085] mb-3 border-b border-[#EAECF0] pb-1.5">
                        Senioritas Pegawai (Tahun)
                      </h3>
                      <div className="space-y-2">
                        {MOCK_KEP_MASA_KERJA.map((row, i) => (
                          <div key={i} className="flex justify-between items-center text-xs font-medium text-[#172033]">
                            <span className="truncate pr-2">{row.nama}</span>
                            <span className="bg-[#ECFDF3] text-[#027A48] font-bold px-2 py-0.5 rounded-md border border-[#A6F4C5] text-[11px]">
                              {row.value} Th
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status Chart */}
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <h3 className="text-xs font-bold text-[#172033] mb-3 text-center">Distribusi Status per Grup</h3>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={MOCK_KEP_STATUS} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} dy={5} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                            <Tooltip contentStyle={{ borderRadius: '10px', fontSize: '11px', border: '1px solid #eaecf0' }} />
                            <Bar dataKey="tetap" fill="#172033" radius={[4, 4, 0, 0]} name="Tetap" />
                            <Bar dataKey="outsource" fill="#F56621" radius={[4, 4, 0, 0]} name="Outsource" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Gender Chart */}
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <h3 className="text-xs font-bold text-[#172033] mb-3 text-center">Komposisi Gender</h3>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={MOCK_KEP_GENDER} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} dy={5} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                            <Tooltip contentStyle={{ borderRadius: '10px', fontSize: '11px', border: '1px solid #eaecf0' }} />
                            <Bar dataKey="male" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Laki-laki" />
                            <Bar dataKey="female" fill="#EC4899" radius={[4, 4, 0, 0]} name="Perempuan" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Usia Pie Chart */}
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <h3 className="text-xs font-bold text-[#172033] mb-3 text-center">Kelompok Usia Pegawai</h3>
                      <div className="h-[150px] w-full relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={MOCK_KEP_USIA} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" stroke="none">
                              {MOCK_KEP_USIA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={KEP_COLORS[index % KEP_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '10px', fontSize: '11px', border: '1px solid #eaecf0' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2">
                        {MOCK_KEP_USIA.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: KEP_COLORS[idx % KEP_COLORS.length] }} />
                            <span className="text-[10px] text-[#667085]">{item.name} th</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Data Table Pegawai */}
                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#172033]">Daftar Pegawai & Jabatan</h3>
                      <div className="relative w-48 sm:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
                        <input
                          type="text"
                          placeholder="Cari pegawai..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#F6F7F9] border border-[#EAECF0] rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#172033]"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#667085] font-bold uppercase">
                            <th className="p-3">Nama Pegawai</th>
                            <th className="p-3">Kelamin</th>
                            <th className="p-3">Grup / Unit</th>
                            <th className="p-3">Masa Kerja</th>
                            <th className="p-3">Pangkat</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                          {MOCK_KEP_DETAIL
                            .filter(row => row.nama.toLowerCase().includes(searchQuery.toLowerCase()) || row.grup.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((row, idx) => (
                              <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                                <td className="p-3 font-bold text-[#172033]">{row.nama}</td>
                                <td className="p-3 text-[#667085]">{row.kelamin}</td>
                                <td className="p-3 text-[#344054]">{row.grup}</td>
                                <td className="p-3 font-semibold text-[#172033]">{row.masa} Tahun</td>
                                <td className="p-3 font-medium text-[#172033]">{row.pangkat}</td>
                                <td className="p-3 text-right">
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-full font-bold text-[10px] border",
                                    row.status === "Pegawai Tetap" ? "bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]" : "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]"
                                  )}>
                                    {row.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ABSENSI */}
              {sdmTab === "Absensi" && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#ECFDF3] border border-[#A6F4C5] rounded-2xl p-4.5 shadow-2xs flex flex-col justify-center items-center">
                      <span className="text-xs font-bold text-[#027A48] uppercase mb-1">Rata-Rata Durasi Kerja</span>
                      <div className="flex items-center gap-2">
                        <Clock className="w-7 h-7 text-[#027A48]" />
                        <h2 className="text-3xl font-black text-[#027A48]">09:38<span className="text-sm ml-1 text-[#027A48]/70">14</span></h2>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Tingkat Kehadiran</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">98.2%</p>
                      <span className="text-xs text-[#027A48] font-bold">Bulan Berjalan 2026</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Keterlambatan</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">1.8%</p>
                      <span className="text-xs text-[#667085] font-medium">Toleransi & Izin Dinas</span>
                    </div>
                  </div>

                  {/* Detail Absensi Table */}
                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <h3 className="text-sm font-bold text-[#172033]">Rekap Log Kehadiran Terkini</h3>
                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#667085] font-bold uppercase">
                            <th className="p-3">Nama Pegawai</th>
                            <th className="p-3">Unit Kerja</th>
                            <th className="p-3">Tanggal</th>
                            <th className="p-3">Jam Masuk</th>
                            <th className="p-3">Jam Keluar</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                          {MOCK_ABSENSI_DETAIL.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                              <td className="p-3 font-bold text-[#172033]">{row.nama}</td>
                              <td className="p-3 text-[#667085]">{row.grup}</td>
                              <td className="p-3 text-[#344054]">{row.date}</td>
                              <td className="p-3 font-mono font-bold text-[#027A48]">{row.masuk}</td>
                              <td className="p-3 font-mono font-bold text-[#3538CD]">{row.keluar}</td>
                              <td className="p-3 text-right">
                                <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================= OTHER MODULES (KEUANGAN, HUKUM, LIKUIDASI, ETC) ======================= */}
          {!isSdmModule && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* KEUANGAN & ANGGARAN */}
              {(id === "keuangan" || id === "anggaran-realisasi") && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Pagu Anggaran</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">Rp 2.45 T</p>
                      <span className="text-xs text-[#667085] font-medium">Tahun Anggaran 2026</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Realisasi s.d Juli</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">Rp 1.67 T</p>
                      <span className="text-xs font-bold text-[#027A48]">68.4% Penyerapan</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Sisa Anggaran</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">Rp 780 M</p>
                      <span className="text-xs text-[#667085] font-medium">Cadangan Operasional</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[#172033] flex items-center gap-2">
                          <Layers size={16} className="text-[#F56621]" />
                          Rincian Mata Anggaran Utama
                        </h3>
                        <p className="text-xs text-[#667085]">Data realisasi belanja modal & operasional tahun 2026</p>
                      </div>
                      <span className="text-xs font-bold text-[#027A48] bg-[#ECFDF3] border border-[#A6F4C5] px-2.5 py-0.5 rounded-full">
                        On Track
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#667085] font-bold uppercase">
                            <th className="p-3">Kode Pos</th>
                            <th className="p-3">Nama Mata Anggaran</th>
                            <th className="p-3">Pagu</th>
                            <th className="p-3">Realisasi</th>
                            <th className="p-3 text-right">% Serap</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                          {MOCK_KEUANGAN_POS.map((pos, idx) => (
                            <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                              <td className="p-3 font-mono font-bold text-[#172033]">{pos.kode}</td>
                              <td className="p-3 font-medium text-[#344054]">{pos.nama}</td>
                              <td className="p-3 font-bold text-[#172033]">{pos.pagu}</td>
                              <td className="p-3 font-semibold text-[#027A48]">{pos.realisasi}</td>
                              <td className="p-3 text-right font-extrabold text-[#172033]">{pos.penyerapan}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* HUKUM & LITIGASI */}
              {id === "hukum" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Total Perkara</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">86</p>
                      <span className="text-xs text-[#667085] font-medium">64 Inkracht • 22 Ongoing</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Tingkat Menang</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">90.5%</p>
                      <span className="text-xs font-bold text-[#027A48]">Putusan Menguntungkan LPS</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Nilai Sengketa Tertinggi</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">Rp 1.45 T</p>
                      <span className="text-xs text-[#667085] font-medium">Ex BPR Nusantara</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#172033]">Daftar Perkara Signifikan</h3>
                      <div className="relative w-48 sm:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
                        <input
                          type="text"
                          placeholder="Cari perkara..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#F6F7F9] border border-[#EAECF0] rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#172033]"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#667085] font-bold uppercase">
                            <th className="p-3">No. Perkara</th>
                            <th className="p-3">Nama Perkara</th>
                            <th className="p-3">Jenis</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Nilai Sengketa</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                          {MOCK_HUKUM_PERKARA
                            .filter(row => row.namaPerkara.toLowerCase().includes(searchQuery.toLowerCase()) || row.noPerkara.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((row, idx) => (
                              <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                                <td className="p-3 font-mono font-bold text-[#172033]">{row.noPerkara}</td>
                                <td className="p-3 font-semibold text-[#172033]">{row.namaPerkara}</td>
                                <td className="p-3 text-[#667085] font-medium">{row.jenis}</td>
                                <td className="p-3">
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-full font-bold text-[10px] border",
                                    row.status === "Menang" ? "bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]" : "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]"
                                  )}>
                                    {row.status}
                                  </span>
                                </td>
                                <td className="p-3 text-right font-extrabold text-[#172033]">{row.nilai}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PERJALANAN DINAS */}
              {id === "perjalanan-dinas" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Total Pengajuan SPPD</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">{MOCK_PERDIN_KPI.perdin}</p>
                      <span className="text-xs text-[#027A48] font-bold">Periode Berjalan 2026</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Uang Muka Terpakai</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">{MOCK_PERDIN_KPI.um_kegiatan}</p>
                      <span className="text-xs text-[#667085] font-medium">Kegiatan Operasional</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">SPJ Belum Ditutup</span>
                      <p className="text-3xl font-extrabold text-[#D92D20] mt-1">3</p>
                      <span className="text-xs text-[#D92D20] font-bold">Perlu Tindak Lanjut</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <h3 className="text-sm font-bold text-[#172033]">Daftar Perjalanan Dinas Terkini</h3>
                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#667085] font-bold uppercase">
                            <th className="p-3">No. SPPD</th>
                            <th className="p-3">Pemohon</th>
                            <th className="p-3">Unit</th>
                            <th className="p-3">Tgl Berangkat</th>
                            <th className="p-3 text-right">Batas SPJ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                          {MOCK_PERDIN_DETAIL.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                              <td className="p-3 font-mono font-bold text-[#172033]">{row.no}</td>
                              <td className="p-3 font-semibold text-[#172033]">{row.pemohon}</td>
                              <td className="p-3 text-[#667085]">{row.grup}</td>
                              <td className="p-3 text-[#344054]">{row.tgl}</td>
                              <td className="p-3 text-right font-bold text-[#F56621]">{row.spj}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PJ UANG MUKA */}
              {id === "pj-uang-muka" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Total Uang Muka</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">269</p>
                      <span className="text-xs text-[#027A48] font-bold">Disetujui & Berjalan</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">SPJ Dalam Proses</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">12</p>
                      <span className="text-xs text-[#667085] font-medium">Verifikasi Keuangan</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Jatuh Tempo PJ</span>
                      <p className="text-3xl font-extrabold text-[#B54708] mt-1">2</p>
                      <span className="text-xs text-[#B54708] font-bold">Mendekati Batas Waktu</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <h3 className="text-sm font-bold text-[#172033]">Daftar Pertanggungjawaban Uang Muka</h3>
                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#667085] font-bold uppercase">
                            <th className="p-3">No. Pengajuan</th>
                            <th className="p-3">Pemohon</th>
                            <th className="p-3">Cost Center</th>
                            <th className="p-3">Tgl Aju</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                          {MOCK_UM_DETAIL.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                              <td className="p-3 font-mono font-bold text-[#172033]">UM-2026-0{idx+1}</td>
                              <td className="p-3 font-semibold text-[#172033]">{row.pemohon}</td>
                              <td className="p-3 text-[#667085]">{row.cc}</td>
                              <td className="p-3 text-[#344054]">{row.tglAju}</td>
                              <td className="p-3 text-right">
                                <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PEMBAYARAN */}
              {id === "pembayaran" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Total Antrian Pembayaran</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">628</p>
                      <span className="text-xs text-[#027A48] font-bold">Tercatat di SAP/CMS</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Nominal Terbayar</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">Rp 1.67 T</p>
                      <span className="text-xs text-[#667085] font-medium">Realisasi Tahun 2026</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Status Integrasi</span>
                      <p className="text-2xl font-black text-[#027A48] mt-1">SAP Live ✓</p>
                      <span className="text-xs text-[#667085] font-medium">Koneksi Otomatis Real-time</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <h3 className="text-sm font-bold text-[#172033]">Daftar Dokumen Pembayaran SAP</h3>
                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#667085] font-bold uppercase">
                            <th className="p-3">Doc SAP</th>
                            <th className="p-3">Deskripsi</th>
                            <th className="p-3">Penerima / Vendor</th>
                            <th className="p-3">Bank</th>
                            <th className="p-3 text-right">Nominal</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                          {MOCK_PEMBAYARAN_DETAIL.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                              <td className="p-3 font-mono font-bold text-[#172033]">{row.docSap}</td>
                              <td className="p-3 text-[#344054] max-w-[200px] truncate">{row.deskripsi}</td>
                              <td className="p-3 font-semibold text-[#172033]">{row.vendor}</td>
                              <td className="p-3 text-[#667085]">{row.bank}</td>
                              <td className="p-3 text-right font-bold text-[#172033]">Rp {row.amount}</td>
                              <td className="p-3 text-right">
                                <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5]">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* BANK MODULES */}
              {(id === "likuidasi" || id === "aset-bdl" || id === "resolusi-bank") && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">Total Bank Likuidasi</span>
                      <p className="text-3xl font-black text-[#172033] mt-1">16 BPR/BPRS</p>
                      <span className="text-xs text-[#667085] font-medium">Dalam Pengawasan & Likuidasi LPS</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">CIU Terbaru</span>
                      <p className="text-2xl font-black text-[#172033] mt-1">16 Juli 2026</p>
                      <span className="text-xs font-bold text-[#027A48]">PT BPRS Hasanah Mandiri</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">Recovery Nilai Aset</span>
                      <p className="text-3xl font-black text-[#172033] mt-1">Rp 420 M</p>
                      <span className="text-xs text-[#667085] font-medium">100% Tim Likuidasi Aktif</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-extrabold text-[#172033] flex items-center gap-2">
                          <Building2 size={18} className="text-[#F56621]" />
                          Daftar Bank Dalam Likuidasi (BDL)
                        </h3>
                        <p className="text-xs text-[#667085]">Data resmi Cabut Izin Usaha (CIU) & Kode Kepesertaan LPS</p>
                      </div>

                      <div className="relative w-full sm:w-72">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
                        <input
                          type="text"
                          placeholder="Cari bank, kode, atau CIU..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#F6F7F9] border border-[#EAECF0] rounded-xl pl-8 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-[#172033]"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#172033] font-bold uppercase tracking-wider">
                            <th className="p-3.5">Nama Bank</th>
                            <th className="p-3.5">Kode Kepesertaan</th>
                            <th className="p-3.5">Tanggal CIU</th>
                            <th className="p-3.5 text-right">Status Penanganan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0] font-medium text-[#172033]">
                          {MOCK_BANK_LIKUIDASI
                            .filter(b => 
                              b.namaBank.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              b.kode.includes(searchQuery) ||
                              b.tglCiu.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((b, idx) => (
                              <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                                <td className="p-3.5 font-bold">{b.namaBank}</td>
                                <td className="p-3.5 font-mono font-bold text-[#475467] bg-[#F2F4F7] px-2 py-0.5 rounded inline-block my-1">{b.kode}</td>
                                <td className="p-3.5 text-[#667085]">{b.tglCiu}</td>
                                <td className="p-3.5 text-right">
                                  <span className={cn(
                                    "px-2.5 py-1 rounded-full text-[10.5px] font-bold inline-block border",
                                    b.status === "Proses Likuidasi" ? "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]" :
                                    b.status === "Tahap Penyelesaian" ? "bg-[#EEF4FF] text-[#3538CD] border-[#C7D7FE]" :
                                    "bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]"
                                  )}>
                                    {b.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ASURANSI MODULES */}
              {(id.includes("asuransi") || id === "persiapan-kepesertaan" || id === "pembayaran-polis") && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Kesiapan Program PPP</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">94.8%</p>
                      <span className="text-xs text-[#667085] font-medium">Mandat UU P2SK 2026-2028</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Perusahaan Terdaftar</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">54 Entitas</p>
                      <span className="text-xs font-bold text-[#027A48]">Asuransi Jiwa & Umum</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4.5 shadow-2xs border border-[#EAECF0]">
                      <span className="text-[11px] font-bold text-[#667085] uppercase">Fokus Proteksi</span>
                      <p className="text-3xl font-extrabold text-[#172033] mt-1">Polis Manfaat</p>
                      <span className="text-xs text-[#667085] font-medium">Penjaminan Nilai Tunai & Klaim</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-2xs border border-[#EAECF0] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#172033]">Daftar Kesiapan Kepesertaan Asuransi</h3>
                      <div className="relative w-48 sm:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
                        <input
                          type="text"
                          placeholder="Cari perusahaan..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#F6F7F9] border border-[#EAECF0] rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#172033]"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EAECF0] bg-[#F9FAFB] text-[#667085] font-bold uppercase">
                            <th className="p-3">Perusahaan Asuransi</th>
                            <th className="p-3">Jenis Portofolio</th>
                            <th className="p-3">Indeks Kesiapan</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAECF0]">
                          {MOCK_ASURANSI_PESERTA
                            .filter(row => row.nama.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((row, idx) => (
                              <tr key={idx} className="hover:bg-[#F6F7F9] transition-colors">
                                <td className="p-3 font-bold text-[#172033]">{row.nama}</td>
                                <td className="p-3 text-[#667085]">{row.jenis}</td>
                                <td className="p-3 font-semibold text-[#172033]">{row.kesiapan}</td>
                                <td className="p-3 text-right">
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-full font-bold text-[10px] border",
                                    row.status === "Memenuhi Syarat" ? "bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]" : "bg-[#FFFAEB] text-[#B54708] border-[#FEDF89]"
                                  )}>
                                    {row.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
