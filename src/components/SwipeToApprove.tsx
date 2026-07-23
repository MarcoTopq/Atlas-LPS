"use client";

import { motion, useAnimation, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { useState } from "react";

interface SwipeToApproveProps {
  onApprove: () => void;
}

export default function SwipeToApprove({ onApprove }: SwipeToApproveProps) {
  const [isApproved, setIsApproved] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  
  // Assuming total width is about window width minus paddings (e.g. 430 - 32)
  // Let's set a conservative max drag distance
  const maxDrag = 250;
  
  const opacity = useTransform(x, [0, maxDrag], [1, 0]);
  const background = useTransform(
    x,
    [0, maxDrag],
    ["#F26E22", "#1E9E6A"] // Orange to OK Green
  );

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x > maxDrag * 0.7) {
      // Approve threshold reached
      setIsApproved(true);
      controls.start({ x: maxDrag });
      setTimeout(() => {
        onApprove();
      }, 500);
    } else {
      // Revert back
      controls.start({ x: 0 });
    }
  };

  if (isApproved) {
    return (
      <div className="w-full h-14 rounded-full bg-ok flex items-center justify-center text-white shadow-lg shadow-ok/30 transition-all duration-300">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Check size={24} />
          Disetujui
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-14 rounded-full bg-orange-d/20 flex items-center overflow-hidden border border-orange/30">
      {/* Background track text */}
      <motion.div 
        style={{ opacity }}
        className="absolute w-full text-center text-orange font-bold text-sm z-0 pointer-events-none pr-8"
      >
        Geser untuk menyetujui
      </motion.div>
      
      {/* Draggable thumb */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, background }}
        className="absolute left-1 w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-md cursor-grab active:cursor-grabbing text-white"
      >
        <ChevronRight size={24} strokeWidth={3} />
      </motion.div>
    </div>
  );
}
