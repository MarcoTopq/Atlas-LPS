"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useResearch } from "@/lib/research";
import LockScreen from "./LockScreen";
import Onboarding from "./Onboarding";
import ScenarioTracker from "./ScenarioTracker";

/**
 * Gerbang riset: lock screen (PIN/biometrik) -> onboarding responden ->
 * tracker misi + survei. Halaman /riset (dashboard tim) tidak digate.
 */
export default function ResearchGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const unlocked = useResearch((s) => s.unlocked);
  const participant = useResearch((s) => s.participant);
  const skipped = useResearch((s) => s.skipped);

  // Hindari hydration mismatch: overlay hanya dirender setelah mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isRiset = pathname?.startsWith("/riset");

  return (
    <>
      {children}
      {mounted && !isRiset && (
        <>
          {!unlocked ? (
            <LockScreen />
          ) : !participant && !skipped ? (
            <Onboarding />
          ) : (
            <ScenarioTracker />
          )}
        </>
      )}
    </>
  );
}
