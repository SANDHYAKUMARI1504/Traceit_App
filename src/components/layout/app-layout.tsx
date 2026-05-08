
"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Blocks, PackageSearch, PackagePlus, Repeat, LayoutGrid, Search, LogOut, Settings } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/items", label: "Browse Items", icon: Search },
  { href: "/lost/report", label: "Report Lost", icon: PackageSearch },
  { href: "/found/announce", label: "Announce Found", icon: PackagePlus },
  { href: "/exchange/list", label: "List for Exchange", icon: Repeat },
];

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
        <SidebarHeader className="p-4 items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Blocks className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight text-primary group-data-[collapsible=icon]:hidden">
              TraceIt
            </h1>
          </Link>
          <div className="ml-auto group-data-[collapsible=icon]:hidden">
             <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>

        <SidebarContent className="p-2 flex-grow">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                    tooltip={{ children: item.label, className: "ml-2"}}
                  >
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t">
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="avatar person" />
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium">User Name</span>
              <span className="text-xs text-muted-foreground">user@example.com</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto group-data-[collapsible=icon]:hidden">
              <LogOut />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 md:hidden">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
             <Blocks className="h-7 w-7 text-primary" />
             <span className="font-semibold text-lg text-primary">TraceIt</span>
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
