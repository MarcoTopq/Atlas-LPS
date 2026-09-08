"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Coins,
  Percent,
  Calendar,
  Layers,
  Filter,
  Info,
  CheckSquare,
  Square,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  BarChart3,
  Search,
  Building2,
  PieChart as PieIcon,
  ChevronDown,
  Globe,
  SlidersHorizontal,
  ExternalLink,
  HeartPulse,
  Scale
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA: TINGKAT BUNGA & ACUAN PENJAMINAN POLIS ASURANSI (2018 - 2026) ---
const DATA_BUNGA_ASURANSI = [
  { tahun: "2018-01", lpsPppRate: 4.50, biRate: 4.25, sbn10y: 6.80, endowmentRate: 5.20, aktuariaRate: 4.75, inflasiMedis: 8.5 },
  { tahun: "2018-07", lpsPppRate: 4.75, biRate: 5.25, sbn10y: 7.40, endowmentRate: 5.50, aktuariaRate: 5.00, inflasiMedis: 9.0 },
  { tahun: "2019-01", lpsPppRate: 5.00, biRate: 6.00, sbn10y: 7.90, endowmentRate: 5.80, aktuariaRate: 5.25, inflasiMedis: 9.4 },
  { tahun: "2019-07", lpsPppRate: 4.75, biRate: 5.75, sbn10y: 7.20, endowmentRate: 5.50, aktuariaRate: 5.00, inflasiMedis: 9.8 },
  { tahun: "2020-01", lpsPppRate: 4.25, biRate: 5.00, sbn10y: 6.90, endowmentRate: 5.10, aktuariaRate: 4.60, inflasiMedis: 10.2 },
  { tahun: "2020-07", lpsPppRate: 3.75, biRate: 4.00, sbn10y: 6.80, endowmentRate: 4.60, aktuariaRate: 4.20, inflasiMedis: 10.8 },
  { tahun: "2021-01", lpsPppRate: 3.50, biRate: 3.75, sbn10y: 6.30, endowmentRate: 4.20, aktuariaRate: 3.90, inflasiMedis: 11.5 },
  { tahun: "2021-07", lpsPppRate: 3.25, biRate: 3.50, sbn10y: 6.40, endowmentRate: 4.00, aktuariaRate: 3.75, inflasiMedis: 12.0 },
  { tahun: "2021-12", lpsPppRate: 3.25, biRate: 3.50, sbn10y: 6.35, endowmentRate: 4.00, aktuariaRate: 3.75, inflasiMedis: 11.8 },
  { tahun: "2022-06", lpsPppRate: 3.25, biRate: 3.50, sbn10y: 6.90, endowmentRate: 4.10, aktuariaRate: 3.80, inflasiMedis: 12.4 },
  { tahun: "2022-09", lpsPppRate: 3.50, biRate: 4.25, sbn10y: 7.20, endowmentRate: 4.40, aktuariaRate: 4.00, inflasiMedis: 12.8 },
  { tahun: "2022-12", lpsPppRate: 3.75, biRate: 5.50, sbn10y: 7.00, endowmentRate: 4.80, aktuariaRate: 4.25, inflasiMedis: 13.2 },
  { tahun: "2023-06", lpsPppRate: 4.00, biRate: 5.75, sbn10y: 6.50, endowmentRate: 5.00, aktuariaRate: 4.40, inflasiMedis: 13.0 },
  { tahun: "2023-12", lpsPppRate: 4.00, biRate: 6.00, sbn10y: 6.60, endowmentRate: 5.10, aktuariaRate: 4.50, inflasiMedis: 12.5 },
  { tahun: "2024-06", lpsPppRate: 4.25, biRate: 6.25, sbn10y: 6.90, endowmentRate: 5.30, aktuariaRate: 4.60, inflasiMedis: 12.1 },
  { tahun: "2024-12", lpsPppRate: 4.25, biRate: 6.00, sbn10y: 6.80, endowmentRate: 5.20, aktuariaRate: 4.50, inflasiMedis: 11.6 },
  { tahun: "2025-06", lpsPppRate: 4.00, biRate: 5.75, sbn10y: 6.70, endowmentRate: 5.00, aktuariaRate: 4.40, inflasiMedis: 11.2 },
  { tahun: "2025-12", lpsPppRate: 4.00, biRate: 5.50, sbn10y: 6.60, endowmentRate: 4.90, aktuariaRate: 4.35, inflasiMedis: 10.8 },
  { tahun: "2026-07", lpsPppRate: 4.00, biRate: 6.00, sbn10y: 6.75, endowmentRate: 5.05, aktuariaRate: 4.40, inflasiMedis: 10.5 },
];

// --- MOCK DATA: PERTUMBUHAN NOMINAL MANFAAT POLIS (Rp Triliun & MoM %) ---
const DATA_NOMINAL_POLIS = [
  { periode: "2022-07", nominal: 1100, mom: 0.50 },
  { periode: "2022-09", nominal: 1115, mom: 0.42 },
  { periode: "2022-11", nominal: 1130, mom: 1.25 },
  { periode: "2022-12", nominal: 1150, mom: 1.76 },
  { periode: "2023-01", nominal: 1145, mom: -0.43 },
  { periode: "2023-04", nominal: 1160, mom: 0.35 },
  { periode: "2023-07", nominal: 1180, mom: 0.52 },
  { periode: "2023-10", nominal: 1205, mom: 0.85 },
  { periode: "2023-12", nominal: 1225, mom: 1.65 },
  { periode: "2024-02", nominal: 1230, mom: 0.40 },
  { periode: "2024-05", nominal: 1260, mom: 0.65 },
  { periode: "2024-08", nominal: 1285, mom: 0.55 },
  { periode: "2024-10", nominal: 1300, mom: 0.45 },
  { periode: "2024-12", nominal: 1335, mom: 1.80 },
  { periode: "2025-03", nominal: 1350, mom: 0.50 },
  { periode: "2025-06", nominal: 1380, mom: 0.74 },
  { periode: "2025-08", nominal: 1400, mom: 0.60 },
  { periode: "2025-10", nominal: 1420, mom: 0.55 },
  { periode: "2025-11", nominal: 1435, mom: 0.85 },
  { periode: "2025-12", nominal: 1455, mom: 1.39 },
  { periode: "2026-02", nominal: 1460, mom: 0.34 },
  { periode: "2026-04", nominal: 1470, mom: 0.45 },
  { periode: "2026-05", nominal: 1475, mom: 0.34 },
  { periode: "2026-06", nominal: 1480, mom: 0.34 },
  { periode: "2026-07", nominal: 1485, mom: 0.35 },
];

// --- MOCK DATA: PERTUMBUHAN JUMLAH PEMEGANG POLIS (Jumlah Tertanggung & MoM %) ---
const DATA_PEMEGANG_POLIS = [
  { periode: "2022-07", tertanggung: 68500000, mom: 0.65 },
  { periode: "2022-09", tertanggung: 69200000, mom: 1.02 },
  { periode: "2022-11", tertanggung: 70100000, mom: 1.30 },
  { periode: "2022-12", tertanggung: 71200000, mom: 1.56 },
  { periode: "2023-01", tertanggung: 71000000, mom: -0.28 },
  { periode: "2023-04", tertanggung: 72400000, mom: 0.55 },
  { periode: "2023-06", tertanggung: 73500000, mom: 0.76 },
  { periode: "2023-09", tertanggung: 74800000, mom: 0.90 },
  { periode: "2023-12", tertanggung: 76200000, mom: 1.45 },
  { periode: "2024-03", tertanggung: 77100000, mom: 0.60 },
  { periode: "2024-06", tertanggung: 78300000, mom: 0.78 },
  { periode: "2024-09", tertanggung: 79500000, mom: 0.65 },
  { periode: "2024-12", tertanggung: 81200000, mom: 1.50 },
  { periode: "2025-03", tertanggung: 82000000, mom: 0.50 },
  { periode: "2025-06", tertanggung: 82900000, mom: 0.65 },
  { periode: "2025-09", tertanggung: 83800000, mom: 0.60 },
  { periode: "2025-11", tertanggung: 84600000, mom: 0.85 },
  { periode: "2025-12", tertanggung: 85200000, mom: 0.70 },
  { periode: "2026-02", tertanggung: 85500000, mom: 0.35 },
  { periode: "2026-04", tertanggung: 85900000, mom: 0.46 },
  { periode: "2026-06", tertanggung: 86200000, mom: 0.35 },
  { periode: "2026-07", tertanggung: 86540210, mom: 0.39 },
];

// --- MOCK DATA: DISTRIBUSI NOMINAL MANFAAT POLIS (TABEL MASTER PENJAMINAN POLIS) ---
interface DistributionSection {
  kategori: string;
  items: {
    nama: string;
    nominal: number;
    share: number;
    m1: number;
    m3: number;
    m6: number;
    ytd: number;
    y1: number;
    y2: number;
    tipeInggris?: string;
  }[];
}

const DATA_DISTRIBUSI_POLIS_SECTIONS: DistributionSection[] = [
  {
    kategori: "Lini Usaha Asuransi",
    items: [
      { nama: "Asuransi Jiwa (Kematian & Dwiguna)", nominal: 625.40, share: 42.1, m1: 0.5, m3: 1.8, m6: 2.1, ytd: 2.1, y1: 8.4, y2: 18.2, tipeInggris: "Life Insurance (Term & Endowment)" },
      { nama: "Asuransi Kesehatan & Rawat Inap", nominal: 245.10, share: 16.5, m1: 0.8, m3: 2.6, m6: 3.2, ytd: 3.2, y1: 12.0, y2: 24.5, tipeInggris: "Health & Medical Insurance" },
      { nama: "Asuransi Harta Benda & Properti", nominal: 267.30, share: 18.0, m1: 0.4, m3: 1.2, m6: 1.5, ytd: 1.5, y1: 7.2, y2: 15.0, tipeInggris: "Property & Fire Insurance" },
      { nama: "Asuransi Kendaraan Bermotor", nominal: 178.20, share: 12.0, m1: 0.3, m3: 0.9, m6: 1.1, ytd: 1.1, y1: 6.0, y2: 13.4, tipeInggris: "Motor Vehicle Insurance" },
      { nama: "Asuransi Rekayasa & Rangka Kapal", nominal: 96.50, share: 6.5, m1: -0.2, m3: 0.5, m6: 0.8, ytd: 0.8, y1: 5.5, y2: 11.2, tipeInggris: "Engineering & Marine Hull" },
      { nama: "Asuransi Aneka & Suretyship", nominal: 72.70, share: 4.9, m1: 0.2, m3: 0.7, m6: 1.0, ytd: 1.0, y1: 4.8, y2: 10.0, tipeInggris: "Suretyship & Misc." },
    ]
  },
  {
    kategori: "Kepemilikan Polis",
    items: [
      { nama: "Polis Individu / Ritel", nominal: 1113.90, share: 75.0, m1: 0.4, m3: 1.5, m6: 2.0, ytd: 2.0, y1: 8.8, y2: 18.5, tipeInggris: "Individual Policies" },
      { nama: "Polis Kumpulan / Korporasi (Group)", nominal: 371.30, share: 25.0, m1: 0.3, m3: 1.2, m6: 1.6, ytd: 1.6, y1: 7.5, y2: 16.0, tipeInggris: "Group / Corporate Policies" },
    ]
  },
  {
    kategori: "Prinsip Pengelolaan",
    items: [
      { nama: "Konvensional", nominal: 1292.12, share: 87.0, m1: 0.4, m3: 1.4, m6: 1.8, ytd: 1.8, y1: 8.2, y2: 17.5, tipeInggris: "Conventional" },
      { nama: "Syariah (Dana Tabarru' & Ujrah)", nominal: 193.08, share: 13.0, m1: 0.6, m3: 2.1, m6: 2.8, ytd: 2.8, y1: 11.4, y2: 22.0, tipeInggris: "Sharia (Tabarru' Fund)" },
    ]
  },
  {
    kategori: "Tiering Nilai Pertanggungan",
    items: [
      { nama: "≤ Rp 100 Juta", nominal: 267.34, share: 18.0, m1: 0.3, m3: 1.0, m6: 1.2, ytd: 1.2, y1: 5.4, y2: 12.0, tipeInggris: "N ≤ 100 million" },
      { nama: "> Rp 100 Jt s/d Rp 250 Jt", nominal: 222.78, share: 15.0, m1: 0.4, m3: 1.2, m6: 1.5, ytd: 1.5, y1: 6.8, y2: 14.5, tipeInggris: "100M < N ≤ 250 million" },
      { nama: "> Rp 250 Jt s/d Rp 500 Jt", nominal: 297.04, share: 20.0, m1: 0.5, m3: 1.5, m6: 2.0, ytd: 2.0, y1: 8.2, y2: 17.8, tipeInggris: "250M < N ≤ 500 million (Cap)" },
      { nama: "> Rp 500 Jt s/d Rp 1 Miliar", nominal: 267.34, share: 18.0, m1: 0.4, m3: 1.4, m6: 1.9, ytd: 1.9, y1: 8.9, y2: 19.2, tipeInggris: "500M < N ≤ 1 billion" },
      { nama: "> Rp 1 Miliar", nominal: 430.70, share: 29.0, m1: 0.3, m3: 1.6, m6: 2.2, ytd: 2.2, y1: 10.5, y2: 23.4, tipeInggris: "N > 1 billion" },
    ]
  },
  {
    kategori: "Kepemilikan Perusahaan Asuransi",
    items: [
      { nama: "BUMN / Persero", nominal: 445.56, share: 30.0, m1: 0.4, m3: 1.5, m6: 1.9, ytd: 1.9, y1: 8.5, y2: 18.0, tipeInggris: "State-Owned Insurers" },
      { nama: "Swasta Nasional", nominal: 668.34, share: 45.0, m1: 0.4, m3: 1.4, m6: 1.8, ytd: 1.8, y1: 8.4, y2: 17.8, tipeInggris: "Private National Insurers" },
      { nama: "Patungan (Joint Venture)", nominal: 297.04, share: 20.0, m1: 0.3, m3: 1.3, m6: 1.7, ytd: 1.7, y1: 8.0, y2: 17.0, tipeInggris: "Joint Venture Insurers" },
      { nama: "Asing", nominal: 74.26, share: 5.0, m1: 0.2, m3: 0.8, m6: 1.0, ytd: 1.0, y1: 5.0, y2: 11.0, tipeInggris: "Foreign Insurers" },
    ]
  },
  {
    kategori: "Mata Uang",
    items: [
      { nama: "Rupiah (IDR)", nominal: 1321.83, share: 89.0, m1: 0.4, m3: 1.5, m6: 1.9, ytd: 1.9, y1: 8.6, y2: 18.2, tipeInggris: "Rupiah (IDR)" },
      { nama: "Valuta Asing (USD/Valas)", nominal: 163.37, share: 11.0, m1: 0.2, m3: 0.9, m6: 1.2, ytd: 1.2, y1: 6.2, y2: 14.0, tipeInggris: "Foreign Currencies" },
    ]
  },
  {
    kategori: "Tingkat Solvabilitas (RBC)",
    items: [
      { nama: "RBC > 250% (Sangat Sehat)", nominal: 920.82, share: 62.0, m1: 0.5, m3: 1.7, m6: 2.1, ytd: 2.1, y1: 9.4, y2: 20.0, tipeInggris: "RBC > 250%" },
      { nama: "RBC 120% - 250% (Sehat / Normal)", nominal: 475.26, share: 32.0, m1: 0.3, m3: 1.1, m6: 1.5, ytd: 1.5, y1: 7.2, y2: 15.5, tipeInggris: "RBC 120% - 250%" },
      { nama: "RBC < 120% (Pengawasan Khusus)", nominal: 89.12, share: 6.0, m1: -0.5, m3: -1.2, m6: -1.8, ytd: -1.8, y1: -2.4, y2: 1.0, tipeInggris: "RBC < 120% (Watchlist)" },
    ]
  },
  {
    kategori: "Cakupan Penjaminan Polis (PPP)",
    items: [
      { nama: "Dijamin Penuh (≤ Rp 500 Juta)", nominal: 787.16, share: 53.0, m1: 0.4, m3: 1.4, m6: 1.8, ytd: 1.8, y1: 8.2, y2: 17.5, tipeInggris: "Fully Guaranteed (≤ Rp 500M)" },
      { nama: "Dijamin Sebagian (Maks Rp 500 Juta)", nominal: 445.56, share: 30.0, m1: 0.4, m3: 1.4, m6: 1.9, ytd: 1.9, y1: 8.5, y2: 18.0, tipeInggris: "Partially Guaranteed" },
      { nama: "Tidak Dijamin (> Batas / Bunga Melebihi)", nominal: 252.48, share: 17.0, m1: 0.3, m3: 1.2, m6: 1.6, ytd: 1.6, y1: 7.8, y2: 16.5, tipeInggris: "Not Guaranteed" },
    ]
  }
];

export default function DashboardPenjaminanAsuransi() {
  // Main Module View: "Tingkat Bunga & Batas Manfaat" or "Distribusi Polis Asuransi"
  const [mainTab, setMainTab] = useState<"Tingkat Bunga" | "Distribusi Polis">("Distribusi Polis");

  // Sub-tabs under Distribusi Polis
  const [distribusiSubTab, setDistribusiSubTab] = useState<
    | "Informasi Umum"
    | "Pertumbuhan Nominal Manfaat Polis"
    | "Pertumbuhan Pemegang Polis"
    | "Distribusi Nominal Manfaat Polis"
    | "Distribusi Jumlah Tertanggung"
    | "Peta Musiman Klaim"
    | "Porsi Penjaminan Polis"
  >("Pertumbuhan Nominal Manfaat Polis");

  // Filters for Line Chart in Tingkat Bunga
  const [selectedLines, setSelectedLines] = useState<Record<string, boolean>>({
    lpsPppRate: true,
    biRate: true,
    sbn10y: true,
    endowmentRate: true,
    aktuariaRate: true,
    inflasiMedis: true,
  });

  const toggleLine = (key: string) => {
    setSelectedLines(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter year/month for Distribusi Polis
  const [selectedTahun, setSelectedTahun] = useState("2026");
  const [selectedBulan, setSelectedBulan] = useState("7");

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300 w-full text-[#172033]">
      
      {/* ========================================================================= */}
      {/* TOP PRIMARY BLUE HEADER BAR (MATCHING PENJAMINAN LPS BANNER) */}
      {/* ========================================================================= */}
      <div className="bg-[#0284C7] text-white p-3.5 sm:p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10.5px] uppercase tracking-wider font-semibold text-blue-100 block">
              Program Penjaminan Polis (PPP) — UU P2SK
            </span>
            <h2 className="text-base sm:text-lg font-black tracking-tight leading-tight">
              {mainTab === "Tingkat Bunga" ? "Tingkat Bunga Penjaminan Polis" : "Distribusi Polis Asuransi"}
            </h2>
          </div>
        </div>

        {/* Switcher: Tingkat Bunga vs Distribusi Polis */}
        <div className="flex items-center bg-black/15 p-1 rounded-xl self-start sm:self-auto border border-white/15">
          <button
            type="button"
            onClick={() => setMainTab("Tingkat Bunga")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
              mainTab === "Tingkat Bunga" ? "bg-white text-[#0284C7] shadow-xs" : "text-white/85 hover:text-white"
            )}
          >
            Tingkat Bunga Penjaminan
          </button>
          <button
            type="button"
            onClick={() => setMainTab("Distribusi Polis")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
              mainTab === "Distribusi Polis" ? "bg-white text-[#0284C7] shadow-xs" : "text-white/85 hover:text-white"
            )}
          >
            Distribusi Polis Asuransi
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: TINGKAT BUNGA & ACUAN PENJAMINAN POLIS */}
      {/* ========================================================================= */}
      {mainTab === "Tingkat Bunga" && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-5 animate-in fade-in duration-200">
          
          {/* Top LPS Brand + Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAECF0] gap-3">
            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-[#EA580C] font-black text-xs tracking-wider">
                LPS
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-[#172033]">
                  Perkembangan Tingkat Bunga & Batas Imbal Hasil Polis
                </h3>
                <p className="text-[11px] text-[#667085]">
                  Acuan Suku Bunga Penjaminan Polis LPS, Yield SBN & Asumsi Aktuaria Asuransi
                </p>
              </div>
            </div>

            {/* Sub-tab tag at bottom */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
              <Percent className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Batas Bunga Penjaminan Polis (PPP Rate)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left Column: Periode & Checklist */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-4 pr-0 md:pr-2 border-b md:border-b-0 md:border-r border-[#EAECF0] pb-4 md:pb-0">
              
              {/* Periode Data */}
              <div>
                <label className="text-xs font-bold text-[#172033] block mb-1.5">
                  Periode Data
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="1/3/2018"
                    className="w-1/2 px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-center font-mono font-semibold"
                  />
                  <span className="text-xs text-[#94A3B8]">-</span>
                  <input
                    type="text"
                    readOnly
                    value="6/18/2026"
                    className="w-1/2 px-2.5 py-1.5 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-center font-mono font-semibold"
                  />
                </div>
                {/* Range Slider simulation */}
                <div className="mt-3 px-1">
                  <div className="h-1.5 bg-slate-200 rounded-full relative">
                    <div className="absolute left-0 right-0 top-0 bottom-0 bg-[#EA580C] rounded-full" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-[#EA580C] rounded-full shadow-xs cursor-pointer" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-[#EA580C] rounded-full shadow-xs cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Hierarchy Checklist */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#172033]">Acuan Suku Bunga</span>
                  <span className="text-[10.5px] font-semibold text-[#0284C7] cursor-pointer hover:underline">
                    Pilih Semua
                  </span>
                </div>

                {/* Group 1: Acuan Penjaminan Polis LPS */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-[#475569] text-[11px] block">
                    Penjaminan LPS (Mandat PPP)
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.lpsPppRate}
                      onChange={() => toggleLine("lpsPppRate")}
                      className="rounded text-[#16A34A] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-bold text-green-700">LPS PPP Rate (Batas Bunga Polis)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] ml-auto" />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.endowmentRate}
                      onChange={() => toggleLine("endowmentRate")}
                      className="rounded text-[#9333EA] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">Imbal Hasil Polis Dwiguna</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9333EA] ml-auto" />
                  </label>
                </div>

                {/* Group 2: Acuan Pasar Keuangan */}
                <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                  <span className="font-bold text-[#475569] text-[11px] block">
                    Acuan Pasar Finansial
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.biRate}
                      onChange={() => toggleLine("biRate")}
                      className="rounded text-[#1E3A8A] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">BI Rate</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A] ml-auto" />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.sbn10y}
                      onChange={() => toggleLine("sbn10y")}
                      className="rounded text-[#0284C7] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">Yield SBN 10 Tahun</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] ml-auto" />
                  </label>
                </div>

                {/* Group 3: Aktuaria & Inflasi Medis */}
                <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                  <span className="font-bold text-[#475569] text-[11px] block">
                    Aktuaria & Kesehatan
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.aktuariaRate}
                      onChange={() => toggleLine("aktuariaRate")}
                      className="rounded text-[#EC4899] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">Asumsi Bunga Aktuaria (Jiwa)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] ml-auto" />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.inflasiMedis}
                      onChange={() => toggleLine("inflasiMedis")}
                      className="rounded text-[#F97316] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">Inflasi Medis (Kesehatan)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] ml-auto" />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-line Chart + Keterangan Box */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
              
              {/* Chart */}
              <div className="h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DATA_BUNGA_ASURANSI} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="tahun"
                      tickFormatter={(val) => val.split("-")[0]}
                      tick={{ fill: "#64748B", fontSize: 10, fontWeight: 600 }}
                      axisLine={{ stroke: "#CBD5E1" }}
                    />
                    <YAxis
                      domain={[2, 14]}
                      tickFormatter={(val) => `${val}%`}
                      tick={{ fill: "#64748B", fontSize: 10 }}
                      axisLine={{ stroke: "#CBD5E1" }}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, ""]}
                      labelFormatter={(label) => `Periode: ${label}`}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        fontSize: "11px",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "10.5px", paddingTop: "8px" }}
                    />

                    {selectedLines.lpsPppRate && (
                      <Line
                        type="stepAfter"
                        dataKey="lpsPppRate"
                        name="LPS PPP Rate"
                        stroke="#16A34A"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    )}
                    {selectedLines.biRate && (
                      <Line
                        type="stepAfter"
                        dataKey="biRate"
                        name="BI Rate"
                        stroke="#1E3A8A"
                        strokeWidth={2}
                        dot={false}
                      />
                    )}
                    {selectedLines.sbn10y && (
                      <Line
                        type="monotone"
                        dataKey="sbn10y"
                        name="Yield SBN 10 Tahun"
                        stroke="#0284C7"
                        strokeWidth={2}
                        dot={false}
                      />
                    )}
                    {selectedLines.endowmentRate && (
                      <Line
                        type="monotone"
                        dataKey="endowmentRate"
                        name="Bunga Polis Dwiguna"
                        stroke="#9333EA"
                        strokeWidth={1.8}
                        dot={false}
                      />
                    )}
                    {selectedLines.aktuariaRate && (
                      <Line
                        type="monotone"
                        dataKey="aktuariaRate"
                        name="Asumsi Aktuaria Jiwa"
                        stroke="#EC4899"
                        strokeWidth={1.8}
                        strokeDasharray="4 2"
                        dot={false}
                      />
                    )}
                    {selectedLines.inflasiMedis && (
                      <Line
                        type="monotone"
                        dataKey="inflasiMedis"
                        name="Inflasi Medis"
                        stroke="#F97316"
                        strokeWidth={1.8}
                        dot={false}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom Official Keterangan & Catatan Kaki (Mandat UU P2SK) */}
              <div className="bg-[#F8FAFC] rounded-xl p-3 sm:p-4 border border-[#E2E8F0] text-[10px] text-[#475569] space-y-1.5 leading-relaxed">
                <span className="font-extrabold text-[#172033] block text-[11px] mb-1">
                  Keterangan & Mandat UU P2SK No. 4 Tahun 2023:
                </span>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Program Penjaminan Polis (PPP) diselenggarakan oleh LPS untuk menjamin pengembalian sebagian atau seluruh klaim/manfaat pemegang polis saat perusahaan asuransi dicabut izin usahanya.</li>
                  <li>Batas tingkat imbal hasil penjaminan polis (LPS PPP Rate) ditetapkan secara berkala oleh Dewan Komisioner LPS dengan memperhatikan yield SBN dan stabilitas industri.</li>
                  <li>Polis yang menjanjikan imbal hasil pasti di atas batas penjaminan LPS hanya dijamin sebatas nilai pertanggungan murni (proteksi) tanpa unsur kelebihan bunga.</li>
                  <li>Asumsi suku bunga aktuaria mengacu pada diskonto proyeksi arus kas masa depan (PSAK 117 / IFRS 17).</li>
                  <li>
                    <strong>Sumber data:</strong> Lembaga Penjamin Simpanan (LPS), Otoritas Jasa Keuangan (OJK), Bank Indonesia, dan Asosiasi Asuransi Jiwa Indonesia (AAJI) & Asosiasi Asuransi Umum Indonesia (AAUI).
                  </li>
                </ol>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: DISTRIBUSI POLIS ASURANSI (7 SUB-TABS) */}
      {/* ========================================================================= */}
      {mainTab === "Distribusi Polis" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* HORIZONTAL SUB-TABS NAVIGATION */}
          <div className="bg-white p-1.5 rounded-2xl shadow-2xs border border-[#EAECF0] flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            {[
              { id: "Informasi Umum", label: "Informasi Umum" },
              { id: "Pertumbuhan Nominal Manfaat Polis", label: "Pertumbuhan Nominal Manfaat Polis" },
              { id: "Pertumbuhan Pemegang Polis", label: "Pertumbuhan Pemegang Polis" },
              { id: "Distribusi Nominal Manfaat Polis", label: "Distribusi Nominal Manfaat Polis" },
              { id: "Distribusi Jumlah Tertanggung", label: "Distribusi Jumlah Tertanggung" },
              { id: "Peta Musiman Klaim", label: "Peta Musiman Klaim" },
              { id: "Porsi Penjaminan Polis", label: "Porsi Penjaminan Polis" },
            ].map((subTab) => {
              const isActive = distribusiSubTab === subTab.id;
              return (
                <button
                  key={subTab.id}
                  type="button"
                  onClick={() => setDistribusiSubTab(subTab.id as any)}
                  className={cn(
                    "flex-1 py-2.5 px-3.5 rounded-xl text-xs sm:text-[12.5px] font-bold transition-all text-center cursor-pointer select-none whitespace-nowrap",
                    isActive
                      ? "bg-[#EA580C] text-white shadow-xs"
                      : "bg-transparent text-[#667085] hover:text-[#172033] hover:bg-[#F9FAFB]"
                  )}
                >
                  {subTab.label}
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* SUB-TAB 1: INFORMASI UMUM (BILINGUAL) */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Informasi Umum" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              
              {/* Left Card: INFORMASI UMUM (Bahasa Indonesia) */}
              <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div className="border-b border-[#EAECF0] pb-2 flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#172033]">
                      INFORMASI UMUM PENJAMINAN POLIS
                    </h4>
                    <span className="text-[10.5px] font-bold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded">
                      ID
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#172033] mb-1">Sumber Data</h5>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Data bersumber dari Laporan Terintegrasi Industri Asuransi (LPIA) dan Sistem Informasi Kepesertaan Asuransi (SIKA) yang disampaikan oleh perusahaan asuransi kepada Otoritas Jasa Keuangan (OJK) dan LPS.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#172033] mb-1">Definisi & Ruang Lingkup Penjaminan</h5>
                    <ol className="text-xs text-[#475569] space-y-2 leading-relaxed list-decimal pl-4">
                      <li>Polis asuransi yang dijamin meliputi Polis Asuransi Jiwa dan Polis Asuransi Umum yang aktif dan memenuhi syarat kepesertaan.</li>
                      <li>
                        Ruang Lingkup Penjaminan meliputi:
                        <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[#334155]">
                          <li>Pengembalian Nilai Tunai (Cash Value) polis asuransi jiwa s/d batas maksimal tertentu.</li>
                          <li>Pembayaran klaim meninggal dunia / kecelakaan diri yang telah disetujui.</li>
                          <li>Pembayaran klaim asuransi umum (ganti rugi properti, kendaraan, dsb) yang telah tervalidasi.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Batas Maksimal Penjaminan Polis:</strong> Ditetapkan proporsional (misal s/d Rp 500 Juta per pemegang polis/tertanggung) guna melindungi konsumen ritel dan menjaga stabilitas sistem keuangan.
                      </li>
                      <li>
                        Kriteria 3T Penjaminan Polis: <strong>Tercatat</strong> pada pembukuan perusahaan, <strong>Tidak memperoleh imbal hasil</strong> melebihi batas LPS, dan <strong>Tidak terbukti menyebabkan kerugian</strong> (bebas tindak pidana asuransi).
                      </li>
                      <li>
                        Tidak mencakup produk investasi murni (tanpa unsur proteksi) atau polis reasuransi internasional.
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Masukan & Saran */}
                <div className="pt-3 border-t border-[#EAECF0] text-center">
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">
                    Layanan Informasi & Kontak Penjaminan Polis
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-[#EA580C] text-xs font-semibold">
                    <Mail className="w-3.5 h-3.5" />
                    <span>penjaminan.polis@lps.go.id</span>
                  </div>
                </div>
              </div>

              {/* Right Card: GENERAL INFORMATION (English) */}
              <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div className="border-b border-[#EAECF0] pb-2 flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#172033]">
                      POLICY GUARANTEE GENERAL INFORMATION
                    </h4>
                    <span className="text-[10.5px] font-bold text-[#0284C7] bg-blue-50 px-2 py-0.5 rounded">
                      EN
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#172033] mb-1">Source of Data</h5>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Data derived from The Integrated Insurance Industry Report (LPIA) and The Insurance Membership Information System (SIKA) submitted by insurers to OJK and IDIC (LPS).
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#172033] mb-1">Definition & Guarantee Scope</h5>
                    <ol className="text-xs text-[#475569] space-y-2 leading-relaxed list-decimal pl-4">
                      <li>Guaranteed policies encompass active Life and General Insurance policies qualifying under the statutory membership framework.</li>
                      <li>
                        Guarantee coverage encompasses:
                        <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[#334155]">
                          <li>Restoration of policy cash surrender value up to statutory maximum limits.</li>
                          <li>Settlement of verified life, death, and accidental disability claims.</li>
                          <li>Settlement of verified property and indemnity general insurance claims.</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Statutory Guarantee Cap:</strong> Defined proportionally (e.g. up to IDR 500 Million per policyholder/insured) to protect retail policyholders and maintain market confidence.
                      </li>
                      <li>
                        Three Conditions for Coverage: Recorded in insurer records, Return rate not exceeding IDIC maximum ceiling, and No fraudulent or contributory wrongdoing.
                      </li>
                      <li>
                        Pure investment contracts devoid of insurance risk protection are strictly excluded.
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Feedback & Suggestion */}
                <div className="pt-3 border-t border-[#EAECF0] text-center">
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">
                    Inquiries & Policy Guarantee Desk
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#0284C7] text-xs font-semibold">
                    <Mail className="w-3.5 h-3.5" />
                    <span>penjaminan.polis@lps.go.id</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 2: PERTUMBUHAN NOMINAL MANFAAT POLIS */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Pertumbuhan Nominal Manfaat Polis" && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-5 animate-in fade-in duration-200">
              
              {/* Header & Dropdown Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAECF0] gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded bg-orange-50 text-[#EA580C] font-black text-xs">
                    LPS
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#172033]">
                      Ringkasan Pertumbuhan Nilai Manfaat Polis Asuransi
                    </h3>
                    <p className="text-[11px] text-[#667085] italic">
                      Guaranteed Insurance Benefits & Coverage Highlights
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-2.5 py-1 text-xs">
                    <span className="text-[#64748B] font-semibold text-[11px]">Tahun:</span>
                    <select
                      value={selectedTahun}
                      onChange={(e) => setSelectedTahun(e.target.value)}
                      className="bg-transparent font-bold text-[#172033] focus:outline-none cursor-pointer"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-2.5 py-1 text-xs">
                    <span className="text-[#64748B] font-semibold text-[11px]">Bulan:</span>
                    <select
                      value={selectedBulan}
                      onChange={(e) => setSelectedBulan(e.target.value)}
                      className="bg-transparent font-bold text-[#172033] focus:outline-none cursor-pointer"
                    >
                      <option value="7">7 (Juli)</option>
                      <option value="6">6 (Juni)</option>
                      <option value="12">12 (Desember)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-extrabold text-[#172033] text-[13px]">
                    Total Nilai Manfaat Polis Terproteksi (Rp Triliun)
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-[#D97706] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                      Nilai Pertanggungan / Manfaat (Rp T)
                    </span>
                    <span className="flex items-center gap-1 text-[#475569] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
                      Pertumbuhan MoM (%)
                    </span>
                  </div>
                </div>

                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA_NOMINAL_POLIS} margin={{ top: 15, right: 15, left: -5, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradPolisNominal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EAB308" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#FEF08A" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis
                        dataKey="periode"
                        tickFormatter={(v) => v.replace("-", "")}
                        tick={{ fill: "#64748B", fontSize: 9.5 }}
                        interval={2}
                      />
                      <YAxis
                        yAxisId="left"
                        domain={[0, 1800]}
                        tickFormatter={(v) => v.toLocaleString()}
                        tick={{ fill: "#64748B", fontSize: 10 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[-2, 3]}
                        tickFormatter={(v) => `${v}%`}
                        tick={{ fill: "#64748B", fontSize: 10 }}
                      />
                      <Tooltip
                        formatter={(val: any, name: any = "") => [
                          name === "Nominal" ? `Rp ${val.toLocaleString()} Triliun` : `${val}% MoM`,
                          name
                        ]}
                        labelFormatter={(lbl) => `Periode: ${lbl}`}
                        contentStyle={{ borderRadius: "12px", fontSize: "11px" }}
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="nominal"
                        name="Nominal"
                        stroke="#EAB308"
                        strokeWidth={2.5}
                        fill="url(#gradPolisNominal)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="mom"
                        name="MoM Growth"
                        stroke="#64748B"
                        strokeWidth={1.8}
                        dot={{ r: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Summary Tables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* YoY Summary */}
                <div className="overflow-hidden rounded-xl border border-[#EAECF0]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EA580C] text-white font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">Periode</th>
                        <th className="p-2.5 text-right">Nilai Manfaat (Rp T)</th>
                        <th className="p-2.5 text-right">Pertumbuhan YoY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0] font-medium text-[11px]">
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des22</td>
                        <td className="p-2.5 text-right font-mono">1,150.00</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+9.2%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des23</td>
                        <td className="p-2.5 text-right font-mono">1,225.00</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+6.5%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des24</td>
                        <td className="p-2.5 text-right font-mono">1,335.00</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+8.9%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB] bg-orange-50/50">
                        <td className="p-2.5 font-bold text-[#EA580C]">Des25</td>
                        <td className="p-2.5 text-right font-mono font-bold">1,455.00</td>
                        <td className="p-2.5 text-right font-bold text-[#EA580C]">+9.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* YtD Summary */}
                <div className="overflow-hidden rounded-xl border border-[#EAECF0]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EA580C] text-white font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">Periode</th>
                        <th className="p-2.5 text-right">Nilai Manfaat (Rp T)</th>
                        <th className="p-2.5 text-right">Pertumbuhan YtD</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0] font-medium text-[11px]">
                      <tr className="hover:bg-[#F9FAFB] bg-orange-50/40">
                        <td className="p-2.5 font-bold text-[#EA580C]">Jul26</td>
                        <td className="p-2.5 text-right font-mono font-bold">1,485.20</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+2.1%</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="p-3 text-[10.5px] text-[#64748B] bg-[#F8FAFC]">
                          Total nilai manfaat polis asuransi terproteksi mencapai <strong>Rp 1.485,20 Triliun</strong> per Juli 2026 menyongsong implementasi Program Penjaminan Polis.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 3: PERTUMBUHAN PEMEGANG POLIS */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Pertumbuhan Pemegang Polis" && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-5 animate-in fade-in duration-200">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAECF0] gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded bg-orange-50 text-[#EA580C] font-black text-xs">
                    LPS
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#172033]">
                      Ringkasan Pertumbuhan Pemegang Polis & Tertanggung
                    </h3>
                    <p className="text-[11px] text-[#667085] italic">
                      Policyholders & Insured Lives Growth Highlights
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-2.5 py-1 text-xs">
                    <span className="text-[#64748B] font-semibold text-[11px]">Tahun:</span>
                    <select
                      value={selectedTahun}
                      onChange={(e) => setSelectedTahun(e.target.value)}
                      className="bg-transparent font-bold text-[#172033] focus:outline-none cursor-pointer"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-2.5 py-1 text-xs">
                    <span className="text-[#64748B] font-semibold text-[11px]">Bulan:</span>
                    <select
                      value={selectedBulan}
                      onChange={(e) => setSelectedBulan(e.target.value)}
                      className="bg-transparent font-bold text-[#172033] focus:outline-none cursor-pointer"
                    >
                      <option value="7">7 (Juli)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-extrabold text-[#172033] text-[13px]">
                    Total Pemegang Polis / Tertanggung (Orang / Jiwa)
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-[#D97706] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                      Tertanggung (Insured Lives)
                    </span>
                    <span className="flex items-center gap-1 text-[#475569] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
                      Pertumbuhan MoM (%)
                    </span>
                  </div>
                </div>

                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA_PEMEGANG_POLIS} margin={{ top: 15, right: 15, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradTertanggung" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EAB308" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#FEF08A" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis
                        dataKey="periode"
                        tickFormatter={(v) => v.replace("-", "")}
                        tick={{ fill: "#64748B", fontSize: 9.5 }}
                        interval={2}
                      />
                      <YAxis
                        yAxisId="left"
                        domain={[0, 100000000]}
                        tickFormatter={(v) => `${(v / 1000000).toFixed(0)} Juta`}
                        tick={{ fill: "#64748B", fontSize: 10 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[-1, 3]}
                        tickFormatter={(v) => `${v}%`}
                        tick={{ fill: "#64748B", fontSize: 10 }}
                      />
                      <Tooltip
                        formatter={(val: any, name: any = "") => [
                          name === "Tertanggung" ? `${val.toLocaleString()} Tertanggung` : `${val}% MoM`,
                          name
                        ]}
                        labelFormatter={(lbl) => `Periode: ${lbl}`}
                        contentStyle={{ borderRadius: "12px", fontSize: "11px" }}
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="tertanggung"
                        name="Tertanggung"
                        stroke="#EAB308"
                        strokeWidth={2.5}
                        fill="url(#gradTertanggung)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="mom"
                        name="MoM Growth"
                        stroke="#64748B"
                        strokeWidth={1.8}
                        dot={{ r: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Summary Tables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="overflow-hidden rounded-xl border border-[#EAECF0]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EA580C] text-white font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">Periode</th>
                        <th className="p-2.5 text-right">Jumlah Tertanggung</th>
                        <th className="p-2.5 text-right">Pertumbuhan YoY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0] font-medium text-[11px]">
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des22</td>
                        <td className="p-2.5 text-right font-mono">71,200,000</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+8.5%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des23</td>
                        <td className="p-2.5 text-right font-mono">76,200,000</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+7.0%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des24</td>
                        <td className="p-2.5 text-right font-mono">81,200,000</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+6.6%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB] bg-orange-50/50">
                        <td className="p-2.5 font-bold text-[#EA580C]">Des25</td>
                        <td className="p-2.5 text-right font-mono font-bold">85,200,000</td>
                        <td className="p-2.5 text-right font-bold text-[#EA580C]">+4.9%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#EAECF0]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EA580C] text-white font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">Periode</th>
                        <th className="p-2.5 text-right">Jumlah Tertanggung</th>
                        <th className="p-2.5 text-right">Pertumbuhan YtD</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0] font-medium text-[11px]">
                      <tr className="hover:bg-[#F9FAFB] bg-orange-50/40">
                        <td className="p-2.5 font-bold text-[#EA580C]">Jul26</td>
                        <td className="p-2.5 text-right font-mono font-bold">86,540,210</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+1.57%</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="p-3 text-[10.5px] text-[#64748B] bg-[#F8FAFC]">
                          Total pemegang polis dan tertanggung terdaftar resmi mencapai <strong>86,54 Juta Jiwa</strong> per Juli 2026.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 4: DISTRIBUSI NOMINAL MANFAAT POLIS (TABEL MASTER) */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Distribusi Nominal Manfaat Polis" && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-4 animate-in fade-in duration-200">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAECF0] gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded bg-orange-50 text-[#EA580C] font-black text-xs">
                    LPS
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#172033]">
                      Ringkasan Distribusi Nilai Manfaat Polis Asuransi
                    </h3>
                    <p className="text-[11px] text-[#667085] italic">
                      Policy Benefits Distribution & Guarantee Highlights
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-2.5 py-1 text-xs">
                    <span className="text-[#64748B] font-semibold text-[11px]">Tahun:</span>
                    <select
                      value={selectedTahun}
                      onChange={(e) => setSelectedTahun(e.target.value)}
                      className="bg-transparent font-bold text-[#172033] focus:outline-none cursor-pointer"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-2.5 py-1 text-xs">
                    <span className="text-[#64748B] font-semibold text-[11px]">Bulan:</span>
                    <select
                      value={selectedBulan}
                      onChange={(e) => setSelectedBulan(e.target.value)}
                      className="bg-transparent font-bold text-[#172033] focus:outline-none cursor-pointer"
                    >
                      <option value="7">7 (Juli)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Master Structured Table */}
              <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  
                  {/* Master Header */}
                  <thead className="bg-[#EA580C] text-white">
                    <tr className="text-[11px]">
                      <th className="p-2.5 font-black uppercase" colSpan={3}>
                        1. Nilai Manfaat Polis (Rp Trillion)
                      </th>
                      <th className="p-2.5 text-center font-bold" colSpan={6}>
                        Pertumbuhan (Growth %)
                      </th>
                      <th className="p-2.5 text-right font-bold">
                        Periode: Jul 2026
                      </th>
                    </tr>
                    <tr className="bg-[#D95E15] text-[10px] uppercase font-bold text-orange-100 border-t border-orange-400">
                      <th className="p-2">Lini Usaha / Segmen</th>
                      <th className="p-2 text-right">Nominal (Rp T)</th>
                      <th className="p-2 text-right">%</th>
                      <th className="p-2 text-center">1 Bulan</th>
                      <th className="p-2 text-center">3 Bulan</th>
                      <th className="p-2 text-center">6 Bulan</th>
                      <th className="p-2 text-center">YTD</th>
                      <th className="p-2 text-center">1 Tahun</th>
                      <th className="p-2 text-center">2 Tahun</th>
                      <th className="p-2 text-right">English Term</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#EAECF0] text-[11px]">
                    
                    {/* GRAND TOTAL ROW */}
                    <tr className="bg-orange-50 font-black text-[#172033] border-b-2 border-orange-200">
                      <td className="p-2.5 text-[#EA580C]">Total Nilai Manfaat Terproteksi</td>
                      <td className="p-2.5 text-right font-mono text-xs">1,485.20</td>
                      <td className="p-2.5 text-right font-mono">100.0%</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+0.4% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+1.5% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+1.9% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+2.1% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+8.6% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+18.2% ↑</td>
                      <td className="p-2.5 text-right italic text-[#64748B]">Total Policy Benefits</td>
                    </tr>

                    {/* SECTIONS */}
                    {DATA_DISTRIBUSI_POLIS_SECTIONS.map((section, sIdx) => (
                      <React.Fragment key={sIdx}>
                        {/* Section Header */}
                        <tr className="bg-[#F8FAFC] font-extrabold text-[#1E293B] border-t-2 border-slate-200">
                          <td colSpan={10} className="p-2 text-[11.5px] uppercase tracking-wider text-[#EA580C]">
                            {section.kategori}
                          </td>
                        </tr>

                        {/* Section Items */}
                        {section.items.map((item, iIdx) => (
                          <tr key={iIdx} className="hover:bg-[#F9FAFB] transition-colors">
                            <td className="p-2 pl-4 font-semibold text-[#172033]">{item.nama}</td>
                            <td className="p-2 text-right font-mono font-bold">{item.nominal.toLocaleString("id-ID", { minimumFractionDigits: 2 })}</td>
                            <td className="p-2 text-right font-mono text-[#64748B]">{item.share}%</td>
                            <td className={cn("p-2 text-center font-mono font-semibold", item.m1 >= 0 ? "text-green-700" : "text-rose-600")}>
                              {item.m1 >= 0 ? `+${item.m1}% ↑` : `${item.m1}% ↓`}
                            </td>
                            <td className={cn("p-2 text-center font-mono font-semibold", item.m3 >= 0 ? "text-green-700" : "text-rose-600")}>
                              {item.m3 >= 0 ? `+${item.m3}% ↑` : `${item.m3}% ↓`}
                            </td>
                            <td className={cn("p-2 text-center font-mono font-semibold", item.m6 >= 0 ? "text-green-700" : "text-rose-600")}>
                              {item.m6 >= 0 ? `+${item.m6}% ↑` : `${item.m6}% ↓`}
                            </td>
                            <td className={cn("p-2 text-center font-mono font-semibold", item.ytd >= 0 ? "text-green-700" : "text-rose-600")}>
                              {item.ytd >= 0 ? `+${item.ytd}% ↑` : `${item.ytd}% ↓`}
                            </td>
                            <td className={cn("p-2 text-center font-mono font-semibold", item.y1 >= 0 ? "text-green-700" : "text-rose-600")}>
                              {item.y1 >= 0 ? `+${item.y1}% ↑` : `${item.y1}% ↓`}
                            </td>
                            <td className={cn("p-2 text-center font-mono font-semibold", item.y2 >= 0 ? "text-green-700" : "text-rose-600")}>
                              {item.y2 >= 0 ? `+${item.y2}% ↑` : `${item.y2}% ↓`}
                            </td>
                            <td className="p-2 text-right text-[10px] text-[#64748B] italic">
                              {item.tipeInggris || "-"}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}

                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TABS 5, 6, 7: TERTANGGUNG, PETA MUSIMAN & PORSI PENJAMINAN */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Distribusi Jumlah Tertanggung" && (
            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
                <h4 className="text-sm font-black text-[#172033]">
                  Distribusi Pemegang Polis Berdasarkan Tiering Pertanggungan
                </h4>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  98.2% Pemegang Polis Terproteksi Penuh
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200">
                  <span className="text-[10.5px] uppercase font-bold text-[#EA580C] block">
                    ≤ Rp 100 Juta
                  </span>
                  <p className="text-xl font-black text-[#172033] mt-0.5">75.8 Juta</p>
                  <span className="text-[11px] text-[#64748B]">87.6% dari total pemegang polis</span>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10.5px] uppercase font-bold text-[#0284C7] block">
                    Rp 100 Jt s/d Rp 500 Jt
                  </span>
                  <p className="text-xl font-black text-[#172033] mt-0.5">9.2 Juta</p>
                  <span className="text-[11px] text-[#64748B]">10.6% dari total pemegang polis</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10.5px] uppercase font-bold text-[#475569] block">
                    &gt; Rp 500 Juta (Batas Cap)
                  </span>
                  <p className="text-xl font-black text-[#172033] mt-0.5">1.54 Juta</p>
                  <span className="text-[11px] text-[#64748B]">1.8% dari total pemegang polis</span>
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                Mayoritas masyarakat pemegang polis asuransi memiliki nilai pertanggungan di bawah Rp 500 Juta. Skema batas penjaminan polis LPS dirancang untuk memberikan perlindungan menyeluruh (*safety net*) bagi konsumen ritel dan keluarga tertanggung.
              </p>
            </div>
          )}

          {(distribusiSubTab === "Peta Musiman Klaim" || distribusiSubTab === "Porsi Penjaminan Polis") && (
            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-[#EAECF0] pb-2">
                <h4 className="text-sm font-black text-[#172033]">
                  {distribusiSubTab === "Peta Musiman Klaim" ? "Pola Musiman Pembayaran Klaim Asuransi" : "Porsi Penjaminan Polis (Cakupan PPP)"}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <span className="text-xs font-bold text-green-800">Dijamin Penuh</span>
                  <p className="text-2xl font-black text-green-700 mt-1">53.0%</p>
                  <span className="text-[11px] text-green-700">Rp 787,16 Triliun</span>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-xs font-bold text-amber-800">Dijamin Sebagian</span>
                  <p className="text-2xl font-black text-amber-700 mt-1">30.0%</p>
                  <span className="text-[11px] text-amber-700">Rp 445,56 Triliun</span>
                </div>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="text-xs font-bold text-rose-800">Tidak Dijamin</span>
                  <p className="text-2xl font-black text-rose-700 mt-1">17.0%</p>
                  <span className="text-[11px] text-rose-700">Rp 252,48 Triliun</span>
                </div>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs text-[#475467]">
                <strong>Catatan Siklus Musiman Asuransi:</strong> Beban klaim kesehatan dan kendaraan bermotor cenderung meningkat pada kuartal kedua (musim mudik Lebaran) dan akhir tahun (musim hujan & liburan), sementara perpanjangan premi korporasi terkonsentrasi pada kuartal pertama (Januari–Februari).
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
