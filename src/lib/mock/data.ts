export type Prioritas = 'hi' | 'mid' | 'lo';
export type StatusTiket = 'baru' | 'proses' | 'selesai';
export type StatusAnggaran = 'cukup' | 'lebih' | 'terverifikasi';
export type JenisTask = 'nota_dinas' | 'bpm' | 'ics' | 'euis' | 'onelps';

export type BudgetBreakdown = {
  mataAnggaran: string;
  kode: string;
  pagu: number;
  terpakai: number;
  tersedia: number;
  pengajuan: number;
  status: StatusAnggaran;
};

export type DecisionBrief = {
  ringkasan: string;
  kv: { k: string; v: string }[];
  sitasi: string;
  flag: 'normal' | 'anomali';
};

export type TbpData = {
  workflowId: string;
  modul: string;
  createdDate: string;
  approvalDate: string;
  status: string;
  workflowApprover: string[];
  tanggalObservasi: string;
  sbpIdr: string;
  sbpValas: string;
  dmIdr: string;
  dmValas: string;
  tbpIdr: string;
  tbpValas: string;
  lpsRateRoundedIdr: string;
  lpsRateRoundedValas: string;
  lpsIdrKeputusanRdk: string;
  lpsValasKeputusanRdk: string;
  usulanBunga: {
    bankUmumRupiah: string;
    bankUmumValas: string;
    bprRupiah: string;
    masaBerlaku: string;
  };
  kesimpulanUsulan: {
    tbpRupiahBankUmum: string[];
    tbpValasBankUmum: string[];
    tbpRupiahBpr: string[];
  };
};

export type Task = {
  id: string;
  jenis: JenisTask;
  judul: string;
  pemohon: string;
  sistem: string;
  prioritas: Prioritas;
  sla: string;
  total?: number;
  meta?: Record<string, string>;
  brief?: DecisionBrief;
  budget?: BudgetBreakdown;
  tbpData?: TbpData;
  lampiran?: { nama: string; tipe: string }[];
};

export type Aset = {
  kode: string;
  nama: string;
  kondisi: string;
  tglPinjam: string;
};

export type Tiket = {
  no: string;
  subjek: string;
  status: StatusTiket;
  prioritas: string;
  timeline: { waktu: string; aksi: string; oleh: string }[];
};

export type Pegawai = {
  id: string;
  nama: string;
  jabatan: string;
  unit: string;
  direktorat: string;
  grup: string;
  divisi: string;
  noHp: string;
  shareScope: 'divisi' | 'grup' | 'direktorat' | 'semua' | 'none';
};

export type Berita = {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  waktu?: string;
  ringkas: string;
  penulis?: string;
  tipe?: 'internal' | 'eksternal';
  pinned?: boolean;
  gambar?: string;
  isi?: string[];
  officialUrl?: string;
};

export type DashboardData = {
  keuangan: { penyerapanPct: number };
  anggaranRealisasi: { pagu: number; realisasi: number; series: number[] };
  perjalananDinas: { belumDitutup: number; list: Record<string, unknown>[] };
  pjUangMuka: { outstanding: number; list: Record<string, unknown>[] };
  pembayaran: { antrian: Record<string, unknown>[] };
  asetIT: { list: Aset[] };
  helpdesk: { list: Tiket[] };
};

export const MOCK_TASKS: Task[] = [
  {
    id: "ND-1610/2026",
    jenis: "nota_dinas",
    judul: "Nota Dinas Perjalanan Dinas Proyek X",
    pemohon: "Budi Santoso",
    sistem: "e-Correspondence",
    prioritas: "hi",
    sla: "16 Jul 2026",
    brief: {
      ringkasan: "Pengajuan perjalanan dinas untuk tim proyek X ke Surabaya selama 3 hari terkait koordinasi awal.",
      kv: [
        { k: "Tujuan", v: "Surabaya" },
        { k: "Durasi", v: "3 Hari" }
      ],
      sitasi: "Peraturan Kepegawaian LPS Bab VI Pasal 32 (1) terkait Perjalanan Dinas Biasa.",
      flag: "normal"
    },
    lampiran: [
      { nama: "RAB_Perdin.pdf", tipe: "pdf" },
      { nama: "Undangan_Rapat.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "BPM-4521",
    jenis: "bpm",
    judul: "Reimbursement Konsumsi Rapat",
    pemohon: "Siti Aminah",
    sistem: "BPM",
    prioritas: "mid",
    sla: "Hari ini",
    total: 4250000,
    brief: {
      ringkasan: "Reimbursement konsumsi rapat koordinasi mingguan Divisi GRC (12 peserta). Nilai per orang Rp 354rb — di bawah batas standar biaya konsumsi rapat.",
      kv: [
        { k: "Peserta", v: "12 orang" },
        { k: "Kesesuaian Nilai", v: "Sesuai standar ✓" }
      ],
      sitasi: "SE Logistik No. 07/2024 poin 5: batas biaya konsumsi rapat internal maksimal Rp 400.000/orang.",
      flag: "normal"
    },
    budget: {
      mataAnggaran: "Biaya Rapat & Konsumsi",
      kode: "5.1.2.03",
      pagu: 2000000000,
      terpakai: 760000000,
      tersedia: 1240000000,
      pengajuan: 4250000,
      status: "cukup"
    },
    lampiran: [
      { nama: "Kwitansi_Konsumsi.pdf", tipe: "pdf" },
      { nama: "Daftar_Hadir_Rapat.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "ICS-8821",
    jenis: "ics",
    judul: "Matriks Mitigasi Risiko Kepatuhan KPW Surabaya",
    pemohon: "Reza Rahardian",
    sistem: "ICS",
    prioritas: "hi",
    sla: "Hari ini",
    brief: {
      ringkasan: "Evaluasi penilaian kepatuhan & mitigasi risiko transaksi KPW Surabaya. Seluruh indikator risiko kepatuhan operasional dalam tingkat Wajar Tanpa Pengecualian.",
      kv: [
        { k: "Unit Kerja", v: "KPW I Surabaya" },
        { k: "Tingkat Risiko", v: "Rendah (Low Risk) ✓" }
      ],
      sitasi: "Peraturan LPS No. 04/2025 Bab II Pasal 8 tentang Pengawasan Kepatuhan Kantor Perwakilan.",
      flag: "normal"
    },
    lampiran: [
      { nama: "Matriks_Mitigasi_ICS.pdf", tipe: "pdf" },
      { nama: "Laporan_Kepatuhan_Surabaya.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "ICS-TBP-272248",
    jenis: "ics",
    judul: "Ringkasan Pengajuan TBP (Persetujuan Repository Kertas Kerja Periode 19 Jun 2026)",
    pemohon: "AHMAD AZIZ",
    sistem: "ICS",
    prioritas: "hi",
    sla: "19 Jun 2026",
    brief: {
      ringkasan: "Usulan penyesuaian Tingkat Bunga Penjaminan (TBP) Simpanan Rupiah di Bank Umum dan BPR dinaikkan 50bps (menjadi 3,75% dan 6,25%), sementara TBP Simpanan Valas di Bank Umum dipertahankan pada 2,00% untuk periode 1 Juli - 30 September 2026.",
      kv: [
        { k: "TBP IDR Bank Umum", v: "3,75% (+50 bps)" },
        { k: "TBP IDR BPR", v: "6,25% (+50 bps)" },
        { k: "TBP Valas Bank Umum", v: "2,00% (Tetap)" },
        { k: "Masa Berlaku", v: "1 Jul - 30 Sep 2026" }
      ],
      sitasi: "Hasil RDK LPS Juni 2026 & Peraturan LPS No. 2/2024 tentang Penetapan Tingkat Bunga Penjaminan.",
      flag: "normal"
    },
    tbpData: {
      workflowId: "272248",
      modul: "Tingkat Bunga Penjaminan",
      createdDate: "22/06/2026",
      approvalDate: "22/06/2026",
      status: "Approved",
      workflowApprover: ["AHMAD AZIZ", "Ahmad Subhan Irani"],
      tanggalObservasi: "19 May 2026 - 19 Jun 2026",
      sbpIdr: "3.28%",
      sbpValas: "2.72%",
      dmIdr: "0.75%",
      dmValas: "0.10%",
      tbpIdr: "4.03%",
      tbpValas: "2.82%",
      lpsRateRoundedIdr: "4.00%",
      lpsRateRoundedValas: "2.75%",
      lpsIdrKeputusanRdk: "3.75%",
      lpsValasKeputusanRdk: "2.00%",
      usulanBunga: {
        bankUmumRupiah: "3,75%",
        bankUmumValas: "2,00%",
        bprRupiah: "6,25%",
        masaBerlaku: "1 Juli sampai dengan 30 September 2026"
      },
      kesimpulanUsulan: {
        tbpRupiahBankUmum: [
          "SBP Rupiah menunjukkan tren meningkat dengan spread SBP+DM melebar 53bps dan diproyeksikan melebar menjadi 76bps di atas TBP pada Sep-26. Diperlukan penyesuaian TBP Rupiah agar lebih kredibel sebagai acuan penetapan suku bunga wajar di samping memitigasi risiko konversi akibat faktor disparitas suku bunga dan pelemahan nilai tukar.",
          "Cakupan penjaminan masih memadai namun kembali melandai (93,53%) dan diproyeksikan rentan tertekan turun ke 92,37%; Sep-26 jika tidak dilakukan penyesuaian TBP.",
          "DPK Rupiah tumbuh lebih tinggi di ikuti pertumbuhan kredit yang membaik. Proyeksi ke depan, intermediasi potensial termoderasi dipengaruhi faktor kinerja ekonomi yang belum optimal (DPK 7,81% yoy; Kredit 9,43% yoy; Sep-26)."
        ],
        tbpValasBankUmum: [
          "SBP valas bertahan di level tinggi dengan spread SBP+DM mencapai 82bps dan diproyeksikan konsisten meningkat menjadi sebesar 106bps di atas TBP pada Sep-26. Kondisi ini mengindikasikan bahwa TBP Valas juga kurang kredibel dalam merespon pergerakan SBP lintas bank sekaligus acuan bagi bank menentukan suku bunga wajar.",
          "Cakupan penjaminan masih memadai dengan level (95,64%), namun diproyeksikan dapat mengalami penurunan terbatas ke level 95,48% pada Sep-26.",
          "DPK valas relatif tumbuh stabil dengan menunjukkan tren meningkat di atas kredit valas. Proyeksi ke depan, intermediasi melandai dipengaruhi pertumbuhan DPK yang tinggi sementara kredit melambat (DPK: 11,19%; Kredit: 4,37%; Sep-26)."
        ],
        tbpRupiahBpr: [
          "Rata-rata suku bunga BPR (SB BPR) turun terbatas ke level 5,18% atau masih berada 82bps di bawah TBP. Kenaikan SBP Rupiah Bank Umum menyebabkan spread SB BPR dan Bank umum menyempit ke level 196bps. Sehingga peningkatan TBP di BPR tetap perlu sejalan dengan peningkatan TBP di Bank Umum.",
          "Cakupan penjaminan BPR konsisten terjaga tinggi (>90%) dari sisi rekening.",
          "Kinerja intermediasi membaik namun funding gap cenderung volatile dengan Tingkat likuiditas yang ketat. Ke depan, BPR tetap membutuhkan ruang fleksibilitas dan daya saing yang memadai dalam menghimpun DPK."
        ]
      }
    },
    lampiran: [
      { nama: "Repository_Kertas_Kerja_TBP.pdf", tipe: "pdf" },
      { nama: "Hasil_Evaluasi_Suku_Bunga_LPS.pdf", tipe: "pdf" }
    ]
  },
  // EUIS Approval Items
  {
    id: "EUIS-PDP-1021",
    jenis: "euis",
    judul: "Pengajuan Perubahan Data Pokok Bank Peserta (PT BPR Artha Sejahtera)",
    pemohon: "Hendra Wijaya",
    sistem: "EUIS",
    prioritas: "hi",
    sla: "16 Jul 2026",
    brief: {
      ringkasan: "Verifikasi pembaruan data pokok alamat kantor pusat & akta perubahan anggaran dasar PT BPR Artha Sejahtera pada portal EUIS LPS.",
      kv: [
        { k: "Kategori", v: "Perubahan Data Pokok" },
        { k: "Entitas Bank", v: "PT BPR Artha Sejahtera" },
        { k: "Dokumen Akta", v: "Lengkap & Valid ✓" }
      ],
      sitasi: "Ketentuan EUIS LPS Bab II Pasal 5 tentang Pembaruan Data Pokok Bank Peserta.",
      flag: "normal"
    },
    lampiran: [
      { nama: "Akta_Perubahan_Data_Pokok.pdf", tipe: "pdf" },
      { nama: "Surat_Permohonan_EUIS.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "EUIS-PNH-2045",
    jenis: "euis",
    judul: "Pengajuan Perubahan Narahubung Resmi (Bank Syariah KPW)",
    pemohon: "Maya Indah Puspita",
    sistem: "EUIS",
    prioritas: "mid",
    sla: "Hari ini",
    brief: {
      ringkasan: "Pembaruan data narahubung / Contact Person (CP) resmi Direktur Kepatuhan & PIC Pelaporan untuk koordinasi data klaim penjaminan.",
      kv: [
        { k: "Kategori", v: "Perubahan Narahubung" },
        { k: "Narahubung Baru", v: "Budi Santoso (Dirut Kepatuhan)" },
        { k: "Verifikasi Nomor HP", v: "Terverifikasi OTP ✓" }
      ],
      sitasi: "Ketentuan EUIS LPS Bab III Pasal 9 tentang Pengelolaan Narahubung Entitas Terjamin.",
      flag: "normal"
    },
    lampiran: [
      { nama: "Form_Perubahan_Narahubung.pdf", tipe: "pdf" },
      { nama: "SK_Pengangkatan_PIC.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "EUIS-AR-4019",
    jenis: "euis",
    judul: "Permohonan Akses Elevated Role Modul Likuidasi Core System",
    pemohon: "Dewi Sartika",
    sistem: "EUIS",
    prioritas: "mid",
    sla: "Besok",
    brief: {
      ringkasan: "Permohonan otorisasi hak akses elevated role untuk tim verifikasi likuidasi BPR Candra. Otorisasi berlaku selama 30 hari kalender.",
      kv: [
        { k: "Kategori", v: "Otorisasi Hak Akses Role" },
        { k: "Sistem Target", v: "Core System Likuidasi" },
        { k: "Masa Berlaku", v: "30 Hari Kalender" }
      ],
      sitasi: "Pedoman Keamanan Informasi LPS Bab IV Pasal 15 tentang Otorisasi Akses Khusus.",
      flag: "normal"
    },
    lampiran: [
      { nama: "Form_Akses_EUIS.pdf", tipe: "pdf" },
      { nama: "Surat_Rekomendasi_Kadiv.pdf", tipe: "pdf" }
    ]
  },
  // OneLPS Approval Items
  {
    id: "OL-VT-1092",
    jenis: "onelps",
    judul: "Klaim Voucher Taksi Lembur Tim GRC",
    pemohon: "Andi Saputra",
    sistem: "OneLPS",
    prioritas: "mid",
    sla: "Hari ini",
    total: 185000,
    brief: {
      ringkasan: "Klaim voucher taksi lembur, pulang pukul 21.40 WIB (> 20.00 WIB). Lembur telah disetujui sebelumnya (pre-approved) oleh Kadiv GRC. Rute Equity Tower → domisili terdaftar.",
      kv: [
        { k: "Kategori", v: "Voucher Taksi" },
        { k: "Jam Pulang", v: "21.40 WIB ✓" },
        { k: "Status Lembur", v: "Pre-approved ✓" }
      ],
      sitasi: "SE Logistik No. 07/2024 poin 3: voucher taksi berlaku untuk lembur pulang di atas pukul 20.00 WIB.",
      flag: "normal"
    },
    lampiran: [
      { nama: "e-Receipt_Taksi.pdf", tipe: "pdf" },
      { nama: "Persetujuan_Lembur.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "OL-CT-2041",
    jenis: "onelps",
    judul: "Pengajuan Cuti Tahunan oleh Bawahan (Faris Maulana)",
    pemohon: "Faris Maulana",
    sistem: "OneLPS",
    prioritas: "mid",
    sla: "Hari ini",
    brief: {
      ringkasan: "Pengajuan cuti tahunan selama 3 hari kerja (18 — 20 Agustus 2026). Sisa saldo cuti pegawai: 8 hari. Tugas operasional telah didelegasikan kepada Maya Indah.",
      kv: [
        { k: "Kategori", v: "Pengajuan Cuti Bawahan" },
        { k: "Durasi Cuti", v: "3 Hari Kerja" },
        { k: "Delegasi Tugas", v: "Maya Indah P. ✓" }
      ],
      sitasi: "Peraturan Kepegawaian LPS Bab V Pasal 21: Hak Cuti Tahunan Pegawai.",
      flag: "normal"
    },
    lampiran: [
      { nama: "Form_Pengajuan_Cuti.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "OL-DS-3302",
    jenis: "onelps",
    judul: "Pengajuan Diseminasi & Workshop Keuangan Eksternal",
    pemohon: "Ratna Dewi",
    sistem: "OneLPS",
    prioritas: "hi",
    sla: "17 Jul 2026",
    brief: {
      ringkasan: "Permohonan keikutsertaan diseminasi & workshop regulasi jasa keuangan terbaru yang diselenggarakan oleh OJK untuk 2 staf Divisi Keuangan.",
      kv: [
        { k: "Kategori", v: "Pengajuan Diseminasi" },
        { k: "Penyelenggara", v: "OJK Institute" },
        { k: "Jumlah Peserta", v: "2 Staf" }
      ],
      sitasi: "Pedoman Pengembangan Kompetensi Pegawai LPS Pasal 14 tentang Pelatihan & Diseminasi Eksternal.",
      flag: "normal"
    },
    lampiran: [
      { nama: "Brosur_Diseminasi_OJK.pdf", tipe: "pdf" },
      { nama: "Usulan_Peserta.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "OL-EC-4018",
    jenis: "onelps",
    judul: "Pengesahan Exit Clearance Pegawai (Budi Hendrawan)",
    pemohon: "Budi Hendrawan",
    sistem: "OneLPS",
    prioritas: "hi",
    sla: "16 Jul 2026",
    brief: {
      ringkasan: "Persetujuan serah terima exit clearance pegawai resign. Seluruh peminjaman aset IT, dokumen dinas, dan kewajiban keuangan telah diverifikasi bersih (100% Clear).",
      kv: [
        { k: "Kategori", v: "Exit Clearance" },
        { k: "Status Aset IT", v: "Sudah Dikembalikan ✓" },
        { k: "Kewajiban Keuangan", v: "Lunas (Clear) ✓" }
      ],
      sitasi: "SE SDM No. 12/2024 tentang Prosedur Termination & Exit Clearance Pegawai.",
      flag: "normal"
    },
    lampiran: [
      { nama: "Checklist_Exit_Clearance.pdf", tipe: "pdf" },
      { nama: "Berita_Acara_Serah_Terima.pdf", tipe: "pdf" }
    ]
  },
  {
    id: "OL-OS-5510",
    jenis: "onelps",
    judul: "Persetujuan Perpanjangan Kontrak OSContract Tenaga Alih Daya TI",
    pemohon: "Rendra Pratama",
    sistem: "OneLPS",
    prioritas: "mid",
    sla: "Besok",
    brief: {
      ringkasan: "Evaluasi kinerja & persetujuan perpanjangan kontrak 4 tenaga alih daya (OSContract) posisi Fullstack Developer Divisi IT untuk periode Q3-Q4 2026.",
      kv: [
        { k: "Kategori", v: "OSContract" },
        { k: "Jumlah Tenaga Kerja", v: "4 Orang" },
        { k: "Evaluasi Kinerja", v: "Sangat Baik (SLA >95%) ✓" }
      ],
      sitasi: "Peraturan Pengadaan Jasa Alih Daya LPS Bab III Pasal 9 tentang Perpanjangan Kontrak OS.",
      flag: "normal"
    },
    lampiran: [
      { nama: "Evaluasi_Kinerja_OS.pdf", tipe: "pdf" },
      { nama: "Draft_Kontrak_OSContract.pdf", tipe: "pdf" }
    ]
  }
];

export const MOCK_DASHBOARD: DashboardData = {
  keuangan: { penyerapanPct: 38 },
  anggaranRealisasi: {
    pagu: 2000000000,
    realisasi: 760000000,
    series: [100, 150, 120, 200, 190, 0, 0, 0, 0, 0, 0, 0]
  },
  perjalananDinas: {
    belumDitutup: 3,
    list: []
  },
  pjUangMuka: {
    outstanding: 2,
    list: []
  },
  pembayaran: {
    antrian: []
  },
  asetIT: {
    list: [
      { kode: "LT-2023-045", nama: "ThinkPad T14", kondisi: "Baik", tglPinjam: "12/01/2023" },
      { kode: "MN-2022-112", nama: "Dell UltraSharp 24", kondisi: "Baik", tglPinjam: "15/03/2022" },
      { kode: "HP-2024-009", nama: "iPhone 15 Pro", kondisi: "Sangat Baik", tglPinjam: "05/02/2024" }
    ]
  },
  helpdesk: {
    list: [
      {
        no: "INC-9901",
        subjek: "Layar monitor berkedip",
        status: "proses",
        prioritas: "Sedang",
        timeline: [
          { waktu: "10:00", aksi: "Tiket dibuat", oleh: "Andi" },
          { waktu: "10:30", aksi: "Ditugaskan ke Teknisi", oleh: "System" }
        ]
      },
      {
        no: "INC-9905",
        subjek: "Request akses folder GRC",
        status: "baru",
        prioritas: "Tinggi",
        timeline: [
          { waktu: "11:15", aksi: "Tiket dibuat", oleh: "Andi" }
        ]
      }
    ]
  }
};

export const MOCK_BERITA: Berita[] = [
  {
    id: "B-001",
    judul: "Pengumuman Penunjukan Koordinator Dalam Rangka Kegiatan Rapat Pimpinan",
    kategori: "Berita Internal",
    tanggal: "13 Jul 2026",
    waktu: "20:02",
    ringkas: "Ringkasan agenda koordinasi internal dalam rangka persiapan Rapat Pimpinan Lembaga Penjamin Simpanan.",
    penulis: "info.sdm@lps.go.id",
    tipe: "internal",
    pinned: true,
    gambar: "https://lps.go.id/konten/unggahan/2023/02/logo-lps-header-480x50-dark.png"
  },
  {
    id: "B-002",
    judul: "Program Budaya Inovasi 2026 & Dukung Tim Inovasi Favorit Anda!",
    kategori: "Berita Internal",
    tanggal: "13 Jul 2026",
    waktu: "14:27",
    ringkas: "Halo Insan LPS, Dalam upaya mendukung budaya inovasi di Lembaga Penjamin Simpanan, yuk dukung tim inovasi favoritmu dan jadilah bagian dari perjalanan dalam mewujudkan budaya kerja inovatif.",
    penulis: "idiclc@lps.go.id",
    tipe: "internal"
  },
  {
    id: "B-003",
    judul: "Lindungi Arsip Vital, Jaga Akuntabilitas LPS!",
    kategori: "Berita Internal",
    tanggal: "10 Jul 2026",
    waktu: "10:03",
    ringkas: "Penguatan manajemen kearsipan dan digitalisasi dokumen tata kelola di lingkungan Lembaga Penjamin Simpanan.",
    penulis: "info.glu@lps.go.id",
    tipe: "internal"
  },
  {
    id: "EXT-001",
    judul: "LPS Lantik Sejumlah Pejabat Baru, Perkuat Organisasi melalui Sistem Meritokrasi yang Independen",
    kategori: "Siaran Pers",
    tanggal: "21 Jul 2026",
    waktu: "16:53 WIB",
    ringkas: "LPS melantik jajaran pejabat baru guna memperkuat jajaran kepemimpinan organisasi dalam melayani perbankan dan masyarakat melalui sistem meritokrasi yang independen.",
    penulis: "Humas LPS",
    tipe: "eksternal",
    gambar: "https://lps.go.id/konten/unggahan/2026/07/1-Pelantikan.jpg-1.jpeg",
    officialUrl: "https://lps.go.id/lps-lantik-sejumlah-pejabat-baru-perkuat-organisasi-melalui-sistem-meritokrasi-yang-independen/",
    isi: [
      "LPS – Jakarta, 21 Juli 2026. Lembaga Penjamin Simpanan (LPS) melantik sejumlah pejabat baru di lingkungan organisasi. Pelantikan dilakukan oleh Ketua Dewan Komisioner LPS, Anggito Abimanyu, pada Selasa (21/7), sebagai bagian dari upaya memperkuat organisasi guna mendukung pelaksanaan tugas dan fungsi LPS melalui penerapan sistem meritokrasi yang independen.",
      "Pada kesempatan tersebut, LPS melantik tiga pejabat Direktur Eksekutif setingkat eselon I. Dari jumlah tersebut, dua pejabat memperoleh promosi jabatan, yaitu Hafidz Ashady sebagai Direktur Eksekutif Keuangan dan Investasi LPS serta R. Rizka S. Kurniawan sebagai Direktur Eksekutif Perencanaan Strategis, Penganggaran, dan Riset LPS. Sementara itu, satu pejabat menjalani mutasi jabatan, yakni Ridwan Nasution sebagai Direktur Eksekutif Surveilans, Pemeriksaan, dan Pengaturan Bank LPS.",
      "Selain itu, LPS juga melantik lima pejabat Direktur Group setingkat eselon II. Dua di antaranya merupakan mutasi jabatan, yaitu Tri Wahyuni sebagai Kepala Satuan Kerja Audit Internal LPS dan Sofyan Baehaqie sebagai Direktur Group Resolusi dan Hubungan Investor Bank LPS. Adapun tiga pejabat lainnya memperoleh promosi jabatan, yaitu Johan Krisnamurti sebagai Direktur Group Penanganan Klaim Bank, Heady Anggoro Mukti sebagai Pelaksana Tugas (Plt.) Direktur Group Pengaturan Penjaminan dan Resolusi Bank, serta Arsandi Akhmad sebagai Pelaksana Tugas (Plt.) Direktur Group Pengembangan dan Operasional Teknologi Informasi.",
      "Pelantikan tersebut turut dihadiri oleh seluruh anggota Dewan Komisioner LPS, termasuk Wakil Ketua Dewan Komisioner LPS yang membidangi sumber daya manusia, hukum, keuangan, serta pembidangan internal lainnya.",
      "Usai pelantikan, Wakil Ketua Dewan Komisioner LPS, Farid Azhar Nasution, menegaskan bahwa promosi dan mutasi jabatan merupakan bagian penting dari pengembangan organisasi sekaligus bentuk apresiasi atas kinerja pegawai.",
      "“Kami meyakini bahwa organisasi yang kuat dibangun oleh insan-insan terbaik yang diberikan kesempatan untuk terus berkembang. Karena itu, setiap promosi dan mutasi di LPS dilaksanakan berdasarkan prinsip meritokrasi sebagai bentuk penghargaan atas kompetensi, integritas, dan kinerja, sekaligus sebagai upaya menyiapkan pemimpin-pemimpin LPS di masa depan,” ujar Farid Azhar Nasution di Kantor Pusat LPS, Jakarta, Selasa (21/7/2026)."
    ]
  },
  {
    id: "EXT-005",
    judul: "Perubahan UU P2SK Perkuat Kewenangan LPS dalam Penanganan Bank dan Perusahaan Asuransi",
    kategori: "Hukum & Regulasi",
    tanggal: "09 Jul 2026",
    waktu: "15:20 WIB",
    ringkas: "Penguatan kewenangan LPS dalam kerangka UU P2SK memperkokoh jaring pengaman sistem keuangan (JPSK) nasional dan koordinasi antar anggota KSSK.",
    penulis: "Divisi Hukum LPS",
    tipe: "eksternal",
    gambar: "https://lps.go.id/konten/unggahan/2026/07/media-jatim-1-506x285.jpeg",
    officialUrl: "https://lps.go.id/perubahan-uu-p2sk-perkuat-kewenangan-lps-dalam-penanganan-bank-dan-perusahaan-asuransi/",
    isi: [
      "LPS – Surabaya. Perubahan Undang-Undang Nomor 4 Tahun 2023 tentang Pengembangan dan Penguatan Sektor Keuangan (UU P2SK) melalui Undang-Undang Nomor 4 Tahun 2026 memperkuat kewenangan Lembaga Penjamin Simpanan (LPS) dalam melaksanakan fungsi penjaminan dan resolusi bank, serta penanganan perusahaan asuransi. Penguatan tersebut menjadi bagian dari penyempurnaan kerangka penanganan lembaga jasa keuangan dalam rangka menjaga stabilitas sistem keuangan nasional.",
      "Dalam sektor perbankan, perubahan UU P2SK memberikan kewenangan yang lebih luas kepada LPS dalam menangani Bank Dalam Resolusi (BDR), termasuk sebelum ditetapkannya metode penyelesaian. Setelah menerima pemberitahuan tertulis dari Otoritas Jasa Keuangan (OJK) mengenai penetapan suatu bank sebagai BDR, LPS dapat melakukan berbagai tindakan penanganan sesuai kewenangan yang diatur dalam undang-undang.",
      "Selain kewenangan penanganan perbankan, perubahan UU P2SK juga memperluas fungsi LPS melalui penyelenggaraan Program Penjaminan Polis (PPP) asuransi. Program tersebut bertujuan untuk melindungi pemegang polis, tertanggung, atau peserta dari risiko kerugian akibat perusahaan asuransi yang dicabut izin usahanya. Penguatan fungsi tersebut melengkapi peran LPS sebagai jaring pengaman sektor keuangan nasional.",
      "LPS memandang penguatan kewenangan melalui perubahan UU P2SK akan mendukung pelaksanaan mandat lembaga secara lebih efektif dalam menjaga kepercayaan masyarakat terhadap sistem keuangan. Ke depannya, LPS akan terus berkoordinasi dengan OJK, Bank Indonesia, Kementerian Keuangan, dan pemangku kepentingan terkait untuk memastikan implementasi ketentuan dalam UU P2SK berjalan secara efektif dan mendukung stabilitas sistem keuangan nasional."
    ]
  },
  {
    id: "EXT-006",
    judul: "Perkembangan Indeks Menabung Konsumen dan Indeks Kepercayaan Konsumen (Juni 2026)",
    kategori: "Riset & Data",
    tanggal: "08 Jul 2026",
    waktu: "10:58 WIB",
    ringkas: "Hasil survei LPS menunjukkan Indeks Menabung Konsumen (IMK) dan Indeks Kepercayaan Konsumen (IKK) berada di level optimis, mengindikasikan ketahanan finansial rumah tangga yang kuat.",
    penulis: "Group Riset LPS",
    tipe: "eksternal",
    gambar: "https://lps.go.id/konten/unggahan/2026/06/IMG-8008-768x512.jpg",
    officialUrl: "https://lps.go.id/perkembangan-indeks-menabung-konsumen-dan-indeks-kepercayaan-konsumen-juni-2026/",
    isi: [
      "LPS – Jakarta, 8 Juli 2026. Hasil Survei Konsumen dan Perekonomian (SKP) LPS menunjukkan bahwa Indeks Menabung Konsumen (IMK) pada bulan Juni 2026 menguat 1,6 poin dibandingkan bulan sebelumnya menjadi 81,7. Komponen Indeks Kemauan Menabung (IKMM) naik 3,5 poin ke level 90,2, sementara Indeks Kemampuan Menabung (IKPM) sedikit menurun sebesar 0,4 poin ke level 73,2. Peningkatan kemauan menabung konsumen terutama tecermin dari membaiknya persepsi terhadap waktu yang tepat untuk menabung, sejalan dengan kebutuhan persiapan pengeluaran pendidikan dalam beberapa bulan mendatang.",
      "Peningkatan IKMM tecermin dari naiknya persentase responden yang menilai bahwa saat ini merupakan waktu yang tepat untuk menabung, yaitu dari 25,5% pada Mei 2026 menjadi 27,0% pada Juni 2026. Selain itu, persentase responden yang menyatakan bahwa tiga bulan mendatang adalah waktu yang tepat untuk menabung juga meningkat dari 33,7% pada Mei 2026 menjadi 34,8% pada Juni 2026.",
      "Sementara itu, penurunan IKPM terjadi karena menurunnya porsi responden yang menyatakan sering menabung, yakni dari 18,9% di bulan Mei 2026 menjadi 17,1% di bulan Juni 2026. Meskipun demikian, di periode yang sama, porsi responden yang menilai bahwa jumlah yang ditabung lebih kecil dari yang direncanakan juga mengalami penurunan, yakni dari 39,1% menjadi 37,1%.",
      "Berdasarkan kelompok pendapatan rumah tangga (RT), IMK pada mayoritas kelompok pendapatan meningkat pada Juni 2026 dibandingkan bulan sebelumnya. Kenaikan IMK paling besar terlihat pada kelompok RT berpendapatan hingga Rp1,5 juta per bulan, yakni sebesar 5,0 poin, diikuti RT berpendapatan di atas Rp7 juta per bulan sebesar 2,4 poin, serta RT berpendapatan di atas Rp3 juta hingga Rp7 juta per bulan sebesar 1,0 poin."
    ]
  },
  {
    id: "EXT-002",
    judul: "Simpanan Nasabah Aman, Total Rp30 Milyar Lebih Telah Dibayarkan LPS Kepada Nasabah BPRS Hasanah Mandiri",
    kategori: "Siaran Pers",
    tanggal: "21 Jul 2026",
    waktu: "14:30 WIB",
    ringkas: "Proses rekonsiliasi dan verifikasi simpanan nasabah BPRS Hasanah Mandiri berjalan cepat. LPS telah membayarkan klaim simpanan layak bayar mencapai lebih dari Rp30 Miliar.",
    penulis: "Divisi Penanganan Klaim",
    tipe: "eksternal",
    gambar: "https://lps.go.id/konten/unggahan/2026/07/pembayaran-tahap-1-bprs-hasanah-mandiri-900x600.jpeg",
    officialUrl: "https://lps.go.id/berita/"
  },
  {
    id: "EXT-003",
    judul: "LPS Perkuat Persiapan Menuju Aktivasi Program Penjaminan Polis Asuransi",
    kategori: "Kebijakan & Edukasi",
    tanggal: "19 Jul 2026",
    waktu: "10:15 WIB",
    ringkas: "Sesuai dengan amanat UU P2SK, LPS terus mematangkan infrastruktur IT, penyusunan Peraturan Lembaga (PLPS), serta kesiapan SDM menjelang pelaksanaan Program Penjaminan Polis.",
    penulis: "Direktorat Penjaminan Polis",
    tipe: "eksternal",
    gambar: "https://lps.go.id/konten/unggahan/2026/06/Penetapan-Tingkat-Bunga-Penjaminan-1280x678.png",
    officialUrl: "https://lps.go.id/berita/"
  }
];

export const MOCK_CHART_TIMELINE = [
  { name: 'Jan', value1: 885, value2: 12 },
  { name: 'Feb', value1: 570, value2: 14 },
  { name: 'Mar', value1: 724, value2: 20 },
  { name: 'Apr', value1: 238, value2: 8 },
  { name: 'Mei', value1: 450, value2: 15 },
  { name: 'Jun', value1: 610, value2: 18 }
];

export const MOCK_CHART_PIE = [
  { name: 'Group Pengembangan', value: 25 },
  { name: 'Group Perencanaan', value: 5 }
];

export const MOCK_CHART_BAR_HORIZONTAL = [
  { name: 'Pelaksana', value: 467 },
  { name: 'Kepala Tim', value: 107 },
  { name: 'Program PCP', value: 35 },
  { name: 'Kepala Divisi', value: 34 }
];

export const MOCK_ASET_TIMELINE = [
  { name: 'January', value: 3438 },
  { name: 'February', value: 3438 }
];

export const MOCK_ASET_CLASS = [
  { name: 'January', c700: 2293, c750: 310, c950: 590, c960: 245 },
  { name: 'February', c700: 2293, c750: 310, c950: 590, c960: 245 }
];

export const MOCK_ASET_LOKASI = [
  { name: '32', value: 224 },
  { name: '31', value: 401 },
  { name: '30', value: 315 },
  { name: '26', value: 828 },
  { name: 'LPS', value: 645 },
  { name: 'Surabaya', value: 39 },
  { name: 'Equity', value: 800 },
  { name: 'DRC', value: 134 }
];

export const MOCK_ASET_MONITORING = [
  { name: 'January', pengembalian: 64, penambahan: 64 },
  { name: 'February', pengembalian: 70, penambahan: 81 }
];

export const MOCK_ABSENSI_STATUS = [
  { name: 'January', normal: 1106, cuti: 115, sakit: 10, izin: 15, terlambat: 5, absen: 1430 },
  { name: 'February', normal: 919, cuti: 163, sakit: 12, izin: 18, terlambat: 8, absen: 1296 },
  { name: 'March', normal: 901, cuti: 99, sakit: 8, izin: 10, terlambat: 3, absen: 1155 }
];

export const MOCK_ABSENSI_TERLAMBAT = [
  { name: 'Pengembangan & Ops', value: 25 },
  { name: 'Perencanaan', value: 5 }
];

export const MOCK_ABSENSI_TIDAK_HADIR = [
  { name: 'Pengembangan & Ops', value: 22 },
  { name: 'Perencanaan', value: 8 }
];

export const MOCK_ABSENSI_RATA = [
  { nama: 'Ahmad Fauzi', status: 'Normal', durasi: '11:23:14' },
  { nama: 'Budi Santoso', status: 'Normal', durasi: '11:15:57' },
  { nama: 'Cahyo Wibowo', status: 'Normal', durasi: '11:09:29' },
  { nama: 'Dedi Kurniawan', status: 'Normal', durasi: '11:07:01' },
  { nama: 'Eko Prasetyo', status: 'Normal', durasi: '10:59:41' },
  { nama: 'Fajar Hidayat', status: 'Normal', durasi: '10:55:37' }
];

export const MOCK_ABSENSI_DETAIL = [
  { nama: 'Ahmad Fauzi', grup: 'Group Penjaminan & Resolusi', date: '2 January 2026', masuk: '06:54', keluar: '16:35', status: 'Normal' },
  { nama: 'Budi Santoso', grup: 'Group Penjaminan & Resolusi', date: '2 February 2026', masuk: '07:54', keluar: '17:19', status: 'Normal' },
  { nama: 'Cahyo Wibowo', grup: 'Group Pengembangan TI', date: '2 March 2026', masuk: '07:56', keluar: '15:32', status: 'Normal' },
  { nama: 'Dedi Kurniawan', grup: 'Group Hukum & GRC', date: '3 February 2026', masuk: '07:47', keluar: '16:48', status: 'Normal' },
  { nama: 'Eko Prasetyo', grup: 'Group Riset & Surveilans', date: '3 March 2026', masuk: '06:53', keluar: '16:22', status: 'Normal' }
];

export const MOCK_KEP_STATUS = [
  { name: 'Group Pengembangan', tetap: 16, outsource: 38 },
  { name: 'Group Perencanaan', tetap: 14, outsource: 2 },
  { name: 'KJF Keamanan Siber', tetap: 2, outsource: 0 }
];

export const MOCK_KEP_GENDER = [
  { name: 'Group Pengembangan', female: 7, male: 47 },
  { name: 'Group Perencanaan', female: 5, male: 11 },
  { name: 'KJF Keamanan Siber', female: 0, male: 2 }
];

export const MOCK_KEP_USIA = [
  { name: '31-40', value: 39 },
  { name: '21-30', value: 24 },
  { name: '41-50', value: 8 },
  { name: '51-60', value: 1 }
];

export const MOCK_KEP_PANGKAT_PIE = [
  { name: 'Outsource', value: 40 },
  { name: 'Assistant Manager', value: 9 },
  { name: 'Sub Manager', value: 8 },
  { name: 'Junior Sub Manager', value: 7 },
  { name: 'AVP', value: 2 },
  { name: 'Manager', value: 1 },
  { name: 'Lainnya', value: 5 }
];

export const MOCK_KEP_PANGKAT_BAR = [
  { name: 'Group Pengembangan', am: 4, sm: 4, jsm: 2, avp: 1, mgr: 1, out: 38 },
  { name: 'Group Perencanaan', am: 4, sm: 3, jsm: 2, avp: 1, mgr: 1, out: 4 },
  { name: 'KJF Keamanan Siber', am: 1, sm: 0, jsm: 0, avp: 0, mgr: 1, out: 0 }
];

export const MOCK_KEP_MASA_KERJA = [
  { nama: 'Bambang Sudiro', value: 16 },
  { nama: 'Hendro Gunawan', value: 12 },
  { nama: 'Iwan Setiawan', value: 11 },
  { nama: 'Joko Priyono', value: 10 },
  { nama: 'Kusuma Wardhana', value: 10 }
];

export const MOCK_KEP_DETAIL = [
  { nama: 'Ahmad Fauzi', kelamin: 'Male', grup: 'Group Penjaminan Bank', umur: 34, masa: 5, pangkat: 'Senior Assistant', status: 'Pegawai Tetap' },
  { nama: 'Anisa Putri', kelamin: 'Female', grup: 'Group Penjaminan Asuransi', umur: 27, masa: 5, pangkat: 'Junior Sub Manager', status: 'Pegawai Tetap' },
  { nama: 'Budi Santoso', kelamin: 'Male', grup: 'Group Resolusi Bank', umur: 30, masa: 7, pangkat: 'Sub Manager', status: 'Pegawai Tetap' },
  { nama: 'Citra Dewi', kelamin: 'Female', grup: 'Group Hukum & GRC', umur: 28, masa: 5, pangkat: 'Junior Sub Manager', status: 'Pegawai Tetap' },
  { nama: 'Dimas Anggara', kelamin: 'Male', grup: 'Group Surveilans', umur: 36, masa: 6, pangkat: 'Assistant Manager', status: 'Pegawai Tetap' },
  { nama: 'Eko Prasetyo', kelamin: 'Male', grup: 'Group Teknologi Informasi', umur: 38, masa: 11, pangkat: 'Manager', status: 'Pegawai Tetap' },
  { nama: 'Fajar Hidayat', kelamin: 'Male', grup: 'Group Logistik & Aset', umur: 33, masa: 3, pangkat: 'Outsource', status: 'Tenaga Alih Daya' }
];

// --- PERJALANAN DINAS & UANG MUKA MOCK DATA ---

export const MOCK_PERDIN_KPI = {
  perdin: 2689,
  um_kegiatan: 279,
  um_pengadaan: 0,
  reimbursement: 5903
};

export const MOCK_PERDIN_STATUS_TANPA_UM = [
  { name: 'Disetujui', value: 4611, fill: '#1E9E6A' },
  { name: 'Draft', value: 65, fill: '#64748b' },
  { name: 'Ditolak', value: 83, fill: '#D64545' },
  { name: 'Return', value: 33, fill: '#3B82F6' }
];

export const MOCK_PERDIN_STATUS_DENGAN_UM = [
  { name: 'Disetujui', value: 888, fill: '#1E9E6A' },
  { name: 'Draft', value: 14, fill: '#64748b' },
  { name: 'Ditolak', value: 62, fill: '#D64545' },
  { name: 'Return', value: 2, fill: '#3B82F6' }
];

export const MOCK_PERDIN_SPJ = [
  { name: 'Selesai Pertanggungjawaban', value: 3178, fill: '#1E9E6A' },
  { name: 'Proses Approval Uang Muka', value: 12, fill: '#F26E22' },
  { name: 'Belum Buat SPJ', value: 681, fill: '#64748b' }
];

export const MOCK_PERDIN_PENGAJUAN_SPJ = [
  { name: 'Disetujui', value: 2955, fill: '#1E9E6A' },
  { name: 'Draft', value: 423, fill: '#64748b' },
  { name: 'Tahap Approval SPJ', value: 78, fill: '#E0A100' },
  { name: 'Ditolak', value: 14, fill: '#D64545' },
  { name: 'Return', value: 22, fill: '#3B82F6' }
];

export const MOCK_PERDIN_SPJ_SLA = [
  { name: 'Tepat Waktu', value: 1686, fill: '#1E9E6A' },
  { name: 'Terlambat', value: 1492, fill: '#D64545' }
];

export const MOCK_PERDIN_DENGAN_UM = [
  { name: 'Sudah Uang Muka', value: 80, fill: '#3B82F6' },
  { name: 'Belum Uang Muka', value: 888, fill: '#E0A100' }
];

export const MOCK_PERDIN_RESERVASI = [
  { name: 'HOTEL', reservasi: 1205, invoice: 1495 },
  { name: 'TIKET KERETA', reservasi: 1102, invoice: 1205 },
  { name: 'TIKET PESAWAT', reservasi: 65, invoice: 78 },
  { name: 'PAKET MEETING', reservasi: 420, invoice: 420 }
];

export const MOCK_PERDIN_INVOICE_STATUS = [
  { name: 'Disetujui', value: 1152, fill: '#1E9E6A' },
  { name: 'Draft', value: 32, fill: '#64748b' },
  { name: 'Tahap Approval GAD', value: 142, fill: '#3B82F6' },
  { name: 'Ditolak', value: 0, fill: '#D64545' }
];

export const MOCK_PERDIN_INVOICE_SLA = [
  { name: 'HOTEL', belum: 1205, tepat: 120, terlambat: 300 },
  { name: 'TIKET KERETA', belum: 625, tepat: 825, terlambat: 154 },
  { name: 'TIKET PESAWAT', belum: 24, tepat: 50, terlambat: 204 },
  { name: 'PAKET MEETING', belum: 200, tepat: 1045, terlambat: 100 }
];

export const MOCK_PERDIN_JENIS_RESERVASI = [
  { name: 'HOTEL', value: 1205, fill: '#F26E22' },
  { name: 'TIKET K.A. / TRAVEL UMUM', value: 1205, fill: '#64748b' },
  { name: 'TIKET PESAWAT', value: 888, fill: '#E0A100' },
  { name: 'KENDARAAN', value: 852, fill: '#3B82F6' },
  { name: 'PAKET MEETING', value: 400, fill: '#1E9E6A' }
];

export const MOCK_PERDIN_DETAIL = [
  { no: '30230713', tgl: '13 July 2023', jenis: 'Operasional Jumps - Luar Kota', pemohon: 'Ahmad Fauzi', grup: 'Group Pengembangan TI', hutang: 'Tidak', reservasiHotel: 'Tidak', tiket: 'Tidak', meeting: 'Tidak', spj: '30 August 2023' },
  { no: '30230718', tgl: '18 July 2023', jenis: 'Operasional Jumps - Luar Kota', pemohon: 'Budi Santoso', grup: 'Group Perencanaan', hutang: 'Tidak', reservasiHotel: 'Tidak', tiket: 'Tidak', meeting: 'Tidak', spj: '12 August 2023' },
  { no: '30230805', tgl: '5 August 2023', jenis: 'Perdin Dinas - Luar Kota', pemohon: 'Citra Dewi', grup: 'Group Penjaminan', hutang: 'Ya', reservasiHotel: 'Ya', tiket: 'Ya', meeting: 'Ya', spj: '15 September 2023' }
];


// --- PEMBAYARAN MOCK DATA ---

export const MOCK_PEMBAYARAN_JENIS = [
  { name: 'Reimbursement Kegiatan / Diluar Perdin', value: 628, fill: '#3B82F6' },
  { name: 'Uang Muka Kegiatan / Diluar Perdin', value: 12, fill: '#F26E22' },
  { name: 'Reimbursement Asuransi', value: 5, fill: '#8B5CF6' },
  { name: 'Pertanggungjawaban Uang Muka Kegiatan / Perdin', value: 0, fill: '#64748b' },
  { name: 'Reimbursement Claim Covid & Rawat Kesehatan', value: 0, fill: '#64748b' }
];

export const MOCK_PEMBAYARAN_STATUS = [
  { name: 'Selesai', value: 628, fill: '#1E9E6A' },
  { name: 'Ditolak', value: 4, fill: '#D64545' },
  { name: 'DRAFT', value: 0, fill: '#64748b' },
  { name: 'Tahap Approval', value: 0, fill: '#E0A100' }
];

export const MOCK_PEMBAYARAN_DETAIL = [
  { docSap: '172804535', deskripsi: 'BBM, Tol, & Parkir Operasional', vendor: 'Dinda Maharani', bank: 'BSI', rek: '1234567890', namaRek: 'DINDA MAHARANI', currency: 'IDR', amount: '183,000.00', status: 'Terbayar', tgl: '13 Jul' },
  { docSap: '172804536', deskripsi: 'EOC Kegiatan Bimtek 24 Juni 2026', vendor: 'PT Media Solusi', bank: 'Mandiri', rek: '0987654321', namaRek: 'PT MEDIA SOLUSI', currency: 'IDR', amount: '18,163,500.00', status: 'Terbayar', tgl: '13 Jul' },
  { docSap: '172804539', deskripsi: 'Pembayaran katering rapat rutin', vendor: 'CV Berkah Rasa', bank: 'BCA', rek: '1122334455', namaRek: 'CV BERKAH RASA', currency: 'IDR', amount: '4,524,500.00', status: 'Terbayar', tgl: '13 Jul' },
  { docSap: '172804550', deskripsi: 'Pembayaran Hasil cetak modul', vendor: 'Arif Wibowo', bank: 'Mandiri', rek: '5566778899', namaRek: 'ARIF WIBOWO', currency: 'IDR', amount: '150,000.00', status: 'Terbayar', tgl: '26 Jul' },
  { docSap: '172804555', deskripsi: 'Reimburse Perdin Jateng', vendor: 'Budi Santoso', bank: 'BCA', rek: '9988776655', namaRek: 'BUDI SANTOSO', currency: 'IDR', amount: '350,000.00', status: 'Terbayar', tgl: '26 Jul' }
];


// --- UANG MUKA MOCK DATA ---

export const MOCK_UM_STATUS_KEGIATAN = [
  { name: 'Disetujui', value: 269, fill: '#1E9E6A' },
  { name: 'Draft', value: 8, fill: '#64748b' },
  { name: 'Ditolak', value: 0, fill: '#D64545' }
];

export const MOCK_UM_STATUS_PENGADAAN = [];

export const MOCK_UM_STATUS_REIMBURSE_KEGIATAN = [
  { name: 'Disetujui', value: 5870, fill: '#1E9E6A' },
  { name: 'Draft', value: 1, fill: '#64748b' },
  { name: 'Dibatalkan', value: 1, fill: '#D64545' },
  { name: 'Tahap Approval Unit', value: 1, fill: '#3B82F6' },
  { name: 'Ditolak', value: 0, fill: '#D64545' },
  { name: 'Tahap Approval GAD', value: 1, fill: '#3B82F6' }
];

export const MOCK_UM_STATUS_REIMBURSE_ASET = [
  { name: 'Disetujui', value: 52, fill: '#1E9E6A' },
  { name: 'Draft', value: 2, fill: '#64748b' }
];

export const MOCK_UM_SPJ_KEGIATAN = [
  { name: 'Sudah SPJ', value: 135, fill: '#1E9E6A' },
  { name: 'Belum SPJ', value: 144, fill: '#D64545' }
];

export const MOCK_UM_SPJ_PENGADAAN = [];

export const MOCK_UM_SLA_KEGIATAN = [
  { name: 'Tepat Waktu', value: 45, fill: '#1E9E6A' },
  { name: 'Terlambat', value: 55, fill: '#D64545' },
  { name: 'Belum Jatuh Tempo', value: 35, fill: '#64748b' }
];

export const MOCK_UM_SLA_PENGADAAN = [];

export const MOCK_UM_DETAIL = [
  { header: 'BOM Channel Management', pemohon: 'Dewi Lestari', cc: 'SKL', jenis: 'Reimbursement Kegiatan atau Diluar Perdin', tglAju: '31 Des 2025', tglSetuju: '05 Jan 2026', tglBayar: '10 Jan 2026', status: 'APPROVED' },
  { header: 'Keanggotaan ACN Emersing', pemohon: 'Fitri Handayani', cc: 'PPP', jenis: 'Reimbursement Kegiatan atau Diluar Perdin', tglAju: '18 Jun 2025', tglSetuju: '19 Jun 2025', tglBayar: '21 Jun 2025', status: 'APPROVED' },
  { header: 'Lisensi Office 365', pemohon: 'Gunawan Prasetya', cc: 'OG', jenis: 'Reimbursement Kegiatan atau Diluar Perdin', tglAju: '11 Okt 2024', tglSetuju: '04 Nov 2024', tglBayar: '06 Nov 2024', status: 'APPROVED' },
  { header: 'Lisensi Adobe CC', pemohon: 'Gunawan Prasetya', cc: 'OG', jenis: 'Reimbursement Kegiatan atau Diluar Perdin', tglAju: '02 Sep 2024', tglSetuju: '04 Sep 2024', tglBayar: '14 Sep 2024', status: 'APPROVED' },
  { header: 'PMI Sertifikasi', pemohon: 'Hadi Susanto', cc: 'STI', jenis: 'Uang Muka Kegiatan atau Diluar Perdin', tglAju: '11 Jun 2025', tglSetuju: '12 Jun 2025', tglBayar: '12 Jun 2025', status: 'APPROVED' }
];

