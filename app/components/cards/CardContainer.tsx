
import React from 'react';
import centsToDollars from './../../utils/centsToDollars';
import Card from './Card';

interface CardContainerProps {
    cardState: string;
    text: string;
    price: number;
    image: string;
    onClick: () => void;
}

function CardContainer({ cardState, text, price, image, onClick }: CardContainerProps) {

    let cardClassName = '';
    // console.log(cardState);

    switch (cardState) {
        case "RIPPED":
            cardClassName = 'grayscale border-2 border-black'; // Add your custom CSS class for ripped state
            break;
        case "FLIPPED":
            cardClassName = 'flipped-class'; // Add your custom CSS class for flipped state
            break;
        default:
            cardClassName = 'grow border-black max-h-fit cursor-pointer transition hover:scale-110 hover:animate-float duration-150 ease-in-out'; // Add your custom CSS class for back state
            break;
    }

    return (
        <div className="flex flex-col items-center border border-gray-300 rounded-lg">
            {/* <Card newImage={image} onClick={onClick} className={cardClassName} /> */}
            <div className="font-magic text-center text-sm">wow</div>
            <div className="font-magic text-center text-sm">{centsToDollars(price)}</div>
        </div>
    );
};

export default CardContainer;