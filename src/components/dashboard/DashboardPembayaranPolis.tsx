"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Building2,
  Coins,
  CheckCircle2,
  ArrowUpDown,
  Download,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  HeartPulse
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
  LabelList
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA: PEMBAYARAN KLAIM & MANFAAT POLIS ASURANSI ---

// 1. Horizontal Bar: Jumlah Perusahaan Asuransi dalam Proses Pembayaran per Provinsi
const DATA_PROVINSI_PENCAIRAN_ASURANSI = [
  { provinsi: "DKI Jakarta", jumlah: 14, color: "#52BD68" },
  { provinsi: "Jawa Barat", jumlah: 10, color: "#3B4D80" },
  { provinsi: "Jawa Timur", jumlah: 8, color: "#F3C942" },
  { provinsi: "Sumatera Utara", jumlah: 6, color: "#D9453C" },
  { provinsi: "Jawa Tengah", jumlah: 5, color: "#56A7F2" },
  { provinsi: "Bali", jumlah: 4, color: "#9467BD" },
  { provinsi: "Sulawesi Selatan", jumlah: 3, color: "#ED7D31" },
  { provinsi: "Sumatera Barat", jumlah: 3, color: "#80CBC4" },
  { provinsi: "Banten", jumlah: 2, color: "#66BB6A" },
  { provinsi: "D.I. Yogyakarta", jumlah: 2, color: "#5C6BC0" },
  { provinsi: "Kalimantan Timur", jumlah: 1, color: "#FFCA28" },
  { provinsi: "Riau", jumlah: 1, color: "#C62828" },
];

// 2. Vertical Bar: Jumlah PA CIU per Mitra / Bank Pembayar
const DATA_MITRA_PEMBAYAR = [
  { bank: "Mandiri", jumlah: 16, color: "#3B4D80" },
  { bank: "BRI", jumlah: 14, color: "#52BD68" },
  { bank: "BNI", jumlah: 11, color: "#F3C942" },
  { bank: "BCA", jumlah: 9, color: "#56A7F2" },
  { bank: "BSI", jumlah: 6, color: "#D9453C" },
];

// 3. Donut: Tipe Pembayaran Klaim & Manfaat
const DATA_TIPE_PEMBAYARAN_KLAIM = [
  { name: "Transfer Rekening", value: 168450, pct: "84.50%", color: "#2ECC71" },
  { name: "Rekening Penampungan", value: 20430, pct: "10.25%", color: "#2980B9" },
  { name: "Bilyet Giro / Tunai", value: 10465, pct: "5.25%", color: "#C0392B" },
];

// 4. Donut: Kategori Polis Terbayar
const DATA_KATEGORI_POLIS = [
  { name: "Individu / Ritel", value: 156700, pct: "78.60%", color: "#2ECC71" },
  { name: "Korporasi / Group", value: 37680, pct: "18.90%", color: "#2980B9" },
  { name: "Bancassurance", value: 4980, pct: "2.50%", color: "#F39C12" },
];

// 5. Table: Summary Pembayaran Manfaat Polis (18 Rows)
export interface SummaryPembayaranPolisRow {
  noKepesertaan: string;
  provinsi: string;
  entitasAsuransi: string;
  liniUsaha: "Jiwa" | "Umum";
  nominal: number; // in Ribu Rupiah
  nominalStr: string;
  jumlahPolis: number;
  jumlahTertanggung: number;
  tahunCiu: string;
  mitraPembayar: string;
  status: string;
}

const DATA_SUMMARY_POLIS_TABLE: SummaryPembayaranPolisRow[] = [
  { noKepesertaan: "AS-30800049", provinsi: "DKI Jakarta", entitasAsuransi: "PT Asuransi Jiwa Nusantara BDL", liniUsaha: "Jiwa", nominal: 185420000.50, nominalStr: "185,420,000.50", jumlahPolis: 12450, jumlahTertanggung: 12450, tahunCiu: "2025", mitraPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-33500001", provinsi: "Jawa Barat", entitasAsuransi: "PT Asuransi Umum Sentosa BDL", liniUsaha: "Umum", nominal: 94250100.80, nominalStr: "94,250,100.80", jumlahPolis: 6840, jumlahTertanggung: 5920, tahunCiu: "2024", mitraPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-32500045", provinsi: "Jawa Timur", entitasAsuransi: "PT Asuransi Jiwa Mahkota Sejahtera BDL", liniUsaha: "Jiwa", nominal: 215680450.20, nominalStr: "215,680,450.20", jumlahPolis: 18920, jumlahTertanggung: 18920, tahunCiu: "2025", mitraPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-32200073", provinsi: "DKI Jakarta", entitasAsuransi: "PT Asuransi Kerugian Danamas BDL", liniUsaha: "Umum", nominal: 78420300.10, nominalStr: "78,420,300.10", jumlahPolis: 4210, jumlahTertanggung: 3850, tahunCiu: "2024", mitraPembayar: "BNI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-31600007", provinsi: "Sumatera Utara", entitasAsuransi: "PT Asuransi Jiwa Prima Artha BDL", liniUsaha: "Jiwa", nominal: 142850900.00, nominalStr: "142,850,900.00", jumlahPolis: 11200, jumlahTertanggung: 11200, tahunCiu: "2025", mitraPembayar: "BCA", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-31900028", provinsi: "Jawa Tengah", entitasAsuransi: "PT Asuransi Jiwa Bina Proteksi BDL", liniUsaha: "Jiwa", nominal: 112450200.40, nominalStr: "112,450,200.40", jumlahPolis: 8940, jumlahTertanggung: 8940, tahunCiu: "2024", mitraPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-31600023", provinsi: "Jawa Barat", entitasAsuransi: "PT Asuransi Umum Wana Bhakti BDL", liniUsaha: "Umum", nominal: 68920400.60, nominalStr: "68,920,400.60", jumlahPolis: 3560, jumlahTertanggung: 3120, tahunCiu: "2024", mitraPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-30200001", provinsi: "DKI Jakarta", entitasAsuransi: "PT Asuransi Syariah Amanah Insani BDL", liniUsaha: "Jiwa", nominal: 89540800.75, nominalStr: "89,540,800.75", jumlahPolis: 7420, jumlahTertanggung: 7420, tahunCiu: "2025", mitraPembayar: "BSI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-34100001", provinsi: "Bali", entitasAsuransi: "PT Asuransi Umum Tirta Segara BDL", liniUsaha: "Umum", nominal: 45620150.30, nominalStr: "45,620,150.30", jumlahPolis: 2840, jumlahTertanggung: 2410, tahunCiu: "2024", mitraPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-31300018", provinsi: "Sulawesi Selatan", entitasAsuransi: "PT Asuransi Jiwa Celebes Mandiri BDL", liniUsaha: "Jiwa", nominal: 64210350.25, nominalStr: "64,210,350.25", jumlahPolis: 5120, jumlahTertanggung: 5120, tahunCiu: "2024", mitraPembayar: "BNI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-32500006", provinsi: "Jawa Timur", entitasAsuransi: "PT Asuransi Umum Brawijaya BDL", liniUsaha: "Umum", nominal: 58940600.00, nominalStr: "58,940,600.00", jumlahPolis: 3190, jumlahTertanggung: 2870, tahunCiu: "2024", mitraPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-33600015", provinsi: "Sumatera Barat", entitasAsuransi: "PT Asuransi Jiwa Minang Lestari BDL", liniUsaha: "Jiwa", nominal: 52140800.80, nominalStr: "52,140,800.80", jumlahPolis: 4180, jumlahTertanggung: 4180, tahunCiu: "2025", mitraPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-31900074", provinsi: "Jawa Tengah", entitasAsuransi: "PT Asuransi Kendaraan Merbabu BDL", liniUsaha: "Umum", nominal: 48920100.90, nominalStr: "48,920,100.90", jumlahPolis: 2940, jumlahTertanggung: 2650, tahunCiu: "2024", mitraPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-32300022", provinsi: "DKI Jakarta", entitasAsuransi: "PT Asuransi Jiwa Kencana Abadi BDL", liniUsaha: "Jiwa", nominal: 175640200.40, nominalStr: "175,640,200.40", jumlahPolis: 14820, jumlahTertanggung: 14820, tahunCiu: "2025", mitraPembayar: "BCA", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-30500001", provinsi: "Banten", entitasAsuransi: "PT Asuransi Properti Krakatau BDL", liniUsaha: "Umum", nominal: 42150300.20, nominalStr: "42,150,300.20", jumlahPolis: 2150, jumlahTertanggung: 1980, tahunCiu: "2024", mitraPembayar: "BNI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-31400018", provinsi: "D.I. Yogyakarta", entitasAsuransi: "PT Asuransi Jiwa Mataram Sejati BDL", liniUsaha: "Jiwa", nominal: 38920150.50, nominalStr: "38,920,150.50", jumlahPolis: 3120, jumlahTertanggung: 3120, tahunCiu: "2024", mitraPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-31400020", provinsi: "Kalimantan Timur", entitasAsuransi: "PT Asuransi Tambang Mahakam BDL", liniUsaha: "Umum", nominal: 35420600.00, nominalStr: "35,420,600.00", jumlahPolis: 1840, jumlahTertanggung: 1650, tahunCiu: "2024", mitraPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "AS-31900057", provinsi: "Riau", entitasAsuransi: "PT Asuransi Syariah Lancang Kuning BDL", liniUsaha: "Jiwa", nominal: 28450100.80, nominalStr: "28,450,100.80", jumlahPolis: 2420, jumlahTertanggung: 2420, tahunCiu: "2024", mitraPembayar: "BSI", status: "Sudah Dicairkan" },
];

// Reusable Semi-Circle Gauge Component matching screenshot exactly
const SemiCircleGauge = ({ pct, color }: { pct: number; color: string }) => {
  const radius = 34;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative flex-shrink-0">
      <svg width="88" height="50" viewBox="0 0 88 50">
        <path
          d="M 10 44 A 34 34 0 0 1 78 44"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 10 44 A 34 34 0 0 1 78 44"
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xs sm:text-sm font-black text-[#172033] mt-[-8px] tracking-tight">
        {pct.toFixed(2)}%
      </span>
    </div>
  );
};

export default function DashboardPembayaranPolis() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProvinsi, setFilterProvinsi] = useState("all");
  const [filterMitra, setFilterMitra] = useState("all");
  const [filterLini, setFilterLini] = useState("all");

  const filteredData = useMemo(() => {
    return DATA_SUMMARY_POLIS_TABLE.filter((row) => {
      const matchSearch =
        searchTerm === "" ||
        row.entitasAsuransi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.noKepesertaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.provinsi.toLowerCase().includes(searchTerm.toLowerCase());

      const matchProv = filterProvinsi === "all" || row.provinsi === filterProvinsi;
      const matchMitra = filterMitra === "all" || row.mitraPembayar === filterMitra;
      const matchLini = filterLini === "all" || row.liniUsaha === filterLini;

      return matchSearch && matchProv && matchMitra && matchLini;
    });
  }, [searchTerm, filterProvinsi, filterMitra, filterLini]);

  // Grand totals of filtered data
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, curr) => {
        acc.nominal += curr.nominal;
        acc.jumlahPolis += curr.jumlahPolis;
        acc.jumlahTertanggung += curr.jumlahTertanggung;
        return acc;
      },
      { nominal: 0, jumlahPolis: 0, jumlahTertanggung: 0 }
    );
  }, [filteredData]);

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300 w-full text-[#172033]">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & FILTER BAR CONTROLS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2F4F7] pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#667085] mb-0.5">
              <span>Penjaminan Asuransi</span>
              <span>/</span>
              <span className="text-[#172033] font-semibold">Pembayaran Polis</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#172033] tracking-tight">
              Dashboard Pembayaran Manfaat Polis & Klaim Asuransi
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#0084FF] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full self-start sm:self-auto">
            Mandat UU P2SK • Pembayaran Manfaat & Nilai Tunai
          </span>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-5 relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Cari entitas asuransi, kode kepesertaan, atau provinsi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium text-[#172033] focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

          {/* Filter Provinsi */}
          <div className="sm:col-span-3 relative">
            <select
              value={filterProvinsi}
              onChange={(e) => setFilterProvinsi(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
            >
              <option value="all">Semua Provinsi</option>
              {Array.from(new Set(DATA_SUMMARY_POLIS_TABLE.map((d) => d.provinsi))).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
          </div>

          {/* Filter Mitra Pembayar */}
          <div className="sm:col-span-2 relative">
            <select
              value={filterMitra}
              onChange={(e) => setFilterMitra(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
            >
              <option value="all">Semua Mitra</option>
              <option value="Mandiri">Mandiri</option>
              <option value="BRI">BRI</option>
              <option value="BNI">BNI</option>
              <option value="BCA">BCA</option>
              <option value="BSI">BSI</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
          </div>

          {/* Filter Lini Usaha */}
          <div className="sm:col-span-2 relative">
            <select
              value={filterLini}
              onChange={(e) => setFilterLini(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
            >
              <option value="all">Semua Lini</option>
              <option value="Jiwa">Asuransi Jiwa</option>
              <option value="Umum">Asuransi Umum</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP CHARTS ROW (MATCHING BANK PEMBAYARAN EXACT LAYOUT) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-12 gap-4">
        
        {/* Chart 1: Horizontal Bar - PA per Provinsi */}
        <div className="col-span-12 md:col-span-7 xl:col-span-4 bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <h4 className="text-xs sm:text-[13px] font-bold text-[#172033] mb-2 leading-snug">
            Jumlah Entitas PA dalam Proses Pencairan per Provinsi
          </h4>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={DATA_PROVINSI_PENCAIRAN_ASURANSI}
                margin={{ top: 5, right: 25, left: 45, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F2F4F7" />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#667085" }} domain={[0, 16]} />
                <YAxis
                  type="category"
                  dataKey="provinsi"
                  tick={{ fontSize: 9.5, fill: "#344054", fontWeight: 500 }}
                  width={85}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} Entitas`, "Jumlah PA"]}
                  contentStyle={{ borderRadius: "8px", fontSize: "11px" }}
                />
                <Bar dataKey="jumlah" radius={[0, 4, 4, 0]}>
                  {DATA_PROVINSI_PENCAIRAN_ASURANSI.map((entry, idx) => (
                    <Cell key={`cell-prov-${idx}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="jumlah" position="right" fontSize={9.5} fill="#475467" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Vertical Bar - PA CIU per Mitra Pembayar */}
        <div className="col-span-12 md:col-span-5 xl:col-span-3 bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <h4 className="text-xs sm:text-[13px] font-bold text-[#172033] mb-2 leading-snug">
            Jumlah PA CIU per Mitra Pembayar
          </h4>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA_MITRA_PEMBAYAR} margin={{ top: 15, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
                <XAxis dataKey="bank" tick={{ fontSize: 11, fill: "#344054", fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 10, fill: "#667085" }} domain={[0, 20]} />
                <Tooltip
                  formatter={(val: any) => [`${val} PA`, "Jumlah"]}
                  contentStyle={{ borderRadius: "8px", fontSize: "11px" }}
                />
                <Bar dataKey="jumlah" radius={[4, 4, 0, 0]}>
                  {DATA_MITRA_PEMBAYAR.map((entry, idx) => (
                    <Cell key={`cell-bank-${idx}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="jumlah" position="top" fontSize={10} fill="#475467" fontWeight="bold" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3 & 4: Two Donut Charts */}
        <div className="col-span-12 md:col-span-12 xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Donut: Tipe Pembayaran Klaim */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
            <h4 className="text-xs sm:text-[12.5px] font-bold text-[#172033] text-center mb-1">
              Tipe Pembayaran Manfaat
            </h4>
            <div className="h-44 sm:h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DATA_TIPE_PEMBAYARAN_KLAIM}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {DATA_TIPE_PEMBAYARAN_KLAIM.map((entry, idx) => (
                      <Cell key={`cell-pencairan-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any = "") => [
                      `${val.toLocaleString()} Transaksi`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 text-[11px] pt-1 border-t border-[#F2F4F7]">
              {DATA_TIPE_PEMBAYARAN_KLAIM.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#475467] truncate">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#172033] whitespace-nowrap text-right shrink-0">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut: Kategori Polis Terbayar */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
            <h4 className="text-xs sm:text-[12.5px] font-bold text-[#172033] text-center mb-1">
              Kategori Polis Terbayar
            </h4>
            <div className="h-44 sm:h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DATA_KATEGORI_POLIS}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {DATA_KATEGORI_POLIS.map((entry, idx) => (
                      <Cell key={`cell-rekening-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any = "") => [
                      `${val.toLocaleString()} Polis`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 text-[11px] pt-1 border-t border-[#F2F4F7]">
              {DATA_KATEGORI_POLIS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#475467] truncate">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#172033] whitespace-nowrap text-right shrink-0">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM SECTION: 3 GAUGES + SUMMARY TABLE (MATCHING BANK EXACT LAYOUT) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        
        {/* Left: 3 Semi-Circle Gauges */}
        <div className="col-span-12 md:col-span-5 xl:col-span-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3">
          
          {/* Gauge 1 */}
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-[#0F766E] tracking-wider block">
                Tingkat Kelayakan Klaim
              </span>
              <h5 className="text-xs font-bold text-[#172033] leading-snug">
                % Nilai Klaim Layak Bayar vs Pengajuan
              </h5>
              <span className="text-[10.5px] text-[#667085] block">
                Verifikasi Data Polis & 3T LPS
              </span>
            </div>
            <SemiCircleGauge pct={96.40} color="#0F766E" />
          </div>

          {/* Gauge 2 */}
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-[#EA580C] tracking-wider block">
                Realisasi Pencairan
              </span>
              <h5 className="text-xs font-bold text-[#172033] leading-snug">
                % Nilai Manfaat Polis Sudah Dicairkan
              </h5>
              <span className="text-[10.5px] text-[#667085] block">
                Dana Tersalurkan ke Rekening Pemegang Polis
              </span>
            </div>
            <SemiCircleGauge pct={88.50} color="#EA580C" />
          </div>

          {/* Gauge 3 */}
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-[#2563EB] tracking-wider block">
                Penyelesaian Konsumen
              </span>
              <h5 className="text-xs font-bold text-[#172033] leading-snug">
                % Pemegang Polis Terbayar Penuh
              </h5>
              <span className="text-[10.5px] text-[#667085] block">
                Tertanggung Selesai Diberikan Haknya
              </span>
            </div>
            <SemiCircleGauge pct={92.10} color="#2563EB" />
          </div>

        </div>

        {/* Right: Summary Pembayaran Manfaat Polis Table */}
        <div className="col-span-12 md:col-span-7 xl:col-span-8 bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-black text-[#172033] flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-[#EA580C]" />
                Summary Pembayaran Manfaat Polis Asuransi CIU
              </h3>
              <p className="text-[11px] text-[#667085]">
                Daftar entitas perusahaan asuransi cabut izin usaha dan realisasi pembayaran klaim
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#667085] self-start sm:self-auto">
              {filteredData.length} dari {DATA_SUMMARY_POLIS_TABLE.length} Entitas
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-[#EAECF0] max-h-[380px] overflow-y-auto scrollbar-thin">
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead className="sticky top-0 bg-[#F9FAFB] text-[10.5px] font-bold text-[#475467] border-b border-[#EAECF0]">
                <tr>
                  <th className="p-2.5">No. Kepesertaan</th>
                  <th className="p-2.5">Provinsi</th>
                  <th className="p-2.5">Entitas Asuransi CIU</th>
                  <th className="p-2.5">Lini</th>
                  <th className="p-2.5 text-right">Nominal Klaim (Ribu Rp)</th>
                  <th className="p-2.5 text-right">Jumlah Polis</th>
                  <th className="p-2.5 text-right">Tertanggung</th>
                  <th className="p-2.5 text-center">Tahun CIU</th>
                  <th className="p-2.5">Mitra</th>
                  <th className="p-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0] text-[11px]">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-2 font-mono font-bold text-[#475467]">{row.noKepesertaan}</td>
                    <td className="p-2 text-[#344054]">{row.provinsi}</td>
                    <td className="p-2 font-bold text-[#172033]">{row.entitasAsuransi}</td>
                    <td className="p-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[9.5px] font-bold",
                        row.liniUsaha === "Jiwa" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                      )}>
                        {row.liniUsaha}
                      </span>
                    </td>
                    <td className="p-2 text-right font-mono font-bold text-[#172033]">{row.nominalStr}</td>
                    <td className="p-2 text-right font-mono text-[#344054]">{row.jumlahPolis.toLocaleString()}</td>
                    <td className="p-2 text-right font-mono text-[#344054]">{row.jumlahTertanggung.toLocaleString()}</td>
                    <td className="p-2 text-center text-[#667085]">{row.tahunCiu}</td>
                    <td className="p-2 font-bold text-[#0F766E]">{row.mitraPembayar}</td>
                    <td className="p-2 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] whitespace-nowrap">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* TOTAL FOOTER ROW */}
              <tfoot className="sticky bottom-0 bg-[#F8FAFC] border-t-2 border-[#D0D5DD] font-bold text-[11px] text-[#172033]">
                <tr>
                  <td colSpan={4} className="p-2.5 font-black uppercase text-[#EA580C]">
                    Total
                  </td>
                  <td className="p-2.5 text-right font-mono font-black text-[#EA580C]">
                    {totals.nominal.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-2.5 text-right font-mono font-black">
                    {totals.jumlahPolis.toLocaleString()}
                  </td>
                  <td className="p-2.5 text-right font-mono font-black">
                    {totals.jumlahTertanggung.toLocaleString()}
                  </td>
                  <td colSpan={3} className="p-2.5 text-right text-[10px] text-[#667085] font-normal italic">
                    Total Rekapitulasi Realisasi
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
