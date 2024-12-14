import { cn } from '../../lib/utils';
import { theme } from '../../styles/theme';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'textPrimary' | 'textSecondary';
  align?: 'left' | 'center' | 'right';
  gutterBottom?: boolean;
  noWrap?: boolean;
  children: React.ReactNode;
}

const defaultComponent: Record<TypographyProps['variant'], TypographyProps['component']> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span'
} as const;

export function Typography({
  className,
  variant = 'body1',
  component,
  color = 'textPrimary',
  align = 'left',
  gutterBottom = false,
  noWrap = false,
  children,
  ...props
}: TypographyProps) {
  const Component = component || defaultComponent[variant];

  const variantStyles = {
    h1: 'text-4xl font-bold leading-tight',
    h2: 'text-3xl font-bold leading-tight',
    h3: 'text-2xl font-bold leading-tight',
    h4: 'text-xl font-bold leading-snug',
    h5: 'text-lg font-bold leading-snug',
    h6: 'text-base font-bold leading-snug',
    subtitle1: 'text-lg font-medium leading-normal',
    subtitle2: 'text-base font-medium leading-normal',
    body1: 'text-base leading-relaxed',
    body2: 'text-sm leading-relaxed',
    caption: 'text-sm leading-normal',
    overline: 'text-xs uppercase tracking-wider font-medium',
  };

  const colorStyles = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <Component
      className={cn(
        variantStyles[variant],
        colorStyles[color],
        alignStyles[align],
        gutterBottom && 'mb-4',
        noWrap && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
