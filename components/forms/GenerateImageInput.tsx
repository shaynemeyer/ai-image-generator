"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useImage } from "@/context/Image";

function GenerateImageInput() {
  const { generateImage } = useImage();

  return (
    <div className="mb-5 flex space-x-2">
      <Input placeholder="Mountain lookout" className="p-6" />
      <Button className="p-6" onClick={generateImage}>
        Generate Image
      </Button>
    </div>
  );
}
export default GenerateImageInput;
