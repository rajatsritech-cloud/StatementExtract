import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--background))] py-20 px-6 md:py-32">
      {/* Floating SVG Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-20 left-10 w-32 h-32 text-[hsl(var(--primary))]/10 animate-float" style={{ animationDelay: '0s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M45.3,-57.3C57.9,-49.1,66.7,-33.5,70.4,-16.3C74.1,0.9,72.7,19.7,64.6,35.1C56.5,50.5,41.7,62.5,24.8,68.4C7.9,74.3,-11.1,74.1,-28.4,68.2C-45.7,62.3,-61.3,50.7,-69.5,35.2C-77.7,19.7,-78.5,0.3,-74.6,-17.6C-70.7,-35.5,-62.1,-51.9,-49.3,-60C-36.5,-68.1,-18.3,-67.9,-0.5,-67.2C17.2,-66.5,32.7,-65.5,45.3,-57.3Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute top-40 right-20 w-24 h-24 text-[hsl(var(--accent))]/10 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M41.3,-53.4C53.4,-43.7,62.7,-30.9,66.6,-16.4C70.5,-1.9,69,14.3,62.2,28.3C55.4,42.3,43.3,54.1,28.7,61.2C14.1,68.3,-3.1,70.7,-19.6,66.9C-36.1,63.1,-51.9,53.1,-61.3,38.9C-70.7,24.7,-73.7,6.3,-70.5,-10.3C-67.3,-26.9,-57.9,-41.7,-45.3,-51.2C-32.7,-60.7,-16.3,-64.9,-0.8,-63.8C14.7,-62.7,29.3,-63.1,41.3,-53.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-20 left-1/4 w-28 h-28 text-[hsl(var(--primary))]/10 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M37.3,-49.6C48.9,-40.3,59.3,-29.5,63.8,-16.2C68.3,-2.9,67,12.9,60.5,26.3C54,39.7,42.3,50.7,28.5,57.5C14.7,64.3,-1.2,67,-16.3,63.9C-31.4,60.8,-45.7,51.9,-55.4,39.3C-65.1,26.7,-70.2,10.4,-68.8,-5.4C-67.4,-21.2,-59.5,-36.5,-48.3,-45.5C-37.1,-54.5,-23.6,-57.2,-10.8,-57.7C2,-58.2,25.7,-58.9,37.3,-49.6Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute top-60 right-1/3 w-20 h-20 text-[hsl(var(--accent))]/10 animate-float" style={{ animationDelay: '3s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-58.9C57.1,-50.1,66.3,-35.9,69.9,-20.4C73.5,-4.9,71.5,11.8,64.8,26.3C58.1,40.8,46.7,53.1,32.6,60.5C18.5,67.9,1.7,70.4,-15.3,68.5C-32.3,66.6,-49.5,60.3,-60.8,48.9C-72.1,37.5,-77.5,21,-76.5,5.1C-75.5,-10.8,-68.1,-26.1,-57.3,-37.9C-46.5,-49.7,-32.3,-58,-17.3,-62.3C-2.3,-66.6,13.5,-67,32.4,-62.7C32.4,-58.4,32.3,-67.7,44.7,-58.9Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-40 right-10 w-36 h-36 text-[hsl(var(--primary))]/10 animate-float" style={{ animationDelay: '4s' }} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M39.7,-54.2C51.1,-45.5,59.4,-32.9,63.3,-19C67.2,-5.1,66.7,10.1,61.1,23.6C55.5,37.1,44.8,48.9,31.8,57.2C18.8,65.5,3.5,70.3,-11.9,69.5C-27.3,68.7,-42.8,62.3,-54.5,51.5C-66.2,40.7,-74.1,25.5,-75.3,9.7C-76.5,-6.1,-71,-22.5,-61.5,-35.3C-52,-48.1,-38.5,-57.3,-24.3,-64.2C-10.1,-71.1,4.8,-75.7,19.3,-73.9C33.8,-72.1,28.3,-62.9,39.7,-54.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--secondary))] px-4 py-2 backdrop-blur-sm animate-fade-in">
            <Zap className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span className="text-sm font-medium text-[hsl(var(--foreground))]">AI-Powered Document Processing</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-7xl animate-slide-up">
            Extract data from
            <span className="bg-gradient-primary bg-clip-text text-transparent"> any document</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-[hsl(var(--muted-foreground))] md:text-xl animate-fade-in">
            Turn PDFs, forms, and unstructured documents into structured data instantly.
            No templates. No training. Just results.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in">
            <Link href="/convert-bank-statement-to-csv-excel" passHref>
              <Button size="lg" className="group gap-2 shadow-glow">
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/convert-bank-statement-to-csv-excel" passHref>
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                View Documentation
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-[hsl(var(--muted-foreground))] animate-fade-in">
            No credit card required • Start your free trial
          </p>
        </div>
      </div>
    </section>
  );
};
