import { cn } from '../../lib/utils';
import { forwardRef } from 'react';
import { theme } from '../../styles/theme';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    error, 
    helperText, 
    startIcon, 
    endIcon, 
    fullWidth = false,
    size,
    type = 'text',
    disabled,
    label,
    ...props 
  }, ref) => {
    const baseStyles = 'rounded-md border transition-colors duration-200';
    const focusStyles = 'focus:outline-none focus:ring-2 focus:ring-offset-0';
    const errorStyles = error 
      ? `border-[${theme.colors.error.main}] focus:border-[${theme.colors.error.main}] focus:ring-[${theme.colors.error.light}]` 
      : `border-gray-300 focus:border-[${theme.colors.primary.main}] focus:ring-[${theme.colors.primary.light}]`;
    
    const sizeStyles = {
      sm: 'h-8 text-sm',
      md: 'h-10',
      lg: 'h-12 text-lg',
    };

    const paddingStyles = {
      sm: startIcon ? 'pl-8 pr-3' : endIcon ? 'pl-3 pr-8' : 'px-3',
      md: startIcon ? 'pl-10 pr-4' : endIcon ? 'pl-4 pr-10' : 'px-4',
      lg: startIcon ? 'pl-12 pr-4' : endIcon ? 'pl-4 pr-12' : 'px-4',
    };

    const iconSizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const iconPositionStyles = {
      sm: 'left-2',
      md: 'left-3',
      lg: 'left-4',
    };

    type SizeKeys = 'sm' | 'md' | 'lg';
    const sizeValue = (size as SizeKeys) || 'md'; // Default to 'md' if size is undefined

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && <label className="block mb-2 text-sm text-gray-700">{label}</label>}
        {startIcon && (
          <div 
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-gray-400',
              iconPositionStyles[sizeValue]
            )}
          >
            {typeof startIcon === 'string' ? (
              <span className={iconSizeStyles[sizeValue]}>{startIcon}</span>
            ) : (
              startIcon
            )}
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            baseStyles,
            focusStyles,
            errorStyles,
            sizeStyles[sizeValue],
            paddingStyles[sizeValue],
            fullWidth && 'w-full',
            disabled && 'bg-gray-100 cursor-not-allowed',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />

        {endIcon && (
          <div 
            className={cn(
              'absolute top-1/2 -translate-y-1/2 right-3 text-gray-400',
              iconPositionStyles[sizeValue]
            )}
          >
            {typeof endIcon === 'string' ? (
              <span className={iconSizeStyles[sizeValue]}>{endIcon}</span>
            ) : (
              endIcon
            )}
          </div>
        )}

        {helperText && (
          <p 
            className={cn(
              'mt-1 text-sm',
              error ? `text-[${theme.colors.error.main}]` : 'text-gray-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
