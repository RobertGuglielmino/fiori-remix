
import React from 'react';
import {
    Form,
    useFetcher,
    useLoaderData,
} from "@remix-run/react";
import { ActionFunctionArgs, json } from '@remix-run/node';
import invariant from "tiny-invariant";
import ValueLostBox from './pieces/ValueLostBox';
import ValueSavedBox from './pieces/ValueSavedBox';
import PackSelector from './pieces/PackSelector';
import FlipRipDisplay from './pieces/FlipRipDisplay';


interface HeaderContainerProps {
    amountLost: number;
    packSetTypes: any;
}

function HeaderContainer() {
    return (
        <div className="place-content-between border-black border-2 flex items-center flex-row gap-6 mx-4">
            <button className='flex-basis-0 bg-red-500 size-12 rounded'> wow </button>
            <ValueLostBox value={0}/>
            <FlipRipDisplay>FLIP</FlipRipDisplay>
            {/* <ValueSavedBox value={0}/> */}
                
            <PackSelector />
        </div>
    );
};

export default HeaderContainer;