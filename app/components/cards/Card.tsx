import React, { useState } from 'react';
import cardBack from './mtg_back.png'

interface CardProps {
    newImage: string;
    onClick: () => void;
    className?: string;
}

function Card({ newImage, onClick, className }: CardProps) {
    const [image, setImage] = useState(cardBack);

    const handleClick = () => {
        if (image === cardBack) {
            setImage(newImage);
            onClick();
        }
    };

    return (
        <img
            src={image}
            alt="Card"
            className={`object-fill cursor-pointer transition duration-150 ease-in-out ${className}`}
            onClick={handleClick}
        />
    );
};

export default Card;
