import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Recycle } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">About TraceIt</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Connecting communities, one item at a time. Learn more about our mission, vision, and values.
        </p>
      </header>

      <section className="mb-12 md:mb-16">
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  At TraceIt, our mission is to provide a reliable and user-friendly platform that empowers individuals to easily report lost items, announce found items, and exchange goods within their local communities. We aim to foster a sense of trust, responsibility, and connection, making it simpler for belongings to find their way back to their owners and for pre-loved items to find new homes.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  We believe in the power of community and technology to solve everyday problems and promote sustainability.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://placehold.co/500x350.png"
                  alt="Community working together"
                  width={500}
                  height={350}
                  className="rounded-lg shadow-md"
                  data-ai-hint="teamwork community"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ValueCard
            icon={Users}
            title="Community Focus"
            description="We prioritize building strong, supportive communities where members help each other."
          />
          <ValueCard
            icon={Heart}
            title="Trust & Integrity"
            description="We strive to create a platform built on honesty, transparency, and respect for all users."
          />
          <ValueCard
            icon={Recycle}
            title="Sustainability"
            description="We encourage responsible consumption and the reuse of items to minimize waste."
          />
        </div>
      </section>

      <section className="text-center bg-secondary/50 py-12 md:py-16 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Our Community</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Become a part of TraceIt today and experience the ease of finding, reporting, and exchanging items. Together, we can make a difference.
        </p>
        {/* Placeholder for future call to action, e.g., newsletter signup or link to create account */}
      </section>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
          <Icon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

