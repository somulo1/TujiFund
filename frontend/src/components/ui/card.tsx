import { cn } from '../../lib/utils';
import { theme } from '../../styles/theme';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Card({ 
  className, 
  variant = 'default', 
  padding = 'md',
  children,
  ...props 
}: CardProps) {
  const baseStyles = 'rounded-lg transition-shadow duration-200';
  
  const variantStyles = {
    default: `bg-white`,
    outlined: `bg-white border border-[${theme.colors.divider}]`,
    elevated: `bg-white shadow-md hover:shadow-lg`,
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ 
  className, 
  title, 
  subtitle, 
  action,
  ...props 
}: CardHeaderProps) {
  return (
    <div className={cn('flex justify-between items-start mb-4', className)} {...props}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="ml-4">{action}</div>
      )}
    </div>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ 
  className, 
  children,
  ...props 
}: CardContentProps) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  divider?: boolean;
}

export function CardFooter({ 
  className, 
  children,
  divider = true,
  ...props 
}: CardFooterProps) {
  return (
    <div 
      className={cn(
        'mt-4 pt-4',
        divider && `border-t border-[${theme.colors.divider}]`,
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
