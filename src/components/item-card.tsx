"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Item } from "@/lib/item-store";
import { MapPin, Tag, Phone, CalendarDays, Info } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface ItemCardProps {
  item: Item;
}

function ItemAttribute({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Icon className="h-4 w-4 mr-2 shrink-0" />
      <span className="font-medium mr-1">{label}:</span>
      <span className="truncate" title={value}>{value}</span>
    </div>
  );
}

export function ItemCard({ item }: ItemCardProps) {
  const getBadgeVariant = (type: Item["type"]): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "lost":
        return "destructive";
      case "found":
        return "default"; // Using primary color via 'default' badge variant
      case "exchange":
        return "secondary";
      default:
        return "outline";
    }
  };

  const reportedAtDate = new Date(item.reportedAt);
  const timeAgo = formatDistanceToNow(reportedAtDate, { addSuffix: true });

  return (
    <Card className="group flex flex-col h-full shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out overflow-hidden rounded-lg border">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={item.imageUrl || "https://placehold.co/600x400.png"}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={item.dataAiHint || "item object"}
        />
        <Badge 
          variant={getBadgeVariant(item.type)} 
          className="absolute top-2 right-2 capitalize text-xs px-2 py-1"
        >
          {item.type}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold truncate" title={item.name}>{item.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground flex items-center">
           <CalendarDays className="h-3 w-3 mr-1" /> {timeAgo}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm">
        <p className="text-foreground/80 line-clamp-3 leading-relaxed" title={item.description}>
          {item.description}
        </p>
        <div className="space-y-1 pt-1">
          {item.location && <ItemAttribute icon={MapPin} label="Location" value={item.location} />}
          {item.type === "exchange" && item.category && (
            <ItemAttribute icon={Tag} label="Category" value={item.category} />
          )}
          {item.type === "exchange" && item.contactDetails && (
             <ItemAttribute icon={Phone} label="Contact" value={item.contactDetails} />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <button className="text-primary hover:underline text-sm flex items-center">
          View Details <Info className="ml-1 h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  );
}
