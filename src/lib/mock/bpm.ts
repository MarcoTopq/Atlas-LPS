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
  },
  {
    id: "VT-2026-0918",
    jenis: "Voucher Taksi Lembur",
    title: "VT - Lembur Proyek Coretax 18/07",
    noSAP: "1113000021",
    idBPM: "2607180002",
    pemohon: "Andi Saputra, 18 Jul 2026",
    direview: "Reviewer GRC - OK",
    approver: "Approver Level 1 - Wening Cahyaningtyas",
  },
  {
    id: "PD-2026-0114",
    jenis: "Perjalanan Dinas Luar Kota",
    title: "PD - Koordinasi KPW Surabaya",
    noSAP: "2607150006",
    idBPM: "2607150001",
    pemohon: "Dian Wahyuni, 15 Jul 2026",
    direview: "-",
    approver: "Approver Level 2 - Monang Siringoringo",
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

/**
 * Detail BPM per-ID. `jenisKanon` dipakai instrumentasi riset
 * (Key Metric: sentralisasi >= 3 jenis approval).
 */
export const MOCK_BPM_DETAILS: Record<string, typeof MOCK_BPM_DETAIL & { jenisKanon: string }> = {
  "S-475-DSDA-2025": { ...MOCK_BPM_DETAIL, jenisKanon: "bpm" },
  "REV-2026-04-02": {
    ...MOCK_BPM_DETAIL,
    id: "REV-2026-04-02",
    title: "REV - 2026-04-02 15:29:53",
    jenis: "Revolving Uang Persediaan",
    jenisKanon: "bpm",
    metadata: { postingDate: "4 April 2026", noDocSAP: "1113000008", period: "4", currency: "IDR" },
    brief: {
      ringkasan: "Pengisian kembali (revolving) uang persediaan operasional divisi. Saldo kas kecil di bawah ambang minimum 20%, pengisian sesuai siklus bulanan.",
      kv: [
        { k: "Saldo Kas Kecil", v: "18% (di bawah ambang)" },
        { k: "Siklus", v: "Sesuai jadwal ✓" }
      ],
      sitasi: "Peraturan Keuangan LPS Bab III Pasal 8: pengisian uang persediaan dilakukan saat saldo mencapai 20% atau sesuai siklus bulanan.",
      flag: "normal"
    },
    catatan: "Revolving rutin uang persediaan April 2026",
    jurnal: {
      totalDebit: "25,000,000",
      totalCredit: "25,000,000",
      items: [MOCK_BPM_DETAIL.jurnal.items[0]]
    }
  },
  "REV-2026-04-03": {
    ...MOCK_BPM_DETAIL,
    id: "REV-2026-04-03",
    title: "REV - 2026-04-02 15:29:53",
    jenis: "Revolving Uang Persediaan",
    jenisKanon: "bpm",
    metadata: { postingDate: "6 April 2026", noDocSAP: "1113000010", period: "4", currency: "IDR" },
    brief: {
      ringkasan: "Revolving uang persediaan lanjutan. AI mendeteksi dua pengajuan revolving dalam rentang 2 hari dari pemohon yang sama — verifikasi apakah bukan duplikasi.",
      kv: [
        { k: "Interval Pengajuan", v: "2 hari ⚠" },
        { k: "Pemohon", v: "Sama dengan REV-04-02" }
      ],
      sitasi: "Peraturan Keuangan LPS Bab III Pasal 8 ayat (3): pengisian uang persediaan maksimal satu kali per siklus.",
      flag: "anomali"
    },
    catatan: "Perlu klarifikasi duplikasi dengan pengajuan 4 April 2026",
    jurnal: {
      totalDebit: "25,000,000",
      totalCredit: "25,000,000",
      items: [MOCK_BPM_DETAIL.jurnal.items[0]]
    }
  },
  "VT-2026-0918": {
    ...MOCK_BPM_DETAIL,
    id: "VT-2026-0918",
    title: "VT - Lembur Proyek Coretax 18/07",
    jenis: "Voucher Taksi Lembur",
    jenisKanon: "voucher",
    metadata: { postingDate: "18 Juli 2026", noDocSAP: "1113000021", period: "7", currency: "IDR" },
    brief: {
      ringkasan: "Klaim voucher taksi lembur pengerjaan proyek Coretax. Jam pulang 22.15 WIB, lembur pre-approved, rute sesuai domisili terdaftar pegawai.",
      kv: [
        { k: "Jam Pulang", v: "22.15 WIB ✓ (> 20.00)" },
        { k: "Status Lembur", v: "Pre-approved ✓" },
        { k: "Nilai Klaim", v: "Sesuai tarif zona ✓" }
      ],
      sitasi: "SE Logistik No. 07/2024 poin 3: voucher taksi lembur berlaku untuk kepulangan di atas pukul 20.00 WIB dengan lembur yang telah disetujui.",
      flag: "normal"
    },
    catatan: "Lembur deployment Coretax fase 2",
    jurnal: {
      totalDebit: "195,000",
      totalCredit: "195,000",
      items: [{
        ...MOCK_BPM_DETAIL.jurnal.items[0],
        accountNo: "52430000",
        accountName: "Transportasi",
        glAccName: "Beban transportasi pegawai",
        glAccDesc: "Beban transportasi lembur pegawai sesuai SE Logistik",
        description: "Voucher taksi lembur proyek Coretax 18 Juli 2026",
        nilai: "195,000",
        ppn: "-",
        total: "195,000"
      }]
    },
    dokumen: [
      { title: "e-Receipt Taksi", status: "1 dokumen terlampir" },
      { title: "Persetujuan Lembur (Pre-approval)", status: "1 dokumen terlampir" }
    ]
  },
  "PD-2026-0114": {
    ...MOCK_BPM_DETAIL,
    id: "PD-2026-0114",
    title: "PD - Koordinasi KPW Surabaya",
    jenis: "Perjalanan Dinas Luar Kota",
    jenisKanon: "bpm",
    metadata: { postingDate: "15 Juli 2026", noDocSAP: "2607150006", period: "7", currency: "IDR" },
    brief: {
      ringkasan: "Perjalanan dinas 2 pegawai ke KPW Surabaya selama 3 hari untuk koordinasi program penjaminan. RAB sesuai standar biaya perjalanan dinas golongan terkait.",
      kv: [
        { k: "Durasi", v: "3 hari" },
        { k: "RAB vs Standar", v: "Sesuai ✓" },
        { k: "Anggaran", v: "Tersedia (Cukup)" }
      ],
      sitasi: "Peraturan Kepegawaian LPS Bab VI Pasal 32 (1) terkait Perjalanan Dinas Biasa.",
      flag: "normal"
    },
    catatan: "Koordinasi program penjaminan KPW Surabaya",
    jurnal: {
      totalDebit: "18,400,000",
      totalCredit: "18,400,000",
      items: [{
        ...MOCK_BPM_DETAIL.jurnal.items[0],
        accountNo: "52410000",
        accountName: "Perjalanan Dinas",
        glAccName: "Beban perjalanan dinas dalam negeri",
        glAccDesc: "Beban tiket, akomodasi, dan uang harian perjalanan dinas",
        description: "Perdin koordinasi KPW Surabaya 2 pegawai x 3 hari",
        nilai: "18,400,000",
        ppn: "-",
        total: "18,400,000"
      }]
    },
    dokumen: [
      { title: "RAB Perjalanan Dinas", status: "1 dokumen terlampir" },
      { title: "Undangan/Dasar Kegiatan", status: "1 dokumen terlampir" }
    ]
  }
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
    id: "ND-R.22/GSTI",
    title: "Nota Dinas - Rahasia",
    noND: "ND-R.22/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
    tgl: "27 April 2026",
    dikirimOleh: "Training 3",
    status: "Terkirim",
    brief: "Nota Dinas Rahasia mengenai arahan pengamanan data sensitif dan infrastruktur IT LPS."
  },
  {
    id: "ND-R.21/GSTI",
    title: "Testing Nota Dinas Rahasia",
    noND: "ND-R.21/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
    tgl: "27 April 2026",
    dikirimOleh: "Training 3",
    status: "Proses Review",
    brief: "Pengujian alur persetujuan dokumen rahasia."
  },
  {
    id: "ND-20/GSTI",
    title: "Test ND Persetujuan Surat Biasa",
    noND: "ND-20/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
    tgl: "27 April 2026",
    dikirimOleh: "Training 4",
    status: "Terkirim",
    brief: "Nota dinas biasa persetujuan kegiatan sosialisasi internal."
  },
  {
    id: "ND-R.19/GSTI",
    title: "Pengujian One LPS Mobile 1",
    noND: "ND-R.19/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
    tgl: "17 April 2026",
    dikirimOleh: "Training 3",
    status: "Terkirim",
    brief: "Pengujian fungsionalitas aplikasi mobile One LPS."
  }
];

export const MOCK_NASKAH_OUTBOX_DETAIL = {
  id: "ND-R.22/GSTI",
  title: "Nota Dinas - Rahasia",
  jenisBadge: "Persetujuan Nota Dinas",
  metadata: {
    pengajuan: "27 April 2026",
    tindakLanjut: "-"
  },
  brief: {
    ringkasan: "Nota Dinas Rahasia mengenai arahan pengamanan data sensitif dan infrastruktur IT LPS.",
    sitasi: "Peraturan Keamanan Informasi LPS No. 05/2024 Pasal 11 ayat (1).",
    flag: "normal"
  },
  detail: {
    nomorDokumen: "ND-R.22/GSTI",
    tipeSurat: "Surat Rahasia",
    jenisSurat: "Nota Dinas Persetujuan",
    tanggal: "27 April 2026",
    perihal: "Nota Dinas - Rahasia",
    deskripsi: "Nota Dinas - Rahasia",
    crossReference: "Nota Dinas - Rahasia",
    dikirimOleh: "Training 3"
  },
  lampiran: [
    { nama: "6487fc3a3c5ef.jpg", ukuran: "1.2 MB" }
  ],
  posisiSurat: {
    reviewer: [
      { docNo: "Temporary:ND-R.29/GSTI", name: "Training 3", status: "Approve - OK, Segera direvisi" }
    ],
    penyetuju: [
      { docNo: "Temporary:ND-R.29/GSTI", name: "Training 2", status: "Revise - Please revise it immediately" },
      { docNo: "Temporary:ND-R.29/GSTI", name: "Training 2", status: "Approve - Oke Setuju" }
    ],
    penandaTangan: [
      { docNo: "Temporary:ND-R.29/GSTI", name: "Training 2", status: "Approve - Auto Approved" }
    ]
  }
};

export const MOCK_NASKAH_TASKLIST = [
  // Items under "Nota Dinas" tab
  {
    id: "Temporary:ND-R.31/GSTI",
    title: "perihal - test nota dinas biasa 1 11/06/2026",
    noND: "Temporary:ND-R.31/GSTI",
    tabCategory: "Nota Dinas",
    jenisBadge: "Nota Dinas",
    isRahasia: true,
    tgl: "11 Juni 2026",
    dikirimOleh: "Konseptor (Training 4)",
    status: "Menunggu"
  },
  {
    id: "Temporary:ND-R.30/GSTI",
    title: "Permohonan Fasilitas Server Proyek Audit TI",
    noND: "Temporary:ND-R.30/GSTI",
    tabCategory: "Nota Dinas",
    jenisBadge: "Nota Dinas",
    isRahasia: false,
    tgl: "10 Juni 2026",
    dikirimOleh: "Training 3",
    status: "Menunggu"
  },

  // Items under "Persetujuan Nota Dinas" tab
  {
    id: "ND-13/GSTI",
    title: "Keterangan nota dinas berjenjang-02-02",
    noND: "ND-13/GSTI",
    tabCategory: "Persetujuan Nota Dinas",
    jenisBadge: "Persetujuan Nota Dinas",
    isRahasia: false,
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  },
  {
    id: "ND-11/GSTI",
    title: "Perihal nota dinas berjenjang-01-01",
    noND: "ND-11/GSTI",
    tabCategory: "Persetujuan Nota Dinas",
    jenisBadge: "Persetujuan Nota Dinas",
    isRahasia: false,
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  },
  {
    id: "ND-9/GSTI",
    title: "Perihal nota dinas berjenjang-03-02",
    noND: "ND-9/GSTI",
    tabCategory: "Persetujuan Nota Dinas",
    jenisBadge: "Persetujuan Nota Dinas",
    isRahasia: false,
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  },
  {
    id: "ND-7/GSTI",
    title: "Perihal nota dinas berjenjang-04-02",
    noND: "ND-7/GSTI",
    tabCategory: "Persetujuan Nota Dinas",
    jenisBadge: "Persetujuan Nota Dinas",
    isRahasia: false,
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  },
  {
    id: "ND-5/GSTI",
    title: "Perihal nota dinas berjenjang-05-02",
    noND: "ND-5/GSTI",
    tabCategory: "Persetujuan Nota Dinas",
    jenisBadge: "Persetujuan Nota Dinas",
    isRahasia: false,
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  }
];

export const MOCK_NASKAH_TASKLIST_DETAIL = {
  id: "ND-13/GSTI",
  title: "Keterangan nota dinas berjenjang-02-02",
  jenisBadge: "Persetujuan Nota Dinas",
  statusBadge: "Menunggu",
  isRahasia: false,
  metadata: {
    pengajuan: "1 April 2026",
    tindakLanjut: "-"
  },
  brief: {
    ringkasan: "AI Atlas menterjemahkan: Pengajuan persetujuan nota dinas berjenjang unit GSTI terkait penetapan akses Coretax LPS OP.",
    sitasi: "Peraturan Tata Kelola Surat Dinas LPS No. 03/2024 Bab V.",
    flag: "normal"
  },
  detail: {
    nomorDokumen: "ND-13/GSTI",
    tipeSurat: "Surat Biasa",
    jenisSurat: "Persetujuan Nota Dinas",
    perihal: "Keterangan nota dinas berjenjang-02-02",
    deskripsi: "Deskripsi nota dinas berjenjang-02-02",
    crossReference: "-",
    reviewer: "Training 3"
  },
  lampiran: [
    { nama: "30064_Akses Coretax_LPS OP.pdf", ukuran: "340 KB" },
    { nama: "30065_Akses Coretax_LPS OP.pdf", ukuran: "512 KB" }
  ],
  riwayatPengajuan: [
    {
      action: "Telah direview",
      date: "30 Mar 2026, 15:02",
      statusTitle: "Telah direview - completed",
      note: "Reviewer (Training 3) - sudah direview"
    },
    {
      action: "Telah disetujui",
      date: "30 Mar 2026, 15:02",
      statusTitle: "Telah disetujui - completed",
      note: "Approver (Training 3) - sudah direview"
    },
    {
      action: "Telah disetujui",
      date: "1 Apr 2026, 13:34",
      statusTitle: "Telah disetujui - completed",
      note: "PejabatPenandatangan (Training 2) - okee"
    },
    {
      action: "Telah disetujui",
      date: "1 Apr 2026, 13:34",
      statusTitle: "Telah disetujui - completed",
      note: ""
    }
  ]
};

/** Detail Naskah Dinas per-ID (fallback: MOCK_NASKAH_TASKLIST_DETAIL). */
export function getNaskahDetail(id: string) {
  const overrides: Record<string, Partial<typeof MOCK_NASKAH_TASKLIST_DETAIL>> = {
    "Temporary:ND-R.30/GSTI": {
      id: "Temporary:ND-R.30/GSTI",
      title: "Permohonan Fasilitas Server Proyek Audit TI",
      jenisBadge: "Nota Dinas",
      isRahasia: false,
      metadata: { pengajuan: "10 Juni 2026", tindakLanjut: "-" },
      brief: {
        ringkasan: "AI Atlas menterjemahkan: Permohonan alokasi 2 VM server untuk kebutuhan proyek audit TI Kuartal III. Spesifikasi sesuai standar katalog layanan STI.",
        sitasi: "Kebijakan Layanan TI LPS No. 02/2025 Bab IV: permintaan fasilitas server melalui persetujuan Kepala Divisi terkait.",
        flag: "normal"
      },
      detail: {
        ...MOCK_NASKAH_TASKLIST_DETAIL.detail,
        nomorDokumen: "Temporary:ND-R.30/GSTI",
        tipeSurat: "Surat Biasa",
        jenisSurat: "Nota Dinas Biasa",
        perihal: "Permohonan Fasilitas Server Proyek Audit TI",
        deskripsi: "Permohonan alokasi VM untuk audit TI Q3 2026",
      },
      lampiran: [{ nama: "Spesifikasi_Server.pdf", ukuran: "220 KB" }]
    },
    "ND-11/GSTI": {
      id: "ND-11/GSTI",
      title: "Perihal nota dinas berjenjang-01-01",
      brief: {
        ringkasan: "AI Atlas menterjemahkan: Persetujuan berjenjang tahap pertama untuk penetapan pedoman klasifikasi data internal unit GSTI.",
        sitasi: "Peraturan Keamanan Informasi LPS No. 05/2024 Pasal 7.",
        flag: "normal"
      },
      detail: { ...MOCK_NASKAH_TASKLIST_DETAIL.detail, nomorDokumen: "ND-11/GSTI", perihal: "Perihal nota dinas berjenjang-01-01" }
    },
    "ND-9/GSTI": {
      id: "ND-9/GSTI",
      title: "Perihal nota dinas berjenjang-03-02",
      brief: {
        ringkasan: "AI Atlas menterjemahkan: Persetujuan pengadaan lisensi software monitoring jaringan. AI mendeteksi nilai pengadaan mendekati ambang batas kewenangan approval level ini — pastikan jenjang persetujuan sesuai.",
        sitasi: "SE Pengadaan No. 04/2025: pengadaan di atas Rp 200jt memerlukan persetujuan Direktur Grup.",
        flag: "anomali"
      },
      detail: { ...MOCK_NASKAH_TASKLIST_DETAIL.detail, nomorDokumen: "ND-9/GSTI", perihal: "Perihal nota dinas berjenjang-03-02" }
    },
    "ND-7/GSTI": {
      id: "ND-7/GSTI",
      title: "Perihal nota dinas berjenjang-04-02",
      brief: {
        ringkasan: "AI Atlas menterjemahkan: Usulan jadwal pemeliharaan sistem inti (maintenance window) di luar jam operasional. Tidak ada konflik dengan rilis sistem lain.",
        sitasi: "Kebijakan Operasional TI LPS Bab II: maintenance window wajib disetujui pimpinan unit.",
        flag: "normal"
      },
      detail: { ...MOCK_NASKAH_TASKLIST_DETAIL.detail, nomorDokumen: "ND-7/GSTI", perihal: "Perihal nota dinas berjenjang-04-02" }
    },
    "ND-5/GSTI": {
      id: "ND-5/GSTI",
      title: "Perihal nota dinas berjenjang-05-02",
      brief: {
        ringkasan: "AI Atlas menterjemahkan: Laporan hasil uji pemulihan bencana (DRC) semester 1 beserta permohonan penetapan tindak lanjut temuan minor.",
        sitasi: "Kebijakan Keberlangsungan Bisnis LPS Pasal 9: hasil uji DRC dilaporkan ke pimpinan unit maksimal 14 hari kerja.",
        flag: "normal"
      },
      detail: { ...MOCK_NASKAH_TASKLIST_DETAIL.detail, nomorDokumen: "ND-5/GSTI", perihal: "Perihal nota dinas berjenjang-05-02" }
    }
  };
  const base =
    id.includes("Temporary:ND-R.31") ? MOCK_NOTA_DINAS_DETAIL : MOCK_NASKAH_TASKLIST_DETAIL;
  return { ...base, ...(overrides[id] ?? {}) };
}

export const MOCK_NOTA_DINAS_DETAIL = {
  id: "Temporary:ND-R.31/GSTI",
  title: "perihal - test nota dinas biasa 1 11/06/2026",
  jenisBadge: "Nota Dinas",
  statusBadge: "Menunggu",
  isRahasia: true,
  metadata: {
    pengajuan: "11 Juni 2026",
    tindakLanjut: "-"
  },
  brief: {
    ringkasan: "AI Atlas menterjemahkan: Nota Dinas Rahasia terkait pengujian sistem nota dinas biasa unit GSTI.",
    sitasi: "Peraturan Rahasia LPS No. 01/2025 Bab III.",
    flag: "normal"
  },
  detail: {
    nomorDokumen: "Temporary:ND-R.31/GSTI",
    tipeSurat: "Surat Rahasia",
    jenisSurat: "Nota Dinas Biasa",
    perihal: "perihal - test nota dinas biasa 1 11/06/2026",
    deskripsi: "deskripsi - test nota dinas biasa 1 11/06/2026",
    crossReference: "corss ref",
    reviewer: "Training 3"
  },
  lampiran: [
    { nama: "lampiran 1.pdf", ukuran: "180 KB" }
  ],
  riwayatPengajuan: [
    {
      action: "11 Jun 2026, 09:33",
      date: "11 Jun 2026, 09:33",
      statusTitle: "Telah disubmit",
      note: "Konseptor (Training 4) - ini catatan"
    },
    {
      action: "11 Jun 2026, 09:40",
      date: "11 Jun 2026, 09:40",
      statusTitle: "Telah direview",
      note: "Reviewer (Training 3) - setuju"
    },
    {
      action: "11 Jun 2026, 09:41",
      date: "11 Jun 2026, 09:41",
      statusTitle: "Telah disetujui",
      note: "Approver (Training 3) - Auto Approved"
    }
  ]
};
