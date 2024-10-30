"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import OpenAI from "openai";
const openai = new OpenAI();
import { nanoid } from "nanoid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryFolder = process.env.CLOUDINARY_API_FOLDER;

export async function generateImageAi() {
  // to redirect user to login if not signed in
  await auth.protect();

  try {
    const image = await openai.images.generate({
      prompt:
        "A beautiful mountain lookout with a clear sky and a lake in the background",
    });

    const imageUrl = image.data[0].url as string;
    console.log(imageUrl);
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
    console.log(cloudinaryUrl);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    redirect("/");
  }
}
