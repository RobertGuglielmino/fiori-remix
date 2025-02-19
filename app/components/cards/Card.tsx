import React, { Dispatch, useContext, useReducer, useRef, useState } from 'react';
import cardBack from '../../../images/mtg_back.png'
import { FIORIContext, useFIORIDispatch } from '../../FIORIContext';

interface CardProps {
    newImage: string;
    handleCardClick: () => void;
    cardClassName?: string;
    setMaskPosition: (maskPosition: string) => void;
}

function Card({ newImage, handleCardClick, cardClassName, setMaskPosition }: CardProps) {

    const [image, setImage] = useState(cardBack);
    const state = useContext(FIORIContext);
    const maskPosition = useRef('0px 0px');

    const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (image === cardBack) {
            const { offsetX, offsetY, target } = event.nativeEvent;
            const xPercent = (offsetX / target!.clientWidth) * 100;
            const yPercent = 100 - ((offsetY / target!.clientHeight) * 100);
            setMaskPosition(`${xPercent}% ${yPercent}%`);

            console.log(`${xPercent}% ${yPercent}%`);
            handleCardClick();
            setImage(newImage);
        }
    };

    return (
        <img
            src={image}
            alt="Card"
            className={`h-311 w-233 object-fill rounded-xl cursor-pointer transition duration-150 ease-in-out ${cardClassName}`}
            onClick={(e) => handleClick(e)}
        />
    );
};

export default Card;
