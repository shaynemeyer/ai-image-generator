"use client";

import { Coins } from "lucide-react";
import React from "react";
import { useImage } from "@/context/Image";

function Credits() {
  const { credits } = useImage();

  const displayCredits = credits > 99 ? "99+" : credits.toString();
  const badgeColor = credits < 10 ? "bg-red-500" : "bg-green-500";

  return (
    <div className="relative inline-block">
      <Coins className="h-8 w-8 text-primary" />
      <span
        className={`absolute top-0 -right-2 ${badgeColor} text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1`}
      >
        {displayCredits}
      </span>
    </div>
  );
}
export default Credits;
