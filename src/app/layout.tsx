import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResearchGate from "@/components/research/ResearchGate";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ATLAS - One LPS Mobile",
  description: "Ruang kerja terpadu berbasis mobile + AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-[#F8FAFC] text-ink overflow-x-hidden flex">
        {/* Full screen layout, letting child layouts handle the rest */}
        <div className="w-full flex flex-col flex-1 min-h-dvh">
          <ResearchGate>{children}</ResearchGate>
        </div>
      </body>
    </html>
  );
}
