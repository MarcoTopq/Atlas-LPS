"use client";

import { useState } from "react";
import { X, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResearch } from "@/lib/research";

const QUESTIONS: { id: string; text: string }[] = [
  { id: "mudah", text: "ATLAS mudah digunakan tanpa panduan" },
  {
    id: "cepat",
    text: "Menyetujui dokumen lewat HP ini lebih cepat daripada cara saya sekarang (laptop/VPN)",
  },
  { id: "ai", text: "Jawaban Asisten AI membantu pekerjaan saya" },
  { id: "adopsi", text: "Saya akan memakai ATLAS jika dirilis resmi" },
];

export default function FeedbackSurvey({ onClose }: { onClose: () => void }) {
  const submitFeedback = useResearch((s) => s.submitFeedback);
  const participant = useResearch((s) => s.participant);

  const [skor, setSkor] = useState<Record<string, number>>({});
  const [komentar, setKomentar] = useState("");
  const [sent, setSent] = useState(false);

  const answered = QUESTIONS.every((q) => skor[q.id] > 0);

  const handleSubmit = () => {
    submitFeedback(skor, komentar.trim());
    setSent(true);
  };

  const waText = encodeURIComponent(
    `*Feedback Uji Coba ATLAS*\n` +
      `Nama: ${participant?.nama ?? "-"} (${participant?.unit ?? "-"})\n` +
      QUESTIONS.map((q) => `${q.text}: ${skor[q.id] ?? "-"}/5`).join("\n") +
      (komentar ? `\nMasukan: ${komentar}` : "")
  );

  return (
    <div className="fixed inset-0 z-[85] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white w-full md:max-w-[430px] max-h-[92dvh] overflow-y-auto rounded-t-[22px] md:rounded-[22px] p-6 pb-8 animate-in slide-in-from-bottom duration-300">
        {sent ? (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-ok-soft flex items-center justify-center mb-4">
              <CheckCircle2 size={30} className="text-ok" />
            </div>
            <h3 className="text-[17px] font-extrabold text-ink mb-2">Terima kasih! 🙏</h3>
            <p className="text-[13px] font-medium text-muted leading-relaxed mb-6 max-w-[85%]">
              Penilaian Anda tersimpan dan menjadi bukti riset tim ATLAS. Bantu kami sekali lagi
              dengan meneruskannya ke tim via WhatsApp.
            </p>
            <a
              href={`https://wa.me/?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl font-bold text-[13px] flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(37,211,102,0.3)] active:scale-95 transition-all"
            >
              <Send size={16} />
              Kirim ke Tim via WhatsApp
            </a>
            <button onClick={onClose} className="mt-3 text-[12px] font-bold text-muted py-2">
              Selesai
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[16px] font-extrabold text-ink">Penilaian Anda</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-muted"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-[12px] font-medium text-muted mb-5">
              1 = sangat tidak setuju · 5 = sangat setuju
            </p>

            <div className="space-y-5">
              {QUESTIONS.map((q) => (
                <div key={q.id}>
                  <p className="text-[13px] font-semibold text-ink mb-2.5 leading-snug">{q.text}</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setSkor((s) => ({ ...s, [q.id]: n }))}
                        className={cn(
                          "flex-1 h-11 rounded-xl text-[14px] font-bold border transition-all",
                          skor[q.id] === n
                            ? "bg-orange text-white border-orange shadow-[0_4px_12px_rgba(242,110,34,0.3)] scale-105"
                            : "bg-slate-50 text-muted border-slate-100"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <p className="text-[13px] font-semibold text-ink mb-2.5">
                  Apa yang paling perlu diperbaiki?
                </p>
                <textarea
                  value={komentar}
                  onChange={(e) => setKomentar(e.target.value)}
                  rows={3}
                  placeholder="Tulis masukan Anda…"
                  className="w-full bg-slate-50 rounded-2xl py-3.5 px-4 text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-orange/20 placeholder:text-light text-ink resize-none"
                />
              </div>
            </div>

            <button
              disabled={!answered}
              onClick={handleSubmit}
              className={cn(
                "mt-6 w-full py-4 rounded-2xl font-bold text-[14px] transition-all",
                answered
                  ? "bg-gradient-to-r from-orange to-orange-d text-white shadow-[0_8px_24px_rgba(242,110,34,0.35)] active:scale-95"
                  : "bg-slate-200 text-slate-400"
              )}
            >
              Kirim Penilaian
            </button>
          </>
        )}
      </div>
    </div>
  );
}
