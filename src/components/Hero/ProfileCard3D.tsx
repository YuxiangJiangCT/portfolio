import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation values (max 8 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
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
        className="profile-card"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => {
          setIsFlipped(false);
          handleMouseLeave();
        }}
        onMouseMove={handleMouseMove}
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
          ease: 'easeInOut'
        }}
      >
        {/* Front of card */}
        <div className="card-face card-front">
          <div className="card-glow" />
          <div className="card-content">
            {/* Avatar with subtle border */}
            <div className="avatar-container">
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
              <div className="skill-chips">
                {coreStack.map((tech, index) => (
                  <div key={index} className="skill-chip">
                    {tech.icon}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
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