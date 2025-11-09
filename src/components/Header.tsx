import { Button } from "@/components/ui/button";
import { FileText, Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[hsl(var(--foreground))]">Statement <span className="bg-gradient-primary bg-clip-text text-transparent">Extract</span></span>
        </div>
        
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
            Features
          </a>
          <a href="#use-cases" className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
            Use Cases
          </a>
          <a href="#docs" className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
            Documentation
          </a>
          <a href="#pricing" className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors">
            Pricing
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="shadow-md">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
