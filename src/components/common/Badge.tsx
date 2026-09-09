import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'prime' | 'deal' | 'bestseller' | 'success' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'prime',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-bold',
    md: 'text-xs px-2.5 py-1 font-bold',
  };

  const variantStyles = {
    prime: 'bg-[#007185] text-white tracking-wider',
    deal: 'bg-amazon-deal text-white font-bold uppercase tracking-wider',
    bestseller: 'bg-[#e67a00] text-white font-bold',
    success: 'bg-emerald-700 text-white font-semibold',
    outline: 'border border-gray-300 text-amazon-muted bg-white',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-sm select-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
