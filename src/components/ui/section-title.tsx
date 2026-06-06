import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type SectionTitleProps = {
  icon?: LucideIcon;
  number?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionTitle({ icon: Icon, number, children, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-16 flex flex-col items-center text-center", className)}>
      <div className="flex items-center gap-2">
        {number && (
          <span className="font-mono text-xs tracking-wider text-slate-400 font-bold uppercase mr-1">
            {number} //
          </span>
        )}
        {Icon && !number && <Icon className="h-6 w-6 text-slate-700" />}
        <h2 className="font-headline text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {children}
        </h2>
      </div>
      <div className="h-[1px] w-12 bg-slate-200 mt-3" />
    </div>
  );
}

