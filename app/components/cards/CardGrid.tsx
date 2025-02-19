
import { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import invariant from 'tiny-invariant';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { useFIORI, useFIORIDispatch } from '../../FIORIContext';
import { ReducerActions } from '../../constants/ActionTypes';
import { loader } from '../../routes/open';

interface Card {
    id: number,
    status: string,
    rotation: number,
    maskImage: number,
}

function sendData(n: any) {
    return null;
}

function CardGrid() {
    const dispatch = useFIORIDispatch();
    const state = useFIORI();

    const cards = useLoaderData<typeof loader>()["body"]["cards"];
    const [packState, setPackState] = useState<any>(initializeCardStateArray(cards.length));

    const handleCardClick = (id: number, action: string) => {
        switch (action) {
            case "FLIP":
                flipCard(id);
                break;
            case "RIP":
                ripCard(id);
                break;
            default:
                break;
        }
    };

    return (
        <div key={cards} className="flex flex-wrap justify-center sm:px-4 lg:px-16 py-4">
            {
                cards.map((card: any, index: number) => {
                    return <div className="grow-0 shrink basis-60 p-2" >
                        <CardContainer
                            key={card}
                            index={index}
                            {...card}
                            status={packState[index].status}
                            rotation={packState[index].rotation}
                            maskImage={packState[index].maskImage}
                            handleCardClick={() => handleCardClick(index, state!.action)}
                        />
                    </div>
                })
            }
        </div>
    );

    function flipCard(id: number) {
        const amount = cards[id]["cents"];

        // sets local state for each Card 
        setPackState(
            packState.map((card: Card) => {
                return card.id === id ? { id: id, status: 'FLIPPED', rotation: 0, maskImage: -1 } : card;
            })
        )

        // sets global state for header display 
        dispatch!({
            type: ReducerActions.FLIP_CARD,
            payload: {
                amountSaved: amount
            }
        });

        // checks if the entire pack has been opened
        cardStateHandler();
    }

    function ripCard(id: number) {
        const amount = cards[id]["cents"];

        // sets local state for each Card 
        setPackState(
            packState.map((card: Card) => {
                return card.id === id ? { id: id, status: 'RIPPED', rotation: 0, maskImage: -1 } : card;
            })
        )
        
        // sets global state for header display 
        dispatch!({
            type: ReducerActions.RIP_CARD,
            payload: {
                amountLost: amount
            }
        });

        // checks if the entire pack has been opened
        cardStateHandler();
    }

    function cardStateHandler() {
        if (allCardsTouched(packState)) {
            console.log("All cards have been flipped or ripped");
            handleNewPack();
            handlePackCompletion();
            //setCardState(initializeCardStateArray(cards.length));
            // sendPostRequest();
            //cardState
        }
    }

    function handleNewPack() {
        dispatch!({
            type: ReducerActions.PACK_STATE,
            payload: {
                action: "END"
            }
        });
    }

    function handlePackCompletion() {
        dispatch!({
            type: ReducerActions.PACK_COMPLETED,
            payload: {}
        });
    }
};

function initializeCardStateArray(size: number) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push({
            id: i,
            status: 'NONE',
            rotation: getRandomRotation(),
            maskImage: getRandomMask()
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
    // this reads before the last state is set from NONE. we check for 1 bc i dont want to debug this now.
    return cardState.filter((card: any) => { return card["status"] == "NONE" }).length == 1
}

export default CardGrid;