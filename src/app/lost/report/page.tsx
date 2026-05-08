"use client";

import { useState } from 'react';
import { ItemForm } from "@/components/forms/item-form";
import type { LostItemFormData } from "@/components/forms/item-schemas";
import { addItem } from "@/lib/item-store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ReportLostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: LostItemFormData) => {
    setIsLoading(true);
    try {
      addItem({ ...data, type: "lost" });
      toast({
        title: "Item Reported Successfully!",
        description: `${data.name} has been added to lost items.`,
        variant: "default",
      });
      router.push("/items");
    } catch (error) {
      toast({
        title: "Error Reporting Item",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
    // No need to setIsLoading(false) on success due to navigation
  };

  return (
    <div className="container mx-auto py-8">
      <ItemForm itemType="lost" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
