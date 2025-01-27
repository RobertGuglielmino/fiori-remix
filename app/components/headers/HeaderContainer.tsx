
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

// export const action = async ({
//     params,
//     request,
// }: ActionFunctionArgs) => {
//     invariant(params.contactId, "Missing contactId param");
//     const formData = await request.formData();
//     return getBoosterPack({
//         set: formData.get("set"),
//         packType: formData.get("pack-type"),
//     });
// };


interface HeaderContainerProps {
    amountLost: number;
    packSetTypes: any;
}

function HeaderContainer({ amountLost, packSetTypes }: HeaderContainerProps) {
    return (
        <div className="place-content-between flex items-center flex-row gap-6 mx-4">
            {/* <fetch.Form method="get" action="/">
                <input name="set" type="text" />
                <input name="pack-type" type="text" />
            </fetch.Form> */}
            <button className='flex-basis-0 bg-red-500 size-12 rounded'> wow </button>
            <ValueLostBox value={0}/>
            <FlipRipDisplay>FLIP</FlipRipDisplay>
            <ValueSavedBox value={0}/>
                
            <PackSelector packSetTypes={packSetTypes}/>
            {/* <text className='place-content-center bg-green-200 size-12 rounded flex-basis-0'>$1,000</text> */}
        </div>
    );
};

export default HeaderContainer;