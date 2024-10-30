"use server";
import { getUserImagesFromDb } from "@/actions/image";
import ImageCard from "@/components/cards/ImageCard";
import { ImageType } from "@/types/image";
import Link from "next/link";

interface DashboardProps {
  searchParams: {
    page?: number;
  };
}

async function DashboardPage({ searchParams }: DashboardProps) {
  const page = searchParams.page
    ? parseInt(searchParams as unknown as string, 10)
    : 1;
  const limit = 3;
  const result = await getUserImagesFromDb(page, limit);
  if (result) {
    const totalPages = Math.ceil(result?.totalCount / limit);
    console.log(totalPages);
  }

  if (!result) return null;

  return (
    <div>
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold text-center">Images</h1>
        <p>Your Ai-Generated Image Collection</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {result.images.map((image) => {
          return (
            <Link href={`/dashboard/image/${image.id}`} key={image.id}>
              <ImageCard image={image as unknown as ImageType} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default DashboardPage;
