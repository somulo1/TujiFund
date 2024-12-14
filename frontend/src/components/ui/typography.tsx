import { cn } from '../../lib/utils';
import { theme } from '../../styles/theme';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'textPrimary' | 'textSecondary';
  align?: 'left' | 'center' | 'right';
  gutterBottom?: boolean;
  noWrap?: boolean;
  children: React.ReactNode;
}

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
    body1: 'text-base leading-relaxed',
    body2: 'text-sm leading-relaxed',
    caption: 'text-sm leading-normal',
    overline: 'text-xs uppercase tracking-wider font-medium',
  };

  const colorStyles = {
    primary: `text-[${theme.colors.primary.main}]`,
    secondary: `text-[${theme.colors.secondary.main}]`,
    success: `text-[${theme.colors.success.main}]`,
    error: `text-[${theme.colors.error.main}]`,
    warning: `text-[${theme.colors.warning.main}]`,
    info: `text-[${theme.colors.info.main}]`,
    textPrimary: `text-[${theme.colors.text.primary}]`,
    textSecondary: `text-[${theme.colors.text.secondary}]`,
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
        gutterBottom && 'mb-2',
        noWrap && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

const defaultComponent: Record<TypographyProps['variant'], TypographyProps['component']> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};
