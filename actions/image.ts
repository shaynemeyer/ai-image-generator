"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import OpenAI from "openai";
const openai = new OpenAI();
import { nanoid } from "nanoid";
import { db } from "@/db/drizzle";
import { images } from "@/db/schema/image";
import { currentUserDetails } from "./user";
import { sql } from "drizzle-orm";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryFolder = process.env.CLOUDINARY_API_FOLDER;

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

export async function generateImageAi({
  imagePrompt,
}: {
  imagePrompt: string;
}) {
  // to redirect user to login if not signed in
  await auth.protect();

  const { userEmail, userName } = await currentUserDetails();

  if (!userEmail) {
    throw new Error("Please login to generate image");
  }

  let imageId = 0;

  try {
    const image = await openai.images.generate({
      prompt: imagePrompt,
    });

    const imageUrl = image.data[0].url as string;

    // convert the stream to a buffer
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    // upload the buffer to cloudinary
    const uploadResponse: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: cloudinaryFolder,
            public_id: nanoid(),
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as UploadApiResponse);
            }
          }
        );
        uploadStream.end(new Uint8Array(buffer));
      }
    );

    const cloudinaryUrl = uploadResponse.secure_url;

    const imageResult = await db
      .insert(images)
      .values({
        userEmail,
        userName,
        name: imagePrompt,
        imagePrompt,
        url: cloudinaryUrl,
      })
      .returning();
    imageId = imageResult[0].id!;
  } catch (error) {
    renderError(error);
  }

  if (imageId > 0) {
    return { id: imageId, success: true };
  }

  redirect("/error");
}

export async function getUserImagesFromDb(
  page: number = 1,
  limit: number = 10
) {
  const { userEmail } = await currentUserDetails();

  try {
    const result = await db
      .select()
      .from(images)
      .where(sql`user_email=${userEmail}`)
      .orderBy(images.id)
      .limit(limit)
      .offset((page - 1) * limit);
    return {
      images: result,
      totalCount: result.length,
    };
  } catch (error) {
    renderError(error);
  }
}
