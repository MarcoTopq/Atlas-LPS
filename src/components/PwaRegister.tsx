"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Unregister any stale service workers on localhost to prevent stale cache during development
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      } else {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("ATLAS Service Worker registered:", reg.scope);
          })
          .catch((err) => {
            console.error("ATLAS Service Worker registration failed:", err);
          });
      }
    }

    // Catch BeforeInstallPrompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted PWA installation");
    }
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  if (!showInstallBanner) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px] bg-navy text-white p-3.5 rounded-2xl shadow-xl border border-orange/40 flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center text-orange flex-shrink-0 font-black text-sm">
          LPS
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-white leading-tight">Install ATLAS App</h4>
          <p className="text-[11px] text-slate-300">Tambahkan ke Layar Utama</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="bg-orange hover:bg-orange-d text-white font-bold text-[11.5px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
        >
          <Download size={14} /> Install
        </button>
        <button
          onClick={() => setShowInstallBanner(false)}
          className="text-slate-400 hover:text-white p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
