import React from 'react';

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, label, disabled }) => (
  <div className="w-full max-w-xs">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 h-10"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default Select;