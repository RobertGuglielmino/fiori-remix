
import { useState } from 'react';
import centsToDollars from './../../utils/centsToDollars';
import EnhancedCard from './EnhancedCard';
import cardBack from '../../../images/mtg_back.png';
import RippedCard from './RippedCard';
import FlippedCard from './FlippedCard';

interface CardContainerProps {
    index: number;
    name: string;
    cents: number;
    image: string;
    status: string;
    foil: boolean;
    rotation: number;
    maskImage: number;
    handleCardClick: () => void;
}

export default function CardContainer({ name, cents, image, status, foil, rotation, maskImage, handleCardClick }: CardContainerProps) {
    const [maskPosition, setMaskPosition] = useState('25%_25%');

    let revealed = status === "FLIPPED" || status === "RIPPED";
    const nonBreakingSpace = "\u00A0";

    return (
        <div className="flex flex-col items-center rounded-lg">
            {status === "NONE" && <EnhancedCard src={cardBack} alt="test" handleCardClick={() => handleCardClick()} />}
            {status === "FLIPPED" && <FlippedCard src={image} alt="test" foil={foil} />}
            {status === "RIPPED" && <RippedCard src={image} maskImage={maskImage} maskPosition={maskPosition} />}
            <div className="font-kanit text-center text-sm">{revealed ? name : nonBreakingSpace}</div>
            <div className="font-kanit text-center text-sm">{revealed ? centsToDollars(cents) : nonBreakingSpace}</div>
        </div>
    );
};