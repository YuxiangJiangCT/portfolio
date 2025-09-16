import { useState, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageOff, RefreshCw } from 'lucide-react';
import { useImageLazyLoad } from '../../hooks/useIntersectionObserver';
import { useImageOptimization, generateSrcSet, generateSizes } from '../../hooks/useImageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  webpSrc?: string;
  srcSet?: string;
  sizes?: string;
  responsiveSizes?: number[];
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  placeholder,
  webpSrc,
  srcSet,
  sizes,
  responsiveSizes = [768, 1024, 1920],
  loading = 'lazy',
  priority = false,
  onLoad,
  onError,
  fallbackSrc = '/images/placeholder.png',
  showSkeleton = true,
  aspectRatio = '16/9',
  objectFit = 'cover'
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate responsive image sources if not provided
  const generatedSrcSet = srcSet || (responsiveSizes.length > 0
    ? generateSrcSet(src, responsiveSizes, src.endsWith('.webp') ? 'webp' : 'jpg')
    : undefined);

  const generatedSizes = sizes || generateSizes([
    { maxWidth: 768, size: '100vw' },
    { maxWidth: 1024, size: '50vw' },
    { maxWidth: 1920, size: '33vw' }
  ]);

  const { ref, isVisible, isLoaded, isError } = useImageLazyLoad(
    priority ? src : undefined,
    {
      triggerOnce: true,
      rootMargin: '50px',
      enabled: !priority
    }
  );

  const {
    currentSrc,
    isLoading,
    hasWebPSupport,
    loadImage,
    retryLoad
  } = useImageOptimization({
    src,
    placeholder,
    srcSet: generatedSrcSet,
    sizes: generatedSizes,
    webpSrc,
    onLoad: () => {
      setIsImageLoaded(true);
      onLoad?.();
    },
    onError: () => {
      setHasError(true);
      onError?.();
    }
  });

  // Load image when visible or if priority
  useEffect(() => {
    if (priority || isVisible) {
      loadImage();
    }
  }, [isVisible, priority]);

  // Update image source based on loading state
  useEffect(() => {
    if (hasError && fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else if (isImageLoaded) {
      setImageSrc(currentSrc);
    } else if (placeholder) {
      setImageSrc(placeholder);
    }
  }, [isImageLoaded, hasError, currentSrc, placeholder, fallbackSrc]);

  const handleRetry = () => {
    setHasError(false);
    setIsImageLoaded(false);
    retryLoad();
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio,
        ...style
      }}
    >
      {/* Skeleton loader */}
      <AnimatePresence>
        {showSkeleton && isLoading && !isImageLoaded && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blur placeholder */}
      {placeholder && !isImageLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full filter blur-xl scale-110"
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <AnimatePresence>
        {!hasError ? (
          <motion.picture
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {/* WebP source */}
            {hasWebPSupport && webpSrc && (
              <source
                type="image/webp"
                srcSet={webpSrc}
                sizes={generatedSizes}
              />
            )}

            {/* Original format source with srcSet */}
            {generatedSrcSet && (
              <source
                srcSet={generatedSrcSet}
                sizes={generatedSizes}
              />
            )}

            {/* Fallback img element */}
            <img
              ref={ref as React.RefObject<HTMLImageElement>}
              src={imageSrc || src}
              alt={alt}
              loading={priority ? 'eager' : loading}
              className={`w-full h-full ${className}`}
              style={{ objectFit }}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setHasError(true)}
            />
          </motion.picture>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800"
          >
            <ImageOff className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Failed to load image
            </p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      {isLoading && !isImageLoaded && !hasError && !showSkeleton && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// Variant for avatar images
export const OptimizedAvatar: React.FC<
  OptimizedImageProps & { size?: 'sm' | 'md' | 'lg' | 'xl' }
> = ({ size = 'md', className = '', ...props }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <OptimizedImage
      {...props}
      className={`rounded-full ${sizeClasses[size]} ${className}`}
      aspectRatio="1/1"
      objectFit="cover"
    />
  );
};

// Variant for thumbnail images
export const OptimizedThumbnail: React.FC<OptimizedImageProps> = ({
  className = '',
  ...props
}) => {
  return (
    <OptimizedImage
      {...props}
      className={`rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}
      aspectRatio="4/3"
      objectFit="cover"
      responsiveSizes={[150, 300]}
    />
  );
};

export default OptimizedImage;