"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Timer,
  Layers,
  Smartphone,
  Users,
  Sparkles,
  Download,
  RotateCcw,
  UserPlus,
  MessageSquareQuote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useResearch, computeMetrics, formatDur } from "@/lib/research";

const Q_LABEL: Record<string, string> = {
  mudah: "Mudah digunakan",
  cepat: "Lebih cepat dari cara sekarang",
  ai: "AI membantu",
  adopsi: "Mau memakai jika dirilis",
};

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function RisetPage() {
  const { events, participants, feedbacks, newSession, resetAll } = useResearch();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const m = computeMetrics(events, participants, feedbacks);

  const exportJSON = () =>
    download(
      `atlas-riset-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify({ participants, events, feedbacks, ringkasan: m }, null, 2),
      "application/json"
    );

  const exportCSV = () => {
    const rows = [
      ["ts", "waktu", "tipe", "device", "partisipan", "meta"],
      ...events.map((e) => [
        String(e.ts),
        new Date(e.ts).toLocaleString("id-ID"),
        e.type,
        e.device,
        e.partisipan ?? "",
        JSON.stringify(e.meta ?? {}),
      ]),
    ];
    download(
      `atlas-events-${new Date().toISOString().slice(0, 10)}.csv`,
      rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n"),
      "text/csv"
    );
  };

  const metricCards = [
    {
      icon: Timer,
      label: "Rata-rata waktu eksekusi approval di ATLAS",
      value: m.avgTatMs ? formatDur(m.avgTatMs) : "—",
      target: "Target canvas: TAT turun 70% dari baseline sistem eksisting",
      note: `${m.totalApproval} approval tereksekusi`,
    },
    {
      icon: Layers,
      label: "Jenis approval tersentralisasi",
      value: `${m.jenisApproval.length} jenis`,
      target: "Target canvas: minimal 3 jenis dalam satu ekosistem",
      note: m.jenisApproval.join(", ") || "belum ada",
      ok: m.jenisApproval.length >= 3,
    },
    {
      icon: Smartphone,
      label: "Approval dieksekusi dari perangkat mobile",
      value: m.mobileApprovalPct !== null ? `${m.mobileApprovalPct}%` : "—",
      target: "Target canvas (Channel Shifting): > 60% via mobile tanpa VPN",
      ok: (m.mobileApprovalPct ?? 0) > 60,
    },
    {
      icon: Users,
      label: "Partisipan uji",
      value: `${m.partisipanCount} orang · ${m.unitCount} unit`,
      target: "Target canvas: partisipasi 50% grup di semester pertama",
    },
    {
      icon: Sparkles,
      label: "Pertanyaan ke Asisten AI",
      value: `${m.aiQuestions}`,
      target: "Indikator adopsi AI Knowledge Hub",
    },
  ];

  return (
    <div className="min-h-dvh bg-[#F8FAFC] pb-16">
      <div className="max-w-[700px] mx-auto px-5 pt-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/home"
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-ink"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-[20px] font-extrabold text-ink tracking-tight">Riset ATLAS</h1>
            <p className="text-[12px] font-medium text-muted">
              Bukti Key Metrics Lean Canvas · data lokal perangkat ini
            </p>
          </div>
        </div>

        <p className="text-[11px] font-medium text-muted bg-warn-soft border border-warn/20 text-warn rounded-xl px-3 py-2 mt-3 mb-6">
          Halaman internal tim — jangan tunjukkan ke responden saat uji berlangsung.
        </p>

        {/* Metric cards */}
        <div className="space-y-3">
          {metricCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-[20px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-start gap-4"
              >
                <div
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                    c.ok === undefined
                      ? "bg-navy/5 text-navy"
                      : c.ok
                      ? "bg-ok-soft text-ok"
                      : "bg-orange/10 text-orange"
                  )}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-muted leading-snug">{c.label}</p>
                  <p className="text-[20px] font-extrabold text-ink my-0.5">{c.value}</p>
                  {c.note && (
                    <p className="text-[11px] font-medium text-muted truncate">{c.note}</p>
                  )}
                  <p className="text-[10px] font-bold text-orange/80 mt-1">{c.target}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback */}
        <h2 className="text-[15px] font-extrabold text-ink mt-8 mb-3 flex items-center gap-2">
          <MessageSquareQuote size={16} className="text-orange" />
          Feedback Responden ({feedbacks.length})
        </h2>
        {feedbacks.length === 0 ? (
          <p className="text-[12px] font-medium text-muted bg-white rounded-2xl p-4">
            Belum ada survei masuk.
          </p>
        ) : (
          <>
            <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-3">
              <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3">
                Rata-rata skor (1–5)
              </p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(m.feedbackAvg).map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[11px] font-medium text-muted">{Q_LABEL[k] ?? k}</p>
                    <p
                      className={cn(
                        "text-[18px] font-extrabold",
                        v >= 4 ? "text-ok" : v >= 3 ? "text-warn" : "text-danger"
                      )}
                    >
                      {v.toFixed(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {feedbacks.map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[12px] font-bold text-ink">
                      {f.nama} · <span className="text-muted font-medium">{f.unit}</span>
                    </p>
                    <span className="text-[10px] font-medium text-light">
                      {new Date(f.ts).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-muted">
                    {Object.entries(f.skor)
                      .map(([k, v]) => `${Q_LABEL[k] ?? k}: ${v}`)
                      .join(" · ")}
                  </p>
                  {f.komentar && (
                    <p className="text-[12px] font-medium text-ink mt-2 bg-slate-50 rounded-xl p-3 leading-relaxed">
                      “{f.komentar}”
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <button
            onClick={exportJSON}
            className="bg-navy text-white py-3.5 rounded-2xl font-bold text-[12px] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Download size={15} /> Ekspor JSON
          </button>
          <button
            onClick={exportCSV}
            className="bg-navy text-white py-3.5 rounded-2xl font-bold text-[12px] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Download size={15} /> Ekspor CSV
          </button>
          <button
            onClick={newSession}
            className="bg-white border border-orange text-orange py-3.5 rounded-2xl font-bold text-[12px] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <UserPlus size={15} /> Responden Berikutnya
          </button>
          <button
            onClick={() => {
              if (confirm("Hapus SEMUA data riset di perangkat ini?")) resetAll();
            }}
            className="bg-white border border-danger text-danger py-3.5 rounded-2xl font-bold text-[12px] flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <RotateCcw size={15} /> Reset Semua
          </button>
        </div>

        <p className="text-[10px] font-medium text-light mt-4 leading-relaxed">
          “Responden Berikutnya” menyimpan data lama & memulai sesi baru (lock screen + onboarding
          ulang). Ekspor data dulu sebelum reset. Data tersimpan di localStorage — tiap perangkat
          responden menyimpan datanya sendiri; minta responden mengirim survei via WhatsApp, atau
          ekspor langsung dari perangkat mereka.
        </p>
      </div>
    </div>
  );
}
