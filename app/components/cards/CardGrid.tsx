
import { useState } from 'react';
import CardContainer from './CardContainer';
import { ActionFunctionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { useActionData, useAsyncValue, useFetcher, useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/open';
import { useFIORI, useFIORIDispatch } from '../../FIORIContext';
import { ReducerActions } from '../../constants/ActionTypes';

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
    allCardsClicked: () => void;
    cardClickCount: number;
    incrementCardClick: () => void;
}


function CardGrid({ allCardsClicked, cardClickCount, incrementCardClick }: CardGridProps) {
    const loaderData: any = useLoaderData<typeof loader>();
    const dispatch = useFIORIDispatch();
    const state = useFIORI();

    // console.log(loaderData);
    // console.log(state);

    const cards = loaderData["body"]["cards"];

    const [cardState, setCardState] = useState(initializeCardStateArray(cards.length));
    console.log(allCardsTouched(cardState));

    const handleCardClick = (id: number, action: string, numCards: number) => {
        incrementCardClick();

        switch (action) {
            case "FLIP":
                handleFlipCard(cards[id]["cents"]);
                const flipCards = cardState.map((card) => {
                    return card.id === id ? { id: id, status: 'FLIPPED', rotation: 0, maskImage: -1 } : card;
                });
                setCardState(flipCards);
                break;
            case "RIP":
                handleRipCard(cards[id]["cents"]);
                const ripCards = cardState.map((card) => {
                    return card.id === id ? { id: id, status: 'RIPPED', rotation: getRandomRotation(), maskImage: getRandomMask() } : card;
                });
                setCardState(ripCards);
                break;
            default:
                break;
        }
        if (allCardsTouched(cardState)) {
            console.log("All cards have been flipped or ripped");
            handleNewPack();
            //setCardState(initializeCardStateArray(cards.length));
            // sendPostRequest();
            //cardState
        }
    };

    return (
        <div className="flex flex-wrap justify-center sm:px-4 lg:px-16 py-4">
            {cards.map((card: any, index: number) => (
                <div key={index} className="grow-0 shrink basis-60 p-2" >
                    <CardContainer
                        key={card.index}
                        cardState={cardState[index]["status"]}
                        {...card}
                        handleCardClick={() => handleCardClick(index, state!.action, cardState.length)}
                    />
                </div>
            ))}
        </div>
    );

    function handleFlipCard(amount: number) {
        dispatch!({
            type: ReducerActions.FLIP_CARD,
            payload: {
                amountSaved: amount
            }
        });
    }

    function handleRipCard(amount: number) {
        dispatch!({
            type: ReducerActions.RIP_CARD,
            payload: {
                amountLost: amount
            }
        });
    }

    function handleNewPack() {
        dispatch!({
            type: ReducerActions.PACK_STATE,
            payload: {
                action: 'END'
            }
        });
    }

    function handleLossValueIncrease(amount: number) {
        dispatch({
            type: ReducerActions.ADD_TO_LOST,
            payload: {
                amount: amount,
            }
        });
    }
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

function allCardsTouched(cardState: any) {
    return cardState.filter((card: any) => { return card["status"] == "NONE"}).length == 0
}

export default CardGrid;