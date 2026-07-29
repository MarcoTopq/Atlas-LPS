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
    ringkas: "Ringkasan tidak tersedia",
    penulis: "info.sdm@lps.go.id",
    tipe: "internal",
    pinned: true
  },
  {
    id: "B-002",
    judul: "Program Budaya Inovasi 2026 & Dukung Tim Inovasi Favorit Anda!",
    kategori: "Berita Internal",
    tanggal: "13 Jul 2026",
    waktu: "14:27",
    ringkas: "Halo Insan LPS,Dalam upaya mendukung budaya inovasi di Lembaga Penjamin Simpanan, yuk dukung tim inovasi favoritmu dan jadilah bagian dari perjalanan dalam mewujudkan budaya kerja inovatif.",
    penulis: "idiclc@lps.go.id",
    tipe: "internal"
  },
  {
    id: "B-003",
    judul: "Lindungi Arsip Vital, Jaga Akuntabilitas LPS!",
    kategori: "Berita Internal",
    tanggal: "10 Jul 2026",
    waktu: "10:03",
    ringkas: "Ringkasan tidak tersedia",
    penulis: "info.glu@lps.go.id",
    tipe: "internal"
  },
  {
    id: "B-004",
    judul: "LPS Pertahankan Tingkat Bunga Penjaminan untuk Jaga Stabilitas Perbankan",
    kategori: "Berita Eksternal",
    tanggal: "10 Mei 2024",
    waktu: "09:30",
    ringkas: "Sepanjang tahun 2024, LPS mempertahankan kebijakan bunga penjaminan yang mendukung stabilitas sistem keuangan sambil tetap membuka peluang penyesuaian.",
    penulis: "Humas LPS",
    tipe: "eksternal"
  },
  {
    id: "B-005",
    judul: "LPS Catat Penutupan BPR Tahun 2024 Capai 20 Bank",
    kategori: "Berita Eksternal",
    tanggal: "02 Jun 2024",
    waktu: "14:15",
    ringkas: "LPS secara konsisten melakukan proses rekonsiliasi dan verifikasi untuk membayarkan klaim penjaminan simpanan nasabah dari bank-bank tersebut agar prosesnya berjalan cepat.",
    penulis: "Media Eksternal",
    tipe: "eksternal"
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
  { nama: 'Zulfikri', status: 'Normal', durasi: '11:23:14' },
  { nama: 'Wirawan Bagus Prakosa', status: 'Normal', durasi: '11:15:57' },
  { nama: 'Nasril Hidayat', status: 'Normal', durasi: '11:09:29' },
  { nama: 'Arif Rahman H', status: 'Normal', durasi: '11:07:01' },
  { nama: 'Dafit Suhendra', status: 'Normal', durasi: '10:59:41' },
  { nama: 'Husain Panatas', status: 'Normal', durasi: '10:55:37' }
];

export const MOCK_ABSENSI_DETAIL = [
  { nama: 'A. Harpin Vienza Yora Siregar', grup: 'Group Pengembangan dan Operasional TI', date: '2 January 2026', masuk: '06:54', keluar: '16:35', status: 'Normal' },
  { nama: 'A. Harpin Vienza Yora Siregar', grup: 'Group Pengembangan dan Operasional TI', date: '2 February 2026', masuk: '07:54', keluar: '17:19', status: 'Normal' },
  { nama: 'A. Harpin Vienza Yora Siregar', grup: 'Group Pengembangan dan Operasional TI', date: '2 March 2026', masuk: '07:56', keluar: '15:32', status: 'Normal' },
  { nama: 'A. Harpin Vienza Yora Siregar', grup: 'Group Pengembangan dan Operasional TI', date: '3 February 2026', masuk: '07:47', keluar: '16:48', status: 'Normal' },
  { nama: 'A. Harpin Vienza Yora Siregar', grup: 'Group Pengembangan dan Operasional TI', date: '3 March 2026', masuk: '06:53', keluar: '16:22', status: 'Normal' }
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
  { nama: 'Teguh Pribadi', value: 16 },
  { nama: 'Muhammad Sulaiman', value: 12 },
  { nama: 'Agha Dwi Nugraha', value: 11 },
  { nama: 'Bobon Putra', value: 10 },
  { nama: 'Tiswa Ramdani', value: 10 }
];

export const MOCK_KEP_DETAIL = [
  { nama: 'A. Harpin Vienza Yora Siregar', kelamin: 'Male', grup: 'Group Pengembangan', umur: 34, masa: 5, pangkat: 'Senior Assistant', status: 'Pegawai Tetap' },
  { nama: 'Adenia Adiresta', kelamin: 'Female', grup: 'Group Pengembangan', umur: 27, masa: 5, pangkat: 'Junior Sub Manager', status: 'Pegawai Tetap' },
  { nama: 'Adrian Caesar Prabowo', kelamin: 'Male', grup: 'Group Perencanaan', umur: 30, masa: 7, pangkat: 'Sub Manager', status: 'Pegawai Tetap' },
  { nama: 'Aelisa Nailin Nabila', kelamin: 'Female', grup: 'Group Perencanaan', umur: 28, masa: 5, pangkat: 'Junior Sub Manager', status: 'Pegawai Tetap' },
  { nama: 'Ageng Andri Amukti', kelamin: 'Male', grup: 'Group Perencanaan', umur: 36, masa: 6, pangkat: 'Assistant Manager', status: 'Pegawai Tetap' },
  { nama: 'Agha Dwi Nugraha', kelamin: 'Male', grup: 'Group Pengembangan', umur: 38, masa: 11, pangkat: 'Manager', status: 'Pegawai Tetap' },
  { nama: 'Agung Fauzi Sulaksana', kelamin: 'Male', grup: 'Group Pengembangan', umur: 33, masa: 3, pangkat: 'Outsource', status: 'Tenaga Alih Daya' }
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
  { no: '30230713', tgl: '13 July 2023', jenis: 'Operasional Jumps - Luar Kota', pemohon: 'Agung Fauzi Sulaksana', grup: 'Group Pengembangan', hutang: 'Tidak', reservasiHotel: 'Tidak', tiket: 'Tidak', meeting: 'Tidak', spj: '30 August 2023' },
  { no: '30230718', tgl: '18 July 2023', jenis: 'Operasional Jumps - Luar Kota', pemohon: 'A Harpin Vienza Yora Siregar', grup: 'Group Perencanaan', hutang: 'Tidak', reservasiHotel: 'Tidak', tiket: 'Tidak', meeting: 'Tidak', spj: '12 August 2023' },
  { no: '30230805', tgl: '5 August 2023', jenis: 'Perdin Dinas - Luar Kota', pemohon: 'Adriana Adiresta', grup: 'Group Pengembangan', hutang: 'Ya', reservasiHotel: 'Ya', tiket: 'Ya', meeting: 'Ya', spj: '15 September 2023' }
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
  { docSap: '172804535', deskripsi: 'BBM, Tol, & Parkir Pembukaan Lc Jalan', vendor: 'Dinda Karisma Putri', bank: 'BSI', rek: '1234567890', namaRek: 'DINDA KARISMA PUTRI', currency: 'IDR', amount: '183,000.00', status: 'Terbayar', tgl: '13 Jul' },
  { docSap: '172804536', deskripsi: 'EOC Kegiatan Bimtek 24 Juni 2026', vendor: 'PT Indomedia', bank: 'Mandiri', rek: '0987654321', namaRek: 'PT INDOMEDIA', currency: 'IDR', amount: '18,163,500.00', status: 'Terbayar', tgl: '13 Jul' },
  { docSap: '172804539', deskripsi: 'Pembayaran katering rapat rutin', vendor: 'CV Rasa Nusantara', bank: 'BCA', rek: '1122334455', namaRek: 'CV RASA NUSANTARA', currency: 'IDR', amount: '4,524,500.00', status: 'Terbayar', tgl: '13 Jul' },
  { docSap: '172804550', deskripsi: 'Pembayaran Hasil cetak modul', vendor: 'Arif Rahman Hakim', bank: 'Mandiri', rek: '5566778899', namaRek: 'ARIF RAHMAN HAKIM', currency: 'IDR', amount: '150,000.00', status: 'Terbayar', tgl: '26 Jul' },
  { docSap: '172804555', deskripsi: 'Reimburse Perdin Jateng', vendor: 'Budi Prakoso', bank: 'BCA', rek: '9988776655', namaRek: 'BUDI PRAKOSO', currency: 'IDR', amount: '350,000.00', status: 'Terbayar', tgl: '26 Jul' }
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
  { header: 'BOM Channel Management', pemohon: 'Fadila Tri Yunita', cc: 'SKL', jenis: 'Reimbursement Kegiatan atau Diluar Perdin', tglAju: '31 Des 2025', tglSetuju: '05 Jan 2026', tglBayar: '10 Jan 2026', status: 'APPROVED' },
  { header: 'Keanggotaan ACN Emersing', pemohon: 'Mita Randa Puspa', cc: 'PPP', jenis: 'Reimbursement Kegiatan atau Diluar Perdin', tglAju: '18 Jun 2025', tglSetuju: '19 Jun 2025', tglBayar: '21 Jun 2025', status: 'APPROVED' },
  { header: 'Lisensi Office 365', pemohon: 'Luis Yulianto', cc: 'OG', jenis: 'Reimbursement Kegiatan atau Diluar Perdin', tglAju: '11 Okt 2024', tglSetuju: '04 Nov 2024', tglBayar: '06 Nov 2024', status: 'APPROVED' },
  { header: 'Lisensi Adobe CC', pemohon: 'Luis Yulianto', cc: 'OG', jenis: 'Reimbursement Kegiatan atau Diluar Perdin', tglAju: '02 Sep 2024', tglSetuju: '04 Sep 2024', tglBayar: '14 Sep 2024', status: 'APPROVED' },
  { header: 'PMI Sertifikasi', pemohon: 'Aris Wiyono', cc: 'STI', jenis: 'Uang Muka Kegiatan atau Diluar Perdin', tglAju: '11 Jun 2025', tglSetuju: '12 Jun 2025', tglBayar: '12 Jun 2025', status: 'APPROVED' }
];

