import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  userEmail: text("user_email"),
  userName: text("user_name"),
  name: text("name"),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow(),
});
