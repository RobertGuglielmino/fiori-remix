import React, { Dispatch, useContext, useReducer, useRef, useState } from 'react';
import cardBack from '../../../images/mtg_back.png'
import { FIORIContext, useFIORIDispatch } from '../../FIORIContext';
import { ReducerActions } from '../../constants/ActionTypes';

interface CardProps {
    newImage: string;
    handleCardClick: () => void;
    className?: string;
    setMaskPosition: (maskPosition: string) => void;
}

const getRandomRotation = () => {
  return Math.floor(Math.random() * 9) - 4; // Generates an integer between -4 and 4 inclusive
};


function Card({ newImage, handleCardClick, className, setMaskPosition }: CardProps) {

    const [image, setImage] = useState(cardBack);
    const [rotation, setRotation] = useState(0);
    const state = useContext(FIORIContext);
    const dispatch = useFIORIDispatch();
    const maskPosition = useRef('0px 0px');


    function handleFlipCard(amount: number) {
        dispatch!({
            type: ReducerActions.FLIP_CARD,
            payload: {
                action: "FLIP",
                amountSaved: amount
            }
        });
    }

    function handleRipCard(amount: number) {
        dispatch!({
            type: ReducerActions.RIP_CARD,
            payload: {
                action: "RIP",
                amountSaved: amount
            }
        });
    }

    const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (image === cardBack) {
            const { offsetX, offsetY, target } = event.nativeEvent;
            const xPercent = (offsetX / target!.clientWidth) * 100;
            const yPercent = 100 - ((offsetY / target!.clientHeight) * 100);
            setMaskPosition(`${xPercent}% ${yPercent}%`);

            console.log(`${xPercent}% ${yPercent}%`);
            handleCardClick();
            setImage(newImage);
            setRotation(getRandomRotation());
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
