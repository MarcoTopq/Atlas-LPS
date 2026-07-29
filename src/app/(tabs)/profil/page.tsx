"use client";

import AppBar from "@/components/AppBar";
import { User, Mail, Building, Briefcase, ShieldCheck, FileText, Lock, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProfilPage() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const profileInfo = [
    { label: "Nama Lengkap", value: "Dian Arief Risdianto", icon: User },
    { label: "Email Kedinasan", value: "dian.risdianto@lps.go.id", icon: Mail },
    { label: "Jabatan", value: "Sub Manager", icon: Briefcase },
    { label: "Divisi", value: "Divisi Pengembangan Aps Fungsi Pendukung", icon: Building },
    { label: "Grup Unit", value: "Grup Pengembangan & Operasional TI", icon: Building },
    { label: "Status Pegawai", value: "Pegawai Tetap (Active Directory SSO)", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-[#F8FAFC] pb-32 md:pb-12 relative w-full items-center">
      <div className="w-full">
        <AppBar title="Profil Pegawai" showBack />

        <div className="px-5 md:px-8 mt-4 space-y-6">
          {/* Header Avatar Card */}
          <div className="bg-gradient-to-br from-navy to-navy-2 rounded-[28px] md:rounded-[36px] p-6 md:p-8 text-white shadow-md flex items-center gap-5 relative overflow-hidden">
            <div className="w-16 md:w-20 h-16 md:h-20 rounded-2xl md:rounded-[22px] bg-orange/20 border-2 border-orange/40 flex items-center justify-center text-white text-2xl md:text-3xl font-extrabold flex-shrink-0 shadow-inner">
              D
            </div>
            <div>
              <h2 className="text-[18px] md:text-[24px] font-bold text-white tracking-tight">Dian Arief Risdianto</h2>
              <p className="text-[12.5px] md:text-[15px] font-semibold text-orange mt-0.5">Sub Manager</p>
              <p className="text-[11.5px] md:text-[13.5px] text-slate-300 mt-1">Grup Pengembangan & Operasional TI</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section: Data Kepegawaian */}
            <div className="bg-white rounded-[28px] md:rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-4">
              <h3 className="text-[15px] md:text-[17px] font-bold text-ink mb-2">Informasi Kepegawaian</h3>
              
              <div className="divide-y divide-slate-100">
                {profileInfo.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="py-3.5 flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                        <Icon size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-muted block mb-0.5">{item.label}</span>
                        <span className="text-[13px] md:text-[14px] font-bold text-ink leading-snug">{item.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section: Keamanan & Privasi + Logout */}
            <div className="space-y-6">
              <div className="bg-white rounded-[28px] md:rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-5">
                <h3 className="text-[15px] md:text-[17px] font-bold text-ink">Keamanan & Biometrik</h3>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Lock size={18} />
                    </div>
                    <div>
                      <span className="text-[13.5px] font-bold text-ink block">Otentikasi Biometrik</span>
                      <span className="text-[11px] font-medium text-muted">Face ID / Sidik Jari SSO</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setBiometricEnabled(!biometricEnabled)}
                    className={cn(
                      "w-11 h-6 rounded-full p-1 transition-colors relative cursor-pointer",
                      biometricEnabled ? "bg-emerald-500" : "bg-slate-200"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm",
                        biometricEnabled ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>

                <Link href="/privasi" className="flex items-center justify-between py-2 group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <FileText size={18} />
                    </div>
                    <div>
                      <span className="text-[13.5px] font-bold text-ink block group-hover:text-orange transition-colors">Pengaturan Privasi No HP</span>
                      <span className="text-[11px] font-medium text-muted">Atur visibilitas nomor HP di direktori</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-orange transition-colors" />
                </Link>
              </div>

              {/* Logout Button */}
              <Link href="/login" className="w-full bg-red-50 hover:bg-red-100/80 border border-red-100 text-red-600 py-4 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 transition-colors shadow-xs">
                <LogOut size={18} />
                Keluar dari ATLAS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
