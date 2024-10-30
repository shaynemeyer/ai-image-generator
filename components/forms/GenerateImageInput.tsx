"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useImage } from "@/context/Image";

function GenerateImageInput() {
  const { generateImage, imagePrompt, setImagePrompt, loading } = useImage();

  return (
    <form onSubmit={generateImage}>
      <div className="mb-5 flex space-x-2">
        <Input
          placeholder="Mountain lookout"
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value as string)}
          className="p-6 lg:p-8 text-lg lg:text-2xl"
        />
        <Button disabled={loading} className="p-6 lg:p-8 text-lg lg:text-2xl">
          {loading ? (
            <>
              <Loader2Icon className="animate-spin mr-2" />
            </>
          ) : (
            <>Generate Image</>
          )}
        </Button>
      </div>
    </form>
  );
}
export default GenerateImageInput;
