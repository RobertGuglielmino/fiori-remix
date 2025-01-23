
import React from 'react';
import CardContainer from './CardContainer';

interface CardGridProps {
    cards: Array<{ id: number, status: string, text: string, price: string, image: string }>;
    onCardClick: (id: number) => void;
}

function CardGrid({ cards, onCardClick }: CardGridProps) {


    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
    <div className="flex flex-wrap">
    {cards.map(card => (
        <CardContainer
            key={card.id}
            {...card}
            onClick={() => onCardClick(card.id)}
        />
    ))}
    </div>
    ); 
};

export default CardGrid;