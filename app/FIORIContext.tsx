import { createContext, type Dispatch, useContext, useReducer } from 'react';
import {ReducerActions} from './constants/ActionTypes';

export const FIORIContext = createContext<State | null>(null);
export const FIORIDispatchContext = createContext<Dispatch<Action> | null>(null);

interface State {
    action: string;
    amountLost: number;
    amountSaved: number;
}

interface Action {
    type: ReducerActions;
    payload: any;
}

function addAmountSaved(state: State, action: any): State {
    return {
        ...state,
        amountSaved: state.amountSaved + action.amount
    }
}

function addAmountLost(state: State, action: any): State {
    console.log(state);
    console.log(action);
    return {
        ...state,
        amountLost: state.amountLost + action.amount
    }
}

function setCardPackActionState(state: State, action: any): State {

    console.log("setting pack state");

    switch (action.action) {
        case 'NONE': {
            return {
                ...state,
                action: action.action
            };
        }
        case 'FLIP': {
            return {
                ...state,
                action: action.action
            };
        }
        case 'RIP': {
            return {
                ...state,
                action: action.action
            };
        }
        case 'END': {
            return {
                ...state,
                action: action.action
            };
        }
        default: {
            throw Error('Unknown lost amount reducer action: ' + action.action);
        }
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
        amountLost: state.amountLost + action.amountLost
    }
}

export function FIORIProvider({ children }: any) {
    const initialState = {
        action: "NONE",
        amountLost: 0,
        amountSaved: 0,
        dispatch: (() => undefined) as Dispatch<any>,
    }

    const actionMap = new Map<ReducerActions, (state: State, action: any) => State>([

        [ReducerActions.ADD_TO_SAVED, (state, action) => addAmountSaved(state, action)],
        [ReducerActions.ADD_TO_LOST, (state, action) => addAmountLost(state, action)],
        [ReducerActions.PACK_STATE, (state, action) => setCardPackActionState(state, action)],
        [ReducerActions.NEW_PACK, (state, action) => addAmountLost(state, action)],
        [ReducerActions.FLIP_CARD, (state, action) => flipCard(state, action)],
        [ReducerActions.RIP_CARD, (state, action) => ripCard(state, action)],

    ]);

    function reducer(state: any, { type, payload }: any) {
        const mappedAction = actionMap.get(type);
        return mappedAction ? mappedAction(state, payload) : state;
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
