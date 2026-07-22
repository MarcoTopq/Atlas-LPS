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
  {
    id: "ND-13/GSTI",
    title: "Keterangan nota dinas berjenjang-02-02",
    noND: "ND-13/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  },
  {
    id: "ND-11/GSTI",
    title: "Perihal nota dinas berjenjang-01-01",
    noND: "ND-11/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  },
  {
    id: "ND-9/GSTI",
    title: "Perihal nota dinas berjenjang-03-02",
    noND: "ND-9/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  },
  {
    id: "ND-7/GSTI",
    title: "Perihal nota dinas berjenjang-04-02",
    noND: "ND-7/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
    tgl: "1 April 2026",
    dikirimOleh: "Training 2",
    status: "Menunggu"
  },
  {
    id: "ND-5/GSTI",
    title: "Perihal nota dinas berjenjang-05-02",
    noND: "ND-5/GSTI",
    jenisBadge: "Persetujuan Nota Dinas",
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
