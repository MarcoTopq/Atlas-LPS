"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Building2,
  Users,
  Coins,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Briefcase,
  PieChart as PieIcon,
  ChevronRight,
  Activity,
  ArrowRight,
  HeartPulse,
  Scale
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { cn } from "@/lib/utils";
import IndonesiaResolusiMap from "./IndonesiaResolusiMap";

// --- DATA MOCK PERENCANAAN & RESOLUSI ASURANSI ---

// Tab 1: Data Umum
const DATA_STATUS_DUEDIL_ASURANSI = [
  { name: "Selesai", value: 9, color: "#EA580C" },
  { name: "Tidak selesai", value: 5, color: "#0F766E" },
];

const DATA_STATUS_ASURANSI = [
  { name: "TDS (Tidak Dapat Disehatkan)", value: 7, color: "#EA580C" },
  { name: "DPI (Pengawasan Intensif)", value: 4, color: "#0F766E" },
  { name: "DPK (Pengawasan Khusus)", value: 3, color: "#CA8A04" },
];

const DATA_SDM_JABATAN_ASURANSI = [
  { name: "Direktur Grup Resolusi", value: 1, color: "#0F766E" },
  { name: "Kepala Divisi Aktuaria", value: 3, color: "#EA580C" },
  { name: "Kepala Tim Likuidasi", value: 6, color: "#CA8A04" },
];

const DATA_SDM_MASA_KERJA_ASURANSI = [
  { name: "< 1 th", value: 15, color: "#EA580C" },
  { name: "1 - 5 th", value: 45, color: "#F97316" },
  { name: "5 - 10 th", value: 25, color: "#0F766E" },
  { name: "> 10 th", value: 15, color: "#CA8A04" },
];

const DATA_PROFIL_ASURANSI = [
  { pa: "Asuransi Jiwa A", tglBdpi: "Jul 2024", status: "TDS", jenis: "Jiwa", rbc: "42.5%" },
  { pa: "Asuransi Umum B", tglBdpi: "Okt 2024", status: "TDS", jenis: "Umum", rbc: "55.8%" },
  { pa: "Asuransi Jiwa C", tglBdpi: "Nov 2024", status: "TDS", jenis: "Jiwa", rbc: "38.2%" },
  { pa: "Asuransi Umum D", tglBdpi: "Jan 2025", status: "TDS", jenis: "Umum", rbc: "48.0%" },
  { pa: "Asuransi Jiwa E", tglBdpi: "Mar 2025", status: "DPI", jenis: "Jiwa", rbc: "82.4%" },
  { pa: "Asuransi Umum F", tglBdpi: "Mei 2025", status: "TDS", jenis: "Umum", rbc: "35.6%" },
  { pa: "Asuransi Jiwa G", tglBdpi: "Agu 2025", status: "TDS", jenis: "Jiwa", rbc: "41.0%" },
  { pa: "Asuransi Jiwa H", tglBdpi: "Sep 2025", status: "TDS", jenis: "Jiwa", rbc: "49.5%" },
  { pa: "Asuransi Umum I", tglBdpi: "Okt 2025", status: "TDS", jenis: "Umum", rbc: "52.3%" },
  { pa: "Asuransi Jiwa J", tglBdpi: "Nov 2025", status: "TDS", jenis: "Jiwa", rbc: "39.8%" },
  { pa: "Asuransi Umum K", tglBdpi: "Des 2025", status: "TDS", jenis: "Umum", rbc: "44.2%" },
  { pa: "Asuransi Jiwa L", tglBdpi: "Jan 2026", status: "DPK", jenis: "Jiwa", rbc: "95.6%" },
  { pa: "Asuransi Jiwa M", tglBdpi: "Feb 2026", status: "DPK", jenis: "Jiwa", rbc: "91.2%" },
  { pa: "Asuransi Umum N", tglBdpi: "Mar 2026", status: "DPI", jenis: "Umum", rbc: "88.5%" },
];

// Tab 2: Perencanaan
const DATA_LIKUIDITAS_ASURANSI = [
  { name: "Normal", value: 4, color: "#CA8A04" },
  { name: "Mismatch Klaim Mingguan", value: 6, color: "#0F766E" },
  { name: "Mismatch Klaim Dalam", value: 4, color: "#EA580C" },
];

const DATA_RED_FLAG_ASURANSI = [
  { name: "At Risk", value: 7, color: "#EA580C" },
  { name: "Failing", value: 5, color: "#CA8A04" },
  { name: "Normal", value: 2, color: "#0F766E" },
];

const DATA_RBC_ASURANSI = [
  { name: "< 50%", value: 6, color: "#EA580C" },
  { name: "50% - 80%", value: 4, color: "#0F766E" },
  { name: "80% - 100%", value: 3, color: "#CA8A04" },
  { name: "100% - 120%", value: 1, color: "#64748B" },
];

const DATA_SOLVABILITAS_ASURANSI = [
  { name: "Solven", value: 9, color: "#EA580C" },
  { name: "Insolven", value: 5, color: "#0F766E" },
];

const DATA_PA_DISERAHKAN = [
  { kode: "AJ-004", redFlag: "At Risk", ratingLps: 4, statusOjk: "Normal" },
  { kode: "AU-012", redFlag: "Failing", ratingLps: 1, statusOjk: "Normal" },
  { kode: "AJ-018", redFlag: "Failing", ratingLps: 2, statusOjk: "TDS" },
  { kode: "AU-025", redFlag: "At Risk", ratingLps: 4, statusOjk: "Normal" },
  { kode: "AJ-031", redFlag: "Failing", ratingLps: 4, statusOjk: "Normal" },
  { kode: "AJ-039", redFlag: "Failing", ratingLps: 2, statusOjk: "DPI" },
  { kode: "AU-044", redFlag: "Failing", ratingLps: 4, statusOjk: "Normal" },
  { kode: "AJ-052", redFlag: "At Risk", ratingLps: 1, statusOjk: "TDS" },
];

// Tab 3: Progress Penanganan
const DATA_AKTIVITAS_ASURANSI = [
  { name: "Pengalihan Portofolio Polis", count: 5, color: "#475569" },
  { name: "Restrukturisasi & Bail-in", count: 4, color: "#EA580C" },
  { name: "Analisis Metode Resolusi", count: 3, color: "#F97316" },
  { name: "Perusahaan Asuransi Perantara", count: 2, color: "#475569" },
  { name: "Likuidasi Asuransi", count: 1, color: "#0F766E" },
  { name: "Uji Tuntas Aktuaria", count: 1, color: "#CA8A04" },
];

const DATA_PA_PROGRESS = [
  { pa: "Asuransi Jiwa A", aset: "4,250,180.00", aktivitas: "Uji Tuntas Aktuaria", progress: 85 },
  { pa: "Asuransi Umum B", aset: "1,320,400.00", aktivitas: "Analisis Metode Resolusi", progress: 60 },
  { pa: "Asuransi Jiwa C", aset: "2,840,650.00", aktivitas: "Analisis Metode Resolusi", progress: 20 },
  { pa: "Asuransi Umum D", aset: "980,200.00", aktivitas: "Asuransi Perantara", progress: 70 },
  { pa: "Asuransi Jiwa E", aset: "8,650,400.00", aktivitas: "Pengalihan Portofolio", progress: 90 },
  { pa: "Asuransi Umum F", aset: "840,150.00", aktivitas: "Analisis Metode Resolusi", progress: 30 },
  { pa: "Asuransi Jiwa G", aset: "2,100,500.00", aktivitas: "Restrukturisasi Polis", progress: 80 },
  { pa: "Asuransi Jiwa H", aset: "3,750,200.00", aktivitas: "Restrukturisasi Polis", progress: 45 },
  { pa: "Asuransi Umum I", aset: "2,980,100.00", aktivitas: "Restrukturisasi Polis", progress: 80 },
  { pa: "Asuransi Jiwa J", aset: "1,450,800.00", aktivitas: "Likuidasi Asuransi", progress: 25 },
  { pa: "Asuransi Umum K", aset: "1,620,300.00", aktivitas: "Restrukturisasi Polis", progress: 80 },
  { pa: "Asuransi Jiwa L", aset: "1,150,250.00", aktivitas: "Asuransi Perantara", progress: 80 },
  { pa: "Asuransi Jiwa M", aset: "2,420,100.00", aktivitas: "Pengalihan Portofolio", progress: 55 },
  { pa: "Asuransi Umum N", aset: "3,850,000.00", aktivitas: "Pengalihan Portofolio", progress: 80 },
];

// Tab 4: Bantuan Likuiditas
const DATA_PINJAMAN_ASURANSI_BAR = [
  { pa: "Asuransi Jiwa E", nilai: 4.8, tipe: "Pinjaman Likuiditas" },
  { pa: "Asuransi Umum N", nilai: 3.5, tipe: "Pinjaman Likuiditas" },
  { pa: "Asuransi Jiwa H", nilai: 2.8, tipe: "Penjaminan Pengalihan" },
  { pa: "Asuransi Jiwa A", nilai: 2.0, tipe: "Pinjaman Likuiditas" },
  { pa: "Asuransi Umum I", nilai: 1.6, tipe: "Pinjaman Likuiditas" },
  { pa: "Asuransi Jiwa G", nilai: 1.2, tipe: "Penjaminan Pengalihan" },
  { pa: "Asuransi Umum B", nilai: 0.9, tipe: "Pinjaman Likuiditas" },
  { pa: "Asuransi Jiwa C", nilai: 0.6, tipe: "Pinjaman Likuiditas" },
];

// Tab 5: Pengelolaan Aset
const DATA_SEGMEN_ASET_ASURANSI = [
  { segmen: "SBN & Obligasi", nilaiAset: 24.5, recovery: 14.8 },
  { segmen: "Properti & Gedung", nilaiAset: 18.2, recovery: 8.5 },
  { segmen: "Saham & Reksadana", nilaiAset: 12.0, recovery: 6.2 },
  { segmen: "Piutang Premi / Koas", nilaiAset: 4.8, recovery: 2.1 },
  { segmen: "Klaim Reasuransi", nilaiAset: 3.2, recovery: 1.5 },
];

export default function DashboardResolusiAsuransi() {
  const [activeTab, setActiveTab] = useState<
    "Data Umum" | "Perencanaan" | "Progress Penanganan" | "Progress Bantuan Likuiditas" | "Pengelolaan Aset"
  >("Data Umum");

  const tabs = [
    { id: "Data Umum", label: "Data Umum" },
    { id: "Perencanaan", label: "Perencanaan (PRP)" },
    { id: "Progress Penanganan", label: "Progress Penanganan" },
    { id: "Progress Bantuan Likuiditas", label: "Bantuan Likuiditas Polis" },
    { id: "Pengelolaan Aset", label: "Pengelolaan Aset" },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300 w-full text-[#172033]">
      
      {/* 5-TAB SUB-NAV SWITCHER */}
      <div className="bg-white p-1.5 rounded-2xl shadow-2xs border border-[#EAECF0] flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 py-2.5 px-3.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all text-center cursor-pointer select-none whitespace-nowrap",
                isActive
                  ? "bg-[#EA580C] text-white shadow-xs"
                  : "bg-transparent text-[#667085] hover:text-[#172033] hover:bg-[#F9FAFB]"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DATA UMUM ASURANSI */}
      {/* ========================================================================= */}
      {activeTab === "Data Umum" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          {/* Top Row: 14 Perusahaan + 2 Donuts + Rp35T Dana PPP */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Stat Perusahaan Asuransi & Cabang */}
            <div className="col-span-12 md:col-span-3 bg-white p-4 sm:p-5 rounded-2xl shadow-2xs border border-[#EAECF0] flex items-center gap-4">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-[#172033] block">14</span>
                <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Perusahaan Asuransi</span>
              </div>
              <div className="h-14 w-px bg-[#EAECF0]" />
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-[#172033] block">185</span>
                  <span className="text-[#667085] text-[11px]">Kantor Cabang</span>
                </div>
                <div>
                  <span className="font-bold text-[#172033] block">420</span>
                  <span className="text-[#667085] text-[11px]">Kantor Pemasaran</span>
                </div>
              </div>
            </div>

            {/* Donut: Status Duedil */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
              <h4 className="text-[11.5px] font-bold text-[#475467] text-center">
                Jumlah PA by Status Duedil
              </h4>
              <div className="h-32 w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DATA_STATUS_DUEDIL_ASURANSI}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={52}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {DATA_STATUS_DUEDIL_ASURANSI.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-3 text-[10.5px] font-semibold">
                <span className="flex items-center gap-1 text-[#EA580C]">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C]" /> Selesai (9)
                </span>
                <span className="flex items-center gap-1 text-[#0F766E]">
                  <span className="w-2 h-2 rounded-full bg-[#0F766E]" /> Tidak selesai (5)
                </span>
              </div>
            </div>

            {/* Donut: Status Pengawasan OJK/LPS */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
              <h4 className="text-[11.5px] font-bold text-[#475467] text-center">
                Jumlah PA by Status Resolusi
              </h4>
              <div className="h-32 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DATA_STATUS_ASURANSI}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={52}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {DATA_STATUS_ASURANSI.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[10px] font-semibold text-[#475467]">
                <span className="text-[#EA580C]">TDS: 7</span>
                <span className="text-[#0F766E]">DPI: 4</span>
                <span className="text-[#CA8A04]">DPK: 3</span>
              </div>
            </div>

            {/* Dana Cadangan PPP LPS */}
            <div className="col-span-12 md:col-span-3 bg-white p-4 sm:p-5 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-black text-[#172033] block">Rp35T</span>
                  <span className="text-[11px] font-bold text-[#667085] uppercase">Dana Penjaminan Polis</span>
                </div>
                <Coins className="w-8 h-8 text-[#EA580C] opacity-80" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10.5px] pt-3 border-t border-[#EAECF0]">
                <div className="flex justify-between font-mono">
                  <span>Investasi SBN:</span>
                  <span className="font-bold">Rp30,00 T</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Kas & Setara:</span>
                  <span className="font-bold">Rp5,00 T</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Iuran Premi PPP:</span>
                  <span className="font-bold text-orange-600">Rp8,50 T</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Batas Pinjaman:</span>
                  <span className="font-bold">Rp12,00 T</span>
                </div>
              </div>
            </div>

          </div>

          {/* Middle Row: Profil Asuransi Table + Map Coverage + Profil SDM */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Left: Table Profil Perusahaan Asuransi */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#EA580C] mb-2.5">
                Profil Perusahaan Asuransi Resolusi
              </h4>
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-[#F9FAFB] text-[10px] font-bold text-[#667085] border-b border-[#EAECF0]">
                    <tr>
                      <th className="p-2">Entitas PA</th>
                      <th className="p-2">Tgl Resolusi</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Lini Usaha</th>
                      <th className="p-2 text-right">RBC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0] text-[11px]">
                    {DATA_PROFIL_ASURANSI.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F9FAFB]">
                        <td className="p-2 font-bold text-[#172033]">{row.pa}</td>
                        <td className="p-2 text-[#667085]">{row.tglBdpi}</td>
                        <td className="p-2">
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-[9.5px] font-bold",
                            row.status === "TDS" ? "bg-orange-50 text-orange-700" :
                            row.status === "DPI" ? "bg-teal-50 text-teal-700" : "bg-yellow-50 text-yellow-700"
                          )}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-2 font-semibold">{row.jenis}</td>
                        <td className="p-2 text-right font-mono font-bold text-[#172033]">{row.rbc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Center: Map Indonesia (GIS Esri Style) */}
            <div className="col-span-12 md:col-span-6 xl:col-span-5 bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs sm:text-[13px] font-bold text-[#EA580C]">
                  Sebaran Kantor Cabang & Portofolio Asuransi by Provinsi
                </h4>
              </div>
              <IndonesiaResolusiMap />
            </div>

            {/* Right: Tim Likuidasi & Aktuaria Asuransi (Horizontal row on iPad, vertical stack on desktop) */}
            <div className="col-span-12 md:col-span-12 xl:col-span-3 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
              
              {/* Jumlah SDM */}
              <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] text-center flex flex-col justify-center">
                <span className="text-3xl font-black text-[#172033] block">180</span>
                <span className="text-[11px] font-bold text-[#667085] uppercase">Tenaga Ahli Resolusi Asuransi</span>
              </div>

              {/* Donut Profil Jabatan */}
              <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-[#EAECF0]">
                <h5 className="text-[11px] font-bold text-[#475467] mb-1">
                  Struktur Tim Resolusi
                </h5>
                <div className="h-28 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={DATA_SDM_JABATAN_ASURANSI}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={44}
                        dataKey="value"
                      >
                        {DATA_SDM_JABATAN_ASURANSI.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Donut Keahlian & Masa Kerja */}
              <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-[#EAECF0]">
                <h5 className="text-[11px] font-bold text-[#475467] mb-1">
                  Keahlian Aktuaria & Masa Kerja
                </h5>
                <div className="h-28 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={DATA_SDM_MASA_KERJA_ASURANSI}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={44}
                        dataKey="value"
                      >
                        {DATA_SDM_MASA_KERJA_ASURANSI.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PERENCANAAN (PRP ASURANSI) */}
      {/* ========================================================================= */}
      {activeTab === "Perencanaan" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          {/* Top Banner Status PRP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-[#EAECF0] shadow-2xs">
              <span className="text-[11px] font-bold text-[#EA580C] uppercase block">
                Status Stabilitas Industri Asuransi
              </span>
              <h3 className="text-lg font-black text-[#172033] mt-0.5">
                WASPADA / SIAGA RESOLUSI
              </h3>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#EAECF0] shadow-2xs">
              <span className="text-[11px] font-bold text-[#EA580C] uppercase block">
                Rekomendasi Skema Resolusi
              </span>
              <h3 className="text-lg font-black text-[#172033] mt-0.5">
                PENGALIHAN PORTOFOLIO POLIS
              </h3>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#EAECF0] shadow-2xs">
              <span className="text-[11px] font-bold text-[#475467] uppercase block">
                Perkiraan Kebutuhan SDM
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#172033]">145</span>
                <span className="text-xs text-[#667085]">Aktuaris & Likuidator</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#EAECF0] shadow-2xs">
              <span className="text-[11px] font-bold text-[#475467] uppercase block">
                Perkiraan Biaya Resolusi
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#EA580C]">48.65T</span>
                <span className="text-xs text-[#667085]">Rupiah</span>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Kondisi Likuiditas Klaim Asuransi */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 bg-white p-4 rounded-2xl border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#475467] mb-2">
                Kondisi Likuiditas Klaim Asuransi
              </h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DATA_LIKUIDITAS_ASURANSI} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                      {DATA_LIKUIDITAS_ASURANSI.map((e, idx) => (
                        <Cell key={`cell-${idx}`} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[10px] font-semibold pt-1">
                <span className="text-[#CA8A04]">Normal (4)</span>
                <span className="text-[#0F766E]">Mismatch Mingguan (6)</span>
                <span className="text-[#EA580C]">Mismatch Dalam (4)</span>
              </div>
            </div>

            {/* Red Flag for Resolution Asuransi */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 bg-white p-4 rounded-2xl border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#EA580C] mb-2">
                Red Flag for Resolution Asuransi
              </h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DATA_RED_FLAG_ASURANSI} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                      {DATA_RED_FLAG_ASURANSI.map((e, idx) => (
                        <Cell key={`cell-${idx}`} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[10px] font-semibold pt-1">
                <span className="text-[#EA580C]">At Risk (7)</span>
                <span className="text-[#CA8A04]">Failing (5)</span>
                <span className="text-[#0F766E]">Normal (2)</span>
              </div>
            </div>

            {/* Rasio Solvabilitas (RBC) Perusahaan Asuransi */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 bg-white p-4 rounded-2xl border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#475467] mb-2">
                Rasio Solvabilitas (RBC) Asuransi
              </h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_RBC_ASURANSI}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 9.5 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#EA580C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Table PA Diserahkan OJK + Sumber Daya LPS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            <div className="col-span-12 md:col-span-8 bg-white rounded-2xl p-4 border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#EA580C] mb-2">
                Perkiraan Perusahaan Asuransi Diserahkan OJK ke LPS
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F9FAFB] text-[10px] font-bold text-[#667085]">
                    <tr>
                      <th className="p-2">Kode PA</th>
                      <th className="p-2">Red Flag Resolusi</th>
                      <th className="p-2">Rating LPS</th>
                      <th className="p-2">Status OJK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0] text-[11px]">
                    {DATA_PA_DISERAHKAN.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F9FAFB]">
                        <td className="p-2 font-mono font-bold text-[#172033]">{row.kode}</td>
                        <td className="p-2">
                          <span className={cn(
                            "px-1.5 py-0.5 rounded font-bold text-[9.5px]",
                            row.redFlag === "At Risk" ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"
                          )}>
                            {row.redFlag}
                          </span>
                        </td>
                        <td className="p-2 font-mono font-bold">Rating {row.ratingLps}</td>
                        <td className="p-2 font-semibold text-[#475467]">{row.statusOjk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ketersediaan Sumber Daya LPS */}
            <div className="col-span-12 md:col-span-4 bg-orange-50/50 rounded-2xl p-4 border border-orange-200 space-y-3">
              <h4 className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Ketersediaan Sumber Daya LPS
              </h4>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-2xs">
                  <span className="text-2xl font-black text-[#172033]">180</span>
                  <span className="text-[10.5px] text-[#667085] block">Tenaga Ahli Aktuaria</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-2xs">
                  <span className="text-2xl font-black text-[#EA580C]">Rp35T</span>
                  <span className="text-[10.5px] text-[#667085] block">Dana Cadangan PPP</span>
                </div>
              </div>
              <p className="text-[10.5px] text-[#475467] leading-relaxed">
                Diperlukan aktivasi jalur koordinasi bersama Asosiasi (AAJI & AAUI) serta pengelola statuter untuk percepatan pengalihan portofolio polis dan mitigasi risiko sistemik.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PROGRESS PENANGANAN ASURANSI */}
      {/* ========================================================================= */}
      {activeTab === "Progress Penanganan" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          {/* Top Progress Stat */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            <div className="sm:col-span-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#EAECF0] shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-[#172033]">14</span>
                  <div className="text-xs text-[#667085]">
                    <span className="font-bold text-[#172033] block">Perusahaan Asuransi</span>
                    <span>Dalam Penanganan LPS</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-[#EAECF0]">
                <span className="text-3xl sm:text-4xl font-black text-[#EA580C] block">58.40%</span>
                <span className="text-xs font-semibold text-[#667085]">Average of Progress</span>
              </div>
            </div>

            {/* Donut Aktivitas Penanganan */}
            <div className="sm:col-span-4 bg-white p-4 rounded-2xl border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#475467] text-center mb-1">
                Progress by Aktivitas Penanganan
              </h4>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DATA_AKTIVITAS_ASURANSI} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="count">
                      {DATA_AKTIVITAS_ASURANSI.map((e, idx) => (
                        <Cell key={`cell-${idx}`} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Status Resolusi */}
            <div className="sm:col-span-4 bg-white p-4 rounded-2xl border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#475467] text-center mb-1">
                Jumlah PA by Status
              </h4>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DATA_STATUS_ASURANSI} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                      {DATA_STATUS_ASURANSI.map((e, idx) => (
                        <Cell key={`cell-${idx}`} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Table Progress & Horizontal Bar Aktivitas */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Table Progress PA */}
            <div className="col-span-12 md:col-span-5 bg-white rounded-2xl p-4 border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#EA580C] mb-2.5">
                Daftar Portofolio PA & Progress Penanganan
              </h4>
              <div className="overflow-x-auto max-h-80 overflow-y-auto scrollbar-thin">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-[#F9FAFB] text-[10px] font-bold text-[#667085]">
                    <tr>
                      <th className="p-2">Entitas PA</th>
                      <th className="p-2 text-right">Nilai Aset (Jt)</th>
                      <th className="p-2">Aktivitas</th>
                      <th className="p-2 text-right">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0] text-[11px]">
                    {DATA_PA_PROGRESS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F9FAFB]">
                        <td className="p-2 font-bold text-[#172033]">{row.pa}</td>
                        <td className="p-2 text-right font-mono">{row.aset}</td>
                        <td className="p-2 text-[10px] text-[#475467]">{row.aktivitas}</td>
                        <td className="p-2 text-right font-mono font-bold text-[#EA580C]">{row.progress}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Horizontal Bar Chart Aktivitas */}
            <div className="col-span-12 md:col-span-7 bg-white rounded-2xl p-4 border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#475467] mb-2">
                Jumlah PA by Aktivitas Penanganan & PIC Tim Resolusi Asuransi
              </h4>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={DATA_AKTIVITAS_ASURANSI} margin={{ left: 80, right: 20, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#EA580C" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BANTUAN LIKUIDITAS POLIS */}
      {/* ========================================================================= */}
      {activeTab === "Progress Bantuan Likuiditas" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-4 bg-white p-4 rounded-2xl border border-[#EAECF0] shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#172033] block">8</span>
                <span className="text-xs text-[#667085] font-semibold">Perusahaan Asuransi Penerima Pinjaman</span>
              </div>
              <div className="pt-3 border-t border-[#EAECF0]">
                <span className="text-3xl font-black text-[#EA580C] block">54.20%</span>
                <span className="text-xs text-[#667085]">Average of Progress</span>
              </div>
            </div>

            {/* Pinjaman Bar Chart */}
            <div className="sm:col-span-8 bg-white p-4 rounded-2xl border border-[#EAECF0] shadow-2xs">
              <h4 className="text-xs font-bold text-[#EA580C] mb-2">
                Nilai Pinjaman Likuiditas & Penjaminan Pengalihan Polis (Rp Triliun)
              </h4>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_PINJAMAN_ASURANSI_BAR}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="pa" tick={{ fontSize: 9.5 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v) => [`Rp ${v} Triliun`, "Nilai"]} />
                    <Bar dataKey="nilai" fill="#EA580C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PENGELOLAAN ASET ASURANSI */}
      {/* ========================================================================= */}
      {activeTab === "Pengelolaan Aset" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-[#EAECF0] shadow-2xs">
              <span className="text-[10.5px] uppercase font-bold text-[#EA580C] block">Tim Likuidasi LPS</span>
              <span className="text-lg font-black text-[#172033] mt-0.5 block">Rp 24,50 T</span>
              <span className="text-[10px] text-emerald-600 font-bold">Recovery: Rp 14,80 T</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#EAECF0] shadow-2xs">
              <span className="text-[10.5px] uppercase font-bold text-[#0F766E] block">Pengelola Statuter</span>
              <span className="text-lg font-black text-[#172033] mt-0.5 block">Rp 18,20 T</span>
              <span className="text-[10px] text-emerald-600 font-bold">Recovery: Rp 8,50 T</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#EAECF0] shadow-2xs">
              <span className="text-[10.5px] uppercase font-bold text-[#CA8A04] block">Konsorsium Asuransi</span>
              <span className="text-lg font-black text-[#172033] mt-0.5 block">Rp 12,00 T</span>
              <span className="text-[10px] text-emerald-600 font-bold">Recovery: Rp 6,20 T</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#EAECF0] shadow-2xs">
              <span className="text-[10.5px] uppercase font-bold text-[#475467] block">Total Recovery Aset</span>
              <span className="text-lg font-black text-[#EA580C] mt-0.5 block">Rp 33,10 T</span>
              <span className="text-[10px] text-[#667085]">52.8% Tingkat Pemulihan</span>
            </div>
          </div>

          {/* Grouped Bar: Nilai Aset vs Recovery by Segmen */}
          <div className="bg-white rounded-2xl p-4 border border-[#EAECF0] shadow-2xs space-y-2">
            <h4 className="text-xs font-bold text-[#EA580C]">
              Nilai Aset & Realisasi Recovery by Segmen Investasi & Properti Asuransi (Rp Triliun)
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_SEGMEN_ASET_ASURANSI} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="segmen" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v) => [`Rp ${v} Triliun`, ""]} />
                  <Bar dataKey="nilaiAset" name="Nilai Aset Terdaftar" fill="#EA580C" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="recovery" name="Realisasi Recovery" fill="#0F766E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
