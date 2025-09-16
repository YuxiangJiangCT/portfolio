import { Linkedin, Github, FileText, MapPin, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import EducationSection from '../Education/EducationSection';
import TypewriterEffect from '../animations/TypewriterEffect';

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-primary/5 via-transparent to-light-accent/5 dark:from-dark-primary/10 dark:to-dark-accent/10" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-light-primary/10 dark:bg-dark-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-light-accent/10 dark:bg-dark-accent/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto relative z-10 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Personal Info */}
          <motion.div variants={itemVariants}>
            <div className="text-center lg:text-left">
              {/* Name with gradient */}
              <motion.h1
                className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {profileData.name.split('(')[0]}
              </motion.h1>

              {/* Title with typewriter effect */}
              <motion.div
                className="text-2xl lg:text-3xl text-light-text-secondary dark:text-dark-text-secondary mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TypewriterEffect
                  text={profileData.title}
                  speed={50}
                  delay={500}
                  cursor={true}
                />
              </motion.div>

              {/* Location and details */}
              <motion.div
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 text-light-text-secondary dark:text-dark-text-secondary"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Available for opportunities</span>
                </div>
              </motion.div>

              {/* Brief introduction */}
              <motion.p
                className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-xl mx-auto lg:mx-0"
                variants={itemVariants}
              >
                Passionate about building scalable systems and solving complex technical challenges.
                Currently pursuing M.S. in Computer Science at Cornell Tech.
              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex items-center justify-center lg:justify-start gap-4"
                variants={itemVariants}
              >
                <motion.a
                  href={profileData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </motion.a>

                <motion.a
                  href={profileData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors" />
                  <span className="text-sm font-medium">GitHub</span>
                </motion.a>

                <motion.a
                  href={profileData.social.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-sm font-medium">Resume</span>
                </motion.a>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-light-border dark:border-dark-border"
                variants={itemVariants}
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">1+</div>
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">3+</div>
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Projects</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-light-primary dark:text-dark-primary">10+</div>
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Technologies</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Profile Picture and Education */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Profile Picture with clean design */}
            <motion.div
              className="relative mx-auto w-48 h-48 lg:w-64 lg:h-64"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 200
              }}
            >
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent p-1"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-full rounded-full bg-light-bg dark:bg-dark-bg p-1">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Education Section */}
            <EducationSection embedded={true} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;