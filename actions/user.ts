"use server";

import { currentUser } from "@clerk/nextjs/server";

export const currentUserDetails = async () => {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const userName = user?.fullName;
  return { userEmail, userName };
};
