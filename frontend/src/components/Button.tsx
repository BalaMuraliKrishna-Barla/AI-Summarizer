import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({ onClick, isLoading, disabled, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        flex items-center justify-center px-6 py-3 rounded-lg
        text-white font-semibold
        transition-all duration-200
        ${isLoading || disabled
          ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed'
          : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-lg'
        }
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
}