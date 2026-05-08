"use client";

import { useState } from 'react';
import { ItemForm } from "@/components/forms/item-form";
import type { FoundItemFormData } from "@/components/forms/item-schemas";
import { addItem } from "@/lib/item-store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function AnnounceFoundPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: FoundItemFormData) => {
    setIsLoading(true);
    try {
      addItem({ ...data, type: "found" });
      toast({
        title: "Item Announced Successfully!",
        description: `${data.name} has been added to found items.`,
        variant: "default",
      });
      router.push("/items");
    } catch (error) {
      toast({
        title: "Error Announcing Item",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <ItemForm itemType="found" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
