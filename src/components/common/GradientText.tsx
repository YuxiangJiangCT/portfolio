import { ReactNode, CSSProperties } from 'react';

type GradientPreset =
  | 'primary'
  | 'performance'
  | 'tech'
  | 'glow'
  | 'heatmap'
  | 'custom';

type AnimationType = 'none' | 'shimmer' | 'glow' | 'gradient-shift';

interface GradientTextProps {
  children: ReactNode;
  gradient?: GradientPreset;
  customGradient?: string;
  className?: string;
  animation?: AnimationType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  as?: keyof JSX.IntrinsicElements;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  gradient = 'primary',
  customGradient,
  className = '',
  animation = 'none',
  size = 'md',
  weight = 'bold',
  as: Component = 'span'
}) => {
  const gradientMap: Record<GradientPreset, string> = {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    performance: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    tech: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
    glow: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    heatmap: 'linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)',
    custom: customGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };

  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  };

  const weightMap = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  };

  const animationClasses = {
    none: '',
    shimmer: 'animate-shimmer-text',
    glow: 'animate-glow-text',
    'gradient-shift': 'animate-gradient-shift'
  };

  const style: CSSProperties = {
    background: gradient === 'custom' ? customGradient : gradientMap[gradient],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: animation === 'gradient-shift' ? '200% 200%' : 'auto',
    display: 'inline-block',
    position: 'relative' as const
  };

  const combinedClassName = `
    ${sizeMap[size]}
    ${weightMap[weight]}
    ${animationClasses[animation]}
    ${className}
    ${animation === 'glow' ? 'gradient-text-glow' : ''}
  `.trim();

  return (
    <Component className={combinedClassName} style={style}>
      {children}
      {animation === 'shimmer' && (
        <span
          className="absolute inset-0 animate-shimmer"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            pointerEvents: 'none'
          }}
        >
          {children}
        </span>
      )}
    </Component>
  );
};

export default GradientText;