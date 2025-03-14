import { useRef, useState } from "react";

export default function Tilt3DImage({ src, alt, className }: any) {
    const [transform, setTransform] = useState('');
    const [isHovering, setIsHovering] = useState(false);
    const cardRef = useRef(null);
    
    // Maximum tilt rotation in degrees
    const maxTilt = 15;
    
    const handleMouseEnter = () => {
      setIsHovering(true);
      // Apply initial float effect
      setTransform('translateZ(20px) scale(1.02)');
    };
    
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      // Get card dimensions and position
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the card center
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation values based on mouse position
      // Inversed: When mouse is on the right, rotateY is positive (pushes right side up)
      // Inversed: When mouse is on the bottom, rotateX is negative (pushes bottom up)
      const rotateX = ((mouseY - centerY) / centerY) * -maxTilt;
      const rotateY = ((mouseX - centerX) / centerX) * maxTilt;
      
      // Apply the 3D transform with perspective
      setTransform(`
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(20px) 
        scale(1.02)
      `);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      setTransform('');
    };
  
    return (
      <div className="relative">
        <div
          ref={cardRef}
          className={`
            w-full h-full rounded-lg shadow-xl overflow-hidden
            transition-all duration-200 ease-out
            ${isHovering ? 'shadow-2xl' : ''}
          `}
          style={{ 
            transform,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={src || "/api/placeholder/400/400"}
            alt={alt || "Interactive image"}
            className={`w-full h-full object-cover ${className || ""}`}
          />
        </div>
      </div>
    );
  };