"use client";

import { useEffect, useState, useMemo } from "react";
import type { Item } from "@/lib/item-store";
import { getItems, itemCategories } from "@/lib/item-store";
import { ItemCard } from "@/components/item-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, XCircle } from "lucide-react";

export default function BrowseItemsPage() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<Item["type"] | "all">("all");
  const [filterCategory, setFilterCategory] = useState<Item["category"] | "all">("all");

  useEffect(() => {
    // Simulating fetching items. In a real app, this might be an API call.
    // The getItems() function from item-store now sorts by date.
    setAllItems(getItems());
  }, []);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearchTerm =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === "all" || item.type === filterType;
      
      const matchesCategory = filterCategory === "all" || (item.type === "exchange" && item.category === filterCategory) || item.type !== "exchange";

      return matchesSearchTerm && matchesType && matchesCategory;
    });
  }, [allItems, searchTerm, filterType, filterCategory]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterCategory("all");
  };
  
  const activeFilterCount = [searchTerm, filterType, filterCategory].filter(f => f && f !== "all").length;


  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 p-6 bg-card rounded-lg shadow-sm border">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Browse Items</h1>
        <p className="text-muted-foreground mb-6">Find what you're looking for or discover something new in the community listings.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">
              Search Items
            </label>
            <div className="relative">
              <Input
                id="search"
                type="text"
                placeholder="Search by name, description, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="filterType" className="block text-sm font-medium text-foreground mb-1">
              Filter by Type
            </label>
            <Select value={filterType} onValueChange={(value) => setFilterType(value as Item["type"] | "all")}>
              <SelectTrigger id="filterType">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="found">Found</SelectItem>
                <SelectItem value="exchange">For Exchange</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="filterCategory" className="block text-sm font-medium text-foreground mb-1">
              Filter by Category (Exchange)
            </label>
            <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as Item["category"] | "all")} disabled={filterType !== 'exchange' && filterType !== 'all'}>
              <SelectTrigger id="filterCategory">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {itemCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {activeFilterCount > 0 && (
          <div className="mt-4 flex items-center justify-end">
            <Button variant="ghost" onClick={resetFilters} className="text-sm text-muted-foreground hover:text-primary">
              <XCircle className="mr-2 h-4 w-4" />
              Clear Filters ({activeFilterCount})
            </Button>
          </div>
        )}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Items Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters. There might be no items matching your current criteria.
          </p>
           {activeFilterCount > 0 && (
             <Button variant="link" onClick={resetFilters} className="mt-4">
              Reset all filters
            </Button>
           )}
        </div>
      )}
    </div>
  );
}
