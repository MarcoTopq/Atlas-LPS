"use client";

import { useState } from "react";
import { ClipboardList, CheckSquare, Sparkles, LayoutDashboard, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResearch } from "@/lib/research";

const UNITS = [
  "Grup Pengembangan & Operasional TI",
  "Grup Manajemen SDM",
  "Grup Keuangan",
  "Grup Hukum",
  "Grup Kepatuhan",
];

export default function Onboarding() {
  const saveParticipant = useResearch((s) => s.saveParticipant);
  const skip = useResearch((s) => s.skip);

  const [step, setStep] = useState<1 | 2>(1);
  const [nama, setNama] = useState("");
  const [unit, setUnit] = useState("");
  const [unitLain, setUnitLain] = useState("");
  const [peran, setPeran] = useState<"approver" | "maker" | null>(null);

  const unitFinal = unit === "lain" ? unitLain.trim() : unit;
  const valid = nama.trim().length >= 2 && unitFinal.length >= 2 && peran !== null;

  const tugas = [
    { icon: CheckSquare, text: "Setujui 2 dokumen di tab Persetujuan — geser untuk menyetujui" },
    { icon: Sparkles, text: "Tanyakan 1 hal ke Asisten AI (tombol ✨ di kanan bawah)" },
    { icon: LayoutDashboard, text: "Buka tab Dashboard dan lihat kondisi unit kerja Anda" },
  ];

  return (
    <div className="fixed inset-0 z-[90] bg-[#F8FAFC] flex flex-col overflow-y-auto">
      <div className="w-full max-w-[430px] mx-auto flex-1 flex flex-col px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center mb-4">
            <ClipboardList className="text-orange" size={24} />
          </div>
          <h1 className="text-[22px] font-extrabold text-ink tracking-tight leading-tight">
            {step === 1 ? "Selamat datang di Uji Coba ATLAS" : "Misi Anda hari ini"}
          </h1>
          <p className="text-[13px] font-medium text-muted mt-2 leading-relaxed">
            {step === 1
              ? "Bantu kami menguji prototype ini. Data Anda hanya dipakai untuk riset internal tim ATLAS."
              : "Selesaikan 3 tugas singkat berikut (± 3 menit), lalu beri penilaian Anda."}
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-5 flex-1">
            <div>
              <label className="text-[12px] font-bold text-ink block mb-2">Nama</label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Anda"
                className="w-full bg-white rounded-2xl py-4 px-5 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 placeholder:text-light text-ink shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              />
            </div>

            <div>
              <label className="text-[12px] font-bold text-ink block mb-2">Unit Kerja</label>
              <div className="flex flex-wrap gap-2">
                {UNITS.map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={cn(
                      "px-3.5 py-2.5 rounded-xl text-[12px] font-bold border transition-all",
                      unit === u
                        ? "bg-orange text-white border-orange shadow-[0_4px_12px_rgba(242,110,34,0.3)]"
                        : "bg-white text-muted border-slate-100"
                    )}
                  >
                    {u.replace("Grup ", "")}
                  </button>
                ))}
                <button
                  onClick={() => setUnit("lain")}
                  className={cn(
                    "px-3.5 py-2.5 rounded-xl text-[12px] font-bold border transition-all",
                    unit === "lain"
                      ? "bg-orange text-white border-orange"
                      : "bg-white text-muted border-slate-100"
                  )}
                >
                  Lainnya…
                </button>
              </div>
              {unit === "lain" && (
                <input
                  value={unitLain}
                  onChange={(e) => setUnitLain(e.target.value)}
                  placeholder="Tulis unit kerja Anda"
                  className="mt-3 w-full bg-white rounded-2xl py-4 px-5 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 placeholder:text-light text-ink shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                />
              )}
            </div>

            <div>
              <label className="text-[12px] font-bold text-ink block mb-2">Peran Anda</label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { id: "approver", label: "Approver / Pimpinan", desc: "Menyetujui dokumen" },
                    { id: "maker", label: "Maker / Pegawai", desc: "Mengajukan dokumen" },
                  ] as const
                ).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setPeran(r.id)}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-all",
                      peran === r.id
                        ? "bg-navy text-white border-navy shadow-[0_8px_20px_rgba(18,41,77,0.25)]"
                        : "bg-white text-ink border-slate-100"
                    )}
                  >
                    <span className="text-[13px] font-bold block">{r.label}</span>
                    <span
                      className={cn(
                        "text-[11px] font-medium",
                        peran === r.id ? "text-white/70" : "text-muted"
                      )}
                    >
                      {r.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 flex-1">
            {tugas.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange/10 text-orange flex items-center justify-center flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-orange uppercase tracking-wider">
                      Tugas {i + 1}
                    </span>
                    <p className="text-[13px] font-semibold text-ink leading-snug">{t.text}</p>
                  </div>
                </div>
              );
            })}
            <p className="text-[11px] text-muted font-medium leading-relaxed px-1 pt-2">
              Progres tugas terlihat di tombol mengambang. Setelah selesai, survei singkat akan
              muncul otomatis — jawaban Anda jadi bukti riset kami. 🙏
            </p>
          </div>
        )}

        {/* Footer buttons */}
        <div className="pt-8 space-y-3">
          <button
            disabled={step === 1 && !valid}
            onClick={() => {
              if (step === 1) setStep(2);
              else saveParticipant({ nama: nama.trim(), unit: unitFinal, peran: peran! });
            }}
            className={cn(
              "w-full py-4 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all",
              step === 1 && !valid
                ? "bg-slate-200 text-slate-400"
                : "bg-gradient-to-r from-orange to-orange-d text-white shadow-[0_8px_24px_rgba(242,110,34,0.35)] active:scale-95"
            )}
          >
            {step === 1 ? "Lanjut" : "Mulai Uji Coba"}
            <ChevronRight size={18} />
          </button>
          <button
            onClick={skip}
            className="w-full py-2 text-[12px] font-bold text-muted"
          >
            Lewati — jelajah bebas tanpa skenario
          </button>
        </div>
      </div>
    </div>
  );
}
