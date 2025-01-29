
import React from 'react';
import CardContainer from './CardContainer';

interface CardGridProps {
    cards: Array<{ id: number, status: string, text: string, price: string, image: string }>;
    onCardClick: (id: number) => void;
}

function CardGrid({ cards, onCardClick }: CardGridProps) {

    return (
        <div className="flex flex-wrap justify-center">
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