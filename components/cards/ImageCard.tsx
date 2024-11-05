"use client";
import { ImageType } from "@/types/image";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "../ui/button";
import { Trash2Icon, View } from "lucide-react";
import CustomAlertDialog from "../dialogs/CustomAlertDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
dayjs.extend(relativeTime);

interface ImageCardProps {
  image: ImageType;
  mode?: "view" | "edit";
}

function ImageCard({ image, mode = "view" }: ImageCardProps) {
  return (
    <Card className="w-full max-w-lg mx-10 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-4 p-2">
        <div className="flex flex-row justify-between w-full">
          <div
            className="flex flex-row
          gap-2"
          >
            <div className="w-16 h-16 relative overflow-hidden rounded-md">
              <Image src={image.url} alt={image.name as string} fill />
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg line-clamp-1">
                {image.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {dayjs(image.createdAt).fromNow()}
              </p>
              <p className="text-[12px] text-muted-foreground">
                {image?.userName || "Anonymous"}
              </p>
            </div>
          </div>
          {mode === "edit" && (
            <div className="flex gap-1 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={`/dashboard/image/${image.id}`}>
                      <Button variant="secondary" size="icon">
                        <View />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View the image</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CustomAlertDialog
                        trigger={
                          <Button className="text-white" size="icon">
                            <Trash2Icon />
                          </Button>
                        }
                        action={() => console.log("Delete")}
                      />
                    </TooltipTrigger>
                    <TooltipContent>Delete the image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
export default ImageCard;
