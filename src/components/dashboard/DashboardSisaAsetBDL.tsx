"use client";

import React, { useState } from "react";
import {
  Filter as FilterIcon,
  Calendar,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  Building2,
  PieChart as PieIcon,
  CheckCircle2,
  Coins,
  Layers,
  Landmark,
  Scale,
  DollarSign,
  Info
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA FOR TREN TOTAL SISA ASET BDL (BANK DALAM LIKUIDASI) ---
// Nilai dalam Rp Miliar (mengikuti visual persis chart asuransi)
const DATA_TOTAL_ASET_BDL = [
  { tahun: "2022", bpr: 0.0, umum: 0.0 },
  { tahun: "2023", bpr: 1420.50, umum: 540.20 },
  { tahun: "2024", bpr: 1680.25, umum: 590.15 },
  { tahun: "2025", bpr: 1830.40, umum: 620.40 },
  { tahun: "2026", bpr: 0.0, umum: 0.0 },
];

// Data Komposisi Sisa Aset BPR & BPRS (Dalam Likuidasi)
const DATA_KOMPOSISI_BPR = [
  { instrumen: "Tagihan Kredit (NPL / Macet)", nilai: 845.20, pct: "46.2%", color: "#0084FF" },
  { instrumen: "Aset Yang Diambil Alih (AYDA / Properti)", nilai: 512.50, pct: "28.0%", color: "#FF7A00" },
  { instrumen: "Kas & Setara Kas / Penempatan Bank", nilai: 256.30, pct: "14.0%", color: "#12B76A" },
  { instrumen: "Aset Tetap & Inventaris Kantor", nilai: 146.40, pct: "8.0%", color: "#7F56D9" },
  { instrumen: "Piutang Bunga & Lainnya", nilai: 70.00, pct: "3.8%", color: "#F04438" },
];

// Data Komposisi Sisa Aset Bank Umum (Dalam Likuidasi)
const DATA_KOMPOSISI_BANK_UMUM = [
  { instrumen: "Kredit Korporasi & Komersial BDL", nilai: 280.00, pct: "45.1%", color: "#FF7A00" },
  { instrumen: "AYDA Lahan & Gedung Komersial", nilai: 186.10, pct: "30.0%", color: "#0084FF" },
  { instrumen: "Giro & Penempatan Antar Bank", nilai: 93.10, pct: "15.0%", color: "#12B76A" },
  { instrumen: "Tagihan Hak Klaim & Restrukturisasi", nilai: 43.40, pct: "7.0%", color: "#F79009" },
  { instrumen: "Aset Tetap & Fasilitas Operasional", nilai: 17.80, pct: "2.9%", color: "#98A2B3" },
];

// Data Tren Pemulihan Aset (Asset Recovery BDL)
const DATA_RECOVERY_BDL = [
  { tahun: "2022", lelangAyda: 310.5, penagihanKredit: 180.2, total: 490.7 },
  { tahun: "2023", lelangAyda: 385.2, penagihanKredit: 215.4, total: 600.6 },
  { tahun: "2024", lelangAyda: 440.8, penagihanKredit: 260.1, total: 700.9 },
  { tahun: "2025", lelangAyda: 520.4, penagihanKredit: 295.6, total: 816.0 },
  { tahun: "2026 (Est)", lelangAyda: 580.0, penagihanKredit: 340.0, total: 920.0 },
];

// Data Tren Biaya Likuidasi (Cost of Liquidation vs Hasil Recovery)
const DATA_BIAYA_LIKUIDASI = [
  { tahun: "2022", costRatio: 19.4, adminFee: 4.8, netRecovery: 75.8 },
  { tahun: "2023", costRatio: 18.9, adminFee: 4.5, netRecovery: 76.6 },
  { tahun: "2024", costRatio: 18.2, adminFee: 4.2, netRecovery: 77.6 },
  { tahun: "2025", costRatio: 17.6, adminFee: 4.0, netRecovery: 78.4 },
  { tahun: "2026", costRatio: 17.2, adminFee: 3.8, netRecovery: 79.0 },
];

// Data Tren Pembayaran Hak Kreditur & LPS (Payout Ratio thd Hasil Bersih Likuidasi)
const DATA_PAYOUT_KREDITUR = [
  { tahun: "2022", rasio: 62.4, batasMin: 50 },
  { tahun: "2023", rasio: 65.8, batasMin: 50 },
  { tahun: "2024", rasio: 67.2, batasMin: 50 },
  { tahun: "2025", rasio: 68.5, batasMin: 50 },
  { tahun: "2026 (YTD)", rasio: 70.1, batasMin: 50 },
];

// Custom Label component for dots on LineChart (renders badge values above points)
const CustomizedDotLabel = (props: any) => {
  const { x, y, value, stroke } = props;
  if (value === undefined || value === null) return null;
  const isZero = value === 0;
  const isBpr = stroke === "#0084FF" || stroke === "#2563EB";

  // Position offset to prevent overlapping
  const yOffset = isBpr ? (isZero ? -12 : -18) : (isZero ? 14 : 14);

  return (
    <g transform={`translate(${x},${y + yOffset})`}>
      <rect
        x="-28"
        y="-9"
        width="56"
        height="18"
        rx="4"
        fill={isBpr ? "#0084FF" : "#FF7A00"}
      />
      <text
        x="0"
        y="3"
        fill="#FFFFFF"
        textAnchor="middle"
        fontSize="9"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {value.toFixed(2).replace(".", ",")}
      </text>
    </g>
  );
};

export default function DashboardSisaAsetBDL() {
  const [kategoriBank, setKategoriBank] = useState("BPR & BPRS");
  const [tahun, setTahun] = useState("2026");
  const [bulan, setBulan] = useState("Pilih...");
  const [activeTab, setActiveTab] = useState("Tren Total Sisa Aset");
  const [filterMsg, setFilterMsg] = useState<string | null>(null);

  const handleFilter = () => {
    setFilterMsg(`Filter diterapkan: ${kategoriBank} • Tahun ${tahun}`);
    setTimeout(() => setFilterMsg(null), 2500);
  };

  const tabs = [
    "Tren Total Sisa Aset",
    "Tren Komposisi Sisa Aset BPR & BPRS",
    "Tren Komposisi Sisa Aset Bank Umum",
    "Tren Pemulihan Aset (Asset Recovery)",
    "Tren Biaya Likuidasi (Cost of Liquidation)",
    "Tren Tingkat Pengembalian Hak Kreditur",
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300 w-full text-[#172033]">
      
      {/* Toast Notification */}
      {filterMsg && (
        <div className="fixed top-16 right-4 z-50 bg-[#172033] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{filterMsg}</span>
        </div>
      )}

      {/* TOP HEADER & FILTER CARD (EXACT LAYOUT AS ASURANSI) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2F4F7] pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#667085] mb-0.5">
              <span>Penjaminan Bank</span>
              <span>/</span>
              <span className="text-[#172033] font-semibold">Sisa Aset BDL</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#172033] tracking-tight">
              Dashboard Sisa Aset Bank Dalam Likuidasi (BDL)
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#0084FF] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full self-start sm:self-auto">
            Mandat UU LPS • Pengelolaan & Pemulihan Sisa Aset BDL
          </span>
        </div>

        {/* Filter Bar Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* Kategori Bank */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Kategori Bank</label>
            <div className="relative">
              <select
                value={kategoriBank}
                onChange={(e) => setKategoriBank(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3.5 py-2 text-xs font-bold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
              >
                <option value="BPR & BPRS">BPR & BPRS (Dalam Likuidasi)</option>
                <option value="Bank Umum">Bank Umum (Dalam Likuidasi)</option>
                <option value="Semua">Semua Bank Dalam Likuidasi</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Tahun */}
          <div className="sm:col-span-3 space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Tahun</label>
            <div className="relative">
              <select
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3.5 py-2 text-xs font-bold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Bulan */}
          <div className="sm:col-span-3 space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Bulan</label>
            <div className="relative">
              <select
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
              >
                <option value="Pilih...">Pilih...</option>
                <option value="Semua">Semua Bulan (Tahunan)</option>
                <option value="Januari">Januari</option>
                <option value="Februari">Februari</option>
                <option value="Maret">Maret</option>
                <option value="April">April</option>
                <option value="Mei">Mei</option>
                <option value="Juni">Juni</option>
                <option value="Juli">Juli</option>
                <option value="Agustus">Agustus</option>
                <option value="September">September</option>
                <option value="Oktober">Oktober</option>
                <option value="November">November</option>
                <option value="Desember">Desember</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Button Filter */}
          <div className="sm:col-span-2">
            <button
              onClick={handleFilter}
              className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <FilterIcon size={13} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI HIGHLIGHT CARDS (3 CARDS MATCHING ASURANSI) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
          <span className="text-[11px] font-bold text-[#667085] uppercase">Total Sisa Aset BDL (2025)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#172033]">Rp 2.450,80 M</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold">
            <span className="text-[#0084FF]">BPR: Rp 1.830,40 M</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#FF7A00]">Umum: Rp 620,40 M</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
          <span className="text-[11px] font-bold text-[#667085] uppercase">Tingkat Pemulihan (Recovery)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">42,8%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">On Target</span>
          </div>
          <span className="text-xs text-[#667085] mt-1 block">Target Tahunan Pemulihan: Min. 40,0%</span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
          <span className="text-[11px] font-bold text-[#667085] uppercase">Bank Dalam Likuidasi (BDL)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#172033]">138</span>
            <span className="text-xs font-semibold text-[#667085]">Bank</span>
          </div>
          <span className="text-xs text-[#667085] mt-1 block">122 BPR • 14 BPRS • 2 Bank Umum BDL</span>
        </div>
      </div>

      {/* HORIZONTAL NAV TABS (6 TABS MATCHING ASURANSI TABS) */}
      <div className="bg-white rounded-2xl shadow-2xs border border-[#EAECF0] overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4 pt-3 border-b border-[#EAECF0] text-xs font-bold">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 px-3 whitespace-nowrap transition-all border-b-2 font-semibold text-xs cursor-pointer",
                  isActive
                    ? "border-[#FF7A00] text-[#FF7A00] font-bold"
                    : "border-transparent text-[#667085] hover:text-[#172033]"
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <div className="p-4 sm:p-5">
          
          {/* ========================================================================= */}
          {/* TAB 1: TREN TOTAL SISA ASET BDL (MATCHING ASURANSI EXACT LINE CHART) */}
          {/* ========================================================================= */}
          {activeTab === "Tren Total Sisa Aset" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#172033]">
                  Tren Total Sisa Aset BPR & Bank Umum Dalam Likuidasi
                </h3>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#0084FF]" />
                    <span className="text-[#0084FF]">BPR & BPRS (Rp Miliar)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF7A00]" />
                    <span className="text-[#FF7A00]">Bank Umum BDL (Rp Miliar)</span>
                  </div>
                </div>
              </div>

              {/* Exact Line Chart with Pill Badges on Points */}
              <div className="h-72 sm:h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={DATA_TOTAL_ASET_BDL}
                    margin={{ top: 25, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" vertical={false} />
                    <XAxis
                      dataKey="tahun"
                      tick={{ fill: "#667085", fontSize: 11, fontWeight: "bold" }}
                      axisLine={{ stroke: "#EAECF0" }}
                    />
                    <YAxis
                      domain={[0, 2200]}
                      ticks={[0, 500, 1000, 1500, 2000]}
                      tickFormatter={(val) => `${val.toLocaleString()} M`}
                      tick={{ fill: "#667085", fontSize: 11 }}
                      axisLine={{ stroke: "#EAECF0" }}
                    />
                    <Tooltip
                      formatter={(val: any, name: any) => [
                        `Rp ${val.toLocaleString("id-ID", { minimumFractionDigits: 2 })} Miliar`,
                        name === "bpr" ? "BPR & BPRS BDL" : "Bank Umum BDL"
                      ]}
                      labelFormatter={(l) => `Tahun: ${l}`}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #EAECF0",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        fontSize: "12px"
                      }}
                    />
                    
                    {/* BPR & BPRS Line (Blue #0084FF) */}
                    <Line
                      type="linear"
                      dataKey="bpr"
                      name="bpr"
                      stroke="#0084FF"
                      strokeWidth={2.5}
                      dot={<CustomizedDotLabel stroke="#0084FF" />}
                      activeDot={{ r: 6 }}
                    />

                    {/* Bank Umum BDL Line (Orange #FF7A00) */}
                    <Line
                      type="linear"
                      dataKey="umum"
                      name="umum"
                      stroke="#FF7A00"
                      strokeWidth={2.5}
                      dot={<CustomizedDotLabel stroke="#FF7A00" />}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom Insight Notes */}
              <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#EAECF0] text-xs text-[#475467] flex items-start gap-2.5">
                <Info size={16} className="text-[#0084FF] mt-0.5 shrink-0" />
                <p>
                  <strong>Catatan Portofolio Sisa Aset BDL:</strong> Total sisa aset yang dikelola Tim Likuidasi LPS mengalami peningkatan seiring percepatan penuntasan proses likuidasi BPR/BPRS bermasalah untuk memaksimalkan tingkat pemulihan (*recovery rate*) bagi pembayaran hak nasabah dan LPS.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: KOMPOSISI ASET BPR / BPRS */}
          {/* ========================================================================= */}
          {activeTab === "Tren Komposisi Sisa Aset BPR & BPRS" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#172033]">
                  Distribusi & Komposisi Sisa Aset BPR & BPRS Dalam Likuidasi (2025)
                </h3>
                <span className="text-xs font-bold text-[#0084FF] bg-blue-50 px-2.5 py-1 rounded-full">
                  Total: Rp 1.830,40 Miliar
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-5 h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={DATA_KOMPOSISI_BPR}
                        dataKey="nilai"
                        nameKey="instrumen"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                      >
                        {DATA_KOMPOSISI_BPR.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any) => [`Rp ${val} M`, "Nilai"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="md:col-span-7 space-y-2.5">
                  {DATA_KOMPOSISI_BPR.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F9FAFB] transition-colors text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="font-semibold text-[#172033]">{item.instrumen}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-[#172033] block">Rp {item.nilai} M</span>
                        <span className="text-[10.5px] text-[#667085]">{item.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: KOMPOSISI ASET BANK UMUM */}
          {/* ========================================================================= */}
          {activeTab === "Tren Komposisi Sisa Aset Bank Umum" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#172033]">
                  Distribusi & Komposisi Sisa Aset Bank Umum Dalam Likuidasi (2025)
                </h3>
                <span className="text-xs font-bold text-[#FF7A00] bg-orange-50 px-2.5 py-1 rounded-full">
                  Total: Rp 620,40 Miliar
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-5 h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={DATA_KOMPOSISI_BANK_UMUM}
                        dataKey="nilai"
                        nameKey="instrumen"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                      >
                        {DATA_KOMPOSISI_BANK_UMUM.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any) => [`Rp ${val} M`, "Nilai"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="md:col-span-7 space-y-2.5">
                  {DATA_KOMPOSISI_BANK_UMUM.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F9FAFB] transition-colors text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="font-semibold text-[#172033]">{item.instrumen}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-[#172033] block">Rp {item.nilai} M</span>
                        <span className="text-[10.5px] text-[#667085]">{item.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: PEMULIHAN ASET (ASSET RECOVERY) */}
          {/* ========================================================================= */}
          {activeTab === "Tren Pemulihan Aset (Asset Recovery)" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#172033]">
                  Realisasi Pemulihan Aset (Hasil Lelang AYDA & Penagihan Piutang Kredit)
                </h3>
                <span className="text-xs font-semibold text-[#12B76A] bg-emerald-50 px-2.5 py-1 rounded-full">
                  Tren Pemulihan Meningkat
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_RECOVERY_BDL} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" vertical={false} />
                    <XAxis dataKey="tahun" tick={{ fill: "#667085", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#667085", fontSize: 11 }} tickFormatter={(v) => `${v} M`} />
                    <Tooltip formatter={(val: any) => [`Rp ${val} Miliar`, ""]} />
                    <Bar dataKey="lelangAyda" name="Lelang AYDA" fill="#0084FF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="penagihanKredit" name="Penagihan Kredit" fill="#FF7A00" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                {DATA_RECOVERY_BDL.slice(1, 5).map((item, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] p-3 rounded-xl border border-[#EAECF0]">
                    <span className="text-[11px] font-bold text-[#667085]">{item.tahun}</span>
                    <p className="text-base font-extrabold text-[#172033] mt-0.5">Rp {item.total} M</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Tercapai 100%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: BIAYA LIKUIDASI (COST OF LIQUIDATION) */}
          {/* ========================================================================= */}
          {activeTab === "Tren Biaya Likuidasi (Cost of Liquidation)" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#172033]">
                  Rasio Biaya Likuidasi terhadap Hasil Pemulihan Aset (*Cost of Liquidation*)
                </h3>
                <span className="text-xs font-bold text-[#F04438] bg-rose-50 px-2.5 py-1 rounded-full">
                  Batas Maksimal: 25.0%
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATA_BIAYA_LIKUIDASI} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F04438" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F04438" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" vertical={false} />
                    <XAxis dataKey="tahun" tick={{ fill: "#667085", fontSize: 11 }} />
                    <YAxis domain={[0, 30]} tickFormatter={(v) => `${v}%`} tick={{ fill: "#667085", fontSize: 11 }} />
                    <Tooltip formatter={(val: any) => [`${val}%`, ""]} />
                    <Area type="monotone" dataKey="costRatio" name="Rasio Biaya Likuidasi" stroke="#F04438" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCost)" />
                    <Line type="monotone" dataKey="adminFee" name="Fee Tim Likuidasi" stroke="#FF7A00" strokeWidth={2} dot />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#EAECF0] text-xs text-[#475467]">
                <strong>Efisiensi Proses:</strong> Rasio biaya pelaksanaan likuidasi terjaga stabil di kisaran 17–19%, jauh di bawah batas pagu maksimal 25%, memastikan mayoritas hasil recovery disalurkan kembali untuk pemenuhan hak kreditur dan LPS.
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: TINGKAT PENGEMBALIAN HAK KREDITUR */}
          {/* ========================================================================= */}
          {activeTab === "Tren Tingkat Pengembalian Hak Kreditur" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#172033]">
                  Tingkat Pembayaran Hak Kreditur & Pengembalian Dana LPS (*Payout Ratio*)
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Status: Memenuhi Syarat (&gt;50%)
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DATA_PAYOUT_KREDITUR} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F7" vertical={false} />
                    <XAxis dataKey="tahun" tick={{ fill: "#667085", fontSize: 11 }} />
                    <YAxis domain={[40, 80]} tickFormatter={(v) => `${v}%`} tick={{ fill: "#667085", fontSize: 11 }} />
                    <Tooltip formatter={(val: any) => [`${val}%`, "Rasio Pembayaran"]} />
                    <Line type="monotone" dataKey="rasio" name="Payout Ratio" stroke="#12B76A" strokeWidth={3} dot={{ r: 5, fill: "#12B76A" }} />
                    <Line type="monotone" dataKey="batasMin" name="Batas Minimum (50%)" stroke="#98A2B3" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                <strong>Pemenuhan Hak Kreditur:</strong> Rata-rata tingkat pengembalian hak kreditur BDL mencapai <strong>68,5%</strong> pada tahun 2025, melampaui ketentuan batas minimal 50,0%.
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
