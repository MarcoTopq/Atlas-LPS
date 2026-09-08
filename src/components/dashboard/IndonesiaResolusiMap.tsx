"use client";

import React, { useState } from "react";
import {
  Menu,
  Layers,
  Crop,
  Search,
  SlidersHorizontal,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  MapPin,
  Building2,
  Coins
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RegionMarker {
  id: string;
  name: string;
  shortName: string;
  province: string;
  x: number; // percentage or SVG coordinate
  y: number;
  banks: number;
  branches: number;
  asset: string;
  share: string;
  status: string;
  isHQ?: boolean;
}

const REGION_MARKERS: RegionMarker[] = [
  {
    id: "jkt",
    name: "DKI Jakarta & Banten",
    shortName: "Jakarta (HQ)",
    province: "DKI Jakarta & Banten",
    x: 272,
    y: 288,
    banks: 12,
    branches: 1840,
    asset: "Rp 185,40 T",
    share: "68.2%",
    status: "9 TDS, 3 BDPI",
    isHQ: true,
  },
  {
    id: "jabar",
    name: "Jawa Barat & Jateng",
    shortName: "Bandung / Semarang",
    province: "Jawa Barat & Jawa Tengah",
    x: 315,
    y: 295,
    banks: 2,
    branches: 310,
    asset: "Rp 24,15 T",
    share: "8.9%",
    status: "2 TDS",
  },
  {
    id: "jatim",
    name: "Jawa Timur",
    shortName: "Surabaya",
    province: "Jawa Timur",
    x: 375,
    y: 304,
    banks: 2,
    branches: 245,
    asset: "Rp 19,80 T",
    share: "7.3%",
    status: "1 TDS, 1 BDPK",
  },
  {
    id: "sumut",
    name: "Sumatera Bagian Utara",
    shortName: "Medan",
    province: "Sumatera Utara & Aceh",
    x: 165,
    y: 135,
    banks: 1,
    branches: 128,
    asset: "Rp 12,30 T",
    share: "4.5%",
    status: "1 TDS",
  },
  {
    id: "sumsel",
    name: "Sumatera Bagian Selatan",
    shortName: "Palembang",
    province: "Sumsel & Lampung",
    x: 232,
    y: 248,
    banks: 1,
    branches: 94,
    asset: "Rp 9,65 T",
    share: "3.5%",
    status: "1 TDS",
  },
  {
    id: "sulsel",
    name: "Sulawesi Bagian Selatan",
    shortName: "Makassar",
    province: "Sulawesi Selatan",
    x: 485,
    y: 270,
    banks: 1,
    branches: 72,
    asset: "Rp 8,10 T",
    share: "3.0%",
    status: "1 BDPI",
  },
  {
    id: "bali",
    name: "Bali & Nusa Tenggara",
    shortName: "Denpasar",
    province: "Bali & NTB",
    x: 422,
    y: 318,
    banks: 1,
    branches: 52,
    asset: "Rp 5,40 T",
    share: "2.0%",
    status: "1 TDS",
  },
  {
    id: "kaltim",
    name: "Kalimantan Timur & Barat",
    shortName: "Balikpapan",
    province: "Kalimantan Timur",
    x: 418,
    y: 198,
    banks: 1,
    branches: 48,
    asset: "Rp 6,80 T",
    share: "2.5%",
    status: "1 BDPK",
  },
];

export default function IndonesiaResolusiMap() {
  const [selectedMarker, setSelectedMarker] = useState<RegionMarker>(REGION_MARKERS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<string>("layers");

  return (
    <div className="relative w-full bg-[#EBF0F6] rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs select-none">
      
      {/* MAP HEADER OVERLAY */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
        <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#CBD5E1] shadow-2xs text-[10.5px] font-semibold text-[#334155] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
          <span>21 Bank Tersebar</span>
        </div>
      </div>

      {/* ESRI FLOATING TOOLBAR ON LEFT (MATCHING SCREENSHOT) */}
      <div className="absolute top-3 left-3 z-20 flex flex-col bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-[#CBD5E1] overflow-hidden">
        <button
          type="button"
          onClick={() => setActiveTool("menu")}
          title="Daftar Layer"
          className={cn(
            "p-1.5 text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B] border-b border-[#E2E8F0] transition-colors",
            activeTool === "menu" && "bg-orange-50 text-[#EA580C]"
          )}
        >
          <Menu className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTool("layers")}
          title="Legenda Peta"
          className={cn(
            "p-1.5 text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B] border-b border-[#E2E8F0] transition-colors",
            activeTool === "layers" && "bg-orange-50 text-[#EA580C]"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTool("select")}
          title="Seleksi Area"
          className={cn(
            "p-1.5 text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B] border-b border-[#E2E8F0] transition-colors",
            activeTool === "select" && "bg-orange-50 text-[#EA580C]"
          )}
        >
          <Crop className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
          title="Perbesar Peta"
          className="p-1.5 text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B] border-b border-[#E2E8F0] transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          title="Perkecil Peta"
          className="p-1.5 text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B] border-b border-[#E2E8F0] transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            setZoomLevel(1);
            setSelectedMarker(REGION_MARKERS[0]);
          }}
          title="Reset Tampilan"
          className="p-1.5 text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* INTERACTIVE VECTOR SVG MAP CONTAINER */}
      <div className="w-full h-72 sm:h-[350px] overflow-hidden flex items-center justify-center relative cursor-grab active:cursor-grabbing">
        
        {/* Subtle ESRI-style coordinate / tile grid background */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:24px_24px]" />

        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 850 420"
            className="w-full h-full max-w-full max-h-full object-contain filter drop-shadow-xs"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs: Gradients & Shadows */}
            <defs>
              <filter id="esri-shadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.12" />
              </filter>
              <linearGradient id="land-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D9DFE8" />
                <stop offset="100%" stopColor="#CFD7E2" />
              </linearGradient>
              <linearGradient id="foreign-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E2E7EE" />
                <stop offset="100%" stopColor="#D5DCE5" />
              </linearGradient>
              <radialGradient id="halo-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#EA580C" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ocean Water background */}
            <rect width="850" height="420" fill="#EBF0F6" />

            {/* LATITUDE / LONGITUDE GUIDE LINES */}
            <g stroke="#D1D9E4" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.7">
              <line x1="0" y1="120" x2="850" y2="120" /> {/* ~5° N */}
              <line x1="0" y1="210" x2="850" y2="210" /> {/* Equator 0° */}
              <line x1="0" y1="300" x2="850" y2="300" /> {/* ~7° S */}
              <line x1="180" y1="0" x2="180" y2="420" /> {/* 100° E */}
              <line x1="360" y1="0" x2="360" y2="420" /> {/* 110° E */}
              <line x1="540" y1="0" x2="540" y2="420" /> {/* 120° E */}
              <line x1="720" y1="0" x2="720" y2="420" /> {/* 130° E */}
            </g>

            {/* ========================================================================= */}
            {/* NEIGHBORING LANDMASSES (INDOCHINA, MALAYSIA, PHILIPPINES, PNG) */}
            {/* ========================================================================= */}
            <g fill="url(#foreign-grad)" stroke="#BAC5D4" strokeWidth="0.8">
              {/* Indochina / Peninsular Malaysia */}
              <path d="M 90 0 L 140 0 L 155 30 L 160 70 L 175 100 L 195 130 L 225 175 L 210 185 L 195 170 L 180 140 L 160 110 L 140 70 L 120 40 L 90 20 Z" />
              
              {/* Borneo North (Sabah & Sarawak - Malaysia, Brunei) */}
              <path d="M 330 110 Q 360 80 410 75 Q 440 78 460 95 L 470 120 L 450 145 L 430 145 L 390 140 L 350 135 Z" />

              {/* Philippines (Luzon / Visayas / Mindanao hint) */}
              <path d="M 540 40 Q 560 30 575 55 L 565 85 L 550 70 Z" />
              <path d="M 560 95 Q 585 105 590 130 L 570 160 L 555 140 Z" />
              <path d="M 545 165 Q 575 160 585 190 L 565 210 L 540 195 Z" />

              {/* Papua New Guinea (East of 141° Merauke) */}
              <path d="M 770 190 L 850 190 L 850 350 L 770 330 Z" />
            </g>

            {/* ========================================================================= */}
            {/* INDONESIAN ARCHIPELAGO (DETAILED VECTORS) */}
            {/* ========================================================================= */}
            <g fill="url(#land-grad)" stroke="#A9B7C7" strokeWidth="1" filter="url(#esri-shadow)">
              
              {/* 1. SUMATERA */}
              {/* Main island from Aceh (NW) to Lampung (SE) */}
              <path
                d="M 125 78 
                   C 135 70, 150 85, 160 100 
                   C 175 125, 195 160, 215 195 
                   C 230 220, 255 255, 260 275 
                   C 255 285, 245 282, 235 270 
                   C 220 250, 195 215, 175 185 
                   C 155 155, 135 120, 120 95 
                   Z"
                className="hover:fill-[#C4D0DE] transition-colors cursor-pointer"
                onClick={() => setSelectedMarker(REGION_MARKERS[3])}
              />
              {/* Nias & Mentawai Islands (West of Sumatra) */}
              <ellipse cx="142" cy="148" rx="4" ry="12" transform="rotate(30 142 148)" />
              <ellipse cx="168" cy="195" rx="3.5" ry="14" transform="rotate(35 168 195)" />
              <ellipse cx="192" cy="235" rx="3" ry="10" transform="rotate(40 192 235)" />
              {/* Bangka & Belitung (East of Sumatra) */}
              <path d="M 252 205 Q 262 200 268 215 L 260 228 L 248 220 Z" />
              <circle cx="282" cy="226" r="6" />

              {/* 2. JAWA (JAVA) & MADURA */}
              {/* Extending from Anyer (West) to Banyuwangi (East) */}
              <path
                d="M 258 288 
                   C 275 285, 305 288, 335 292 
                   C 365 295, 395 300, 420 305 
                   C 422 312, 415 315, 395 312 
                   C 365 310, 330 306, 295 302 
                   C 270 300, 255 296, 258 288 
                   Z"
                className="hover:fill-[#C4D0DE] transition-colors cursor-pointer"
                onClick={() => setSelectedMarker(REGION_MARKERS[0])}
              />
              {/* Madura island */}
              <ellipse cx="388" cy="293" rx="14" ry="4" transform="rotate(-5 388 293)" />

              {/* 3. KALIMANTAN (BORNEO - INDONESIAN REGION) */}
              {/* South of the Sarawak/Sabah boundary */}
              <path
                d="M 320 140 
                   C 340 135, 375 140, 410 145 
                   C 440 150, 455 170, 445 200 
                   C 438 225, 425 245, 400 252 
                   C 370 255, 345 250, 330 240 
                   C 315 225, 310 195, 312 170 
                   Z"
                className="hover:fill-[#C4D0DE] transition-colors cursor-pointer"
                onClick={() => setSelectedMarker(REGION_MARKERS[7])}
              />

              {/* 4. SULAWESI (CELEBES) - Distinctive K-shape */}
              {/* North Arm (Minahasa/Manado) */}
              <path
                d="M 475 215 
                   C 475 185, 490 160, 525 152 
                   C 535 150, 545 158, 540 165 
                   C 515 170, 495 190, 490 215 
                   L 518 235 
                   C 525 240, 515 248, 500 245 
                   L 485 240 
                   L 505 275 
                   C 510 282, 500 290, 490 280 
                   L 475 250 
                   L 465 278 
                   C 458 285, 452 275, 458 260 
                   Z"
                className="hover:fill-[#C4D0DE] transition-colors cursor-pointer"
                onClick={() => setSelectedMarker(REGION_MARKERS[5])}
              />

              {/* 5. BALI & NUSA TENGGARA (SUNDA KECIL) */}
              {/* Bali */}
              <path d="M 426 312 Q 433 310 435 316 L 430 320 L 424 316 Z" />
              {/* Lombok */}
              <circle cx="442" cy="317" r="4.5" />
              {/* Sumbawa */}
              <ellipse cx="460" cy="318" rx="10" ry="4" transform="rotate(-5 460 318)" />
              {/* Flores */}
              <ellipse cx="492" cy="317" rx="15" ry="3.5" />
              {/* Sumba */}
              <ellipse cx="478" cy="332" rx="9" ry="4" transform="rotate(-15 478 332)" />
              {/* Timor Barat (Kupang) */}
              <path d="M 522 328 L 542 320 L 548 326 L 528 335 Z" />

              {/* 6. MALUKU & HALMAHERA */}
              {/* Halmahera */}
              <path d="M 565 170 Q 575 155 580 170 L 585 185 Q 575 195 565 185 Z" />
              {/* Seram & Buru */}
              <ellipse cx="550" cy="235" rx="8" ry="4" />
              <ellipse cx="580" cy="238" rx="14" ry="4" transform="rotate(-5 580 238)" />
              {/* Ambon & Banda */}
              <circle cx="578" cy="248" r="2.5" />
              {/* Kei & Aru */}
              <ellipse cx="612" cy="275" rx="4" ry="7" />
              <ellipse cx="628" cy="270" rx="5" ry="9" />

              {/* 7. PAPUA (IRIAN JAYA) - West of 141° E */}
              {/* Bird's Head (Vogelkop) + Main Body */}
              <path
                d="M 640 215 
                   C 630 195, 650 180, 670 190 
                   C 665 205, 655 215, 668 222 
                   L 700 215 
                   C 730 210, 755 205, 770 200 
                   L 770 330 
                   C 750 335, 725 330, 710 300 
                   C 690 280, 665 260, 652 245 
                   Z"
                className="hover:fill-[#C4D0DE] transition-colors cursor-pointer"
              />
              {/* Biak & Yapen Islands */}
              <ellipse cx="682" cy="190" rx="8" ry="3" />
            </g>

            {/* ========================================================================= */}
            {/* GEOGRAPHIC LABELS (MATCHING ESRI STYLE) */}
            {/* ========================================================================= */}
            <g fontFamily="sans-serif" fontSize="9" fill="#718096" fontWeight="600" opacity="0.85">
              <text x="140" y="45">Bangkok</text>
              <text x="175" y="70">Phnom Penh</text>
              <text x="170" y="160">Kuala Lumpur</text>
              <text x="210" y="180">Singapore</text>
              <text x="560" y="35" fontSize="8" letterSpacing="1">PHILIPPINES</text>
              <text x="778" y="270" fontSize="8" letterSpacing="0.8">PAPUA</text>
              <text x="778" y="282" fontSize="8" letterSpacing="0.8">NEW GUINEA</text>
            </g>

            {/* BOLD NATIONAL TITLE "INDONESIA" (MATCHING SCREENSHOT) */}
            <text
              x="425"
              y="275"
              fontFamily="sans-serif"
              fontSize="14"
              fontWeight="800"
              letterSpacing="3"
              fill="#94A3B8"
              opacity="0.45"
              textAnchor="middle"
            >
              INDONESIA
            </text>

            {/* ========================================================================= */}
            {/* ORANGE ASSET & BRANCH CONCENTRATION CLUSTERS / BUBBLES */}
            {/* ========================================================================= */}
            {REGION_MARKERS.map((marker) => {
              const isSelected = selectedMarker.id === marker.id;
              const radius = marker.isHQ ? 16 : marker.banks >= 2 ? 11 : 8;

              return (
                <g
                  key={marker.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedMarker(marker)}
                >
                  {/* Concentric pulsing glow rings for HQ / large assets */}
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r={radius * 2.2}
                    fill="url(#halo-glow)"
                    className={cn(marker.isHQ && "animate-pulse")}
                  />

                  {/* Outer ring */}
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r={radius}
                    fill={isSelected ? "#EA580C" : "#F97316"}
                    fillOpacity={isSelected ? 0.95 : 0.85}
                    stroke="#FFFFFF"
                    strokeWidth={marker.isHQ ? 2.5 : 1.8}
                    className="transition-all duration-200 group-hover:scale-110"
                  />

                  {/* Marker Center Count or Icon */}
                  <text
                    x={marker.x}
                    y={marker.y + 3.5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={marker.isHQ ? "10" : "8"}
                    fontWeight="800"
                    fontFamily="sans-serif"
                  >
                    {marker.banks}
                  </text>

                  {/* Label below marker (e.g. Jakarta in screenshot) */}
                  <text
                    x={marker.x}
                    y={marker.y + radius + 11}
                    textAnchor="middle"
                    fill="#0F172A"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="sans-serif"
                    className="drop-shadow-xs pointer-events-none"
                  >
                    {marker.shortName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* FLOATING SELECTED REGION INFO CALLOUT CARD (MATCHING USER SCREENSHOT) */}
        <div className="absolute bottom-6 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-xs z-20 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-[#E2E8F0] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 border-b border-[#F1F5F9] pb-1.5 mb-1.5">
            <div>
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#EA580C]">
                {selectedMarker.isHQ ? "Konsentrasi Aset Terbesar" : "Wilayah Resolusi"}
              </span>
              <h5 className="text-xs font-black text-[#172033] leading-tight">
                {selectedMarker.name}
              </h5>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-orange-100 text-[#EA580C] text-[10px] font-extrabold whitespace-nowrap">
              {selectedMarker.share} Aset
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10.5px]">
            <div>
              <span className="text-[#64748B] block text-[9.5px]">Jumlah Bank</span>
              <span className="font-bold text-[#1E293B]">{selectedMarker.banks} Bank Resolusi</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[9.5px]">Jaringan Cabang</span>
              <span className="font-bold text-[#1E293B]">{selectedMarker.branches.toLocaleString("id-ID")} Cabang</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[9.5px]">Nilai Aset</span>
              <span className="font-extrabold text-[#EA580C]">{selectedMarker.asset}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[9.5px]">Status Penanganan</span>
              <span className="font-bold text-[#0F766E]">{selectedMarker.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAP FOOTER ATTRIBUTION (MATCHING EXACT ESRI ATTRIBUTION IN SCREENSHOT) */}
      <div className="bg-[#F8FAFC] px-3 py-1.5 border-t border-[#E2E8F0] flex items-center justify-between text-[9px] text-[#64748B]">
        <div className="truncate pr-2">
          <span>Esri, TomTom, Garmin, FAO, NOAA, USGS</span>
        </div>
        <div className="font-semibold text-[#475569] whitespace-nowrap">
          <span>Powered by <strong>Esri</strong></span>
        </div>
      </div>
    </div>
  );
}
