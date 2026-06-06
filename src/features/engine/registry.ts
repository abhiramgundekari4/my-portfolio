import React from 'react';
import { FormBuilder } from '../components/form-builder';
import { DataTable } from '../components/data-table';
import { DashboardCard } from '../components/dashboard-builder';
import { LayoutSection } from '../components/layout-sections';
import { ComponentFallback } from '../components/fallback';

const registry: Record<string, React.ComponentType<any>> = {
  Form: FormBuilder,
  DataTable: DataTable,
  DashboardCard: DashboardCard,
  LayoutSection: LayoutSection,
};

export function getComponent(type: string): React.ComponentType<any> {
  const component = registry[type];
  if (component) {
    return component;
  }
  return ComponentFallback;
}
