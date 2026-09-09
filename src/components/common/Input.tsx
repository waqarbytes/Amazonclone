import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-amazon-text tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-amazon-muted pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-amazon-text
            placeholder:text-gray-400
            transition duration-150
            focus:border-amazon-amber focus:outline-none focus:ring-2 focus:ring-amazon-amber focus:ring-opacity-40
            disabled:bg-gray-100 disabled:text-gray-500
            ${leftIcon ? 'pl-9' : ''}
            ${rightIcon ? 'pr-9' : ''}
            ${error ? 'border-amazon-deal focus:ring-red-400' : ''}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 text-amazon-muted flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <span className="text-xs text-amazon-deal font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-amazon-muted">{helperText}</span>
      ) : null}
    </div>
  );
};
