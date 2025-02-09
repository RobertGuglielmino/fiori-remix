
import React, { useState } from 'react';
import centsToDollars from './../../utils/centsToDollars';
import Card from './Card';
interface CardContainerProps {
    cardState: string;
    name: string;
    cents: number;
    image: string;
    onClick: () => void;
}

function CardContainer({ cardState, name, cents, image, onClick }: CardContainerProps) {

    const NUM_MASKS = 5;

    const loadMaskImage = async () => {
    //   const maskIndex = Math.floor(Math.random() * NUM_MASKS) + 1;
    //   const maskImageModule = await import(`../../masks/mask${maskIndex}.png`);
    //   console.log(maskImageModule.default);
    //   return maskImageModule.default;
    };

    const [cardEffectInfo, setCardEffectInfo] = useState({
        maskImageFileName: loadMaskImage(),
        maskPosition: '0px 0px',
        rotation: 0,
    });


    let cardClassName = '';
    let hidden = cardState === "NONE";
    let revealed = cardState === "FLIPPED" || cardState === "RIPPED";
    const nonBreakingSpace = "\u00A0";
    // MaskSize: "cover",
    // MaskImage: maskImage,
    // MaskPosition: props.maskPosition,
    // console.log(cardState);

    switch (cardState) {
        case "RIPPED":
            cardClassName = `grayscale scale-[90%] [webkit-mask-image:${cardEffectInfo.maskImageFileName}] [mask-image:${cardEffectInfo.maskImageFileName}] [mask-size:cover] [webkit-mask-size:cover] [mask-position:${cardEffectInfo.maskPosition}] [webkit-mask-position:${cardEffectInfo.maskPosition}]`; // Add your custom CSS class for ripped state
            break;
        case "FLIPPED":
            cardClassName = 'flipped-class'; // Add your custom CSS class for flipped state
            break;
        default:
            cardClassName = 'grow max-h-fit cursor-pointer transition hover:scale-110 hover:animate-float duration-150 ease-in-out'; // Add your custom CSS class for back state
            break;
    }

//(input) => setCardEffectInfo({...cardEffectInfo, maskPosition: input})

    return (
        <div className="flex flex-col items-center border border-gray-300 rounded-lg">
            <Card newImage={image} setMaskPosition={() => hidden} onClick={onClick} className={cardClassName} />
            <div className=" font-kanit text-center text-sm">{revealed ? name : nonBreakingSpace}</div>
            <div className=" font-kanit text-center text-sm">{revealed ? centsToDollars(cents) : nonBreakingSpace }</div>
        </div>
    );
};

export default CardContainer;