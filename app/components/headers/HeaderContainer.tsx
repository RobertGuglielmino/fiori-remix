
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


// async function getBoosterPack(n: any) {
//     const response = await fetch('https://api.scryfall.com/sets');
//     const data = await response.json();

//     const packSetTypes = ['core', 'expansion', 'draft_innovation', 'masters', 'funny','remastered'];

//     // Filter sets that can be purchased as packs
//     const packSets = data.data
//       .filter(set => packSetTypes.includes(set.set_type))
//       .filter(set => set.code.length === 3)
//       .filter(set => Object.keys(packTypesJson).includes(set.code.toUpperCase()))
//       .map((set) => {
//         return {
//           setCode: set.code.toUpperCase(),
//           setName: set.name
//         }
//     });
//     return packSets;
// }

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
    setTypes: any;
}

function HeaderContainer({ amountLost, packSetTypes, setTypes }: HeaderContainerProps) {
    return (
        <div className="place-content-between flex items-center flex-row gap-6 mx-4">
            {/* <fetch.Form method="get" action="/">
                <input name="set" type="text" />
                <input name="pack-type" type="text" />
            </fetch.Form> */}
            <button className='flex-basis-0 bg-red-500 size-12 rounded'> wow </button>
            <ValueLostBox value={0}/>
            <ValueSavedBox value={0}/>
            <PackSelector packSetTypes={packSetTypes}/>

            <text className='place-content-center bg-green-200 size-12 rounded flex-basis-0'>$1,000</text>
        </div>
    );
};

export default HeaderContainer;