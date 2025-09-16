import { useState, useEffect, useRef } from 'react';

interface ImageSource {
  src: string;
  type?: string;
  media?: string;
}

interface UseImageOptimizationOptions {
  src: string;
  placeholder?: string;
  srcSet?: string;
  sizes?: string;
  webpSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  generateBlurPlaceholder?: boolean;
}

interface ImageOptimizationState {
  currentSrc: string;
  isLoading: boolean;
  isError: boolean;
  hasWebPSupport: boolean;
  placeholder: string;
  sources: ImageSource[];
}

// Cache for WebP support detection
let webpSupportCache: boolean | null = null;

// Check WebP support
const checkWebPSupport = (): Promise<boolean> => {
  if (webpSupportCache !== null) {
    return Promise.resolve(webpSupportCache);
  }

  return new Promise(resolve => {
    const webp = new Image();
    webp.onload = webp.onerror = () => {
      webpSupportCache = webp.height === 2;
      resolve(webpSupportCache);
    };
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Generate blur data URL from canvas
const generateBlurDataURL = (img: HTMLImageElement, quality = 10): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // Set canvas size to small dimensions for blur
  const aspectRatio = img.width / img.height;
  canvas.width = quality;
  canvas.height = Math.round(quality / aspectRatio);

  // Draw and blur the image
  ctx.filter = 'blur(5px)';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/jpeg', 0.3);
};

export const useImageOptimization = (
  options: UseImageOptimizationOptions
): ImageOptimizationState & {
  loadImage: () => void;
  retryLoad: () => void;
} => {
  const {
    src,
    placeholder = '',
    srcSet,
    sizes,
    webpSrc,
    onLoad,
    onError,
    generateBlurPlaceholder = false
  } = options;

  const [state, setState] = useState<ImageOptimizationState>({
    currentSrc: placeholder || src,
    isLoading: true,
    isError: false,
    hasWebPSupport: false,
    placeholder: placeholder || '',
    sources: []
  });

  const imageRef = useRef<HTMLImageElement | null>(null);

  // Check WebP support on mount
  useEffect(() => {
    checkWebPSupport().then(supported => {
      setState(prev => ({ ...prev, hasWebPSupport: supported }));
    });
  }, []);

  // Generate blur placeholder if requested
  useEffect(() => {
    if (!generateBlurPlaceholder || !src || placeholder) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const blurDataURL = generateBlurDataURL(img);
      setState(prev => ({
        ...prev,
        placeholder: blurDataURL,
        currentSrc: prev.isLoading ? blurDataURL : prev.currentSrc
      }));
    };

    img.src = src;
  }, [src, generateBlurPlaceholder, placeholder]);

  // Build sources array based on available options
  useEffect(() => {
    const sources: ImageSource[] = [];

    // Add WebP source if supported and available
    if (state.hasWebPSupport && webpSrc) {
      sources.push({
        src: webpSrc,
        type: 'image/webp'
      });
    }

    // Add responsive sources if srcSet is provided
    if (srcSet) {
      const srcSetParts = srcSet.split(',').map(s => s.trim());
      srcSetParts.forEach(part => {
        const [url, descriptor] = part.split(' ');
        if (descriptor && descriptor.includes('w')) {
          const width = parseInt(descriptor.replace('w', ''));
          sources.push({
            src: url,
            media: `(max-width: ${width}px)`
          });
        }
      });
    }

    setState(prev => ({ ...prev, sources }));
  }, [state.hasWebPSupport, webpSrc, srcSet]);

  const loadImage = () => {
    if (imageRef.current) return;

    const img = new Image();
    imageRef.current = img;

    img.onload = () => {
      setState(prev => ({
        ...prev,
        currentSrc: img.src,
        isLoading: false,
        isError: false
      }));
      onLoad?.();
    };

    img.onerror = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isError: true
      }));
      onError?.();
    };

    // Load the appropriate source
    const finalSrc = state.hasWebPSupport && webpSrc ? webpSrc : src;
    img.src = finalSrc;

    if (srcSet) {
      img.srcset = srcSet;
    }

    if (sizes) {
      img.sizes = sizes;
    }
  };

  const retryLoad = () => {
    imageRef.current = null;
    setState(prev => ({
      ...prev,
      isLoading: true,
      isError: false,
      currentSrc: prev.placeholder || src
    }));
    loadImage();
  };

  return {
    ...state,
    loadImage,
    retryLoad
  };
};

// Utility to generate srcSet string from image sizes
export const generateSrcSet = (
  basePath: string,
  sizes: number[],
  format: 'webp' | 'png' | 'jpg' = 'jpg'
): string => {
  return sizes
    .map(size => {
      const path = basePath.replace(/\.(png|jpg|jpeg|webp)$/i, `-${size}w.${format}`);
      return `${path} ${size}w`;
    })
    .join(', ');
};

// Utility to generate sizes attribute for responsive images
export const generateSizes = (breakpoints: { maxWidth: number; size: string }[]): string => {
  return breakpoints
    .map(({ maxWidth, size }) => `(max-width: ${maxWidth}px) ${size}`)
    .join(', ');
};