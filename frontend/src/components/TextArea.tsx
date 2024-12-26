import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  readOnly?: boolean;
}

export function TextArea({ value, onChange, placeholder, label, readOnly = false }: TextAreaProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
          border-gray-300 dark:border-gray-600 
          placeholder-gray-400 dark:placeholder-gray-500
          ${readOnly ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
      />
    </div>
  );
}