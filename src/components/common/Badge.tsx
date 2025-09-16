import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'performance' | 'gradient';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: LucideIcon;
  pulse?: boolean;
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  pulse = false,
  rounded = false,
  className = '',
  onClick,
  interactive = false
}) => {
  const variantStyles = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-700',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-700',
    performance: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700',
    gradient: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-400 border-purple-300 dark:border-purple-700'
  };

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-xs gap-1',
    sm: 'px-2.5 py-1 text-sm gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const pulseColors = {
    default: 'bg-gray-400',
    success: 'bg-green-400',
    warning: 'bg-amber-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    performance: 'bg-emerald-400',
    gradient: 'bg-purple-400'
  };

  const combinedClassName = `
    inline-flex items-center font-medium
    border transition-all duration-200
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${rounded ? 'rounded-full' : 'rounded-md'}
    ${interactive ? 'cursor-pointer hover:scale-105 hover:shadow-md active:scale-95' : ''}
    ${className}
  `.trim();

  return (
    <span
      className={`relative ${combinedClassName}`}
      onClick={onClick}
    >
      {pulse && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseColors[variant]} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${pulseColors[variant]}`}></span>
        </span>
      )}

      {Icon && (
        <Icon className={iconSizes[size]} />
      )}

      {children}

      {variant === 'gradient' && (
        <span
          className="absolute inset-0 rounded-inherit opacity-0 hover:opacity-20 transition-opacity duration-200"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 'inherit',
            pointerEvents: 'none'
          }}
        />
      )}
    </span>
  );
};

export default Badge;