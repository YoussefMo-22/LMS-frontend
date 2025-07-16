import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <FontAwesomeIcon 
        icon={faSpinner} 
        className={`${sizeClasses[size]} text-primary-400 animate-spin mb-4`} 
      />
      {text && (
        <p className="text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
} 