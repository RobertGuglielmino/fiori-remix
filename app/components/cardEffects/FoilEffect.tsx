import React, { useState, useEffect, useRef } from 'react';

export default function FoilCardEffect({ 
    children, 
    imageUrl = "/api/placeholder/400/560",
    borderRadius = "rounded-lg", // Can be customized with Tailwind classes
    intensity = 0.6, // Controls how strong the effect is (0.2 to 0.4 is good)
    animationDuration = 4.5, // Duration of animation in seconds (faster)
    className = "" // Additional classes
  }) {
    const [animationActive, setAnimationActive] = useState(false);
    const cardRef = useRef(null);
    
    // Toggle animation on hover
    const handleMouseEnter = () => {
      setAnimationActive(true);
    };
    
    const handleMouseLeave = () => {
      setAnimationActive(false);
    };
  
    return (
      <div 
        ref={cardRef}
        className={`relative overflow-hidden ${borderRadius} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card image */}
        <div className="relative z-10">
          {children || <img src={imageUrl} alt="Trading Card" className={`w-full h-auto ${borderRadius}`} />}
        </div>
        
        {/* Diagonal shimmer effect overlay */}
        <div 
          className={`absolute inset-0 z-20 pointer-events-none ${animationActive ? 'opacity-100' : 'opacity-60'}`}
          style={{
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0) 5%,
              rgba(255, 0, 240, ${intensity * 0.2}) 10%, 
              rgba(0, 200, 255, ${intensity * 0.3}) 20%, 
              rgba(255, 255, 0, ${intensity * 0.3}) 25%, 
              rgba(255, 255, 255, ${intensity * 0.7}) 30%,
              rgba(0, 200, 255, ${intensity * 0.2}) 35%,
              rgba(255, 0, 240, ${intensity * 0.1}) 40%,
              rgba(255, 255, 255, 0) 50%,
              rgba(255, 255, 255, 0) 100%
            )`,
            backgroundSize: '400% 400%',
            animation: animationActive ? `shimmerDiagonalBounce ${animationDuration}s cubic-bezier(0.4, 0.0, 0.6, 1.0) infinite` : 'none',
            mixBlendMode: 'color-dodge',
          }}
        />
        
        {/* Subtle holographic pattern overlay */}
        <div 
          className={`absolute inset-0 z-20 pointer-events-none ${animationActive ? 'opacity-20' : 'opacity-10'}`}
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(255, 255, 255, 0.05) 0%, 
                rgba(255, 255, 255, 0.1) 40%, 
                rgba(255, 255, 255, 0.05) 60%, 
                rgba(255, 255, 255, 0) 100%)
            `,
            backgroundSize: '8px 8px',
            mixBlendMode: 'overlay',
          }}
        />
        
        <style jsx>{`
          @keyframes shimmerDiagonalBounce {
            0% {
              background-position: -100% -100%;
            }
            50% {
              background-position: 200% 200%;
            }
            100% {
              background-position: -100% -100%;
            }
          }
        `}</style>
      </div>
    );
  };
  