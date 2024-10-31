"use client";

import { ImageType } from "@/types/image";
import { Button } from "../ui/button";
import { CloudDownload, SquareArrowOutUpRight, View } from "lucide-react";
import Link from "next/link";
import { saveAs } from "file-saver";
import { toast } from "@/hooks/use-toast";

function ImageEditButtons({ image }: { image: ImageType }) {
  const handleDownload = () => {
    saveAs(image.url, `${image.name}.png`);
  };

  const handleShare = async () => {
    const currentUrl = `${window.location.origin}/image/${image.id}`;
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        description: "Image URL copied to clipboard",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center gap-4">
      <Button
        onClick={handleDownload}
        className="h-16 w-16 lg:h-20 lg:w-20 flex flex-col items-center justify-center"
      >
        <CloudDownload className="h-6 w-6 mb-1" />
        Download
      </Button>
      <Button
        onClick={handleShare}
        className="h-16 w-16 lg:h-20 lg:w-20 flex flex-col items-center justify-center"
      >
        <SquareArrowOutUpRight className="h-6 w-6 mb-1" />
        Share
      </Button>
      <Link href={`/image/${image.id}`}>
        <Button
          onClick={handleDownload}
          className="h-16 w-16 lg:h-20 lg:w-20 flex flex-col items-center justify-center"
        >
          <View className="h-6 w-6 mb-1" />
          View
        </Button>
      </Link>
    </div>
  );
}
export default ImageEditButtons;
