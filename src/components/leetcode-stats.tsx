"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy, Brain } from "lucide-react";
import { portfolioData } from "@/lib/data";

export function LeetCodeStats() {
  // These are placeholder values that represent your proficiency.
  // In a real scenario, these could be fetched from an API or updated in data.ts
  const stats = {
    total: 245,
    easy: 120,
    medium: 100,
    hard: 25,
    rank: "Top 15%",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Solved Card */}
        <Card className="border-primary/10 bg-card transition-all hover:shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Trophy className="mb-2 h-8 w-8 text-accent" />
            <span className="text-3xl font-bold text-primary">{stats.total}</span>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Solved</span>
          </CardContent>
        </Card>

        {/* Global Rank Card */}
        <Card className="border-primary/10 bg-card transition-all hover:shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Brain className="mb-2 h-8 w-8 text-accent" />
            <span className="text-3xl font-bold text-primary">{stats.rank}</span>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Global Standing</span>
          </CardContent>
        </Card>

        {/* Profile Link Card */}
        <Card className="border-primary/10 bg-card transition-all hover:shadow-md">
          <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
            <Icons.leetcode className="mb-2 h-8 w-8 text-accent" />
            <Button asChild variant="outline" size="sm" className="mt-2">
              <a href={portfolioData.socials.leetcode} target="_blank" rel="noopener noreferrer">
                View Profile <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Difficulty Breakdown */}
      <Card className="border-primary/10 bg-card p-8">
        <h4 className="mb-6 text-lg font-semibold text-primary">Difficulty Breakdown</h4>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-emerald-500">Easy</span>
              <span className="text-muted-foreground">{stats.easy} Solved</span>
            </div>
            <Progress value={(stats.easy / stats.total) * 100} className="h-2 bg-emerald-500/10" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-amber-500">Medium</span>
              <span className="text-muted-foreground">{stats.medium} Solved</span>
            </div>
            <Progress value={(stats.medium / stats.total) * 100} className="h-2 bg-amber-500/10" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-rose-500">Hard</span>
              <span className="text-muted-foreground">{stats.hard} Solved</span>
            </div>
            <Progress value={(stats.hard / stats.total) * 100} className="h-2 bg-rose-500/10" />
          </div>
        </div>
      </Card>
    </div>
  );
}
