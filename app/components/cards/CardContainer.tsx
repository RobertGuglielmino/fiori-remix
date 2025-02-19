
import React, { useState } from 'react';
import { useFIORI } from '../../FIORIContext';
import centsToDollars from './../../utils/centsToDollars';
import mask1 from '../../../images/masks/mask1.png';
import mask2 from '../../../images/masks/mask2.png';
import mask3 from '../../../images/masks/mask3.png';
import mask4 from '../../../images/masks/mask4.png';
import mask5 from '../../../images/masks/mask5.png';
import Card from './Card';

const MASK_IMAGES = [
    mask1,
    mask2,
    mask3,
    mask4,
    mask5
]

interface CardContainerProps {
    index: number;
    name: string;
    cents: number;
    image: string;
    status: string;
    rotation: number;
    maskImage: string;
    handleCardClick: () => void;
}

function CardContainer({ name, cents, image, status, rotation, maskImage, handleCardClick }: CardContainerProps) {
    console.log(name);

    const state = useFIORI();

    const NUM_MASKS = 5;

    function loadMaskImage() {
      const maskIndex = Math.floor(Math.random() * NUM_MASKS);
      console.log(maskIndex);
      console.log(MASK_IMAGES[maskIndex]);
      return MASK_IMAGES[maskIndex];
    };

    const cardEffectInfo = {
        maskImageFileName: maskImage,
        maskPosition: '50% 50%',
        rotation: rotation,
    };


    let cardClassName = '';
    let hidden = status === "NONE";
    let revealed = status === "FLIPPED" || status === "RIPPED";
    const nonBreakingSpace = "\u00A0";

    switch (status) {
        case "RIPPED":
            cardClassName = `grayscale scale-[90%] rotate-[${rotation}deg] [webkit-mask-image:${cardEffectInfo.maskImageFileName}] [mask-image:${cardEffectInfo.maskImageFileName}] [mask-size:cover] [webkit-mask-size:cover] [mask-position:${cardEffectInfo.maskPosition}] [webkit-mask-position:${cardEffectInfo.maskPosition}]`; // Add your custom CSS class for ripped state
            break;
        case "FLIPPED":
            cardClassName = 'flipped-class'; // Add your custom CSS class for flipped state
            break;
        default:
            cardClassName = 'grow max-h-fit cursor-pointer transition hover:scale-110 hover:animate-float duration-150 ease-in-out'; // Add your custom CSS class for back state
            break;
    }
    
const MASK4 = '../../../images/masks/mask4.png';

    return (
        <div className="flex flex-col items-center border border-gray-300 rounded-lg">
            {/* <img src = {cardBack} className={`grayscale mask-image-[url(../../../images/masks/mask4.png)] scale-[90%] mask-position-[50% 50%] mask-size-cover`}></img> */}
            <Card newImage={image} setMaskPosition={() => hidden} handleCardClick={() => handleCardClick()} cardClassName={cardClassName} />
            <div className="font-kanit text-center text-sm">{revealed ? name : nonBreakingSpace}</div>
            <div className="font-kanit text-center text-sm">{revealed ? centsToDollars(cents) : nonBreakingSpace}</div>
        </div>
    );
};

export default CardContainer;