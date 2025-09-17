import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Cloud, TrendingUp, Cpu, GitBranch } from 'lucide-react';
import './ProfileCard3D.css';

interface ProfileCard3DProps {
  avatar: string;
  name: string;
  title: string;
}

function ProfileCard3D({ avatar, name, title }: ProfileCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate distance from center for magnetic effect
    const distanceFromCenterX = x - centerX;
    const distanceFromCenterY = y - centerY;
    const distance = Math.sqrt(distanceFromCenterX ** 2 + distanceFromCenterY ** 2);
    const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);

    // Magnetic attraction strength (stronger when closer to center)
    const magneticStrength = 1 - (distance / maxDistance);
    const maxRotation = 12; // Increased from 8 for more dramatic effect

    // Apply magnetic effect with easing
    const rotateXValue = ((distanceFromCenterY / centerY) * -maxRotation * magneticStrength);
    const rotateYValue = ((distanceFromCenterX / centerX) * maxRotation * magneticStrength);

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Keyboard support - space to flip
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && cardRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Touch gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe threshold (50px)
    if (Math.abs(diff) > 50) {
      setIsFlipped(prev => !prev);
    }

    setTouchStart(null);
  };

  // Core stack data for back of card
  const coreStack = [
    { name: 'FastAPI', icon: <Cpu className="w-3 h-3" /> },
    { name: 'Redis', icon: <Database className="w-3 h-3" /> },
    { name: 'PostgreSQL', icon: <Database className="w-3 h-3" /> },
  ];

  const focusAreas = [
    'Pool Analytics',
    'APY Forecasting',
    'Risk Modeling'
  ];

  const impact = {
    pools: '19K+',
    latency: '70% ↓',
    uptime: '99.9%'
  };

  return (
    <div className="profile-card-container">
      <motion.div
        ref={cardRef}
        className="profile-card"
        tabIndex={0}
        role="button"
        aria-label={`Profile card for ${name}. ${isFlipped ? 'Showing skills and achievements' : 'Press space or hover to flip'}`}
        aria-pressed={isFlipped}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => {
          setIsFlipped(false);
          handleMouseLeave();
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: isFlipped
            ? 'rotateY(180deg)'
            : `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
      >
        {/* Front of card */}
        <div className="card-face card-front">
          <div className="card-glow" />
          <div className="card-content">
            {/* Avatar with subtle border */}
            <div className="avatar-container matrix-trigger">
              <div className="avatar-glow" />
              <img
                src={avatar}
                alt={name}
                className="avatar"
              />
            </div>

            {/* Name and title */}
            <div className="profile-info">
              <h3 className="profile-name">{name.split('(')[0]}</h3>
              <p className="profile-title">{title}</p>
            </div>

            {/* Subtle hint to hover */}
            <div className="hover-hint">
              <span className="hover-text">hover to explore</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="card-face card-back">
          <div className="card-glow" />
          <div className="card-content back-content">
            {/* Core Stack Section */}
            <div className="section">
              <div className="section-header">
                <Code className="w-4 h-4" />
                <span>Core Stack</span>
              </div>
              <motion.div
                className="skill-chips"
                initial="hidden"
                animate={isFlipped ? "visible" : "hidden"}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3
                    }
                  }
                }}
              >
                {coreStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="skill-chip"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 20,
                        scale: 0.8
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          damping: 12,
                          stiffness: 200
                        }
                      }
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {tech.icon}
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* DeFi Focus Section */}
            <div className="section">
              <div className="section-header">
                <TrendingUp className="w-4 h-4" />
                <span>DeFi Focus</span>
              </div>
              <div className="focus-areas">
                {focusAreas.map((area, index) => (
                  <span key={index} className="focus-item">
                    {area}
                    {index < focusAreas.length - 1 && ' · '}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact Section */}
            <div className="section">
              <div className="section-header">
                <GitBranch className="w-4 h-4" />
                <span>Impact</span>
              </div>
              <div className="impact-stats">
                <div className="stat">
                  <span className="stat-value">{impact.pools}</span>
                  <span className="stat-label">Pools</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{impact.latency}</span>
                  <span className="stat-label">Latency</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{impact.uptime}</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileCard3D;