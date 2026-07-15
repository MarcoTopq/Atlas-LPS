"use client";

import AppBar from "@/components/AppBar";

export default function ProfilPage() {
  const profileData = [
    { label: "Nama", value: "Dian Arief Risdianto" },
    { label: "Username", value: "dian.risdianto" },
    { label: "Email", value: "dian.risdianto@lps.go.id" },
    { label: "Jabatan", value: "-" },
  ];

  const biodataData = [
    { label: "NIK", value: "-" },
    { label: "Jabatan", value: "-" },
    { label: "Jabatan", value: "Sub Manager" },
    { label: "Divisi", value: "Divisi Pengembangan Aps Fungsi Pendukung" },
    { label: "Grup", value: "Group Pengembangan dan Operasional TI" },
    { label: "Status Pegawai", value: "-" },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-white pb-8">
      <AppBar title="Profil Akun" showBack />

      <div className="p-4 space-y-6">
        {/* Section: Profil Akun */}
        <section>
          <h2 className="text-sm font-bold text-navy mb-2">Profil Akun</h2>
          <div className="flex flex-col">
            {profileData.map((item, idx) => (
              <div key={idx} className="flex flex-col py-3 border-b border-line">
                <span className="text-[11px] font-medium text-muted mb-1">{item.label}</span>
                <span className="text-[13px] text-ink">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Biodata Diri */}
        <section>
          <h2 className="text-sm font-bold text-navy mb-2">Biodata Diri</h2>
          <div className="flex flex-col">
            {biodataData.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col py-3 ${idx !== biodataData.length - 1 ? 'border-b border-line' : ''}`}
              >
                <span className="text-[11px] font-medium text-muted mb-1">{item.label}</span>
                <span className="text-[13px] text-ink">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
