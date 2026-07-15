"use client";

import { Sparkles, Lock, FileText, Send, Paperclip } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  sender: 'ai' | 'user';
  text: string;
  sources?: string[];
};

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Halo Pak Andi. Ada yang bisa saya bantu terkait aturan LPS atau pemeriksaan dokumen hari ini?',
      sources: []
    }
  ]);
  const [input, setInput] = useState('');

  const suggestions = [
    "Apakah saya eligible cuti besar?",
    "Ketentuan voucher taksi lembur?",
    "Ringkas poin risiko dokumen ini",
    "Sisa anggaran divisi saya?"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text, sources: [] }]);
    setInput('');
    
    // Mock AI Response
    setTimeout(() => {
      let reply = "Saya memahami pertanyaan Anda. Berdasarkan dokumen internal kami, berikut jawabannya.";
      let sources: string[] = [];
      
      if (text.toLowerCase().includes('cuti besar')) {
        reply = "Ya, Anda eligible untuk mengambil cuti besar. Syarat minimal masa kerja adalah 6 tahun, dan saat ini masa kerja Anda tercatat 8 tahun 3 bulan.";
        sources = ["Peraturan Kepegawaian LPS Bab V Pasal 21 (1)"];
      } else if (text.toLowerCase().includes('voucher taksi')) {
        reply = "Voucher taksi lembur berlaku untuk pegawai yang bekerja lembur dan pulang di atas pukul 20.00 WIB, dengan syarat lembur telah disetujui sebelumnya (pre-approved).";
        sources = ["SE Logistik No. 07/2024 poin 3"];
      }
      
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        sender: 'ai', 
        text: reply,
        sources 
      }]);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-[#F8FAFC] items-center">
      <div className="w-full flex flex-col h-full bg-white shadow-[0_0_40px_rgba(0,0,0,0.03)] md:border-x md:border-slate-100">
        
        {/* AI Header */}
        <div className="flex-shrink-0 bg-gradient-to-br from-[#5D55F3] to-[#3B34AB] text-white px-5 md:px-8 py-5 md:py-8 rounded-b-3xl md:rounded-none shadow-[0_8px_30px_-5px_rgba(76,70,217,0.4)] md:shadow-none z-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center justify-between mb-3 md:mb-4 relative z-10">
            <div className="flex items-center gap-2.5 md:gap-4">
              <div className="bg-white/10 p-1.5 md:p-2.5 rounded-xl md:rounded-2xl backdrop-blur-sm shadow-sm">
                <Sparkles className="text-white w-[18px] h-[18px] md:w-6 md:h-6" />
              </div>
              <h1 className="text-[17px] md:text-[22px] font-bold tracking-wide">Asisten Pengetahuan</h1>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-black/20 backdrop-blur-sm px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-[12px] font-bold shadow-sm border border-white/10">
              <Lock className="text-emerald-400 w-[11px] h-[11px] md:w-3.5 md:h-3.5" />
              <span className="text-white/90">On-Premise LPS</span>
            </div>
          </div>
          <p className="text-[11px] md:text-[14px] font-medium text-white/75 relative z-10">Jawaban berbasis aturan internal · tersertifikasi</p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-5 md:space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex flex-col", msg.sender === 'user' ? "items-end" : "items-start")}>
              <div className={cn(
                "max-w-[85%] md:max-w-[75%] rounded-3xl p-4 md:p-5 text-[13.5px] md:text-[15px] leading-relaxed shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)]",
                msg.sender === 'user' 
                  ? "bg-navy text-white rounded-tr-sm" 
                  : "bg-[#F8FAFC] text-ink rounded-tl-sm border border-slate-100"
              )}>
                {msg.text}
              </div>
              
              {/* Sources (if AI and has sources) */}
              {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && (
                <div className="mt-2.5 max-w-[85%] md:max-w-[75%] bg-blue-50/70 border border-blue-100/50 rounded-2xl p-3.5 md:p-4 flex gap-2.5 shadow-sm">
                  <FileText className="text-blue-500 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                  <div>
                    <p className="text-[10px] md:text-[12px] font-bold text-blue-700 mb-1 tracking-wide uppercase">Sumber Verifikasi:</p>
                    {msg.sources.map((src, idx) => (
                      <p key={idx} className="text-[11px] md:text-[13px] font-medium text-blue-900/80 leading-relaxed">• {src}</p>
                    ))}
                  </div>
                </div>
              )}
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
                className="bg-white border border-slate-200 md:border-slate-300 text-[11px] md:text-[13px] font-bold text-muted md:text-slate-600 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] hover:border-[#5D55F3]/40 hover:text-[#5D55F3] hover:bg-[#5D55F3]/5 transition-all duration-200"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="flex-shrink-0 p-4 md:p-6 lg:p-8 bg-white md:bg-[#F8FAFC]/50 backdrop-blur-xl border-t border-slate-100 rounded-t-3xl md:rounded-none z-20">
          <div className="flex items-center gap-2 bg-slate-50 md:bg-white rounded-full md:rounded-[32px] p-1.5 md:p-2 pl-5 md:pl-6 border border-slate-200 md:shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-within:bg-white focus-within:border-[#5D55F3]/30 focus-within:shadow-[0_0_15px_rgba(76,70,217,0.1)] transition-all duration-300">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Tanya asisten..."
              className="flex-1 bg-transparent text-[13.5px] md:text-[16px] font-medium text-ink focus:outline-none placeholder:text-light py-2 md:py-3"
            />
            <button className="p-2 text-light hover:text-navy transition-colors rounded-full hover:bg-slate-100">
              <Paperclip className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
            </button>
            <button 
              onClick={() => handleSend(input)}
              className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-gradient-to-r from-[#5D55F3] to-[#433BCA] text-white rounded-full shadow-[0_4px_12px_rgba(76,70,217,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5 -ml-0.5" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
