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
import { count, sql } from "drizzle-orm";
import { renderError } from "@/lib/errors";
import { credits as creditsTable } from "@/db/schema/credits";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryFolder = process.env.CLOUDINARY_API_FOLDER;

export async function deleteImageFromDb({ imageId }: { imageId: string }) {
  console.log(`Deleting image ${imageId}`);
  await auth.protect();

  const { userEmail } = await currentUserDetails();

  if (!userEmail) {
    throw new Error("Please login to generate image");
  }
  try {
    await db
      .delete(images)
      .where(sql`id=${imageId} and user_email=${userEmail}`);
  } catch (error) {
    renderError(error);
  }
}

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
    // check if user has enough credits
    const userCredit = await db
      .select()
      .from(creditsTable)
      .where(sql`user_email=${userEmail}`);

    if (!userCredit || parseInt(userCredit[0]?.credits as string) < 1) {
      return { success: false, id: null, credits: userCredit[0].credits };
    }

    // reduce credits by 1
    await db
      .update(creditsTable)
      .set({
        credits: (parseInt(userCredit[0].credits as string) - 1).toString(),
        updatedAt: new Date(),
      })
      .where(sql`id=${userCredit[0].id}`);

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
    return { id: imageId, success: true, credits: userCredit[0].credits };
  } catch (error) {
    renderError(error);
    redirect("/error");
  }
}

export async function getUserImagesFromDb(
  page: number = 1,
  limit: number = 10
) {
  const { userEmail } = await currentUserDetails();

  try {
    const offset = (page - 1) * limit;
    const result = await db
      .select()
      .from(images)
      .where(sql`user_email=${userEmail}`)
      .orderBy(images.id)
      .limit(limit)
      .offset(offset);

    const totalCount = await db
      .select({ count: count() })
      .from(images)
      .where(sql`user_email=${userEmail}`);

    return {
      images: result,
      totalCount: totalCount[0].count,
    };
  } catch (error) {
    renderError(error);
  }
}

export const getImageFromDb = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(images)
      .where(sql`id=${id}`);

    return result[0];
  } catch (error) {
    renderError(error);
  }
};
