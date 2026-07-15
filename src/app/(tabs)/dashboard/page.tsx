"use client";

import AppBar from "@/components/AppBar";
import { MOCK_DASHBOARD } from "@/lib/mock/data";
import { 
  Users, 
  GraduationCap, 
  CalendarClock, 
  Wallet, 
  LineChart, 
  Plane, 
  CreditCard, 
  Receipt, 
  Laptop, 
  HeadphonesIcon,
  ArrowRight,
  Activity
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const categories = [
    {
      title: "HR & Personalia",
      items: [
        { id: "kepegawaian", name: "Kepegawaian", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
        { id: "training", name: "Training", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-50" },
        { id: "absensi", name: "Absensi", icon: CalendarClock, color: "text-emerald-500", bg: "bg-emerald-50" },
      ]
    },
    {
      title: "Keuangan & Anggaran",
      items: [
        { id: "pembayaran", name: "Pembayaran", icon: Receipt, color: "text-teal-500", bg: "bg-teal-50" },
        { id: "perjalanan-dinas", name: "Perjalanan Dinas", icon: Plane, color: "text-sky-500", bg: "bg-sky-50", alert: true },
        { id: "uang-muka", name: "Uang Muka & Pengadaan", icon: CreditCard, color: "text-indigo-500", bg: "bg-indigo-50" },
      ]
    },
    {
      title: "IT & Operasional",
      items: [
        { id: "aset", name: "Aset IT", icon: Laptop, color: "text-slate-600", bg: "bg-slate-100" },
        { id: "helpdesk", name: "Ticket Helpdesk", icon: HeadphonesIcon, color: "text-amber-500", bg: "bg-amber-50" },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#F8FAFC] pb-32 md:pb-12 relative w-full items-center">
      <div className="w-full">
        <AppBar title="Dashboard" showBack />

        <div className="px-5 md:px-8 mt-2 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Category Header */}
                <div className="px-1 mb-3">
                  <h2 className="text-[14px] md:text-[18px] font-bold text-muted uppercase tracking-wider">{category.title}</h2>
                </div>
                
                {/* Items Card Container */}
                <div className="space-y-3">
                  {category.items.map((item, idx2) => {
                    const Icon = item.icon;
                    return (
                      <Link key={idx2} href={`/dashboard/${item.id}`} className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group flex items-center relative overflow-hidden">
                        
                        {/* Subtle Background Accent */}
                        <div className={cn("absolute right-0 top-0 w-32 md:w-48 h-32 md:h-48 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-20", item.color.replace('text-', 'bg-'))}></div>
                        
                        {/* Icon */}
                        <div className={cn("w-14 md:w-16 h-14 md:h-16 rounded-2xl md:rounded-[20px] flex items-center justify-center flex-shrink-0 relative z-10", item.bg, item.color)}>
                          <Icon className="w-[26px] h-[26px] md:w-8 md:h-8" strokeWidth={1.5} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 ml-4 relative z-10">
                          <h3 className="text-[15px] md:text-[17px] font-bold text-ink mb-1 group-hover:text-orange transition-colors truncate">{item.name}</h3>
                          
                          <p className="text-[12px] md:text-[14px] font-medium text-muted">Akses layanan</p>
                        </div>
                        
                        {/* Extras */}
                        <div className="flex items-center gap-2 ml-2 relative z-10">
                          {item.suffix && (
                            <span className="text-[11px] font-bold text-orange bg-orange/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                              {item.suffix}
                            </span>
                          )}
                          {item.alert && (
                            <span className="w-2.5 h-2.5 bg-danger rounded-full animate-pulse shadow-[0_0_8px_rgba(214,69,69,0.4)]"></span>
                          )}
                          <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-light group-hover:bg-[#E8F0FE] group-hover:text-blue-600 transition-colors flex-shrink-0 ml-1">
                            <ArrowRight className="w-[14px] h-[14px] md:w-5 md:h-5 -rotate-45" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
