import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const inputClasses = `
    w-full px-3 py-2 border rounded-lg transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${className}
  `;

  return (
    <div className='space-y-1'>
      {label && (
        <label className='block text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />

      {error && <p className='text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default Input;
