import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type SectionTitleProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
};

export function SectionTitle({ icon: Icon, children, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-12 flex flex-col items-center text-center", className)}>
      <div className="mb-4 flex items-center gap-4">
         <Icon className="h-10 w-10 text-accent" />
         <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">
            {children}
         </h2>
      </div>
    </div>
  );
}
