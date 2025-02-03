
import { useState } from 'react';
import CardContainer from './CardContainer';
import { ActionFunctionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { useActionData, useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/open';

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

interface CardGridProps {
    action: string;
    setAmountLost: (amount: number) => void;
    setAmountSaved: (amount: number) => void;
}

function CardGrid({ action, setAmountLost, setAmountSaved }: CardGridProps) {
    // const actionData: any = useActionData<typeof action>();
    const loaderData: any = useLoaderData<typeof loader>();
    const cards = loaderData["body"]["cards"];

    const [cardState, setCardState] = useState(initializeCardStateArray(cards.length));
    const [cardClickCount, setCardClickCount] = useState(0);

    // console.log(loaderData["body"]);

    const handleCardClick = (id: number, action: string, numCards: number) => {

        console.log(cards);

        setCardClickCount(cardClickCount + 1);

        switch (action) {
            case "FLIP":
                setAmountSaved(cards[id]["cents"]);
                const flipCards = cardState.map((card) => {
                    return card.id === id ? { id: id, status: 'FLIPPED', rotation: 0, maskImage: -1 } : card;
                });
                setCardState(flipCards);
                break;
            case "RIP":
                setAmountLost(cards[id]["cents"]);
                const ripCards = cardState.map((card) => {
                    return card.id === id ? { id: id, status: 'RIPPED', rotation: getRandomRotation(), maskImage: getRandomMask() } : card;
                });
                setCardState(ripCards);
                break;
            default:
                break
        }
        if (cardClickCount === numCards - 1) {
            console.log("All cards have been flipped or ripped");
            // sendPostRequest();
        }
    };

    return (
        <div className="flex flex-wrap justify-center sm:px-4 lg:px-24 py-4">
            {cards.map((card: any, index: number) => (
                <div key={index} className="grow-0 shrink basis-50 p-2" >
                    <CardContainer
                        key={card.index}
                        cardState={cardState[index]["status"]}
                        {...card}
                        onClick={() => handleCardClick(index, action, cardState.length)}
                    />
                </div>
            ))}
        </div>
    );
};


function initializeCardStateArray(size: number) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push({
            id: i,
            status: 'NONE',
            rotation: 0,
            maskImage: -1
        });
    }
    return arr;
}

function getRandomRotation() {
    return Math.floor(Math.random() * 7) - 3; // Generates an integer between -4 and 4 inclusive
};

function getRandomMask() {
    return Math.floor(Math.random() * 5);
};


export default CardGrid;