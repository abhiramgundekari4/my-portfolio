import React from 'react';

interface ComponentFallbackProps {
  id: string;
  type: string;
}

export function ComponentFallback({ id, type }: ComponentFallbackProps) {
  return (
    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
      <h4 className="font-bold">Error: Unknown Component Type</h4>
      <p className="text-xs text-yellow-700 mt-1">
        The component type <strong>{type}</strong> for component ID <strong>{id}</strong> is not registered in the system.
      </p>
    </div>
  );
}
