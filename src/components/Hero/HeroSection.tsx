import { Linkedin, Github, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { skillsData } from '../../data/skills';
import EducationSection from '../Education/EducationSection';
import GradientText from '../common/GradientText';
import Badge from '../common/Badge';
import { CSSFloatingParticles } from '../animations/FloatingParticles';
import FadeInWhenVisible from '../animations/FadeInWhenVisible';
import TypewriterEffect from '../animations/TypewriterEffect';
import { useMouseParallax } from '../../hooks/useAnimations';

function HeroSection() {
  const mousePosition = useMouseParallax(10);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section className="pt-40 pb-32 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <CSSFloatingParticles
        count={15}
        className="absolute inset-0"
        color="rgba(79, 70, 229, 0.05)"
        minSize={3}
        maxSize={8}
      />

      {/* Background Pattern with Parallax */}
      <motion.div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.02] dark:opacity-[0.03]"
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl font-bold mb-16 font-mono text-center"
          variants={itemVariants}
        >
          <TypewriterEffect
            text="Ryan's Portfolio"
            speed={100}
            className="inline-block"
            cursor={false}
          />
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Side - Profile Image and Personal Info */}
          <motion.div variants={itemVariants}>
            {/* Avatar with Skills */}
            <motion.div
              className="relative mx-auto w-64 h-64 mt-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background circle with animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-light-primary/20 to-light-primary/10 dark:from-dark-primary/20 dark:to-dark-primary/10 scale-110 z-0"
                animate={{
                  scale: [1.1, 1.15, 1.1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Skill badges with Framer Motion */}
              {skillsData.map((skill, index) => {
                const positions = [
                  '-top-6 left-1/2 -translate-x-1/2',
                  'top-8 -right-12',
                  'bottom-8 -right-14',
                  'bottom-8 -left-12',
                  'top-8 -left-14'
                ];
                const variants = ['gradient', 'performance', 'info', 'success', 'gradient'] as const;
                return (
                  <motion.div
                    key={skill.id}
                    className={`absolute ${positions[index]} z-20`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, 0]
                    }}
                    transition={{
                      opacity: { delay: 0.5 + index * 0.1 },
                      scale: { delay: 0.5 + index * 0.1 },
                      y: {
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <Badge
                      variant={variants[index]}
                      size="sm"
                      rounded
                      interactive
                      pulse={index === 0}
                    >
                      {skill.name}
                    </Badge>
                  </motion.div>
                );
              })}

              {/* Avatar with white border */}
              <motion.div
                className="relative z-10 w-full h-full rounded-full border-4 border-white overflow-hidden shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </motion.div>

            {/* Personal Info with animations */}
            <FadeInWhenVisible direction="up" delay={0.8}>
              <div className="text-center mt-12">
                <h2 className="text-2xl font-mono mb-3">
                  <GradientText gradient="tech" size="2xl" weight="bold">
                    {profileData.name}
                  </GradientText>
                </h2>
                <motion.p
                  className="text-light-text-secondary dark:text-dark-text-secondary text-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <TypewriterEffect
                    text={profileData.title}
                    speed={50}
                    delay={1000}
                    cursor={true}
                  />
                </motion.p>

                <motion.div
                  className="flex justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.a
                    href={profileData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-light-primary dark:hover:text-dark-primary transition-colors bg-light-card dark:bg-dark-card rounded-full"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a
                    href={profileData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-light-primary dark:hover:text-dark-primary transition-colors bg-light-card dark:bg-dark-card rounded-full"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    href={profileData.social.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-light-card dark:bg-dark-card rounded-full hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText size={20} />
                    <span className="font-medium">Resume</span>
                  </motion.a>
                </motion.div>
              </div>
            </FadeInWhenVisible>
          </motion.div>

          {/* Right Side - Education Section */}
          <motion.div variants={itemVariants}>
            <EducationSection embedded={true} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;