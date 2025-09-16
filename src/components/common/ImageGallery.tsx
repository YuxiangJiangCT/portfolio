import { useState, useEffect, useCallback, TouchEvent } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid
} from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
  initialIndex?: number;
  showThumbnails?: boolean;
  enableZoom?: boolean;
  enableFullscreen?: boolean;
  enableKeyboardNavigation?: boolean;
  enableSwipeGestures?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  onImageChange?: (index: number) => void;
  imageDescriptions?: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  alt = 'Gallery image',
  initialIndex = 0,
  showThumbnails = true,
  enableZoom = true,
  enableFullscreen = true,
  enableKeyboardNavigation = true,
  enableSwipeGestures = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  className = '',
  onImageChange,
  imageDescriptions = []
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showThumbnailGrid, setShowThumbnailGrid] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Handle keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isFullscreen, enableKeyboardNavigation]);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay || isFullscreen) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, isFullscreen]);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setZoomLevel(1);
    onImageChange?.(newIndex);
  }, [currentIndex, images.length, onImageChange]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setZoomLevel(1);
    onImageChange?.(newIndex);
  }, [currentIndex, images.length, onImageChange]);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setZoomLevel(1);
    setShowThumbnailGrid(false);
    onImageChange?.(index);
  };

  // Touch handlers for swipe gestures
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Pan gesture handler for desktop
  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 50) {
      if (info.offset.x > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setZoomLevel(1);
    }
  };

  return (
    <>
      <div className={`relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        {/* Main Image Container */}
        <div
          className="relative aspect-video"
          onTouchStart={enableSwipeGestures ? onTouchStart : undefined}
          onTouchMove={enableSwipeGestures ? onTouchMove : undefined}
          onTouchEnd={enableSwipeGestures ? onTouchEnd : undefined}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              drag={enableSwipeGestures && zoomLevel === 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handlePan}
              style={{
                scale: zoomLevel,
                cursor: zoomLevel > 1 ? 'move' : 'default'
              }}
            >
              <OptimizedImage
                src={images[currentIndex]}
                alt={`${alt} ${currentIndex + 1}`}
                className="w-full h-full"
                objectFit="contain"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full
                  hover:bg-black/70 transition-colors backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full
                  hover:bg-black/70 transition-colors backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Image Counter */}
                <span className="text-white text-sm font-medium">
                  {currentIndex + 1} / {images.length}
                </span>

                {/* Description */}
                {imageDescriptions[currentIndex] && (
                  <span className="text-white/80 text-sm ml-4">
                    {imageDescriptions[currentIndex]}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                {enableZoom && (
                  <>
                    <button
                      onClick={handleZoomOut}
                      className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                      aria-label="Zoom out"
                      disabled={zoomLevel <= 1}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-white text-sm min-w-[3rem] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                      aria-label="Zoom in"
                      disabled={zoomLevel >= 3}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Thumbnail Grid Toggle */}
                {showThumbnails && images.length > 1 && (
                  <button
                    onClick={() => setShowThumbnailGrid(!showThumbnailGrid)}
                    className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                    aria-label="Toggle thumbnails"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                )}

                {/* Fullscreen Button */}
                {enableFullscreen && (
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {showThumbnails && !showThumbnailGrid && images.length > 1 && (
          <div className="p-2 bg-gray-200 dark:bg-gray-800">
            <div className="flex gap-2 overflow-x-auto scrollbar-thin">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    index === currentIndex
                      ? 'ring-2 ring-blue-500 scale-105'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <OptimizedImage
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-14"
                    objectFit="cover"
                    responsiveSizes={[150]}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Grid Overlay */}
      <AnimatePresence>
        {showThumbnailGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 overflow-auto"
          >
            <div className="container mx-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-semibold">
                  Select an image
                </h3>
                <button
                  onClick={() => setShowThumbnailGrid(false)}
                  className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => goToImage(index)}
                    className={`rounded-lg overflow-hidden transition-all ${
                      index === currentIndex
                        ? 'ring-2 ring-blue-500 scale-105'
                        : 'hover:scale-105'
                    }`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full aspect-square"
                      objectFit="cover"
                      responsiveSizes={[300]}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
          >
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <ImageGallery
              {...{
                images,
                alt,
                initialIndex: currentIndex,
                showThumbnails: false,
                enableZoom,
                enableFullscreen: false,
                enableKeyboardNavigation,
                enableSwipeGestures,
                autoPlay: false,
                className: 'h-screen',
                onImageChange,
                imageDescriptions
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;