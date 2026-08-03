"use client";

import { use, useState } from "react";
import AppBar from "@/components/AppBar";
import { MOCK_BERITA, Berita } from "@/lib/mock/data";
import { User, CalendarClock, ArrowLeft, Share2, Bookmark, Sparkles, ExternalLink, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetailBeritaPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const newsId = resolvedParams.id;

  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Get article from MOCK_BERITA synchronously
  const [berita] = useState<Berita>(() => {
    const foundMock = MOCK_BERITA.find((b) => b.id === newsId);
    if (foundMock) return foundMock;

    return {
      id: newsId,
      judul: "Pengumuman dan Informasi Resmi Lembaga Penjamin Simpanan",
      kategori: "Informasi LPS",
      tanggal: "03 Agu 2026",
      waktu: "09:00 WIB",
      ringkas: "Informasi resmi terkait perkembangan kebijakan dan pengumuman operasional LPS bagi seluruh pegawai dan publik.",
      penulis: "Humas & Sekretariat LPS",
      tipe: "internal",
      isi: [
        "LPS – Jakarta. Lembaga Penjamin Simpanan (LPS) terus memperkuat peran strategisnya dalam memelihara stabilitas sistem perbankan di Indonesia. Melalui pemantauan yang ketat serta penerapan tata kelola yang transparan, LPS memastikan seluruh kewajiban penjaminan simpanan nasabah dapat terpenuhi sesuai amanat Undang-Undang.",
        "Sinergi antar divisi serta kepatuhan terhadap standar operasional prosedur (SOP) menjadi kunci utama pencapaian target kerja instansi."
      ]
    };
  });

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const articleParagraphs = berita.isi && berita.isi.length > 0 ? berita.isi : [
    berita.ringkas || "Lembaga Penjamin Simpanan (LPS) secara berkesinambungan menjaga stabilitas sistem perbankan nasional melalui penjaminan simpanan dan pemantauan indikator risiko keuangan secara real-time.",
    "Dalam mendukung integrasi sistem informasi dan kecepatan layanan internal, pegawai LPS didorong untuk terus memanfaatkan platform kerja digital yang aman dan terpusat. Sinergi antar divisi serta kepatuhan terhadap standar operasional prosedur (SOP) menjadi kunci utama pencapaian target kerja instansi.",
    "Untuk informasi lebih rinci terkait pengumuman ini, pegawai maupun publik dapat mengakses repositori resmi atau menghubungi Sekretariat Lembaga LPS."
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-slate-50 relative w-full items-center font-sans pb-32 md:pb-12">
      <div className="w-full max-w-[430px] md:max-w-4xl">
        <AppBar title="Detail Berita" showBack />

        <div className="px-5 md:px-8 mt-4 space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-[28px] p-6 shadow-xs border border-slate-200/80 space-y-5">
            {/* Header Category & Actions */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-xl bg-orange/10 text-orange font-extrabold text-[11px] uppercase tracking-wider">
                {berita.kategori || (berita.tipe === "internal" ? "Berita Internal" : "Berita Eksternal")}
              </span>

              <div className="flex items-center gap-2">
                {berita.officialUrl && (
                  <a
                    href={berita.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-orange/10 text-orange hover:bg-orange/20 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                    title="Buka Halaman Resmi LPS.go.id"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">LPS.go.id</span>
                  </a>
                )}
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer relative"
                  title="Bagikan Tautan"
                >
                  <Share2 className="w-4 h-4" />
                  {copied && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-navy text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-30">
                      Tautan Disalin!
                    </span>
                  )}
                </button>
                <button className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer" title="Simpan Bookmark">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Judul Artikel */}
            <h1 className="text-[19px] md:text-[24px] font-black text-navy leading-snug tracking-tight">
              {berita.judul}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-[12px] font-medium text-slate-500 pb-4 border-b border-slate-100 flex-wrap">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <User className="w-4 h-4 text-orange" /> {berita.penulis || "Humas LPS"}
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="flex items-center gap-1.5">
                <CalendarClock className="w-4 h-4 text-slate-400" /> {berita.tanggal} {berita.waktu && `· ${berita.waktu}`}
              </span>
            </div>

            {/* Featured Image Section (Real scraped photo from LPS) */}
            {berita.gambar && !imgError && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-slate-100">
                <Image
                  src={berita.gambar}
                  alt={berita.judul}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={() => setImgError(true)}
                />
              </div>
            )}

            {/* Executive Summary Box */}
            <div className="bg-gradient-to-r from-navy to-[#1B355E] text-white p-5 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-orange font-bold text-[12px]">
                <Sparkles className="w-4 h-4" />
                <span>Ringkasan Eksekutif</span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-slate-100 font-medium">
                {berita.ringkas}
              </p>
            </div>

            {/* Article Paragraph Content Body */}
            <div className="space-y-4 text-[14px] text-slate-700 leading-relaxed pt-2">
              {articleParagraphs.map((pText, pIdx) => (
                <p key={pIdx} className="text-justify leading-relaxed">
                  {pText}
                </p>
              ))}
            </div>

            {/* Navigation Back */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <Link
                href="/berita"
                className="flex items-center gap-2 text-[13px] font-bold text-orange hover:text-orange-d transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Berita
              </Link>

              {berita.officialUrl && (
                <a
                  href={berita.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-bold text-slate-500 hover:text-navy flex items-center gap-1"
                >
                  Situs Resmi <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
