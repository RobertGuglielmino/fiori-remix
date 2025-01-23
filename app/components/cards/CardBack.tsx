
import React from 'react';
import cardBack from './mtg_back.png'

interface CardBackProps {
    onClick: () => void;
}

function CardBack({ onClick }: CardBackProps) {
    return (
        <img src={cardBack}
            alt="Card Back"
            className='w-full h-auto object-contain cursor-pointer'
            onClick={onClick}
        />
    );
};

export default CardBack;