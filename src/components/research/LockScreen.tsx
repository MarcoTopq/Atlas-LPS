"use client";

import { useState } from "react";
import { Fingerprint, Delete, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResearch } from "@/lib/research";

export default function LockScreen() {
  const unlock = useResearch((s) => s.unlock);
  const skip = useResearch((s) => s.skip);
  const [pin, setPin] = useState("");
  const [mode, setMode] = useState<"pilih" | "pin" | "scanning">("pilih");
  const [success, setSuccess] = useState(false);

  const finish = (method: "biometric" | "pin") => {
    setSuccess(true);
    skip();
    setTimeout(() => unlock(method), 600);
  };

  const startBiometric = () => {
    setMode("scanning");
    setTimeout(() => finish("biometric"), 1400);
  };

  const pressKey = (k: string) => {
    if (k === "del") {
      setPin((p) => p.slice(0, -1));
      return;
    }
    const next = (pin + k).slice(0, 6);
    setPin(next);
    if (next.length === 6) {
      setTimeout(() => finish("pin"), 300);
    }
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-navy to-navy-2 flex flex-col items-center justify-between py-12 px-6 text-white overflow-y-auto">
      {/* Brand */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-orange to-orange-d flex items-center justify-center shadow-[0_8px_30px_rgba(242,110,34,0.4)] mb-4">
          <span className="text-2xl font-extrabold tracking-tight">A</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">ATLAS</h1>
        <p className="text-[12px] text-white/60 font-medium mt-1">
          All-in-one Task & Knowledge Assistance System
        </p>
        <div className="mt-3 flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold border border-white/10">
          <ShieldCheck size={12} className="text-emerald-400" />
          Perimeter Aman LPS · Zero Trust
        </div>
      </div>

      {/* Auth Area */}
      <div className="flex flex-col items-center w-full max-w-[320px]">
        {success ? (
          <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <ShieldCheck size={36} className="text-emerald-400" />
            </div>
            <p className="text-sm font-bold">Identitas Terverifikasi</p>
            <p className="text-[11px] text-white/60">Masuk ke ruang kerja Anda…</p>
          </div>
        ) : mode === "scanning" ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-orange/60 animate-ping"></div>
              <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Fingerprint size={40} className="text-orange animate-pulse" />
              </div>
            </div>
            <p className="text-sm font-bold">Memindai biometrik…</p>
            <p className="text-[11px] text-white/60">Terintegrasi Active Directory LPS</p>
          </div>
        ) : mode === "pin" ? (
          <div className="flex flex-col items-center w-full">
            <p className="text-sm font-bold mb-1">Masukkan PIN ATLAS</p>
            <p className="text-[10px] text-white/50 mb-5">
              Mode demo: 6 digit apa pun diterima
            </p>
            <div className="flex gap-3 mb-7">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border transition-all",
                    i < pin.length
                      ? "bg-orange border-orange scale-110"
                      : "bg-transparent border-white/30"
                  )}
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 w-full">
              {keys.map((k, i) =>
                k === "" ? (
                  <div key={i}></div>
                ) : (
                  <button
                    key={i}
                    onClick={() => pressKey(k)}
                    className="h-14 rounded-2xl bg-white/10 border border-white/10 text-lg font-bold active:bg-orange/40 active:scale-95 transition-all flex items-center justify-center"
                  >
                    {k === "del" ? <Delete size={20} /> : k}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setMode("pilih")}
              className="mt-5 text-[12px] font-bold text-white/60"
            >
              Kembali
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full gap-4">
            <button
              onClick={startBiometric}
              className="w-full bg-gradient-to-r from-orange to-orange-d py-4 rounded-2xl font-bold text-[14px] shadow-[0_8px_24px_rgba(242,110,34,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Fingerprint size={20} />
              Masuk dengan Biometrik
            </button>
            <button
              onClick={() => setMode("pin")}
              className="w-full bg-white/10 border border-white/15 py-4 rounded-2xl font-bold text-[14px] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              Masuk dengan PIN
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-[10px] text-white/40 font-medium text-center leading-relaxed">
        Autentikasi berlapis sekelas enterprise · Single Sign-On Active Directory
        <br />
        Prototype uji — bukan sistem produksi
      </p>
    </div>
  );
}
