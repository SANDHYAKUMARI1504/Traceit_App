import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageSearch, PackagePlus, Repeat, LayoutGrid, ArrowRight } from "lucide-react";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  cta: string;
}

function FeatureCard({ title, description, href, icon: Icon, cta }: FeatureCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardContent>
        <Button asChild className="w-full" variant="default">
          <Link href={href}>
            {cta} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary drop-shadow-sm">
            Welcome to TraceIt
          </h1>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4 mb-8">
            Your community hub for lost items, found treasures, and friendly exchanges.
            Reconnect, recover, and recycle with ease.
          </p>
          <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/items">
              Explore Items <LayoutGrid className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full container py-12 md:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How can we help?</h2>
          <p className="text-muted-foreground mt-2">Choose an action below to get started.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            title="Lost Something?"
            description="Report your lost item to the community. Provide details and a photo to help others identify it."
            href="/lost/report"
            icon={PackageSearch}
            cta="Report a Lost Item"
          />
          <FeatureCard
            title="Found an Item?"
            description="Announce an item you've found. Help reunite it with its rightful owner by posting its details."
            href="/found/announce"
            icon={PackagePlus}
            cta="Announce a Found Item"
          />
          <FeatureCard
            title="Exchange Goods?"
            description="List items you'd like to sell, donate, or trade. Connect with others for a sustainable exchange."
            href="/exchange/list"
            icon={Repeat}
            cta="List an Item for Exchange"
          />
        </div>
      </section>
      
      <section className="w-full py-12 md:py-16 lg:py-20 bg-secondary/50">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col md:flex-row items-center gap-8">
             <div className="md:w-1/2">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Connecting Communities</h2>
                <p className="text-muted-foreground mb-6">
                  TraceIt is more than just a platform; it's a community initiative designed to foster connections, promote responsibility, and encourage sustainable practices. Whether you're trying to find a cherished lost possession or looking to give a pre-loved item a new home, we're here to make the process simpler and more effective.
                </p>
                <Button asChild variant="outline">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
             </div>
             <div className="md:w-1/2">
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Community Connection" 
                  width={600} 
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="community people" 
                />
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
