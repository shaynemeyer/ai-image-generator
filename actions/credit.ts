"use server";
import { db } from "@/db/drizzle";
import { credits as creditsTable } from "@/db/schema/credits";
import { currentUserDetails } from "./user";
import { sql } from "drizzle-orm";
import { renderError } from "@/lib/errors";

export const saveCreditToDb = async (amount: number, credits: number) => {
  try {
    const { userEmail } = await currentUserDetails();

    if (!userEmail) {
      throw new Error("Please login to save credit");
    }
    // check if user already has a credit record
    const existingCredit = await db
      .selectDistinct()
      .from(creditsTable)
      .where(sql`user_email=${userEmail}`);

    if (existingCredit.length > 0) {
      // update
      if (existingCredit[0].amount) {
        existingCredit[0].amount += amount;
      }

      if (existingCredit[0].credits) {
        existingCredit[0].credits += credits;
      }

      await db
        .update(creditsTable)
        .set({
          amount: existingCredit[0].amount,
          credits: existingCredit[0].credits,
          updatedAt: new Date(),
        })
        .where(sql`id=${existingCredit[0].id}`);

      return JSON.parse(JSON.stringify(existingCredit[0]));
    } else {
      // create
      const newCredit = await db
        .insert(creditsTable)
        .values({
          userEmail,
          amount: amount.toString(),
          credits: credits.toString(),
        })
        .returning();
      return newCredit;
    }
  } catch (error) {
    renderError(error);
  }
};

export const getUserCreditsFromDb = async () => {
  try {
    const { userEmail } = await currentUserDetails();
    const result = await db
      .select()
      .from(creditsTable)
      .where(sql`user_email=${userEmail}`);

    return result[0];
  } catch (error) {
    renderError(error);
  }
};
