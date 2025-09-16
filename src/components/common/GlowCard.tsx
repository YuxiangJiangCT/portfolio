import { ReactNode, CSSProperties, useState } from 'react';

type GlowIntensity = 'subtle' | 'medium' | 'strong' | 'intense';
type GlowColor = 'primary' | 'accent' | 'secondary' | 'custom';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowIntensity?: GlowIntensity;
  glowColor?: GlowColor;
  customGlowColor?: string;
  borderGradient?: boolean;
  interactive?: boolean;
  performanceStyle?: boolean;
  onClick?: () => void;
  as?: keyof JSX.IntrinsicElements;
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowIntensity = 'medium',
  glowColor = 'primary',
  customGlowColor,
  borderGradient = true,
  interactive = true,
  performanceStyle = false,
  onClick,
  as: Component = 'div'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const glowColorMap = {
    primary: 'rgba(79, 70, 229, 0.4)',
    accent: 'rgba(16, 185, 129, 0.4)',
    secondary: 'rgba(139, 92, 246, 0.4)',
    custom: customGlowColor || 'rgba(79, 70, 229, 0.4)'
  };

  const glowIntensityMap = {
    subtle: {
      blur: '10px',
      spread: '0px',
      opacity: 0.3
    },
    medium: {
      blur: '20px',
      spread: '0px',
      opacity: 0.4
    },
    strong: {
      blur: '30px',
      spread: '5px',
      opacity: 0.5
    },
    intense: {
      blur: '40px',
      spread: '10px',
      opacity: 0.6
    }
  };

  const intensity = glowIntensityMap[glowIntensity];
  const color = glowColorMap[glowColor];

  const cardStyle: CSSProperties = {
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered && interactive ? 'translateY(-2px) scale(1.01)' : 'none',
  };

  const glowStyle: CSSProperties = {
    position: 'absolute',
    inset: '-2px',
    borderRadius: 'inherit',
    background: borderGradient
      ? glowColor === 'primary'
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : glowColor === 'accent'
        ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
        : glowColor === 'secondary'
        ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
        : customGlowColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'transparent',
    opacity: isHovered ? 1 : 0.5,
    filter: `blur(${intensity.blur})`,
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
    zIndex: -1
  };

  const borderStyle: CSSProperties = borderGradient ? {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    padding: '2px',
    background: glowColor === 'primary'
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : glowColor === 'accent'
      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
      : glowColor === 'secondary'
      ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
      : customGlowColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: isHovered ? 1 : 0.7,
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  } as CSSProperties : {};

  const performanceOverlayStyle: CSSProperties = performanceStyle ? {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(79, 70, 229, 0.03) 2px, rgba(79, 70, 229, 0.03) 4px)',
    pointerEvents: 'none',
    opacity: isHovered ? 0.5 : 0.3,
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  } : {};

  const combinedClassName = `
    relative
    bg-light-card dark:bg-dark-card
    rounded-lg
    overflow-hidden
    ${interactive ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  const contentClassName = `
    relative
    z-10
    bg-light-card dark:bg-dark-card
    rounded-lg
    ${borderGradient ? 'm-[2px]' : ''}
  `.trim();

  return (
    <Component
      className={combinedClassName}
      style={cardStyle}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onClick={onClick}
    >
      {/* Glow Effect */}
      <div style={glowStyle} />

      {/* Border Gradient */}
      {borderGradient && <div style={borderStyle} />}

      {/* Performance Style Overlay */}
      {performanceStyle && <div style={performanceOverlayStyle} />}

      {/* Performance Monitoring Grid (optional) */}
      {performanceStyle && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(${color} 1px, transparent 1px),
              linear-gradient(90deg, ${color} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Content */}
      <div className={contentClassName}>
        {children}
      </div>

      {/* Corner Indicators for Performance Style */}
      {performanceStyle && isHovered && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-light-primary dark:border-dark-primary animate-pulse" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-light-primary dark:border-dark-primary animate-pulse" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-light-primary dark:border-dark-primary animate-pulse" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-light-primary dark:border-dark-primary animate-pulse" />
        </>
      )}
    </Component>
  );
};

export default GlowCard;