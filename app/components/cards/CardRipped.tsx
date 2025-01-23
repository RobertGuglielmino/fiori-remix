
import React from 'react';

interface CardRippedProps {
    image: string;
}

function CardRipped({ image }: CardRippedProps) {
    return (
        <img
            src={image}
            alt="Card Ripped"
            className="max-w-full max-h-full object-contain"
        />
    );
};

export default CardRipped;