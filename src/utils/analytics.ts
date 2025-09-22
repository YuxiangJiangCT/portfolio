import ReactGA from 'react-ga4';

// Get GA Measurement ID from environment variable
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

export const initGA = () => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log('Google Analytics initialized');
  } else {
    console.warn('Google Analytics Measurement ID not configured');
  }
};

export const logPageView = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname + window.location.hash,
    title: document.title
  });
};

export const logEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track section views when user scrolls to different sections
export const logSectionView = (sectionName: string) => {
  logEvent('Section', 'View', sectionName);
};

// Track project interactions
export const logProjectClick = (projectName: string) => {
  logEvent('Project', 'Click', projectName);
};

// Track external link clicks
export const logExternalLink = (linkType: string, url: string) => {
  logEvent('External Link', linkType, url);
};

// Track resume download
export const logResumeDownload = () => {
  logEvent('Resume', 'Download');
};

export const logException = (description: string, fatal: boolean = false) => {
  ReactGA.gtag('event', 'exception', {
    description,
    fatal,
  });
};