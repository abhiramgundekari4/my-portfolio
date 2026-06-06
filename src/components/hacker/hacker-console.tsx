'use client';

import { useEffect, useRef } from 'react';
import { Terminal, Shield, Cpu, RefreshCw } from 'lucide-react';

interface HackerConsoleProps {
  logs: string[];
  systemMetrics: {
    cpu: string;
    memory: string;
    errors: number;
  };
  onClear: () => void;
}

export function HackerConsole({ logs, systemMetrics, onClear }: HackerConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs to the bottom on new additions
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden shadow-md">
      
      {/* Console Header Bar */}
      <div className="p-4 bg-[#0d1117] border-b border-[#30363d] flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-2 text-[#58a6ff]">
          <Terminal className="h-4 w-4" />
          <span className="font-bold uppercase tracking-wider text-foreground">Diagnostic Telemetry Terminal</span>
        </div>
        <button
          onClick={onClear}
          className="hover:text-foreground text-[#8b949e] flex items-center gap-1.5 transition-colors duration-200"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Clear Logs</span>
        </button>
      </div>

      {/* Real-time System Metrics Indicator Panel */}
      <div className="px-4 py-3 bg-[#161b22] border-b border-[#30363d] grid grid-cols-3 gap-2 font-mono text-[9px]">
        <div className="p-2 bg-[#0d1117] border border-[#30363d] rounded-md flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-[#58a6ff]" />
          <div>
            <span className="text-[#8b949e] block text-[7px] uppercase">CPU Load</span>
            <span className="text-foreground font-bold">{systemMetrics.cpu}</span>
          </div>
        </div>
        
        <div className="p-2 bg-[#0d1117] border border-[#30363d] rounded-md flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#8b949e]" />
          <div>
            <span className="text-[#8b949e] block text-[7px] uppercase">Memory Heap</span>
            <span className="text-foreground font-bold">{systemMetrics.memory}</span>
          </div>
        </div>

        <div className="p-2 bg-[#0d1117] border border-[#30363d] rounded-md flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${systemMetrics.errors > 0 ? 'bg-red-500 animate-pulse' : 'bg-[#57ab5a]'}`} />
          <div>
            <span className="text-[#8b949e] block text-[7px] uppercase">Telemetry</span>
            <span className={`font-bold uppercase ${systemMetrics.errors > 0 ? 'text-red-500' : 'text-[#57ab5a]'}`}>
              {systemMetrics.errors > 0 ? 'errors' : 'nominal'}
            </span>
          </div>
        </div>
      </div>

      {/* Console Scrolling Logs */}
      <div 
        ref={scrollRef}
        className="flex-1 p-5 font-mono text-xs leading-relaxed text-[#c9d1d9] overflow-y-auto space-y-2.5 max-h-[30rem] xl:max-h-none select-text bg-[#0d1117]/30"
      >
        {logs.map((log, index) => {
          let lineClass = 'text-[#8b949e]';
          if (log.startsWith('[ERROR]')) lineClass = 'text-red-400 font-bold';
          if (log.startsWith('[STATUS]')) lineClass = 'text-[#57ab5a] font-bold';
          if (log.startsWith('[WARNING]')) lineClass = 'text-yellow-500 font-semibold';
          if (log.startsWith('[SYSTEM]')) lineClass = 'text-[#58a6ff] font-bold';

          return (
            <div key={index} className={`whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-1 duration-200 ${lineClass}`}>
              {log}
            </div>
          );
        })}
        
        {/* Terminal Blinking Cursor */}
        <div className="flex items-center gap-1.5 text-[#8b949e]">
          <span>abhiram@evaluation-shell:~#</span>
          <span className="h-3.5 w-2 bg-[#8b949e] animate-pulse" />
        </div>
      </div>

    </div>
  );
}
