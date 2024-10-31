"use client";

import { Coins } from "lucide-react";
import React from "react";

function Credits() {
  const [total, setTotal] = React.useState(0);

  return (
    <div>
      <Coins className="h-8 w-8 text-primary" />
    </div>
  );
}
export default Credits;
