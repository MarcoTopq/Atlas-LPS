import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResearchGate from "@/components/research/ResearchGate";
import PwaRegister from "@/components/PwaRegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#F26E22",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "ATLAS - One LPS Mobile",
  description: "Ruang kerja terpadu berbasis mobile + AI — Lembaga Penjamin Simpanan (LPS)",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ATLAS LPS",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "https://lps.go.id/konten/unggahan/2025/08/logo-lps-512x512-2-100x100.png",
    apple: "https://lps.go.id/konten/unggahan/2025/08/logo-lps-512x512-2-300x300.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-dvh bg-[#F8FAFC] text-ink overflow-x-hidden flex">
        <PwaRegister />
        {/* Full screen layout, letting child layouts handle the rest */}
        <div className="w-full flex flex-col flex-1 min-h-dvh">
          <ResearchGate>{children}</ResearchGate>
        </div>
      </body>
    </html>
  );
}
