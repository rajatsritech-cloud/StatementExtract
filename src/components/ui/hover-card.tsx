import * as React from "react";

import { cn } from "@/lib/utils";

export interface HoverCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  children: React.ReactNode;
  content: React.ReactNode;
}

const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  ({ className, children, content, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        {...props}
      >
        {children}
        {isOpen && (
          <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-md border bg-[hsl(var(--popover))] p-4 text-[hsl(var(--popover-foreground))] shadow-md outline-none">
            {content}
          </div>
        )}
      </div>
    );
  }
);
HoverCard.displayName = "HoverCard";

const HoverCardTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  ),
);
HoverCardTrigger.displayName = "HoverCardTrigger";

const HoverCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  ),
);
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
