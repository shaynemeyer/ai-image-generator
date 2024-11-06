"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryFolder = process.env.CLOUDINARY_API_FOLDER;

export async function extractPublicId(url: string): Promise<string | null> {
  const regex = /\/v\d+\/(?:.*\/)?([^\/.]+)(?:\.[a-z]+)?$/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function deleteImageFromCloudinary(
  publicId: string
): Promise<Record<"message" | "status", string>> {
  let message = "";
  let status = "error";

  try {
    const publicPath = `${cloudinaryFolder}/${publicId}`;
    const result = await cloudinary.uploader.destroy(publicPath);

    console.log(JSON.stringify(result));

    if (result.result === "ok") {
      console.log(`Image with public ID ${publicId} was successfully deleted.`);
      message = `Image with public ID ${publicId} was successfully deleted.`;
      status = "ok";
    } else {
      console.log(`Failed to delete image. Result: ${result.result}`);
      message = `Failed to delete image. Result: ${result.result}`;
    }
  } catch (error) {
    message = `Error deleting image: ${error}`;
    console.error("Error deleting image:", error);
  }

  return { message, status };
}
