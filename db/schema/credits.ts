import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const credits = pgTable("credits", {
  id: serial().primaryKey(),
  userEmail: text("user_email"),
  credits: numeric("credits"),
  amount: numeric("amount"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
