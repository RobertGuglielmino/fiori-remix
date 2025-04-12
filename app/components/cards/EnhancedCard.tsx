import { useState, useRef, useCallback } from 'react';

interface EnhancedCardProps {
  alt: string;
  handleCardClick: () => void;
}

export default function EnhancedCard ({ alt, handleCardClick }: EnhancedCardProps) {

  const MTG_BACK = "https://d3vjinhen5j20w.cloudfront.net/mtg_back.webp"

  const [style, setStyle] = useState({});
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const maxTilt = 15;
  
  // Debounced/throttled mouse move handler using requestAnimationFrame
  const handleMouseMove = useCallback((e: { clientX: number; clientY: number; }) => {
    if (!isHoveringRef.current || !cardRef.current) return;
    
    // Cancel any pending animation frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    // Schedule the calculation on the next animation frame
    frameRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
      
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (inversed as requested)
        const rotateX = ((mouseY - centerY) / centerY) * -maxTilt;
        const rotateY = ((mouseX - centerX) / centerX) * maxTilt;
        
        setStyle({
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        });
      }
    });
  }, []);
  
  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    setStyle({
      transform: 'translateZ(20px) scale(1.02)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    });
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setStyle({
      transform: '',
      boxShadow: '',
    });
  }, []);

  return (
    <div className="relative w-full h-full relative">
      <div
        ref={cardRef}
        className="w-full h-full rounded-lg shadow-xl overflow-hidden transition-all duration-200 ease-out"
        style={{ 
          ...style,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={MTG_BACK}
          alt={alt || "Interactive image"}
          className={`w-full h-full object-cover `}
          loading="lazy"
          onClick={() => handleCardClick()}
        />
      </div>
    </div>
  );
};