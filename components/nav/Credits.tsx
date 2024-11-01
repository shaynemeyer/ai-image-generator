"use client";

import { Coins } from "lucide-react";
import React from "react";
import { useImage } from "@/context/Image";

function Credits() {
  const [total, setTotal] = React.useState(0);

  const { credits } = useImage();

  return (
    <div>
      <Coins className="h-8 w-8 text-primary" /> {credits}
    </div>
  );
}
export default Credits;
