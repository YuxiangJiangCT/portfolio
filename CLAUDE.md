# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite portfolio website deployed to GitHub Pages. The project showcases a personal portfolio with project listings and interactive components.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM (using HashRouter for GitHub Pages compatibility)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React and React Icons
- **Deployment**: GitHub Pages via gh-pages package

### Project Structure
- `/src/main.tsx` - Application entry point with routing configuration
- `/src/App.tsx` - Main portfolio page with hero section, skills, and personal information
- `/src/pages/Projects.tsx` - Projects listing page with detailed project cards
- `/src/components/ProjectsModal.tsx` - Modal component for project details
- `/index.html` - HTML entry point
- `/vite.config.ts` - Vite configuration with base path set to `/portfolio/` for GitHub Pages

### Key Configuration Details
- **Base URL**: Configured as `/portfolio/` in vite.config.ts for GitHub Pages deployment
- **Routing**: Uses HashRouter to ensure proper routing on GitHub Pages
- **TypeScript**: Strict mode enabled with no unused locals/parameters checks
- **Build Output**: Outputs to `/dist` directory

### Important Notes
- The project uses HashRouter instead of BrowserRouter to work correctly with GitHub Pages
- Images should reference `import.meta.env.BASE_URL` for proper path resolution
- The homepage field in package.json must match the GitHub Pages URL structure