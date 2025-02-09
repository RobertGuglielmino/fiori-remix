import React, { useRef, useState } from 'react';
import cardBack from '../../../public/images/mtg_back.png'

interface CardProps {
    newImage: string;
    onClick: () => void;
    className?: string;
    setMaskPosition: (maskPosition: string) => void;
}

const getRandomRotation = () => {
  return Math.floor(Math.random() * 9) - 4; // Generates an integer between -4 and 4 inclusive
};

function Card({ newImage, onClick, className, setMaskPosition }: CardProps) {
    const [image, setImage] = useState(cardBack);
    const [rotation, setRotation] = useState(0);
    const maskPosition = useRef('0px 0px');

    const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (image === cardBack) {
            const { offsetX, offsetY, target } = event.nativeEvent;
            const xPercent = (offsetX / target.clientWidth) * 100;
            const yPercent = 100 - ((offsetY / target.clientHeight) * 100);
            setMaskPosition(`${xPercent}% ${yPercent}%`);

            console.log(`${xPercent}% ${yPercent}%`);
            setImage(newImage);
            setRotation(getRandomRotation())
            onClick();
        }
    };

    return (
        <img
            src={image}
            alt="Card"
            className={`h-311 w-233 object-fill rounded-xl cursor-pointer transition duration-150 ease-in-out rotate-[${rotation}deg] ${className}`}
            onClick={(e) => handleClick(e)}
        />
    );
};

export default Card;
