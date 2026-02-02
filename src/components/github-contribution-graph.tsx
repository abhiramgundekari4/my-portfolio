"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ContributionGraph = () => {
  const [contributions, setContributions] = useState<Array<{ date: string; count: number }>>([]);

  useEffect(() => {
    const generateData = () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 365);
      const data = [];
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        data.push({
          date: d.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 20),
        });
      }
      return data;
    };
    setContributions(generateData());
  }, []);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-secondary';
    if (count < 5) return 'bg-accent/40';
    if (count < 10) return 'bg-accent/60';
    if (count < 15) return 'bg-accent/80';
    return 'bg-accent';
  };

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 max-w-full overflow-x-auto p-1">
        {contributions.map(({ date, count }) => (
          <Tooltip key={date}>
            <TooltipTrigger asChild>
              <div className={cn('h-3 w-3 rounded-sm', getColor(count))} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{count} contributions on {date}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default ContributionGraph;
