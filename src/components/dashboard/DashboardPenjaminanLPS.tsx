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
  ExternalLink
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

// --- MOCK DATA: SUKU BUNGA (2018 - 2026) ---
const DATA_SUKU_BUNGA = [
  { tahun: "2018-01", indonia: 5.4, biRate: 4.25, lending: 5.0, deposit: 3.5, lpsRate: 5.75, deposito1Bln: 5.9 },
  { tahun: "2018-07", indonia: 5.8, biRate: 5.25, lending: 6.0, deposit: 4.5, lpsRate: 6.25, deposito1Bln: 6.2 },
  { tahun: "2019-01", indonia: 5.9, biRate: 6.0, lending: 6.75, deposit: 5.25, lpsRate: 7.0, deposito1Bln: 6.6 },
  { tahun: "2019-07", indonia: 5.6, biRate: 5.75, lending: 6.5, deposit: 5.0, lpsRate: 6.75, deposito1Bln: 6.4 },
  { tahun: "2020-01", indonia: 4.7, biRate: 5.0, lending: 5.75, deposit: 4.25, lpsRate: 6.0, deposito1Bln: 5.8 },
  { tahun: "2020-07", indonia: 3.8, biRate: 4.0, lending: 4.75, deposit: 3.25, lpsRate: 5.25, deposito1Bln: 4.9 },
  { tahun: "2021-01", indonia: 3.2, biRate: 3.75, lending: 4.5, deposit: 3.0, lpsRate: 4.5, deposito1Bln: 4.1 },
  { tahun: "2021-07", indonia: 2.8, biRate: 3.5, lending: 4.25, deposit: 2.75, lpsRate: 4.0, deposito1Bln: 3.6 },
  { tahun: "2021-12", indonia: 2.8, biRate: 3.5, lending: 4.25, deposit: 2.75, lpsRate: 3.5, deposito1Bln: 3.3 },
  { tahun: "2022-06", indonia: 2.8, biRate: 3.5, lending: 4.25, deposit: 2.75, lpsRate: 3.5, deposito1Bln: 3.3 },
  { tahun: "2022-09", indonia: 3.8, biRate: 4.25, lending: 5.0, deposit: 3.5, lpsRate: 3.75, deposito1Bln: 3.6 },
  { tahun: "2022-12", indonia: 5.2, biRate: 5.5, lending: 6.25, deposit: 4.75, lpsRate: 4.0, deposito1Bln: 3.9 },
  { tahun: "2023-06", indonia: 5.7, biRate: 5.75, lending: 6.5, deposit: 5.0, lpsRate: 4.25, deposito1Bln: 4.1 },
  { tahun: "2023-12", indonia: 5.9, biRate: 6.0, lending: 6.75, deposit: 5.25, lpsRate: 4.25, deposito1Bln: 4.2 },
  { tahun: "2024-06", indonia: 6.2, biRate: 6.25, lending: 7.0, deposit: 5.5, lpsRate: 4.25, deposito1Bln: 4.3 },
  { tahun: "2024-12", indonia: 6.1, biRate: 6.0, lending: 6.75, deposit: 5.25, lpsRate: 4.25, deposito1Bln: 4.3 },
  { tahun: "2025-06", indonia: 5.8, biRate: 5.75, lending: 6.5, deposit: 5.0, lpsRate: 4.25, deposito1Bln: 4.2 },
  { tahun: "2025-12", indonia: 5.5, biRate: 5.5, lending: 6.25, deposit: 4.75, lpsRate: 4.25, deposito1Bln: 4.1 },
  { tahun: "2026-07", indonia: 6.05, biRate: 6.0, lending: 6.75, deposit: 5.25, lpsRate: 4.25, deposito1Bln: 4.35 },
];

// --- MOCK DATA: PERTUMBUHAN NOMINAL SIMPANAN (Rp Triliun & MoM %) ---
const DATA_NOMINAL_SIMPANAN = [
  { periode: "2022-07", nominal: 7628, mom: -0.63 },
  { periode: "2022-09", nominal: 7680, mom: 0.43 },
  { periode: "2022-11", nominal: 7980, mom: 2.72 },
  { periode: "2022-12", nominal: 8202, mom: 2.10 },
  { periode: "2023-01", nominal: 8045, mom: -2.40 },
  { periode: "2023-04", nominal: 8050, mom: 0.29 },
  { periode: "2023-07", nominal: 8160, mom: 0.23 },
  { periode: "2023-10", nominal: 8200, mom: 0.92 },
  { periode: "2023-12", nominal: 8515, mom: 2.50 },
  { periode: "2024-02", nominal: 8480, mom: -0.35 },
  { periode: "2024-05", nominal: 8702, mom: 0.41 },
  { periode: "2024-08", nominal: 8773, mom: 0.19 },
  { periode: "2024-10", nominal: 8690, mom: -0.52 },
  { periode: "2024-12", nominal: 8873, mom: 0.91 },
  { periode: "2025-03", nominal: 8900, mom: 0.50 },
  { periode: "2025-06", nominal: 9078, mom: 0.37 },
  { periode: "2025-08", nominal: 9109, mom: -0.45 },
  { periode: "2025-10", nominal: 9334, mom: 2.65 },
  { periode: "2025-11", nominal: 9677, mom: 1.00 },
  { periode: "2025-12", nominal: 10088, mom: 1.55 },
  { periode: "2026-02", nominal: 9942, mom: 0.15 },
  { periode: "2026-04", nominal: 10116, mom: 1.10 },
  { periode: "2026-05", nominal: 10250, mom: -1.40 },
  { periode: "2026-06", nominal: 10300, mom: 0.39 },
  { periode: "2026-07", nominal: 10349, mom: 2.20 },
];

// --- MOCK DATA: PERTUMBUHAN REKENING SIMPANAN (Jumlah Rekening & MoM %) ---
const DATA_REKENING_SIMPANAN = [
  { periode: "2022-07", rekening: 485000000, mom: 0.80 },
  { periode: "2022-09", rekening: 491463263, mom: 1.32 },
  { periode: "2022-11", rekening: 502000000, mom: 2.50 },
  { periode: "2022-12", rekening: 508546341, mom: 3.58 },
  { periode: "2023-01", rekening: 511205652, mom: -3.17 },
  { periode: "2023-04", rekening: 520000000, mom: 0.09 },
  { periode: "2023-06", rekening: 525524487, mom: 0.84 },
  { periode: "2023-09", rekening: 540000000, mom: 1.05 },
  { periode: "2023-12", rekening: 556606241, mom: 2.22 },
  { periode: "2024-03", rekening: 565000000, mom: 0.96 },
  { periode: "2024-06", rekening: 570674798, mom: 0.70 },
  { periode: "2024-09", rekening: 584181861, mom: 0.63 },
  { periode: "2024-12", rekening: 600203026, mom: 1.10 },
  { periode: "2025-03", rekening: 610000000, mom: 0.66 },
  { periode: "2025-06", rekening: 615409865, mom: 0.79 },
  { periode: "2025-09", rekening: 637146790, mom: 1.60 },
  { periode: "2025-11", rekening: 662457433, mom: 1.61 },
  { periode: "2025-12", rekening: 665435246, mom: 0.90 },
  { periode: "2026-02", rekening: 670000000, mom: -0.74 },
  { periode: "2026-04", rekening: 677529053, mom: 0.91 },
  { periode: "2026-06", rekening: 690000000, mom: -2.35 },
  { periode: "2026-07", rekening: 701482601, mom: 2.24 },
];

// --- MOCK DATA: DISTRIBUSI NOMINAL SIMPANAN (SCREENSHOT 5) ---
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

const DATA_DISTRIBUSI_SECTIONS: DistributionSection[] = [
  {
    kategori: "Jenis Simpanan",
    items: [
      { nama: "Deposit-On-Call", nominal: 55.19, share: 0.5, m1: -11.9, m3: 11.9, m6: -14.2, ytd: -14.2, y1: -11.6, y2: 3.5, tipeInggris: "Deposits On-Call" },
      { nama: "Deposito", nominal: 2784.42, share: 26.9, m1: 2.1, m3: 7.4, m6: 1.4, ytd: 1.4, y1: 14.8, y2: 26.4, tipeInggris: "Time Deposits" },
      { nama: "Giro", nominal: 2632.81, share: 25.4, m1: -0.6, m3: 0.1, m6: 1.2, ytd: 1.2, y1: 11.6, y2: 21.0, tipeInggris: "Demand Deposits" },
      { nama: "Sertifikat Deposito", nominal: 2.91, share: 0.0, m1: -13.2, m3: 0.1, m6: -14.6, ytd: -14.6, y1: 29.7, y2: 4.5, tipeInggris: "Certificate of Time Deposits" },
      { nama: "Tabungan", nominal: 4873.72, share: 47.1, m1: 0.4, m3: 1.0, m6: 1.1, ytd: 1.1, y1: 8.5, y2: 19.0, tipeInggris: "Saving Accounts" },
    ]
  },
  {
    kategori: "Kepemilikan Simpanan",
    items: [
      { nama: "Simpanan Pihak Ketiga", nominal: 10270.99, share: 99.2, m1: 0.4, m3: 2.5, m6: 2.4, ytd: 2.4, y1: 11.0, y2: 22.8, tipeInggris: "Third-Party Funds" },
      { nama: "Simpanan Dari Bank Lain", nominal: 78.07, share: 0.8, m1: 1.6, m3: -1.1, m6: -7.6, ytd: -7.6, y1: 1.5, y2: 11.2, tipeInggris: "Funds from Other Banks" },
    ]
  },
  {
    kategori: "Prinsip Usaha",
    items: [
      { nama: "Konvensional", nominal: 9511.00, share: 91.9, m1: 0.4, m3: 2.4, m6: 2.1, ytd: 2.1, y1: 10.8, y2: 21.4, tipeInggris: "Conventional" },
      { nama: "Syariah (Termasuk UUS)", nominal: 838.06, share: 8.1, m1: 0.7, m3: 2.2, m6: 4.4, ytd: 4.4, y1: 12.4, y2: 19.8, tipeInggris: "Sharia" },
    ]
  },
  {
    kategori: "Tiering Nominal",
    items: [
      { nama: "≤ Rp 100 Juta", nominal: 1158.15, share: 11.2, m1: 0.5, m3: 1.1, m6: 1.2, ytd: 1.2, y1: 4.7, y2: 15.0, tipeInggris: "N ≤ 100 million" },
      { nama: "> Rp 100 Jt s/d Rp 200 Jt", nominal: 430.25, share: 4.2, m1: 0.5, m3: 1.2, m6: 1.7, ytd: 1.7, y1: 4.4, y2: 13.2, tipeInggris: "100 million < N ≤ 200 million" },
      { nama: "> Rp 200 Jt s/d Rp 500 Jt", nominal: 715.78, share: 6.9, m1: 0.6, m3: 1.4, m6: 2.1, ytd: 2.1, y1: 6.2, y2: 14.8, tipeInggris: "200 million < N ≤ 500 million" },
      { nama: "> Rp 500 Jt s/d Rp 1 M", nominal: 645.72, share: 6.2, m1: 0.4, m3: 1.6, m6: 2.4, ytd: 2.4, y1: 7.2, y2: 16.6, tipeInggris: "500 million < N ≤ 1 billion" },
      { nama: "> Rp 1 M s/d Rp 2 M", nominal: 557.29, share: 5.4, m1: 0.4, m3: 1.4, m6: 1.8, ytd: 1.8, y1: 7.8, y2: 17.6, tipeInggris: "1 billion < N ≤ 2 billion" },
      { nama: "> Rp 2 M s/d Rp 5 M", nominal: 850.12, share: 8.2, m1: 0.4, m3: 2.5, m6: 2.5, ytd: 2.5, y1: 9.8, y2: 21.0, tipeInggris: "2 billion < N ≤ 5 billion" },
      { nama: "> Rp 5 Miliar", nominal: 5991.75, share: 57.9, m1: 0.4, m3: 3.5, m6: 3.2, ytd: 3.2, y1: 17.2, y2: 41.8, tipeInggris: "N > 5 billion" },
    ]
  },
  {
    kategori: "Kepemilikan Bank",
    items: [
      { nama: "Asing", nominal: 280.83, share: 2.7, m1: -4.5, m3: -7.5, m6: -3.4, ytd: -3.4, y1: 5.1, y2: 7.9, tipeInggris: "Foreign Banks" },
      { nama: "Campuran", nominal: 291.68, share: 2.8, m1: -0.4, m3: 0.8, m6: 2.8, ytd: 2.8, y1: 16.1, y2: 23.6, tipeInggris: "Mixed / Joint Banks" },
      { nama: "Pemerintah Daerah (BPD)", nominal: 570.68, share: 5.5, m1: -1.1, m3: -4.4, m6: -4.4, ytd: -4.4, y1: 5.0, y2: 18.7, tipeInggris: "Regional Govt Banks" },
      { nama: "Persero (BUMN)", nominal: 4451.98, share: 43.0, m1: 1.2, m3: 4.8, m6: 2.2, ytd: 2.2, y1: 14.1, y2: 40.0, tipeInggris: "State-Owned Enterprises" },
      { nama: "Swasta Nasional", nominal: 3837.27, share: 37.1, m1: 0.4, m3: -0.1, m6: 0.1, ytd: 0.1, y1: 9.8, y2: 20.2, tipeInggris: "Private National Banks" },
    ]
  },
  {
    kategori: "Mata Uang",
    items: [
      { nama: "Rupiah (IDR)", nominal: 8621.13, share: 83.3, m1: 0.6, m3: 1.4, m6: -0.2, ytd: -0.2, y1: 9.3, y2: 24.4, tipeInggris: "Rupiah (IDR)" },
      { nama: "Valuta Asing (Valas)", nominal: 1727.93, share: 16.7, m1: -0.8, m3: 6.0, m6: 15.1, ytd: 15.1, y1: 20.0, y2: 18.7, tipeInggris: "Foreign Currencies" },
    ]
  },
  {
    kategori: "KBMI",
    items: [
      { nama: "KBMI 1", nominal: 658.56, share: 6.4, m1: -0.5, m3: -4.4, m6: -4.3, ytd: -4.3, y1: 1.3, y2: 15.4, tipeInggris: "KBMI 1" },
      { nama: "KBMI 2", nominal: 1161.76, share: 11.2, m1: -2.0, m3: -2.2, m6: -2.2, ytd: -2.2, y1: 10.5, y2: 14.2, tipeInggris: "KBMI 2" },
      { nama: "KBMI 3", nominal: 2687.58, share: 26.0, m1: 0.8, m3: 2.1, m6: 1.2, ytd: 1.2, y1: 7.2, y2: 21.4, tipeInggris: "KBMI 3" },
      { nama: "KBMI 4", nominal: 5841.16, share: 56.4, m1: 0.8, m3: 4.8, m6: 5.5, ytd: 5.5, y1: 15.0, y2: 15.0, tipeInggris: "KBMI 4" },
    ]
  },
  {
    kategori: "Cakupan Penjaminan LPS",
    items: [
      { nama: "Dijamin Penuh (≤ Rp 2 M)", nominal: 2875.07, share: 27.8, m1: 0.2, m3: 0.9, m6: 1.4, ytd: 1.4, y1: 3.3, y2: 12.7, tipeInggris: "Fully Insured (≤ Rp 2B)" },
      { nama: "Dijamin Sebagian (Maks Rp 2 M)", nominal: 3506.60, share: 33.9, m1: 0.4, m3: 2.1, m6: 2.0, ytd: 2.0, y1: 7.5, y2: 17.5, tipeInggris: "Partially Insured (max Rp 2B)" },
      { nama: "Tidak Dijamin (> Rp 2 M / Bunga Tinggi)", nominal: 3967.39, share: 38.3, m1: 0.4, m3: 3.9, m6: 3.6, ytd: 3.6, y1: 17.1, y2: 41.4, tipeInggris: "Not Insured" },
    ]
  }
];

export default function DashboardPenjaminanLPS() {
  // Main Module View: "Suku Bunga" or "Distribusi Simpanan"
  const [mainTab, setMainTab] = useState<"Suku Bunga" | "Distribusi Simpanan">("Distribusi Simpanan");

  // Sub-tabs under Distribusi Simpanan
  const [distribusiSubTab, setDistribusiSubTab] = useState<
    | "Informasi Umum"
    | "Pertumbuhan Nominal Simpanan"
    | "Pertumbuhan Rekening Simpanan"
    | "Distribusi Nominal Simpanan"
    | "Distribusi Rekening Simpanan"
    | "Peta Musiman"
    | "Porsi Simpanan"
  >("Pertumbuhan Nominal Simpanan");

  // Filters for Suku Bunga lines
  const [selectedLines, setSelectedLines] = useState<Record<string, boolean>>({
    indonia: true,
    biRate: true,
    lending: true,
    deposit: true,
    lpsRate: true,
    deposito1Bln: true,
  });

  const toggleLine = (key: string) => {
    setSelectedLines(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter year/month for Distribusi Simpanan
  const [selectedTahun, setSelectedTahun] = useState("2026");
  const [selectedBulan, setSelectedBulan] = useState("7");

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300 w-full text-[#172033]">
      
      {/* ========================================================================= */}
      {/* TOP PRIMARY BLUE HEADER BAR (MATCHING EXACT SCREENSHOT BANNER) */}
      {/* ========================================================================= */}
      <div className="bg-[#0284C7] text-white p-3.5 sm:p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10.5px] uppercase tracking-wider font-semibold text-blue-100 block">
              Lembaga Penjamin Simpanan
            </span>
            <h2 className="text-base sm:text-lg font-black tracking-tight leading-tight">
              {mainTab === "Suku Bunga" ? "Suku Bunga" : "Distribusi Simpanan"}
            </h2>
          </div>
        </div>

        {/* Switcher: Suku Bunga vs Distribusi Simpanan */}
        <div className="flex items-center bg-black/15 p-1 rounded-xl self-start sm:self-auto border border-white/15">
          <button
            type="button"
            onClick={() => setMainTab("Suku Bunga")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
              mainTab === "Suku Bunga" ? "bg-white text-[#0284C7] shadow-xs" : "text-white/85 hover:text-white"
            )}
          >
            Suku Bunga
          </button>
          <button
            type="button"
            onClick={() => setMainTab("Distribusi Simpanan")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
              mainTab === "Distribusi Simpanan" ? "bg-white text-[#0284C7] shadow-xs" : "text-white/85 hover:text-white"
            )}
          >
            Distribusi Simpanan
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: SUKU BUNGA (SCREENSHOT 1) */}
      {/* ========================================================================= */}
      {mainTab === "Suku Bunga" && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-5 animate-in fade-in duration-200">
          
          {/* Top LPS Brand + Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAECF0] gap-3">
            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-[#EA580C] font-black text-xs tracking-wider">
                LPS
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-[#172033]">
                  Perkembangan Suku Bunga
                </h3>
                <p className="text-[11px] text-[#667085]">
                  Pasar Uang, Kebijakan Moneter BI & Tingkat Bunga Penjaminan LPS
                </p>
              </div>
            </div>

            {/* Sub-tab tag at bottom */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
              <Percent className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Perkembangan Suku Bunga Pasar Uang</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left Column: Periode & Suku Bunga Filter Checkboxes */}
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
                    value="1/3/2017"
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
                  <span className="text-xs font-extrabold text-[#172033]">Suku Bunga</span>
                  <span className="text-[10.5px] font-semibold text-[#0284C7] cursor-pointer hover:underline">
                    Pilih Semua
                  </span>
                </div>

                {/* Group 1: Pasar Uang */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-[#475569] text-[11px] block">
                    Suku Bunga Pasar Uang
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.indonia}
                      onChange={() => toggleLine("indonia")}
                      className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">INDONIA (Overnight)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] ml-auto" />
                  </label>
                  <label className="flex items-center gap-2 text-[#94A3B8] cursor-not-allowed">
                    <input type="checkbox" disabled className="rounded text-slate-300" />
                    <span>INDONIA (30 hari)</span>
                  </label>
                  <label className="flex items-center gap-2 text-[#94A3B8] cursor-not-allowed">
                    <input type="checkbox" disabled className="rounded text-slate-300" />
                    <span>INDONIA (90 hari)</span>
                  </label>
                  <label className="flex items-center gap-2 text-[#94A3B8] cursor-not-allowed">
                    <input type="checkbox" disabled className="rounded text-slate-300" />
                    <span>JIBOR (Overnight - Histori)</span>
                  </label>
                </div>

                {/* Group 2: Kebijakan Moneter */}
                <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                  <span className="font-bold text-[#475569] text-[11px] block">
                    Suku Bunga Kebijakan Moneter
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
                      checked={selectedLines.lending}
                      onChange={() => toggleLine("lending")}
                      className="rounded text-[#F97316] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">Lending Facility</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] ml-auto" />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.deposit}
                      onChange={() => toggleLine("deposit")}
                      className="rounded text-[#9333EA] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">Deposit Facility</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9333EA] ml-auto" />
                  </label>
                </div>

                {/* Group 3: Penjaminan & Deposito */}
                <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                  <span className="font-bold text-[#475569] text-[11px] block">
                    Suku Bunga Penjaminan & Deposito
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.lpsRate}
                      onChange={() => toggleLine("lpsRate")}
                      className="rounded text-[#16A34A] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-bold text-green-700">LPS Rate (Tingkat Bunga)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] ml-auto" />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#0284C7]">
                    <input
                      type="checkbox"
                      checked={selectedLines.deposito1Bln}
                      onChange={() => toggleLine("deposito1Bln")}
                      className="rounded text-[#EC4899] focus:ring-0 cursor-pointer"
                    />
                    <span className="font-medium">Deposito (1 Bln - Avg)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] ml-auto" />
                  </label>
                  <label className="flex items-center gap-2 text-[#94A3B8] cursor-not-allowed">
                    <input type="checkbox" disabled className="rounded text-slate-300" />
                    <span>Deposito (3 Bln - Avg)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-line Chart + Keterangan Box */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
              
              {/* Chart */}
              <div className="h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DATA_SUKU_BUNGA} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="tahun"
                      tickFormatter={(val) => val.split("-")[0]}
                      tick={{ fill: "#64748B", fontSize: 10, fontWeight: 600 }}
                      axisLine={{ stroke: "#CBD5E1" }}
                    />
                    <YAxis
                      domain={[2, 7.5]}
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

                    {selectedLines.indonia && (
                      <Line
                        type="monotone"
                        dataKey="indonia"
                        name="INDONIA (Overnight)"
                        stroke="#2563EB"
                        strokeWidth={2}
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
                    {selectedLines.lending && (
                      <Line
                        type="stepAfter"
                        dataKey="lending"
                        name="Lending Facility"
                        stroke="#F97316"
                        strokeWidth={1.8}
                        dot={false}
                      />
                    )}
                    {selectedLines.deposit && (
                      <Line
                        type="stepAfter"
                        dataKey="deposit"
                        name="Deposit Facility"
                        stroke="#9333EA"
                        strokeWidth={1.8}
                        dot={false}
                      />
                    )}
                    {selectedLines.lpsRate && (
                      <Line
                        type="stepAfter"
                        dataKey="lpsRate"
                        name="LPS Rate"
                        stroke="#16A34A"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    )}
                    {selectedLines.deposito1Bln && (
                      <Line
                        type="monotone"
                        dataKey="deposito1Bln"
                        name="Deposito (1 Bln - Avg)"
                        stroke="#EC4899"
                        strokeWidth={1.8}
                        strokeDasharray="4 2"
                        dot={false}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bottom Official Keterangan & Catatan Kaki (Matching Screenshot 1) */}
              <div className="bg-[#F8FAFC] rounded-xl p-3 sm:p-4 border border-[#E2E8F0] text-[10px] text-[#475569] space-y-1.5 leading-relaxed">
                <span className="font-extrabold text-[#172033] block text-[11px] mb-1">
                  Keterangan & Catatan Metodologi:
                </span>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Data Suku Bunga Deposito tersedia sejak Januari 2020.</li>
                  <li>Suku Bunga JIBOR (overnight) digantikan suku bunga INDONIA pada Januari 2019.</li>
                  <li>Bank Indonesia (BI) resmi menghentikan publikasi JIBOR mulai 1 Januari 2026 (sesuai siaran pers BI No.27/310/Dkom).</li>
                  <li>Data lainnya tersedia sejak Januari 2017.</li>
                  <li>Suku bunga mengecualikan data hari Sabtu, Minggu, dan hari libur nasional.</li>
                  <li>Suku bunga deposito (avg) dihitung dari rata-rata suku bunga tertinggi dan suku bunga terendah yang ditransaksikan bank pelapor kepada nasabah untuk deposito berjangka dengan jangka waktu tertentu.</li>
                  <li>
                    <strong>Sumber data:</strong> BI Rate & INDONIA (Bank Indonesia), Tingkat Bunga Penjaminan (Lembaga Penjamin Simpanan), Suku Bunga Deposito (Laporan harian bank umum).
                  </li>
                </ol>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: DISTRIBUSI SIMPANAN (SCREENSHOTS 2, 3, 4, 5) */}
      {/* ========================================================================= */}
      {mainTab === "Distribusi Simpanan" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* HORIZONTAL SUB-TABS NAVIGATION (MATCHING BOTTOM BAR IN USER SCREENSHOTS) */}
          <div className="bg-white p-1.5 rounded-2xl shadow-2xs border border-[#EAECF0] flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
            {[
              { id: "Informasi Umum", label: "Informasi Umum" },
              { id: "Pertumbuhan Nominal Simpanan", label: "Pertumbuhan Nominal Simpanan" },
              { id: "Pertumbuhan Rekening Simpanan", label: "Pertumbuhan Rekening Simpanan" },
              { id: "Distribusi Nominal Simpanan", label: "Distribusi Nominal Simpanan" },
              { id: "Distribusi Rekening Simpanan", label: "Distribusi Rekening Simpanan" },
              { id: "Peta Musiman", label: "Peta Musiman" },
              { id: "Porsi Simpanan", label: "Porsi Simpanan" },
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
          {/* SUB-TAB 1: INFORMASI UMUM (SCREENSHOT 2) */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Informasi Umum" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              
              {/* Left Card: INFORMASI UMUM (Bahasa Indonesia) */}
              <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div className="border-b border-[#EAECF0] pb-2 flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#172033]">
                      INFORMASI UMUM
                    </h4>
                    <span className="text-[10.5px] font-bold text-[#EA580C] bg-orange-50 px-2 py-0.5 rounded">
                      ID
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#172033] mb-1">Sumber Data</h5>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Data bersumber dari Laporan Bank Umum Terintegrasi (LBUT) yang disampaikan oleh bank umum kepada Bank Indonesia / Otoritas Jasa Keuangan / LPS.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#172033] mb-1">Definisi</h5>
                    <ol className="text-xs text-[#475569] space-y-2 leading-relaxed list-decimal pl-4">
                      <li>Simpanan meliputi dana pihak ketiga dan simpanan dari bank lain.</li>
                      <li>
                        Simpanan Yang Dijamin meliputi:
                        <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[#334155]">
                          <li>Seluruh simpanan dengan nominal sampai dengan Rp2 miliar.</li>
                          <li>Dijamin sebagian (s/d Rp2 miliar) atas simpanan dengan nominal di atas Rp2 miliar.</li>
                        </ul>
                      </li>
                      <li>
                        Besaran Nilai Simpanan yang Dijamin adalah <strong>Rp2 miliar per nasabah per bank</strong>, sebagaimana diatur dalam Peraturan Pemerintah No. 66 Tahun 2008.
                      </li>
                      <li>
                        Simpanan yang disajikan tidak termasuk simpanan di kantor cabang dari bank yang berkedudukan di Indonesia yang melakukan kegiatan perbankan di luar negeri.
                      </li>
                      <li>
                        Rekening yang disajikan termasuk rekening nasabah yang memiliki saldo sama dengan 0 (nol).
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Masukan & Saran */}
                <div className="pt-3 border-t border-[#EAECF0] text-center">
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">
                    Masukan dan Saran
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-[#EA580C] text-xs font-semibold">
                    <Mail className="w-3.5 h-3.5" />
                    <span>informasi@lps.go.id</span>
                  </div>
                </div>
              </div>

              {/* Right Card: GENERAL INFORMATION (English) */}
              <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div className="border-b border-[#EAECF0] pb-2 flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#172033]">
                      GENERAL INFORMATION
                    </h4>
                    <span className="text-[10.5px] font-bold text-[#0284C7] bg-blue-50 px-2 py-0.5 rounded">
                      EN
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#172033] mb-1">Source of Data</h5>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      The data are based on The Laporan Bank Umum Terintegrasi (LBUT) which submitted by commercial banks to Bank Indonesia / OJK / IDIC.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-[#172033] mb-1">Definition</h5>
                    <ol className="text-xs text-[#475569] space-y-2 leading-relaxed list-decimal pl-4">
                      <li>The deposits comprise of third-party funds and funds from other banks.</li>
                      <li>
                        Insured deposits consist of:
                        <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[#334155]">
                          <li>Fully insured deposits with nominal under Rp2 billion.</li>
                          <li>Partially insured deposits (max. Rp2 billion) for nominal above Rp2 billion.</li>
                        </ul>
                      </li>
                      <li>
                        The maximum amount of deposit insured is <strong>Rp2 billion per depositor per bank</strong> as stipulated by Government Regulation No. 66 Year 2008.
                      </li>
                      <li>
                        The deposits presented do not include deposits of branch office of bank domiciled in Indonesia and conducting banking activities outside the territory of the Republic of Indonesia.
                      </li>
                      <li>
                        The accounts presented consist of customer accounts with 0 (zero) balance.
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Feedback & Suggestion */}
                <div className="pt-3 border-t border-[#EAECF0] text-center">
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">
                    Feedback and Suggestion
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#0284C7] text-xs font-semibold">
                    <Mail className="w-3.5 h-3.5" />
                    <span>informasi@lps.go.id</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 2: PERTUMBUHAN NOMINAL SIMPANAN (SCREENSHOT 3) */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Pertumbuhan Nominal Simpanan" && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-5 animate-in fade-in duration-200">
              
              {/* Header: LPS Brand & Highlights Title + Dropdown Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAECF0] gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded bg-orange-50 text-[#EA580C] font-black text-xs">
                    LPS
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#172033]">
                      Ringkasan Pertumbuhan Nominal Simpanan
                    </h3>
                    <p className="text-[11px] text-[#667085] italic">
                      Nominal Deposits Growth Highlights
                    </p>
                  </div>
                </div>

                {/* Filters: Tahun & Bulan */}
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

              {/* Chart: Total Nominal Simpanan + MoM Growth */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-extrabold text-[#172033] text-[13px]">
                    Total Nominal Simpanan (Deposits)
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-[#D97706] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                      Nominal Deposits (Rp Trillion)
                    </span>
                    <span className="flex items-center gap-1 text-[#475569] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
                      Pertumbuhan Nominal (Growth) MoM
                    </span>
                  </div>
                </div>

                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA_NOMINAL_SIMPANAN} margin={{ top: 15, right: 15, left: -5, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradNominal" x1="0" y1="0" x2="0" y2="1">
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
                        domain={[0, 11000]}
                        tickFormatter={(v) => v.toLocaleString()}
                        tick={{ fill: "#64748B", fontSize: 10 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[-4, 4]}
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
                        fill="url(#gradNominal)"
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

              {/* Bottom Summary Tables (YoY & YtD Growth Highlights) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* YoY Summary */}
                <div className="overflow-hidden rounded-xl border border-[#EAECF0]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EA580C] text-white font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">Periode</th>
                        <th className="p-2.5 text-right">Nominal (Rp Trillion)</th>
                        <th className="p-2.5 text-right">Pertumbuhan Growth (YoY)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0] font-medium text-[11px]">
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des22</td>
                        <td className="p-2.5 text-right font-mono">8,202.92</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+8.7%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des23</td>
                        <td className="p-2.5 text-right font-mono">8,515.00</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+3.8%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des24</td>
                        <td className="p-2.5 text-right font-mono">8,873.15</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+4.2%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB] bg-orange-50/50">
                        <td className="p-2.5 font-bold text-[#EA580C]">Des25</td>
                        <td className="p-2.5 text-right font-mono font-bold">10,088.01</td>
                        <td className="p-2.5 text-right font-bold text-[#EA580C]">+13.7%</td>
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
                        <th className="p-2.5 text-right">Nominal (Rp Trillion)</th>
                        <th className="p-2.5 text-right">Pertumbuhan Growth (Ytd)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0] font-medium text-[11px]">
                      <tr className="hover:bg-[#F9FAFB] bg-orange-50/40">
                        <td className="p-2.5 font-bold text-[#EA580C]">Jul26</td>
                        <td className="p-2.5 text-right font-mono font-bold">10,349.06</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+10.9%</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="p-3 text-[10.5px] text-[#64748B] bg-[#F8FAFC]">
                          Simpanan perbankan nasional menembus rekor tertinggi <strong>Rp 10.349,06 Triliun</strong> pada Juli 2026.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 3: PERTUMBUHAN REKENING SIMPANAN (SCREENSHOT 4) */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Pertumbuhan Rekening Simpanan" && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-5 animate-in fade-in duration-200">
              
              {/* Header: LPS Brand & Highlights Title + Dropdown Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAECF0] gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded bg-orange-50 text-[#EA580C] font-black text-xs">
                    LPS
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#172033]">
                      Ringkasan Pertumbuhan Rekening Simpanan
                    </h3>
                    <p className="text-[11px] text-[#667085] italic">
                      Deposits Accounts Growth Highlights
                    </p>
                  </div>
                </div>

                {/* Filters: Tahun & Bulan */}
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

              {/* Chart: Total Rekening + MoM Growth */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-extrabold text-[#172033] text-[13px]">
                    Total Rekening (Number of Accounts)
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 text-[#D97706] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                      Rekening (Accounts)
                    </span>
                    <span className="flex items-center gap-1 text-[#475569] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
                      Pertumbuhan Rekening (Growth) MoM
                    </span>
                  </div>
                </div>

                <div className="h-72 sm:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA_REKENING_SIMPANAN} margin={{ top: 15, right: 15, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradRekening" x1="0" y1="0" x2="0" y2="1">
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
                        domain={[0, 800000000]}
                        tickFormatter={(v) => `${(v / 1000000).toFixed(0)} Juta`}
                        tick={{ fill: "#64748B", fontSize: 10 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[-4, 4]}
                        tickFormatter={(v) => `${v}%`}
                        tick={{ fill: "#64748B", fontSize: 10 }}
                      />
                      <Tooltip
                        formatter={(val: any, name: any = "") => [
                          name === "Rekening" ? `${val.toLocaleString()} Rekening` : `${val}% MoM`,
                          name
                        ]}
                        labelFormatter={(lbl) => `Periode: ${lbl}`}
                        contentStyle={{ borderRadius: "12px", fontSize: "11px" }}
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="rekening"
                        name="Rekening"
                        stroke="#EAB308"
                        strokeWidth={2.5}
                        fill="url(#gradRekening)"
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

              {/* Bottom Summary Tables (YoY & YtD Growth Highlights) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* YoY Summary */}
                <div className="overflow-hidden rounded-xl border border-[#EAECF0]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#EA580C] text-white font-bold text-[11px]">
                      <tr>
                        <th className="p-2.5">Periode</th>
                        <th className="p-2.5 text-right">Rekening Accounts</th>
                        <th className="p-2.5 text-right">Pertumbuhan Growth (YoY)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0] font-medium text-[11px]">
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des22</td>
                        <td className="p-2.5 text-right font-mono">508,546,341</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+31.64%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des23</td>
                        <td className="p-2.5 text-right font-mono">559,914,590</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+10.10%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB]">
                        <td className="p-2.5 font-bold">Des24</td>
                        <td className="p-2.5 text-right font-mono">609,218,193</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+8.81%</td>
                      </tr>
                      <tr className="hover:bg-[#F9FAFB] bg-orange-50/50">
                        <td className="p-2.5 font-bold text-[#EA580C]">Des25</td>
                        <td className="p-2.5 text-right font-mono font-bold">665,435,246</td>
                        <td className="p-2.5 text-right font-bold text-[#EA580C]">+9.23%</td>
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
                        <th className="p-2.5 text-right">Rekening Account</th>
                        <th className="p-2.5 text-right">Pertumbuhan Growth (Ytd)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAECF0] font-medium text-[11px]">
                      <tr className="hover:bg-[#F9FAFB] bg-orange-50/40">
                        <td className="p-2.5 font-bold text-[#EA580C]">Jul26</td>
                        <td className="p-2.5 text-right font-mono font-bold">701,482,601</td>
                        <td className="p-2.5 text-right font-bold text-green-600">+8.90%</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="p-3 text-[10.5px] text-[#64748B] bg-[#F8FAFC]">
                          Total rekening simpanan terdaftar resmi melampaui <strong>701 Juta Rekening</strong> per Juli 2026.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 4: DISTRIBUSI NOMINAL SIMPANAN (SCREENSHOT 5) */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Distribusi Nominal Simpanan" && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-4 animate-in fade-in duration-200">
              
              {/* Header: LPS Brand & Highlights Title + Dropdown Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EAECF0] gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded bg-orange-50 text-[#EA580C] font-black text-xs">
                    LPS
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#172033]">
                      Ringkasan Distribusi Nominal Simpanan
                    </h3>
                    <p className="text-[11px] text-[#667085] italic">
                      Nominal Deposits Distribution Highlights
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

              {/* Master Structured Table (Matching Screenshot 5) */}
              <div className="overflow-x-auto rounded-xl border border-[#EAECF0]">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  
                  {/* Master Header 1. Nominal (Rp Trillion) */}
                  <thead className="bg-[#EA580C] text-white">
                    <tr className="text-[11px]">
                      <th className="p-2.5 font-black uppercase" colSpan={3}>
                        1. Nominal (Rp Trillion)
                      </th>
                      <th className="p-2.5 text-center font-bold" colSpan={6}>
                        Pertumbuhan (Growth %)
                      </th>
                      <th className="p-2.5 text-right font-bold">
                        Periode: Jul 2026
                      </th>
                    </tr>
                    <tr className="bg-[#D95E15] text-[10px] uppercase font-bold text-orange-100 border-t border-orange-400">
                      <th className="p-2">Kategori / Segmen</th>
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
                      <td className="p-2.5 text-[#EA580C]">Total Nominal Simpanan</td>
                      <td className="p-2.5 text-right font-mono text-xs">10,349.06</td>
                      <td className="p-2.5 text-right font-mono">100.0%</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+0.4% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+2.4% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+2.6% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+2.6% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+10.9% ↑</td>
                      <td className="p-2.5 text-center text-green-700 font-bold">+21.2% ↑</td>
                      <td className="p-2.5 text-right italic text-[#64748B]">Total Deposits</td>
                    </tr>

                    {/* SECTIONS */}
                    {DATA_DISTRIBUSI_SECTIONS.map((section, sIdx) => (
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
          {/* SUB-TABS 5, 6, 7: REKENING, PETA MUSIMAN & PORSI SIMPANAN */}
          {/* ========================================================================= */}
          {distribusiSubTab === "Distribusi Rekening Simpanan" && (
            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
                <h4 className="text-sm font-black text-[#172033]">
                  Distribusi Jumlah Rekening Berdasarkan Tiering
                </h4>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  99.9% Rekening Dijamin Penuh
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200">
                  <span className="text-[10.5px] uppercase font-bold text-[#EA580C] block">
                    ≤ Rp 100 Juta
                  </span>
                  <p className="text-xl font-black text-[#172033] mt-0.5">694.5 Juta</p>
                  <span className="text-[11px] text-[#64748B]">98.9% dari total rekening</span>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10.5px] uppercase font-bold text-[#0284C7] block">
                    Rp 100 Jt s/d Rp 2 M
                  </span>
                  <p className="text-xl font-black text-[#172033] mt-0.5">6.6 Juta</p>
                  <span className="text-[11px] text-[#64748B]">0.9% dari total rekening</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10.5px] uppercase font-bold text-[#475569] block">
                    &gt; Rp 2 Miliar
                  </span>
                  <p className="text-xl font-black text-[#172033] mt-0.5">382 Ribu</p>
                  <span className="text-[11px] text-[#64748B]">0.1% dari total rekening</span>
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                Mayoritas nasabah perbankan Indonesia berada pada tiering nominal simpanan di bawah Rp 100 Juta, sehingga seluruh simpanannya terlindungi 100% oleh skema penjaminan simpanan LPS (maksimal Rp 2 Miliar per nasabah per bank).
              </p>
            </div>
          )}

          {(distribusiSubTab === "Peta Musiman" || distribusiSubTab === "Porsi Simpanan") && (
            <div className="bg-white rounded-2xl p-5 shadow-2xs border border-[#EAECF0] space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-[#EAECF0] pb-2">
                <h4 className="text-sm font-black text-[#172033]">
                  {distribusiSubTab === "Peta Musiman" ? "Pola Musiman Simpanan Perbankan" : "Porsi Penjaminan Simpanan (Cakupan Penjaminan)"}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <span className="text-xs font-bold text-green-800">Dijamin Penuh</span>
                  <p className="text-2xl font-black text-green-700 mt-1">27.8%</p>
                  <span className="text-[11px] text-green-700">Rp 2.875,07 Triliun</span>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-xs font-bold text-amber-800">Dijamin Sebagian</span>
                  <p className="text-2xl font-black text-amber-700 mt-1">33.9%</p>
                  <span className="text-[11px] text-amber-700">Rp 3.506,60 Triliun</span>
                </div>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="text-xs font-bold text-rose-800">Tidak Dijamin</span>
                  <p className="text-2xl font-black text-rose-700 mt-1">38.3%</p>
                  <span className="text-[11px] text-rose-700">Rp 3.967,39 Triliun</span>
                </div>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs text-[#475569]">
                <strong>Catatan Likuiditas Musiman:</strong> Pola penarikan simpanan perbankan rutin mengalami lonjakan musiman menjelang Hari Raya Idul Fitri (Ramadan/THR) dan periode tutup buku akhir tahun (Desember).
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
