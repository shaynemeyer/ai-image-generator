"use client";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { generateImageAi } from "@/actions/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { checkCreditRecordDb, getUserCreditsFromDb } from "@/actions/credit";

// interface ImageType {
//   imageUrl: string;
// }

interface ImageContextType {
  imagePrompt: string;
  setImagePrompt: (query: string) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  generateImage: (e: React.FormEvent) => void;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  getUserCredits: () => void;
}

const ImageContext = React.createContext<ImageContextType | undefined>(
  undefined
);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  // state
  const [imagePrompt, setImagePrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [credits, setCredits] = React.useState(0);

  const { isSignedIn } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    getUserCredits();
  }, []);

  React.useEffect(() => {
    checkCreditRecordDb();
  }, []);

  const getUserCredits = async () => {
    const result = await getUserCreditsFromDb();
    if (result?.credits) {
      setCredits(parseInt(result.credits));
    }
  };

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
      if (result.id && result.success) {
        setCredits(parseInt(result.credits as string));
        toast({
          description: "Image generated successfully",
          variant: "default",
        });
        router.push(`/dashboard/image/${result.id}`);
      } else {
        setCredits(credits);
        toast({
          description: "Failed to generate image",
          variant: "destructive",
        });
        router.push("/buy-credits");
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
        credits,
        setCredits,
        getUserCredits,
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
