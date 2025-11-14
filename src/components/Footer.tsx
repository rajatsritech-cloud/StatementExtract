import { FileText, Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[hsl(var(--foreground))]">Statement Extract</span>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              AI-powered document extraction for modern teams.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Features</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">API</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Documentation</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Guides</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Blog</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[hsl(var(--foreground))]">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">About</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Careers</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Privacy</a></li>
              <li><a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-[hsl(var(--border))] pt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>© 2025 Statement Extract. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
