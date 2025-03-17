import { createContext, type Dispatch, useContext, useReducer, useState } from 'react';
import {ReducerActions} from './constants/ActionTypes';

export const FIORIContext = createContext<State | null>(null);
export const FIORIDispatchContext = createContext<Dispatch<Action> | null>(null);

interface State {
    action: string;
    amountLost: number;
    amountSaved: number;
    packCompleted: boolean;
    hardMode: boolean;
    packState: any;
}

interface Action {
    type: ReducerActions;
    payload: any;
}

interface Card {
    id: number,
    status: string,
    rotation: number,
    maskImage: number,
}

function addAmountSaved(state: State, action: any): State {
    return {
        ...state,
        amountSaved: state.amountSaved + action.amount
    }
}

function addAmountLost(state: State, action: any): State {
    return {
        ...state,
        amountLost: state.amountLost + action.amount
    }
}

function setCardPackActionState(state: State, action: any): State {
    if (state.action === action.action) {
        return state; // Don't update if action hasn't changed
    }

    if (!['NONE', 'FLIP', 'RIP', 'END'].includes(action.action)) {
        throw Error('Unknown action: ' + action.action);
    }
    
    return {
        ...state,
        action: action.action
    }
}

function newPack(state: State, action: any): State {
    return {
        ...state,
        action: "RIP",
        amountSaved: state.amountSaved + action.amountSaved,
        packState: state.packState.map((card: Card) => {
            return card.id === action.id ? { id: action.id, status: 'FLIPPED', rotation: 0, maskImage: -1 } : card;
        })
    }
}

function flipCard(state: State, action: any): State {
    return {
        ...state,
        action: "RIP",
        amountSaved: state.amountSaved + action.amountSaved
    }
}

function ripCard(state: State, action: any): State {
    return {
        ...state,
        action: "FLIP",
        amountLost: state.amountLost + action.amountLost,
        packState: state.packState.map((card: Card) => {
            return card.id === action.id ? { ...card, id: action.id, status: 'RIPPED' } : card;
        })
    }
}

function resetPackState(state: State, action: any): State {
    console.log('resetPackState', action.size);
    const newState = initializeCardStateArray(action.size);
    return {
        ...state,
        packState: newState
    }
}

function packCompleted(state: State): State {
    return {
        ...state,
        packCompleted: true
    }
}

function packStarted(state: State): State {
    return {
        ...state,
        action: "FLIP",
        packCompleted: false
    }
}

function setHardMode(state: State, action: any): State {
    return {
        ...state,
        hardMode: action.hardMode
    }
}


export function FIORIProvider({ children }: any) {
    const initialState = {
        action: "FLIP",
        amountLost: 0,
        amountSaved: 0,
        packCompleted: false,
        hardMode: false,
        packState: [{
            id: 0,
            status: 'NONE',
            rotation: 0,
            maskImage: 0
        }]
    }

    const actionMap = new Map<ReducerActions, (state: State, action: any) => State>([

        [ReducerActions.ADD_TO_SAVED, (state, action) => addAmountSaved(state, action)],
        [ReducerActions.ADD_TO_LOST, (state, action) => addAmountLost(state, action)],
        [ReducerActions.PACK_STATE, (state, action) => setCardPackActionState(state, action)],
        [ReducerActions.NEW_PACK, (state, action) => newPack(state, action)],
        [ReducerActions.FLIP_CARD, (state, action) => flipCard(state, action)],
        [ReducerActions.RIP_CARD, (state, action) => ripCard(state, action)],
        [ReducerActions.RESET_PACK_STATE, (state, action) => resetPackState(state, action)],
        [ReducerActions.PACK_COMPLETED, (state, _) => packCompleted(state)],
        [ReducerActions.PACK_STARTED, (state, _) => packStarted(state)],
        [ReducerActions.SET_HARD_MODE, (state, action) => setHardMode(state, action)],

    ]);

    function reducer(state: any, { type, payload }: any) {

        const mappedAction = actionMap.get(type);
        if (!mappedAction) {
            console.warn('⚠️ No action found for type:', type);
            return state;
        }

        return mappedAction(state, payload);
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <FIORIContext.Provider value={state}>
            <FIORIDispatchContext.Provider value={dispatch}>
                {children}
            </FIORIDispatchContext.Provider>
        </FIORIContext.Provider>
    );
}

export function useFIORI() {
    return useContext(FIORIContext);
}

export function useFIORIDispatch() {
    return useContext(FIORIDispatchContext);
}
