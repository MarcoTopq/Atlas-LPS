"use client";

import AppBar from "@/components/AppBar";
import Link from "next/link";
import { ChevronRight, FileStack, Folder } from "lucide-react";

export default function NaskahDinasMenuPage() {
  const menuItems = [
    { title: "Tasklist", icon: FileStack, href: "/persetujuan" },
    { title: "Inbox", icon: Folder, href: "#" },
    { title: "Outbox", icon: Folder, href: "#" },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-white pb-8">
      <AppBar title="Naskah Dinas" showBack />
      <div className="px-5 mt-2 flex flex-col">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link 
              key={idx} 
              href={item.href} 
              className="flex items-center justify-between py-4 border-b border-line last:border-b-0 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-[#FEF6F0] flex items-center justify-center text-ink">
                  <Icon size={20} strokeWidth={2.5} className="text-[#333333]" />
                </div>
                <span className="text-[14px] font-semibold text-ink">{item.title}</span>
              </div>
              <ChevronRight size={20} className="text-light" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
