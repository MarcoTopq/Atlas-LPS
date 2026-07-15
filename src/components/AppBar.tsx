import { Bell, ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface AppBarProps {
  greeting?: string;
  subtitle?: string;
  showAvatar?: boolean;
  title?: string;
  showBack?: boolean;
}

export default function AppBar({
  greeting,
  subtitle,
  showAvatar = false,
  title,
  showBack = false,
}: AppBarProps) {
  const router = useRouter();

  return (
    <div className="px-5 pt-8 pb-3 flex items-center justify-between sticky top-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-xl">
      
      {/* Left Area: Back Button OR Avatar + Greeting */}
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-ink hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        {showAvatar && (
          <Link href="/menu" className="w-[46px] h-[46px] rounded-full bg-slate-200 overflow-hidden flex-shrink-0 active:scale-95 transition-transform block shadow-sm border-2 border-white">
            <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-sm bg-gradient-to-tr from-slate-200 to-slate-100">
              A
            </div>
          </Link>
        )}
        
        {!title && greeting && (
          <div className="flex flex-col justify-center">
            <span className="text-[12px] font-medium text-muted tracking-wide">{greeting}</span>
            <span className="text-[16px] font-bold text-ink">{subtitle} 👋</span>
          </div>
        )}
      </div>
      
      {/* Center Area: Title (if any) */}
      {title && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[17px] font-bold text-ink tracking-tight">{title}</h1>
        </div>
      )}
      
      {/* Right Area: Action Icons */}
      <div className="flex items-center gap-2">
        {title ? (
          <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-ink hover:bg-slate-50 transition-colors">
            <Search size={18} />
          </button>
        ) : (
          <button className="relative w-[46px] h-[46px] rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex items-center justify-center flex-shrink-0 text-ink hover:scale-105 active:scale-95 transition-all">
            <Bell size={20} strokeWidth={2.5} />
            <span className="absolute top-[13px] right-[14px] w-2 h-2 bg-orange rounded-full border-[1.5px] border-white"></span>
          </button>
        )}
      </div>

    </div>
  );
}
