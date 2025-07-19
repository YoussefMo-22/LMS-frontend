import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'skeleton';
  className?: string;
  text?: string;
}

export const GridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-white overflow-hidden shadow rounded-xl animate-pulse">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-gray-300 rounded-lg p-3 w-12 h-12"></div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    ))}
  </div>
);

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'spinner',
  className = '',
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`${sizeClasses[size]} bg-current rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );
      
      case 'skeleton':
        return (
          <div className={`${sizeClasses[size]} bg-gray-300 rounded animate-pulse`} />
        );
      
      case 'spinner':
      default:
        return (
          <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-current`} />
        );
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        {renderSpinner()}
        {text && (
          <p className="text-sm text-gray-500">{text}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 