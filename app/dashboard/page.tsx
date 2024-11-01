"use server";
import { getUserImagesFromDb } from "@/actions/image";
import ImageCard from "@/components/cards/ImageCard";
import Pagination from "@/components/nav/Pagination";
import { ImageType } from "@/types/image";
import Link from "next/link";
import React from "react";

interface DashboardProps {
  searchParams: {
    page?: number;
  };
}

async function DashboardPage({ searchParams }: DashboardProps) {
  const page = searchParams?.page
    ? parseInt(searchParams.page as unknown as string, 10)
    : 1;
  const limit = 3;
  const result = await getUserImagesFromDb(page, limit);

  if (!result) return null;

  const totalPages = Math.ceil(result?.totalCount / limit);

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

      <div>
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
export default DashboardPage;
