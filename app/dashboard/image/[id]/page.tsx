import { getImageFromDb } from "@/actions/image";
import ImageEditButtons from "@/components/image/ImageEditButtons";
import { ImageType } from "@/types/image";
import Image from "next/image";

async function ImagePage({ params: { id } }: { params: { id: string } }) {
  const image = (await getImageFromDb(id)) as unknown as ImageType;

  if (!image) return null;

  return (
    <div className="flex flex-col max-w-4xl mx-auto justify-center p-4">
      <div className="relative w-full h-[60vh] mb-8">
        <Image
          src={image.url!}
          alt={image.name!}
          fill
          className="rounded-lg object-contain"
        />
      </div>
      <div>
        <ImageEditButtons image={image} />
      </div>
    </div>
  );
}
export default ImagePage;
