"use client";

import type { ComponentPropsWithoutRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { itemCategories } from "@/lib/item-store";
import type { LostItemFormData, FoundItemFormData, ExchangeItemFormData } from "./item-schemas";
import { lostItemSchema, foundItemSchema, exchangeItemSchema } from "./item-schemas";
import { UploadCloud, CheckCircle } from "lucide-react";

type ItemType = "lost" | "found" | "exchange";

interface ItemFormProps extends ComponentPropsWithoutRef<'form'> {
  itemType: ItemType;
  onSubmit: (data: LostItemFormData | FoundItemFormData | ExchangeItemFormData) => void;
  isLoading?: boolean;
}

const getSchema = (itemType: ItemType) => {
  if (itemType === "lost") return lostItemSchema;
  if (itemType === "found") return foundItemSchema;
  return exchangeItemSchema;
};

export function ItemForm({ itemType, onSubmit, isLoading = false, ...props }: ItemFormProps) {
  const schema = getSchema(itemType);
  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      dataAiHint: "",
      ...(itemType === "lost" || itemType === "found" ? { location: "" } : {}),
      ...(itemType === "exchange"
        ? { category: undefined, contactDetails: "", location: "" }
        : {}),
    },
  });

  const titleMap: Record<ItemType, string> = {
    lost: "Report a Lost Item",
    found: "Announce a Found Item",
    exchange: "List an Item for Exchange",
  };
  
  const submitButtonTextMap: Record<ItemType, string> = {
    lost: "Report Lost Item",
    found: "Announce Found Item",
    exchange: "List Item",
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          {titleMap[itemType]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6" {...props}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Red Bicycle, iPhone 12, Lost Keys" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the item, including any distinguishing features, condition, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/image.png" {...field} />
                  </FormControl>
                  <FormDescription>
                    Link to an image of the item. If empty, a placeholder will be used.
                    In a real app, this would be a file upload.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataAiHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Keywords (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'keys car', 'cat animal'" {...field} />
                  </FormControl>
                   <FormDescription>
                    Help us find a better placeholder if no URL is provided (1-2 words).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(itemType === "lost" || itemType === "found") && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{itemType === "lost" ? "Last Seen Location" : "Found Location"}</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Central Park, Main Street Library" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {itemType === "exchange" && (
              <>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {itemCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Details</FormLabel>
                      <FormControl>
                        <Input placeholder="Email or Phone Number" {...field} />
                      </FormControl>
                       <FormDescription>
                        How interested parties can reach you.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Location (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Downtown Pickup, My City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {itemType === 'exchange' ? <UploadCloud className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                  {submitButtonTextMap[itemType]}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
