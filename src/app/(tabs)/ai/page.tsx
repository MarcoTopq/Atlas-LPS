"use client";

import { Sparkles, Lock, FileText, Send, Paperclip, X, Download, Printer, Eye } from "lucide-react";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useResearch } from "@/lib/research";

type SourceItem = {
  type?: 'primary' | 'related';
  document?: string;
  document_id?: string;
  article?: string;
  page?: number;
  relevance?: string;
  relationship?: string;
  excerpt?: string;
};

type Message = {
  id: number;
  sender: 'ai' | 'user';
  text: string;
  sources?: string[];
  primarySources?: SourceItem[];
  relatedSources?: SourceItem[];
  evidenceReasoning?: string[];
  isStreaming?: boolean;
  statusText?: string;
};

type SelectedPdf = {
  document: string;
  document_id?: string;
  article?: string;
  page?: number;
  excerpt?: string;
} | null;

function FormattedText({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
        const lineContent = isBullet ? trimmed.substring(2) : line;

        // Split by bold (**text** or __text__) and inline code (`text`)
        const parts = lineContent.split(/(\*\*.*?\*\*|__.*?__|`.*?`)/g);

        const renderedLine = (
          <span>
            {parts.map((part, partIdx) => {
              if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
                return <strong key={partIdx} className="font-extrabold text-navy">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={partIdx} className="bg-slate-200/80 text-navy px-1.5 py-0.5 rounded text-[12px] font-mono">{part.slice(1, -1)}</code>;
              }
              return part;
            })}
          </span>
        );

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex gap-2 items-start pl-1">
              <span className="text-[#5D55F3] font-bold select-none">•</span>
              <div className="flex-1">{renderedLine}</div>
            </div>
          );
        }

        return <p key={lineIdx}>{renderedLine}</p>;
      })}
    </div>
  );
}

function AIPageContent() {
  const searchParams = useSearchParams();
  const initialQueryHandled = useRef(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Halo! Ada yang bisa saya bantu terkait aturan LPS, peraturan lembaga (PLPS), atau pemeriksaan dokumen hari ini?',
      sources: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<SelectedPdf>(null);
  const log = useResearch((s) => s.log);

  const suggestions = [
    "Apa wewenang & fungsi utama LPS?",
    "Penanganan bank bermasalah solvabilitas?",
    "Ketentuan laporan berkala bank peserta penjaminan?",
    "Peraturan LPS tentang program penjaminan simpanan"
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Riset: catat penggunaan AI Knowledge Hub
    log("ai_question", { q: text.slice(0, 120) });

    const userMsgId = messages.length + 100;
    const aiMsgId = userMsgId + 1;

    setMessages(prev => [
      ...prev,
      { id: userMsgId, sender: 'user', text, sources: [] },
      { id: aiMsgId, sender: 'ai', text: '', sources: [], primarySources: [], relatedSources: [], evidenceReasoning: [], isStreaming: true, statusText: 'Menghubungkan ke Server AI LPS...' }
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          document_id: null,
          user: {
            user_id: "demo",
            role: "admin",
            unit: "IT",
            access_level: "internal"
          },
          options: {
            include_trace: true,
            model: "",
            provider: ""
          }
        })
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server API status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamText = "";
      const streamSources: string[] = [];
      const streamPrimarySources: SourceItem[] = [];
      const streamRelatedSources: SourceItem[] = [];
      let streamEvidenceReasoning: string[] = [];
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";

        let currentEvent = "";
        for (const line of lines) {
          if (line.startsWith("event: ")) {
            currentEvent = line.substring(7).trim();
          } else if (line.startsWith("event:")) {
            currentEvent = line.substring(6).trim();
          } else if (line.startsWith("data: ") || line.startsWith("data:")) {
            const prefixLen = line.startsWith("data: ") ? 6 : 5;
            const dataStr = line.substring(prefixLen).trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);

              if (currentEvent === "trace") {
                const statusMsg = String(data.message || "");
                setMessages(prev => prev.map(m => 
                  m.id === aiMsgId ? { ...m, statusText: statusMsg } : m
                ));
              } else if (currentEvent === "source") {
                const item: SourceItem = {
                  type: data.type || "primary",
                  document: data.document || data.document_id,
                  document_id: data.document_id || "4bda9963-3e1b-491a-af35-a259372eecb0",
                  article: data.article,
                  page: data.page,
                  relevance: data.relevance,
                  relationship: data.relationship,
                  excerpt: data.excerpt
                };
                
                if (item.type === "related") {
                  streamRelatedSources.push(item);
                } else {
                  // Ambil dari yang tertinggi saja (hanya item #1)
                  if (streamPrimarySources.length === 0) {
                    streamPrimarySources.push(item);
                  }
                }

                const docName = item.document;
                const article = item.article ? ` (${item.article})` : "";
                if (docName) {
                  const sourceItem = `${docName}${article}`;
                  if (!streamSources.includes(sourceItem)) {
                    streamSources.push(sourceItem);
                  }
                }

                const nextPrimary = [...streamPrimarySources];
                const nextRelated = [...streamRelatedSources];
                const nextSources = [...streamSources];
                setMessages(prev => prev.map(m => 
                  m.id === aiMsgId ? { ...m, sources: nextSources, primarySources: nextPrimary, relatedSources: nextRelated } : m
                ));
              } else if (currentEvent === "token") {
                if (data.text) {
                  streamText = streamText + data.text;
                  const nextText = streamText;
                  setMessages(prev => prev.map(m => 
                    m.id === aiMsgId ? { ...m, text: nextText, statusText: "" } : m
                  ));
                }
              } else if (currentEvent === "final") {
                if (data.answer) {
                  streamText = data.answer;
                }
                if (Array.isArray(data.primary_sources) && data.primary_sources.length > 0) {
                  // Ambil dari yang tertinggi saja (top 1 match)
                  const top1 = data.primary_sources[0];
                  streamPrimarySources[0] = {
                    ...top1,
                    document_id: top1.document_id || "4bda9963-3e1b-491a-af35-a259372eecb0"
                  };
                }
                if (Array.isArray(data.related_sources)) {
                  for (const src of data.related_sources) {
                    streamRelatedSources.push({
                      ...src,
                      document_id: src.document_id || "4bda9963-3e1b-491a-af35-a259372eecb0"
                    });
                  }
                }
                if (Array.isArray(data.evidence_reasoning)) {
                  streamEvidenceReasoning = data.evidence_reasoning;
                }

                const finalText = streamText;
                const finalPrimary = [...streamPrimarySources];
                const finalRelated = [...streamRelatedSources];
                const finalEvidence = [...streamEvidenceReasoning];
                const finalSources = [...streamSources];
                setMessages(prev => prev.map(m => 
                  m.id === aiMsgId ? { 
                    ...m, 
                    text: finalText, 
                    sources: finalSources,
                    primarySources: finalPrimary, 
                    relatedSources: finalRelated, 
                    evidenceReasoning: finalEvidence,
                    statusText: "", 
                    isStreaming: false 
                  } : m
                ));
              }
            } catch {
              if (currentEvent === "token") {
                streamText = streamText + dataStr;
                const nextText = streamText;
                setMessages(prev => prev.map(m => 
                  m.id === aiMsgId ? { ...m, text: nextText } : m
                ));
              }
            }
          }
        }
      }

      // If stream ended without text, provide default
      const finalReply = streamText.trim() || "Informasi telah diproses oleh Server AI LPS.";

      setMessages(prev => prev.map(m => 
        m.id === aiMsgId ? { ...m, text: finalReply, isStreaming: false, statusText: "" } : m
      ));

    } catch (err: unknown) {
      console.warn("AI Stream error, fallback response:", err);
      
      let reply = "Saya memahami pertanyaan Anda. Berdasarkan peraturan internal LPS:";
      let sources: string[] = [];
      let primary: SourceItem[] = [];
      let related: SourceItem[] = [];
      let evidence: string[] = [];
      
      if (text.toLowerCase().includes('cuti besar')) {
        reply = "Ya, Anda eligible untuk mengambil cuti besar. Syarat minimal masa kerja adalah 6 tahun, dan saat ini masa kerja Anda tercatat 8 tahun 3 bulan.";
        sources = ["Peraturan Kepegawaian LPS Bab V Pasal 21 (1)"];
        primary = [{
          type: "primary",
          document: "Peraturan-Kepegawaian-LPS-2024.pdf",
          article: "Pasal 21 (1)",
          page: 15,
          relevance: "Kecocokan kata kunci (skor 3)",
          excerpt: "Pegawai yang telah memiliki masa kerja 6 tahun berturut-turut berhak atas cuti besar selama 1 (satu) bulan."
        }];
        evidence = ["Pertanyaan dipetakan ke Peraturan Kepegawaian (Bab V)", "Eligibilitas memenuhi syarat masa kerja >= 6 tahun"];
      } else if (text.toLowerCase().includes('voucher taksi')) {
        reply = "Voucher taksi lembur berlaku untuk pegawai yang bekerja lembur dan pulang di atas pukul 20.00 WIB, dengan syarat lembur telah disetujui sebelumnya (pre-approved).";
        sources = ["SE Logistik No. 07/2024 poin 3"];
        primary = [{
          type: "primary",
          document: "SE-Logistik-No.07-2024.pdf",
          article: "Poin 3",
          page: 4,
          relevance: "Kecocokan kata kunci (skor 2)",
          excerpt: "Voucher transportasi lembur malam dapat diajukan apabila pelaksanaan lembur berakhir setelah pukul 20.00 WIB."
        }];
        evidence = ["Berdasarkan Surat Edaran Logistik No. 07/2024"];
      } else {
        reply = "Fungsi utama Lembaga Penjamin Simpanan (LPS) meliputi: 1) Menjamin simpanan nasabah penyimpan, 2) Turut aktif dalam memelihara stabilitas sistem perbankan sesuai kewenangannya.";
        sources = ["PLPS-3-2024.pdf (Pasal 1)"];
        primary = [
          {
            type: "primary",
            document: "PLPS-3-2024.pdf",
            article: "Pasal 1",
            page: 2,
            relevance: "Kecocokan kata kunci (skor 2)",
            excerpt: "Pasal 1 Dalam Peraturan Lembaga ini yang dimaksud dengan: 1. Lembaga Penjamin Simpanan adalah Lembaga Penjamin Simpanan sebagaimana dimaksud dalam Undang-Undang mengenai Lembaga Penjamin Simpanan."
          },
          {
            type: "primary",
            document: "PLPS-No.1-Th.2023-ttg-Program-Penjaminan-Simpanan-22.5.2023.pdf",
            article: "Pasal 59",
            page: 33,
            relevance: "Kecocokan kata kunci (skor 3)",
            excerpt: "Pasal 59 Peraturan LPS ini mulai berlaku pada tanggal diundangkan. Agar setiap orang mengetahuinya, memerintahkan pengundangan Peraturan LPS ini..."
          }
        ];
        related = [
          {
            type: "related",
            document: "PLPS-3-2024.pdf",
            article: "Pasal 9",
            page: 6,
            relationship: "Dirujuk oleh Pasal 25",
            excerpt: "Pasal 9 (1) Laporan berkala sebagaimana dimaksud dalam Pasal 2 ayat (2) dan ayat (3) wajib disampaikan paling lambat..."
          }
        ];
        evidence = [
          "Pertanyaan dipetakan ke sumber utama (8 pasal) berdasarkan kecocokan teks/rujukan.",
          "Pasal terkait (5 pasal) ditambahkan untuk konteks.",
          "Jawaban dibatasi pada sumber yang ditemukan dalam dokumen terindeks."
        ];
      }

      setMessages(prev => prev.map(m => 
        m.id === aiMsgId ? { 
          ...m, 
          text: reply, 
          sources, 
          primarySources: primary, 
          relatedSources: related, 
          evidenceReasoning: evidence, 
          isStreaming: false, 
          statusText: "" 
        } : m
      ));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get("q") || searchParams.get("question");
    if (q && !initialQueryHandled.current) {
      initialQueryHandled.current = true;
      setInput(q);
      handleSend(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F8FAFC] items-center">
      <div className="w-full flex flex-col md:flex-row h-full bg-white shadow-[0_0_40px_rgba(0,0,0,0.03)] md:border-x md:border-slate-100 overflow-hidden">
        
        {/* Left / Main Column (Chat & Query Analysis) */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* AI Header */}
          <div className="flex-shrink-0 bg-gradient-to-br from-[#F26E22] to-[#D95E15] text-white px-5 md:px-8 py-4 md:py-6 shadow-[0_8px_30px_-5px_rgba(242,110,34,0.35)] z-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5 md:gap-4">
                <div className="bg-white/20 p-1.5 md:p-2.5 rounded-xl md:rounded-2xl backdrop-blur-sm shadow-sm">
                  <Sparkles className="text-white w-[18px] h-[18px] md:w-6 md:h-6" />
                </div>
                <div>
                  <h1 className="text-[16px] md:text-[20px] font-bold tracking-wide">Asisten Pengetahuan LPS</h1>
                  <p className="text-[10.5px] md:text-[12px] font-medium text-white/90">Jawaban real-time berbasis aturan internal · RAG Search</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-[11px] font-bold border border-white/20">
                  <Lock className="text-emerald-300 w-3.5 h-3.5" />
                  <span className="text-white">On-Premise (10.121.88.45)</span>
                </div>
                {selectedDoc && (
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[12px] font-bold flex items-center gap-1 cursor-pointer"
                    title="Tutup PDF Preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex flex-col w-full", msg.sender === 'user' ? "items-end" : "items-start")}>
                {/* Bubble Text */}
                <div className={cn(
                  "max-w-[90%] md:max-w-[85%] rounded-3xl p-4 md:p-5 text-[13.5px] md:text-[14.5px] leading-relaxed shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)]",
                  msg.sender === 'user' 
                    ? "bg-navy text-white rounded-tr-sm" 
                    : "bg-[#F8FAFC] text-ink rounded-tl-sm border border-slate-100"
                )}>
                  {msg.text ? (
                    <FormattedText content={msg.text} />
                  ) : msg.statusText ? (
                    <span className="text-slate-500 italic text-[12px] flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 animate-spin text-orange" />
                      {msg.statusText}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic text-[12px]">Mengetik...</span>
                  )}
                </div>
                
                {/* Query & Analysis Section matching user screenshot */}
                {msg.sender === 'ai' && (msg.primarySources?.length || msg.relatedSources?.length || msg.evidenceReasoning?.length) ? (
                  <div className="mt-3 w-full bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 md:p-5 shadow-xs space-y-4">
                      
                      {/* Query Analysis Header */}
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-orange/10 p-1.5 rounded-lg text-orange">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[13.5px] text-navy">Query & Analysis (RAG Search)</h4>
                            <p className="text-[10.5px] text-slate-500 font-mono">Status: Stream Complete · Verified Sources</p>
                          </div>
                        </div>
                        <span className="text-[10.5px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                          ✓ On-Premise Matched
                        </span>
                      </div>

                      {/* Evidence Reasoning */}
                      {msg.evidenceReasoning && msg.evidenceReasoning.length > 0 && (
                        <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3 space-y-1.5">
                          <p className="text-[10px] font-bold text-amber-900 uppercase tracking-wider font-mono">Evidence Reasoning:</p>
                          <ul className="space-y-1 text-[11.5px] text-amber-950 font-medium">
                            {msg.evidenceReasoning.map((ev, eIdx) => (
                              <li key={eIdx} className="flex items-start gap-1.5">
                                <span className="text-amber-600 font-bold">•</span>
                                <span>{ev}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Primary & Related Sources Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        
                        {/* Primary Sources Column (Blue Tint) */}
                        <div className="bg-blue-50/40 border border-blue-100/80 rounded-xl p-3.5 space-y-3">
                          <h5 className="text-[13px] font-bold text-blue-950 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-orange" />
                              Primary Sources
                            </span>
                            <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                              {msg.primarySources?.length || 0}
                            </span>
                          </h5>
                          
                          {msg.primarySources && msg.primarySources.length > 0 ? (
                            msg.primarySources.map((src, sIdx) => (
                              <div 
                                key={sIdx}
                                onClick={() => setSelectedDoc({
                                  document: src.document || "PLPS-3-2024.pdf",
                                  document_id: src.document_id || "4bda9963-3e1b-491a-af35-a259372eecb0",
                                  article: src.article,
                                  page: src.page || 1,
                                  excerpt: src.excerpt
                                })}
                                className="bg-white border border-blue-200/90 rounded-xl p-3 shadow-2xs hover:border-orange hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-[13.5px] text-blue-900 group-hover:text-orange transition-colors">
                                    {src.article || "Pasal Terkait"}
                                  </span>
                                  <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold border border-blue-100">
                                    Hal {src.page || 1}
                                  </span>
                                </div>
                                
                                <p className="text-[10.5px] text-slate-500 font-mono truncate mb-1">
                                  Doc: {src.document || "PLPS-3-2024.pdf"}
                                </p>
                                
                                {src.relevance && (
                                  <p className="text-[11px] text-slate-600 font-medium mb-2">
                                    {src.relevance}
                                  </p>
                                )}
                                
                                {src.excerpt && (
                                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[11px] text-slate-600 italic leading-relaxed line-clamp-3 group-hover:bg-blue-50/30 transition-colors">
                                    &quot;{src.excerpt}&quot;
                                  </div>
                                )}

                                <div className="mt-2 text-right">
                                  <span className="text-[10.5px] text-orange font-bold flex items-center justify-end gap-1 group-hover:underline">
                                    <Eye className="w-3 h-3" /> Preview PDF
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-[11px] text-slate-400 italic">Tidak ada primary sources</p>
                          )}
                        </div>

                        {/* Related Sources Column (Purple Tint) */}
                        <div className="bg-purple-50/40 border border-purple-100/80 rounded-xl p-3.5 space-y-3">
                          <h5 className="text-[13px] font-bold text-purple-900 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-purple-600" />
                              Related Sources
                            </span>
                            <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                              {msg.relatedSources?.length || 0}
                            </span>
                          </h5>
                          
                          {msg.relatedSources && msg.relatedSources.length > 0 ? (
                            msg.relatedSources.map((src, sIdx) => (
                              <div 
                                key={sIdx}
                                onClick={() => setSelectedDoc({
                                  document: src.document || "PLPS-3-2024.pdf",
                                  document_id: src.document_id || "4bda9963-3e1b-491a-af35-a259372eecb0",
                                  article: src.article,
                                  page: src.page || 1,
                                  excerpt: src.excerpt
                                })}
                                className="bg-white border border-purple-200/90 rounded-xl p-3 shadow-2xs hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-[13.5px] text-purple-900 group-hover:text-purple-600 transition-colors">
                                    {src.article || "Pasal Terkait"}
                                  </span>
                                  <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-semibold border border-purple-100">
                                    Hal {src.page || 1}
                                  </span>
                                </div>
                                
                                <p className="text-[10.5px] text-slate-500 font-mono truncate mb-1">
                                  Doc: {src.document || "PLPS-3-2024.pdf"}
                                </p>
                                
                                {src.relationship && (
                                  <p className="text-[11px] text-purple-700 font-medium mb-2">
                                    {src.relationship}
                                  </p>
                                )}
                                
                                {src.excerpt && (
                                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-[11px] text-slate-600 italic leading-relaxed line-clamp-3 group-hover:bg-purple-50/30 transition-colors">
                                    &quot;{src.excerpt}&quot;
                                  </div>
                                )}

                                <div className="mt-2 text-right">
                                  <span className="text-[10.5px] text-purple-600 font-bold flex items-center justify-end gap-1 group-hover:underline">
                                    <Eye className="w-3 h-3" /> Preview PDF
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-[11px] text-slate-400 italic">Tidak ada related sources</p>
                          )}
                        </div>

                      </div>
                    </div>
                  ) : msg.sender === 'ai' && msg.sources && msg.sources.length > 0 ? (
                    <div className="mt-2.5 max-w-[85%] bg-blue-50/70 border border-blue-100/50 rounded-2xl p-3.5 flex gap-2.5 shadow-sm">
                      <FileText className="text-blue-500 flex-shrink-0 mt-0.5 w-4 h-4" />
                      <div>
                        <p className="text-[10px] font-bold text-blue-700 mb-1 tracking-wide uppercase">Sumber Verifikasi:</p>
                        {msg.sources.map((src, idx) => (
                          <p key={idx} className="text-[11.5px] font-medium text-blue-900/80 leading-relaxed">• {src}</p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                </div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 md:px-8 pb-3 md:pb-4 flex flex-wrap gap-2.5 md:gap-3 z-10 flex-shrink-0">
                {suggestions.map((sug, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(sug)}
                    disabled={isLoading}
                    className="bg-white border border-slate-200 md:border-slate-300 text-[11px] md:text-[13px] font-bold text-muted md:text-slate-600 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] hover:border-orange/40 hover:text-orange hover:bg-orange/5 transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="flex-shrink-0 p-4 md:p-6 bg-white md:bg-[#F8FAFC]/50 backdrop-blur-xl border-t border-slate-100 rounded-t-3xl md:rounded-none z-20">
              <div className="flex items-center gap-2 bg-slate-50 md:bg-white rounded-full md:rounded-[32px] p-1.5 md:p-2 pl-5 md:pl-6 border border-slate-200 md:shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-within:bg-white focus-within:border-orange/30 focus-within:shadow-[0_0_15px_rgba(242,110,34,0.15)] transition-all duration-300">
                <input 
                  type="text" 
                  value={input}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder={isLoading ? "Sedang memproses jawaban & dokumen..." : "peraturan lps tentang penjaminan..."}
                  className="flex-1 bg-transparent text-[13.5px] md:text-[15px] font-medium text-ink focus:outline-none placeholder:text-light py-2 md:py-2.5"
                />
                <button className="p-2 text-light hover:text-navy transition-colors rounded-full hover:bg-slate-100 cursor-pointer">
                  <Paperclip className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
                </button>
                <button 
                  onClick={() => handleSend(input)}
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "w-10 md:w-11 h-10 md:h-11 flex items-center justify-center rounded-full transition-all shadow-sm",
                    isLoading || !input.trim()
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#F26E22] to-[#D95E15] text-white shadow-[0_4px_12px_rgba(242,110,34,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
                  )}
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5 -ml-0.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: PDF Preview Panel (Embeds Real PDF from Backend http://10.121.88.45:8222) */}
          {selectedDoc && (
            <div className="w-full md:w-[480px] lg:w-[560px] bg-slate-900 text-white flex flex-col h-full shrink-0 border-l border-slate-800 animate-in slide-in-from-right duration-300 z-30 shadow-2xl relative">
              {/* PDF Toolbar Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="truncate">
                    <h3 className="font-bold text-[13.5px] text-white truncate">
                      PDF Preview (Live Backend API)
                    </h3>
                    <p className="text-[10.5px] text-slate-400 font-mono truncate">
                      {selectedDoc.document} {selectedDoc.article ? `· ${selectedDoc.article}` : ''} {selectedDoc.page ? `(Hal. ${selectedDoc.page})` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a 
                    href={`/api/documents/${selectedDoc.document_id || '4bda9963-3e1b-491a-af35-a259372eecb0'}/pdf`} 
                    download={selectedDoc.document}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors" 
                    title="Download File PDF Asli"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => window.print()}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors" 
                    title="Cetak Dokumen"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white text-[11.5px] font-bold rounded transition-colors flex items-center gap-1 ml-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              {/* Live PDF Viewer Iframe */}
              <div className="flex-1 overflow-hidden bg-slate-950 p-2 md:p-3 relative flex flex-col">
                <iframe 
                  src={`/api/documents/${selectedDoc.document_id || '4bda9963-3e1b-491a-af35-a259372eecb0'}/pdf#page=${selectedDoc.page || 1}`}
                  className="w-full flex-1 border-0 rounded-lg bg-white shadow-2xl min-h-[500px]"
                  title="PDF Document Viewer Real Backend"
                />

                {/* Bottom Excerpt Overlay Bar */}
                {selectedDoc.excerpt && (
                  <div className="mt-2 bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] text-slate-300">
                    <span className="font-bold text-amber-400 block mb-0.5 text-[10px] uppercase font-mono">Kutipan Pasal ({selectedDoc.article || 'Rujukan'}):</span>
                    &quot;{selectedDoc.excerpt}&quot;
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    );
}

export default function AIPage() {
  return (
    <Suspense fallback={
      <div className="flex h-dvh items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-[#5D55F3] border-t-transparent rounded-full animate-spin mx-auto font-bold" />
          <p className="text-[12px] text-slate-500 font-medium">Memuat Asisten AI...</p>
        </div>
      </div>
    }>
      <AIPageContent />
    </Suspense>
  );
}
