import React from 'react';
import { ComponentConfig } from '@/lib/types';
import { getComponent } from './registry';

interface RenderEngineProps {
  config: ComponentConfig[];
}

export function RenderEngine({ config }: RenderEngineProps) {
  if (!config || !Array.isArray(config)) {
    return (
      <div className="p-4 rounded-xl border border-dashed border-red-500/30 bg-red-500/5 text-red-400 text-xs font-semibold">
        Invalid configuration layout array.
      </div>
    );
  }

  return (
    <>
      {config.map((item) => {
        if (!item || !item.id || !item.type) {
          return (
            <div key={Math.random()} className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Warning: Config item is missing required fields (id, type).
            </div>
          );
        }

        const Component = getComponent(item.type);

        return (
          <Component 
            key={item.id} 
            id={item.id} 
            props={item.props || {}}
          >
            {item.children && item.children.length > 0 && (
              <RenderEngine config={item.children} />
            )}
          </Component>
        );
      })}
    </>
  );
}
