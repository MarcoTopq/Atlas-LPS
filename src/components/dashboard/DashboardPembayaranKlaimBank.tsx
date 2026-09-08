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
  FileSpreadsheet
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

// --- MOCK DATA MATCHING USER SCREENSHOT ---

// 1. Horizontal Bar: Jumlah Bank dalam Proses Pencairan per Provinsi
const DATA_PROVINSI_PENCAIRAN = [
  { provinsi: "Jawa Timur", jumlah: 12, color: "#52BD68" },
  { provinsi: "Sumatera Barat", jumlah: 9, color: "#3B4D80" },
  { provinsi: "Jawa Barat", jumlah: 7, color: "#F3C942" },
  { provinsi: "Jawa Tengah", jumlah: 5, color: "#D9453C" },
  { provinsi: "Aceh", jumlah: 4, color: "#56A7F2" },
  { provinsi: "Bali", jumlah: 4, color: "#9467BD" },
  { provinsi: "Sumatera Utara", jumlah: 3, color: "#ED7D31" },
  { provinsi: "Banten", jumlah: 1, color: "#80CBC4" },
  { provinsi: "DKI Jakarta", jumlah: 1, color: "#66BB6A" },
  { provinsi: "Kalimantan Barat", jumlah: 1, color: "#5C6BC0" },
  { provinsi: "Papua Barat", jumlah: 1, color: "#FFCA28" },
  { provinsi: "Sulawesi Selatan", jumlah: 1, color: "#C62828" },
];

// 2. Vertical Bar: Jumlah Bank CIU per Bank Pembayar
const DATA_BANK_PEMBAYAR = [
  { bank: "BRI", jumlah: 17, color: "#52BD68" },
  { bank: "Mandiri", jumlah: 13, color: "#3B4D80" },
  { bank: "BNI", jumlah: 11, color: "#F3C942" },
  { bank: "BSI", jumlah: 8, color: "#D9453C" },
];

// 3. Donut: Tipe Pencairan
const DATA_TIPE_PENCAIRAN = [
  { name: "Cash", value: 186003, pct: "80.78%", color: "#C0392B" },
  { name: "Transfer", value: 29135, pct: "12.65%", color: "#2ECC71" },
  { name: "Lainnya", value: 15125, pct: "6.57%", color: "#2980B9" },
];

// 4. Donut: Tipe Rekening
const DATA_TIPE_REKENING = [
  { name: "Single", value: 210222, pct: "91.63%", color: "#2ECC71" },
  { name: "Multiple", value: 18677, pct: "8.14%", color: "#2980B9" },
  { name: "Joint", value: 530, pct: "0.23%", color: "#F39C12" },
];

// 5. Table: Summary Pembayaran Bank CIU (Exact 18 Rows)
export interface SummaryPembayaranRow {
  noKepesertaan: string;
  provinsi: string;
  bankCiu: string;
  nominal: number; // in Ribu Rupiah
  nominalStr: string;
  jumlahRekening: number;
  jumlahNasabah: number;
  tahunCiu: string;
  bankPembayar: string;
  status: string;
}

const DATA_SUMMARY_TABLE: SummaryPembayaranRow[] = [
  { noKepesertaan: "30800049", provinsi: "Sumatera Barat", bankCiu: "BPR LPN Tapan", nominal: 108918.33, nominalStr: "108,918.33", jumlahRekening: 3, jumlahNasabah: 3, tahunCiu: "2024", bankPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "33500001", provinsi: "Sulawesi Selatan", bankCiu: "Koperasi BPR Abang Pasar", nominal: 290544.09, nominalStr: "290,544.09", jumlahRekening: 271, jumlahNasabah: 271, tahunCiu: "2024", bankPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "32500045", provinsi: "Jawa Timur", bankCiu: "Koperasi BPR Tawang Alun", nominal: 1657471.35, nominalStr: "1,657,471.35", jumlahRekening: 802, jumlahNasabah: 802, tahunCiu: "2024", bankPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "32200073", provinsi: "Jawa Timur", bankCiu: "Koperasi BPR Wijayakusuma", nominal: 2051658.36, nominalStr: "2,051,658.36", jumlahRekening: 516, jumlahNasabah: 516, tahunCiu: "2024", bankPembayar: "BNI", status: "Sudah Dicairkan" },
  { noKepesertaan: "31600007", provinsi: "Jawa Barat", bankCiu: "Perumda BPR Bank Cirebon", nominal: 148936274.51, nominalStr: "148,936,274.51", jumlahRekening: 17718, jumlahNasabah: 17718, tahunCiu: "2025", bankPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "31900028", provinsi: "Jawa Tengah", bankCiu: "Perumda BPR Bank Purworejo", nominal: 108419493.80, nominalStr: "108,419,493.80", jumlahRekening: 16922, jumlahNasabah: 16922, tahunCiu: "2025", bankPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "31600023", provinsi: "Jawa Barat", bankCiu: "Perumda BPR Karya Remaja Indramayu", nominal: 312035721.98, nominalStr: "312,035,721.98", jumlahRekening: 26009, jumlahNasabah: 26009, tahunCiu: "2025", bankPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "30200001", provinsi: "Aceh", bankCiu: "PT BPR Aceh Utara", nominal: 527372.74, nominalStr: "527,372.74", jumlahRekening: 2599, jumlahNasabah: 2599, tahunCiu: "2024", bankPembayar: "BSI", status: "Sudah Dicairkan" },
  { noKepesertaan: "34100001", provinsi: "Papua Barat", bankCiu: "PT BPR Arfak Indonesia", nominal: 219458200.74, nominalStr: "219,458,200.74", jumlahRekening: 31398, jumlahNasabah: 31398, tahunCiu: "2025", bankPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "31300018", provinsi: "Jawa Barat", bankCiu: "PT BPR Artaprima Danajasa", nominal: 2530150.38, nominalStr: "2,530,150.38", jumlahRekening: 114, jumlahNasabah: 114, tahunCiu: "2024", bankPembayar: "BNI", status: "Sudah Dicairkan" },
  { noKepesertaan: "32500006", provinsi: "Jawa Timur", bankCiu: "PT BPR Bagong Inti Marga", nominal: 13640889.75, nominalStr: "13,640,889.75", jumlahRekening: 2907, jumlahNasabah: 2907, tahunCiu: "2024", bankPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "33600015", provinsi: "Bali", bankCiu: "PT BPR Bali Artha Anugrah", nominal: 76023418.61, nominalStr: "76,023,418.61", jumlahRekening: 877, jumlahNasabah: 877, tahunCiu: "2024", bankPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "31900074", provinsi: "Jawa Tengah", bankCiu: "PT BPR Bank Jepara Artha (PERSERODA)", nominal: 268136602.92, nominalStr: "268,136,602.92", jumlahRekening: 39549, jumlahNasabah: 39549, tahunCiu: "2025", bankPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "32300022", provinsi: "Jawa Timur", bankCiu: "PT BPR Bank Pasar Bhakti", nominal: 28335584.71, nominalStr: "28,335,584.71", jumlahRekening: 1508, jumlahNasabah: 1508, tahunCiu: "2024", bankPembayar: "BNI", status: "Sudah Dicairkan" },
  { noKepesertaan: "30500001", provinsi: "Sumatera Utara", bankCiu: "PT BPR Bina Barumun", nominal: 3651212.28, nominalStr: "3,651,212.28", jumlahRekening: 534, jumlahNasabah: 534, tahunCiu: "2024", bankPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "31400018", provinsi: "Jawa Barat", bankCiu: "PT BPR Brata Nusantara", nominal: 9328210.08, nominalStr: "9,328,210.08", jumlahRekening: 1235, jumlahNasabah: 1235, tahunCiu: "2024", bankPembayar: "Mandiri", status: "Sudah Dicairkan" },
  { noKepesertaan: "31400020", provinsi: "Jawa Barat", bankCiu: "PT BPR Bumi Pendawa Raharja", nominal: 23579665.08, nominalStr: "23,579,665.08", jumlahRekening: 1952, jumlahNasabah: 1952, tahunCiu: "2024", bankPembayar: "BRI", status: "Sudah Dicairkan" },
  { noKepesertaan: "31900057", provinsi: "Jawa Tengah", bankCiu: "PT BPR Dananta", nominal: 9431554.68, nominalStr: "9,431,554.68", jumlahRekening: 1546, jumlahNasabah: 1546, tahunCiu: "2024", bankPembayar: "BSI", status: "Sudah Dicairkan" },
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

export default function DashboardPembayaranKlaimBank() {
  const [filterProvinsi, setFilterProvinsi] = useState("All");
  const [filterTahun, setFilterTahun] = useState("All");
  const [filterBankCiu, setFilterBankCiu] = useState("All");
  const [filterBankPembayar, setFilterBankPembayar] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [tableSearch, setTableSearch] = useState("");

  // Filtered rows
  const filteredData = useMemo(() => {
    return DATA_SUMMARY_TABLE.filter((row) => {
      const matchProv = filterProvinsi === "All" || row.provinsi === filterProvinsi;
      const matchTahun = filterTahun === "All" || row.tahunCiu === filterTahun;
      const matchBankCiu = filterBankCiu === "All" || row.bankCiu.toLowerCase().includes(filterBankCiu.toLowerCase());
      const matchPembayar = filterBankPembayar === "All" || row.bankPembayar === filterBankPembayar;
      const matchStatus = filterStatus === "All" || row.status === filterStatus;
      const matchSearch =
        tableSearch === "" ||
        row.bankCiu.toLowerCase().includes(tableSearch.toLowerCase()) ||
        row.provinsi.toLowerCase().includes(tableSearch.toLowerCase()) ||
        row.noKepesertaan.includes(tableSearch);
      return matchProv && matchTahun && matchBankCiu && matchPembayar && matchStatus && matchSearch;
    });
  }, [filterProvinsi, filterTahun, filterBankCiu, filterBankPembayar, filterStatus, tableSearch]);

  // Aggregate totals
  const totalNominal = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.nominal, 0);
  }, [filteredData]);

  const totalRekening = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.jumlahRekening, 0);
  }, [filteredData]);

  const totalNasabah = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.jumlahNasabah, 0);
  }, [filteredData]);

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300 w-full text-[#172033]">
      
      {/* ================= HEADER & FILTER BAR ================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F4F7] pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#667085] mb-0.5">
              <span>Penjaminan Bank</span>
              <span>/</span>
              <span className="text-[#172033] font-semibold">Pembayaran & Klaim</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight">
              Dashboard Pembayaran
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F56621] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Coins size={13} />
              Realisasi Klaim Penjaminan Simpanan
            </span>
          </div>
        </div>

        {/* 5 Filter Selects - Aligned for iPad (md:grid-cols-5) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 pt-1">
          {/* Provinsi */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Provinsi</label>
            <div className="relative">
              <select
                value={filterProvinsi}
                onChange={(e) => setFilterProvinsi(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-2.5 py-1.5 sm:py-2 text-xs font-medium text-[#172033] focus:outline-none focus:border-[#F56621] appearance-none pr-7 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="Sumatera Barat">Sumatera Barat</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Aceh">Aceh</option>
                <option value="Bali">Bali</option>
                <option value="Sumatera Utara">Sumatera Utara</option>
                <option value="Banten">Banten</option>
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Kalimantan Barat">Kalimantan Barat</option>
                <option value="Papua Barat">Papua Barat</option>
                <option value="Sulawesi Selatan">Sulawesi Selatan</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Tahun Bank CIU */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Tahun Bank CIU</label>
            <div className="relative">
              <select
                value={filterTahun}
                onChange={(e) => setFilterTahun(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-2.5 py-1.5 sm:py-2 text-xs font-medium text-[#172033] focus:outline-none focus:border-[#F56621] appearance-none pr-7 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Nama Bank CIU */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Nama Bank CIU</label>
            <div className="relative">
              <select
                value={filterBankCiu}
                onChange={(e) => setFilterBankCiu(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-2.5 py-1.5 sm:py-2 text-xs font-medium text-[#172033] focus:outline-none focus:border-[#F56621] appearance-none pr-7 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Cirebon">BPR Bank Cirebon</option>
                <option value="Purworejo">BPR Bank Purworejo</option>
                <option value="Karya Remaja">BPR Karya Remaja</option>
                <option value="Jepara Artha">BPR Jepara Artha</option>
                <option value="Arfak">BPR Arfak Indonesia</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Bank Pembayar */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Bank Pembayar</label>
            <div className="relative">
              <select
                value={filterBankPembayar}
                onChange={(e) => setFilterBankPembayar(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-2.5 py-1.5 sm:py-2 text-xs font-medium text-[#172033] focus:outline-none focus:border-[#F56621] appearance-none pr-7 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="BRI">BRI</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BNI">BNI</option>
                <option value="BSI">BSI</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Status Pembayaran */}
          <div className="space-y-1 col-span-2 sm:col-span-1 md:col-span-1">
            <label className="text-[11px] font-bold text-[#475467]">Status Pembayaran</label>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-2.5 py-1.5 sm:py-2 text-xs font-medium text-[#172033] focus:outline-none focus:border-[#F56621] appearance-none pr-7 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Sudah Dicairkan">Sudah Dicairkan</option>
                <option value="Belum Dicairkan">Belum Dicairkan</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROW 1: 4 CHARTS (RESPONSIVE GRID OPTIMIZED FOR IPAD & DESKTOP) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Chart 1: Jumlah Bank dalam Proses Pencairan (Horizontal Bar) */}
        <div className="col-span-12 md:col-span-7 xl:col-span-4 bg-white rounded-2xl p-4 sm:p-4.5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <h4 className="text-xs sm:text-[13px] font-bold text-center text-[#172033] mb-2">
            Jumlah Bank dalam Proses Pencairan
          </h4>

          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={DATA_PROVINSI_PENCAIRAN}
                margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#F2F4F7" />
                <XAxis type="number" domain={[0, 12]} ticks={[0, 2, 4, 6, 8, 10, 12]} tick={{ fontSize: 9.5, fill: "#667085" }} />
                <YAxis dataKey="provinsi" type="category" tick={{ fontSize: 9, fill: "#344054", fontWeight: 500 }} width={85} />
                <Tooltip />
                <Bar dataKey="jumlah" radius={[0, 4, 4, 0]}>
                  {DATA_PROVINSI_PENCAIRAN.map((entry, idx) => (
                    <Cell key={`prov-${idx}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="jumlah" position="insideRight" fill="#FFFFFF" fontSize={9.5} fontWeight="bold" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Jumlah Bank CIU per Bank Pembayar (Vertical Bar) */}
        <div className="col-span-12 md:col-span-5 xl:col-span-3 bg-white rounded-2xl p-4 sm:p-4.5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <h4 className="text-xs sm:text-[13px] font-bold text-center text-[#172033] mb-2">
            Jumlah Bank CIU per Bank Pembayar
          </h4>

          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA_BANK_PEMBAYAR} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#F2F4F7" />
                <XAxis dataKey="bank" tick={{ fontSize: 11, fontWeight: 600, fill: "#344054" }} />
                <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} tick={{ fontSize: 9.5, fill: "#667085" }} />
                <Tooltip />
                <Bar dataKey="jumlah" barSize={38} radius={[4, 4, 0, 0]}>
                  {DATA_BANK_PEMBAYAR.map((entry, idx) => (
                    <Cell key={`bank-${idx}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="jumlah" position="center" fill="#FFFFFF" fontSize={11} fontWeight="bold" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3 & 4: Tipe Pencairan & Tipe Rekening (Donuts - Side by side on iPad & Desktop) */}
        <div className="col-span-12 md:col-span-12 xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Donut 1: Tipe Pencairan */}
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
            <h4 className="text-xs sm:text-[13px] font-bold text-center text-[#172033] mb-1">
              Tipe Pencairan
            </h4>

            <div className="h-44 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={DATA_TIPE_PENCAIRAN}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={2}
                  >
                    {DATA_TIPE_PENCAIRAN.map((entry, idx) => (
                      <Cell key={`pencairan-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] text-[#667085] uppercase font-bold">Total</span>
                <span className="text-xs font-black text-[#172033]">230.263</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[10.5px] pt-2 border-t border-[#F2F4F7]">
              {DATA_TIPE_PENCAIRAN.map((d, i) => (
                <div key={i} className="flex justify-between items-center gap-1.5">
                  <span className="flex items-center gap-1.5 text-[#475467] truncate text-[11px]">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                  <span className="font-bold text-[#172033] text-[11px] whitespace-nowrap flex-shrink-0">
                    {d.value.toLocaleString("id-ID")}&nbsp;<span className="font-normal text-[#667085]">({d.pct})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut 2: Tipe Rekening */}
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
            <h4 className="text-xs sm:text-[13px] font-bold text-center text-[#172033] mb-1">
              Tipe Rekening
            </h4>

            <div className="h-44 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={DATA_TIPE_REKENING}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={2}
                  >
                    {DATA_TIPE_REKENING.map((entry, idx) => (
                      <Cell key={`rekening-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[9px] text-[#667085] uppercase font-bold">Total</span>
                <span className="text-xs font-black text-[#172033]">229.429</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[10.5px] pt-2 border-t border-[#F2F4F7]">
              {DATA_TIPE_REKENING.map((d, i) => (
                <div key={i} className="flex justify-between items-center gap-1.5">
                  <span className="flex items-center gap-1.5 text-[#475467] truncate text-[11px]">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                  <span className="font-bold text-[#172033] text-[11px] whitespace-nowrap flex-shrink-0">
                    {d.value.toLocaleString("id-ID")}&nbsp;<span className="font-normal text-[#667085]">({d.pct})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ================= ROW 2: BOTTOM SECTION (GAUGES ON LEFT + TABLE ON RIGHT - VISIBLE TOGETHER ON IPAD) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        
        {/* LEFT: 3 KPI CARDS WITH SEMI-CIRCLE GAUGES */}
        <div className="col-span-12 md:col-span-5 space-y-3">
          
          {/* Card 1: Nominal (Dalam Ribu Rupiah) */}
          <div className="bg-white rounded-2xl shadow-2xs border border-[#EAECF0] overflow-hidden">
            <div className="bg-[#007A78] text-white px-3.5 py-1.5 text-xs font-bold tracking-wide">
              Nominal (Dalam Ribu Rupiah)
            </div>
            <div className="p-3 sm:p-3.5 flex items-center justify-between gap-2">
              <div className="flex-1 bg-[#007A78] text-white p-2.5 sm:p-3 rounded-xl min-w-0">
                <span className="text-sm sm:text-base font-black block tracking-tight leading-tight truncate">
                  1,937,721,995
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-medium text-teal-100 block mt-0.5 leading-tight">
                  Nominal Sudah Dicairkan
                </span>
              </div>

              <div className="flex-1 p-1 sm:p-2 min-w-0">
                <span className="text-sm sm:text-base font-bold text-[#172033] block tracking-tight leading-tight truncate">
                  96,016,142
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-medium text-[#667085] block mt-0.5 leading-tight">
                  Nominal Belum Dicairkan
                </span>
              </div>

              <SemiCircleGauge pct={95.0} color="#007A78" />
            </div>
          </div>

          {/* Card 2: Jumlah Nasabah */}
          <div className="bg-white rounded-2xl shadow-2xs border border-[#EAECF0] overflow-hidden">
            <div className="bg-[#F55331] text-white px-3.5 py-1.5 text-xs font-bold tracking-wide">
              Jumlah Nasabah
            </div>
            <div className="p-3 sm:p-3.5 flex items-center justify-between gap-2">
              <div className="flex-1 bg-[#F55331] text-white p-2.5 sm:p-3 rounded-xl min-w-0">
                <span className="text-sm sm:text-base font-black block tracking-tight leading-tight truncate">
                  44,233
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-medium text-orange-100 block mt-0.5 leading-tight">
                  Jumlah Nasabah Sudah Cair
                </span>
              </div>

              <div className="flex-1 p-1 sm:p-2 min-w-0">
                <span className="text-sm sm:text-base font-bold text-[#172033] block tracking-tight leading-tight truncate">
                  185,972
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-medium text-[#667085] block mt-0.5 leading-tight">
                  Jumlah Nasabah Belum Cair
                </span>
              </div>

              <SemiCircleGauge pct={19.0} color="#F55331" />
            </div>
          </div>

          {/* Card 3: Jumlah Rekening */}
          <div className="bg-white rounded-2xl shadow-2xs border border-[#EAECF0] overflow-hidden">
            <div className="bg-[#33436D] text-white px-3.5 py-1.5 text-xs font-bold tracking-wide">
              Jumlah Rekening
            </div>
            <div className="p-3 sm:p-3.5 flex items-center justify-between gap-2">
              <div className="flex-1 bg-[#33436D] text-white p-2.5 sm:p-3 rounded-xl min-w-0">
                <span className="text-sm sm:text-base font-black block tracking-tight leading-tight truncate">
                  44,370
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-200 block mt-0.5 leading-tight">
                  Jumlah Rekening Sudah Cair
                </span>
              </div>

              <div className="flex-1 p-1 sm:p-2 min-w-0">
                <span className="text-sm sm:text-base font-bold text-[#172033] block tracking-tight leading-tight truncate">
                  190,429
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-medium text-[#667085] block mt-0.5 leading-tight">
                  Jumlah Rekening Belum Cair
                </span>
              </div>

              <SemiCircleGauge pct={19.0} color="#33436D" />
            </div>
          </div>

        </div>

        {/* RIGHT: SUMMARY PEMBAYARAN BANK CIU TABLE */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-2xl shadow-2xs border border-[#EAECF0] overflow-hidden">
          <div className="p-3.5 sm:p-4 border-b border-[#EAECF0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#172033]">
                Summary pembayaran Bank CIU
              </h3>
              <p className="text-[11px] text-[#667085]">
                Menampilkan {filteredData.length} entitas bank dalam proses pembayaran klaim
              </p>
            </div>

            <div className="relative w-full sm:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
              <input
                type="text"
                placeholder="Cari bank atau provinsi..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full bg-[#F6F7F9] border border-[#EAECF0] rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#F56621]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-h-[360px] md:max-h-[390px] overflow-y-auto scrollbar-thin">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#D97706] text-white text-[10.5px] font-bold">
                  <th className="p-2 sm:p-2.5">No. Kepesertaan</th>
                  <th className="p-2 sm:p-2.5">Provinsi</th>
                  <th className="p-2 sm:p-2.5">Bank CIU</th>
                  <th className="p-2 sm:p-2.5 text-right">Nominal (Rp Ribu)</th>
                  <th className="p-2 sm:p-2.5 text-right">Jumlah Rekening</th>
                  <th className="p-2 sm:p-2.5 text-right">Jumlah Nasabah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0] text-[10.5px] sm:text-[11px]">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="p-2 sm:p-2.5 font-mono text-[#475467]">{row.noKepesertaan}</td>
                    <td className="p-2 sm:p-2.5 text-[#344054] font-medium">{row.provinsi}</td>
                    <td className="p-2 sm:p-2.5 font-bold text-[#172033]">{row.bankCiu}</td>
                    <td className="p-2 sm:p-2.5 text-right font-mono font-semibold text-[#172033]">{row.nominalStr}</td>
                    <td className="p-2 sm:p-2.5 text-right font-semibold">{row.jumlahRekening.toLocaleString("id-ID")}</td>
                    <td className="p-2 sm:p-2.5 text-right font-semibold">{row.jumlahNasabah.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="sticky bottom-0 z-10">
                <tr className="bg-[#0F172A] text-white font-extrabold text-[10.5px] sm:text-[11px]">
                  <td className="p-2 sm:p-2.5 uppercase" colSpan={3}>Total</td>
                  <td className="p-2 sm:p-2.5 text-right font-mono">
                    {totalNominal.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 sm:p-2.5 text-right">
                    {totalRekening.toLocaleString("id-ID")}
                  </td>
                  <td className="p-2 sm:p-2.5 text-right">
                    {totalNasabah.toLocaleString("id-ID")}
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
