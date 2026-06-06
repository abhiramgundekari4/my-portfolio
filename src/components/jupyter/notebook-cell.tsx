'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Check, Loader2 } from 'lucide-react';

interface NotebookCellProps {
  id: number;
  codeHtml: React.ReactNode;
  children: React.ReactNode;
  isExecuted: boolean;
  isExecuting: boolean;
  onExecute: (id: number) => void;
}

export function NotebookCell({
  id,
  codeHtml,
  children,
  isExecuted,
  isExecuting,
  onExecute,
}: NotebookCellProps) {
  const [hovered, setHovered] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Trigger auto-scroll to this output once executing completes
  useEffect(() => {
    if (isExecuted && !isExecuting && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isExecuted, isExecuting]);

  return (
    <div 
      className="group relative flex flex-col space-y-3.5 px-4 md:px-8 py-4 transition-all duration-300 hover:bg-[#161b22]/10 border-l-[3px] border-transparent hover:border-primary/20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      {/* Code Input Row */}
      <div className="flex flex-col md:flex-row items-start gap-4 w-full">
        {/* Left Side: Prompt Index column */}
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-start w-full md:w-20 pt-2 flex-shrink-0">
          <span className="font-mono text-xs font-bold text-[#8b949e]">
            In [{isExecuting ? (
              <span className="text-yellow-500 animate-pulse">*</span>
            ) : isExecuted ? (
              id
            ) : (
              ' '
            )}]:
          </span>
          
          {/* Action Trigger Button */}
          <button
            onClick={() => onExecute(id)}
            disabled={isExecuting}
            className={`mt-1 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 border ${
              isExecuting
                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                : isExecuted
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-primary/10 border-primary/20 text-accent hover:scale-105 active:scale-95'
            }`}
          >
            {isExecuting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isExecuted ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-accent ml-0.5" />
            )}
          </button>
        </div>

        {/* Right Side: Code Block */}
        <div className="flex-1 w-full bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden shadow-lg shadow-black/20 group-hover:border-[#8b949e]/30 transition-colors relative">
          {/* Editor Header Tab */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#30363d] bg-[#0d1117]/80 text-[11px] font-mono text-[#8b949e]">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/60" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
              <span className="ml-2">abhiram_notebook.ipynb</span>
            </div>
            <span>Python 3 (ipykernel)</span>
          </div>

          {/* Syntax Highlighted Editor Box */}
          <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-[#c9d1d9] bg-[#0d1117]/40 min-h-[3.5rem] flex items-center">
            <code>{codeHtml}</code>
          </pre>
        </div>
      </div>

      {/* Output Row (Expands smoothly once executed) */}
      {(isExecuted || isExecuting) && (
        <div 
          ref={outputRef}
          className={`flex flex-col md:flex-row items-start gap-4 w-full transition-all duration-700 ease-out origin-top ${
            isExecuting ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {/* Left Side: Output Prompt */}
          <div className="w-full md:w-20 flex-shrink-0 flex items-center md:justify-end md:pr-4 pt-4">
            <span className="font-mono text-xs font-bold text-[#8b949e]">
              Out [{isExecuted ? id : ' '}]:
            </span>
          </div>

          {/* Right Side: Output Frame */}
          <div className="flex-1 w-full relative">
            {isExecuting ? (
              <div className="flex items-center gap-3 p-8 border border-dashed border-primary/20 rounded-xl bg-white/[0.01]">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                <span className="text-sm font-mono text-muted-foreground animate-pulse">
                  Executing cell #{id} kernel operations...
                </span>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
                {children}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
