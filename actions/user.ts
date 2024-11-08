"use server";

import { currentUser } from "@clerk/nextjs/server";

export interface UserDetails {
  userEmail: string;
  userName: string;
  imageUrl: string;
}

export const currentUserDetails = async (): Promise<UserDetails> => {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress as string;
  const userName = user?.fullName as string;
  const imageUrl = user?.imageUrl as string;
  return { userEmail, userName, imageUrl };
};
