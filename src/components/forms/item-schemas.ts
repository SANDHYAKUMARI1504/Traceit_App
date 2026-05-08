
import { z } from "zod";
import { itemCategories } from "@/lib/item-store";

const commonItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name must be at most 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be at most 1000 characters"),
  imageUrl: z.string().url("Please enter a valid image URL").or(z.literal("")).optional()
    .transform(val => val === "" ? "https://placehold.co/600x400.png" : val), // Default placeholder if empty
  dataAiHint: z.string().max(50, "AI hint too long").optional().default("item object"),
});

export const lostItemSchema = commonItemSchema.extend({
  location: z.string().min(3, "Location must be at least 3 characters").max(200, "Location must be at most 200 characters"),
});

export const foundItemSchema = commonItemSchema.extend({
  location: z.string().min(3, "Location must be at least 3 characters").max(200, "Location must be at most 200 characters"),
});

export const exchangeItemSchema = commonItemSchema.extend({
  category: z.enum(itemCategories, {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  contactDetails: z.string().min(5, "Contact details are too short").max(100, "Contact details too long")
    .refine(value => z.string().email().safeParse(value).success || /^\+?[1-9]\d{1,14}$/.test(value.replace(/\s+/g, '')), {
      message: "Please enter a valid email or phone number.",
    }),
  location: z.string().max(200, "Location must be at most 200 characters").optional(),
});

export type LostItemFormData = z.infer<typeof lostItemSchema>;
export type FoundItemFormData = z.infer<typeof foundItemSchema>;
export type ExchangeItemFormData = z.infer<typeof exchangeItemSchema>;

    