"use client";

import { useState } from 'react';
import { ItemForm } from "@/components/forms/item-form";
import type { ExchangeItemFormData } from "@/components/forms/item-schemas";
import { addItem } from "@/lib/item-store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ListExchangePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: ExchangeItemFormData) => {
    setIsLoading(true);
    try {
      addItem({ ...data, type: "exchange" });
      toast({
        title: "Item Listed Successfully!",
        description: `${data.name} has been listed for exchange.`,
        variant: "default",
      });
      router.push("/items");
    } catch (error) {
      toast({
        title: "Error Listing Item",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ItemForm itemType="exchange" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
