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
  ArrowRight
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

// --- DATA MOCK PERENCANAAN & RESOLUSI BANK ---

// Tab 1: Data Umum
const DATA_STATUS_DUEDIL = [
  { name: "Selesai", value: 14, color: "#EA580C" },
  { name: "Tidak selesai", value: 4, color: "#0F766E" },
  { name: "Tidak Duedil", value: 3, color: "#CA8A04" },
];

const DATA_STATUS_BANK = [
  { name: "TDS", value: 11, color: "#EA580C" },
  { name: "BDPI", value: 6, color: "#0F766E" },
  { name: "BDPK", value: 4, color: "#CA8A04" },
];

const DATA_PROFIL_JABATAN = [
  { name: "Kepala Divisi", value: 24, color: "#EA580C" },
  { name: "Direktur Group", value: 8, color: "#0F766E" },
  { name: "Kepala Tim", value: 48, color: "#CA8A04" },
];

const DATA_MASA_KERJA = [
  { name: "< 1 thn", value: 45, color: "#EA580C" },
  { name: "1-5 thn", value: 120, color: "#F97316" },
  { name: "5-10 thn", value: 85, color: "#0F766E" },
  { name: "> 10 thn", value: 40, color: "#CA8A04" },
];

const DATA_BANK_PROFIL = [
  { bank: "Bank A", tglBdpi: "Jul 19X1", status: "TDS", buku: "I", kpmm: "3.59%" },
  { bank: "Bank B", tglBdpi: "Oct 19X1", status: "TDS", buku: "I", kpmm: "3.95%" },
  { bank: "Bank C", tglBdpi: "Nov 19X1", status: "TDS", buku: "I", kpmm: "3.87%" },
  { bank: "Bank D", tglBdpi: "Jun 19X2", status: "TDS", buku: "I", kpmm: "3.57%" },
  { bank: "Bank E", tglBdpi: "Dec 19X1", status: "BDPI", buku: "III", kpmm: "8.20%" },
  { bank: "Bank F", tglBdpi: "Dec 19X1", status: "TDS", buku: "II", kpmm: "3.37%" },
  { bank: "Bank G", tglBdpi: "Aug 19X1", status: "TDS", buku: "I", kpmm: "3.43%" },
  { bank: "Bank H", tglBdpi: "Sep 19X1", status: "TDS", buku: "II", kpmm: "3.95%" },
  { bank: "Bank I", tglBdpi: "Sep 19X1", status: "TDS", buku: "II", kpmm: "3.87%" },
  { bank: "Bank J", tglBdpi: "Sep 19X1", status: "TDS", buku: "II", kpmm: "3.96%" },
  { bank: "Bank K", tglBdpi: "Aug 19X1", status: "TDS", buku: "I", kpmm: "3.95%" },
  { bank: "Bank L", tglBdpi: "Jun 19X2", status: "TDS", buku: "I", kpmm: "3.63%" },
  { bank: "Bank M", tglBdpi: "Jun 19X2", status: "TDS", buku: "III", kpmm: "3.07%" },
  { bank: "Bank N", tglBdpi: "Jun 19X2", status: "BDPK", buku: "II", kpmm: "6.23%" },
  { bank: "Bank O", tglBdpi: "Jun 19X2", status: "BDPK", buku: "II", kpmm: "6.42%" },
  { bank: "Bank P", tglBdpi: "Jun 19X2", status: "BDPK", buku: "II", kpmm: "6.93%" },
  { bank: "Bank Q", tglBdpi: "Jul 19X2", status: "BDPI", buku: "II", kpmm: "8.25%" },
  { bank: "Bank R", tglBdpi: "Jul 19X2", status: "BDPI", buku: "II", kpmm: "8.65%" },
  { bank: "Bank S", tglBdpi: "Dec 19X1", status: "BDPK", buku: "III", kpmm: "6.47%" },
  { bank: "Bank T", tglBdpi: "Jun 19X2", status: "BDPI", buku: "III", kpmm: "8.20%" },
  { bank: "Bank U", tglBdpi: "Jul 19X2", status: "BDPI", buku: "IV", kpmm: "9.16%" },
];

// Tab 2: Perencanaan
const DATA_LIKUIDITAS_PERBANKAN = [
  { name: "Mismatch Harian", value: 3, color: "#CA8A04" },
  { name: "Mismatch Mingguan", value: 7, color: "#0F766E" },
  { name: "Mismatch Dalam", value: 8, color: "#EA580C" },
  { name: "Normal", value: 3, color: "#475467" },
];

const DATA_RED_FLAG_RESOLUTION = [
  { name: "At Risk", value: 9, color: "#EA580C" },
  { name: "Normal", value: 5, color: "#0F766E" },
  { name: "Failing", value: 7, color: "#CA8A04" },
];

const DATA_NPL_NET = [
  { rentang: "1.00%", jml: 22, color: "#EA580C" },
  { rentang: "2.00%", jml: 19, color: "#0F766E" },
  { rentang: "3.00%", jml: 25, color: "#CA8A04" },
  { rentang: "4.00%", jml: 21, color: "#334155" },
  { rentang: "5.00%", jml: 22, color: "#DC2626" },
];

const DATA_RATING_LPS = [
  { rating: "1", jml: 17, color: "#EA580C" },
  { rating: "2", jml: 20, color: "#0F766E" },
  { rating: "3", jml: 27, color: "#CA8A04" },
  { rating: "4", jml: 29, color: "#334155" },
  { rating: "5", jml: 19, color: "#DC2626" },
];

const DATA_SOLVABILITAS = [
  { name: "Solven", value: 16, color: "#EA580C" },
  { name: "Insolven", value: 5, color: "#0F766E" },
];

// Tab 3: Progress Penanganan
const DATA_AKTIVITAS_PENANGANAN_PIE = [
  { name: "Analisis Metode", value: 4, color: "#EA580C" },
  { name: "Konversi Kewajiban", value: 6, color: "#0F766E" },
  { name: "Bank Perantara", value: 3, color: "#CA8A04" },
  { name: "PMS", value: 6, color: "#334155" },
  { name: "Likuidasi", value: 1, color: "#DC2626" },
  { name: "Uji Tuntas", value: 1, color: "#38BDF8" },
];

const DATA_AKTIVITAS_BAR = [
  { aktivitas: "Konversi Kewajiban & PMS", jml: 6, color: "#334155" },
  { aktivitas: "PMS", jml: 6, color: "#334155" },
  { aktivitas: "Analisis Metode", jml: 4, color: "#EA580C" },
  { aktivitas: "Bank Perantara", jml: 3, color: "#334155" },
  { aktivitas: "Likuidasi", jml: 1, color: "#0F766E" },
  { aktivitas: "Uji Tuntas", jml: 1, color: "#CA8A04" },
];

const DATA_BANK_PROGRESS = [
  { bank: "Bank A", aset: "265,023.94", aktivitas: "Uji Tuntas", progress: 80 },
  { bank: "Bank B", aset: "323,734.00", aktivitas: "Analisis Metode", progress: 50 },
  { bank: "Bank C", aset: "503,465.06", aktivitas: "Analisis Metode", progress: 10 },
  { bank: "Bank D", aset: "292,551.75", aktivitas: "Bank Perantara", progress: 60 },
  { bank: "Bank E", aset: "3,586,785.46", aktivitas: "Konversi Kewajiban & PMS", progress: 90 },
  { bank: "Bank F", aset: "490,862.77", aktivitas: "Analisis Metode", progress: 20 },
  { bank: "Bank G", aset: "1,002,637.78", aktivitas: "Analisis Metode", progress: 80 },
  { bank: "Bank H", aset: "2,350,146.27", aktivitas: "PMS", progress: 40 },
  { bank: "Bank I", aset: "1,673,307.61", aktivitas: "PMS", progress: 80 },
  { bank: "Bank J", aset: "847,140.37", aktivitas: "Likuidasi", progress: 20 },
  { bank: "Bank K", aset: "914,880.24", aktivitas: "PMS", progress: 80 },
  { bank: "Bank L", aset: "533,556.34", aktivitas: "Bank Perantara", progress: 80 },
  { bank: "Bank M", aset: "1,103,247.29", aktivitas: "Bank Perantara", progress: 50 },
  { bank: "Bank N", aset: "1,074,806.40", aktivitas: "PMS", progress: 80 },
  { bank: "Bank O", aset: "239,217.52", aktivitas: "PMS", progress: 70 },
  { bank: "Bank P", aset: "490,862.77", aktivitas: "PMS", progress: 80 },
  { bank: "Bank Q", aset: "1,839,627.99", aktivitas: "Konversi Kewajiban & PMS", progress: 30 },
  { bank: "Bank R", aset: "2,765,053.65", aktivitas: "Konversi Kewajiban & PMS", progress: 80 },
  { bank: "Bank S", aset: "4,277,166.27", aktivitas: "Konversi Kewajiban & PMS", progress: 80 },
  { bank: "Bank T", aset: "19,456,678.06", aktivitas: "Konversi Kewajiban & PMS", progress: 80 },
  { bank: "Bank U", aset: "28,648,342.25", aktivitas: "Konversi Kewajiban & PMS", progress: 20 },
];

// Tab 4: Bantuan Likuiditas
const DATA_PINJAMAN_BAR = [
  { bank: "Bank E", nilai: 5.0, tipe: "Pinjaman" },
  { bank: "Bank Q", nilai: 5.0, tipe: "Pinjaman" },
  { bank: "Bank R", nilai: 3.4, tipe: "Pinjaman" },
  { bank: "Bank P", nilai: 2.0, tipe: "Pinjaman" },
  { bank: "Bank A", nilai: 1.5, tipe: "Pinjaman" },
  { bank: "Bank U", nilai: 1.5, tipe: "Pinjaman" },
  { bank: "Bank B", nilai: 1.2, tipe: "Penjaminan" },
  { bank: "Bank G", nilai: 0.9, tipe: "Pinjaman" },
  { bank: "Bank H", nilai: 0.7, tipe: "Pinjaman" },
  { bank: "Bank I", nilai: 0.5, tipe: "Pinjaman" },
];

// Tab 5: Pengelolaan Aset
const DATA_SEGMEN_ASET = [
  { segmen: "Ritel", nilaiAset: 22.5, recovery: 9.4 },
  { segmen: "Korporasi", nilaiAset: 21.0, recovery: 13.8 },
  { segmen: "UMKM & Kom.", nilaiAset: 15.2, recovery: 10.5 },
  { segmen: "PS & 1 Obligor", nilaiAset: 2.2, recovery: 0.8 },
  { segmen: "BUMN", nilaiAset: 1.0, recovery: 0.4 },
];

export default function DashboardResolusiBank() {
  const [activeTab, setActiveTab] = useState<
    "Data Umum" | "Perencanaan" | "Progress Penanganan" | "Progress Bantuan Likuiditas" | "Pengelolaan Aset"
  >("Data Umum");

  const tabs = [
    { id: "Data Umum", label: "Data Umum" },
    { id: "Perencanaan", label: "Perencanaan" },
    { id: "Progress Penanganan", label: "Progress Penanganan" },
    { id: "Progress Bantuan Likuiditas", label: "Bantuan Likuiditas" },
    { id: "Pengelolaan Aset", label: "Pengelolaan Aset" },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300 w-full text-[#172033]">
      
      {/* 5-TAB SUB-NAV SWITCHER (MATCHING USER SCREENSHOTS) */}
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
      {/* TAB 1: DATA UMUM (SCREENSHOT 1) */}
      {/* ========================================================================= */}
      {activeTab === "Data Umum" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          {/* Top Row: 21 Bank + 2 Donuts + Rp150T Dana LPS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Stat Bank & Cabang */}
            <div className="col-span-12 md:col-span-3 bg-white p-4 sm:p-5 rounded-2xl shadow-2xs border border-[#EAECF0] flex items-center gap-4">
              <div>
                <span className="text-4xl sm:text-5xl font-black text-[#172033] block">21</span>
                <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Jumlah Bank</span>
              </div>
              <div className="h-14 w-px bg-[#EAECF0]" />
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-[#172033] block">851</span>
                  <span className="text-[#667085] text-[11px]">Kantor Cabang</span>
                </div>
                <div>
                  <span className="font-bold text-[#172033] block">2717</span>
                  <span className="text-[#667085] text-[11px]">Cabang Pembantu</span>
                </div>
              </div>
            </div>

            {/* Donut 1: Status Duedil */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
              <span className="text-[11.5px] font-bold text-[#475467] text-center block">
                Jumlah Bank by Status Duedil
              </span>
              <div className="h-32 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie data={DATA_STATUS_DUEDIL} dataKey="value" innerRadius={36} outerRadius={52} paddingAngle={2}>
                      {DATA_STATUS_DUEDIL.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[10px] text-[#475467] pt-1 border-t border-[#F2F4F7]">
                {DATA_STATUS_DUEDIL.map((d, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name} ({d.value})
                  </span>
                ))}
              </div>
            </div>

            {/* Donut 2: Status Bank */}
            <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
              <span className="text-[11.5px] font-bold text-[#475467] text-center block">
                Jumlah Bank by Status
              </span>
              <div className="h-32 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie data={DATA_STATUS_BANK} dataKey="value" innerRadius={36} outerRadius={52} paddingAngle={2}>
                      {DATA_STATUS_BANK.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[10px] text-[#475467] pt-1 border-t border-[#F2F4F7]">
                {DATA_STATUS_BANK.map((d, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name} ({d.value})
                  </span>
                ))}
              </div>
            </div>

            {/* Dana LPS Card */}
            <div className="col-span-12 md:col-span-3 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#172033] block tracking-tight">Rp150T</span>
                <span className="text-[11px] font-bold text-[#667085] uppercase">Dana LPS</span>
              </div>
              <div className="space-y-1 text-[10px] text-[#475467] pt-2 border-t border-[#F2F4F7]">
                <div className="flex justify-between font-mono">
                  <span>Investasi:</span>
                  <span className="font-bold">Rp135,00 T</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Kas:</span>
                  <span className="font-bold">Rp15,00 T</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Premi PRP:</span>
                  <span className="font-bold text-orange-600">Rp40,00 T</span>
                </div>
              </div>
            </div>

          </div>

          {/* Middle Row: Profil Bank Table + Map Simulation + Profil SDM */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Left: Table Profil Bank */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#EA580C] mb-2.5">
                Profil Bank
              </h4>
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-[#F9FAFB] text-[10px] font-bold text-[#667085] border-b border-[#EAECF0]">
                    <tr>
                      <th className="p-2">Bank</th>
                      <th className="p-2">Tanggal BDPI</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">BUKU</th>
                      <th className="p-2 text-right">KPMM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0] text-[11px]">
                    {DATA_BANK_PROFIL.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F9FAFB]">
                        <td className="p-2 font-bold text-[#172033]">{row.bank}</td>
                        <td className="p-2 text-[#667085]">{row.tglBdpi}</td>
                        <td className="p-2">
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-[9.5px] font-bold",
                            row.status === "TDS" ? "bg-orange-50 text-orange-700" :
                            row.status === "BDPI" ? "bg-teal-50 text-teal-700" : "bg-yellow-50 text-yellow-700"
                          )}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-2 font-semibold">{row.buku}</td>
                        <td className="p-2 text-right font-mono font-bold text-[#172033]">{row.kpmm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Center: Map Visualization / Indonesia Resolusi Map */}
            <div className="col-span-12 md:col-span-6 xl:col-span-5 bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs sm:text-[13px] font-bold text-[#EA580C]">
                  Jumlah Aset dan Jumlah Cabang by Provinsi
                </h4>
              </div>
              
              <IndonesiaResolusiMap />
            </div>

            {/* Right: Pegawai & Jabatan & Masa Kerja (Horizontal row on iPad, vertical stack on desktop) */}
            <div className="col-span-12 md:col-span-12 xl:col-span-3 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
              
              {/* Jumlah Pegawai */}
              <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] text-center flex flex-col justify-center">
                <span className="text-3xl font-black text-[#172033] block">600</span>
                <span className="text-xs font-semibold text-[#667085] uppercase">Jumlah Pegawai</span>
              </div>

              {/* Donut Profil Jabatan */}
              <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-[#EAECF0]">
                <span className="text-[11px] font-bold text-[#475467] block mb-1">Profil Jabatan</span>
                <div className="h-28 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie data={DATA_PROFIL_JABATAN} dataKey="value" innerRadius={28} outerRadius={42}>
                        {DATA_PROFIL_JABATAN.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-[9.5px] text-[#667085] space-y-0.5 pt-1 border-t border-[#F2F4F7]">
                  {DATA_PROFIL_JABATAN.map((d, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                        {d.name}
                      </span>
                      <span className="font-bold text-[#172033]">{d.value} Org</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donut Masa Kerja */}
              <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-[#EAECF0]">
                <span className="text-[11px] font-bold text-[#475467] block mb-1">Masa Kerja</span>
                <div className="h-28 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie data={DATA_MASA_KERJA} dataKey="value" innerRadius={28} outerRadius={42}>
                        {DATA_MASA_KERJA.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-[9.5px] text-[#667085] space-y-0.5 pt-1 border-t border-[#F2F4F7]">
                  {DATA_MASA_KERJA.map((d, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                        {d.name}
                      </span>
                      <span className="font-bold text-[#172033]">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PERENCANAAN (SCREENSHOT 2) */}
      {/* ========================================================================= */}
      {activeTab === "Perencanaan" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          {/* Header Banners: Status Krisis + Rekomendasi PRP + SDM & Biaya */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
            
            {/* Status Stabilitas */}
            <div className="col-span-12 sm:col-span-4 bg-white p-4 rounded-2xl border-2 border-red-200 shadow-2xs">
              <span className="text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider block">
                Status Stabilitas Sistem Keuangan
              </span>
              <h3 className="text-base sm:text-lg font-black text-red-700 tracking-tight mt-1">
                KRISIS SISTEM KEUANGAN
              </h3>
            </div>

            {/* Rekomendasi PRP */}
            <div className="col-span-12 sm:col-span-4 bg-white p-4 rounded-2xl border-2 border-orange-200 shadow-2xs">
              <span className="text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider block">
                Rekomendasi PRP
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#EA580C] tracking-tight mt-1">
                PENGAKTIFAN
              </h3>
            </div>

            {/* Kebutuhan SDM & Biaya */}
            <div className="col-span-12 sm:col-span-4 bg-white p-4 rounded-2xl border border-[#EAECF0] shadow-2xs flex justify-around items-center">
              <div className="text-center">
                <span className="text-xs text-[#667085] font-semibold block">Perkiraan SDM</span>
                <span className="text-xl sm:text-2xl font-black text-[#172033]">290</span>
                <span className="text-[10px] text-[#667085] block">Orang</span>
              </div>
              <div className="h-10 w-px bg-[#EAECF0]" />
              <div className="text-center">
                <span className="text-xs text-[#667085] font-semibold block">Perkiraan Biaya</span>
                <span className="text-xl sm:text-2xl font-black text-[#EA580C]">267.44T</span>
                <span className="text-[10px] text-[#667085] block">Rupiah</span>
              </div>
            </div>

          </div>

          {/* Visual Grid: Likuiditas, Red Flag, Rating, Solvabilitas & Table Bank */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Column 1: Likuiditas Donut + NPL Net Bar */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 space-y-4">
              
              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
                <h4 className="text-xs font-bold text-[#475467] text-center mb-1">
                  Kondisi Likuiditas Perbankan
                </h4>
                <div className="h-40 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie data={DATA_LIKUIDITAS_PERBANKAN} dataKey="value" innerRadius={40} outerRadius={60}>
                        {DATA_LIKUIDITAS_PERBANKAN.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[9.5px] text-[#667085] pt-2 border-t border-[#F2F4F7]">
                  {DATA_LIKUIDITAS_PERBANKAN.map((d, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
                <h4 className="text-xs font-bold text-[#475467] mb-2">NPL NET</h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_NPL_NET} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F2F4F7" />
                      <XAxis dataKey="rentang" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} domain={[0, 30]} />
                      <Tooltip />
                      <Bar dataKey="jml">
                        {DATA_NPL_NET.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Column 2: Red Flag Donut + Rating LPS Bar + Solvabilitas */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 space-y-4">
              
              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
                <h4 className="text-xs font-bold text-[#475467] text-center mb-1">
                  Red Flag for Resolution Perbankan
                </h4>
                <div className="h-40 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie data={DATA_RED_FLAG_RESOLUTION} dataKey="value" innerRadius={40} outerRadius={60}>
                        {DATA_RED_FLAG_RESOLUTION.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-around text-[10px] text-[#667085] pt-2 border-t border-[#F2F4F7]">
                  {DATA_RED_FLAG_RESOLUTION.map((d, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name} ({d.value})
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
                <h4 className="text-xs font-bold text-[#475467] mb-2">RATING LPS</h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_RATING_LPS} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F2F4F7" />
                      <XAxis dataKey="rating" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} domain={[0, 35]} />
                      <Tooltip />
                      <Bar dataKey="jml">
                        {DATA_RATING_LPS.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Column 3: Tables Bank Diserahkan & Ketersediaan Sumber Daya */}
            <div className="col-span-12 md:col-span-4 space-y-4">
              
              <div className="bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
                <h4 className="text-xs font-bold text-[#EA580C] mb-2">Perkiraan Bank Diserahkan</h4>
                <div className="overflow-x-auto max-h-[160px] overflow-y-auto scrollbar-thin text-[10px]">
                  <table className="w-full text-left">
                    <thead className="bg-[#F9FAFB] text-[#667085] font-bold border-b border-[#EAECF0]">
                      <tr>
                        <th className="p-1.5">Kode</th>
                        <th className="p-1.5">Red Flag</th>
                        <th className="p-1.5">Rating</th>
                        <th className="p-1.5">TKS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F4F7]">
                      {[
                        { kode: "BUA003", flag: "At Risk", rating: 4, tks: "Normal" },
                        { kode: "BUK028", flag: "Failing", rating: 1, tks: "Normal" },
                        { kode: "BUK035", flag: "Failing", rating: 2, tks: "TDS" },
                        { kode: "BUK042", flag: "At Risk", rating: 4, tks: "Normal" },
                        { kode: "BUK043", flag: "Failing", rating: 4, tks: "Normal" },
                      ].map((r, i) => (
                        <tr key={i}>
                          <td className="p-1.5 font-mono font-bold">{r.kode}</td>
                          <td className="p-1.5 text-orange-600 font-semibold">{r.flag}</td>
                          <td className="p-1.5">{r.rating}</td>
                          <td className="p-1.5">{r.tks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card Ketersediaan Sumber Daya LPS */}
              <div className="bg-white p-4 rounded-2xl shadow-2xs border-2 border-orange-300">
                <h4 className="text-xs font-black text-[#EA580C] mb-2">Ketersediaan Sumber Daya LPS</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-orange-50/50 p-2.5 rounded-xl">
                    <span className="text-xl font-black text-[#172033] block">600</span>
                    <span className="text-[10px] font-bold text-[#475467] block">Jumlah Pegawai</span>
                    <span className="text-[9px] text-[#667085] mt-1 block">Persiapan alokasi</span>
                  </div>
                  <div className="bg-orange-50/50 p-2.5 rounded-xl">
                    <span className="text-xl font-black text-[#EA580C] block">Rp150T</span>
                    <span className="text-[10px] font-bold text-[#475467] block">Dana LPS</span>
                    <span className="text-[9px] text-[#667085] mt-1 block">Aktivasi Pinjaman</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PROGRESS PENANGANAN (SCREENSHOT 3) */}
      {/* ========================================================================= */}
      {activeTab === "Progress Penanganan" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          {/* Top KPIs: 21 Bank + 60.00% Average Progress + 2 Donuts */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            <div className="col-span-12 md:col-span-3 bg-white p-4 sm:p-5 rounded-2xl shadow-2xs border border-[#EAECF0] flex items-center gap-4">
              <div>
                <span className="text-4xl font-black text-[#172033] block">21</span>
                <span className="text-xs font-semibold text-[#667085]">Jumlah Bank</span>
              </div>
              <div className="h-12 w-px bg-[#EAECF0]" />
              <div>
                <span className="text-3xl font-black text-[#0F766E] block">60.00%</span>
                <span className="text-xs font-semibold text-[#667085]">Average Progress</span>
              </div>
            </div>

            {/* Donut 1: Aktivitas Penanganan */}
            <div className="col-span-12 sm:col-span-6 md:col-span-5 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
              <span className="text-xs font-bold text-[#475467] text-center block">
                Count of Progress by Aktivitas Penanganan
              </span>
              <div className="h-36 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie data={DATA_AKTIVITAS_PENANGANAN_PIE} dataKey="value" innerRadius={42} outerRadius={62}>
                      {DATA_AKTIVITAS_PENANGANAN_PIE.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-around gap-1 text-[9.5px] text-[#667085] pt-1 border-t border-[#F2F4F7]">
                {DATA_AKTIVITAS_PENANGANAN_PIE.map((d, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Donut 2: Jumlah Bank by Status */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
              <span className="text-xs font-bold text-[#475467] text-center block">
                Jumlah Bank by Status
              </span>
              <div className="h-36 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie data={DATA_STATUS_BANK} dataKey="value" innerRadius={42} outerRadius={62}>
                      {DATA_STATUS_BANK.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[10px] text-[#667085] pt-1 border-t border-[#F2F4F7]">
                {DATA_STATUS_BANK.map((d, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name} ({d.value})
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Grid: Table Progress Bank (Left) + Horizontal Bar Aktivitas (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Left: Table Bank Progress */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#172033] mb-2">
                Daftar Bank & Aktivitas Penanganan
              </h4>
              <div className="overflow-x-auto max-h-[380px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-[#F9FAFB] text-[10px] font-bold text-[#667085] border-b border-[#EAECF0]">
                    <tr>
                      <th className="p-2">Bank</th>
                      <th className="p-2 text-right">Nilai Aset</th>
                      <th className="p-2">Aktivitas</th>
                      <th className="p-2 text-right">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0] text-[11px]">
                    {DATA_BANK_PROGRESS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F9FAFB]">
                        <td className="p-2 font-bold text-[#172033]">{row.bank}</td>
                        <td className="p-2 text-right font-mono">{row.aset}</td>
                        <td className="p-2 text-[#475467]">{row.aktivitas}</td>
                        <td className="p-2 text-right">
                          <span className={cn(
                            "px-2 py-0.5 rounded font-bold text-[10px]",
                            row.progress >= 80 ? "bg-emerald-50 text-emerald-700" :
                            row.progress >= 50 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                          )}>
                            {row.progress}.00%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Bar Chart Aktivitas */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#172033] mb-3">
                Jumlah Bank by Aktivitas Penanganan and PIC
              </h4>
              <div className="h-[360px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_AKTIVITAS_BAR} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#F2F4F7" />
                    <XAxis type="number" domain={[0, 6]} ticks={[0, 1, 2, 3, 4, 5, 6]} tick={{ fontSize: 10 }} />
                    <YAxis dataKey="aktivitas" type="category" width={140} tick={{ fontSize: 9.5, fill: "#334155" }} />
                    <Tooltip />
                    <Bar dataKey="jml" radius={[0, 4, 4, 0]}>
                      {DATA_AKTIVITAS_BAR.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BANTUAN LIKUIDITAS (SCREENSHOT 4) */}
      {/* ========================================================================= */}
      {activeTab === "Progress Bantuan Likuiditas" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          {/* Top Row: 13 Bank + 52.31% Progress + 3 Donuts */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            
            <div className="col-span-12 md:col-span-3 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0] flex items-center justify-around">
              <div>
                <span className="text-3xl font-black text-[#172033] block">13</span>
                <span className="text-[11px] font-bold text-[#667085]">Jumlah Bank</span>
              </div>
              <div className="h-10 w-px bg-[#EAECF0]" />
              <div>
                <span className="text-2xl font-black text-emerald-600 block">52.31%</span>
                <span className="text-[11px] font-bold text-[#667085]">Avg Progress</span>
              </div>
            </div>

            {/* Donut 1: Jenis Bantuan */}
            <div className="col-span-12 sm:col-span-4 md:col-span-3 bg-white p-3.5 rounded-2xl shadow-2xs border border-[#EAECF0]">
              <span className="text-[11px] font-bold text-[#475467] text-center block mb-1">
                Nilai Pinjaman by Jenis Bantuan
              </span>
              <div className="h-28 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: "Pinjaman", value: 92, color: "#EA580C" }, { name: "Penjaminan", value: 8, color: "#0F766E" }]} dataKey="value" innerRadius={28} outerRadius={42}>
                      <Cell fill="#EA580C" />
                      <Cell fill="#0F766E" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[9.5px] text-[#667085] pt-1">
                <span>Pinjaman (92%)</span>
                <span>Penjaminan (8%)</span>
              </div>
            </div>

            {/* Donut 2: Agunan */}
            <div className="col-span-12 sm:col-span-4 md:col-span-3 bg-white p-3.5 rounded-2xl shadow-2xs border border-[#EAECF0]">
              <span className="text-[11px] font-bold text-[#475467] text-center block mb-1">
                Nilai Pinjaman by Agunan
              </span>
              <div className="h-28 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: "Tidak Ada", value: 82, color: "#EA580C" }, { name: "Ada", value: 18, color: "#0F766E" }]} dataKey="value" innerRadius={28} outerRadius={42}>
                      <Cell fill="#EA580C" />
                      <Cell fill="#0F766E" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[9.5px] text-[#667085] pt-1">
                <span>Tidak Ada (82%)</span>
                <span>Ada (18%)</span>
              </div>
            </div>

            {/* Donut 3: Realisasi */}
            <div className="col-span-12 sm:col-span-4 md:col-span-3 bg-white p-3.5 rounded-2xl shadow-2xs border border-[#EAECF0]">
              <span className="text-[11px] font-bold text-[#475467] text-center block mb-1">
                Nilai Pinjaman & Realisasi
              </span>
              <div className="h-28 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: "Nilai Pinjaman", value: 65, color: "#EA580C" }, { name: "Realisasi", value: 35, color: "#0F766E" }]} dataKey="value" innerRadius={28} outerRadius={42}>
                      <Cell fill="#EA580C" />
                      <Cell fill="#0F766E" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[9.5px] text-[#667085] pt-1">
                <span>Pinjaman (65%)</span>
                <span>Realisasi (35%)</span>
              </div>
            </div>

          </div>

          {/* Bottom Grid: Table & Pinjaman Bar Chart */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Table Pinjaman */}
            <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#172033] mb-2">
                Rincian Bantuan Likuiditas
              </h4>
              <div className="overflow-x-auto max-h-[340px] overflow-y-auto scrollbar-thin text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#F9FAFB] text-[10px] font-bold text-[#667085] border-b border-[#EAECF0]">
                    <tr>
                      <th className="p-2">Bank</th>
                      <th className="p-2">Nilai Pinjaman</th>
                      <th className="p-2">Kolektibilitas</th>
                      <th className="p-2">Agunan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAECF0] text-[11px]">
                    {[
                      { bank: "Bank A", nilai: "Rp 1.500.000.000.000", kol: "Lancar", agunan: "Ada" },
                      { bank: "Bank B", nilai: "Rp 1.200.000.000.000", kol: "Lancar", agunan: "Ada" },
                      { bank: "Bank E", nilai: "Rp 5.000.000.000.000", kol: "Lancar", agunan: "Tidak" },
                      { bank: "Bank G", nilai: "Rp 900.000.000.000", kol: "Lancar", agunan: "Tidak" },
                      { bank: "Bank H", nilai: "Rp 700.000.000.000", kol: "Lancar", agunan: "Tidak" },
                      { bank: "Bank P", nilai: "Rp 2.000.000.000.000", kol: "Lancar", agunan: "Tidak" },
                      { bank: "Bank Q", nilai: "Rp 5.000.000.000.000", kol: "Lancar", agunan: "Tidak" },
                      { bank: "Bank R", nilai: "Rp 3.400.000.000.000", kol: "Lancar", agunan: "Tidak" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-[#F9FAFB]">
                        <td className="p-2 font-bold text-[#172033]">{row.bank}</td>
                        <td className="p-2 font-mono font-semibold">{row.nilai}</td>
                        <td className="p-2 text-emerald-600 font-bold">{row.kol}</td>
                        <td className="p-2">{row.agunan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vertical Bar Chart Pinjaman by Bank */}
            <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#172033] mb-2">
                Nilai Pinjaman by Bank and Jenis Bantuan
              </h4>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_PINJAMAN_BAR} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F2F4F7" />
                    <XAxis dataKey="bank" tick={{ fontSize: 10, fontWeight: 600 }} />
                    <YAxis domain={[0, 6]} ticks={[0, 1, 2, 3, 4, 5, 6]} tick={{ fontSize: 9.5 }} label={{ value: "Rp Triliun", angle: -90, position: "insideLeft", offset: 10 }} />
                    <Tooltip />
                    <Bar dataKey="nilai" radius={[4, 4, 0, 0]}>
                      {DATA_PINJAMAN_BAR.map((e, i) => (
                        <Cell key={i} fill={e.tipe === "Pinjaman" ? "#EA580C" : "#0F766E"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PENGELOLAAN ASET (SCREENSHOT 5) */}
      {/* ========================================================================= */}
      {activeTab === "Pengelolaan Aset" && (
        <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          
          {/* Top Row: 21 Bank + 47.00% Avg Progress + 2 Donuts */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            <div className="col-span-12 md:col-span-4 bg-white p-4 sm:p-5 rounded-2xl shadow-2xs border border-[#EAECF0] flex items-center justify-around">
              <div>
                <span className="text-4xl font-black text-[#172033] block">21</span>
                <span className="text-xs font-semibold text-[#667085]">Jumlah Bank</span>
              </div>
              <div className="h-12 w-px bg-[#EAECF0]" />
              <div>
                <span className="text-3xl font-black text-[#EA580C] block">47.00%</span>
                <span className="text-xs font-semibold text-[#667085]">Average Progress</span>
              </div>
            </div>

            {/* Donut 1: Nilai Aset by Pengelola and Aktivitas */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
              <span className="text-xs font-bold text-[#475467] text-center block mb-1">
                Nilai Aset by Pengelola and Aktivitas
              </span>
              <div className="h-32 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: "Restrukturisasi", value: 38, color: "#EA580C" }, { name: "Eksekusi Agunan", value: 42, color: "#0F766E" }, { name: "Penjualan", value: 20, color: "#CA8A04" }]} dataKey="value" innerRadius={36} outerRadius={50}>
                      <Cell fill="#EA580C" />
                      <Cell fill="#0F766E" />
                      <Cell fill="#CA8A04" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut 2: Nilai Aset by Pengelola */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
              <span className="text-xs font-bold text-[#475467] text-center block mb-1">
                Nilai Aset by Pengelola
              </span>
              <div className="h-32 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: "GMAS", value: 62, color: "#EA580C" }, { name: "SAM/ AMC Swasta", value: 38, color: "#0F766E" }]} dataKey="value" innerRadius={36} outerRadius={50}>
                      <Cell fill="#EA580C" />
                      <Cell fill="#0F766E" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[10px] text-[#667085] pt-1">
                <span className="text-[#EA580C] font-bold">GMAS (62%)</span>
                <span className="text-[#0F766E] font-bold">SAM/ AMC (38%)</span>
              </div>
            </div>

          </div>

          {/* Bottom Grid: Aktivitas Cards + Segmen Bar Chart */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            
            {/* Left: 4 Aktivitas Pengelolaan Cards */}
            <div className="col-span-12 md:col-span-6 space-y-3">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#EA580C]">
                Aktivitas Pengelolaan & Recovery
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#EAECF0] shadow-2xs">
                  <span className="text-[10px] font-bold text-[#667085] uppercase block">GMAS • Restrukturisasi</span>
                  <p className="text-base font-black text-[#172033] mt-1">20,304,078.31</p>
                  <span className="text-[10.5px] text-emerald-700 font-bold">Recovery: Rp12,17 M</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#EAECF0] shadow-2xs">
                  <span className="text-[10px] font-bold text-[#667085] uppercase block">GMAS • Penjualan</span>
                  <p className="text-base font-black text-[#172033] mt-1">7,464,810.85</p>
                  <span className="text-[10.5px] text-emerald-700 font-bold">Recovery: Rp4,47 M</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#EAECF0] shadow-2xs">
                  <span className="text-[10px] font-bold text-[#667085] uppercase block">SAM/ AMC • Eksekusi</span>
                  <p className="text-base font-black text-[#172033] mt-1">26,776,260.44</p>
                  <span className="text-[10.5px] text-emerald-700 font-bold">Recovery: Rp17,23 M</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#EAECF0] shadow-2xs">
                  <span className="text-[10px] font-bold text-[#667085] uppercase block">SAM/ AMC • Tagihan</span>
                  <p className="text-base font-black text-[#172033] mt-1">17,643,081.41</p>
                  <span className="text-[10.5px] text-emerald-700 font-bold">Recovery: Rp4,70 M</span>
                </div>
              </div>
            </div>

            {/* Right: Bar Chart Segmen */}
            <div className="col-span-12 md:col-span-6 bg-white p-4 rounded-2xl shadow-2xs border border-[#EAECF0]">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#172033] mb-3">
                Nilai Aset, Recovery and First Pengelola by Segmen
              </h4>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_SEGMEN_ASET} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F2F4F7" />
                    <XAxis dataKey="segmen" tick={{ fontSize: 9.5, fontWeight: 600 }} />
                    <YAxis domain={[0, 30]} tick={{ fontSize: 9.5 }} label={{ value: "Rp Miliar", angle: -90, position: "insideLeft", offset: 10 }} />
                    <Tooltip />
                    <Bar dataKey="nilaiAset" name="Nilai Aset" fill="#EA580C" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="recovery" name="Recovery" fill="#0F766E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 text-[10.5px] font-semibold text-[#475467] pt-2 border-t border-[#F2F4F7]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#EA580C]" /> Nilai Aset
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#0F766E]" /> Recovery
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
