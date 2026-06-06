'use client';

import { Play, RotateCcw, Cpu, FileJson, CheckSquare, Layers } from 'lucide-react';
import Link from 'next/link';

interface NotebookHeaderProps {
  kernelStatus: 'idle' | 'busy';
  executedCount: number;
  totalCells: number;
  onRunAll: () => void;
  onReset: () => void;
}

export function NotebookHeader({
  kernelStatus,
  executedCount,
  totalCells,
  onRunAll,
  onReset,
}: NotebookHeaderProps) {
  const percentComplete = Math.round((executedCount / totalCells) * 100);

  const menuItems = [
    { name: 'File', actions: ['New Notebook', 'Open...', 'Save and Checkpoint', 'Close and Halt'] },
    { name: 'Edit', actions: ['Cut Cells', 'Copy Cells', 'Paste Cells Above', 'Delete Cells'] },
    { name: 'View', actions: ['Toggle Header', 'Toggle Toolbar', 'Toggle Line Numbers'] },
    { name: 'Insert', actions: ['Insert Cell Above', 'Insert Cell Below'] },
    { name: 'Cell', actions: ['Run Cells', 'Run All', 'All Output -> Clear'] },
    { name: 'Kernel', actions: ['Interrupt', 'Restart', 'Restart & Clear Output', 'Change Kernel'] },
    { name: 'Help', actions: ['Notebook Help', 'Markdown Reference', 'Python Reference'] },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#161b22] border-b border-[#30363d] shadow-md">
      {/* File Action & Menu Bar */}
      <div className="container mx-auto px-4 md:px-8 py-2 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Side: Title & Menus */}
        <div className="flex items-center gap-6 min-w-0">
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#f37626] to-accent p-[1px]">
              <div className="h-full w-full rounded-[7px] bg-[#0d1117] flex items-center justify-center">
                <FileJson className="h-4 w-4 text-accent" />
              </div>
            </div>
            <span className="font-headline font-black text-sm text-foreground group-hover:text-accent transition-colors hidden sm:inline">
              Jupyter
            </span>
          </Link>

          <div className="h-4 w-[1px] bg-[#30363d] hidden sm:block" />

          {/* Simulated IPYNB Filename */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-mono text-sm font-bold text-foreground truncate">
                abhiram_gundekari_portfolio.ipynb
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] border border-[#30363d] text-[#8b949e] font-mono hidden md:inline">
                unsaved changes
              </span>
            </div>

            {/* Menu Items */}
            <div className="hidden lg:flex items-center gap-4 mt-0.5 text-xs text-[#8b949e]">
              {menuItems.map((menu) => (
                <button 
                  key={menu.name} 
                  className="hover:text-foreground transition-colors py-0.5 px-1 rounded hover:bg-[#21262d]"
                >
                  {menu.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Kernel Indicators */}
        <div className="flex items-center gap-4.5 text-xs">
          {/* Kernel Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#21262d] border border-[#30363d] font-mono">
            <Cpu className="h-3.5 w-3.5 text-accent" />
            <span className="text-[#8b949e]">Kernel:</span>
            <span className={kernelStatus === 'busy' ? 'text-yellow-500 font-bold' : 'text-emerald-400 font-bold'}>
              Python 3 (ipykernel)
            </span>
            <span className={`h-2 w-2 rounded-full ${
              kernelStatus === 'busy' ? 'bg-yellow-500 animate-ping' : 'bg-emerald-400'
            }`} />
          </div>

          <div className="h-6 w-[1px] bg-[#30363d] hidden sm:block" />

          {/* Quick Stats */}
          <div className="hidden sm:flex flex-col text-right font-mono text-[11px] text-[#8b949e]">
            <span>Executed: {executedCount}/{totalCells} cells</span>
            <div className="w-24 h-1.5 bg-[#21262d] rounded-full mt-1 overflow-hidden border border-[#30363d]">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Control Buttons Toolbar */}
      <div className="bg-[#0d1117] border-t border-[#30363d] px-4 md:px-8 py-2.5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Run All Trigger */}
            <button
              onClick={onRunAll}
              disabled={kernelStatus === 'busy'}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-accent hover:bg-accent/90 disabled:bg-[#21262d] disabled:text-[#8b949e] text-white text-xs font-bold transition-all shadow-md active:scale-95 duration-150"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Run All Cells</span>
            </button>

            {/* Reset/Restart Trigger */}
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#30363d] hover:bg-[#21262d] text-foreground text-xs font-bold transition-all active:scale-95 duration-150"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart Kernel</span>
            </button>

            <div className="h-4 w-[1px] bg-[#30363d] mx-2 hidden sm:block" />

            <span className="text-[10px] font-mono text-muted-foreground hidden md:inline">
              Tip: Click Run All to watch your skills, projects, and milestones execute sequentially!
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="flex items-center gap-1.5 text-xs text-primary hover:text-accent font-bold transition-colors"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>View Classic Site</span>
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}
