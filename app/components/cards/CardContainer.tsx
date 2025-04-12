import { useState, useEffect } from 'react';
import centsToDollars from './../../utils/centsToDollars';
import EnhancedCard from './EnhancedCard';
import RippedCard from './RippedCard';
import FlippedCard from './FlippedCard';

interface CardContainerProps {
    index: number;
    name: string;
    cents: number;
    image: string;
    cf_image: string;
    status: string;
    foil: boolean;
    rotation: number;
    maskImage: number;
    handleCardClick: () => void;
}

export default function CardContainer({ name, cents, image, cf_image, status, foil, rotation, maskImage, handleCardClick }: CardContainerProps) {
    const [maskPosition, setMaskPosition] = useState('25%_25%');
    const MTG_BACK = "https://d3vjinhen5j20w.cloudfront.net/mtg_back.webp"
    
    // Preload images when component mounts
    useEffect(() => {
        // Preload the card front image
        const frontImage = new Image();
        frontImage.src = cf_image;
        
        // Card back is likely already cached since it's imported, but preload just in case
        const backImage = new Image();
        backImage.src = MTG_BACK;
    }, [cf_image]);

    let revealed = status === "FLIPPED" || status === "RIPPED";
    const nonBreakingSpace = "\u00A0";

    return (
        <div className="flex flex-col items-center rounded-lg">
            {/* Container for the cards with relative positioning */}
            <div className="relative">
                {/* Always render all card states but control visibility with CSS */}
                <div 
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-200 ${
                        status === "NONE" ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <EnhancedCard 
                        alt="Card Back" 
                        handleCardClick={handleCardClick} 
                    />
                </div>
                
                <div 
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-200 ${
                        status === "FLIPPED" ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <FlippedCard 
                        src={cf_image} 
                        alt={name} 
                        foil={foil} 
                    />
                </div>
                
                <div 
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-100 ${
                        status === "RIPPED" ? "scale-80 opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <RippedCard 
                        src={cf_image} 
                        maskImage={maskImage} 
                        maskPosition={maskPosition} 
                    />
                </div>
                
                {/* Invisible placeholder to maintain correct dimensions */}
                <div className="invisible">
                    <EnhancedCard 
                        alt="placeholder" 
                        handleCardClick={() => {}} 
                    />
                </div>
            </div>
            
            {/* Card info displayed below */}
            <div className="font-kanit text-center text-sm">
                {revealed ? name : nonBreakingSpace}
            </div>
            <div className="font-kanit text-center text-sm">
                {revealed ? centsToDollars(cents) : nonBreakingSpace}
            </div>
        </div>
    );
}