"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * ATLAS Research Instrumentation
 * Mencatat event penggunaan prototype untuk membuktikan Key Metrics Lean Canvas:
 * 1. TAT Acceleration  -> durasi approval_open -> approval_done
 * 2. Partisipasi Grup  -> daftar partisipan per unit kerja
 * 3. Sentralisasi >=3 jenis approval -> distinct jenis pada approval_done
 * 4. Channel Shifting  -> % approval yang dieksekusi dari perangkat mobile
 */

export type EventType =
  | "session_start"
  | "auth_success"
  | "approval_open"
  | "approval_done"
  | "approval_return"
  | "ai_question"
  | "dashboard_view"
  | "survey_submit";

export type ResearchEvent = {
  type: EventType;
  ts: number;
  device: "mobile" | "desktop";
  partisipan?: string;
  meta?: Record<string, string | number>;
};

export type Participant = {
  nama: string;
  unit: string;
  peran: "approver" | "maker";
  mulai: number;
};

export type Feedback = {
  ts: number;
  nama: string;
  unit: string;
  peran: string;
  skor: Record<string, number>;
  komentar: string;
};

export function detectDevice(): "mobile" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    ? "mobile"
    : "desktop";
}

type ResearchState = {
  unlocked: boolean;
  participant: Participant | null;
  participants: Participant[];
  skipped: boolean;
  surveyDone: boolean;
  events: ResearchEvent[];
  feedbacks: Feedback[];

  unlock: (method: "biometric" | "pin") => void;
  saveParticipant: (p: Omit<Participant, "mulai">) => void;
  skip: () => void;
  log: (type: EventType, meta?: Record<string, string | number>) => void;
  submitFeedback: (skor: Record<string, number>, komentar: string) => void;
  newSession: () => void;
  resetAll: () => void;
};

export const useResearch = create<ResearchState>()(
  persist(
    (set, get) => ({
      unlocked: false,
      participant: null,
      participants: [],
      skipped: false,
      surveyDone: false,
      events: [],
      feedbacks: [],

      unlock: (method) => {
        set({ unlocked: true });
        get().log("auth_success", { method });
      },

      saveParticipant: (p) => {
        const participant: Participant = { ...p, mulai: Date.now() };
        set((s) => ({
          participant,
          participants: [...s.participants, participant],
          skipped: false,
          surveyDone: false,
        }));
        get().log("session_start", { nama: p.nama, unit: p.unit, peran: p.peran });
      },

      skip: () => set({ skipped: true }),

      log: (type, meta) => {
        const ev: ResearchEvent = {
          type,
          ts: Date.now(),
          device: detectDevice(),
          partisipan: get().participant?.nama,
          meta,
        };
        set((s) => ({ events: [...s.events, ev] }));
      },

      submitFeedback: (skor, komentar) => {
        const p = get().participant;
        const fb: Feedback = {
          ts: Date.now(),
          nama: p?.nama ?? "Anonim",
          unit: p?.unit ?? "-",
          peran: p?.peran ?? "-",
          skor,
          komentar,
        };
        set((s) => ({ feedbacks: [...s.feedbacks, fb], surveyDone: true }));
        get().log("survey_submit");
      },

      // Sesi baru untuk responden berikutnya (data lama tetap tersimpan)
      newSession: () =>
        set({ participant: null, skipped: false, surveyDone: false, unlocked: false }),

      resetAll: () =>
        set({
          unlocked: false,
          participant: null,
          participants: [],
          skipped: false,
          surveyDone: false,
          events: [],
          feedbacks: [],
        }),
    }),
    {
      name: "atlas-research",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (typeof window === "undefined") return null;
          const val = localStorage.getItem(name);
          if (!val) return null;
          try {
            JSON.parse(val);
            return val;
          } catch {
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name, value) => {
          if (typeof window !== "undefined") {
            localStorage.setItem(name, value);
          }
        },
        removeItem: (name) => {
          if (typeof window !== "undefined") {
            localStorage.removeItem(name);
          }
        },
      })),
      partialize: (s) => ({
        participant: s.participant,
        participants: s.participants,
        skipped: s.skipped,
        surveyDone: s.surveyDone,
        events: s.events,
        feedbacks: s.feedbacks,
      }),
    }
  )
);

/* ---------- Skenario Uji ---------- */

export type ScenarioTask = {
  id: string;
  label: string;
  target: number;
  progress: number;
  done: boolean;
};

export function getScenario(events: ResearchEvent[]): ScenarioTask[] {
  const count = (t: EventType) => events.filter((e) => e.type === t).length;
  const approvals = count("approval_done");
  const ai = count("ai_question");
  const dash = count("dashboard_view");
  return [
    {
      id: "approve",
      label: "Setujui 2 dokumen di tab Persetujuan (geser untuk setuju)",
      target: 2,
      progress: Math.min(approvals, 2),
      done: approvals >= 2,
    },
    {
      id: "ai",
      label: "Tanyakan 1 hal ke Asisten AI (tombol ✨)",
      target: 1,
      progress: Math.min(ai, 1),
      done: ai >= 1,
    },
    {
      id: "dashboard",
      label: "Buka tab Dashboard untuk cek visibilitas unit kerja",
      target: 1,
      progress: Math.min(dash, 1),
      done: dash >= 1,
    },
  ];
}

/* ---------- Ringkasan Metrik (Key Metrics Lean Canvas) ---------- */

export type MetricsSummary = {
  totalApproval: number;
  avgTatMs: number | null;
  jenisApproval: string[];
  aiQuestions: number;
  mobileApprovalPct: number | null;
  partisipanCount: number;
  unitCount: number;
  feedbackAvg: Record<string, number>;
};

export function computeMetrics(
  events: ResearchEvent[],
  participants: Participant[],
  feedbacks: Feedback[]
): MetricsSummary {
  const dones = events.filter((e) => e.type === "approval_done");
  const durs = dones
    .map((e) => Number(e.meta?.durasiMs))
    .filter((d) => !isNaN(d) && d > 0);
  const jenis = [...new Set(dones.map((e) => String(e.meta?.jenis ?? "-")))];
  const mobile = dones.filter((e) => e.device === "mobile").length;

  const feedbackAvg: Record<string, number> = {};
  if (feedbacks.length) {
    const keys = Object.keys(feedbacks[0].skor);
    for (const k of keys) {
      const vals = feedbacks.map((f) => f.skor[k]).filter((v) => v > 0);
      feedbackAvg[k] = vals.length
        ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
        : 0;
    }
  }

  return {
    totalApproval: dones.length,
    avgTatMs: durs.length
      ? Math.round(durs.reduce((a, b) => a + b, 0) / durs.length)
      : null,
    jenisApproval: jenis,
    aiQuestions: events.filter((e) => e.type === "ai_question").length,
    mobileApprovalPct: dones.length
      ? Math.round((mobile / dones.length) * 100)
      : null,
    partisipanCount: participants.length,
    unitCount: [...new Set(participants.map((p) => p.unit.trim().toLowerCase()))]
      .length,
    feedbackAvg,
  };
}

export function formatDur(ms: number): string {
  if (ms < 60000) return `${Math.round(ms / 1000)} detik`;
  return `${Math.round((ms / 60000) * 10) / 10} menit`;
}
