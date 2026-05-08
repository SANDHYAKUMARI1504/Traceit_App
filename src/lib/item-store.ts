
import type { LucideIcon } from 'lucide-react';

export interface Item {
  id: string;
  type: "lost" | "found" | "exchange";
  name: string;
  description: string;
  imageUrl: string;
  location?: string;
  category?: "Electronics" | "Furniture" | "Clothing" | "Books" | "Sports" | "Vehicles" | "Other";
  contactDetails?: string;
  reportedAt: string; // ISO string for date
  dataAiHint?: string; // For placeholder images
}

// This is a simple in-memory store. Data will reset on server restart or full page reload if not persisted.
let items: Item[] = [
  { 
    id: '1', 
    type: 'lost', 
    name: 'Classic Leather Journal', 
    description: 'A5 sized brown leather journal, lost somewhere near Willow Creek Cafe. Contains personal notes and sketches. Sentimental value.', 
    imageUrl: 'https://placehold.co/600x400.png', 
    location: 'Willow Creek Cafe', 
    reportedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    dataAiHint: "journal book" 
  },
  { 
    id: '2', 
    type: 'found', 
    name: 'Set of Keys with Blue Fob', 
    description: 'Found a set of three keys (house, car, unknown) on a silver keyring with a distinctive blue electronic fob. Discovered on the park bench by the fountain.', 
    imageUrl: 'https://placehold.co/600x400.png', 
    location: 'City Park - Fountain Bench', 
    reportedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    dataAiHint: "keys fob"
  },
  { 
    id: '3', 
    type: 'exchange', 
    name: 'Vintage Acoustic Guitar', 
    description: 'Beautifully aged Yamaha acoustic guitar. Minor wear, but plays wonderfully. Comes with a soft case. Selling due to upgrade.', 
    imageUrl: 'https://placehold.co/600x400.png', 
    category: 'Other', 
    contactDetails: 'guitarist@example.com', 
    reportedAt: new Date().toISOString(),
    dataAiHint: "guitar music"
  },
  { 
    id: '4', 
    type: 'lost', 
    name: 'Ray-Ban Sunglasses', 
    description: 'Black Ray-Ban Wayfarer sunglasses. Left them on a table at "The Daily Grind" coffee shop.', 
    imageUrl: 'https://placehold.co/600x400.png', 
    location: 'The Daily Grind Coffee', 
    reportedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    dataAiHint: "sunglasses fashion"
  },
  { 
    id: '5', 
    type: 'exchange', 
    name: 'Mountain Bike - Medium Frame', 
    description: 'Well-maintained Trek mountain bike. Suitable for trails and city riding. Recently serviced.', 
    imageUrl: 'https://placehold.co/600x400.png', 
    category: 'Sports', 
    contactDetails: 'bike_seller@example.com', 
    reportedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    dataAiHint: "bicycle sport"
  }
];

export const getItems = (): Item[] => {
  return [...items].sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
};

export const addItem = (itemData: Omit<Item, 'id' | 'reportedAt'>): Item => {
  const newItem: Item = {
    ...itemData,
    id: String(Date.now() + Math.random().toString(36).substring(2, 15)), // More unique ID
    reportedAt: new Date().toISOString(),
  };
  items = [newItem, ...items];
  return newItem;
};

export const itemCategories: Item["category"][] = ["Electronics", "Furniture", "Clothing", "Books", "Sports", "Vehicles", "Other"];

    