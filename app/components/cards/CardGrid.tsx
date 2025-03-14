
import { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import invariant from 'tiny-invariant';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { useFIORI, useFIORIDispatch } from '../../FIORIContext';
import { ReducerActions } from '../../constants/ActionTypes';
import { loader } from '../../routes/open';
import getUserId  from "~/localStorage.client";

interface Card {
    id: number,
    status: string,
    rotation: number,
    maskImage: number,
}

async function sendStatsData(packState: any, userId: string, packId: string) {
    let response = await fetch("https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod/flip-or-rip-lambda/stats", {
      method: 'POST',
      body: JSON.stringify({ 
        "cardStatusList": packState,
        "userId": userId,
        "packId": packId,
       }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      const data = await res.json();
      console.log("Loader data received:", data);
      return data;
    });
}

function CardGrid() {
    const dispatch = useFIORIDispatch();
    const state = useFIORI();
    const loaderData = useLoaderData<typeof loader>()["body"];
    const cards = loaderData["cards"];
    const packId = loaderData["packId"];
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
        <div className="flex flex-wrap justify-center sm:px-4 lg:px-16 py-4">
            {
                cards.map((card: any, index: number) => {
                    return <div className="grow-0 shrink sm:basis-[24vw] lg:basis-[12vw] p-2" >
                        <CardContainer
                            key={packState[index].scryfallId}
                            index={index}
                            {...card}
                            status={packState[index].status}
                            foil={packState[index].foil}
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
        const rotation = packState[id]["rotation"];
        const maskImage = packState[id]["maskImage"];

        // sets local state for each Card 
        setPackState(
            packState.map((card: Card) => {
                return card.id === id ? { id: id, status: 'RIPPED', rotation, maskImage } : card;
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
            sendStatsData(packState, getUserId(), packId);
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