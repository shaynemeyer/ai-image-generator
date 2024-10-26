"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function GenerateImageInput() {
  const { toast } = useToast();

  return (
    <div className="mb-5 flex space-x-2">
      <Input placeholder="Mountain lookout" className="p-6" />
      <Button
        className="p-6"
        onClick={() => {
          toast({
            title: "You are great!",
            description: "You have done something really wonderful!",
          });
        }}
      >
        Generate Image
      </Button>
    </div>
  );
}
export default GenerateImageInput;
