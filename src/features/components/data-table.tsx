'use client';

import React from 'react';
import { useAppStore } from '../engine/context';
import { ComponentProps } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface DataTableProps {
  id: string;
  props: ComponentProps;
}

export function DataTable({ id, props }: DataTableProps) {
  const { title, description, tableId = 'defaultTable', tableColumns = [], actions = [] } = props;
  const { state, deleteRecord } = useAppStore();

  const dataList = state.datasets[tableId] || [];
  const showDelete = actions.includes('delete');

  const renderCell = (row: Record<string, any>, colKey: string, type?: string) => {
    const val = row[colKey];
    if (val === undefined || val === null || val === '') return <span className="text-gray-400">—</span>;

    if (type === 'badge') {
      return (
        <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-100">
          {val}
        </span>
      );
    }

    if (type === 'number') {
      return <span className="font-mono">{val.toLocaleString()}</span>;
    }

    return <span>{val.toString()}</span>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        {title && <h3 className="font-bold text-lg text-gray-900">{title}</h3>}
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>

      {dataList.length === 0 ? (
        <div className="text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-lg">
          <p className="text-sm font-semibold text-gray-700">No data records found</p>
          <p className="text-xs text-gray-400 mt-1">Submit the register form to add rows.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600">
                {tableColumns.map(col => (
                  <th key={col.key} className="px-4 py-2.5">{col.header}</th>
                ))}
                {showDelete && <th className="px-4 py-2.5 text-right">Delete</th>}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200 text-gray-800">
              {dataList.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {tableColumns.map(col => (
                    <td key={col.key} className="px-4 py-2.5">
                      {renderCell(row, col.key, col.type)}
                    </td>
                  ))}
                  {showDelete && (
                    <td className="px-4 py-2.5 text-right">
                      <button
                        onClick={() => deleteRecord(tableId, index)}
                        className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
