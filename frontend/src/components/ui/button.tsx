import { cn } from '../../lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { theme } from '../../styles/theme';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    loading = false,
    icon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200';
    const focusStyles = 'focus:outline-none focus:ring-2 focus:ring-offset-2';
    const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      primary: `bg-[${theme.colors.primary.main}] text-white hover:bg-[${theme.colors.primary.dark}] ${focusStyles} focus:ring-[${theme.colors.primary.light}]`,
      secondary: `bg-[${theme.colors.secondary.main}] text-white hover:bg-[${theme.colors.secondary.dark}] ${focusStyles} focus:ring-[${theme.colors.secondary.light}]`,
      success: `bg-[${theme.colors.success.main}] text-white hover:bg-[${theme.colors.success.dark}] ${focusStyles} focus:ring-[${theme.colors.success.light}]`,
      error: `bg-[${theme.colors.error.main}] text-white hover:bg-[${theme.colors.error.dark}] ${focusStyles} focus:ring-[${theme.colors.error.light}]`,
      warning: `bg-[${theme.colors.warning.main}] text-white hover:bg-[${theme.colors.warning.dark}] ${focusStyles} focus:ring-[${theme.colors.warning.light}]`,
      info: `bg-[${theme.colors.info.main}] text-white hover:bg-[${theme.colors.info.dark}] ${focusStyles} focus:ring-[${theme.colors.info.light}]`,
      outline: `border-2 border-[${theme.colors.primary.main}] text-[${theme.colors.primary.main}] bg-transparent hover:bg-[${theme.colors.primary.main}] hover:text-white`,
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    };

    const sizeStyles = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 gap-2',
      lg: 'h-12 px-6 text-lg gap-2.5',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          disabledStyles,
          'shadow-sm hover:shadow-md',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          <>
            {icon && <span className="inline-block">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };