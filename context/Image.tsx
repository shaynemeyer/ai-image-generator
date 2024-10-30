"use client";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { generateImageAi } from "@/actions/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// interface ImageType {
//   imageUrl: string;
// }

interface ImageContextType {
  imagePrompt: string;
  setImagePrompt: (query: string) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  generateImage: (e: React.FormEvent) => void;
}

const ImageContext = React.createContext<ImageContextType | undefined>(
  undefined
);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  // state
  const [imagePrompt, setImagePrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  // functions
  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isSignedIn) {
      toast({
        description: "Please login to generate image",
        variant: "destructive",
      });
      setLoading(false);
    }

    try {
      const result = await generateImageAi({ imagePrompt });
      if (result.id) {
        router.push(`/dashboard/image/${result.id}`);
      }
    } catch (error) {
      toast({
        description: "Failed to generate image",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        imagePrompt,
        setImagePrompt,
        loading,
        setLoading,
        generateImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = (): ImageContextType => {
  const context = React.useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
