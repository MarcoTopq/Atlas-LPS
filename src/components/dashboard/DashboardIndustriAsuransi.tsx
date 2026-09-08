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
  Layers
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

// --- MOCK DATA FOR TREN TOTAL ASET (EXACT DATA FROM SCREENSHOT) ---
const DATA_TOTAL_ASET = [
  { tahun: "2022", paj: 0.0, pau: 0.0 },
  { tahun: "2023", paj: 607.0, pau: 237.07 },
  { tahun: "2024", paj: 585.03, pau: 256.42 },
  { tahun: "2025", paj: 629.25, pau: 260.97 },
  { tahun: "2026", paj: 0.0, pau: 0.0 },
];

// Data for Tren Komposisi Aset Asuransi Jiwa
const DATA_KOMPOSISI_JIWA = [
  { instrumen: "SBN (Surat Berharga Negara)", nilai: 245.8, pct: "39.1%", color: "#0084FF" },
  { instrumen: "Saham & Reksadana", nilai: 176.2, pct: "28.0%", color: "#FF7A00" },
  { instrumen: "Deposito Berjangka", nilai: 119.5, pct: "19.0%", color: "#12B76A" },
  { instrumen: "Obligasi Korporasi", nilai: 62.8, pct: "10.0%", color: "#7F56D9" },
  { instrumen: "Properti & Lainnya", nilai: 24.95, pct: "3.9%", color: "#F04438" },
];

// Data for Tren Komposisi Aset Asuransi Umum & Reasuransi
const DATA_KOMPOSISI_UMUM = [
  { instrumen: "Deposito Berjangka", nilai: 88.7, pct: "34.0%", color: "#FF7A00" },
  { instrumen: "SBN & Sukuk", nilai: 78.3, pct: "30.0%", color: "#0084FF" },
  { instrumen: "Obligasi Korporasi", nilai: 52.2, pct: "20.0%", color: "#12B76A" },
  { instrumen: "Piutang Premi & Reasuransi", nilai: 28.7, pct: "11.0%", color: "#F79009" },
  { instrumen: "Saham & Penyertaan", nilai: 13.07, pct: "5.0%", color: "#98A2B3" },
];

// Data for Tren Pertumbuhan Premi
const DATA_PREMI = [
  { tahun: "2022", premiJiwa: 172.4, premiUmum: 90.1, total: 262.5 },
  { tahun: "2023", premiJiwa: 177.3, premiUmum: 103.8, total: 281.1 },
  { tahun: "2024", premiJiwa: 184.5, premiUmum: 112.6, total: 297.1 },
  { tahun: "2025", premiJiwa: 196.2, premiUmum: 120.4, total: 316.6 },
  { tahun: "2026 (Est)", premiJiwa: 210.0, premiUmum: 128.5, total: 338.5 },
];

// Data for Loss & Expense Ratio
const DATA_LOSS_EXPENSE = [
  { tahun: "2022", lossRatio: 68.4, expenseRatio: 22.1, combined: 90.5 },
  { tahun: "2023", lossRatio: 71.2, expenseRatio: 21.8, combined: 93.0 },
  { tahun: "2024", lossRatio: 69.8, expenseRatio: 20.9, combined: 90.7 },
  { tahun: "2025", lossRatio: 72.5, expenseRatio: 21.4, combined: 93.9 },
  { tahun: "2026", lossRatio: 70.1, expenseRatio: 21.0, combined: 91.1 },
];

// Data for Rasio Investasi thd Cadangan Teknis
const DATA_CADANGAN_TEKNIS = [
  { tahun: "2022", rasio: 114.2, batasMin: 100 },
  { tahun: "2023", rasio: 116.8, batasMin: 100 },
  { tahun: "2024", rasio: 115.4, batasMin: 100 },
  { tahun: "2025", rasio: 118.4, batasMin: 100 },
  { tahun: "2026 (YTD)", rasio: 119.1, batasMin: 100 },
];

// Custom Label component for dots on LineChart (renders badge values above points)
const CustomizedDotLabel = (props: any) => {
  const { x, y, value, stroke } = props;
  if (value === undefined || value === null) return null;
  const isZero = value === 0;
  const isPaj = stroke === "#0084FF" || stroke === "#2563EB";

  // Position offset to prevent overlapping
  const yOffset = isPaj ? (isZero ? -12 : -18) : (isZero ? 14 : 14);

  return (
    <g transform={`translate(${x},${y + yOffset})`}>
      <rect
        x="-24"
        y="-9"
        width="48"
        height="18"
        rx="4"
        fill={isPaj ? "#0084FF" : "#FF7A00"}
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

export default function DashboardIndustriAsuransi() {
  const [jenisUsaha, setJenisUsaha] = useState("Konvensional");
  const [tahun, setTahun] = useState("2026");
  const [bulan, setBulan] = useState("Pilih...");
  const [activeTab, setActiveTab] = useState("Tren Total Aset");
  const [filterMsg, setFilterMsg] = useState<string | null>(null);

  const handleFilter = () => {
    setFilterMsg(`Filter diterapkan: ${jenisUsaha} • Tahun ${tahun}`);
    setTimeout(() => setFilterMsg(null), 2500);
  };

  const tabs = [
    "Tren Total Aset",
    "Tren Komposisi Aset Asuransi Jiwa",
    "Tren Komposisi Aset Asuransi Umum & Reasuransi",
    "Tren Pertumbuhan Premi",
    "Tren Loss & Expense Ration",
    "Tren Rasio Investasi terhadap Cadangan Teknis",
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

      {/* TOP HEADER & FILTER CARD */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2F4F7] pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#667085] mb-0.5">
              <span>Penjaminan Asuransi</span>
              <span>/</span>
              <span className="text-[#172033] font-semibold">Sisa Aset</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#172033] tracking-tight">
              Dashboard Industri Asuransi
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#0084FF] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full self-start sm:self-auto">
            Mandat UU P2SK • Portofolio & Sisa Aset
          </span>
        </div>

        {/* Filter Bar Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* Jenis Usaha */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Jenis Usaha</label>
            <div className="relative">
              <select
                value={jenisUsaha}
                onChange={(e) => setJenisUsaha(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3.5 py-2 text-xs font-bold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
              >
                <option value="Konvensional">Konvensional</option>
                <option value="Syariah">Syariah</option>
                <option value="Semua">Semua Jenis Usaha</option>
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

      {/* KPI HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
          <span className="text-[11px] font-bold text-[#667085] uppercase">Total Aset Industri (2025)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#172033]">Rp 890,22 T</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold">
            <span className="text-[#0084FF]">PAJ: Rp 629,25 T</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#FF7A00]">PAU: Rp 260,97 T</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
          <span className="text-[11px] font-bold text-[#667085] uppercase">Rasio Investasi Cadangan</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">118,4%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Sehat</span>
          </div>
          <span className="text-xs text-[#667085] mt-1 block">Batas Minimum Mandatori: 100%</span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0]">
          <span className="text-[11px] font-bold text-[#667085] uppercase">Entitas Asuransi Terdaftar</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#172033]">148</span>
            <span className="text-xs font-semibold text-[#667085]">Perusahaan</span>
          </div>
          <span className="text-xs text-[#667085] mt-1 block">54 Jiwa • 72 Umum • 8 Reasuransi • 14 Syariah</span>
        </div>
      </div>

      {/* HORIZONTAL NAV TABS (MATCHING SCREENSHOT TABS) */}
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

        {/* TAB CONTENT AREA */}
        <div className="p-4 sm:p-6">
          
          {/* ================= TAB 1: TREN TOTAL ASET (MAIN SCREENSHOT VIEW) ================= */}
          {activeTab === "Tren Total Aset" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Chart Centered Title */}
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-[#344054] tracking-wide">
                  Total Aset Industri Asuransi dan Reasuransi
                </h3>
              </div>

              {/* Main Line Chart with Badges on Points */}
              <div className="h-72 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={DATA_TOTAL_ASET}
                    margin={{ top: 30, right: 30, left: 10, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
                    <XAxis
                      dataKey="tahun"
                      tick={{ fontSize: 11, fill: "#475467", fontWeight: 600 }}
                      axisLine={{ stroke: "#D0D5DD" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 700]}
                      ticks={[0, 100, 200, 300, 400, 500, 600, 700]}
                      tick={{ fontSize: 10, fill: "#667085" }}
                      axisLine={{ stroke: "#D0D5DD" }}
                      tickLine={false}
                      label={{
                        value: "Rp Triliun",
                        angle: -90,
                        position: "insideLeft",
                        offset: 5,
                        style: { fontSize: 11, fill: "#667085", fontWeight: 500 }
                      }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#172033] text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-700">
                              <p className="font-bold border-b border-slate-700 pb-1">Tahun {label}</p>
                              {payload.map((p: any, i: number) => (
                                <div key={i} className="flex items-center justify-between gap-4">
                                  <span className="flex items-center gap-1.5" style={{ color: p.color }}>
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                                    {p.name === "paj" ? "PAJ (Asuransi Jiwa)" : "PAU (Asuransi Umum)"}:
                                  </span>
                                  <span className="font-mono font-bold">
                                    Rp {Number(p.value).toFixed(2).replace(".", ",")} T
                                  </span>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />

                    {/* PAJ Blue Line */}
                    <Line
                      type="linear"
                      dataKey="paj"
                      name="PAJ"
                      stroke="#0084FF"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#0084FF", strokeWidth: 1 }}
                      activeDot={{ r: 6 }}
                      label={<CustomizedDotLabel stroke="#0084FF" />}
                    />

                    {/* PAU Orange Line */}
                    <Line
                      type="linear"
                      dataKey="pau"
                      name="PAU"
                      stroke="#FF7A00"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#FF7A00", strokeWidth: 1 }}
                      activeDot={{ r: 6 }}
                      label={<CustomizedDotLabel stroke="#FF7A00" />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Legend matching screenshot at bottom */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#475467]">
                  <span className="w-3.5 h-3.5 bg-[#0084FF] rounded-xs inline-block" />
                  <span>PAJ (Perusahaan Asuransi Jiwa)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#475467]">
                  <span className="w-3.5 h-3.5 bg-[#FF7A00] rounded-xs inline-block" />
                  <span>PAU (Perusahaan Asuransi Umum)</span>
                </div>
              </div>

              {/* Insight Note */}
              <div className="bg-[#F8F9FB] rounded-xl p-4 border border-[#EAECF0] text-xs text-[#475467] leading-relaxed">
                <span className="font-bold text-[#172033] block mb-1">Catatan Analitik Tim Penjaminan Polis LPS:</span>
                Total aset industri asuransi konvensional mencapai puncaknya pada 2025 dengan PAJ sebesar <strong>Rp 629,25 Triliun</strong> dan PAU sebesar <strong>Rp 260,97 Triliun</strong>. Data tahun 2026 masih dalam proses kompilasi triwulanan dan rekonsiliasi Single Insurance View (SIV).
              </div>
            </div>
          )}

          {/* ================= TAB 2: TREN KOMPOSISI ASET ASURANSI JIWA ================= */}
          {activeTab === "Tren Komposisi Aset Asuransi Jiwa" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-[#172033]">
                  Portofolio Alokasi Investasi Asuransi Jiwa (Rp 629,25 T)
                </h4>
                <span className="text-xs text-[#667085]">Basis Data 2025</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie
                        data={DATA_KOMPOSISI_JIWA}
                        dataKey="nilai"
                        nameKey="instrumen"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={55}
                        paddingAngle={3}
                      >
                        {DATA_KOMPOSISI_JIWA.map((entry, idx) => (
                          <Cell key={`jiwa-pie-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2.5">
                  {DATA_KOMPOSISI_JIWA.map((item, idx) => (
                    <div key={idx} className="bg-[#F9FAFB] p-2.5 rounded-xl border border-[#EAECF0] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-semibold text-[#344054]">{item.instrumen}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#172033]">Rp {item.nilai} T</span>
                        <span className="text-[11px] text-[#667085] ml-1.5 font-medium">({item.pct})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: TREN KOMPOSISI ASET ASURANSI UMUM & REASURANSI ================= */}
          {activeTab === "Tren Komposisi Aset Asuransi Umum & Reasuransi" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-[#172033]">
                  Portofolio Alokasi Asuransi Umum & Reasuransi (Rp 260,97 T)
                </h4>
                <span className="text-xs text-[#667085]">Likuiditas Tinggi</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_KOMPOSISI_UMUM} layout="vertical" margin={{ left: 10, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EAECF0" />
                      <XAxis type="number" tick={{ fontSize: 10 }} />
                      <YAxis dataKey="instrumen" type="category" width={110} tick={{ fontSize: 9.5 }} />
                      <Tooltip />
                      <Bar dataKey="nilai" fill="#FF7A00" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2.5">
                  {DATA_KOMPOSISI_UMUM.map((item, idx) => (
                    <div key={idx} className="bg-[#F9FAFB] p-2.5 rounded-xl border border-[#EAECF0] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-semibold text-[#344054]">{item.instrumen}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#172033]">Rp {item.nilai} T</span>
                        <span className="text-[11px] text-[#667085] ml-1.5 font-medium">({item.pct})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: TREN PERTUMBUHAN PREMI ================= */}
          {activeTab === "Tren Pertumbuhan Premi" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-[#172033]">
                  Pertumbuhan Premi Asuransi Jiwa & Umum (2022 - 2026)
                </h4>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  CAGR +6.4%
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_PREMI} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
                    <XAxis dataKey="tahun" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="premiJiwa" name="Premi Jiwa (PAJ)" fill="#0084FF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="premiUmum" name="Premi Umum (PAU)" fill="#FF7A00" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ================= TAB 5: TREN LOSS & EXPENSE RATIO ================= */}
          {activeTab === "Tren Loss & Expense Ration" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-[#172033]">
                  Rasio Beban Klaim (Loss Ratio) & Operasional (Expense Ratio)
                </h4>
                <span className="text-xs text-[#667085]">Underwriting Healthy &lt; 95%</span>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DATA_LOSS_EXPENSE} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
                    <XAxis dataKey="tahun" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="lossRatio" name="Loss Ratio" stroke="#D92D20" fill="#FEE4E2" />
                    <Area type="monotone" dataKey="expenseRatio" name="Expense Ratio" stroke="#F79009" fill="#FEF0C7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ================= TAB 6: TREN RASIO INVESTASI TERHADAP CADANGAN TEKNIS ================= */}
          {activeTab === "Tren Rasio Investasi terhadap Cadangan Teknis" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-[#172033]">
                  Rasio Investasi terhadap Cadangan Teknis (Solvabilitas Penjaminan)
                </h4>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  118.4% (Threshold: &gt; 100%)
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DATA_CADANGAN_TEKNIS} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
                    <XAxis dataKey="tahun" tick={{ fontSize: 11 }} />
                    <YAxis domain={[80, 140]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rasio" name="Rasio Aktual (%)" stroke="#12B76A" strokeWidth={3} dot={{ r: 5 }} />
                    <Line type="monotone" dataKey="batasMin" name="Batas Minimum Regulas (100%)" stroke="#D92D20" strokeDasharray="4 4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
