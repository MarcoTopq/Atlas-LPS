"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Circle, ClipboardList, X, MessageSquareHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResearch, getScenario } from "@/lib/research";
import FeedbackSurvey from "./FeedbackSurvey";

export default function ScenarioTracker() {
  const events = useResearch((s) => s.events);
  const participant = useResearch((s) => s.participant);
  const surveyDone = useResearch((s) => s.surveyDone);

  const [open, setOpen] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const autoOpened = useRef(false);

  const scenario = getScenario(events);
  const doneCount = scenario.filter((t) => t.done).length;
  const allDone = doneCount === scenario.length;

  // Buka survei otomatis satu kali saat semua tugas selesai
  useEffect(() => {
    if (allDone && !surveyDone && !autoOpened.current) {
      autoOpened.current = true;
      setTimeout(() => setShowSurvey(true), 900);
    }
  }, [allDone, surveyDone]);

  if (!participant) return null;

  return (
    <>
      {/* Floating progress chip */}
      {!surveyDone && (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-5 bottom-28 md:bottom-8 md:left-auto md:right-8 z-[60] bg-navy text-white pl-3 pr-4 py-2.5 rounded-full shadow-[0_8px_24px_rgba(18,41,77,0.35)] flex items-center gap-2 active:scale-95 transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-orange flex items-center justify-center">
            <ClipboardList size={14} />
          </div>
          <span className="text-[12px] font-bold">
            Misi {doneCount}/{scenario.length}
          </span>
        </button>
      )}

      {/* Checklist sheet */}
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)}></div>
          <div className="relative bg-white w-full md:max-w-[420px] rounded-t-[22px] md:rounded-[22px] p-6 pb-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-extrabold text-ink">Misi Uji Coba</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-muted"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {scenario.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-2xl border",
                    t.done ? "bg-ok-soft border-ok/20" : "bg-slate-50 border-slate-100"
                  )}
                >
                  {t.done ? (
                    <CheckCircle2 size={20} className="text-ok flex-shrink-0" />
                  ) : (
                    <Circle size={20} className="text-slate-300 flex-shrink-0" />
                  )}
                  <p
                    className={cn(
                      "text-[13px] font-semibold leading-snug flex-1",
                      t.done ? "text-ok" : "text-ink"
                    )}
                  >
                    {t.label}
                  </p>
                  <span className="text-[11px] font-bold text-muted">
                    {t.progress}/{t.target}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setOpen(false);
                setShowSurvey(true);
              }}
              className={cn(
                "mt-5 w-full py-3.5 rounded-2xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all",
                allDone
                  ? "bg-gradient-to-r from-orange to-orange-d text-white shadow-[0_8px_24px_rgba(242,110,34,0.35)]"
                  : "bg-slate-100 text-muted"
              )}
            >
              <MessageSquareHeart size={16} />
              {allDone ? "Isi Survei Penilaian" : "Isi survei lebih awal"}
            </button>
          </div>
        </div>
      )}

      {showSurvey && <FeedbackSurvey onClose={() => setShowSurvey(false)} />}
    </>
  );
}
