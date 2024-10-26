"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function generateImageAi() {
  // to redirect user to login if not signed in
  await auth.protect();

  try {
    console.log("Generating image");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error?.message);
    }
    redirect("/");
  }
}
