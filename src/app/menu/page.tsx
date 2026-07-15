"use client";

import AppBar from "@/components/AppBar";
import {
  User,
  FolderLock,
  Fingerprint,
  Building2,
  Globe,
  Book,
  FileLock2,
  Info,
  ChevronRight,
  Camera
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MenuPage() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <div className="flex flex-col min-h-dvh bg-white pb-8">
      <AppBar title="Menu Lainnya" />

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <User size={32} />
            </div>
            <div className="absolute bottom-0 right-0 bg-white border border-line rounded-full p-1 shadow-sm text-ink">
              <Camera size={12} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <h2 className="text-[15px] font-bold text-ink leading-none">Dian Arief Risdianto</h2>
            <div className="border border-line rounded-lg px-3 py-2 mt-1">
              <span className="text-[13px] text-ink">Pelaksana</span>
            </div>
          </div>
        </div>

        {/* Pengaturan Akun */}
        <section>
          <h3 className="text-[14px] font-bold text-ink mb-3">Pengaturan Akun</h3>
          <div className="flex flex-col">
            <Link href="/profil" className="flex items-center justify-between py-3 border-b border-line hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-ink flex items-center justify-center">
                  <User size={18} />
                </div>
                <span className="text-[13.5px] font-bold text-ink">Profil Akun</span>
              </div>
              <ChevronRight size={18} className="text-light" />
            </Link>

            <Link href="#" className="flex items-center justify-between py-3 border-b border-line hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-ink flex items-center justify-center">
                  <FolderLock size={18} />
                </div>
                <span className="text-[13.5px] font-bold text-ink">Dokumen</span>
              </div>
              <ChevronRight size={18} className="text-light" />
            </Link>

            <div className="flex items-center justify-between py-3 border-b border-line">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-ink flex items-center justify-center">
                  <Fingerprint size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13.5px] font-bold text-ink">Biometrik</span>
                  <span className="text-[10px] text-muted">Akses fitur dan aplikasi lebih cepat</span>
                </div>
              </div>
              {/* Toggle Switch */}
              <button
                onClick={() => setBiometricEnabled(!biometricEnabled)}
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-colors relative border",
                  biometricEnabled ? "bg-white border-line" : "bg-slate-200 border-transparent"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full transition-all duration-300",
                  biometricEnabled ? "translate-x-6 bg-orange" : "bg-white"
                )} />
              </button>
            </div>
          </div>
        </section>

        {/* Info Lainnya */}
        <section>
          <h3 className="text-[14px] font-bold text-ink mb-3">Info Lainnya</h3>
          <div className="flex flex-col">
            <Link href="/direktori" className="flex items-center justify-between py-3 border-b border-line hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-ink flex items-center justify-center">
                  <Building2 size={18} />
                </div>
                <span className="text-[13.5px] font-bold text-ink">Daftar Pegawai</span>
              </div>
              <ChevronRight size={18} className="text-light" />
            </Link>

            <Link href="#" className="flex items-center justify-between py-3 border-b border-line hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-ink flex items-center justify-center">
                  <Globe size={18} />
                </div>
                <span className="text-[13.5px] font-bold text-ink">Bahasa</span>
              </div>
              <ChevronRight size={18} className="text-light" />
            </Link>

            <Link href="#" className="flex items-center justify-between py-3 border-b border-line hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-ink flex items-center justify-center">
                  <Book size={18} />
                </div>
                <span className="text-[13.5px] font-bold text-ink">Syarat & Ketentuan</span>
              </div>
              <ChevronRight size={18} className="text-light" />
            </Link>

            <Link href="/privasi" className="flex items-center justify-between py-3 border-b border-line hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-ink flex items-center justify-center">
                  <FileLock2 size={18} />
                </div>
                <span className="text-[13.5px] font-bold text-ink">Kebijakan Privasi</span>
              </div>
              <ChevronRight size={18} className="text-light" />
            </Link>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-ink flex items-center justify-center">
                  <Info size={18} />
                </div>
                <span className="text-[13.5px] font-bold text-ink">Versi</span>
              </div>
              <span className="text-xs text-muted">Versi 1.0.2-dev</span>
            </div>
          </div>
        </section>

        {/* Logout */}
        <section className="pt-4">
          <button className="w-full bg-danger-soft text-danger font-bold text-[14px] py-3.5 rounded-xl border border-danger/20 active:scale-[0.98] transition-transform">
            Keluar (Log Out)
          </button>
        </section>
      </div>
    </div>
  );
}
