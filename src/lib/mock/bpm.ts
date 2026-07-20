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
  }
};
