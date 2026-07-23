"use client";

import { useEffect, useState } from "react";
import { Fingerprint, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Konfirmasi identitas sebelum eksekusi persetujuan.
 * Bukti klaim canvas: "Secure Borderless Approval — pengamanan berlapis
 * (Autentikasi PIN/Biometrik dan Secure API)".
 */
export default function ApprovalAuth({
  onSuccess,
  onCancel,
}: {
  onSuccess: (method: "biometric" | "pin") => void;
  onCancel: () => void;
}) {
  const [mode, setMode] = useState<"scan" | "pin" | "ok">("scan");
  const [pin, setPin] = useState("");

  // Auto-sukses pemindaian biometrik (mock)
  useEffect(() => {
    if (mode !== "scan") return;
    const t = setTimeout(() => {
      setMode("ok");
      setTimeout(() => onSuccess("biometric"), 700);
    }, 1500);
    return () => clearTimeout(t);
  }, [mode, onSuccess]);

  const pressKey = (k: string) => {
    if (k === "del") return setPin((p) => p.slice(0, -1));
    const next = (pin + k).slice(0, 6);
    setPin(next);
    if (next.length === 6) {
      setMode("ok");
      setTimeout(() => onSuccess("pin"), 700);
    }
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative bg-white w-full md:max-w-[400px] rounded-t-[22px] md:rounded-[22px] p-6 pb-10 animate-in slide-in-from-bottom duration-300 flex flex-col items-center text-center">
        {mode === "ok" ? (
          <>
            <div className="w-20 h-20 rounded-full bg-ok-soft flex items-center justify-center mb-4 animate-in zoom-in">
              <ShieldCheck size={36} className="text-ok" />
            </div>
            <h3 className="text-[16px] font-extrabold text-ink">Identitas Terverifikasi</h3>
            <p className="text-[12px] font-medium text-muted mt-1">
              Persetujuan dikirim via Secure API…
            </p>
          </>
        ) : mode === "scan" ? (
          <>
            <h3 className="text-[16px] font-extrabold text-ink mb-1">Konfirmasi Persetujuan</h3>
            <p className="text-[12px] font-medium text-muted mb-6">
              Verifikasi identitas untuk melanjutkan
            </p>
            <div className="relative w-24 h-24 flex items-center justify-center mb-5">
              <div className="absolute inset-0 rounded-full border-2 border-orange/50 animate-ping"></div>
              <div className="w-20 h-20 rounded-full bg-orange/10 flex items-center justify-center">
                <Fingerprint size={40} className="text-orange animate-pulse" />
              </div>
            </div>
            <p className="text-[13px] font-bold text-ink">Memindai biometrik…</p>
            <button
              onClick={() => setMode("pin")}
              className="mt-5 text-[12px] font-bold text-orange flex items-center gap-1.5"
            >
              <Lock size={13} /> Gunakan PIN
            </button>
          </>
        ) : (
          <>
            <h3 className="text-[16px] font-extrabold text-ink mb-1">Masukkan PIN</h3>
            <p className="text-[11px] font-medium text-muted mb-5">
              Mode demo: 6 digit apa pun diterima
            </p>
            <div className="flex gap-3 mb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-3 h-3 rounded-full border transition-all",
                    i < pin.length ? "bg-orange border-orange" : "border-slate-300"
                  )}
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-[260px]">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((k, i) =>
                k === "" ? (
                  <div key={i}></div>
                ) : (
                  <button
                    key={i}
                    onClick={() => pressKey(k)}
                    className="h-12 rounded-xl bg-slate-50 border border-slate-100 text-[16px] font-bold text-ink active:bg-orange/20 active:scale-95 transition-all"
                  >
                    {k === "del" ? "⌫" : k}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
