"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fingerprint, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResearch } from "@/lib/research";

export default function LoginPage() {
  const router = useRouter();
  const unlock = useResearch((s) => s.unlock);
  const skip = useResearch((s) => s.skip);
  const [mode, setMode] = useState<"pilih" | "pin" | "scanning">("pilih");
  const [success, setSuccess] = useState(false);
  const [pin, setPin] = useState("");

  const finish = (method: "biometric" | "pin" = "biometric") => {
    setSuccess(true);
    unlock(method);
    skip();
    setTimeout(() => {
      router.push("/home");
    }, 600);
  };

  const startBiometric = () => {
    setMode("scanning");
    setTimeout(() => finish("biometric"), 1000);
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
    <div className="min-h-dvh bg-gradient-to-b from-[#12294D] to-[#1B355E] flex flex-col items-center justify-between py-12 px-6 text-white w-full max-w-[430px] mx-auto relative overflow-hidden">
      {/* Brand */}
      <div className="flex flex-col items-center mt-8 space-y-3">
        <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-orange to-[#D95E15] flex items-center justify-center shadow-[0_10px_30px_rgba(242,110,34,0.4)]">
          <span className="text-3xl font-extrabold text-white tracking-tight">A</span>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">ATLAS</h1>
          <p className="text-[12px] text-slate-300 font-medium mt-1">
            One LPS Mobile Assistant
          </p>
        </div>
        <div className="mt-2 flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border border-white/15">
          <ShieldCheck size={14} className="text-emerald-400" />
          Perimeter Aman LPS · Zero Trust
        </div>
      </div>

      {/* Auth Area */}
      <div className="flex flex-col items-center w-full max-w-[320px] my-auto">
        {success ? (
          <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <CheckCircle2 size={42} className="text-emerald-400" />
            </div>
            <p className="text-[16px] font-bold text-white">Autentikasi Berhasil</p>
            <p className="text-[12px] text-slate-300">Mengalihkan ke Beranda ATLAS...</p>
          </div>
        ) : mode === "scanning" ? (
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-orange/60 animate-ping"></div>
              <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
                <Fingerprint size={48} className="text-orange animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-[15px] font-bold text-white">Memindai Biometrik / Face ID...</p>
              <p className="text-[11.5px] text-slate-300 mt-1">Single Sign-On Active Directory LPS</p>
            </div>
          </div>
        ) : mode === "pin" ? (
          <div className="flex flex-col items-center w-full">
            <p className="text-[15px] font-bold text-white mb-1">Masukkan PIN ATLAS</p>
            <p className="text-[11px] text-slate-300 mb-6">
              Mode demo: 6 digit PIN apa saja
            </p>
            <div className="flex gap-3 mb-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border transition-all duration-200",
                    i < pin.length
                      ? "bg-orange border-orange scale-110 shadow-[0_0_10px_rgba(242,110,34,0.6)]"
                      : "bg-transparent border-white/30"
                  )}
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3.5 w-full">
              {keys.map((k, i) =>
                k === "" ? (
                  <div key={i}></div>
                ) : (
                  <button
                    key={i}
                    onClick={() => pressKey(k)}
                    className="h-14 rounded-2xl bg-white/10 border border-white/10 text-lg font-bold text-white active:bg-orange/40 active:scale-95 transition-all flex items-center justify-center"
                  >
                    {k === "del" ? "⌫" : k}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setMode("pilih")}
              className="mt-6 text-[12.5px] font-bold text-slate-300 hover:text-white transition-colors"
            >
              Kembali
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full gap-4">
            <button
              onClick={startBiometric}
              className="w-full bg-gradient-to-r from-orange to-[#D95E15] py-4 rounded-2xl font-bold text-[14.5px] text-white shadow-[0_8px_24px_rgba(242,110,34,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Fingerprint size={22} />
              Masuk dengan Biometrik
            </button>
            <button
              onClick={() => setMode("pin")}
              className="w-full bg-white/10 border border-white/15 py-4 rounded-2xl font-bold text-[14.5px] text-white hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Lock size={20} />
              Masuk dengan PIN
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-[11px] text-slate-400 font-medium text-center leading-relaxed mb-4">
        LPS Active Directory SSO · Zero Trust Network Access
      </p>
    </div>
  );
}
