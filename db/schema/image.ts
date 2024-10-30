import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial().primaryKey(),
  userEmail: text("user_email"),
  userName: text("user_name"),
  name: text("name"),
  url: text("url"),
  imagePrompt: text("image_prompt"),
  createdAt: timestamp("created_at").defaultNow(),
});
