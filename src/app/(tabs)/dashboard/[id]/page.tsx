"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { use } from "react";
import AppBar from "@/components/AppBar";
import { 
  MOCK_CHART_TIMELINE, 
  MOCK_CHART_PIE, 
  MOCK_CHART_BAR_HORIZONTAL,
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
  MOCK_UM_STATUS_PENGADAAN,
  MOCK_UM_STATUS_REIMBURSE_KEGIATAN,
  MOCK_UM_STATUS_REIMBURSE_ASET,
  MOCK_UM_SPJ_KEGIATAN,
  MOCK_UM_SPJ_PENGADAAN,
  MOCK_UM_SLA_KEGIATAN,
  MOCK_UM_SLA_PENGADAAN,
  MOCK_UM_DETAIL
} from "@/lib/mock/data";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart 
} from 'recharts';
import { Filter, Users, TrendingUp, AlertTriangle, MonitorSmartphone, CheckCircle, XCircle, Info, Clock, Sparkles, Scale, Search, Calendar, MapPin, CreditCard, Receipt, ShieldCheck, Database } from "lucide-react";

const COLORS = ['#3B82F6', '#1E9E6A', '#D64545', '#E0A100', '#8B5CF6'];
const ASET_COLORS = ['#E0A100', '#F26E22', '#3B82F6', '#D64545'];
const ABSEN_COLORS = ['#3B82F6', '#1E9E6A', '#E0A100', '#D64545', '#8B5CF6'];

// Mock Datasets for Hukum & Litigasi Dashboard (Distinct Dummy Data)
const MOCK_HUKUM_STATUS = [
  { name: 'Inkracht', value: 64, color: '#1B355E' },
  { name: 'Ongoing', value: 22, color: '#F26E22' },
];

const MOCK_HUKUM_PUTUSAN = [
  { name: 'Menang', value: 48, color: '#10B981' },
  { name: 'Ongoing', value: 22, color: '#1E3A8A' },
  { name: 'Dicabut', value: 9, color: '#0F172A' },
  { name: 'Kalah', value: 5, color: '#EF4444' },
  { name: 'Bebas', value: 2, color: '#06B6D4' },
];

const MOCK_HUKUM_KEDUDUKAN = [
  { name: 'Tergugat', value: 38, fill: '#3B82F6' },
  { name: 'Penggugat', value: 19, fill: '#1E3A8A' },
  { name: 'Turut Tergugat', value: 14, fill: '#F26E22' },
  { name: 'Pemohon', value: 8, fill: '#8B5CF6' },
  { name: 'Turut Terlawan', value: 4, fill: '#EC4899' },
  { name: 'Pelapor', value: 3, fill: '#475569' },
];

const MOCK_HUKUM_NILAI_TERTINGGI = [
  { name: 'Ex-BPR Nusantara', nilai: 1.45 },
  { name: 'PT Mitra Sentosa', nilai: 0.89 },
  { name: 'Gugatan Klaim Deposito A', nilai: 0.54 },
  { name: 'Sengketa BPR Candra', nilai: 0.32 },
  { name: 'Kurator Pacific', nilai: 0.21 },
  { name: 'PT Karya Utama', nilai: 0.15 },
  { name: 'BPR Sejahtera', nilai: 0.08 },
];

const MOCK_HUKUM_TINGKATAN = [
  { name: 'Tingkat Pertama', value: 42, color: '#EF4444' },
  { name: 'Tingkat Kasasi', value: 18, color: '#0284C7' },
  { name: 'Tingkat Banding', value: 14, color: '#F59E0B' },
  { name: 'Peninjauan Kembali', value: 8, color: '#B45309' },
  { name: 'Belum Diisi', value: 4, color: '#475569' },
];

const MOCK_HUKUM_JENIS = [
  { name: 'Perdata', value: 58, color: '#EF4444' },
  { name: 'Pidana', value: 12, color: '#0284C7' },
  { name: 'Pajak', value: 7, color: '#F59E0B' },
  { name: 'Niaga', value: 5, color: '#06B6D4' },
  { name: 'Judicial Review', value: 3, color: '#8B5CF6' },
  { name: 'PTUN / PHI', value: 1, color: '#EC4899' },
];

const MOCK_HUKUM_KLASIFIKASI = [
  { name: 'Klaim Penjaminan', value: 46, color: '#EF4444' },
  { name: 'Likuidasi Bank', value: 18, color: '#0284C7' },
  { name: 'Penyelamatan', value: 12, color: '#10B981' },
  { name: 'Tindak Pidana Perbankan', value: 6, color: '#1E3A8A' },
  { name: 'Lain-lain', value: 4, color: '#475569' },
];

const MOCK_HUKUM_WILAYAH = [
  { wilayah: 'DKI Jakarta', jumlah: 29 },
  { wilayah: 'Jawa Barat', jumlah: 18 },
  { wilayah: 'Jawa Timur', jumlah: 14 },
  { wilayah: 'Sumatra Utara', jumlah: 10 },
  { wilayah: 'Sulawesi Selatan', jumlah: 7 },
  { wilayah: 'Bali', jumlah: 5 },
  { wilayah: 'Banten', jumlah: 3 },
];

const MOCK_HUKUM_DURASI = [
  { durasi: '0-90 Hari', jumlah: 8, fill: '#3B82F6' },
  { durasi: '91-180 Hari', jumlah: 12, fill: '#1E3A8A' },
  { durasi: '181-270 Hari', jumlah: 14, fill: '#F26E22' },
  { durasi: '271-360 Hari', jumlah: 10, fill: '#8B5CF6' },
  { durasi: '360-720 Hari', jumlah: 16, fill: '#EC4899' },
  { durasi: '> 720 Hari', jumlah: 26, fill: '#4C1D95' },
];

const MOCK_HUKUM_PERKARA_TABLE = [
  {
    noPerkara: "842/Pdt.G/2024/PN.Jkt.SEL",
    namaPerkara: "Gugatan Nasabah Ex BPR Nusantara",
    tahun: 2024,
    jenis: "Perdata",
    tingkat: "Tingkat Pertama",
    status: "Menang",
    nilai: "Rp 1.450.000.000.000"
  },
  {
    noPerkara: "215/Pdt.G/2025/PN.Sby Jo. 88/Pdt/2025/PT.Sby",
    namaPerkara: "Sengketa Aset BPR Candra",
    tahun: 2025,
    jenis: "Perdata",
    tingkat: "Tingkat Banding",
    status: "Ongoing",
    nilai: "Rp 320.000.000.000"
  },
  {
    noPerkara: "104/Pdt.G/2024/PN.Mdn",
    namaPerkara: "Gugatan PT Mitra Sentosa Utama",
    tahun: 2024,
    jenis: "Perdata",
    tingkat: "Tingkat Pertama",
    status: "Menang",
    nilai: "Rp 890.000.000.000"
  },
  {
    noPerkara: "512/Pdt.Plw/2023/PN.Jkt.Pst",
    namaPerkara: "Perlawanan Kurator PT Pacific Finance",
    tahun: 2023,
    jenis: "Niaga",
    tingkat: "Tingkat Kasasi",
    status: "Menang",
    nilai: "Rp 210.000.000.000"
  },
  {
    noPerkara: "94/Pdt.G/2025/PN.Bdg",
    namaPerkara: "Gugatan Penjaminan Klaim Sdr. Hendra",
    tahun: 2025,
    jenis: "Perdata",
    tingkat: "Tingkat Pertama",
    status: "Ongoing",
    nilai: "Rp 75.000.000.000"
  },
  {
    noPerkara: "301/Pdt.G/2022/PN.Smg",
    namaPerkara: "Gugatan Debitur Macet BPR Sejahtera",
    tahun: 2022,
    jenis: "Perdata",
    tingkat: "Peninjauan Kembali",
    status: "Kalah",
    nilai: "Rp 48.000.000.000"
  }
];

function HukumDashboard() {
  const [activeTab, setActiveTab] = useState("Perkara");
  const tabs = ["Perkara", "Bantuan Hukum", "Kajian Litigasi", "Agenda"];

  // Filter States
  const [statusFilter, setStatusFilter] = useState("All");
  const [jenisFilter, setJenisFilter] = useState("All");
  const [kedudukanFilter, setKedudukanFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTable = MOCK_HUKUM_PERKARA_TABLE.filter((row) => {
    const matchSearch = row.namaPerkara.toLowerCase().includes(searchQuery.toLowerCase()) || row.noPerkara.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || row.status.toLowerCase() === statusFilter.toLowerCase();
    const matchJenis = jenisFilter === "All" || row.jenis.toLowerCase() === jenisFilter.toLowerCase();
    return matchSearch && matchStatus && matchJenis;
  });

  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-white p-2 rounded-2xl shadow-sm border border-slate-100 touch-pan-x flex-nowrap w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all shrink-0 md:flex-1 text-center cursor-pointer select-none",
              activeTab === tab
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-transparent text-muted hover:bg-slate-50 hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Perkara" ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Filter Controls Bar */}
          <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-ink flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-600" />
                Filter Data Perkara & Litigasi
              </h3>
              <span className="text-[11px] font-medium text-muted">Data terintegrasi SI Kepatuhan & Hukum LPS</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div>
                <label className="text-[10.5px] font-bold text-muted block mb-1">Tanggal Pengajuan</label>
                <input type="text" defaultValue="2009-01-27 — 2026-06-03" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none" />
              </div>
              <div>
                <label className="text-[10.5px] font-bold text-muted block mb-1">Status Perkara</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
                  <option value="All">All Status</option>
                  <option value="Menang">Menang</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Kalah">Kalah</option>
                </select>
              </div>
              <div>
                <label className="text-[10.5px] font-bold text-muted block mb-1">Jenis Perkara</label>
                <select value={jenisFilter} onChange={(e) => setJenisFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
                  <option value="All">All Jenis</option>
                  <option value="Perdata">Perdata</option>
                  <option value="Pidana">Pidana</option>
                  <option value="Niaga">Niaga</option>
                  <option value="Pajak">Pajak</option>
                </select>
              </div>
              <div>
                <label className="text-[10.5px] font-bold text-muted block mb-1">Kedudukan LPS</label>
                <select value={kedudukanFilter} onChange={(e) => setKedudukanFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
                  <option value="All">All Kedudukan</option>
                  <option value="Tergugat">Tergugat</option>
                  <option value="Penggugat">Penggugat</option>
                  <option value="Turut Tergugat">Turut Tergugat</option>
                </select>
              </div>
              <div>
                <label className="text-[10.5px] font-bold text-muted block mb-1">Mata Uang</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
                  <option>IDR (Rupiah)</option>
                  <option>USD (Dollar)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 1: Status Perkara, Putusan, Kalender Agenda, Kedudukan, 10 Nilai, Perkara Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Perkara Donut Chart */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Status Perkara</h3>
              <div className="h-[210px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MOCK_HUKUM_STATUS} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                      {MOCK_HUKUM_STATUS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Putusan Perkara Donut Chart */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Putusan Perkara</h3>
              <div className="h-[210px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MOCK_HUKUM_PUTUSAN} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value">
                      {MOCK_HUKUM_PUTUSAN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Kalender Agenda (Blue Card matching screenshot) */}
            <div className="bg-gradient-to-br from-[#0052CC] to-[#0747A6] text-white rounded-[28px] p-5 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-white/80">Kalender Agenda</span>
                  <span className="text-[11px] font-bold text-white/90 bg-white/20 px-2.5 py-0.5 rounded-full">Detail</span>
                </div>
                <h4 className="text-[18px] font-bold text-white mb-4">Wednesday, 29 July 2026</h4>

                <div className="space-y-2.5 text-[12px] bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                  <div className="grid grid-cols-3 font-bold text-white/70 border-b border-white/10 pb-1.5 text-[10.5px]">
                    <span>Tanggal</span>
                    <span>Agenda</span>
                    <span>No Perkara</span>
                  </div>
                  {[
                    { tgl: "05 Ags", agd: "Sidang Mediasi", no: "842/Pdt.G/2024" },
                    { tgl: "08 Ags", agd: "Musyawarah Majelis", no: "215/Pdt.G/2025" },
                    { tgl: "12 Ags", agd: "Putusan Banding", no: "104/Pdt.G/2024" },
                  ].map((row, rIdx) => (
                    <div key={rIdx} className="grid grid-cols-3 font-medium text-white/90 text-[11.5px] items-center">
                      <span className="font-semibold text-amber-300">{row.tgl}</span>
                      <span className="truncate">{row.agd}</span>
                      <span className="truncate text-white/70 font-mono text-[10px]">{row.no}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kedudukan LPS Bar Chart */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Kedudukan LPS</h3>
              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_HUKUM_KEDUDUKAN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {MOCK_HUKUM_KEDUDUKAN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 10 Nilai Perkara Tertinggi Bar Chart */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">10 Nilai Perkara Tertinggi</h3>
              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_HUKUM_NILAI_TERTINGGI} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="nilai" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Perkara Executive Summary Card (Amber Card matching screenshot layout) */}
            <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white rounded-[28px] p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-15 translate-x-4 translate-y-4">
                <Scale size={160} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-white/90">Ringkasan Perkara</span>
                  <span className="text-[11px] font-bold bg-white/20 px-3 py-0.5 rounded-full">Detail</span>
                </div>
                <h2 className="text-[32px] font-extrabold tracking-tight text-white mb-4">86 Perkara</h2>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-white/80 block">Total Nilai Tuntutan</span>
                    <span className="text-[17px] font-extrabold text-amber-100 block tracking-tight">
                      Rp 4.250.800.000.000,00
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/20">
                    <span className="text-[11px] font-bold uppercase text-white/80 block">Total Nilai Kontijensi</span>
                    <span className="text-[15px] font-bold text-white block tracking-tight">
                      Rp 38.450.000.000,00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Tingkatan Perkara, Jenis Perkara, Klasifikasi Perkara, Jenis Pengadilan, Jumlah Per Tahun, Sebaran Wilayah */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tingkatan Perkara */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Tingkatan Perkara</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MOCK_HUKUM_TINGKATAN} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                      {MOCK_HUKUM_TINGKATAN.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Jenis Perkara */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Jenis Perkara</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MOCK_HUKUM_JENIS} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                      {MOCK_HUKUM_JENIS.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Klasifikasi Perkara */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Klasifikasi Perkara</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MOCK_HUKUM_KLASIFIKASI} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                      {MOCK_HUKUM_KLASIFIKASI.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Realisasi Lama Penanganan Perkara */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 md:col-span-2">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Realisasi Lama Penanganan Perkara</h3>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_HUKUM_DURASI} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="durasi" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="jumlah" radius={[6, 6, 0, 0]}>
                      {MOCK_HUKUM_DURASI.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Persebaran Wilayah Perkara */}
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100">
              <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Persebaran Wilayah Perkara</h3>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_HUKUM_WILAYAH} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="wilayah" tick={{ fontSize: 9 }} interval={0} angle={-30} textAnchor="end" />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="jumlah" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 3: Tabel Daftar Perkara */}
          <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-sm border border-slate-100 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div>
                <h3 className="text-[16px] font-bold text-ink">Daftar Perkara Hukum LPS</h3>
                <p className="text-[12px] text-muted">Rekapitulasi perkara aktif & selesai</p>
              </div>

              {/* Search Bar inside table */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Cari No. Perkara / Nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-[12.5px] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <Search className="w-4 h-4 text-light absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Interactive Data Table */}
            <div className="overflow-x-auto scrollbar-hide border border-slate-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-amber-600 text-white text-[12px] uppercase tracking-wider">
                    <th className="p-3.5 font-bold rounded-tl-xl">No. Perkara</th>
                    <th className="p-3.5 font-bold">Nama Perkara</th>
                    <th className="p-3.5 font-bold text-center">Tahun</th>
                    <th className="p-3.5 font-bold">Jenis</th>
                    <th className="p-3.5 font-bold">Tingkat</th>
                    <th className="p-3.5 font-bold text-center">Status</th>
                    <th className="p-3.5 font-bold text-right rounded-tr-xl">Nilai Perkara</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[12.5px]">
                  {filteredTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-3.5 font-mono text-[11px] font-semibold text-blue-600 underline cursor-pointer truncate max-w-[180px]">
                        {row.noPerkara}
                      </td>
                      <td className="p-3.5 font-bold text-ink truncate max-w-[220px]">{row.namaPerkara}</td>
                      <td className="p-3.5 text-center font-medium text-muted">{row.tahun}</td>
                      <td className="p-3.5 font-semibold text-slate-700">{row.jenis}</td>
                      <td className="p-3.5 text-muted">{row.tingkat}</td>
                      <td className="p-3.5 text-center">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10.5px] font-extrabold inline-block",
                          row.status === 'Menang' ? 'bg-emerald-100 text-emerald-800' :
                          row.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                        )}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-right text-navy">{row.nilai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === "Bantuan Hukum" ? (
        <BantuanHukumTab />
      ) : activeTab === "Kajian Litigasi" ? (
        <KajianLitigasiTab />
      ) : activeTab === "Agenda" ? (
        <AgendaHukumTab />
      ) : (
        <div className="bg-white rounded-[28px] p-8 text-center shadow-sm border border-slate-100">
          <h3 className="text-[16px] font-bold text-ink mb-1">Tab {activeTab}</h3>
          <p className="text-[13px] text-muted">Data {activeTab} siap diintegrasikan dengan database SI Kepatuhan & Hukum.</p>
        </div>
      )}
    </div>
  );
}

const MOCK_HUKUM_AGENDA_TABLE = [
  {
    tglAgenda: "Thursday, October 29, 2026",
    noPerkara: "SCR No. 117985 (SA/20/19)",
    namaPerkara: "Gugatan Mauritian Asset Recovery (Contempt of Court)",
    kedudukanLps: "Tergugat",
    agenda: "Pemeriksaan Lanjutan Perkara Contempt of Court",
    lokasi: "Pengadilan Negara Mauritius"
  },
  {
    tglAgenda: "Tuesday, July 21, 2026",
    noPerkara: "521/Pdt.G/2026/PN.Sby",
    namaPerkara: "Gugatan Mantan Nasabah BPR Prima Master Bank terkait Mekanisme Pencairan Simpanan Layak Bayar",
    kedudukanLps: "Tergugat",
    agenda: "Sidang Pembacaan Hasil Mediasi & Jawaban",
    lokasi: "PN. Surabaya, Jawa Timur"
  },
  {
    tglAgenda: "Wednesday, July 15, 2026",
    noPerkara: "01/Pdt.Sus LPS/2026/PN Niaga Sby",
    namaPerkara: "Gugatan LPS kepada Mantan Pengurus BPR Wijaya Kusuma (Dalam Likuidasi)",
    kedudukanLps: "Penggugat",
    agenda: "Pembacaan Putusan Sela Majelis Hakim",
    lokasi: "PN. Surabaya, Jawa Timur"
  },
  {
    tglAgenda: "Monday, July 13, 2026",
    noPerkara: "172/Pdt.Sus PHI/2026/PN.Jkt.Pst",
    namaPerkara: "Gugatan PHI Ex-Pegawai BPR Mitra Terkait Pesangon",
    kedudukanLps: "Tergugat",
    agenda: "Penyampaian Duplik dari Para Tergugat & Turut Tergugat",
    lokasi: "PN. Jakarta Pusat, DKI Jakarta"
  },
  {
    tglAgenda: "Tuesday, July 07, 2026",
    noPerkara: "521/Pdt.G/2026/PN.Sby",
    namaPerkara: "Gugatan Mantan Nasabah BPR Prima Master terkait Pembagian Joint Account",
    kedudukanLps: "Tergugat",
    agenda: "Mediasi Lanjutan Tahap II",
    lokasi: "PN. Surabaya, Jawa Timur"
  },
  {
    tglAgenda: "Monday, July 06, 2026",
    noPerkara: "5409/Pdt.G/2025/PA.Jr",
    namaPerkara: "Gugatan Perlawanan (Derden Verzet) terhadap Penetapan Sita Jaminan Perkara BPR",
    kedudukanLps: "Tergugat",
    agenda: "Pendaftaran SKK & Kontra Memori Banding",
    lokasi: "PA. Jember, Jawa Timur"
  },
  {
    tglAgenda: "Tuesday, June 30, 2026",
    noPerkara: "69/Pdt.G/2026/PN.Jkt.Sel",
    namaPerkara: "Gugatan BJTI terkait Produk Investasi & Discretionary Fund PT Deltasekuritas",
    kedudukanLps: "Turut Tergugat",
    agenda: "Sidang Mediasi Lanjutan",
    lokasi: "PN. Jakarta Selatan, DKI Jakarta"
  },
  {
    tglAgenda: "Monday, June 29, 2026",
    noPerkara: "1163/Pdt.G/2023/PN.Jkt.Sel",
    namaPerkara: "Gugatan BPR Central Artha (Ex-Nasabah BPR Legian Likuidasi)",
    kedudukanLps: "Tergugat",
    agenda: "Pendaftaran SKK dan Kontra Memori PK LPS",
    lokasi: "PN. Jakarta Selatan, DKI Jakarta"
  },
  {
    tglAgenda: "Thursday, June 25, 2026",
    noPerkara: "1046/Pdt.G/2023/PN.Dps",
    namaPerkara: "Gugatan PMH terhadap Mantan Pengurus BPR Legian Bali",
    kedudukanLps: "Penggugat",
    agenda: "Pengambilan SKPT & Penyampaian Dokumen Tambahan",
    lokasi: "PN. Denpasar, Bali"
  },
  {
    tglAgenda: "Wednesday, June 24, 2026",
    noPerkara: "6/Pdt.G/2026/PN.Jpa",
    namaPerkara: "Gugatan PMH dari Nasabah PT BPR Bank Jepara Artha (Perseroda)",
    kedudukanLps: "Tergugat",
    agenda: "Pembacaan Putusan Sela Elektronik (e-Court)",
    lokasi: "PN. Jepara, Jawa Tengah"
  },
];

function AgendaHukumTab() {
  const [kedudukanFilter, setKedudukanFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgenda = MOCK_HUKUM_AGENDA_TABLE.filter((row) => {
    const matchSearch = row.namaPerkara.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        row.noPerkara.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        row.agenda.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        row.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKedudukan = kedudukanFilter === "All" || row.kedudukanLps.toLowerCase() === kedudukanFilter.toLowerCase();
    return matchSearch && matchKedudukan;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Controls & Filter Bar */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-bold text-ink flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              Jadwal Persidangan & Agenda Hukum LPS
            </h3>
            <p className="text-[12px] text-muted">Kalender resmi persidangan, mediasi, dan penanganan perkara hukum</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari no. perkara, agenda, lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-[12px] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <select
              value={kedudukanFilter}
              onChange={(e) => setKedudukanFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-bold text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="All">All Kedudukan</option>
              <option value="Penggugat">Penggugat</option>
              <option value="Tergugat">Tergugat</option>
              <option value="Turut Tergugat">Turut Tergugat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Agenda Table Card */}
      <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">
            Total {filteredAgenda.length} Agenda Persidangan Terjadwal
          </span>
          <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            Tahun 2026
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-hide border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-orange to-amber-600 text-white text-[11.5px] uppercase tracking-wider">
                <th className="p-3.5 font-bold rounded-tl-xl whitespace-nowrap">Tanggal Agenda</th>
                <th className="p-3.5 font-bold whitespace-nowrap">No Perkara</th>
                <th className="p-3.5 font-bold">Nama Perkara</th>
                <th className="p-3.5 font-bold whitespace-nowrap text-center">Kedudukan LPS</th>
                <th className="p-3.5 font-bold">Agenda Persidangan</th>
                <th className="p-3.5 font-bold rounded-tr-xl whitespace-nowrap">Lokasi Pengadilan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredAgenda.map((row, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-800 whitespace-nowrap">{row.tglAgenda}</td>
                  <td className="p-3.5 font-mono text-[11px] font-bold text-amber-700 whitespace-nowrap">{row.noPerkara}</td>
                  <td className="p-3.5 font-bold text-ink max-w-[280px]">{row.namaPerkara}</td>
                  <td className="p-3.5 text-center whitespace-nowrap">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10.5px] font-extrabold inline-block",
                      row.kedudukanLps === 'Penggugat' ? 'bg-blue-100 text-blue-800' :
                      row.kedudukanLps === 'Tergugat' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                    )}>
                      {row.kedudukanLps}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-slate-700">{row.agenda}</td>
                  <td className="p-3.5 font-semibold text-slate-600 whitespace-nowrap">{row.lokasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MOCK_KL_STATUS_SLA = [
  { name: 'Lebih Cepat / Sesuai SLA', value: 38, pct: '90.5%' },
  { name: 'Dalam Proses / SLA Normal', value: 4, pct: '9.5%' },
];

const MOCK_KL_STATUS_APPROVAL = [
  { name: 'Done / Disetujui', value: 42, pct: '100%' },
];

const MOCK_KL_UNIT_PENGUSUL = [
  { name: 'GLIT (Grup Litigasi)', count: 32, fill: '#0284C7' },
  { name: 'GRC (Risk & Compliance)', count: 6, fill: '#1E3A8A' },
  { name: 'GDK (Penanganan Klaim)', count: 4, fill: '#F26E22' },
];

const MOCK_KL_JENIS_KAJIAN = [
  { name: 'Legal Memorandum', count: 32, fill: '#0284C7' },
  { name: 'Pendapat Hukum', count: 6, fill: '#0D9488' },
  { name: 'Analisis Litigasi', count: 4, fill: '#EF4444' },
];

const MOCK_KL_PERSONIL = [
  { name: 'Budi Raharjo', count: 18, fill: '#3B82F6' },
  { name: 'Dewi Lestari', count: 12, fill: '#1E3A8A' },
  { name: 'Irfan Syahputra', count: 11, fill: '#F26E22' },
  { name: 'Kautsar Maulana', count: 9, fill: '#7C3AED' },
  { name: 'Wira Bayu Aji', count: 8, fill: '#EC4899' },
  { name: 'Edy Febrian', count: 7, fill: '#4C1D95' },
  { name: 'Farra Diandra', count: 6, fill: '#10B981' },
  { name: 'Leonardo Chandra', count: 4, fill: '#064E3B' },
  { name: 'Chelpina Permata', count: 3, fill: '#0284C7' },
  { name: 'Fajar Kurniawan', count: 2, fill: '#14B8A6' },
];

const MOCK_KL_TABLE = [
  {
    jenisKajian: "Legal Memorandum",
    judulDokumen: "Legal Memorandum Penanganan Perkara Gugatan PMH No. 14/Pdt.G/2026/PN.Jkt.Sel dan 18/Pdt.G/2026/PN.Jkt.Pst",
    tglPenerimaan: "12 Maret 2026",
    unitPengusul: "GLIT",
    tglLengkap: "14 Maret 2026",
    tglPersetujuan: "16 Maret 2026"
  },
  {
    jenisKajian: "Pendapat Hukum",
    judulDokumen: "Analisis terhadap Penerapan Keadilan Restoratif (Restorative Justice) dalam Penanganan Tindak Pidana Sektor Jasa Keuangan",
    tglPenerimaan: "20 Februari 2026",
    unitPengusul: "GLIT",
    tglLengkap: "22 Februari 2026",
    tglPersetujuan: "25 Februari 2026"
  },
  {
    jenisKajian: "Legal Memorandum",
    judulDokumen: "Analisis dan Usulan Pengajuan Gugatan terhadap Mantan Pengurus dan Karyawan BPR Mitra Likuidasi",
    tglPenerimaan: "15 Januari 2026",
    unitPengusul: "GLIT",
    tglLengkap: "18 Januari 2026",
    tglPersetujuan: "20 Januari 2026"
  },
  {
    jenisKajian: "Analisis Litigasi",
    judulDokumen: "Analisis Penanganan Perkara di Tingkat Peninjauan Kembali (PK) terhadap Putusan Kasasi No. 3621 K/Pdt/2025",
    tglPenerimaan: "10 Desember 2025",
    unitPengusul: "GRC",
    tglLengkap: "12 Desember 2025",
    tglPersetujuan: "15 Desember 2025"
  },
  {
    jenisKajian: "Legal Memorandum",
    judulDokumen: "Kajian Hukum Penanganan Perkara Gugatan Perdata No. 84/Pdt.G/2025/PN.Sby jo. Nomor 112/PDT/2025/PT.Sby di Tingkat Kasasi",
    tglPenerimaan: "04 November 2025",
    unitPengusul: "GLIT",
    tglLengkap: "06 November 2025",
    tglPersetujuan: "09 November 2025"
  },
  {
    jenisKajian: "Legal Memorandum",
    judulDokumen: "Analisis dan Usulan Penanganan Perkara Tindak Pidana Perbankan pada BPR Candra Likuidasi",
    tglPenerimaan: "18 Oktober 2025",
    unitPengusul: "GDK",
    tglLengkap: "20 Oktober 2025",
    tglPersetujuan: "22 Oktober 2025"
  },
];

function KajianLitigasiTab() {
  const [unitFilter, setUnitFilter] = useState("All");
  const [slaFilter, setSlaFilter] = useState("All");
  const [personilFilter, setPersonilFilter] = useState("All");
  const [klSearch, setKlSearch] = useState("");

  const filteredKlTable = MOCK_KL_TABLE.filter((row) => {
    const matchSearch = row.judulDokumen.toLowerCase().includes(klSearch.toLowerCase()) || row.jenisKajian.toLowerCase().includes(klSearch.toLowerCase()) || row.unitPengusul.toLowerCase().includes(klSearch.toLowerCase());
    const matchUnit = unitFilter === "All" || row.unitPengusul.toLowerCase() === unitFilter.toLowerCase();
    return matchSearch && matchUnit;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Filter Controls Bar */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-ink flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-600" />
            Filter Data Kajian Litigasi
          </h3>
          <span className="text-[11px] font-medium text-muted">Data Repositori Kajian Hukum LPS</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Tanggal Persetujuan</label>
            <input type="text" defaultValue="2022-11-01 — 2026-08-16" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none" />
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Unit Kerja Pengusul</label>
            <select value={unitFilter} onChange={(e) => setUnitFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Unit</option>
              <option value="GLIT">GLIT (Grup Litigasi)</option>
              <option value="GRC">GRC (Compliance)</option>
              <option value="GDK">GDK (Klaim)</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Status SLA</label>
            <select value={slaFilter} onChange={(e) => setSlaFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All SLA</option>
              <option value="Lebih Cepat">Lebih Cepat / Sesuai</option>
              <option value="Normal">Normal</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Personil Litigasi</label>
            <select value={personilFilter} onChange={(e) => setPersonilFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Personil</option>
              {MOCK_KL_PERSONIL.map((p, idx) => (
                <option key={idx} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Row 1: Donut Charts & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status SLA Donut Chart */}
        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Status SLA</h3>
          <div className="h-[180px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_KL_STATUS_SLA} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                  <Cell fill="#0284C7" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-4 text-[11.5px] font-bold mt-2">
            <span className="flex items-center gap-1.5 text-sky-600"><span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> Lebih Cepat (91%)</span>
            <span className="flex items-center gap-1.5 text-red-600"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Dalam Proses (9%)</span>
          </div>
        </div>

        {/* Status Approval Donut Chart */}
        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Status Approval</h3>
          <div className="h-[180px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_KL_STATUS_APPROVAL} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                  <Cell fill="#0284C7" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-4 text-[12px] font-bold mt-2">
            <span className="flex items-center gap-1.5 text-sky-600"><span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> Done (100%)</span>
          </div>
        </div>

        {/* Jumlah Kajian Litigasi Summary Card (Teal / Cyan Card) */}
        <div className="bg-gradient-to-br from-[#0D9488] via-[#0F766E] to-[#115E59] text-white rounded-[28px] p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-bold text-teal-200 uppercase tracking-wider">Jumlah Kajian Litigasi</span>
            <Info size={18} className="text-teal-300" />
          </div>

          <div className="my-3">
            <h2 className="text-[32px] font-black text-white tracking-tight">42 Kajian</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-teal-600/80">
            <div>
              <span className="text-[10.5px] font-semibold text-teal-200 block uppercase">Jumlah Unit Pengusul</span>
              <span className="text-[16px] font-extrabold text-amber-300">3 Unit</span>
            </div>
            <div>
              <span className="text-[10.5px] font-semibold text-teal-200 block uppercase">Jenis Kajian</span>
              <span className="text-[16px] font-extrabold text-emerald-300">3 Jenis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Bar Charts (Unit Kerja & Jenis Kajian) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
          <h3 className="text-[15px] font-bold text-ink mb-4">Unit Kerja Pengusul</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_KL_UNIT_PENGUSUL} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  {MOCK_KL_UNIT_PENGUSUL.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
          <h3 className="text-[15px] font-bold text-ink mb-4">Jenis Kajian</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_KL_JENIS_KAJIAN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  {MOCK_KL_JENIS_KAJIAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Personil Litigasi Bar Chart */}
      <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
        <h3 className="text-[16px] font-bold text-ink mb-1">Personil Litigasi</h3>
        <p className="text-[12px] text-muted mb-4">Beban penanganan kajian per personil tim litigasi</p>

        <div className="h-[260px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_KL_PERSONIL} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9.5, fill: '#64748b' }} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={32}>
                {MOCK_KL_PERSONIL.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 4: Data Table Kajian Litigasi */}
      <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-[16px] font-bold text-ink">Data Detail Kajian Litigasi</h3>
            <p className="text-[12px] text-muted">Daftar dokumen kajian, pendapat hukum & legal memorandum</p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul dokumen, jenis..."
              value={klSearch}
              onChange={(e) => setKlSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-[12px] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-600 text-white text-[11.5px] uppercase tracking-wider">
                <th className="p-3.5 font-bold rounded-tl-xl">Jenis Kajian</th>
                <th className="p-3.5 font-bold">Judul Dokumen</th>
                <th className="p-3.5 font-bold">Tanggal Penerimaan</th>
                <th className="p-3.5 font-bold">Unit Pengusul</th>
                <th className="p-3.5 font-bold">Tanggal Lengkap</th>
                <th className="p-3.5 font-bold rounded-tr-xl">Tanggal Persetujuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredKlTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-3.5 font-bold text-ink">{row.jenisKajian}</td>
                  <td className="p-3.5 font-medium text-slate-700 max-w-[320px]">{row.judulDokumen}</td>
                  <td className="p-3.5 text-slate-600">{row.tglPenerimaan}</td>
                  <td className="p-3.5 font-bold text-amber-700">{row.unitPengusul}</td>
                  <td className="p-3.5 text-slate-600">{row.tglLengkap}</td>
                  <td className="p-3.5 font-semibold text-emerald-700">{row.tglPersetujuan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MOCK_BH_RUANG_LINGKUP = [
  { name: 'Pidana', value: 38, pct: '79.2%' },
  { name: 'Perdata', value: 10, pct: '20.8%' },
];

const MOCK_BH_KUASA_HUKUM = [
  { name: 'Internal', value: 34, pct: '70.8%' },
  { name: 'Eksternal', value: 14, pct: '29.2%' },
];

const MOCK_BH_TIPE_PEMBERIAN = [
  { name: 'Langsung', value: 40, pct: '83.3%' },
  { name: 'Permohonan', value: 8, pct: '16.7%' },
];

const MOCK_BH_INSTANSI = [
  { name: 'Kepolisian', count: 24, fill: '#3B82F6' },
  { name: 'Pengadilan', count: 14, fill: '#1E3A8A' },
  { name: 'Kejaksaan', count: 7, fill: '#F26E22' },
  { name: 'OJK', count: 3, fill: '#7C3AED' },
];

const MOCK_BH_BENTUK = [
  { name: 'Pendampingan Hukum', count: 35, fill: '#3B82F6' },
  { name: 'Konsultasi Hukum', count: 26, fill: '#1E3A8A' },
  { name: 'Akses Data & Info', count: 18, fill: '#F26E22' },
  { name: 'Kuasa Hukum', count: 6, fill: '#7C3AED' },
  { name: 'Biaya Bantuan', count: 3, fill: '#EC4899' },
];

const MOCK_BH_STATUS_PTK = [
  { name: 'Pemberi Ket./Saksi/Terperiksa', count: 38, fill: '#3B82F6' },
  { name: 'Pelapor', count: 7, fill: '#1E3A8A' },
  { name: 'Saksi Ahli', count: 3, fill: '#F26E22' },
];

const MOCK_BH_AGENDA = [
  { tgl: '30 Jul 2026', agenda: 'Pendampingan Saksi BPR Cahaya Kencana', ptk: 'Bambang Triyono, S.H.' },
  { tgl: '03 Ags 2026', agenda: 'Pemeriksaan Penyidik BPR Artha Utama', ptk: 'Hendra Wijaya' },
  { tgl: '06 Ags 2026', agenda: 'Sidang Keterangan Saksi Ahli LPS', ptk: 'Denny Hamzah, S.E.' },
  { tgl: '10 Ags 2026', agenda: 'Konsultasi Hukum Agunan Ex-BPR Samudra', ptk: 'Siti Aminah' },
];

const MOCK_BH_TABLE = [
  {
    namaPerkara: "Pendampingan Saksi BPR Cahaya Kencana",
    ptk: "Bambang Triyono",
    noPerkara: "42/Pdt.G/2026/PN.Jkt.Pst",
    ruangLingkup: "Perdata",
    instansi: "Pengadilan",
    tipePemberian: "Langsung",
    jenisKuasa: "Internal"
  },
  {
    namaPerkara: "Pemeriksaan Penyidikan Kasus BPR Artha Utama",
    ptk: "Hendra Wijaya",
    noPerkara: "B/1420/III/RES.3.3/2026",
    ruangLingkup: "Pidana",
    instansi: "Kepolisian",
    tipePemberian: "Langsung",
    jenisKuasa: "Internal"
  },
  {
    namaPerkara: "Sidang Keterangan Ahli LPS Ex-BPR Candra",
    ptk: "Denny Hamzah",
    noPerkara: "88/Pid.Sus/2025/PN.Sby",
    ruangLingkup: "Pidana",
    instansi: "Pengadilan",
    tipePemberian: "Langsung",
    jenisKuasa: "Internal"
  },
  {
    namaPerkara: "Pelaporan Dugaan Fraud Ex-Pengurus BPR Mitra",
    ptk: "Siti Aminah",
    noPerkara: "56/Pid.B/2026/PN.Bks",
    ruangLingkup: "Pidana",
    instansi: "Pengadilan",
    tipePemberian: "Langsung",
    jenisKuasa: "Eksternal"
  },
  {
    namaPerkara: "Pendampingan Klarifikasi OJK Kasus BPR Nusantara",
    ptk: "Rizky Kurniawan",
    noPerkara: "B/5756/IX/RES.1.11/2026",
    ruangLingkup: "Pidana",
    instansi: "Kepolisian",
    tipePemberian: "Permohonan",
    jenisKuasa: "Internal"
  },
  {
    namaPerkara: "Gugatan Eksekusi Agunan Ex-BPR Samudra Mandiri",
    ptk: "Nanda Febriana",
    noPerkara: "102/Pdt.G/2026/PN.Dps",
    ruangLingkup: "Perdata",
    instansi: "Pengadilan",
    tipePemberian: "Langsung",
    jenisKuasa: "Eksternal"
  },
];

function BantuanHukumTab() {
  const [statusPtkFilter, setStatusPtkFilter] = useState("All");
  const [jenisKuasaFilter, setJenisKuasaFilter] = useState("All");
  const [tipePemberianFilter, setTipePemberianFilter] = useState("All");
  const [bhSearch, setBhSearch] = useState("");

  const filteredBhTable = MOCK_BH_TABLE.filter((row) => {
    const matchSearch = row.namaPerkara.toLowerCase().includes(bhSearch.toLowerCase()) || row.ptk.toLowerCase().includes(bhSearch.toLowerCase()) || row.noPerkara.toLowerCase().includes(bhSearch.toLowerCase());
    const matchJenis = jenisKuasaFilter === "All" || row.jenisKuasa.toLowerCase() === jenisKuasaFilter.toLowerCase();
    const matchTipe = tipePemberianFilter === "All" || row.tipePemberian.toLowerCase() === tipePemberianFilter.toLowerCase();
    return matchSearch && matchJenis && matchTipe;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Filter Controls Bar */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-ink flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-600" />
            Filter Data Bantuan Hukum
          </h3>
          <span className="text-[11px] font-medium text-muted">Data Layanan Bantuan Hukum LPS</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Tanggal Persetujuan</label>
            <input type="text" defaultValue="2023-08-30 — 2026-06-23" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none" />
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Status PTK</label>
            <select value={statusPtkFilter} onChange={(e) => setStatusPtkFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Status</option>
              <option value="Saksi">Pemberi Ket. / Saksi</option>
              <option value="Pelapor">Pelapor</option>
              <option value="Saksi Ahli">Saksi Ahli</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Jenis Kuasa Hukum</label>
            <select value={jenisKuasaFilter} onChange={(e) => setJenisKuasaFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Kuasa</option>
              <option value="Internal">Internal</option>
              <option value="Eksternal">Eksternal</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Tipe Pemberian</label>
            <select value={tipePemberianFilter} onChange={(e) => setTipePemberianFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Tipe</option>
              <option value="Langsung">Langsung</option>
              <option value="Permohonan">Permohonan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 1: Charts & Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ruang Lingkup Donut Chart */}
        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Ruang Lingkup</h3>
          <div className="h-[180px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_BH_RUANG_LINGKUP} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                  <Cell fill="#EF4444" />
                  <Cell fill="#1E3A8A" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-4 text-[12px] font-bold mt-2">
            <span className="flex items-center gap-1.5 text-red-600"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Pidana (79%)</span>
            <span className="flex items-center gap-1.5 text-navy"><span className="w-2.5 h-2.5 rounded-full bg-navy"></span> Perdata (21%)</span>
          </div>
        </div>

        {/* Jenis Kuasa Hukum Donut Chart */}
        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Jenis Kuasa Hukum</h3>
          <div className="h-[180px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_BH_KUASA_HUKUM} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                  <Cell fill="#EF4444" />
                  <Cell fill="#3B82F6" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-4 text-[12px] font-bold mt-2">
            <span className="flex items-center gap-1.5 text-red-600"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Internal (71%)</span>
            <span className="flex items-center gap-1.5 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Eksternal (29%)</span>
          </div>
        </div>

        {/* Kalender Agenda Executive Blue Card */}
        <div className="bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white rounded-[28px] p-5 md:p-6 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-sky-200 block mb-1">Kalender Agenda</span>
            <h3 className="text-[18px] font-black text-white mb-3">Wednesday, 29 July 2026</h3>

            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/20 space-y-2">
              <div className="grid grid-cols-3 text-[10.5px] font-extrabold text-sky-100 uppercase pb-1.5 border-b border-white/20">
                <span>Tanggal</span>
                <span>Agenda</span>
                <span className="text-right">Nama PTK</span>
              </div>
              <div className="space-y-2 max-h-[140px] overflow-y-auto scrollbar-hide text-[11px]">
                {MOCK_BH_AGENDA.map((ag, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-1 py-1 border-b border-white/10 last:border-0 font-medium">
                    <span className="text-sky-200 font-bold">{ag.tgl}</span>
                    <span className="truncate text-white" title={ag.agenda}>{ag.agenda}</span>
                    <span className="text-right text-amber-200 truncate" title={ag.ptk}>{ag.ptk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Instansi, Tipe Pemberian & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Jumlah Instansi Bar Chart */}
        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
          <h3 className="text-[15px] font-bold text-ink mb-4">Jumlah Instansi</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_BH_INSTANSI} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={36}>
                  {MOCK_BH_INSTANSI.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tipe Pemberian Donut Chart */}
        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[15px] font-bold text-ink mb-2 text-center">Tipe Pemberian</h3>
          <div className="h-[180px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_BH_TIPE_PEMBERIAN} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                  <Cell fill="#EF4444" />
                  <Cell fill="#3B82F6" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-4 text-[12px] font-bold mt-2">
            <span className="flex items-center gap-1.5 text-red-600"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Langsung (83%)</span>
            <span className="flex items-center gap-1.5 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Permohonan (17%)</span>
          </div>
        </div>

        {/* Jumlah Bantuan Hukum Summary Card (Dark Gray Card) */}
        <div className="bg-gradient-to-br from-[#334155] to-[#1E293B] text-white rounded-[28px] p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">Jumlah Bantuan Hukum</span>
            <Info size={18} className="text-slate-400" />
          </div>

          <div className="my-3">
            <h2 className="text-[32px] font-black text-white tracking-tight">48 Bantuan</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/80">
            <div>
              <span className="text-[10.5px] font-semibold text-slate-400 block uppercase">Bentuk Bantuan</span>
              <span className="text-[16px] font-extrabold text-amber-400">5 Bentuk</span>
            </div>
            <div>
              <span className="text-[10.5px] font-semibold text-slate-400 block uppercase">Status PTK</span>
              <span className="text-[16px] font-extrabold text-emerald-400">3 Posisi</span>
            </div>
          </div>

          {/* Scale Illustration icon background overlay */}
          <Scale className="absolute right-4 bottom-4 w-24 h-24 text-white/5 pointer-events-none" />
        </div>
      </div>

      {/* Row 3: Bentuk Bantuan Hukum & Status PTK Bar Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
          <h3 className="text-[15px] font-bold text-ink mb-4">Bentuk Bantuan Hukum</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_BH_BENTUK} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9.5, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={36}>
                  {MOCK_BH_BENTUK.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
          <h3 className="text-[15px] font-bold text-ink mb-4">Status PTK</h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_BH_STATUS_PTK} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9.5, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {MOCK_BH_STATUS_PTK.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Map Visual Card */}
      <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
        <h3 className="text-[16px] font-bold text-ink mb-1">Peta Bantuan Hukum</h3>
        <p className="text-[12px] text-muted mb-4">Persebaran lokasi pendampingan & bantuan hukum seluruh Indonesia</p>

        <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden min-h-[200px] flex flex-col justify-between">
          <div className="flex items-center justify-between z-10">
            <span className="text-[12px] font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
              📍 12 Kota Layanan Pendampingan Aktif
            </span>
            <span className="text-[11px] font-semibold text-sky-300">Update Real-Time</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 z-10">
            {[
              { prov: "DKI Jakarta", count: "16 Kasus" },
              { prov: "Jawa Timur (Surabaya)", count: "11 Kasus" },
              { prov: "Sumut (Medan)", count: "8 Kasus" },
              { prov: "Sulsel (Makassar)", count: "6 Kasus" },
              { prov: "Kalbar (Pontianak)", count: "4 Kasus" },
              { prov: "Bali (Denpasar)", count: "3 Kasus" },
            ].map((loc, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-300 block">{loc.prov}</span>
                <span className="text-[13px] font-bold text-amber-300">{loc.count}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 z-10">Terhubung langsung dengan Kantor Perwakilan LPS (KPW I, II, III)</p>
        </div>
      </div>

      {/* Row 5: Data Table Bantuan Hukum */}
      <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-[16px] font-bold text-ink">Data Detail Bantuan Hukum</h3>
            <p className="text-[12px] text-muted">Daftar pendampingan & pemberian bantuan hukum LPS</p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari perkara, PTK, no. perkara..."
              value={bhSearch}
              onChange={(e) => setBhSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-[12px] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-600 text-white text-[11.5px] uppercase tracking-wider">
                <th className="p-3.5 font-bold rounded-tl-xl">Nama Perkara</th>
                <th className="p-3.5 font-bold">Nama PTK</th>
                <th className="p-3.5 font-bold">Nomor Perkara</th>
                <th className="p-3.5 font-bold">Ruang Lingkup</th>
                <th className="p-3.5 font-bold">Instansi</th>
                <th className="p-3.5 font-bold">Tipe Pemberian</th>
                <th className="p-3.5 font-bold rounded-tr-xl">Jenis Kuasa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredBhTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-3.5 font-bold text-ink">{row.namaPerkara}</td>
                  <td className="p-3.5 font-semibold text-slate-700">{row.ptk}</td>
                  <td className="p-3.5 font-mono text-[11px] text-amber-700 font-bold">{row.noPerkara}</td>
                  <td className="p-3.5 font-medium text-slate-600">{row.ruangLingkup}</td>
                  <td className="p-3.5 font-semibold text-slate-700">{row.instansi}</td>
                  <td className="p-3.5 font-medium text-slate-600">{row.tipePemberian}</td>
                  <td className="p-3.5">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold",
                      row.jenisKuasa === 'Internal' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    )}>
                      {row.jenisKuasa}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MOCK_ANGGARAN_BULANAN = [
  { name: 'Jan', paguTarget: 375, realisasi: 320 },
  { name: 'Feb', paguTarget: 750, realisasi: 680 },
  { name: 'Mar', paguTarget: 1125, realisasi: 1050 },
  { name: 'Apr', paguTarget: 1500, realisasi: 1390 },
  { name: 'Mei', paguTarget: 1875, realisasi: 1710 },
  { name: 'Jun', paguTarget: 2250, realisasi: 2100 },
  { name: 'Jul', paguTarget: 2625, realisasi: 2450 },
  { name: 'Ags', paguTarget: 3000, realisasi: 2820 },
  { name: 'Sep', paguTarget: 3375, realisasi: 3180 },
  { name: 'Okt', paguTarget: 3750, realisasi: 3550 },
  { name: 'Nov', paguTarget: 4125, realisasi: 3900 },
  { name: 'Des', paguTarget: 4500, realisasi: 4280 },
];

const MOCK_MATA_ANGGARAN = [
  { kode: "501.101", nama: "Perjalanan Dinas & Transportasi", pagu: "850.000.000", terpakai: "320.000.000", sisa: "530.000.000", pct: 37.6 },
  { kode: "502.203", nama: "Penyelenggaraan Rapat & Kegiatan", pagu: "620.000.000", terpakai: "280.000.000", sisa: "340.000.000", pct: 45.1 },
  { kode: "503.104", nama: "Honorarium & Jasa Profesional", pagu: "1.200.000.000", terpakai: "480.000.000", sisa: "720.000.000", pct: 40.0 },
  { kode: "504.501", nama: "Pengadaan ATK & Perlengkapan Kantor", pagu: "350.000.000", terpakai: "120.000.000", sisa: "230.000.000", pct: 34.3 },
  { kode: "505.302", nama: "Pemeliharaan TI & Sistem Informasi", pagu: "1.480.000.000", terpakai: "510.000.000", sisa: "970.000.000", pct: 34.4 },
];

function KeuanganDashboard({ initialTab = "Anggaran" }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabs = ["Anggaran", "Pembayaran", "Perjalanan Dinas", "Uang Muka & Pengadaan"];

  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-white p-2 rounded-2xl shadow-sm border border-slate-100 touch-pan-x flex-nowrap w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all shrink-0 md:flex-1 text-center cursor-pointer select-none",
              activeTab === tab
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-transparent text-muted hover:bg-slate-50 hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Pembayaran" && <PembayaranView />}
      {activeTab === "Perjalanan Dinas" && <PerdinView />}
      {activeTab === "Uang Muka & Pengadaan" && <UangMukaView />}
      {activeTab === "Anggaran" && <AnggaranTab />}
    </div>
  );
}

function AnggaranTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Executive Card Ringkasan Anggaran Divisi */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 text-white rounded-[28px] md:rounded-[36px] p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-emerald-200 border border-white/30 text-[10.5px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                TA 2026 • Real-Time Core System
              </span>
            </div>
            <h2 className="text-[20px] md:text-[26px] font-extrabold text-white tracking-tight">Anggaran Divisi Penanganan Klaim</h2>
            <p className="text-[12.5px] text-white/80 mt-0.5">Pagu Total: Rp 4.500.000.000,00 (4,5 Miliar)</p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/10 self-stretch md:self-auto justify-around">
            <div className="text-center px-2">
              <span className="text-[10px] text-white/60 uppercase font-bold block">Terpakai (38%)</span>
              <span className="text-[17px] font-extrabold text-amber-300">Rp 1,71 M</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center px-2">
              <span className="text-[10px] text-white/60 uppercase font-bold block">Sisa Tersedia (62%)</span>
              <span className="text-[18px] font-black text-emerald-300">Rp 2,79 M</span>
            </div>
          </div>
        </div>

        {/* Multi-level Progress bar */}
        <div className="mt-6 space-y-1.5">
          <div className="flex justify-between text-[11.5px] font-bold text-white/90">
            <span>Penyerapan Anggaran: 38.0%</span>
            <span>Sisa Pagu: 62.0%</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden flex">
            <div className="h-full bg-amber-400 rounded-l-full" style={{ width: '38%' }}></div>
            <div className="h-full bg-emerald-400 rounded-r-full" style={{ width: '62%' }}></div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Penyerapan YTD", val: "38.0%", note: "Target YTD: 40%", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Anggaran Terikat (PO)", val: "Rp 420 Jt", note: "Commitment", icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Sisa Bebas", val: "Rp 2.37 M", note: "Siap Digunakan", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Status Realisasi", val: "Sehat", note: "Sesuai Target ✓", icon: Receipt, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-[24px] p-4 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] md:text-[12.5px] font-bold text-muted">{kpi.label}</span>
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", kpi.bg, kpi.color)}>
                  <Icon size={16} />
                </div>
              </div>
              <div>
                <p className="text-[18px] md:text-[22px] font-extrabold text-ink tracking-tight">{kpi.val}</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-0.5">{kpi.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Realisasi Anggaran Per Bulan Chart */}
      <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
        <h3 className="text-[16px] font-bold text-ink mb-1">Tren Realisasi vs Target Pagu Bulanan (Juta Rp)</h3>
        <p className="text-[12px] text-muted mb-6">Proyeksi akumulatif penyerapan anggaran TA 2026</p>

        <div className="h-[250px] md:h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={MOCK_ANGGARAN_BULANAN} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
              <Bar dataKey="realisasi" name="Realisasi Terpakai" fill="#0D9488" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Line type="monotone" dataKey="paguTarget" name="Target Pagu Bulanan" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Breakdown Mata Anggaran */}
      <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <div>
          <h3 className="text-[16px] font-bold text-ink">Breakdown Mata Anggaran (MAK)</h3>
          <p className="text-[12px] text-muted">Rincian pagu & penyerapan per pos anggaran</p>
        </div>

        <div className="overflow-x-auto scrollbar-hide border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-700 text-white text-[12px] uppercase tracking-wider">
                <th className="p-3.5 font-bold rounded-tl-xl">Kode MAK</th>
                <th className="p-3.5 font-bold">Mata Anggaran</th>
                <th className="p-3.5 font-bold text-right">Pagu (Rp)</th>
                <th className="p-3.5 font-bold text-right">Terpakai (Rp)</th>
                <th className="p-3.5 font-bold text-right">Sisa (Rp)</th>
                <th className="p-3.5 font-bold text-center rounded-tr-xl">% Penyerapan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12.5px]">
              {MOCK_MATA_ANGGARAN.map((row, idx) => (
                <tr key={idx} className="hover:bg-teal-50/40 transition-colors">
                  <td className="p-3.5 font-mono text-[11.5px] font-bold text-teal-700">{row.kode}</td>
                  <td className="p-3.5 font-bold text-ink">{row.nama}</td>
                  <td className="p-3.5 text-right font-medium text-slate-700">{row.pagu}</td>
                  <td className="p-3.5 text-right font-bold text-amber-600">{row.terpakai}</td>
                  <td className="p-3.5 text-right font-extrabold text-emerald-600">{row.sisa}</td>
                  <td className="p-3.5 text-center">
                    <span className="bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full text-[11px] font-extrabold">
                      {row.pct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Mock Datasets for Dashboard Monitoring ICS (Pembayaran Bank CIU)
const MOCK_ICS_BANK_PROSES = [
  { provinsi: 'Aceh', count: 4, fill: '#10B981' },
  { provinsi: 'Bali', count: 4, fill: '#3B82F6' },
  { provinsi: 'DKI Jakarta', count: 1, fill: '#F59E0B' },
];

const MOCK_ICS_BANK_PEMBAYAR = [
  { name: 'BSI', count: 4, fill: '#10B981' },
  { name: 'BNI', count: 3, fill: '#1E3A8A' },
  { name: 'BRI', count: 1, fill: '#F59E0B' },
  { name: 'Mandiri', count: 1, fill: '#EF4444' },
];

const MOCK_ICS_TIPE_PENCAIRAN = [
  { name: 'Transfer', value: 18293, pct: '91.14%', fill: '#EF4444' },
  { name: 'Cash', value: 837, pct: '4.17%', fill: '#10B981' },
  { name: 'Lainnya', value: 941, pct: '4.69%', fill: '#0284C7' },
];

const MOCK_ICS_TIPE_REKENING = [
  { name: 'Single', value: 18936, pct: '94.35%', fill: '#10B981' },
  { name: 'Multiple', value: 1072, pct: '5.34%', fill: '#6366F1' },
  { name: 'Join', value: 63, pct: '0.31%', fill: '#F59E0B' },
];

const MOCK_ICS_TABLE = [
  { noKepesertaan: '30200001', provinsi: 'Aceh', bankCiu: 'PT BPR Aceh Utara', nominal: 527372.74, rekening: 2599, nasabah: 2599 },
  { noKepesertaan: '33600015', provinsi: 'Bali', bankCiu: 'PT BPR Bali Artha Anugrah', nominal: 76023418.61, rekening: 877, nasabah: 877 },
  { noKepesertaan: '33600054', provinsi: 'Bali', bankCiu: 'PT BPR Kamadana', nominal: 35343069.71, rekening: 2796, nasabah: 2796 },
  { noKepesertaan: '31300225', provinsi: 'DKI Jakarta', bankCiu: 'PT BPR Koperindo Jaya', nominal: 51770006.57, rekening: 248, nasabah: 248 },
  { noKepesertaan: '33600088', provinsi: 'Bali', bankCiu: 'PT BPR Pasar Umum', nominal: 20620533.33, rekening: 1109, nasabah: 1109 },
  { noKepesertaan: '33600114', provinsi: 'Bali', bankCiu: 'PT BPR Sewu Bali', nominal: 19738569.08, rekening: 3323, nasabah: 3324 },
  { noKepesertaan: '40200006', provinsi: 'Aceh', bankCiu: 'PT BPRS Gayo Perseroda', nominal: 29164378.05, rekening: 4899, nasabah: 4899 },
  { noKepesertaan: '40100002', provinsi: 'Aceh', bankCiu: 'PT BPRS Hareukat', nominal: 533315.12, rekening: 3755, nasabah: 3755 },
  { noKepesertaan: '40200008', provinsi: 'Aceh', bankCiu: 'PT BPRS Kota Juang Perseroda', nominal: 10298935.47, rekening: 1045, nasabah: 1045 },
];

function IcsPembayaranTab() {
  const [provinsiFilter, setProvinsiFilter] = useState("All");
  const [bankPembayarFilter, setBankPembayarFilter] = useState("All");
  const [searchBank, setSearchBank] = useState("");

  const filteredIcsTable = MOCK_ICS_TABLE.filter((row) => {
    const matchSearch = row.bankCiu.toLowerCase().includes(searchBank.toLowerCase()) || row.noKepesertaan.includes(searchBank);
    const matchProv = provinsiFilter === "All" || row.provinsi.toLowerCase() === provinsiFilter.toLowerCase();
    return matchSearch && matchProv;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Filter Controls Bar */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-ink flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600" />
            Filter Data Pembayaran Bank CIU
          </h3>
          <span className="text-[11px] font-medium text-muted">Monitoring Realisasi Pembayaran LPS</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Provinsi</label>
            <select value={provinsiFilter} onChange={(e) => setProvinsiFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Provinsi</option>
              <option value="Aceh">Aceh</option>
              <option value="Bali">Bali</option>
              <option value="DKI Jakarta">DKI Jakarta</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Tahun Bank CIU</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Tahun</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Nama Bank CIU</label>
            <input type="text" placeholder="Cari bank..." value={searchBank} onChange={(e) => setSearchBank(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none" />
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Bank Pembayar</label>
            <select value={bankPembayarFilter} onChange={(e) => setBankPembayarFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Bank Pembayar</option>
              <option value="BSI">BSI</option>
              <option value="BNI">BNI</option>
              <option value="BRI">BRI</option>
              <option value="Mandiri">Mandiri</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Status Pembayaran</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Proses">Proses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 1: 4 Charts (2 Bar Charts, 2 Donut Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Chart 1: Jumlah Bank dalam Proses Pencairan (Horizontal Bar) */}
        <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[14px] font-bold text-ink mb-3">Jumlah Bank dalam Proses Pencairan</h3>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={MOCK_ICS_BANK_PROSES} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis dataKey="provinsi" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={75} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
                  {MOCK_ICS_BANK_PROSES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Jumlah Bank CIU per Bank Pembayar (Vertical Bar) */}
        <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[14px] font-bold text-ink mb-3">Jumlah Bank CIU per Bank Pembayar</h3>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ICS_BANK_PEMBAYAR} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={28}>
                  {MOCK_ICS_BANK_PEMBAYAR.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Tipe Pencairan (Donut Chart) */}
        <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[14px] font-bold text-ink mb-2 text-center">Tipe Pencairan</h3>
          <div className="h-[150px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_ICS_TIPE_PENCAIRAN} cx="50%" cy="50%" innerRadius={42} outerRadius={62} dataKey="value" paddingAngle={3}>
                  {MOCK_ICS_TIPE_PENCAIRAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-3 text-[10.5px] font-bold mt-1">
            <span className="flex items-center gap-1 text-red-600"><span className="w-2 h-2 rounded-full bg-red-500"></span> Transfer (91.14%)</span>
            <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Cash (4.17%)</span>
          </div>
        </div>

        {/* Chart 4: Tipe Rekening (Donut Chart) */}
        <div className="bg-white rounded-[28px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[14px] font-bold text-ink mb-2 text-center">Tipe Rekening</h3>
          <div className="h-[150px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_ICS_TIPE_REKENING} cx="50%" cy="50%" innerRadius={42} outerRadius={62} dataKey="value" paddingAngle={3}>
                  {MOCK_ICS_TIPE_REKENING.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-3 text-[10.5px] font-bold mt-1">
            <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Single (94.35%)</span>
            <span className="flex items-center gap-1 text-indigo-600"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Multiple (5.34%)</span>
          </div>
        </div>
      </div>

      {/* Row 2: Executive Summary KPI Cards (Left) & Data Table (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 3 KPI Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* KPI 1: Nominal (Dalam Ribu Rupiah) */}
          <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm space-y-2">
            <div className="bg-teal-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider">
              Nominal (Dalam Ribu Rupiah)
            </div>
            <div className="grid grid-cols-3 gap-2 items-center pt-1">
              <div className="bg-teal-600 text-white p-3 rounded-xl">
                <span className="text-[17px] font-black block leading-tight">228,553,604</span>
                <span className="text-[9.5px] font-semibold text-teal-100 block mt-0.5">Sudah Dicairkan</span>
              </div>
              <div className="bg-slate-100 text-ink p-3 rounded-xl">
                <span className="text-[14px] font-bold block leading-tight text-slate-700">15,465,995</span>
                <span className="text-[9.5px] font-semibold text-muted block mt-0.5">Belum Dicairkan</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-[20px] font-black text-teal-700">94.00%</span>
                <span className="text-[9px] font-bold text-muted uppercase">Pencairan</span>
              </div>
            </div>
          </div>

          {/* KPI 2: Jumlah Nasabah */}
          <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm space-y-2">
            <div className="bg-[#F26E22] text-white px-3 py-1.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider">
              Jumlah Nasabah
            </div>
            <div className="grid grid-cols-3 gap-2 items-center pt-1">
              <div className="bg-[#F26E22] text-white p-3 rounded-xl">
                <span className="text-[17px] font-black block leading-tight">1,787</span>
                <span className="text-[9.5px] font-semibold text-orange-100 block mt-0.5">Sudah Cair</span>
              </div>
              <div className="bg-slate-100 text-ink p-3 rounded-xl">
                <span className="text-[14px] font-bold block leading-tight text-slate-700">18,284</span>
                <span className="text-[9.5px] font-semibold text-muted block mt-0.5">Belum Cair</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-[20px] font-black text-[#F26E22]">9.00%</span>
                <span className="text-[9px] font-bold text-muted uppercase">Terlayani</span>
              </div>
            </div>
          </div>

          {/* KPI 3: Jumlah Rekening */}
          <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm space-y-2">
            <div className="bg-[#12294D] text-white px-3 py-1.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider">
              Jumlah Rekening
            </div>
            <div className="grid grid-cols-3 gap-2 items-center pt-1">
              <div className="bg-[#12294D] text-white p-3 rounded-xl">
                <span className="text-[17px] font-black block leading-tight">1,788</span>
                <span className="text-[9.5px] font-semibold text-slate-300 block mt-0.5">Sudah Cair</span>
              </div>
              <div className="bg-slate-100 text-ink p-3 rounded-xl">
                <span className="text-[14px] font-bold block leading-tight text-slate-700">18,863</span>
                <span className="text-[9.5px] font-semibold text-muted block mt-0.5">Belum Cair</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-[20px] font-black text-[#12294D]">9.00%</span>
                <span className="text-[9px] font-bold text-muted uppercase">Rekening</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Data Table Summary pembayaran Bank CIU */}
        <div className="lg:col-span-7 bg-white rounded-[28px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-bold text-ink">Summary pembayaran Bank CIU</h3>
              <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                9 Bank CIU
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-amber-600 text-white text-[10.5px] uppercase tracking-wider">
                    <th className="p-3 font-bold rounded-tl-xl whitespace-nowrap">No. Kepesertaan</th>
                    <th className="p-3 font-bold whitespace-nowrap">Provinsi</th>
                    <th className="p-3 font-bold">Bank CIU</th>
                    <th className="p-3 font-bold text-right whitespace-nowrap">Nominal (Rp Ribu)</th>
                    <th className="p-3 font-bold text-center whitespace-nowrap">Jumlah Rekening</th>
                    <th className="p-3 font-bold text-center rounded-tr-xl whitespace-nowrap">Jumlah Nasabah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11.5px]">
                  {filteredIcsTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-700 whitespace-nowrap">{row.noKepesertaan}</td>
                      <td className="p-3 font-medium text-slate-700 whitespace-nowrap">{row.provinsi}</td>
                      <td className="p-3 font-bold text-ink">{row.bankCiu}</td>
                      <td className="p-3 font-mono font-bold text-right text-emerald-700 whitespace-nowrap">{row.nominal.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 font-mono font-semibold text-center text-slate-700">{row.rekening.toLocaleString('id-ID')}</td>
                      <td className="p-3 font-mono font-semibold text-center text-slate-700">{row.nasabah.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-[#12294D] text-white font-extrabold text-[12px]">
                    <td colSpan={3} className="p-3 rounded-bl-xl uppercase tracking-wider">Total</td>
                    <td className="p-3 font-mono text-right text-amber-300">244,019,598.68</td>
                    <td className="p-3 font-mono text-center text-emerald-300">20,651</td>
                    <td className="p-3 font-mono text-center text-teal-300 rounded-br-xl">20,022</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCK_KEBERATAN_PIE = [
  { name: 'Nasabah merupakan pihak yang diuntungkan secara tidak wajar', count: 4, pct: '44.44%', fill: '#0088FE' },
  { name: 'Nasabah merupakan pihak penyebab Bank Gagal', count: 2, pct: '22.22%', fill: '#1E3A8A' },
  { name: 'Simpanan Tidak Tercatat pada Bank', count: 2, pct: '22.22%', fill: '#F26E22' },
  { name: 'Lainnya', count: 1, pct: '11.11%', fill: '#7E22CE' },
];

const MOCK_KEBERATAN_TABLE = [
  {
    bank: 'BPR LPN Kampung Dalam',
    nasabah: 4,
    rekening: 5,
    saldoNettoCiu: 3085739938.00,
    nominalKeberatan: 10000000000.00,
    tidakTercatat: 1,
    diuntungkanTdkWajar: 2,
    penyebabGagal: 2,
    lainnya: 0
  },
  {
    bank: 'PT BPR Harapan Saudara',
    nasabah: 4,
    rekening: 4,
    saldoNettoCiu: 1216176231485.00,
    nominalKeberatan: 8000000000.00,
    tidakTercatat: 1,
    diuntungkanTdkWajar: 2,
    penyebabGagal: 0,
    lainnya: 1
  }
];

const MOCK_KEBERATAN_TINDAK_LANJUT_NASABAH = [
  { year: '2022', penelitian: 100 }
];

const MOCK_KEBERATAN_TINDAK_LANJUT_REKENING = [
  { year: '2022', penelitian: 100 }
];

const MOCK_KEBERATAN_PER_TAHUN = [
  {
    year: '2022',
    tidakTercatat: 2,
    diuntungkanTdkWajar: 4,
    penyebabGagal: 2,
    lainnya: 1
  }
];

function IcsKeberatanTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Title & Header Card */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-[16px] font-bold text-ink flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Monitoring Keberatan Nasabah Bank CIU
          </h3>
          <p className="text-[12px] font-medium text-muted mt-0.5">Rekapitulasi permohonan keberatan atas penetapan status klaim simpanan</p>
        </div>
        <div className="flex gap-2 text-[11px] font-bold">
          <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full">Total Keberatan: 9 Rekening</span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full">Nominal: Rp 18 Miliar</span>
        </div>
      </div>

      {/* Main Row 1: Pie Chart & Problem Legend */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink text-center">Keberatan Berdasarkan Permasalahan dan Jumlah Rekening</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Pie Chart (Left Column) */}
          <div className="md:col-span-7 h-[260px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_KEBERATAN_PIE}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={95}
                  dataKey="count"
                >
                  {MOCK_KEBERATAN_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any, name: any) => [`${value} Rekening`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Permasalahan Legend (Right Column) */}
          <div className="md:col-span-5 space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="text-[12px] font-bold text-ink uppercase tracking-wider mb-2">Permasalahan:</h4>
            {MOCK_KEBERATAN_PIE.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-[12px]">
                <span className="w-3 h-3 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: item.fill }} />
                <div className="flex-1">
                  <span className="font-semibold text-slate-800 block leading-tight">{item.name}</span>
                  <span className="text-[11px] font-mono text-muted">{item.count} Rekening ({item.pct})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Row 2: Data Table Keberatan per Bank */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink">Detail Data Keberatan per Bank</h3>
        
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200 text-slate-700 text-[11px] uppercase tracking-wider">
                <th className="p-3 font-bold">Bank</th>
                <th className="p-3 font-bold text-center">Jumlah Nasabah</th>
                <th className="p-3 font-bold text-center">Jumlah Rekening</th>
                <th className="p-3 font-bold text-right">Saldo Netto CIU</th>
                <th className="p-3 font-bold text-right">Nominal Keberatan</th>
                <th className="p-3 font-bold text-center">Simpanan Tidak Tercatat</th>
                <th className="p-3 font-bold text-center">Diuntungkan Secara Tidak Wajar</th>
                <th className="p-3 font-bold text-center">Penyebab Bank Gagal</th>
                <th className="p-3 font-bold text-center">Lainnya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {MOCK_KEBERATAN_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-bold text-ink">{row.bank}</td>
                  <td className="p-3 font-mono font-semibold text-center text-slate-700">{row.nasabah}</td>
                  <td className="p-3 font-mono font-semibold text-center text-slate-700">{row.rekening}</td>
                  <td className="p-3 font-mono text-right text-slate-700">{row.saldoNettoCiu.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
                  <td className="p-3 font-mono font-bold text-right text-amber-700">{row.nominalKeberatan.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
                  <td className="p-3 font-mono text-center text-slate-700">{row.tidakTercatat}</td>
                  <td className="p-3 font-mono text-center text-slate-700">{row.diuntungkanTdkWajar}</td>
                  <td className="p-3 font-mono text-center text-slate-700">{row.penyebabGagal}</td>
                  <td className="p-3 font-mono text-center text-slate-700">{row.lainnya}</td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-[#12294D] text-white font-extrabold text-[12px]">
                <td className="p-3 uppercase tracking-wider">Total</td>
                <td className="p-3 font-mono text-center text-amber-300">8</td>
                <td className="p-3 font-mono text-center text-amber-300">9</td>
                <td className="p-3 font-mono text-right text-emerald-300">1,219,261,971,423.00</td>
                <td className="p-3 font-mono text-right text-amber-300">18,000,000,000.00</td>
                <td className="p-3 font-mono text-center">2</td>
                <td className="p-3 font-mono text-center">4</td>
                <td className="p-3 font-mono text-center">2</td>
                <td className="p-3 font-mono text-center">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Tindak Lanjut atas Penanganan Keberatan Nasabah (2 Bar Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Berdasarkan Jumlah Nasabah */}
        <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[14px] font-bold text-ink mb-1 text-center">Tindak Lanjut atas Penanganan Keberatan Nasabah</h3>
          <div className="flex justify-center items-center gap-2 mb-3 text-[11px] font-bold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0088FE]"></span>
            <span>Status: Penelitian</span>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_KEBERATAN_TINDAK_LANJUT_NASABAH} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -10, fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis label={{ value: 'Jumlah Nasabah', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} unit="%" domain={[0, 100]} ticks={[0, 50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'Penelitian']} />
                <Bar dataKey="penelitian" fill="#0088FE" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Berdasarkan Jumlah Rekening */}
        <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <h3 className="text-[14px] font-bold text-ink mb-1 text-center">Tindak Lanjut atas Penanganan Keberatan Nasabah</h3>
          <div className="flex justify-center items-center gap-2 mb-3 text-[11px] font-bold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0088FE]"></span>
            <span>Status: Penelitian</span>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_KEBERATAN_TINDAK_LANJUT_REKENING} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -10, fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis label={{ value: 'Jumlah Rekening', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} unit="%" domain={[0, 100]} ticks={[0, 50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'Penelitian']} />
                <Bar dataKey="penelitian" fill="#0088FE" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Keberatan Berdasarkan Permasalahan Simpanan per Tahun (Horizontal Grouped Bar) */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink text-center">Keberatan Berdasarkan Permasalahan Simpanan per Tahun</h3>
        
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10.5px] font-bold text-slate-700">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7E22CE]"></span> Lainnya</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]"></span> Nasabah merupakan pihak penyebab Bank Gagal</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0088FE]"></span> Nasabah merupakan pihak yang diuntungkan secara tidak wajar</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F26E22]"></span> Simpanan Tidak Tercatat pada Bank</span>
        </div>

        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={MOCK_KEBERATAN_PER_TAHUN} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} label={{ value: 'Jumlah Rekening', position: 'insideBottom', offset: -10, fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis dataKey="year" type="category" label={{ value: 'Year', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip />
              <Bar dataKey="lainnya" name="Lainnya" fill="#7E22CE" radius={[0, 4, 4, 0]} maxBarSize={18} />
              <Bar dataKey="penyebabGagal" name="Nasabah penyebab Bank Gagal" fill="#1E3A8A" radius={[0, 4, 4, 0]} maxBarSize={18} />
              <Bar dataKey="diuntungkanTdkWajar" name="Diuntungkan secara tidak wajar" fill="#0088FE" radius={[0, 4, 4, 0]} maxBarSize={18} />
              <Bar dataKey="tidakTercatat" name="Simpanan Tidak Tercatat" fill="#F26E22" radius={[0, 4, 4, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const MOCK_ICS_BANK_PROSES_STATUS_PIE = [
  { name: 'Aktif', count: 1, pct: '7.69%', fill: '#0088FE' },
  { name: 'Tidak Aktif', count: 12, pct: '92.31%', fill: '#1E293B' },
];

const MOCK_ICS_BANK_PROSES_TABLE = [
  { no: '31100092', bank: 'PT BPR Sulawesi Sejahtera', provinsi: 'Sulawesi Selatan', tgl: '12/03/2026', status: 'Aktif', rekening: 1420, nominal: 14500000000 },
  { no: '30200001', bank: 'PT BPR Aceh Utara', provinsi: 'Aceh', tgl: '15/01/2024', status: 'Tidak Aktif', rekening: 2599, nominal: 28300000000 },
  { no: '33600015', bank: 'PT BPR Bali Artha Anugrah', provinsi: 'Bali', tgl: '10/05/2023', status: 'Tidak Aktif', rekening: 877, nominal: 12100000000 },
  { no: '33600054', bank: 'PT BPR Kamadana', provinsi: 'Bali', tgl: '22/08/2023', status: 'Tidak Aktif', rekening: 2796, nominal: 35340000000 },
  { no: '31300225', bank: 'PT BPR Koperindo Jaya', provinsi: 'DKI Jakarta', tgl: '11/11/2022', status: 'Tidak Aktif', rekening: 248, nominal: 8700000000 },
  { no: '33600088', bank: 'PT BPR Pasar Umum', provinsi: 'Bali', tgl: '04/04/2022', status: 'Tidak Aktif', rekening: 1109, nominal: 20620000000 },
  { no: '33600114', bank: 'PT BPR Sewu Bali', provinsi: 'Bali', tgl: '18/09/2021', status: 'Tidak Aktif', rekening: 3323, nominal: 19730000000 },
  { no: '40200006', bank: 'PT BPRS Gayo Perseroda', provinsi: 'Aceh', tgl: '30/10/2021', status: 'Tidak Aktif', rekening: 4899, nominal: 29160000000 },
  { no: '40100002', bank: 'PT BPRS Hareukat', provinsi: 'Aceh', tgl: '14/02/2020', status: 'Tidak Aktif', rekening: 3755, nominal: 15400000000 },
  { no: '40200008', bank: 'PT BPRS Kota Juang Perseroda', provinsi: 'Aceh', tgl: '20/07/2020', status: 'Tidak Aktif', rekening: 1045, nominal: 10290000000 },
  { no: '30400019', bank: 'BPR LPN Kampung Dalam', provinsi: 'Sumatra Barat', tgl: '09/12/2022', status: 'Tidak Aktif', rekening: 5, nominal: 10000000000 },
  { no: '30400088', bank: 'PT BPR Harapan Saudara', provinsi: 'Sumatra Barat', tgl: '18/06/2022', status: 'Tidak Aktif', rekening: 4, nominal: 8000000000 },
  { no: '31500041', bank: 'PT BPR Candra', provinsi: 'Jawa Timur', tgl: '01/03/2023', status: 'Tidak Aktif', rekening: 2100, nominal: 22450000000 },
];

function IcsBankDalamProsesTab() {
  const [provinsiFilter, setProvinsiFilter] = useState("All");
  const [searchBank, setSearchBank] = useState("");

  const filteredData = MOCK_ICS_BANK_PROSES_TABLE.filter(item => {
    const matchProv = provinsiFilter === "All" || item.provinsi.toLowerCase() === provinsiFilter.toLowerCase();
    const matchSearch = item.bank.toLowerCase().includes(searchBank.toLowerCase()) || item.no.includes(searchBank);
    return matchProv && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Filter Controls Bar */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-ink flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600" />
            Filter Bank Dalam Proses Pencairan Klaim
          </h3>
          <span className="text-[11px] font-medium text-muted">Data Updated 6/24/26</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Tanggal Range</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink flex items-center justify-between">
              <span>10/11/2019 — 9/15/2026</span>
              <Calendar className="w-4 h-4 text-light" />
            </div>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Nama Provinsi</label>
            <select value={provinsiFilter} onChange={(e) => setProvinsiFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">Semua Provinsi</option>
              <option value="Sulawesi Selatan">SULAWESI SELATAN</option>
              <option value="Aceh">ACEH</option>
              <option value="Bali">BALI</option>
              <option value="DKI Jakarta">DKI JAKARTA</option>
              <option value="Sumatra Barat">SUMATRA BARAT</option>
              <option value="Jawa Timur">JAWA TIMUR</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Cari Bank CIU</label>
            <input type="text" placeholder="Nama bank / No. Kepesertaan..." value={searchBank} onChange={(e) => setSearchBank(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none" />
          </div>
        </div>
      </div>

      {/* Main Row 1: Pie Chart & Status Legend */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink text-center">Jumlah Bank Dalam Proses Pencairan Klaim</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Donut / Pie Chart (Left Column) */}
          <div className="md:col-span-7 h-[260px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_ICS_BANK_PROSES_STATUS_PIE}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={95}
                  dataKey="count"
                >
                  {MOCK_ICS_BANK_PROSES_STATUS_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any, name: any) => [`${value} Bank`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Legend (Right Column) */}
          <div className="md:col-span-5 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <h4 className="text-[12px] font-bold text-ink uppercase tracking-wider mb-2">Status Pencairan:</h4>
            {MOCK_ICS_BANK_PROSES_STATUS_PIE.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[13px]">
                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <span className="font-mono font-bold text-ink bg-white px-3 py-1 rounded-full border border-slate-200">{item.count} ({item.pct})</span>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-200 text-[11px] text-muted flex justify-between font-bold">
              <span>Total Bank CIU:</span>
              <span className="text-ink">13 Bank</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Row 2: Detail Data Table Bank Dalam Proses */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink">Detail Daftar Bank Dalam Proses Pencairan</h3>
        
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200 text-slate-700 text-[11px] uppercase tracking-wider">
                <th className="p-3 font-bold">No. Kepesertaan</th>
                <th className="p-3 font-bold">Nama Bank CIU</th>
                <th className="p-3 font-bold">Provinsi</th>
                <th className="p-3 font-bold text-center">Tanggal Pencairan</th>
                <th className="p-3 font-bold text-center">Status</th>
                <th className="p-3 font-bold text-center">Jumlah Rekening</th>
                <th className="p-3 font-bold text-right">Nominal Klaim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-amber-700">{row.no}</td>
                  <td className="p-3 font-bold text-ink">{row.bank}</td>
                  <td className="p-3 font-medium text-slate-700">{row.provinsi}</td>
                  <td className="p-3 font-mono text-center text-muted">{row.tgl}</td>
                  <td className="p-3 text-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10.5px] font-extrabold inline-block",
                      row.status === 'Aktif' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-center text-slate-700">{row.rekening.toLocaleString('id-ID')}</td>
                  <td className="p-3 font-mono font-bold text-right text-emerald-700">Rp {row.nominal.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const MOCK_ICS_PEMBAYAR_PIE = [
  { name: 'BRI', count: 13, pct: '100.00%', fill: '#0088FE' },
  { name: 'BSI', count: 4, pct: '30.77%', fill: '#10B981' },
  { name: 'BNI', count: 3, pct: '23.07%', fill: '#1E3A8A' },
  { name: 'Mandiri', count: 1, pct: '7.69%', fill: '#EF4444' },
];

const MOCK_ICS_PEMBAYAR_TABLE = [
  { bankPembayar: 'BRI (Bank Rakyat Indonesia)', bankCiuCount: 13, pct: '100.00%', rekening: 20651, nominal: 244019598680, status: 'Aktif' },
  { bankPembayar: 'BSI (Bank Syariah Indonesia)', bankCiuCount: 4, pct: '30.77%', rekening: 12298, nominal: 69164378050, status: 'Aktif' },
  { bankPembayar: 'BNI (Bank Negara Indonesia)', bankCiuCount: 3, pct: '23.07%', rekening: 5780, nominal: 88143069710, status: 'Aktif' },
  { bankPembayar: 'Bank Mandiri', bankCiuCount: 1, pct: '7.69%', rekening: 2573, nominal: 86712150920, status: 'Aktif' },
];

function IcsBankPembayarTab() {
  const [provinsiFilter, setProvinsiFilter] = useState("All");
  const [selectedBankFilter, setSelectedBankFilter] = useState("All");

  const pieData = selectedBankFilter === "All"
    ? [{ name: 'BRI', count: 13, pct: '100.00%', fill: '#0088FE' }]
    : MOCK_ICS_PEMBAYAR_PIE;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Filter Controls Bar */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-ink flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600" />
            Filter Jumlah Bank per Bank Pembayar
          </h3>
          <span className="text-[11px] font-medium text-muted">Data Updated 6/24/26</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Tanggal Range</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink flex items-center justify-between">
              <span>10/11/2019 — 9/15/2026</span>
              <Calendar className="w-4 h-4 text-light" />
            </div>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Nama Provinsi</label>
            <select value={provinsiFilter} onChange={(e) => setProvinsiFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All (Semua Provinsi)</option>
              <option value="Aceh">ACEH</option>
              <option value="Bali">BALI</option>
              <option value="DKI Jakarta">DKI JAKARTA</option>
              <option value="Sulawesi Selatan">SULAWESI SELATAN</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Bank Pembayar</label>
            <select value={selectedBankFilter} onChange={(e) => setSelectedBankFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">Konsolidasi Utama (BRI - 100%)</option>
              <option value="Breakdown">Breakdown Semua Bank Pembayar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Row 1: Pie Chart & Status Legend */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink text-center">Jumlah Bank per Bank Pembayar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Pie Chart (Left Column) */}
          <div className="md:col-span-7 h-[260px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={95}
                  dataKey="count"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any, name: any) => [`${value} Bank CIU`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bank Pembayar Legend (Right Column) */}
          <div className="md:col-span-5 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <h4 className="text-[12px] font-bold text-ink uppercase tracking-wider mb-2">Bank Pembayar:</h4>
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[13px]">
                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <span className="font-mono font-bold text-ink bg-white px-3 py-1 rounded-full border border-slate-200">{item.count} ({item.pct})</span>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-200 text-[11px] text-muted flex justify-between font-bold">
              <span>Total Penunjukan Bank:</span>
              <span className="text-ink">13 Bank CIU</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Row 2: Detail Table Bank Pembayar */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink">Detail Rekapitulasi per Bank Pembayar</h3>
        
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200 text-slate-700 text-[11px] uppercase tracking-wider">
                <th className="p-3 font-bold">Bank Pembayar</th>
                <th className="p-3 font-bold text-center">Jumlah Bank CIU</th>
                <th className="p-3 font-bold text-center">Porsi (%)</th>
                <th className="p-3 font-bold text-center">Total Rekening</th>
                <th className="p-3 font-bold text-right">Total Nominal Pembayaran</th>
                <th className="p-3 font-bold text-center">Status Kerjasama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {MOCK_ICS_PEMBAYAR_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3 font-bold text-ink">{row.bankPembayar}</td>
                  <td className="p-3 font-mono font-bold text-center text-amber-700">{row.bankCiuCount} Bank</td>
                  <td className="p-3 font-mono text-center text-slate-700">{row.pct}</td>
                  <td className="p-3 font-mono text-center text-slate-700">{row.rekening.toLocaleString('id-ID')}</td>
                  <td className="p-3 font-mono font-bold text-right text-emerald-700">Rp {row.nominal.toLocaleString('id-ID')}</td>
                  <td className="p-3 text-center">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10.5px] font-extrabold inline-block">
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
  );
}

function IcsMonitoringDashboard() {
  const [activeTab, setActiveTab] = useState("Pembayaran");
  const tabs = ["Pembayaran", "Keberatan", "Bank dalam proses", "Bank Pembayar"];

  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Sub-Navigation Tabs */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-ink">Dashboard Monitoring ICS</h2>
              <p className="text-[12px] font-medium text-muted">Sistem Monitoring Pelaksanaan Pembayaran Klaim Penjaminan Bank CIU</p>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            Real-time Monitoring
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-slate-50 p-2 rounded-2xl border border-slate-100 touch-pan-x flex-nowrap w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all shrink-0 md:flex-1 text-center cursor-pointer select-none",
                activeTab === tab
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-transparent text-muted hover:bg-white hover:text-ink"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Pembayaran" ? (
        <IcsPembayaranTab />
      ) : activeTab === "Keberatan" ? (
        <IcsKeberatanTab />
      ) : activeTab === "Bank dalam proses" ? (
        <IcsBankDalamProsesTab />
      ) : (
        <IcsBankPembayarTab />
      )}
    </div>
  );
}

// ==========================================
// SCV BPR_S MONITORING DASHBOARD (5 SUB-TABS)
// ==========================================

const MOCK_SCV_RINGKAS_DESKRIPSI = [
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '1000', deskripsi: 'A.1 Nasabah Perorangan - non UMKM', nasabah: 55193, rekening: 62835, nominal: 411509128935 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '10000', deskripsi: 'Nominal <= 10 Juta', nasabah: 60413, rekening: 71147, nominal: 568060592409 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '10100', deskripsi: 'Nominal <= 50 Juta', nasabah: 53322, rekening: 58322, nominal: 118857517625 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '10200', deskripsi: 'Nominal <= 100 Juta', nasabah: 1552, rekening: 4011, nominal: 170651886585 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '1100', deskripsi: 'A.1.1 0 < nominal <= 50 juta', nasabah: 53322, rekening: 58322, nominal: 118857517625 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '1200', deskripsi: 'A.1.2 50 Juta < nominal <= 100 juta', nasabah: 810, rekening: 1813, nominal: 64309757917 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '1300', deskripsi: 'A.1.3 100 Juta < nominal <= 200 juta', nasabah: 578, rekening: 1372, nominal: 70595280727 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '1400', deskripsi: 'A.1.4 200 Juta < nominal <= 500 juta', nasabah: 302, rekening: 1093, nominal: 87821957835 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '1500', deskripsi: 'A.1.5 500 Juta < nominal <= 1 Miliar', nasabah: 58, rekening: 337, nominal: 30044712838 },
  { bank: 'Perumda BPR Bank Kulon Progo', kode: '1600', deskripsi: 'A.1.6 1 Miliar < nominal <= 2 Miliar', nasabah: 14, rekening: 144, nominal: 19484620002 },
];

const MOCK_SCV_PER_NASABAH_TABLE = [
  { bank: 'Perumda BPR Bank Kulon Progo', cif: 'CIF-001928', gol: 'Perorangan', kat: 'Non-UMKM', klas: 'Standar', kol: 'Lancar (1)', kota: 'Kulon Progo', jenis: 'Perorangan', tabungan: 25000000, deposito: 20000000, simpanan: 45000000, dijamin: 45000000 },
  { bank: 'Perumda BPR Bank Kulon Progo', cif: 'CIF-002144', gol: 'Perorangan', kat: 'UMKM Mikro', klas: 'Standar', kol: 'Lancar (1)', kota: 'Sleman', jenis: 'Perorangan', tabungan: 120000000, deposito: 0, simpanan: 120000000, dijamin: 120000000 },
  { bank: 'PT BPR Lestari Jogja', cif: 'CIF-008912', gol: 'Badan Hukum', kat: 'Non-UMKM', klas: 'Usaha', kol: 'Lancar (1)', kota: 'Yogyakarta', jenis: 'Swasta', tabungan: 150000000, deposito: 500000000, simpanan: 650000000, dijamin: 500000000 },
];

const MOCK_SCV_SAPIT_BANKS = [
  { no: '10300055', bank: 'PT Prima Master Bank', tahun: 2025, bulan: '12', versi: 'K1', rksRows: 59, pnRows: 3013, rksStatus: 'Sudah Menyampaikan', pnStatus: 'Belum Menyampaikan', scvSimpanan: 1601203234790, scvDijamin: 227165060412, scvRek: 4658, apoloSimpanan: 1601203234603, apoloDijamin: 648369083939, apoloRek: 658, tglKirim: '1/2/2026 1:00:16 PM' },
  { no: '31900080', bank: 'PERUMDA BPR BANK PASAR KABUPATEN TEMANGGUNG', tahun: 2025, bulan: '4 R', versi: 'K1', rksRows: 59, pnRows: 14543, rksStatus: 'Sudah Menyampaikan', pnStatus: 'Sudah Menyampaikan', scvSimpanan: 455230664020, scvDijamin: 392430728069, scvRek: 28328, apoloSimpanan: 459342262300, apoloDijamin: 388095287515, apoloRek: 28328, tglKirim: '1/14/2026 4:34:59 PM' },
  { no: '31700019', bank: 'PT BPR Central Artha', tahun: 2025, bulan: '5 K1', versi: 'K1', rksRows: 59, pnRows: 12207, rksStatus: 'Sudah Menyampaikan', pnStatus: 'Sudah Menyampaikan', scvSimpanan: 427470509273, scvDijamin: 313772449757, scvRek: 12207, apoloSimpanan: 427470509317, apoloDijamin: 304483205338, apoloRek: 12207, tglKirim: '1/15/2026 10:55:31 PM' },
  { no: '32300063', bank: 'PT BPR Bank Jombang PERSERODA', tahun: 2025, bulan: '5 K1', versi: 'K1', rksRows: 59, pnRows: 20, rksStatus: 'Sudah Menyampaikan', pnStatus: 'Belum Menyampaikan', scvSimpanan: 1074015781, scvDijamin: 774015781, scvRek: 20, apoloSimpanan: 876211105634, apoloDijamin: 847482703929, apoloRek: 20, tglKirim: '1/8/2026 2:02:23 PM' },
  { no: '32400014', bank: 'PT BPR Lestari Jatim', tahun: 2025, bulan: '5 R', versi: 'K1', rksRows: 59, pnRows: 2278, rksStatus: 'Sudah Menyampaikan', pnStatus: 'Belum Menyampaikan', scvSimpanan: 421550005950, scvDijamin: 301846242709, scvRek: 2278, apoloSimpanan: 438842979971, apoloDijamin: 431112596346, apoloRek: 2278, tglKirim: '1/13/2026 5:52:50 PM' },
  { no: '32500015', bank: 'PT BPR Godean Wisa', tahun: 2025, bulan: '5 R', versi: 'K1', rksRows: 59, pnRows: 12635, rksStatus: 'Sudah Menyampaikan', pnStatus: 'Belum Menyampaikan', scvSimpanan: 646547303214, scvDijamin: 270137612309, scvRek: 12635, apoloSimpanan: 646370979535, apoloDijamin: 344964344116, apoloRek: 12635, tglKirim: '1/12/2026 3:00:50 PM' },
  { no: '33600120', bank: 'PT BPR Lestari Bali', tahun: 2025, bulan: '5 R', versi: 'K1', rksRows: 59, pnRows: 63669, rksStatus: 'Sudah Menyampaikan', pnStatus: 'Belum Menyampaikan', scvSimpanan: 4981933672618, scvDijamin: 4100419297312, scvRek: 63669, apoloSimpanan: 4981933672528, apoloDijamin: 4785786423881, apoloRek: 63669, tglKirim: '1/7/2026 3:28:40 PM' },
];

function ScvRingkasTab() {
  const [bankFilter, setBankFilter] = useState("Perumda BPR Bank Kulon Progo");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Filter */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-[16px] font-bold text-ink flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            SCV Ringkas BPR Monitoring
          </h3>
          <p className="text-[12px] font-medium text-muted mt-0.5">Lembaga Penjamin Simpanan (LPS) — Monitoring Data Ringkas BPR</p>
        </div>
        <div className="w-full md:w-auto">
          <label className="text-[10.5px] font-bold text-muted block mb-1">Nama Bank</label>
          <select value={bankFilter} onChange={(e) => setBankFilter(e.target.value)} className="w-full md:w-[280px] bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-bold text-ink focus:outline-none">
            <option value="Perumda BPR Bank Kulon Progo">Perumda BPR Bank Kulon Progo</option>
            <option value="Semua Bank">Semua Bank (Multiple selections)</option>
          </select>
        </div>
      </div>

      {/* Row 1: Donut Koreksi Ringkas & Table Status Penyampaian */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Koreksi Ringkas Donut */}
        <div className="md:col-span-5 bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between items-center text-center">
          <h4 className="text-[14px] font-bold text-ink mb-2">Koreksi Ringkas</h4>
          <div className="h-[180px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: 'Sudah Menyampaikan', value: 1, fill: '#12294D' }]} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                  <Cell fill="#12294D" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[18px] font-extrabold text-ink">1 (100%)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700 mt-2">
            <span className="w-3 h-3 rounded-full bg-[#12294D]"></span>
            <span>Status: Sudah Menyampaikan</span>
          </div>
        </div>

        {/* Status Penyampaian Table */}
        <div className="md:col-span-7 bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-3">
          <h4 className="text-[14px] font-bold text-ink">Status Penyampaian Laporan</h4>
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-amber-600 text-white text-[11px] uppercase tracking-wider font-bold">
                  <th className="p-2.5">Nama Bank</th>
                  <th className="p-2.5 text-center">Kode Posisi</th>
                  <th className="p-2.5 text-center">Tanggal Penyampaian</th>
                  <th className="p-2.5 text-center">Status</th>
                  <th className="p-2.5 text-center">Koreksi</th>
                  <th className="p-2.5 text-center">Kode Versi</th>
                </tr>
              </thead>
              <tbody className="text-[12px] divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-ink">{bankFilter}</td>
                  <td className="p-2.5 font-mono text-center">20251130</td>
                  <td className="p-2.5 font-mono text-center text-muted">19 Dec 2025 11:11</td>
                  <td className="p-2.5 text-center">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-[10px] font-extrabold">Sudah Menyampaikan</span>
                  </td>
                  <td className="p-2.5 text-center font-bold text-blue-600">True</td>
                  <td className="p-2.5 text-center font-mono">K1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 2: Rincian Kode Deskripsi Table (Left) & 4 KPI Metric Cards (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Rincian Kode Table */}
        <div className="md:col-span-8 bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-3">
          <h4 className="text-[14px] font-bold text-ink">Rincian Kode Deskripsi SCV Ringkas</h4>
          <div className="overflow-x-auto border border-slate-100 rounded-2xl max-h-[360px] scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="sticky top-0 bg-amber-600 text-white text-[10.5px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-2.5">Kode</th>
                  <th className="p-2.5">Kode Deskripsi</th>
                  <th className="p-2.5 text-center">Nasabah</th>
                  <th className="p-2.5 text-center">Rekening</th>
                  <th className="p-2.5 text-right">Nominal Simpanan</th>
                </tr>
              </thead>
              <tbody className="text-[11.5px] divide-y divide-slate-100">
                {MOCK_SCV_RINGKAS_DESKRIPSI.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono font-bold text-amber-700">{row.kode}</td>
                    <td className="p-2.5 font-medium text-slate-800">{row.deskripsi}</td>
                    <td className="p-2.5 font-mono text-center text-slate-700">{row.nasabah.toLocaleString('id-ID')}</td>
                    <td className="p-2.5 font-mono text-center text-slate-700">{row.rekening.toLocaleString('id-ID')}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-emerald-700">Rp {row.nominal.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 KPI Metric Cards */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="bg-white p-5 rounded-[24px] border border-amber-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-muted uppercase">Jumlah Nasabah Penyimpan</span>
            <span className="text-[26px] font-extrabold text-amber-600 mt-1">60,413</span>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-amber-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-muted uppercase">Jumlah Rekening Simpanan</span>
            <span className="text-[26px] font-extrabold text-blue-600 mt-1">71,147</span>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-amber-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-muted uppercase">Jumlah Nominal Simpanan</span>
            <span className="text-[20px] font-extrabold text-emerald-700 mt-1">Rp 568.060.592.409</span>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-amber-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-muted uppercase">Jumlah Nominal Simpanan Dijamin</span>
            <span className="text-[20px] font-extrabold text-indigo-700 mt-1">Rp 519.237.122.337</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScvPerNasabahTab() {
  const [bankFilter, setBankFilter] = useState("Semua Bank");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Filter */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-[16px] font-bold text-ink flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            SCV Per Nasabah BPR Monitoring
          </h3>
          <p className="text-[12px] font-medium text-muted mt-0.5">Monitoring Rincian Data SCV Tingkat Per Nasabah</p>
        </div>
        <div className="w-full md:w-auto">
          <label className="text-[10.5px] font-bold text-muted block mb-1">Nama Bank</label>
          <select value={bankFilter} onChange={(e) => setBankFilter(e.target.value)} className="w-full md:w-[280px] bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-bold text-ink focus:outline-none">
            <option value="Semua Bank">Semua Bank (Multiple selections)</option>
            <option value="Perumda BPR Bank Kulon Progo">Perumda BPR Bank Kulon Progo</option>
            <option value="PT BPR Lestari Jogja">PT BPR Lestari Jogja</option>
          </select>
        </div>
      </div>

      {/* Row 1: 2 Donut Charts + Table Status */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center text-center">
          <h4 className="text-[14px] font-bold text-ink mb-2">Per Nasabah</h4>
          <div className="h-[160px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: 'Belum Menyampaikan', value: 2, fill: '#CBD5E1' }]} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                  <Cell fill="#CBD5E1" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[16px] font-extrabold text-slate-700">2 (100%)</span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-muted mt-1">Status: Belum Menyampaikan</span>
        </div>

        <div className="md:col-span-4 bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center text-center">
          <h4 className="text-[14px] font-bold text-ink mb-2">Koreksi Per Nasabah</h4>
          <div className="h-[160px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: 'Belum Menyampaikan', value: 2, fill: '#CBD5E1' }]} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                  <Cell fill="#CBD5E1" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[16px] font-extrabold text-slate-700">2 (100%)</span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-muted mt-1">Status: Belum Menyampaikan</span>
        </div>

        <div className="md:col-span-4 bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-3">
          <h4 className="text-[14px] font-bold text-ink">Status Penyampaian BPR</h4>
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-600 text-white text-[10.5px] uppercase font-bold">
                  <th className="p-2">Nama Bank</th>
                  <th className="p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-[11.5px] divide-y divide-slate-100">
                <tr>
                  <td className="p-2 font-bold text-ink">Perumda BPR Bank Kulon Progo</td>
                  <td className="p-2 text-center">
                    <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Belum Menyampaikan</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-ink">PT BPR Lestari Jogja</td>
                  <td className="p-2 text-center">
                    <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Belum Menyampaikan</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 2: Rincian Table Per Nasabah */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink">Detail Rincian SCV Per Nasabah</h3>
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-amber-600 text-white text-[10.5px] uppercase tracking-wider font-bold">
                <th className="p-3">Nama Bank</th>
                <th className="p-3 font-mono">CIF</th>
                <th className="p-3">Golongan</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Kolektibilitas</th>
                <th className="p-3">Kab/Kota</th>
                <th className="p-3 text-right">Saldo Tabungan</th>
                <th className="p-3 text-right">Saldo Deposito</th>
                <th className="p-3 text-right">Total Simpanan</th>
                <th className="p-3 text-right">Simpanan Dijamin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {MOCK_SCV_PER_NASABAH_TABLE.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-ink">{row.bank}</td>
                  <td className="p-3 font-mono font-bold text-amber-700">{row.cif}</td>
                  <td className="p-3 text-slate-700">{row.gol}</td>
                  <td className="p-3 text-slate-700">{row.kat}</td>
                  <td className="p-3 text-slate-700">{row.kol}</td>
                  <td className="p-3 text-slate-700">{row.kota}</td>
                  <td className="p-3 font-mono text-right text-slate-700">Rp {row.tabungan.toLocaleString('id-ID')}</td>
                  <td className="p-3 font-mono text-right text-slate-700">Rp {row.deposito.toLocaleString('id-ID')}</td>
                  <td className="p-3 font-mono font-bold text-right text-emerald-700">Rp {row.simpanan.toLocaleString('id-ID')}</td>
                  <td className="p-3 font-mono font-bold text-right text-indigo-700">Rp {row.dijamin.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ScvSapitTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Badges */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-[16px] font-bold text-ink flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            SCV BPR Monitoring — Rekap SCV vs SAPIT APOLO
          </h3>
          <p className="text-[12px] font-medium text-muted mt-0.5">Analisis Rekonsiliasi Pelaporan Data SCV & SAPIT APOLO</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-extrabold">
          <span className="bg-amber-500 text-white px-3 py-1.5 rounded-full">SCV</span>
          <span className="bg-teal-500 text-white px-3 py-1.5 rounded-full">SAPIT APOLO</span>
          <span className="bg-rose-500 text-white px-3 py-1.5 rounded-full">Selisih</span>
          <span className="bg-slate-800 text-white px-3 py-1.5 rounded-full">% Rasio</span>
        </div>
      </div>

      {/* Row 1: 2 Donut Charts + 3 Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Ringkas Donut */}
        <div className="md:col-span-3 bg-white rounded-[28px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center justify-between text-center">
          <h4 className="text-[13px] font-bold text-ink">Ringkas (RKS)</h4>
          <div className="h-[140px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: 'Sudah Menyampaikan', value: 314, fill: '#0D9488' }]} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value">
                  <Cell fill="#0D9488" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[16px] font-extrabold text-ink">314</span>
              <span className="text-[9px] font-bold text-muted">Total Bank</span>
            </div>
          </div>
          <span className="text-[10.5px] font-bold text-teal-700">314 (100%) Sudah Menyampaikan</span>
        </div>

        {/* Per Nasabah Donut */}
        <div className="md:col-span-3 bg-white rounded-[28px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center justify-between text-center">
          <h4 className="text-[13px] font-bold text-ink">Per Nasabah (PN)</h4>
          <div className="h-[140px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: 'Belum', value: 73, fill: '#F97316' }, { name: 'Sudah', value: 297, fill: '#CBD5E1' }]} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value">
                  <Cell fill="#F97316" />
                  <Cell fill="#CBD5E1" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[16px] font-extrabold text-ink">73</span>
              <span className="text-[9px] font-bold text-muted">(19.73%)</span>
            </div>
          </div>
          <span className="text-[10.5px] font-bold text-orange-600">73 Belum · 297 Sudah</span>
        </div>

        {/* 3 Comparison Cards */}
        <div className="md:col-span-6 space-y-3">
          {/* Card 1: Nominal Simpanan */}
          <div className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-muted uppercase">Jumlah Nominal Simpanan</span>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
              <div className="bg-orange-50 p-2 rounded-xl text-orange-800">
                <span className="block text-[9px] text-orange-600">SCV</span>
                Rp 340,19 T
              </div>
              <div className="bg-teal-50 p-2 rounded-xl text-teal-800">
                <span className="block text-[9px] text-teal-600">SAPIT APOLO</span>
                Rp 335,47 T
              </div>
              <div className="bg-rose-50 p-2 rounded-xl text-rose-800">
                <span className="block text-[9px] text-rose-600">Selisih</span>
                +Rp 4,72 T
              </div>
              <div className="bg-slate-900 text-white p-2 rounded-xl flex flex-col justify-center">
                <span className="block text-[9px] text-slate-300 font-normal">%</span>
                101.41%
              </div>
            </div>
          </div>

          {/* Card 2: Nominal Simpanan Dijamin */}
          <div className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-muted uppercase">Jumlah Nominal Simpanan Dijamin</span>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
              <div className="bg-orange-50 p-2 rounded-xl text-orange-800">
                <span className="block text-[9px] text-orange-600">SCV</span>
                Rp 258,03 T
              </div>
              <div className="bg-teal-50 p-2 rounded-xl text-teal-800">
                <span className="block text-[9px] text-teal-600">SAPIT APOLO</span>
                Rp 296,20 T
              </div>
              <div className="bg-rose-50 p-2 rounded-xl text-rose-800">
                <span className="block text-[9px] text-rose-600">Selisih</span>
                -Rp 38,17 T
              </div>
              <div className="bg-slate-900 text-white p-2 rounded-xl flex flex-col justify-center">
                <span className="block text-[9px] text-slate-300 font-normal">%</span>
                87.11%
              </div>
            </div>
          </div>

          {/* Card 3: Jumlah Rekening */}
          <div className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-muted uppercase">Jumlah Rekening Simpanan</span>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
              <div className="bg-orange-50 p-2 rounded-xl text-orange-800">
                <span className="block text-[9px] text-orange-600">SCV</span>
                25.232.149
              </div>
              <div className="bg-teal-50 p-2 rounded-xl text-teal-800">
                <span className="block text-[9px] text-teal-600">SAPIT APOLO</span>
                25.575.205
              </div>
              <div className="bg-rose-50 p-2 rounded-xl text-rose-800">
                <span className="block text-[9px] text-rose-600">Selisih</span>
                -343.056
              </div>
              <div className="bg-slate-900 text-white p-2 rounded-xl flex flex-col justify-center">
                <span className="block text-[9px] text-slate-300 font-normal">%</span>
                98.66%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 6 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm text-center">
          <span className="text-[9.5px] font-bold text-muted uppercase block">Nominal Tabungan</span>
          <span className="text-[12px] font-extrabold text-teal-700 mt-1 block">Rp 20.204 M</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm text-center">
          <span className="text-[9.5px] font-bold text-muted uppercase block">Nominal Deposito</span>
          <span className="text-[12px] font-extrabold text-orange-600 mt-1 block">Rp 48.372 M</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm text-center">
          <span className="text-[9.5px] font-bold text-muted uppercase block">Nominal Baki Debet</span>
          <span className="text-[12px] font-extrabold text-indigo-700 mt-1 block">Rp 60.401 M</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm text-center">
          <span className="text-[9.5px] font-bold text-muted uppercase block">Rekening Tabungan</span>
          <span className="text-[12px] font-extrabold text-slate-800 mt-1 block">5.007.840</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm text-center">
          <span className="text-[9.5px] font-bold text-muted uppercase block">Rekening Deposito</span>
          <span className="text-[12px] font-extrabold text-slate-800 mt-1 block">248.627</span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm text-center">
          <span className="text-[9.5px] font-bold text-muted uppercase block">Rekening Kewajiban</span>
          <span className="text-[12px] font-extrabold text-slate-800 mt-1 block">754.754</span>
        </div>
      </div>

      {/* Row 3: Status Laporan SCV vs SAPIT Table */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink">Detail Status Laporan SCV vs SAPIT APOLO</h3>
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider font-bold">
                <th className="p-3">No. Kepesertaan</th>
                <th className="p-3">Nama Bank</th>
                <th className="p-3 text-center">Tahun</th>
                <th className="p-3 text-center">Bulan</th>
                <th className="p-3 text-center">Kode Versi</th>
                <th className="p-3 text-center">Ringkas (RKS)</th>
                <th className="p-3 text-center">Per Nasabah (PN)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {MOCK_SCV_SAPIT_BANKS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-amber-700">{row.no}</td>
                  <td className="p-3 font-bold text-ink">{row.bank}</td>
                  <td className="p-3 font-mono text-center">{row.tahun}</td>
                  <td className="p-3 font-mono text-center">{row.bulan}</td>
                  <td className="p-3 font-mono text-center">{row.versi}</td>
                  <td className="p-3 text-center">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10.5px] font-bold">
                      {row.rksStatus}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10.5px] font-bold",
                      row.pnStatus === 'Sudah Menyampaikan' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    )}>
                      {row.pnStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ScvSapitRksTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Filters */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div>
          <h3 className="text-[16px] font-bold text-ink flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-600" />
            SCV_SAPIT_RKS BPR Monitoring
          </h3>
          <p className="text-[12px] font-medium text-muted mt-0.5">Monitoring Penyampaian Data Ringkas (RKS) & Waktu Pengiriman</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Nama Bank</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All (Semua Bank)</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Kode Posisi</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All (Semua Kode)</option>
            </select>
          </div>
          <div>
            <label className="text-[10.5px] font-bold text-muted block mb-1">Periode Data</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
              <option value="All">All Periode</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 1: Donut + Stat Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center justify-between text-center">
          <h4 className="text-[14px] font-bold text-ink mb-2">Ringkas (RKS) BPR</h4>
          <div className="h-[170px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: 'Sudah Menyampaikan', value: 370, fill: '#0D9488' }]} cx="50%" cy="50%" innerRadius={42} outerRadius={68} dataKey="value">
                  <Cell fill="#0D9488" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[18px] font-extrabold text-ink">370 (100%)</span>
            </div>
          </div>
          <span className="text-[12px] font-bold text-teal-700 mt-2">● Sudah Menyampaikan</span>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-teal-700 text-white p-5 rounded-[24px] shadow-sm flex flex-col justify-center items-center text-center">
            <span className="text-[32px] font-extrabold">73</span>
            <span className="text-[11px] font-medium text-teal-100 uppercase">Total Bank</span>
          </div>

          <div className="bg-teal-600 text-white p-5 rounded-[24px] shadow-sm flex flex-col justify-center items-center text-center">
            <span className="text-[32px] font-extrabold">73</span>
            <span className="text-[11px] font-medium text-teal-100 uppercase">Total Bank Sudah Kirim</span>
          </div>

          <div className="bg-slate-200 text-slate-600 p-5 rounded-[24px] border border-slate-300 shadow-sm flex flex-col justify-center items-center text-center">
            <span className="text-[28px] font-extrabold text-slate-400">(Blank)</span>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Total Bank Belum Kirim</span>
          </div>
        </div>
      </div>

      {/* Row 2: Table Tanggal Kirim */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <h3 className="text-[15px] font-bold text-ink">Daftar Waktu Pengiriman Data SCV Ringkas</h3>
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider font-bold">
                <th className="p-3">No. Kepesertaan</th>
                <th className="p-3">Nama Bank</th>
                <th className="p-3 text-center">Tahun</th>
                <th className="p-3 text-center">Bulan</th>
                <th className="p-3 text-center">Ringkas (RKS)</th>
                <th className="p-3 text-center">Tanggal Kirim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {MOCK_SCV_SAPIT_BANKS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-amber-700">{row.no}</td>
                  <td className="p-3 font-bold text-ink">{row.bank}</td>
                  <td className="p-3 font-mono text-center">{row.tahun}</td>
                  <td className="p-3 font-mono text-center">{row.bulan}</td>
                  <td className="p-3 text-center">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10.5px] font-bold">
                      {row.rksStatus}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-center text-muted">{row.tglKirim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ScvDetailSapitTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Filter */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-[16px] font-bold text-ink flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            Detail SCV_SAPIT BPR Monitoring
          </h3>
          <p className="text-[12px] font-medium text-muted mt-0.5">Tabel Matriks Komparasi Lengkap Nilai SCV vs APOLO per Bank</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
            <option value="All">All Bank</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-ink focus:outline-none">
            <option value="All">All Posisi</option>
          </select>
        </div>
      </div>

      {/* Main Matriks Table */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 space-y-4">
        <div className="overflow-x-auto border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-800 text-white text-[10.5px] uppercase tracking-wider font-bold">
                <th className="p-2.5">No Kepesertaan</th>
                <th className="p-2.5">Nama Bank</th>
                <th className="p-2.5 text-center">Tahun</th>
                <th className="p-2.5 text-center">Bulan</th>
                <th className="p-2.5 text-center">RKS</th>
                <th className="p-2.5 text-center">PN</th>
                <th className="p-2.5 text-right bg-amber-700">SCV Simpanan</th>
                <th className="p-2.5 text-right bg-amber-700">SCV Dijamin</th>
                <th className="p-2.5 text-center bg-amber-700">SCV Rek</th>
                <th className="p-2.5 text-right bg-teal-800">APOLO Simpanan</th>
                <th className="p-2.5 text-right bg-teal-800">APOLO Dijamin</th>
                <th className="p-2.5 text-center bg-teal-800">APOLO Rek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11.5px]">
              {MOCK_SCV_SAPIT_BANKS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono font-bold text-amber-700">{row.no}</td>
                  <td className="p-2.5 font-bold text-ink">{row.bank}</td>
                  <td className="p-2.5 font-mono text-center">{row.tahun}</td>
                  <td className="p-2.5 font-mono text-center">{row.bulan}</td>
                  <td className="p-2.5 text-center">
                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[9.5px] font-bold">Sudah</span>
                  </td>
                  <td className="p-2.5 text-center">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[9.5px] font-bold",
                      row.pnStatus === 'Sudah Menyampaikan' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    )}>
                      {row.pnStatus === 'Sudah Menyampaikan' ? 'Sudah' : 'Belum'}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-right font-medium text-slate-800">Rp {row.scvSimpanan.toLocaleString('id-ID')}</td>
                  <td className="p-2.5 font-mono text-right font-medium text-slate-800">Rp {row.scvDijamin.toLocaleString('id-ID')}</td>
                  <td className="p-2.5 font-mono text-center text-slate-700">{row.scvRek.toLocaleString('id-ID')}</td>
                  <td className="p-2.5 font-mono text-right font-medium text-teal-800">Rp {row.apoloSimpanan.toLocaleString('id-ID')}</td>
                  <td className="p-2.5 font-mono text-right font-medium text-teal-800">Rp {row.apoloDijamin.toLocaleString('id-ID')}</td>
                  <td className="p-2.5 font-mono text-center text-teal-800">{row.apoloRek.toLocaleString('id-ID')}</td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="bg-[#12294D] text-white font-extrabold text-[11.5px]">
                <td colSpan={6} className="p-3 uppercase tracking-wider">Total Konsolidasi SCV vs APOLO</td>
                <td className="p-3 font-mono text-right text-amber-300">Rp 340.190.403.064.468</td>
                <td className="p-3 font-mono text-right text-amber-300">Rp 258.037.774.802.345</td>
                <td className="p-3 font-mono text-center text-amber-300">25.232.149</td>
                <td className="p-3 font-mono text-right text-teal-300">Rp 335.470.057.732.694</td>
                <td className="p-3 font-mono text-right text-teal-300">Rp 296.208.571.269.293</td>
                <td className="p-3 font-mono text-center text-teal-300">25.575.205</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ScvBprMonitoringDashboard() {
  const [activeTab, setActiveTab] = useState("Ringkas");
  const tabs = ["Ringkas", "Per Nasabah", "SCV_SAPIT", "SCV_SAPIT_RKS", "Detail SCV_SAPIT"];

  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Sub-Navigation Tabs */}
      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Database size={22} />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-ink">SCV BPR_S Monitoring</h2>
              <p className="text-[12px] font-medium text-muted">Sistem Monitoring Single Customer View (SCV) BPR & BPRS — LPS</p>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Real-time SCV
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-slate-50 p-2 rounded-2xl border border-slate-100 touch-pan-x flex-nowrap w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all shrink-0 md:flex-1 text-center cursor-pointer select-none",
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-transparent text-muted hover:bg-white hover:text-ink"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Ringkas" ? (
        <ScvRingkasTab />
      ) : activeTab === "Per Nasabah" ? (
        <ScvPerNasabahTab />
      ) : activeTab === "SCV_SAPIT" ? (
        <ScvSapitTab />
      ) : activeTab === "SCV_SAPIT_RKS" ? (
        <ScvSapitRksTab />
      ) : (
        <ScvDetailSapitTab />
      )}
    </div>
  );
}

export default function DashboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const isHukum = id === 'hukum' || id === 'perkara';
  const isSdm = id === 'sdm' || id === 'sdm-talent' || id === 'kepegawaian' || id === 'absensi';
  const isKeuangan = id === 'keuangan' || id === 'pembayaran' || id === 'perjalanan-dinas' || id === 'uang-muka' || id === 'anggaran';
  const isAset = id === 'aset';
  const isHelpdesk = id === 'helpdesk';
  const isIcs = id === 'ics' || id === 'ics-monitoring';
  const isScvBpr = id === 'scv-bpr' || id === 'scv' || id === 'scv-bpr-monitoring';

  const initialSdmTab = id === 'absensi' ? 'Absensi' : id === 'kepegawaian' ? 'Kepegawaian' : 'Talent Profile';
  const initialKeuanganTab = id === 'perjalanan-dinas' ? 'Perjalanan Dinas' : id === 'uang-muka' ? 'Uang Muka & Pengadaan' : id === 'pembayaran' ? 'Pembayaran' : 'Anggaran';

  const title = isHukum ? "Hukum & Litigasi" :
                isSdm ? "SDM (Sumber Daya Manusia)" : 
                isKeuangan ? "Keuangan & Anggaran" :
                isAset ? "Dashboard Aset IT" :
                isHelpdesk ? "Dashboard Helpdesk" :
                isIcs ? "Dashboard Monitoring ICS" :
                isScvBpr ? "SCV BPR_S Monitoring" :
                "Dashboard Detail";

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC] pb-32 md:pb-12 relative w-full items-center">
      <div className="w-full">
        <AppBar title={title} showBack />
        
        {isHukum && <HukumDashboard />}
        {isSdm && <SdmDashboard initialTab={initialSdmTab} />}
        {isKeuangan && <KeuanganDashboard initialTab={initialKeuanganTab} />}
        {isAset && <AsetDashboard />}
        {isHelpdesk && <HelpdeskDashboard />}
        {isIcs && <IcsMonitoringDashboard />}
        {isScvBpr && <ScvBprMonitoringDashboard />}
        
        {(!isHukum && !isSdm && !isKeuangan && !isAset && !isHelpdesk && !isIcs && !isScvBpr) && (
          <div className="px-5 md:px-8 py-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-slate-500 font-bold text-xl">?</span>
            </div>
            <h3 className="text-[16px] font-bold text-ink mb-2">Modul belum tersedia</h3>
            <p className="text-[13px] text-muted max-w-[280px]">Modul {resolvedParams.id} sedang dalam tahap pengembangan.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SdmDashboard({ initialTab = "Talent Profile" }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabs = ["Talent Profile", "Kepegawaian", "Absensi"];

  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-white p-2 rounded-2xl shadow-sm border border-slate-100 touch-pan-x flex-nowrap w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all shrink-0 md:flex-1 text-center cursor-pointer select-none",
              activeTab === tab
                ? "bg-orange text-white shadow-sm"
                : "bg-transparent text-muted hover:bg-slate-50 hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1: Talent Profile */}
      {activeTab === "Talent Profile" && <TalentProfileTab />}

      {/* Tab 2: Kepegawaian */}
      {activeTab === "Kepegawaian" && <KepegawaianDashboard />}

      {/* Tab 3: Absensi */}
      {activeTab === "Absensi" && <AbsensiDashboard />}
    </div>
  );
}

const TALENT_EMPLOYEES = [
  {
    id: "88102",
    nama: "Rendra Pratama",
    initials: "RP",
    jabatan: "Kepala Divisi Advokasi & Penjaminan",
    direktorat: "Direktorat Penanganan Klaim & Advokasi",
    tag: "⭐ Star Talent",
    rating: "4.9 / 5.0",
    ready: "Ready in 1 Year",
    boxIndex: 2, // 3x3 grid index: 2 is Star / Top Talent (High Pot, High Perf)
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
    nama: "Maya Indah Puspita",
    initials: "MI",
    jabatan: "Senior Manager Analisis Risiko Penjaminan",
    direktorat: "Divisi Penanganan Klaim",
    tag: "🔥 High Performer",
    rating: "4.7 / 5.0",
    ready: "Ready in 2 Years",
    boxIndex: 5, // High Performer (Med Pot, High Perf)
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
    nama: "Faris Maulana",
    initials: "FM",
    jabatan: "Manager Pengawasan Likuidasi",
    direktorat: "Divisi Penanganan Klaim",
    tag: "🚀 Growth Driver",
    rating: "4.5 / 5.0",
    ready: "Ready in 1 Year",
    boxIndex: 1, // Growth Driver (High Pot, Med Perf)
    boxName: "Growth Driver (8)",
    kpis: {
      rating: "4.5 / 5.0",
      ratingNote: "Baik",
      potensi: "Tinggi",
      potensiNote: "Top 15%",
      idp: "44 Jam",
      idpNote: "Tercapai ✓",
      etik: "100%",
      etikNote: "Bebas Pelanggaran",
    },
    competencies: [
      { name: "Kepemimpinan Strategis", pct: 89, target: "80%" },
      { name: "Penanganan Klaim & Penjaminan", pct: 87, target: "80%" },
      { name: "Governance & Risk Compliance (GRC)", pct: 92, target: "85%" },
      { name: "Inovasi Digital & Adaptasi AI", pct: 95, target: "80%" },
    ],
  },
  {
    id: "92108",
    nama: "Dewi Sartika",
    initials: "DS",
    jabatan: "Assistant Manager Evaluasi Klaim",
    direktorat: "Divisi Penanganan Klaim",
    tag: "💎 Core Performer",
    rating: "4.3 / 5.0",
    ready: "Ready in 3 Years",
    boxIndex: 4, // Core Performer (Med Pot, Med Perf)
    boxName: "Core Performer (5)",
    kpis: {
      rating: "4.3 / 5.0",
      ratingNote: "Sesuai Target",
      potensi: "Sedang",
      potensiNote: "Standar Unit",
      idp: "35 Jam",
      idpNote: "Progres 88%",
      etik: "100%",
      etikNote: "Bebas Pelanggaran",
    },
    competencies: [
      { name: "Kepemimpinan Strategis", pct: 78, target: "75%" },
      { name: "Penanganan Klaim & Penjaminan", pct: 84, target: "80%" },
      { name: "Governance & Risk Compliance (GRC)", pct: 82, target: "80%" },
      { name: "Inovasi Digital & Adaptasi AI", pct: 75, target: "75%" },
    ],
  },
];

function TalentProfileTab() {
  const [selectedId, setSelectedId] = useState("88102");
  const emp = TALENT_EMPLOYEES.find(e => e.id === selectedId) || TALENT_EMPLOYEES[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Subordinate / Employee Selector Dropdown */}
      <div className="bg-white p-4 md:p-5 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
            Pilih Pegawai / Bawahan
          </label>
          <p className="text-[12.5px] text-ink font-semibold">Tampilkan Talenta Snapshot & Evaluation Matrix</p>
        </div>

        <div className="relative w-full md:w-80">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] font-bold text-ink focus:outline-none focus:ring-2 focus:ring-orange/30 cursor-pointer"
          >
            {TALENT_EMPLOYEES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama} ({item.jabatan})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Executive Snapshot Card */}
      <div className="bg-gradient-to-br from-[#12294D] via-[#1B355E] to-[#1E3A8A] text-white rounded-[28px] md:rounded-[36px] p-6 md:p-8 shadow-lg relative overflow-hidden transition-all">
        <div className="absolute right-0 top-0 w-64 h-64 bg-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white text-2xl font-extrabold shadow-inner flex-shrink-0">
              {emp.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-[18px] md:text-[24px] font-extrabold text-white tracking-tight">{emp.nama}</h2>
                <span className="bg-orange/20 text-amber-300 border border-orange/40 text-[10.5px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                  {emp.tag}
                </span>
              </div>
              <p className="text-[12.5px] md:text-[14.5px] text-white/80 font-medium">NIP: {emp.id} • {emp.jabatan}</p>
              <p className="text-[11.5px] text-white/60 mt-0.5">{emp.direktorat}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 self-stretch md:self-auto justify-around">
            <div className="text-center px-2">
              <span className="text-[10px] text-white/60 uppercase font-bold block">Rating Kinerja</span>
              <span className="text-[18px] font-extrabold text-amber-300">{emp.rating}</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-center px-2">
              <span className="text-[10px] text-white/60 uppercase font-bold block">Promosi Ready</span>
              <span className="text-[14px] font-bold text-emerald-300">{emp.ready}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Performance Rating", val: emp.kpis.rating, note: emp.kpis.ratingNote, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Potensi Kepemimpinan", val: emp.kpis.potensi, note: emp.kpis.potensiNote, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Pembelajaran (IDP)", val: emp.kpis.idp, note: emp.kpis.idpNote, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Kepatuhan Kode Etik", val: emp.kpis.etik, note: emp.kpis.etikNote, icon: CheckCircle, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-[24px] p-4 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] md:text-[12.5px] font-bold text-muted">{kpi.label}</span>
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", kpi.bg, kpi.color)}>
                  <Icon size={16} />
                </div>
              </div>
              <div>
                <p className="text-[18px] md:text-[22px] font-extrabold text-ink tracking-tight">{kpi.val}</p>
                <p className="text-[11px] font-bold text-emerald-600 mt-0.5">{kpi.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 9-Box Talent Grid & Competencies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 9-Box Talent Matrix */}
        <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[16px] font-bold text-ink">Matriks Talenta (9-Box Grid)</h3>
              <p className="text-[12px] text-muted">Pemetaan Potensi vs Kinerja Pegawai</p>
            </div>
            <span className="text-[11px] font-extrabold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              Kategori: {emp.boxName}
            </span>
          </div>

          {/* 3x3 Grid Visualizer */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            {[
              { title: "High Potential", sub: "Enigma", box: 0 },
              { title: "High Potential", sub: "Growth Driver", box: 1 },
              { title: "High Potential", sub: "Star / Top Talent", box: 2 },
              { title: "Med Potential", sub: "Dilemma", box: 3 },
              { title: "Med Potential", sub: "Core Performer", box: 4 },
              { title: "Med Potential", sub: "High Performer", box: 5 },
              { title: "Low Potential", sub: "Under Performer", box: 6 },
              { title: "Low Potential", sub: "Effective", box: 7 },
              { title: "Low Potential", sub: "Trusted Professional", box: 8 },
            ].map((cell, cIdx) => {
              const isActive = cell.box === emp.boxIndex;
              return (
                <div
                  key={cIdx}
                  className={cn(
                    "p-3 rounded-xl min-h-[75px] flex flex-col justify-center items-center text-center transition-all",
                    isActive
                      ? "bg-gradient-to-br from-orange to-amber-500 text-white font-bold shadow-md scale-105 ring-2 ring-orange/40"
                      : "bg-white text-slate-600 border border-slate-100 opacity-70"
                  )}
                >
                  <span className="text-[9.5px] opacity-80 uppercase tracking-wider block font-semibold">{cell.title}</span>
                  <span className="text-[11px] font-bold mt-0.5 leading-tight">{cell.sub}</span>
                  {isActive && <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full mt-1">Posisi {emp.nama.split(' ')[0]} ✨</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Competency Profile */}
        <div className="bg-white rounded-[28px] p-5 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-ink mb-1">Profil Kompetensi Utama</h3>
            <p className="text-[12px] text-muted mb-5">Pencapaian standar kompetensi {emp.nama}</p>

            <div className="space-y-4">
              {emp.competencies.map((comp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[12.5px] font-bold mb-1.5">
                    <span className="text-ink">{comp.name}</span>
                    <span className="text-orange">{comp.pct}% <span className="text-muted font-normal text-[11px]">(Target: {comp.target})</span></span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange to-amber-500 rounded-full transition-all duration-500" style={{ width: `${comp.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[12px]">
            <span className="text-muted font-medium">Individual Development Plan (IDP)</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">3 Program Aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function HelpdeskDashboard() {
  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-[16px] md:text-[20px] font-bold text-ink tracking-tight">Ringkasan Operasional</h2>
          <p className="text-[12px] md:text-[14px] text-muted">Data periode berjalan 2026</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-full text-[13px] md:text-[14px] font-bold text-ink hover:bg-slate-100 transition-colors self-start md:self-auto active:scale-95">
          <Filter className="w-4 h-4" />
          Filter Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 pb-2 md:pb-0 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
        {[
          { label: 'Total Tiket', value: '2,417', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Rata-Rata per Bulan', value: '201.4', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Tiket > SLA', value: '47', icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/10' },
          { label: 'On Hold', value: '6', icon: Filter, color: 'text-warn', bg: 'bg-warn/10' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="min-w-[150px] md:min-w-0 bg-white rounded-[24px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col gap-3 md:gap-4 overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all">
              <div className={`w-10 md:w-14 h-10 md:h-14 rounded-[16px] flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                <Icon className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[11px] md:text-[13px] font-bold text-muted uppercase tracking-wider mb-1">{kpi.label}</p>
                <h3 className="text-[24px] md:text-[32px] font-bold text-ink tracking-tight">{kpi.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-6">Tren Bulanan (Volume vs SLA)</h3>
        <div className="h-[250px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={MOCK_CHART_TIMELINE} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} cursor={{ fill: '#f8fafc' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
              <Bar yAxisId="left" dataKey="value1" name="Volume Utama" fill="#F26E22" radius={[6, 6, 0, 0]} maxBarSize={50} />
              <Line yAxisId="right" type="monotone" dataKey="value2" name="Indikator SLA" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-6">Distribusi Kategori Utama</h3>
          <div className="space-y-4 md:space-y-6">
            {MOCK_CHART_BAR_HORIZONTAL.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2.5">
                <div className="flex justify-between items-end">
                  <span className="text-[13px] md:text-[15px] font-bold text-ink">{item.name}</span>
                  <span className="text-[13px] md:text-[15px] font-bold text-ink">{item.value}</span>
                </div>
                <div className="w-full h-3 md:h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(item.value / 467) * 100}%`, backgroundColor: COLORS[idx % COLORS.length] }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex flex-col">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-2">Komposisi Tim</h3>
          <div className="flex-1 min-h-[220px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={MOCK_CHART_PIE} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value">
                  {MOCK_CHART_PIE.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function AsetDashboard() {
  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-[16px] md:text-[20px] font-bold text-ink tracking-tight">Kondisi & Distribusi Aset</h2>
          <p className="text-[12px] md:text-[14px] text-muted">Data aset terdaftar 2026</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-[13px] md:text-[14px] font-medium text-ink focus:outline-none">
            <option>Tahun: 2026</option>
          </select>
        </div>
      </div>

      {/* KPI Cards & Table */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-4 pb-2 md:pb-0 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 flex-1">
          {[
            { label: 'Total Aset', value: '3,438', icon: MonitorSmartphone, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Aset Baik', value: '3,362', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Aset Rusak', value: '25', icon: XCircle, color: 'text-danger', bg: 'bg-danger/10' }
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="min-w-[150px] md:min-w-0 bg-white rounded-[24px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col gap-3 md:gap-4 overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all">
                <div className={`w-10 md:w-14 h-10 md:h-14 rounded-[16px] flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div>
                  <p className="text-[11px] md:text-[13px] font-bold text-muted uppercase tracking-wider mb-1">{kpi.label}</p>
                  <h3 className="text-[24px] md:text-[32px] font-bold text-ink tracking-tight">{kpi.value}</h3>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend Table Desktop */}
        <div className="hidden lg:flex flex-col bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] min-w-[300px] border border-slate-50">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-muted" />
            <h3 className="text-[14px] font-bold text-ink">Keterangan Kelas Aset</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[12px] font-medium text-muted border-b border-slate-100 pb-2">
              <span>Asset Class</span>
              <span>Jenis Asset</span>
            </div>
            {[
              { cls: '700', type: 'Perangkat Keras' },
              { cls: '750, 751', type: 'Perangkat Lunak' },
              { cls: '950', type: 'LVA Perangkat Keras' },
              { cls: '960', type: 'LVA Perangkat Lunak' }
            ].map((row, i) => (
              <div key={i} className="flex justify-between text-[13px] font-medium text-ink">
                <span>{row.cls}</span>
                <span className="text-right">{row.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-6">Total Aset GSTI</h3>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_ASET_TIMELINE} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[2000, 4500]} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="value" name="Jumlah" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-6">Berdasarkan Jenis Aset</h3>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ASET_CLASS} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
                <Bar dataKey="c700" name="700" fill={ASET_COLORS[0]} radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="c750" name="750, 751, 752" fill={ASET_COLORS[1]} radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="c950" name="950" fill={ASET_COLORS[2]} radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="c960" name="960" fill={ASET_COLORS[3]} radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function AbsensiDashboard() {
  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Top Filter and Big KPI */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8 lg:items-stretch">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex-1 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex flex-col gap-1 w-full md:w-auto">
             <label className="text-[11px] font-bold text-muted ml-2">Group</label>
             <select className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-[13px] font-medium text-ink focus:outline-none w-full">
                <option>All</option>
             </select>
          </div>
          <div className="flex flex-col gap-1 w-full md:w-auto">
             <label className="text-[11px] font-bold text-muted ml-2">Month</label>
             <select className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-[13px] font-medium text-ink focus:outline-none w-full">
                <option>All</option>
             </select>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-[24px] md:rounded-[32px] p-6 shadow-sm flex flex-col justify-center items-center lg:min-w-[300px]">
          <p className="text-[12px] md:text-[14px] font-black tracking-wide text-emerald-700 uppercase mb-2 text-center bg-emerald-100/50 px-4 py-1.5 rounded-full inline-block">Rata-Rata Durasi Kerja</p>
          <div className="flex items-center gap-3">
             <Clock className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
             <h2 className="text-[36px] md:text-[46px] font-black text-emerald-600 tracking-tighter leading-none">09:38<span className="text-[20px] md:text-[24px] text-emerald-500/80 font-bold ml-1">14</span></h2>
          </div>
        </div>
      </div>

      {/* Middle Grid (Stacked Bar & Small Table) */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
        
        {/* Stacked Bar */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex-[2]">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-6">Jumlah Status Kehadiran Pegawai per Bulan</h3>
          <div className="h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ABSENSI_STATUS} margin={{ top: 20, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
                <Bar dataKey="normal" stackId="a" name="Normal" fill="#3B82F6" maxBarSize={70} />
                <Bar dataKey="cuti" stackId="a" name="Cuti" fill="#1E9E6A" maxBarSize={70} />
                <Bar dataKey="sakit" stackId="a" name="Sakit" fill="#D64545" maxBarSize={70} />
                <Bar dataKey="terlambat" stackId="a" name="Terlambat" fill="#E0A100" maxBarSize={70} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Small Data Table */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex-1 overflow-x-auto">
           <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-4 pb-3 border-b border-slate-100">Rata-Rata Durasi Kerja Pegawai</h3>
           <table className="w-full text-left min-w-[300px]">
             <thead>
               <tr className="text-[12px] text-muted border-b border-slate-50">
                 <th className="font-medium pb-2">Nama</th>
                 <th className="font-medium pb-2 text-center">Status</th>
                 <th className="font-medium pb-2 text-right">Durasi Kerja</th>
               </tr>
             </thead>
             <tbody>
               {MOCK_ABSENSI_RATA.map((row, i) => (
                 <tr key={i} className="border-b border-slate-50/50 last:border-none">
                   <td className="py-3 text-[13px] font-bold text-ink whitespace-nowrap">{row.nama}</td>
                   <td className="py-3 text-[12px] text-center">
                     <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{row.status}</span>
                   </td>
                   <td className="py-3 text-[13px] font-medium text-ink text-right">{row.durasi}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>

      {/* Main Detail Table */}
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] overflow-x-auto">
        <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-6">Detail Absensi Pegawai</h3>
        <div className="min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[12px] text-muted border-b-2 border-slate-100 bg-slate-50/50">
                <th className="font-bold p-4 rounded-tl-xl">Nama Pegawai</th>
                <th className="font-bold p-4">Group</th>
                <th className="font-bold p-4">Date</th>
                <th className="font-bold p-4 text-center">Jam Masuk</th>
                <th className="font-bold p-4 text-center">Jam Keluar</th>
                <th className="font-bold p-4 rounded-tr-xl">Status Absensi</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ABSENSI_DETAIL.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-[13.5px] font-bold text-ink">{row.nama}</td>
                  <td className="p-4 text-[13px] text-muted">{row.grup}</td>
                  <td className="p-4 text-[13px] text-ink font-medium">{row.date}</td>
                  <td className="p-4 text-[13px] font-mono text-center text-blue-600 bg-blue-50/30">{row.masuk}</td>
                  <td className="p-4 text-[13px] font-mono text-center text-orange-600 bg-orange-50/30">{row.keluar}</td>
                  <td className="p-4 text-[13px]">
                     <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Pies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        
        {/* Pie Terlambat */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex flex-col border-t-8 border-orange-400">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-2 text-center">Jumlah Pegawai Terlambat</h3>
          <div className="flex-1 min-h-[220px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={MOCK_ABSENSI_TERLAMBAT} cx="50%" cy="50%" innerRadius={0} outerRadius={90} dataKey="value" labelLine={false}>
                  {MOCK_ABSENSI_TERLAMBAT.map((entry, index) => <Cell key={`cell-${index}`} fill={ABSEN_COLORS[index % ABSEN_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Tidak Hadir */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] flex flex-col border-t-8 border-danger">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-2 text-center">Jumlah Pegawai Tidak Hadir</h3>
          <div className="flex-1 min-h-[220px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={MOCK_ABSENSI_TIDAK_HADIR} cx="50%" cy="50%" innerRadius={0} outerRadius={90} dataKey="value" labelLine={false}>
                  {MOCK_ABSENSI_TIDAK_HADIR.map((entry, index) => <Cell key={`cell-${index}`} fill={ABSEN_COLORS[index % ABSEN_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}

function KepegawaianDashboard() {
  const KEP_COLORS = ['#E0A100', '#F26E22', '#3B82F6', '#8B5CF6', '#D64545', '#10b981', '#64748b'];

  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Top Filter & Status Pegawai */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
        
        {/* Filters */}
        <div className="flex flex-col gap-4 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-sm md:w-[250px]">
          <div className="flex flex-col gap-1">
             <label className="text-[11px] font-bold text-muted ml-2">Group</label>
             <select className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-[13px] font-medium text-ink focus:outline-none w-full">
                <option>All</option>
             </select>
          </div>
          <div className="flex flex-col gap-1">
             <label className="text-[11px] font-bold text-muted ml-2">Jenis Kelamin</label>
             <select className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-[13px] font-medium text-ink focus:outline-none w-full">
                <option>All</option>
             </select>
          </div>
        </div>

        {/* KPI Status & Jumlah */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-50 border border-orange-100 rounded-[24px] p-5 shadow-sm">
            <h3 className="text-[12px] font-bold uppercase text-orange-700 text-center mb-4 border-b border-orange-200/50 pb-2">Status Pegawai DTIF</h3>
            <div className="space-y-3">
               <div className="flex justify-between font-bold text-ink"><span>Total Pegawai</span><span>72</span></div>
               <div className="flex justify-between font-medium text-ink"><span>Pegawai Tetap</span><span>32</span></div>
               <div className="flex justify-between font-medium text-ink"><span>Tenaga Alih Daya</span><span>40</span></div>
            </div>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-100 rounded-[24px] p-5 shadow-sm">
            <h3 className="text-[12px] font-bold uppercase text-emerald-700 text-center mb-4 border-b border-emerald-200/50 pb-2">Jumlah Pegawai DTIF</h3>
            <div className="space-y-3">
               <div className="flex justify-between font-bold text-ink"><span className="w-12">GPDT: 16</span> <span className="w-12">GPOT: 54</span> <span className="w-12">KJF: 2</span></div>
               <div className="flex justify-between text-[12px] text-muted"><span>P: 5</span> <span>P: 7</span> <span>P: 0</span></div>
               <div className="flex justify-between text-[12px] text-muted"><span>L: 11</span> <span>L: 47</span> <span>L: 2</span></div>
            </div>
          </div>
        </div>

        {/* Masa Kerja Pegawai */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm md:w-[250px] overflow-x-auto">
           <h3 className="text-[12px] font-bold uppercase text-muted text-center mb-4 border-b border-slate-100 pb-2">Masa Kerja Pegawai</h3>
           <div className="space-y-3">
             {MOCK_KEP_MASA_KERJA.map((row, i) => (
               <div key={i} className="flex justify-between items-center text-[11px] md:text-[12px] font-medium text-ink">
                 <span className="truncate pr-2">{row.nama}</span>
                 <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-md">{row.value}</span>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Middle Charts (3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        
        {/* Status */}
        <div className="bg-white rounded-[24px] p-5 md:p-6 shadow-sm">
          <h3 className="text-[13px] md:text-[15px] font-bold text-ink mb-4 text-center">Berdasarkan Status</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_KEP_STATUS} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} dy={5} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '10px' }} />
                <Bar dataKey="tetap" stackId="a" name="Pegawai Tetap" fill="#8B5CF6" maxBarSize={40} />
                <Bar dataKey="outsource" stackId="a" name="Tenaga Alih Daya" fill="#F26E22" maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Jenis Kelamin */}
        <div className="bg-white rounded-[24px] p-5 md:p-6 shadow-sm">
          <h3 className="text-[13px] md:text-[15px] font-bold text-ink mb-4 text-center">Berdasarkan Jenis Kelamin</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_KEP_GENDER} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} dy={5} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '10px' }} />
                <Bar dataKey="female" stackId="a" name="Female" fill="#F472B6" maxBarSize={40} />
                <Bar dataKey="male" stackId="a" name="Male" fill="#38BDF8" maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usia */}
        <div className="bg-white rounded-[24px] p-5 md:p-6 shadow-sm">
          <h3 className="text-[13px] md:text-[15px] font-bold text-ink mb-4 text-center">Berdasarkan Usia</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={MOCK_KEP_USIA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" name="Jumlah" radius={[0, 4, 4, 0]} maxBarSize={30}>
                   {MOCK_KEP_USIA.map((entry, index) => <Cell key={`cell-${index}`} fill={KEP_COLORS[index % KEP_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Lower Charts (2 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        
        {/* Pangkat (Pie) */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 shadow-sm">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-2 text-center">Pangkat Keseluruhan</h3>
          <div className="flex-1 min-h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={MOCK_KEP_PANGKAT_PIE} cx="50%" cy="50%" innerRadius={0} outerRadius={110} dataKey="value" labelLine={false}>
                  {MOCK_KEP_PANGKAT_PIE.map((entry, index) => <Cell key={`cell-${index}`} fill={KEP_COLORS[index % KEP_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingLeft: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pangkat per Divisi (Grouped Bar) */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 shadow-sm">
          <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-6 text-center">Pangkat per Divisi</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_KEP_PANGKAT_BAR} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px' }} />
                <Bar dataKey="am" name="Assistant Mgr" fill={KEP_COLORS[1]} maxBarSize={15} />
                <Bar dataKey="sm" name="Sub Mgr" fill={KEP_COLORS[2]} maxBarSize={15} />
                <Bar dataKey="jsm" name="Jr Sub Mgr" fill={KEP_COLORS[3]} maxBarSize={15} />
                <Bar dataKey="out" name="Outsource" fill={KEP_COLORS[0]} maxBarSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Detail Table */}
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm overflow-x-auto">
        <h3 className="text-[15px] md:text-[18px] font-bold text-ink mb-6">Detail Data Pegawai</h3>
        <div className="min-w-[900px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[12px] text-muted border-b-2 border-slate-100 bg-slate-50/50">
                <th className="font-bold p-4 rounded-tl-xl">Nama</th>
                <th className="font-bold p-4">Jenis Kelamin</th>
                <th className="font-bold p-4">Group</th>
                <th className="font-bold p-4 text-center">Umur</th>
                <th className="font-bold p-4 text-center">Masa Kerja</th>
                <th className="font-bold p-4">Pangkat</th>
                <th className="font-bold p-4 rounded-tr-xl">Status Pegawai</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_KEP_DETAIL.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-[13.5px] font-bold text-ink">{row.nama}</td>
                  <td className="p-4 text-[13px] text-muted">{row.kelamin}</td>
                  <td className="p-4 text-[13px] text-ink font-medium">{row.grup}</td>
                  <td className="p-4 text-[13px] font-mono text-center text-blue-600">{row.umur}</td>
                  <td className="p-4 text-[13px] font-mono text-center text-orange-600">{row.masa}</td>
                  <td className="p-4 text-[13px] font-medium text-ink">{row.pangkat}</td>
                  <td className="p-4 text-[13px]">
                     <span className={`font-bold px-3 py-1 rounded-full ${row.status === 'Pegawai Tetap' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function UangMukaView() {
  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col flex-1">
          <label className="text-[12px] font-bold text-ink mb-2">Filter By: Tanggal Diajukan</label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="text-[13px] text-ink font-medium">4/17/2023 - 7/14/2026</span>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-[12px] font-bold text-ink mb-2">Unit Kerja</label>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="text-[13px] text-ink font-medium">All</span>
            <span className="text-[12px] text-muted">▼</span>
          </div>
        </div>
      </div>

      {/* Summary KPI */}
      <div>
        <h2 className="text-[18px] md:text-[22px] font-bold text-ink mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 md:pb-0 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
          {[
            { title: 'Pengajuan Uang Muka Kegiatan /Diluar Perdin', value: '279', desc: 'Informasi jumlah pengajuan uang muka kegiatan' },
            { title: 'Pengajuan Uang Muka Pengadaan', value: '0', desc: 'Informasi jumlah pengajuan uang muka kegiatan atau diluar perjalanan dinas' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-[24px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col justify-between">
              <h3 className="text-[13px] md:text-[15px] font-bold text-ink mb-4 leading-tight">{kpi.title}</h3>
              <div>
                <h2 className="text-[32px] md:text-[40px] font-bold text-ink tracking-tight mb-2 leading-none">{kpi.value}</h2>
                <span className="text-[10px] font-bold text-white bg-orange px-2 py-0.5 rounded-full mb-3 inline-block">Pengajuan</span>
                <p className="text-[10px] md:text-[11px] text-muted leading-tight mt-1">{kpi.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Row 1: 2 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2">Status Persetujuan Pengajuan Uang Muka Kegiatan/Diluar Perdin</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-8">Informasi jumlah pengajuan uang muka kegiatan atau di luar perdin berdasarkan status persetujuan</p>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_UM_STATUS_KEGIATAN} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {MOCK_UM_STATUS_KEGIATAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2 self-start">Status Persetujuan Pengajuan Uang Muka Pengadaan</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-auto self-start">Informasi jumlah pengajuan uang muka pengadaan berdasarkan status persetujuan</p>
          <div className="text-muted text-[13px] font-medium mt-auto mb-auto">Tidak ada data</div>
        </div>
      </div>

      {/* Row 2: 2 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2">Status Persetujuan Pengajuan Reimbursement Kegiatan/Diluar Perdin</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-8">Informasi jumlah pengajuan reimbursement kegiatan atau di luar perdin berdasarkan status persetujuan</p>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_UM_STATUS_REIMBURSE_KEGIATAN} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} dy={10} interval={0} tickFormatter={(val) => val.includes('Approval') ? val.replace('Tahap Approval', 'Apprv') : val} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {MOCK_UM_STATUS_REIMBURSE_KEGIATAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2">Status Persetujuan Pengajuan Reimbursement Asset/IT/ATK</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-8">Informasi jumlah pengajuan reimbursement asset/IT/ATK berdasarkan status persetujuan</p>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_UM_STATUS_REIMBURSE_ASET} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {MOCK_UM_STATUS_REIMBURSE_ASET.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: 2 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2">Status Pertanggungjawaban UM Kegiatan/Di Luar Perdin</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-6">Informasi jumlah Pertanggungjawaban UM Kegiatan/Di Luar Perdin berdasarkan Status Pertanggungjawaban</p>
          <div className="h-[250px] w-full mt-auto relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_UM_SPJ_KEGIATAN} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none">
                  {MOCK_UM_SPJ_KEGIATAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
             {MOCK_UM_SPJ_KEGIATAN.map((item, idx) => (
               <div key={idx} className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                 <span className="text-[9px] font-medium text-muted">{item.name}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2 self-start">Status Pertanggungjawaban UM Pengadaan</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-auto self-start">Informasi jumlah Pertanggungjawaban UM Pengadaan berdasarkan Status Pertanggungjawaban</p>
          <div className="text-muted text-[13px] font-medium mt-auto mb-auto">Tidak ada data</div>
        </div>
      </div>

      {/* Row 4: 2 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2">SLA Pertanggungjawaban PJUM Kegiatan/Pembiayaan</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-6">Informasi SLA pertanggungjawaban uang muka kegiatan/pembiayaan berdasarkan SLA</p>
          <div className="h-[250px] w-full mt-auto relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_UM_SLA_KEGIATAN} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none">
                  {MOCK_UM_SLA_KEGIATAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
             {MOCK_UM_SLA_KEGIATAN.map((item, idx) => (
               <div key={idx} className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                 <span className="text-[9px] font-medium text-muted">{item.name}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2 self-start">SLA Pertanggungjawaban Uang Muka Pengadaan</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-auto self-start">Informasi SLA pertanggungjawaban uang muka pengadaan berdasarkan SLA</p>
          <div className="text-muted text-[13px] font-medium mt-auto mb-auto">Tidak ada data</div>
        </div>
      </div>

      {/* Table Data */}
      <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden mt-6 md:mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="text-[12px] text-muted border-b-2 border-slate-100 bg-slate-50/50 uppercase tracking-wider">
                <th className="font-bold p-4">Header Text</th>
                <th className="font-bold p-4">Nama Pemohon</th>
                <th className="font-bold p-4 text-center">Cost Center</th>
                <th className="font-bold p-4">Jenis Transaksi</th>
                <th className="font-bold p-4 text-center">Tanggal Diajukan</th>
                <th className="font-bold p-4 text-center">Tanggal Disetujui</th>
                <th className="font-bold p-4 text-center">Tanggal Dibayar</th>
                <th className="font-bold p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_UM_DETAIL.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-[13px] font-bold text-ink">{row.header}</td>
                  <td className="p-4 text-[13px] text-ink font-medium">{row.pemohon}</td>
                  <td className="p-4 text-[13px] text-center text-muted font-bold">{row.cc}</td>
                  <td className="p-4 text-[13px] text-muted">{row.jenis}</td>
                  <td className="p-4 text-[13px] font-medium text-center text-muted">{row.tglAju}</td>
                  <td className="p-4 text-[13px] font-medium text-center text-muted">{row.tglSetuju}</td>
                  <td className="p-4 text-[13px] font-medium text-center text-muted">{row.tglBayar}</td>
                  <td className="p-4 text-[13px] text-center">
                    <span className="text-emerald-600 px-3 py-1 font-bold uppercase">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PerdinView() {
  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col flex-1">
          <label className="text-[12px] font-bold text-ink mb-2">Filter By: Tanggal Diajukan</label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="text-[13px] text-ink font-medium">4/17/2023 - 7/14/2026</span>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-[12px] font-bold text-ink mb-2">Unit Kerja</label>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="text-[13px] text-ink font-medium">All</span>
            <span className="text-[12px] text-muted">▼</span>
          </div>
        </div>
      </div>

      {/* Summary KPI */}
      <div>
        <h2 className="text-[18px] md:text-[22px] font-bold text-ink mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 md:pb-0 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
          {[
            { title: 'Pengajuan Perjalanan Dinas', value: '2689', desc: 'Informasi jumlah pengajuan perjalan dinas dengan uang muka atau tidak' },
            { title: 'Pengajuan Reimbursement Kegiatan /Diluar Perdin', value: '5903', desc: 'Informasi pengajuan reimbursement kegiatan atau diluar perjalanan dinas' }
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-[24px] p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col justify-between">
              <h3 className="text-[13px] md:text-[15px] font-bold text-ink mb-4 leading-tight">{kpi.title}</h3>
              <div>
                <h2 className="text-[32px] md:text-[40px] font-bold text-ink tracking-tight mb-2 leading-none">{kpi.value}</h2>
                <span className="text-[10px] font-bold text-white bg-orange px-2 py-0.5 rounded-full mb-3 inline-block">Pengajuan</span>
                <p className="text-[10px] md:text-[11px] text-muted leading-tight mt-1">{kpi.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2">Status Persetujuan Pengajuan Perjalanan Dinas</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-8">Informasi jumlah pengajuan perjalanan dinas berdasarkan status persetujuan</p>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_UM_STATUS_KEGIATAN} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {MOCK_UM_STATUS_KEGIATAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2">Status Pertanggungjawaban Perjalanan Dinas</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-6">Informasi jumlah pertanggungjawaban perjalanan dinas berdasarkan status</p>
          <div className="h-[250px] w-full mt-auto relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_UM_SPJ_KEGIATAN} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none">
                  {MOCK_UM_SPJ_KEGIATAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
             {MOCK_UM_SPJ_KEGIATAN.map((item, idx) => (
               <div key={idx} className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                 <span className="text-[9px] font-medium text-muted">{item.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
      
      {/* Table Data for Perdin */}
      <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 overflow-hidden mt-6 md:mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="text-[12px] text-muted border-b-2 border-slate-100 bg-slate-50/50 uppercase tracking-wider">
                <th className="font-bold p-4">No. Surat Tugas</th>
                <th className="font-bold p-4">Nama Pegawai</th>
                <th className="font-bold p-4 text-center">Tujuan</th>
                <th className="font-bold p-4 text-center">Durasi</th>
                <th className="font-bold p-4 text-center">Tanggal Berangkat</th>
                <th className="font-bold p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_UM_DETAIL.slice(0, 3).map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-[13px] font-bold text-ink">ST-{2024 + i}/0{i+1}</td>
                  <td className="p-4 text-[13px] text-ink font-medium">{row.pemohon}</td>
                  <td className="p-4 text-[13px] text-center text-muted font-bold">Jakarta - Bali</td>
                  <td className="p-4 text-[13px] font-medium text-center text-muted">{i + 2} Hari</td>
                  <td className="p-4 text-[13px] font-medium text-center text-muted">{row.tglAju}</td>
                  <td className="p-4 text-[13px] text-center">
                    <span className="text-emerald-600 px-3 py-1 font-bold uppercase">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PembayaranView() {
  return (
    <div className="px-5 md:px-8 mt-4 space-y-6 md:space-y-8 pb-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col flex-1">
          <label className="text-[12px] font-bold text-ink mb-2">Filter By: Tanggal Diajukan</label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="text-[13px] text-ink font-medium">4/17/2023 - 7/14/2026</span>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-[12px] font-bold text-ink mb-2">Unit Kerja</label>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="text-[13px] text-ink font-medium">All</span>
            <span className="text-[12px] text-muted">▼</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2">Antrian Pembayaran (SAP/CMS)</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-8">Informasi jumlah antrian pembayaran berdasarkan status proses</p>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_UM_STATUS_REIMBURSE_KEGIATAN} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {MOCK_UM_STATUS_REIMBURSE_KEGIATAN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border border-slate-50 flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-[14px] md:text-[16px] font-bold text-ink mb-2 self-start">Realisasi Pembayaran</h3>
          <p className="text-[10px] md:text-[12px] text-muted mb-auto self-start">Informasi proporsi realisasi pembayaran bulan ini</p>
          <div className="text-muted text-[13px] font-medium mt-auto mb-auto">Dalam proses penarikan data dari SAP</div>
        </div>
      </div>
    </div>
  );
}

