"use client";

import AppBar from "@/components/AppBar";
import { 
  Users, 
  Receipt, 
  ArrowRight,
  Scale,
  ShieldCheck,
  Landmark,
  ShieldAlert,
  Coins,
  FileCheck2,
  Building
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useResearch } from "@/lib/research";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const log = useResearch((s) => s.log);
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    log("dashboard_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = [
    { id: "semua", label: "Semua Kategori" },
    { id: "bank", label: "Penjaminan Bank" },
    { id: "asuransi", label: "Penjaminan Asuransi" },
    { id: "support", label: "Support & Tata Kelola" }
  ];

  // 1. Penjaminan Bank Sub-modules
  const bankModules = [
    {
      id: "penjaminan-lps",
      title: "Penjaminan LPS",
      subtitle: "Batas Tingkat Bunga, Cakupan Simpanan & Kepesertaan Bank",
      icon: ShieldCheck,
      stat: "Rp 2 Miliar / Nasabah",
      badge: "LPS Rate Aktif"
    },
    {
      id: "resolusi-bank",
      title: "Resolusi Bank",
      subtitle: "Penanganan Bank Bermasalah, Bank Sistemik & Rencana Resolusi",
      icon: ShieldAlert,
      stat: "16 Bank Resolusi",
      badge: "CIU Terdaftar"
    },
    {
      id: "pembayaran-klaim",
      title: "Pembayaran & Klaim",
      subtitle: "Rekonsiliasi Simpanan, Verifikasi Single Customer View (SCV)",
      icon: Coins,
      stat: "99.2% Terbayar",
      badge: "12 BPR Selesai"
    },
    {
      id: "aset-bdl",
      title: "Sisa Aset BDL",
      subtitle: "Pemberesan, Pemulihan Aset & Likuidasi Bank Cabut Izin Usaha",
      icon: Landmark,
      stat: "Rp 420 M Recovery",
      badge: "Tim Aktif"
    }
  ];

  // 2. Penjaminan Asuransi Sub-modules (Program Penjaminan Polis - PPP)
  const asuransiModules = [
    {
      id: "persiapan-kepesertaan",
      title: "Persiapan Kepesertaan",
      subtitle: "Kesiapan Regulasi, Kriteria & Integrasi Perusahaan Asuransi",
      icon: FileCheck2,
      stat: "54 Perusahaan",
      badge: "Kesiapan UU P2SK"
    },
    {
      id: "penjaminan-asuransi",
      title: "Penjaminan Asuransi",
      subtitle: "Batasan & Ruang Lingkup Penjaminan Polis Asuransi Jiwa & Umum",
      icon: ShieldCheck,
      stat: "Polis Terproteksi",
      badge: "Mandat UU"
    },
    {
      id: "resolusi-asuransi",
      title: "Resolusi Asuransi",
      subtitle: "Mekanisme Penanganan & Resolusi Perusahaan Asuransi Bermasalah",
      icon: ShieldAlert,
      stat: "Protokol Siaga",
      badge: "Framework 2026"
    },
    {
      id: "pembayaran-polis",
      title: "Pembayaran Polis",
      subtitle: "Verifikasi Klaim, Nilai Tunai & Penjaminan Manfaat Pemegang Polis",
      icon: Coins,
      stat: "Sistem Terpadu",
      badge: "Skema Klaim"
    },
    {
      id: "aset-asuransi",
      title: "Sisa Aset",
      subtitle: "Penatausahaan Portofolio, Penjualan & Recovery Sisa Aset Asuransi",
      icon: Building,
      stat: "Monitoring Portofolio",
      badge: "Likuidasi"
    }
  ];

  // 3. Support Sub-modules
  const supportModules = [
    {
      id: "sdm",
      title: "Sumber Daya Manusia (SDM)",
      subtitle: "Demografi Pegawai, Talent Snapshot, Presensi & Jam Belajar",
      icon: Users,
      stat: "1,240 Pegawai",
      badge: "Kehadiran 98%"
    },
    {
      id: "keuangan",
      title: "Keuangan & Anggaran",
      subtitle: "Realisasi Pagu, Penyerapan Anggaran & Cashflow Institusi",
      icon: Receipt,
      stat: "68.4% Realisasi",
      badge: "On Target"
    },
    {
      id: "hukum",
      title: "Hukum & Litigasi",
      subtitle: "Status Perkara, Advokasi, Kedudukan Hukum & Sengketa",
      icon: Scale,
      stat: "86 Perkara Total",
      badge: "Win Rate 90.5%"
    }
  ];

  const filterBySearch = (items: typeof bankModules) => {
    if (!searchQuery.trim()) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredBank = filterBySearch(bankModules);
  const filteredAsuransi = filterBySearch(asuransiModules);
  const filteredSupport = filterBySearch(supportModules);

  const showBank = (selectedCategory === "semua" || selectedCategory === "bank") && filteredBank.length > 0;
  const showAsuransi = (selectedCategory === "semua" || selectedCategory === "asuransi") && filteredAsuransi.length > 0;
  const showSupport = (selectedCategory === "semua" || selectedCategory === "support") && filteredSupport.length > 0;

  return (
    <div className="flex flex-col min-h-full bg-[#F6F7F9] pb-32 md:pb-12 relative w-full items-center font-sans text-[#172033]">
      <div className="w-full max-w-5xl">
        <AppBar 
          title="Sistem Informasi & Management" 
          showBack 
          onSearchChange={(q) => setSearchQuery(q)}
          searchValue={searchQuery}
          searchPlaceholder="Cari modul sistem informasi & management..."
        />

        <div className="px-4 sm:px-6 md:px-8 pt-4 space-y-5">
          
          {/* Header Subtitle Banner (Deep Orange Gradient like Home) */}
          <div className="bg-gradient-to-r from-[#D95E15] via-[#C44E0E] to-[#A83D05] text-white p-5 sm:p-6 md:p-7 rounded-[22px] border border-[#EA6722]/30 shadow-[0_4px_16px_rgba(201,71,7,0.18)] relative overflow-hidden">
            {/* Subtle Ambient Decorative Glow */}
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/25">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                Sistem Informasi & Management LPS
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Sistem Informasi & Management
              </h1>
              <p className="text-xs sm:text-sm text-white/85 max-w-xl font-normal leading-relaxed">
                Akses terpadu analitik Penjaminan Bank, Penjaminan Asuransi (UU P2SK), dan Layanan Tata Kelola LPS.
              </p>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all flex-shrink-0 whitespace-nowrap cursor-pointer",
                  selectedCategory === cat.id
                    ? "bg-[#172033] text-white shadow-xs"
                    : "bg-white text-[#667085] hover:text-[#172033] border border-[#EAECF0] hover:bg-[#F9FAFB]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Result Feedback if searching */}
          {searchQuery.trim() && (
            <div className="flex items-center justify-between text-xs text-[#667085] px-1">
              <span>Hasil pencarian untuk: &ldquo;<strong className="text-[#172033]">{searchQuery}</strong>&rdquo;</span>
              <button 
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#F56621] font-semibold hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}

          {/* CATEGORY 1: PENJAMINAN BANK */}
          {showBank && (
            <section aria-label="Penjaminan Bank" className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F56621]" />
                  <h2 className="text-[15px] sm:text-[17px] font-bold text-[#172033] tracking-tight">
                    Penjaminan Bank
                  </h2>
                </div>
                <span className="text-[11px] font-medium text-[#667085]">{filteredBank.length} Modul</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredBank.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={`/dashboard/${item.id}`}
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#EAECF0] shadow-2xs hover:border-[#F56621]/40 hover:shadow-xs transition-all duration-200 group flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-[#F6F7F9] text-[#172033] flex items-center justify-center flex-shrink-0 border border-[#EAECF0] group-hover:bg-[#172033] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" strokeWidth={1.8} />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-[13.5px] font-bold text-[#172033] group-hover:text-[#F56621] transition-colors leading-snug">
                              {item.title}
                            </h3>
                            <span className="text-[9.5px] font-semibold text-[#344054] bg-[#F2F4F7] border border-[#EAECF0] px-1.5 py-0.5 rounded leading-none">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#667085] line-clamp-1 font-normal">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-[#F6F7F9] flex items-center justify-center text-[#98A2B3] group-hover:bg-[#F56621] group-hover:text-white transition-colors flex-shrink-0">
                        <ArrowRight size={13} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* CATEGORY 2: PENJAMINAN ASURANSI */}
          {showAsuransi && (
            <section aria-label="Penjaminan Asuransi" className="space-y-3 pt-1">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#12B76A]" />
                  <h2 className="text-[15px] sm:text-[17px] font-bold text-[#172033] tracking-tight">
                    Penjaminan Asuransi (Program Penjaminan Polis)
                  </h2>
                </div>
                <span className="text-[11px] font-medium text-[#667085]">{filteredAsuransi.length} Modul</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredAsuransi.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={`/dashboard/${item.id}`}
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#EAECF0] shadow-2xs hover:border-[#12B76A]/40 hover:shadow-xs transition-all duration-200 group flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-[#F6F7F9] text-[#172033] flex items-center justify-center flex-shrink-0 border border-[#EAECF0] group-hover:bg-[#12B76A] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" strokeWidth={1.8} />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-[13.5px] font-bold text-[#172033] group-hover:text-[#12B76A] transition-colors leading-snug">
                              {item.title}
                            </h3>
                            <span className="text-[9.5px] font-semibold text-[#027A48] bg-[#ECFDF3] border border-[#A6F4C5] px-1.5 py-0.5 rounded leading-none">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#667085] line-clamp-1 font-normal">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-[#F6F7F9] flex items-center justify-center text-[#98A2B3] group-hover:bg-[#12B76A] group-hover:text-white transition-colors flex-shrink-0">
                        <ArrowRight size={13} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* CATEGORY 3: SUPPORT & TATA KELOLA */}
          {showSupport && (
            <section aria-label="Support" className="space-y-3 pt-1">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6172F3]" />
                  <h2 className="text-[15px] sm:text-[17px] font-bold text-[#172033] tracking-tight">
                    Support & Tata Kelola
                  </h2>
                </div>
                <span className="text-[11px] font-medium text-[#667085]">{filteredSupport.length} Modul</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSupport.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={`/dashboard/${item.id}`}
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#EAECF0] shadow-2xs hover:border-[#6172F3]/40 hover:shadow-xs transition-all duration-200 group flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-[#F6F7F9] text-[#172033] flex items-center justify-center flex-shrink-0 border border-[#EAECF0] group-hover:bg-[#6172F3] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" strokeWidth={1.8} />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-[13.5px] font-bold text-[#172033] group-hover:text-[#6172F3] transition-colors leading-snug">
                              {item.title}
                            </h3>
                            <span className="text-[9.5px] font-semibold text-[#3538CD] bg-[#EEF4FF] border border-[#C7D7FE] px-1.5 py-0.5 rounded leading-none">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#667085] line-clamp-1 font-normal">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-[#F6F7F9] flex items-center justify-center text-[#98A2B3] group-hover:bg-[#6172F3] group-hover:text-white transition-colors flex-shrink-0">
                        <ArrowRight size={13} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Empty State if Search yields no match */}
          {searchQuery.trim() && !showBank && !showAsuransi && !showSupport && (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#EAECF0] space-y-2">
              <p className="text-sm font-bold text-[#172033]">Tidak ada modul yang cocok</p>
              <p className="text-xs text-[#667085]">Coba kata kunci lain seperti &quot;klaim&quot;, &quot;hukum&quot;, &quot;asuransi&quot;, atau &quot;anggaran&quot;.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
