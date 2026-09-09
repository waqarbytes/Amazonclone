import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  padded = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200/80 shadow-card transition-all duration-200
        ${padded ? 'p-4 sm:p-5' : ''}
        ${interactive ? 'hover:shadow-card-hover hover:border-gray-300 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
