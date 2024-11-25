// Add proper interface for props
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = ({ 
    onClick, 
    disabled, 
    isLoading, 
    children, 
    variant = 'primary' 
  }: ButtonProps) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
    const variantClasses = variant === 'primary' 
      ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500" 
      : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500";
  
    return (
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : children}
      </button>
    );
  };

// Add export statement
export default Button;