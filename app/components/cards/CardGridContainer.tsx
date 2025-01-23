
import React, { useState } from 'react';
import CardGrid from './CardGrid';
import { ActionFunctionArgs } from '@remix-run/node';
import invariant from "tiny-invariant";

function sendData(n: any) {
    return null;
}

export const action = async ({
    params,
    request,
  }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return sendData({
    set: formData.get("set"),
    packType: formData.get("pack-type"),
  });
};


interface CardGridContainerProps {
    amountLost: number;
    setAmountLost: (amount: number) => void;
}

function CardGridContainer({ amountLost, setAmountLost }: CardGridContainerProps) {
    const [cards, setCards] = useState([
        { id: 1, status: 'NONE', text: 'Card 1', price: '$1.00', image: 'image1.jpg' },
        { id: 2, status: 'NONE', text: 'Card 2', price: '$2.00', image: 'image2.jpg' },
        // Add more cards as needed
    ]);
    
    function centsToDollars(amount: number) {
        let unit: number = amount;
        const cents: number = (unit % 100);
        const dollars: number = ((unit - cents) / 100);
        const centsDisplay: string | number = cents < 10 ? "0" + cents : cents;
    
        return "$" + dollars + "." + centsDisplay;
    };

    
    // let formattedBooster = cards.map((num, index) => {
    //     return <CardContainer
    //                 key={num}
    //                 back={"https://d3vjinhen5j20w.cloudfront.net/00000000-0000-0000-0000-000000000000.jpg"}
    //                 image={"https://ih1.redbubble.net/image.1998948087.5875/st,small,507x507-pad,600x600,f8f8f8.jpg"} //"https://d3vjinhen5j20w.cloudfront.net/{uuid}.jpg"
    //                 text={"Card Name"}
    //                 price={"$1.00"}
    //                 foil={false}
    //                 rarity={"common"}
    //                 status={"NONE"}
    //                 imageClickHandler={() => {}}
    //                 // onClick={() => onCardClick(card.id)}
    //                 />;
    // });


    const handleCardClick = (id: number) => {
        setCards(prevCards => {
            const updatedCards = prevCards.map(card => {
                if (card.id === id) {
                    const newStatus = card.status === 'NONE' ? (Math.random() > 0.5 ? 'FLIPPED' : 'RIPPED') : card.status;
                    if (newStatus === 'RIPPED' && card.status !== 'RIPPED') {
                        // setAmountLost(prevAmount => prevAmount + parseFloat(card.price.slice(1)));
                    }
                    return { ...card, status: newStatus };
                }
                return card;
            });

            // Check if all cards have been clicked
            if (updatedCards.every(card => card.status !== 'NONE')) {
                // sendPostRequest();
            }

            return updatedCards;
        });
    };


    return (
        <div className="p-4">
            <main>
                <CardGrid cards={cards} onCardClick={handleCardClick} />
            </main>
        </div>
    );
};

export default CardGridContainer;