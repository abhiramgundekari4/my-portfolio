'use client';

import React, { useState, useEffect } from 'react';
import { AppProvider, useAppStore } from '@/features/engine/context';
import { RenderEngine } from '@/features/engine/engine';
import { AppConfig } from '@/lib/types';

import studentMgmt from '@/features/apps/student-mgmt.json';
import employeeMgmt from '@/features/apps/employee-mgmt.json';
import eventReg from '@/features/apps/event-reg.json';

import { Play } from 'lucide-react';

const PRESETS: Record<string, any> = {
  'student-mgmt': studentMgmt,
  'employee-mgmt': employeeMgmt,
  'event-reg': eventReg,
};

function WorkspaceShell() {
  const { state, setActiveApp, loadRawConfig, customConfig } = useAppStore();
  const [activePreset, setActivePreset] = useState('student-mgmt');
  
  const [editorText, setEditorText] = useState('');
  const [editorError, setEditorError] = useState<string | null>(null);
  const [editorSuccess, setEditorSuccess] = useState(false);

  useEffect(() => {
    if (customConfig && activePreset === 'custom') {
      setEditorText(customConfig);
    } else {
      const presetData = PRESETS[activePreset];
      setEditorText(JSON.stringify(presetData, null, 2));
    }
  }, [activePreset, customConfig]);

  const handlePresetSelect = (id: string) => {
    setActivePreset(id);
    setActiveApp(id);
    setEditorError(null);
    setEditorSuccess(false);
  };

  const handleApplyConfig = () => {
    const res = loadRawConfig(editorText);
    if (res.success) {
      setEditorError(null);
      setEditorSuccess(true);
      setActivePreset('custom');
      setTimeout(() => setEditorSuccess(false), 2000);
    } else {
      setEditorError(res.error);
      setEditorSuccess(false);
    }
  };

  const getActiveConfig = (): AppConfig => {
    if (activePreset === 'custom' && customConfig) {
      try {
        return JSON.parse(customConfig) as AppConfig;
      } catch (_) {}
    }
    return PRESETS[activePreset] as AppConfig;
  };

  const activeConfig = getActiveConfig();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col font-sans">
      
      {/* Header */}
      <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            G
          </div>
          <div>
            <h1 className="font-bold text-sm text-gray-900">AI App Generator</h1>
            <p className="text-[10px] text-gray-500 font-medium">College Assignment Project</p>
          </div>
        </div>

        {/* Navigation presets switcher */}
        <nav className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg">
          {Object.keys(PRESETS).map((key) => {
            const config = PRESETS[key];
            const isActive = activePreset === key;
            return (
              <button
                key={key}
                onClick={() => handlePresetSelect(key)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {config.appName}
              </button>
            );
          })}
          {customConfig && (
            <button
              onClick={() => handlePresetSelect('custom')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                activePreset === 'custom'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              My Config
            </button>
          )}
        </nav>
      </header>

      {/* Workspace Panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        
        {/* Render Viewport */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto bg-gray-50">
          <header className="mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {activeConfig.appName}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {activeConfig.description}
            </p>
          </header>

          <RenderEngine config={activeConfig.layout} />
        </main>

        {/* Playground Editor */}
        <aside className="w-full lg:w-96 bg-white flex flex-col h-[400px] lg:h-auto overflow-hidden">
          <div className="h-12 border-b border-gray-200 px-4 flex items-center justify-between bg-gray-50">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              JSON Config Editor
            </span>
            <button
              onClick={handleApplyConfig}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase transition-colors"
            >
              <Play className="h-3 w-3" /> Update App
            </button>
          </div>

          <div className="flex-1 p-3">
            <textarea
              value={editorText}
              onChange={e => setEditorText(e.target.value)}
              className="w-full h-full text-xs font-mono p-3 rounded border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 resize-none"
              spellCheck={false}
            />
          </div>

          <div className="p-3 border-t border-gray-200 bg-gray-50">
            {editorError ? (
              <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
                {editorError}
              </div>
            ) : editorSuccess ? (
              <div className="p-2.5 rounded bg-green-50 border border-green-200 text-green-700 text-xs">
                Updated layout config successfully!
              </div>
            ) : (
              <p className="text-[10px] text-gray-400 text-center">
                Modify JSON above to change the layout configuration.
              </p>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}

export default function AppGeneratorPage() {
  return (
    <AppProvider>
      <WorkspaceShell />
    </AppProvider>
  );
}
