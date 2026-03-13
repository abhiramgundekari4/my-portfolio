"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy } from "lucide-react";
import { portfolioData } from "@/lib/data";

export function LeetCodeStats() {
  // Simple stats for a clean look
  const stats = {
    total: 245,
    easy: 120,
    medium: 100,
    hard: 25,
    rank: "Top 15%",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-primary/5 bg-card/50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-accent/10 p-3">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Solved</p>
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/5 bg-card/50">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-3">
                <Icons.leetcode className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Standing</p>
                <p className="text-2xl font-bold text-primary">{stats.rank}</p>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm" className="ml-auto">
              <a href={portfolioData.socials.leetcode} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4 px-2">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-emerald-500">Easy</span>
            <span className="text-muted-foreground">{stats.easy}</span>
          </div>
          <Progress value={(stats.easy / stats.total) * 100} className="h-1 bg-emerald-500/10" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-amber-500">Med</span>
            <span className="text-muted-foreground">{stats.medium}</span>
          </div>
          <Progress value={(stats.medium / stats.total) * 100} className="h-1 bg-amber-500/10" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-rose-500">Hard</span>
            <span className="text-muted-foreground">{stats.hard}</span>
          </div>
          <Progress value={(stats.hard / stats.total) * 100} className="h-1 bg-rose-500/10" />
        </div>
      </div>
    </div>
  );
}
