
import React from 'react';
import CardBack from './CardBack';
import CardFlipped from './CardFlipped';
import CardRipped from './CardRipped';

interface CardContainerProps {
    status: string;
    text: string;
    price: string;
    image: string;
    onClick: () => void;
}

function CardContainer({ status, text, price, image, onClick }: CardContainerProps) {

    let cardDisplay;

    switch (status) {
        case "RIPPED":
            cardDisplay = <CardRipped image={image} />;
            break;
        case "FLIPPED":
            cardDisplay = <CardFlipped image={image} />;
            break;
        default:
            cardDisplay = <CardBack onClick={onClick} />;
            break;
    }

    return (
        <div className="flex flex-col items-center p-2 flex-grow-0 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
            {cardDisplay}
            <div>{text}</div>
            <div>{price}</div>
        </div>
    );
};

export default CardContainer;