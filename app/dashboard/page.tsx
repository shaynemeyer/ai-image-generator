"use server";
import { getUserImagesFromDb } from "@/actions/image";

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

  return (
    <div>
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold text-center">Images</h1>
        <p>Your Ai-Generated Image Collection</p>
      </div>

      {result && <div>{JSON.stringify(result.images, null, 4)}</div>}
    </div>
  );
}
export default DashboardPage;
