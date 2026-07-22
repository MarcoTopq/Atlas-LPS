export const MOCK_BPM_TASKS = [
  {
    id: "REV-2026-04-02",
    jenis: "Revolving Uang Persediaan",
    title: "REV - 2026-04-02 15:29:53",
    noSAP: "1113000008",
    idBPM: "-",
    pemohon: "Iman Santoso Syarif Hidayat, 4 Apr 2026",
    direview: "-",
    approver: "Approver Level 2 - Wening Cahyaningtyas",
  },
  {
    id: "REV-2026-04-03",
    jenis: "Revolving Uang Persediaan",
    title: "REV - 2026-04-02 15:29:53",
    noSAP: "1113000010",
    idBPM: "2604060003",
    pemohon: "Iman Santoso Syarif Hidayat, 6 Apr 2026",
    direview: "-",
    approver: "Approver Level 2 - Wening Cahyaningtyas",
  },
  {
    id: "S-475-DSDA-2025",
    jenis: "Reimbursement Kegiatan atau Diluar Perdin",
    title: "S-475/DSDA/2025",
    noSAP: "1124001397",
    idBPM: "-",
    pemohon: "Budi Santoso, 30 Jan 2025",
    direview: "-",
    approver: "Approver Level 1 - Andi Susanto",
  }
];

export const MOCK_BPM_RIWAYAT_LIST = [
  {
    id: "REV-2026-04-02",
    jenis: "Konsinyering - Luar Kota",
    title: "test perdin 30/06-3",
    noSAP: "2606300008",
    idBPM: "26000040",
    pemohon: "Arif Rahman H, 17 Juli 2026",
    status: "Disetujui"
  },
  {
    id: "UM-Keg-perdin2-1",
    jenis: "Uang Muka Kegiatan atau Diluar Perdin",
    title: "UM Keg-perdin2",
    noSAP: "2606240004",
    idBPM: "1124000010",
    pemohon: "Arif Rahman H, 13 Juli 2026",
    status: "Disetujui"
  },
  {
    id: "UM-Keg-perdin2-2",
    jenis: "Uang Muka Kegiatan atau Diluar Perdin",
    title: "UM Keg-perdin2",
    noSAP: "2606240004",
    idBPM: "1124000010",
    pemohon: "Arif Rahman H, 13 Juli 2026",
    status: "Disetujui"
  },
  {
    id: "UM-Keg-perdin2-3",
    jenis: "Uang Muka Kegiatan atau Diluar Perdin",
    title: "UM Keg-perdin2",
    noSAP: "2606240004",
    idBPM: "1124000010",
    pemohon: "Arif Rahman H, 13 Juli 2026",
    status: "Disetujui"
  }
];

export const MOCK_BPM_DETAIL = {
  id: "S-475-DSDA-2025",
  title: "S-475/DSDA/2025",
  jenis: "Reimbursement Kegiatan atau Diluar Perdin",
  metadata: {
    postingDate: "30 Januari 2025",
    noDocSAP: "1124001397",
    period: "11",
    currency: "IDR"
  },
  brief: {
    ringkasan: "Pengajuan reimbursement ini ditujukan untuk biaya pelaksanaan simulasi kegiatan pengembangan awareness dan partisipasi dalam simulasi DRC (Disaster Recovery Center) LPS Semester 2.",
    kv: [
      { k: "Kesesuaian Nilai", v: "Sesuai standar ✓" },
      { k: "Anggaran", v: "Tersedia (Cukup)" },
      { k: "Dasar Aturan", v: "SE Logistik No.07/2024" }
    ],
    sitasi: "Peraturan Keuangan LPS Bab IV Pasal 12 (2): 'Penggantian biaya kegiatan di luar perdin wajib melampirkan rincian pengeluaran maksimal 14 hari kerja.'",
    flag: "normal"
  },
  catatan: "Simulasi Pengaktifan DRC LPS Semester 2",
  jurnal: {
    totalDebit: "77,100,000",
    totalCredit: "77,100,000",
    items: [
      {
        id: "1",
        accountNo: "52710000",
        accountName: "Macam macam",
        glAccName: "Macam - macam pengeluaran",
        glAccDesc: "Macam-macam pengeluaran yang tidak tertampung pada akun operasional...",
        costCenter: "010M",
        glOrder: "-",
        assignment: "00001824-2025",
        wbs: "-",
        description: "Beban pelaksaaan simulasi kegiatan pengembangan awareness dan diikutsertakannya pada simulasi DRC...",
        nilai: "2,000,000",
        ppn: "-35,000",
        total: "-1,975,000"
      },
      {
        id: "2",
        accountNo: "52710000",
        accountName: "Macam macam",
        glAccName: "Macam - macam pengeluaran",
        glAccDesc: "Macam-macam pengeluaran yang tidak tertampung pada akun operasional...",
        costCenter: "010M",
        glOrder: "-",
        assignment: "00001824-2025",
        wbs: "-",
        description: "Beban pelaksaaan simulasi kegiatan pengembangan awareness dan diikutsertakannya pada simulasi DRC...",
        nilai: "2,000,000",
        ppn: "-35,000",
        total: "-1,975,000"
      },
      {
        id: "3",
        accountNo: "52710000",
        accountName: "Macam macam",
        glAccName: "Macam - macam pengeluaran",
        glAccDesc: "Macam-macam pengeluaran yang tidak tertampung pada akun operasional...",
        costCenter: "010M",
        glOrder: "-",
        assignment: "00001824-2025",
        wbs: "-",
        description: "Beban pelaksaaan simulasi kegiatan pengembangan awareness dan diikutsertakannya pada simulasi DRC...",
        nilai: "2,000,000",
        ppn: "-35,000",
        total: "-1,975,000"
      }
    ]
  },
  dokumen: [
    { title: "Dasar Pemohonan/Pelaksanaan Kegiatan (Persetujuan/Kontrak/SPK, dst)", status: "Tidak ada dokumen" },
    { title: "Invoice/Kwitansi/Form pengajuan UM/Form atau bentuk lainnya sebagai dokumen penagihan, Faktur Pajak (Jika Ada)", status: "Tidak ada dokumen" },
    { title: "Bukti pelaksanaan kegiatan (daftar hadir, laporan kegiatan, dokumentasi kegiatan atau bentuk lainnya (kecuali uang muka))", status: "Tidak ada dokumen" },
    { title: "Dokumen Lainnya", status: "Tidak ada dokumen" }
  ],
  riwayat: [
    {
      name: "Arif Rahman H",
      role: "Initiator",
      unit: "Tenaga Pendukung Helpdesk - STI",
      status: "Selesai submit",
      date: "24 Jun 2026, 11:14",
      notes: ""
    },
    {
      name: "Monang Siringoringo",
      role: "Approver 1",
      unit: "Direktur Group Sistem Informasi - STI",
      status: "Disetujui",
      date: "13 Jul 2026, 10:57",
      notes: "Approve"
    },
    {
      name: "Samsu Adi Nugroho",
      role: "Approver 2",
      unit: "Direktur Eksekutif SDM&Administrasi - SKL",
      status: "Disetujui",
      date: "13 Jul 2026, 10:57",
      notes: "Approve"
    },
    {
      name: "K.M. Nuruddin",
      role: "Approver 3",
      unit: "Plt.Direktur Eksekutif Keuangan - SKL",
      status: "Disetujui",
      date: "13 Jul 2026, 10:59",
      notes: "Approve"
    }
  ]
};

export const MOCK_BPM_DELEGASI_LIST = [
  {
    id: "DEL-001",
    title: "Delegasi Wewenang Approval BPM e-Procurement",
    delegator: "Budi Santoso (Kadiv GRC)",
    delegatee: "Andi Susanto (Kepala Subdivisi)",
    period: "01 Jul 2026 - 15 Jul 2026",
    status: "Aktif",
    brief: "Delegasi kewenangan persetujuan e-Procurement dan Perjalanan Dinas selama penugasan luar kota."
  },
  {
    id: "DEL-002",
    title: "Delegasi Persetujuan Reimbursement & Uang Muka",
    delegator: "Rina Wijaya (Plt. Direktur)",
    delegatee: "Denny Setiawan (Senior Manager)",
    period: "10 Jun 2026 - 20 Jun 2026",
    status: "Selesai",
    brief: "Delegasi otomatis karena Cuti Tahunan."
  }
];

export const MOCK_BPM_REVIEWER_LIST = [
  {
    id: "REV-101",
    title: "Reviewer Pengadaan Lisensi Software IT 2026",
    subjek: "Telaah Aturan Pengadaan Barang & Jasa",
    reviewer: "Iman Santoso (Tim Kepatuhan)",
    status: "Menunggu Review",
    sla: "⏱ 4 jam lagi",
    brief: "Memerlukan penelaahan klausul SLA dan lisensi multi-user berdasarkan SE Logistik No. 04/2025."
  },
  {
    id: "REV-102",
    title: "Reviewer Evaluasi Risiko Perjalanan Dinas Luar Negeri",
    subjek: "Risk Assessment Tim Manajemen",
    reviewer: "Budi Santoso (GRC)",
    status: "Selesai Review",
    sla: "Selesai",
    brief: "Telah ditelaah sesuai dengan ketentuan mitigasi risiko perjalanan dinas antar negara."
  }
];

export const MOCK_BPM_PEMBAYARAN_LIST = [
  {
    id: "PEM-201",
    title: "Pembayaran Vendor Pengadaan Server DRC",
    noSAP: "3104920192",
    vendor: "PT Sistem Data Nusantara",
    amount: "Rp 145.000.000",
    status: "Proses Transfer SAP",
    brief: "Pembayaran termin ke-2 setelah BAST ditandatangani oleh Kadiv STI."
  },
  {
    id: "PEM-202",
    title: "Reimbursement Konsumsi Rapat Anggota Dewan",
    noSAP: "3104920205",
    vendor: "CV Rasa Nusantara",
    amount: "Rp 4.250.000",
    status: "Terbayar",
    brief: "Sudah diverifikasi oleh Modul Keuangan SAP Core."
  }
];

export const MOCK_NASKAH_INBOX_LIST = [
  {
    id: "ND-IN-101",
    title: "ND-402/DSDA/2026 - Permohonan Pendampingan Audit Sistem Informasi",
    pengirim: "Divisi Audit Internal",
    tgl: "21 Juli 2026",
    sifat: "Sangat Rahasia",
    status: "Belum Dibaca",
    brief: "Nota Dinas permohonan audit TI rutin untuk kuartal III tahun 2026."
  },
  {
    id: "ND-IN-102",
    title: "ND-389/SKL/2026 - Sosialisasi Peraturan Kepegawaian Terbaru",
    pengirim: "Group SDM & Layanan",
    tgl: "19 Juli 2026",
    sifat: "Biasa",
    status: "Sudah Dibaca",
    brief: "Informasi penyesuaian hak cuti dan fasilitas kesehatan pegawai LPS."
  }
];

export const MOCK_NASKAH_OUTBOX_LIST = [
  {
    id: "ND-OUT-201",
    title: "ND-1610/STI/2026 - Laporan Hasil Pengetesan Sistem DRC LPS",
    penerima: "Direktur Eksekutif STI",
    tgl: "20 Juli 2026",
    status: "Terkirim",
    brief: "Laporan resmi penyelesaian pengujian simulasi DRC Semester I."
  },
  {
    id: "ND-OUT-202",
    title: "ND-1605/STI/2026 - Pengajuan Peremajaan Perangkat Laptop Kerja",
    penerima: "Divisi Logistik & Aset",
    tgl: "18 Juli 2026",
    status: "Proses Verifikasi",
    brief: "Permohonan pengadaan 15 unit laptop kerja pengganti unit tahun 2021."
  }
];

export const MOCK_NASKAH_TASKLIST = [
  {
    id: "ND-1610-2026",
    noND: "ND-1610/STI/2026",
    title: "Nota Dinas Perjalanan Dinas Proyek X Surabaya",
    pemohon: "Budi Santoso (Kadiv GRC)",
    tgl: "22 Juli 2026",
    prioritas: "hi",
    sla: "⏱ 2 jam lagi",
    sistem: "e-Correspondence",
    brief: "Pengajuan perjalanan dinas untuk tim proyek X ke Surabaya selama 3 hari terkait koordinasi awal.",
    peraturan: "Peraturan Kepegawaian LPS Bab VI Pasal 32 (1) terkait Perjalanan Dinas Biasa."
  },
  {
    id: "ND-1590-2026",
    noND: "ND-1590/SKL/2026",
    title: "Nota Dinas Permohonan Persetujuan Anggaran Kegiatan Workshop TI",
    pemohon: "Siti Aminah (Analisa Sistem)",
    tgl: "21 Juli 2026",
    prioritas: "mid",
    sla: "Hari ini",
    sistem: "e-Correspondence",
    brief: "Nota Dinas pengajuan alokasi anggaran workshop arsitektur microservices.",
    peraturan: "SE Logistik No. 07/2024 Poin 3 tentang Pengembangan Kompetensi Pegawai."
  },
  {
    id: "ND-1582-2026",
    noND: "ND-1582/LOG/2026",
    title: "Nota Dinas Pengadaan Pemeliharaan Rutin AC Server Room",
    pemohon: "Dian Wahyuni (Logistik)",
    tgl: "20 Juli 2026",
    prioritas: "lo",
    sla: "Besok",
    sistem: "e-Correspondence",
    brief: "Nota Dinas persetujuan penunjukan langsung kontraktor pemeliharaan AC server.",
    peraturan: "Pedoman Pengadaan Barang & Jasa LPS Bab II Pasal 15."
  }
];
