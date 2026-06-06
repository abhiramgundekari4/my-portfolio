'use client';

import React, { useState } from 'react';
import { useAppStore } from '../engine/context';
import { ComponentProps } from '@/lib/types';

interface FormBuilderProps {
  id: string;
  props: ComponentProps;
}

export function FormBuilder({ id, props }: FormBuilderProps) {
  const { title, description, fields = [], submitButtonText = 'Submit', formId = 'defaultForm', tableId = 'defaultTable' } = props;
  const { state, updateFormField, submitForm } = useAppStore();
  
  const values = state.formValues[formId] || {};
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    updateFormField(formId, name, value);
    if (localErrors[name]) {
      setLocalErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    fields.forEach(field => {
      const val = values[field.name];
      if (field.required && (val === undefined || val === null || val === '' || val === false)) {
        errors[field.name] = 'This field is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      return;
    }

    fields.forEach(field => {
      if (values[field.name] === undefined && field.defaultValue !== undefined) {
        updateFormField(formId, field.name, field.defaultValue);
      }
    });

    submitForm(formId, tableId);
    setLocalErrors({});
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        {title && <h3 className="font-bold text-lg text-gray-900">{title}</h3>}
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => {
          const hasError = !!localErrors[field.name];
          
          return (
            <div key={field.name} className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  value={values[field.name] || ''}
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full text-sm px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
                    hasError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={3}
                />
              ) : field.type === 'select' ? (
                <select
                  value={values[field.name] || field.defaultValue || ''}
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  className={`w-full text-sm px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
                    hasError ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" disabled>Select option...</option>
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id={`${formId}-${field.name}`}
                    checked={!!values[field.name]}
                    onChange={e => handleInputChange(field.name, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-0"
                  />
                  <label htmlFor={`${formId}-${field.name}`} className="text-xs text-gray-700 cursor-pointer">
                    Enable Option
                  </label>
                </div>
              ) : (
                <input
                  type={field.type}
                  value={values[field.name] || ''}
                  onChange={e => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full text-sm px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-colors ${
                    hasError ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              )}

              {hasError && (
                <span className="block text-[10px] text-red-500">
                  {localErrors[field.name]}
                </span>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className={`w-full py-2 rounded-md font-semibold text-sm transition-colors text-white ${
            isSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSuccess ? 'Saved' : submitButtonText}
        </button>
      </form>
    </div>
  );
}
