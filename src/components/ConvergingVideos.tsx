import React, { useEffect, useRef, useState } from 'react';
import './ConvergingVideos.css';

const ConvergingVideos: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [viewportProgress, setViewportProgress] = useState(0);

  const videos = [
    '/v1.mp4',
    '/v2.mp4',
    '/v3.mp4',
    '/v4.mp4',
    '/v2.mp4',
    '/v3.mp4'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the section is through the viewport
      // 0 = just entered viewport at bottom
      // 0.5 = middle of viewport
      // 1 = about to exit viewport at top
      const progress = 1 - (rect.bottom / (viewportHeight + rect.height));
      setViewportProgress(Math.max(0, Math.min(1, progress)));
      
      const videoWrappers = containerRef.current.querySelectorAll('.video-wrapper');
      
      videoWrappers.forEach((wrapper, index) => {
        const element = wrapper as HTMLElement;
        
        // Calculate position based on viewport progress
        const startDelay = index * 0.1; // Stagger the start of each video's animation
        const adjustedProgress = Math.max(0, Math.min(1, (progress - startDelay) * 1.2));
        
        // Initial spread position
        const spreadX = index < 3 ? -150 + (index * 75) : -75 + ((index - 3) * 75);
        const spreadY = index % 2 === 0 ? -200 : -150;
        
        // Final converged position
        const finalX = index < 3 ? -30 + (index * 30) : -30 + ((index - 3) * 30);
        const finalY = adjustedProgress * 100;
        const finalZ = 100 - Math.abs(index - 2.5) * 20; // Middle videos come more forward
        
        // Interpolate between spread and converged positions
        const currentX = spreadX + (finalX - spreadX) * adjustedProgress;
        const currentY = spreadY + (finalY - spreadY) * adjustedProgress;
        const currentZ = finalZ * adjustedProgress;
        const scale = 1 - (adjustedProgress * 0.2);
        const opacity = 1 - (adjustedProgress * 0.5);
        
        // Apply the transform
        element.style.transform = `
          translateX(${currentX}%) 
          translateY(${currentY}%) 
          translateZ(${currentZ}px) 
          rotateY(${(index - 2.5) * 10 * (1 - adjustedProgress)}deg)
          scale(${scale})
        `;
        element.style.opacity = opacity.toString();
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return (
    <div className="converging-videos-section">
      <div 
        className={`converging-videos-container ${isVisible ? 'is-visible' : ''}`} 
        ref={containerRef}
        style={{
          '--viewport-progress': viewportProgress
        } as React.CSSProperties}
      >
        {videos.map((video, index) => (
          <div 
            key={index} 
            className="video-wrapper"
            style={{ '--index': index } as React.CSSProperties}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="converging-video"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConvergingVideos;