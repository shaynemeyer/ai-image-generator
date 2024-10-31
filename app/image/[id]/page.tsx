import { getImageFromDb } from "@/actions/image";
import ImageCard from "@/components/cards/ImageCard";
import { ImageType } from "@/types/image";
import Image from "next/image";

interface ImagePageProps {
  params: { id: string };
}

async function ImagePage({ params: { id } }: ImagePageProps) {
  const image = (await getImageFromDb(id)) as unknown as ImageType;

  if (!image) return null;

  return (
    <div>
      <div className="flex flex-row justify-center items-center mt-20">
        <ImageCard image={image} />
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="relative w-full h-[75vh] my-20">
          <Image
            src={image.url}
            alt={image.name as string}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
export default ImagePage;
