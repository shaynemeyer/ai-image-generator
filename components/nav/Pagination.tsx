import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
}
function Pagination({ page, totalPages }: PaginationProps) {
  console.log("Page: " + page + " TotalPages: " + totalPages);
  return (
    <nav className="flex justify-center fixed-bottom opacity-75 mb-10">
      <ul className="flex justify-center items-center space-x-2 mt-5">
        {page > 1 && (
          <li>
            <Link href={`?page=${page - 1}`}>
              <Button variant="ghost">
                <ChevronsLeft />
              </Button>
            </Link>
          </li>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber}>
              <Link href={`?page=${pageNumber}`}>
                <Button
                  variant={`${page === pageNumber ? "secondary" : "ghost"}`}
                >
                  {pageNumber}
                </Button>
              </Link>
            </li>
          );
        })}

        {page < totalPages && (
          <li>
            <Link href={`?page=${page + 1}`}>
              <Button variant="ghost">
                <ChevronsRight />
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Pagination;
