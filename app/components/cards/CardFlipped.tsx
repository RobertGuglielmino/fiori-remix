
import React from 'react';

interface CardFlippedProps {
    image: string;
}

function CardFlipped({ image }: CardFlippedProps) {
    return (
        <img
            src={image}
            alt="Card Flipped"
            className="max-w-full max-h-full object-contain"
        />
    );
};

export default CardFlipped;