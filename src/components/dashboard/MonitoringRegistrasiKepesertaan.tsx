"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Calendar,
  RotateCw,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ChevronDown,
  Layers,
  Sparkles
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
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

// --- MOCK DATA MATCHING USER SCREENSHOT ---

// Donut 1: Status Pengajuan Registrasi Kepesertaan
const DATA_STATUS_REGISTRASI = [
  { name: "Belum melakukan Registrasi Akun", value: 8, color: "#1E293B", pct: "11.76%" },
  { name: "Belum melakukan Registrasi Kepesertaan", value: 22, color: "#0084FF", pct: "32.35%" },
  { name: "Sudah melakukan Registrasi Kepesertaan", value: 38, color: "#FF7A00", pct: "55.88%" },
];

// Stacked Bar: Status Pengajuan berdasarkan Jenis Perusahaan
const DATA_PERUSAHAAN_STACKED = [
  {
    jenis: "Umum",
    belumAkun: 1,
    belumKepesertaan: 2,
    sudahKepesertaan: 0,
    total: 3,
  },
  {
    jenis: "Jiwa",
    belumAkun: 7,
    belumKepesertaan: 20,
    sudahKepesertaan: 38,
    total: 65,
  },
];

// Bar: Total Perbandingan Pengajuan Registrasi Kepesertaan
const DATA_PERBANDINGAN_PENGAJUAN = [
  { name: "Pengajuan Registrasi", count: 38, pct: "63.33%", color: "#FF7A00" },
  { name: "Draft Pengajuan", count: 18, pct: "30%", color: "#0084FF" },
  { name: "Belum Pengajuan", count: 4, pct: "6.67%", color: "#D92D20" },
];

// Donut 2: Status Hasil Verifikasi
const DATA_HASIL_VERIFIKASI = [
  { name: "Dalam Proses Verifikasi", value: 3, color: "#FF7A00", pct: "7.89%" },
  { name: "Perlu Perbaikan PA/PAS", value: 0, color: "#1E293B", pct: "0%" },
  { name: "Pengajuan Berhasil Diverifikasi", value: 35, color: "#0084FF", pct: "92.11%" },
];

// Horizontal Grouped Bar: Hasil Penilaian Sendiri
const DATA_PENILAIAN_SENDIRI = [
  { kategori: "OJK", memenuhi: 0, tidakMemenuhi: 4.8 },
  { kategori: "Penilaian Sendiri PA", memenuhi: 3.2, tidakMemenuhi: 0.8 },
  { kategori: "Verifikasi LPS", memenuhi: 3.8, tidakMemenuhi: 4.5 },
];

// Aspek 1: Penilaian Berdasarkan OJK
const DATA_ASPEK_OJK = [
  { aspek: "Pkt. Komposit Kesehatan", memenuhi: 4, tidakMemenuhi: 0 },
  { aspek: "Sanksi Administratif", memenuhi: 1, tidakMemenuhi: 3 },
  { aspek: "Status Pengawasan", memenuhi: 1, tidakMemenuhi: 3 },
  { aspek: "Tingkat Solvabilitas (RBC)", memenuhi: 2, tidakMemenuhi: 2 },
];

// Aspek 2: Penilaian Sendiri PA
const DATA_ASPEK_PA = [
  { aspek: "Pkt. Komposit Kesehatan", memenuhi: 4, tidakMemenuhi: 0 },
  { aspek: "Sanksi Administratif", memenuhi: 3, tidakMemenuhi: 1 },
  { aspek: "Status Pengawasan", memenuhi: 4, tidakMemenuhi: 0 },
  { aspek: "Tingkat Solvabilitas (RBC)", memenuhi: 4, tidakMemenuhi: 0.5 },
];

// Aspek 3: Verifikasi LPS
const DATA_ASPEK_LPS = [
  { aspek: "Pkt. Komposit Kesehatan", memenuhi: 6, tidakMemenuhi: 3 },
  { aspek: "Status Pengawasan", memenuhi: 7, tidakMemenuhi: 2 },
  { aspek: "Tindakan Pengawasan OJK", memenuhi: 5, tidakMemenuhi: 4 },
  { aspek: "Tingkat Solvabilitas (RBC)", memenuhi: 6, tidakMemenuhi: 3 },
];

export default function MonitoringRegistrasiKepesertaan() {
  const [periode, setPeriode] = useState("");
  const [jenisPerusahaan, setJenisPerusahaan] = useState("Pilih...");
  const [jenisUsaha, setJenisUsaha] = useState("Pilih...");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  const handleApplyFilter = () => {
    setSyncMsg("Filter berhasil diterapkan");
    setTimeout(() => setSyncMsg(null), 2500);
  };

  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncMsg("Data berhasil disinkronkan dengan Sistem Inti LPS");
      setTimeout(() => setSyncMsg(null), 3000);
    }, 800);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 w-full text-[#172033]">
      
      {/* Toast Notification for Filter / Sync */}
      {syncMsg && (
        <div className="fixed top-16 right-4 z-50 bg-[#172033] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{syncMsg}</span>
        </div>
      )}

      {/* TOP FILTER BAR & HEADER */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#667085] mb-0.5">
              <span>Persiapan Kepesertaan</span>
              <span>/</span>
              <span className="text-[#172033] font-semibold">Laporan</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#172033] tracking-tight">
              Monitoring Registrasi Kepesertaan
            </h2>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 items-end">
          {/* Periode */}
          <div className="sm:col-span-3 space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Periode :</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Pilih rentang tanggal..."
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3 py-2 text-xs font-medium text-[#172033] focus:outline-none focus:border-[#FF7A00] pr-8"
              />
              <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Jenis Perusahaan */}
          <div className="sm:col-span-3 space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Jenis Perusahaan :</label>
            <div className="relative">
              <select
                value={jenisPerusahaan}
                onChange={(e) => setJenisPerusahaan(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3 py-2 text-xs font-semibold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
              >
                <option value="Pilih...">Pilih...</option>
                <option value="Semua">Semua Perusahaan</option>
                <option value="Umum">Asuransi Umum</option>
                <option value="Jiwa">Asuransi Jiwa</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Jenis Usaha */}
          <div className="sm:col-span-3 space-y-1">
            <label className="text-[11px] font-bold text-[#475467]">Jenis Usaha :</label>
            <div className="relative">
              <select
                value={jenisUsaha}
                onChange={(e) => setJenisUsaha(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#D0D5DD] rounded-xl px-3 py-2 text-xs font-semibold text-[#172033] focus:outline-none focus:border-[#FF7A00] appearance-none pr-8 cursor-pointer"
              >
                <option value="Pilih...">Pilih...</option>
                <option value="Semua">Semua Usaha</option>
                <option value="Konvensional">Konvensional</option>
                <option value="Syariah">Syariah</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            </div>
          </div>

          {/* Buttons */}
          <div className="sm:col-span-3 flex items-center gap-2">
            <button
              onClick={handleApplyFilter}
              className="flex-1 bg-[#F56621] hover:bg-[#D95E15] text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
            >
              Terapkan
            </button>
            <button
              onClick={handleSyncData}
              disabled={isSyncing}
              className="flex-1 bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
            >
              <RotateCw size={13} className={cn(isSyncing && "animate-spin")} />
              <span>{isSyncing ? "Sync..." : "Sync Data"}</span>
            </button>
          </div>
        </div>

        {/* Timestamp */}
        <div className="pt-1 border-t border-[#F2F4F7] flex items-center justify-between">
          <p className="text-[11px] text-[#667085]">
            Terakhir Diperbarui: <span className="font-semibold text-[#344054]">09 September 2026 00:00:00</span>
          </p>
        </div>
      </div>

      {/* ================= SECTION 1: ROW 1 (TOTAL PENGAJUAN & STATUS DONUT) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card 1: Total Pengajuan Registrasi Kepesertaan */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs sm:text-[13px] font-bold text-[#172033]">
              Total Pengajuan Registrasi Kepesertaan
            </h3>
            <button className="text-[#98A2B3] hover:text-[#F56621] transition-colors p-1" title="Lihat Rincian">
              <ExternalLink size={14} />
            </button>
          </div>

          <div className="flex items-center gap-5 my-2">
            {/* Visual Icon Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FFECE5] to-[#FFE0D3] border border-[#FFD2C2] flex items-center justify-center shadow-inner flex-shrink-0">
              <div className="relative">
                <FileSpreadsheet className="w-9 h-9 text-[#F56621]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#172033] tracking-tight">39</span>
                <span className="text-sm font-semibold text-[#667085]">Pengajuan</span>
              </div>
              <p className="text-[11px] text-[#98A2B3] mt-0.5">Program Penjaminan Polis (UU P2SK)</p>
            </div>
          </div>

          {/* Bottom Breakdown Grid */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F2F4F7] mt-3">
            <div className="bg-[#F9FAFB] p-2.5 rounded-xl border border-[#EAECF0]">
              <span className="text-[11px] text-[#667085] block font-medium">Sudah Ditetapkan</span>
              <span className="text-xl font-bold text-[#172033] mt-0.5 block">2</span>
            </div>
            <div className="bg-[#F9FAFB] p-2.5 rounded-xl border border-[#EAECF0]">
              <span className="text-[11px] text-[#667085] block font-medium">Belum Ditetapkan</span>
              <span className="text-xl font-bold text-[#172033] mt-0.5 block">37</span>
            </div>
          </div>
        </div>

        {/* Card 2: Status Pengajuan Registrasi Kepesertaan (Donut Chart) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-[13px] font-bold text-[#172033]">
              Status Pengajuan Registrasi Kepesertaan
            </h3>
            <button className="text-[#98A2B3] hover:text-[#F56621] transition-colors p-1" title="Lihat Rincian">
              <ExternalLink size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center py-1">
            {/* Donut Chart */}
            <div className="sm:col-span-6 h-44 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-[#172033] text-white px-2.5 py-1.5 rounded-lg text-[11px] shadow-lg">
                            <p className="font-semibold">{d.name}</p>
                            <p className="text-orange-300 font-bold">{d.value} ({d.pct})</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={DATA_STATUS_REGISTRASI}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={46}
                    outerRadius={68}
                    paddingAngle={3}
                  >
                    {DATA_STATUS_REGISTRASI.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase font-bold text-[#667085]">Total</span>
                <span className="text-lg font-black text-[#172033]">68</span>
              </div>
            </div>

            {/* Legend & Breakdown */}
            <div className="sm:col-span-6 space-y-2 text-xs">
              {DATA_STATUS_REGISTRASI.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] text-[#475467] leading-tight">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#172033] text-xs">{item.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#F2F4F7] flex items-center justify-between text-xs font-bold text-[#172033]">
                <span>Total</span>
                <span>68</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= SECTION 2: ROW 2 (PERBANDINGAN PENGAJUAN) ================= */}
      <div className="space-y-2">
        <h3 className="text-sm font-extrabold text-[#172033]">
          Total Perbandingan Pengajuan Registrasi Kepesertaan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 3: Stacked Bar - Berdasarkan Jenis Perusahaan */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#172033]">
                Status Pengajuan berdasarkan Jenis Perusahaan
              </h4>
              <button className="text-[#98A2B3] hover:text-[#F56621] transition-colors p-1" title="Rincian">
                <ExternalLink size={14} />
              </button>
            </div>

            <div className="h-48 sm:h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_PERUSAHAAN_STACKED} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
                  <XAxis dataKey="jenis" tick={{ fontSize: 11, fill: "#475467", fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 80]} tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} ticks={[0, 20, 40, 60, 80]} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#172033] text-white p-2 rounded-lg text-[11px] shadow-md space-y-1">
                            <p className="font-bold border-b border-slate-700 pb-1">Asuransi {label}</p>
                            {payload.map((p, i) => (
                              <div key={i} className="flex justify-between gap-3 text-[10px]">
                                <span style={{ color: p.color }}>{p.name}:</span>
                                <span className="font-bold">{p.value}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="belumAkun" stackId="a" fill="#1E293B" name="Belum Akun" />
                  <Bar dataKey="belumKepesertaan" stackId="a" fill="#0084FF" name="Belum Kepesertaan" />
                  <Bar dataKey="sudahKepesertaan" stackId="a" fill="#FF7A00" name="Sudah Kepesertaan" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend below */}
            <div className="pt-3 border-t border-[#F2F4F7] space-y-1.5 text-[10.5px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#475467]">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                  Jumlah Sudah melakukan Registrasi Kepesertaan
                </span>
                <span className="font-bold text-[#172033]">38</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#475467]">
                  <span className="w-2 h-2 rounded-full bg-[#0084FF]" />
                  Jumlah Belum melakukan Registrasi Kepesertaan
                </span>
                <span className="font-bold text-[#172033]">22</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#475467]">
                  <span className="w-2 h-2 rounded-full bg-[#1E293B]" />
                  Jumlah Belum melakukan Registrasi Akun
                </span>
                <span className="font-bold text-[#172033]">8</span>
              </div>
              <div className="pt-1 flex items-center justify-between font-bold text-[#172033]">
                <span>Total</span>
                <span>68</span>
              </div>
            </div>
          </div>

          {/* Card 4: Total Perbandingan Pengajuan Registrasi Kepesertaan (Bar with top badges) */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#172033]">
                Total Perbandingan Pengajuan Registrasi Kepesertaan
              </h4>
              <button className="text-[#98A2B3] hover:text-[#F56621] transition-colors p-1" title="Rincian">
                <ExternalLink size={14} />
              </button>
            </div>

            <div className="h-48 sm:h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_PERBANDINGAN_PENGAJUAN} margin={{ top: 25, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#475467", fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 40]} tick={{ fontSize: 10, fill: "#667085" }} axisLine={false} tickLine={false} ticks={[0, 10, 20, 30, 40]} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-[#172033] text-white px-2.5 py-1.5 rounded-lg text-[11px] shadow-lg">
                            <p className="font-semibold">{d.name}</p>
                            <p className="font-bold" style={{ color: d.color }}>{d.count} ({d.pct})</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={44}>
                    {DATA_PERBANDINGAN_PENGAJUAN.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend below */}
            <div className="pt-3 border-t border-[#F2F4F7] space-y-1.5 text-[10.5px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#475467]">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                  Pengajuan Registrasi
                </span>
                <span className="font-bold text-[#172033]">38</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#475467]">
                  <span className="w-2 h-2 rounded-full bg-[#0084FF]" />
                  Draft Pengajuan
                </span>
                <span className="font-bold text-[#172033]">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#475467]">
                  <span className="w-2 h-2 rounded-full bg-[#D92D20]" />
                  Belum Pengajuan
                </span>
                <span className="font-bold text-[#172033]">4</span>
              </div>
              <div className="pt-1 flex items-center justify-between font-bold text-[#172033]">
                <span>Total</span>
                <span>60</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= SECTION 3: ROW 3 (4 CARDS: VERIFIKASI, PENILAIAN SENDIRI, KESEHATAN, KEPESERTAAN) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 5: Status Hasil Verifikasi */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#172033]">Status Hasil Verifikasi</h4>
            <button className="text-[#98A2B3] hover:text-[#F56621] p-0.5">
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="h-36 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={DATA_HASIL_VERIFIKASI}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={38}
                  outerRadius={56}
                  paddingAngle={2}
                >
                  {DATA_HASIL_VERIFIKASI.map((entry, idx) => (
                    <Cell key={`cell-v-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] text-[#667085] uppercase font-bold">Total</span>
              <span className="text-sm font-black text-[#172033]">38</span>
            </div>
          </div>

          <div className="space-y-1 text-[10px] pt-2 border-t border-[#F2F4F7]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                Dalam Proses Verifikasi
              </span>
              <span className="font-bold">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#1E293B]" />
                Perlu Perbaikan PA/PAS
              </span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#0084FF]" />
                Pengajuan Berhasil Diverifikasi
              </span>
              <span className="font-bold">35</span>
            </div>
            <div className="flex justify-between items-center pt-1 font-bold text-[#172033] border-t border-[#F2F4F7]">
              <span>Total</span>
              <span>38</span>
            </div>
          </div>
        </div>

        {/* Card 6: Hasil Penilaian Sendiri (Horizontal Bar) */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#172033]">Hasil Penilaian Sendiri</h4>
            <button className="text-[#98A2B3] hover:text-[#F56621] p-0.5">
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={DATA_PENILAIAN_SENDIRI}
                margin={{ top: 5, right: 10, left: -25, bottom: -10 }}
              >
                <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#EAECF0" />
                <XAxis type="number" domain={[0, 6]} tick={{ fontSize: 9, fill: "#667085" }} />
                <YAxis dataKey="kategori" type="category" tick={{ fontSize: 8.5, fill: "#475467" }} width={65} />
                <Tooltip />
                <Bar dataKey="tidakMemenuhi" fill="#FF7A00" name="Tidak Memenuhi" radius={[0, 3, 3, 0]} />
                <Bar dataKey="memenuhi" fill="#0084FF" name="Memenuhi" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1 text-[10px] pt-2 border-t border-[#F2F4F7]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#0084FF]" />
                Memenuhi
              </span>
              <span className="font-bold">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                Tidak Memenuhi
              </span>
              <span className="font-bold">10</span>
            </div>
            <div className="flex justify-between items-center pt-1 font-bold text-[#172033] border-t border-[#F2F4F7]">
              <span>Total</span>
              <span>17</span>
            </div>
          </div>
        </div>

        {/* Card 7: Pemenuhan Tingkat Kesehatan */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#172033]">Pemenuhan Tingkat Kesehatan</h4>
            <button className="text-[#98A2B3] hover:text-[#F56621] p-0.5">
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="space-y-2 py-1 flex-1 flex flex-col justify-center">
            {/* Item 1 */}
            <div>
              <div className="flex justify-between text-[10.5px] font-medium text-[#344054] mb-0.5">
                <span>Memenuhi</span>
                <span className="font-bold text-[#172033]">12</span>
              </div>
              <div className="w-full h-4 bg-[#F2F4F7] rounded-md overflow-hidden flex">
                <div className="h-full bg-[#12B76A] text-white text-[9px] font-bold flex items-center justify-center" style={{ width: "35.29%" }}>
                  35.29%
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div>
              <div className="flex justify-between text-[10.5px] font-medium text-[#344054] mb-0.5">
                <span>Tidak Memenuhi</span>
                <span className="font-bold text-[#172033]">7</span>
              </div>
              <div className="w-full h-4 bg-[#F2F4F7] rounded-md overflow-hidden flex">
                <div className="h-full bg-[#F04438] text-white text-[9px] font-bold flex items-center justify-center" style={{ width: "20.59%" }}>
                  20.59%
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div>
              <div className="flex justify-between text-[10.5px] font-medium text-[#344054] mb-0.5">
                <span>Dalam Proses Analisis</span>
                <span className="font-bold text-[#172033]">9</span>
              </div>
              <div className="w-full h-4 bg-[#F2F4F7] rounded-md overflow-hidden flex">
                <div className="h-full bg-[#FDB022] text-[#172033] text-[9px] font-bold flex items-center justify-center" style={{ width: "26.47%" }}>
                  26.47%
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div>
              <div className="flex justify-between text-[10.5px] font-medium text-[#344054] mb-0.5">
                <span>Perlu Pemeriksaan</span>
                <span className="font-bold text-[#172033]">6</span>
              </div>
              <div className="w-full h-4 bg-[#F2F4F7] rounded-md overflow-hidden flex">
                <div className="h-full bg-[#F97066] text-white text-[9px] font-bold flex items-center justify-center" style={{ width: "17.65%" }}>
                  17.65%
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#F2F4F7] flex justify-between items-center text-[10px] font-bold text-[#172033]">
            <span>Total</span>
            <span>34</span>
          </div>
        </div>

        {/* Card 8: Status Kepesertaan */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#172033]">Status Kepesertaan</h4>
            <button className="text-[#98A2B3] hover:text-[#F56621] p-0.5">
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="space-y-3 py-2 flex-1 flex flex-col justify-center">
            {/* Peserta */}
            <div>
              <div className="flex justify-between text-[10.5px] font-medium text-[#344054] mb-0.5">
                <span>Peserta</span>
                <span className="font-bold text-[#172033]">2</span>
              </div>
              <div className="w-full h-4 bg-[#F2F4F7] rounded-md overflow-hidden flex">
                <div className="h-full bg-[#12B76A] text-white text-[9px] font-bold flex items-center justify-center" style={{ width: "15%" }}>
                  5.13%
                </div>
              </div>
            </div>

            {/* Bukan Peserta */}
            <div>
              <div className="flex justify-between text-[10.5px] font-medium text-[#344054] mb-0.5">
                <span>Bukan Peserta</span>
                <span className="font-bold text-[#172033]">0</span>
              </div>
              <div className="w-full h-4 bg-[#F2F4F7] rounded-md overflow-hidden" />
            </div>

            {/* Belum Ditetapkan */}
            <div>
              <div className="flex justify-between text-[10.5px] font-medium text-[#344054] mb-0.5">
                <span>Belum Ditetapkan</span>
                <span className="font-bold text-[#172033]">37</span>
              </div>
              <div className="w-full h-4 bg-[#F2F4F7] rounded-md overflow-hidden flex">
                <div className="h-full bg-[#FDB022] text-[#172033] text-[9px] font-bold flex items-center justify-center" style={{ width: "94.87%" }}>
                  94.87%
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#F2F4F7] flex justify-between items-center text-[10px] font-bold text-[#172033]">
            <span>Total</span>
            <span>39</span>
          </div>
        </div>

      </div>

      {/* ================= SECTION 4: ROW 4 (3 CARDS: PENILAIAN BERDASARKAN ASPEK) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 9: Penilaian Berdasarkan OJK */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#172033]">Penilaian Berdasarkan OJK</h4>
            <button className="text-[#98A2B3] hover:text-[#F56621] p-0.5">
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={DATA_ASPEK_OJK}
                margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#EAECF0" />
                <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 9, fill: "#667085" }} ticks={[0, 1, 2, 3, 4, 5]} />
                <YAxis dataKey="aspek" type="category" tick={{ fontSize: 8, fill: "#475467" }} width={80} />
                <Tooltip />
                <Bar dataKey="memenuhi" fill="#0084FF" name="Memenuhi" radius={[0, 2, 2, 0]} />
                <Bar dataKey="tidakMemenuhi" fill="#FF7A00" name="Tidak Memenuhi" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1 text-[10px] pt-2 border-t border-[#F2F4F7]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#0084FF]" />
                Memenuhi
              </span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                Tidak Memenuhi
              </span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center pt-1 font-bold text-[#172033] border-t border-[#F2F4F7]">
              <span>Total</span>
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Card 10: Penilaian Sendiri PA */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#172033]">Penilaian Sendiri PA</h4>
            <button className="text-[#98A2B3] hover:text-[#F56621] p-0.5">
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={DATA_ASPEK_PA}
                margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#EAECF0" />
                <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 9, fill: "#667085" }} ticks={[0, 1, 2, 3, 4, 5]} />
                <YAxis dataKey="aspek" type="category" tick={{ fontSize: 8, fill: "#475467" }} width={80} />
                <Tooltip />
                <Bar dataKey="memenuhi" fill="#0084FF" name="Memenuhi" radius={[0, 2, 2, 0]} />
                <Bar dataKey="tidakMemenuhi" fill="#FF7A00" name="Tidak Memenuhi" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1 text-[10px] pt-2 border-t border-[#F2F4F7]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#0084FF]" />
                Memenuhi
              </span>
              <span className="font-bold">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                Tidak Memenuhi
              </span>
              <span className="font-bold">1</span>
            </div>
            <div className="flex justify-between items-center pt-1 font-bold text-[#172033] border-t border-[#F2F4F7]">
              <span>Total</span>
              <span>4</span>
            </div>
          </div>
        </div>

        {/* Card 11: Verifikasi LPS */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-[#EAECF0] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#172033]">Verifikasi LPS</h4>
            <button className="text-[#98A2B3] hover:text-[#F56621] p-0.5">
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={DATA_ASPEK_LPS}
                margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#EAECF0" />
                <XAxis type="number" domain={[0, 9]} tick={{ fontSize: 9, fill: "#667085" }} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
                <YAxis dataKey="aspek" type="category" tick={{ fontSize: 8, fill: "#475467" }} width={80} />
                <Tooltip />
                <Bar dataKey="memenuhi" fill="#0084FF" name="Memenuhi" radius={[0, 2, 2, 0]} />
                <Bar dataKey="tidakMemenuhi" fill="#FF7A00" name="Tidak Memenuhi" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1 text-[10px] pt-2 border-t border-[#F2F4F7]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#0084FF]" />
                Memenuhi
              </span>
              <span className="font-bold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1 text-[#475467]">
                <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                Tidak Memenuhi
              </span>
              <span className="font-bold">5</span>
            </div>
            <div className="flex justify-between items-center pt-1 font-bold text-[#172033] border-t border-[#F2F4F7]">
              <span>Total</span>
              <span>9</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= SECTION 5: ROW 5 (PENGAJUAN BERDASARKAN TAHAPAN) ================= */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-[#EAECF0] space-y-3">
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold text-[#172033]">
            Pengajuan Berdasarkan Tahapan
          </h3>
          <p className="text-[11px] text-[#667085] mt-0.5">
            Jumlah pada section ini mencerminkan posisi pada setiap tahapan, tidak merepresentasikan total pengajuan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          
          {/* Column 1: Verifikasi Pengajuan */}
          <div className="bg-[#F9FAFB] rounded-xl p-3.5 border border-[#EAECF0] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
              <h5 className="text-[11.5px] font-bold text-[#172033]">Verifikasi Pengajuan</h5>
              <ExternalLink size={12} className="text-[#98A2B3]" />
            </div>

            <div className="space-y-2 py-3 text-[11px] text-[#475467]">
              <div className="flex justify-between">
                <span>Menunggu Review</span>
                <span className="font-bold text-[#172033]">0</span>
              </div>
              <div className="flex justify-between">
                <span>Sedang Direview</span>
                <span className="font-bold text-[#172033]">3</span>
              </div>
              <div className="flex justify-between">
                <span>Perlu Perbaikan</span>
                <span className="font-bold text-[#172033]">0</span>
              </div>
              <div className="flex justify-between">
                <span>Terverifikasi</span>
                <span className="font-bold text-[#172033]">1</span>
              </div>
              <div className="flex justify-between">
                <span>Sedang Ditindak Lanjut</span>
                <span className="font-bold text-[#172033]">4</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EAECF0] flex justify-between items-center text-xs font-black text-[#172033]">
              <span>TOTAL</span>
              <span>8</span>
            </div>
          </div>

          {/* Column 2: Identifikasi Analisis Risiko */}
          <div className="bg-[#F9FAFB] rounded-xl p-3.5 border border-[#EAECF0] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
              <h5 className="text-[11.5px] font-bold text-[#172033]">Identifikasi Analisis Risiko</h5>
              <ExternalLink size={12} className="text-[#98A2B3]" />
            </div>

            <div className="space-y-2 py-3 text-[11px] text-[#475467]">
              <div className="flex justify-between">
                <span>Dalam Proses Analisis</span>
                <span className="font-bold text-[#172033]">10</span>
              </div>
              <div className="flex justify-between">
                <span>Menunggu Persetujuan</span>
                <span className="font-bold text-[#172033]">0</span>
              </div>
              <div className="flex justify-between">
                <span>Perlu Perbaikan</span>
                <span className="font-bold text-[#172033]">0</span>
              </div>
              <div className="flex justify-between">
                <span>Menunggu Pemeriksaan</span>
                <span className="font-bold text-[#172033]">6</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EAECF0] flex justify-between items-center text-xs font-black text-[#172033]">
              <span>TOTAL</span>
              <span>16</span>
            </div>
          </div>

          {/* Column 3: Pemeriksaan */}
          <div className="bg-[#F9FAFB] rounded-xl p-3.5 border border-[#EAECF0] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
              <h5 className="text-[11.5px] font-bold text-[#172033]">Pemeriksaan</h5>
              <ExternalLink size={12} className="text-[#98A2B3]" />
            </div>

            <div className="space-y-2 py-3 text-[11px] text-[#475467]">
              <div className="flex justify-between">
                <span>Pengajuan</span>
                <span className="font-bold text-[#172033]">1</span>
              </div>
              <div className="flex justify-between">
                <span>Perencanaan</span>
                <span className="font-bold text-[#172033]">1</span>
              </div>
              <div className="flex justify-between">
                <span>Pelaksanaan</span>
                <span className="font-bold text-[#172033]">0</span>
              </div>
              <div className="flex justify-between">
                <span>Pelaporan</span>
                <span className="font-bold text-[#172033]">1</span>
              </div>
              <div className="flex justify-between">
                <span>Selesai</span>
                <span className="font-bold text-[#172033]">19</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EAECF0] flex justify-between items-center text-xs font-black text-[#172033]">
              <span>TOTAL</span>
              <span>22</span>
            </div>
          </div>

          {/* Column 4: Penetapan Kepesertaan */}
          <div className="bg-[#F9FAFB] rounded-xl p-3.5 border border-[#EAECF0] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAECF0]">
              <h5 className="text-[11.5px] font-bold text-[#172033]">Penetapan Kepesertaan</h5>
              <ExternalLink size={12} className="text-[#98A2B3]" />
            </div>

            <div className="space-y-2 py-3 text-[11px] text-[#475467]">
              <div className="flex justify-between">
                <span>Belum Diajukan</span>
                <span className="font-bold text-[#172033]">0</span>
              </div>
              <div className="flex justify-between">
                <span>Menunggu Persetujuan</span>
                <span className="font-bold text-[#172033]">3</span>
              </div>
              <div className="flex justify-between">
                <span>Selesai</span>
                <span className="font-bold text-[#172033]">2</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EAECF0] flex justify-between items-center text-xs font-black text-[#172033]">
              <span>TOTAL</span>
              <span>5</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
