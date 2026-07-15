"use client";

import AppBar from "@/components/AppBar";

export default function PrivasiPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-bg pb-8">
      <AppBar title="Kebijakan Privasi" showBack />

      <div className="p-4 mt-2">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-line">
          <h2 className="text-[10px] font-bold text-center text-muted mb-6 uppercase tracking-wider">
            Kebijakan Privasi
          </h2>

          <div className="space-y-6 text-[12.5px] leading-relaxed text-ink">
            <section>
              <h3 className="font-bold text-sm mb-3">Pendahuluan</h3>
              <p>
                Kebijakan Privasi ini menjelaskan bagaimana Lembaga Penjamin Simpanan (LPS) mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi karyawan aktif yang menggunakan Aplikasi Internal LPS (Aplikasi). Dengan menggunakan Aplikasi ini, <strong className="font-bold">pengguna Aplikasi menyetujui</strong> dan penggunaan data sesuai Kebijakan Privasi ini.
              </p>
              <p className="mt-4">tes</p>
            </section>

            <section>
              <h3 className="font-bold text-sm mb-3">Data yang Dikumpulkan</h3>
              <p className="mb-3">Aplikasi dapat mengumpulkan data berikut:</p>
              <ol className="list-decimal pl-4 space-y-3">
                <li>
                  Data identitas karyawan aktif berupa nama <strong className="font-bold">lengkap</strong>, NIP, jabatan, <strong className="font-bold">pangkat karyawan aktif</strong>, surat elektronik (<em>email</em>), nomor telepon;
                </li>
                <li>
                  Data lokasi untuk keperluan <strong className="font-bold">daftar kehadiran</strong> atau verifikasi kehadiran;
                </li>
                <li>
                  Data aktivitas Aplikasi berupa riwayat login, tanda tangan persetujuan, akses berita, informasi lainnya yang terdapat pada Aplikasi; dan
                </li>
                <li>
                  Data perangkat yang digunakan berupa tipe perangkat, sistem operasi, dan alamat IP.
                </li>
              </ol>
            </section>

            <section>
              <h3 className="font-bold text-sm mb-3">Tujuan Pengumpulan Data</h3>
              <p className="mb-3">Data yang dikumpulkan digunakan untuk:</p>
              <ol className="list-decimal pl-4 space-y-3">
                <li>
                  Memproses <strong className="font-bold">daftar kehadiran karyawan aktif</strong>;
                </li>
                <li>
                  Melakukan validasi tanda tangan persetujuan dokumen <strong className="font-bold">kedinasan</strong>;
                </li>
                <li>
                  Menyediakan akses ke berita internal <strong className="font-bold">maupun eksternal</strong>;
                </li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
