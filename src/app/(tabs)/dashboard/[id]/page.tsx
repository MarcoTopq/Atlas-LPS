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
import { Filter, Users, TrendingUp, AlertTriangle, MonitorSmartphone, CheckCircle, XCircle, Info, Clock } from "lucide-react";

const COLORS = ['#3B82F6', '#1E9E6A', '#D64545', '#E0A100', '#8B5CF6'];
const ASET_COLORS = ['#E0A100', '#F26E22', '#3B82F6', '#D64545'];
const ABSEN_COLORS = ['#3B82F6', '#1E9E6A', '#E0A100', '#D64545', '#8B5CF6'];


export default function DashboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isKepegawaian = resolvedParams.id === 'kepegawaian';
  const isTraining = resolvedParams.id === 'training';
  const isAbsensi = resolvedParams.id === 'absensi';
  const isKeuangan = resolvedParams.id === 'keuangan';
  const isAnggaran = resolvedParams.id === 'anggaran';
  const isAset = resolvedParams.id === 'aset';
  const isHelpdesk = resolvedParams.id === 'helpdesk';
  const isPerdin = resolvedParams.id === 'perjalanan-dinas';
  const isUangMuka = resolvedParams.id === 'uang-muka';
  const isPembayaran = resolvedParams.id === 'pembayaran';

  const title = isKepegawaian ? "Dashboard Kepegawaian" : 
                isAbsensi ? "Dashboard Absensi" :
                isAset ? "Dashboard Aset IT" :
                isHelpdesk ? "Dashboard Helpdesk" :
                isPerdin ? "Perjalanan Dinas" :
                isUangMuka ? "Uang Muka & Pengadaan" :
                isPembayaran ? "Pembiayaan" :
                "Dashboard Detail";

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC] pb-32 md:pb-12 relative w-full items-center">
      <div className="w-full">
        <AppBar title={title} showBack />
        
        {isKepegawaian && <KepegawaianDashboard />}
        {isAbsensi && <AbsensiDashboard />}
        {isAset && <AsetDashboard />}
        {isHelpdesk && <HelpdeskDashboard />}
        {isPerdin && <PerdinView />}
        {isUangMuka && <UangMukaView />}
        {isPembayaran && <PembayaranView />}
        
        {(!isKepegawaian && !isAbsensi && !isAset && !isHelpdesk && !isPerdin && !isUangMuka && !isPembayaran) && (
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

