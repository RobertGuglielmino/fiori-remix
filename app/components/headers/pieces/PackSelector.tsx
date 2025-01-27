import { Form, useFetcher } from '@remix-run/react';
import React from 'react';
import packTypesJson from './packTypes.json';
import { ActionFunctionArgs, redirect } from '@remix-run/node';

interface PackSelectorProps {
    packSetTypes: any;
}

// USE RESOURCE ROUTES TO GET SET/PACKTYPES
// PROBS URL PARAM
// ALSO COUPLE SET/PACKTYPES LMAO 
// WE GOT THIS

setTypes={(set: string) => generateSetTypes(set)}


return fetchSets();

async function fetchSets() {
    const response = await fetch('https://api.scryfall.com/sets');
    const data = await response.json();
    invariant(data, "Missing data from scryfall");
  
    const packSetTypes = ['core', 'expansion', 'draft_innovation', 'masters', 'funny', 'remastered'];
  
    // Filter sets that can be purchased as packs
    const packSets = data.data
      .filter((set: any) => packSetTypes.includes(set.set_type))
      .filter((set: any) => set.code.length === 3)
      .filter((set: any) => Object.keys(packTypesJson).includes(set.code.toUpperCase()))
      .map((set: any) => {
        return {
          setCode: set.code.toUpperCase(),
          setName: set.name
        }
      });
    return json(packSets);
  } 

function generateSetTypes(set: any) {
    return packTypesJson[set].map((type: any) => (<option key={type} value={type}>{formatBoosterType(type)}</option>))
  }
  
  function formatBoosterType(type: any) {
    const words = type.split("-");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    words.join(" ");
  
    return words;
  }

export default function PackSelector({ packSetTypes }: PackSelectorProps) {

    return (
        <Form action='/open' method="post" className=''>
            <div className="grid grid-cols-2 h-24 w-48">
                <div className='flex flex-col flex-shrink-1'>
                    <select name="set" className=' m-1 w-24 grow bg-slate-200 rounded'>
                        <option value="OTJ">OTJ</option>
                        {/* {packSetTypes.map((set: any) => (<option key={set.setCode} value={set.setCode}>{set.setCode}</option>))} */}
                    </select>
                    {/* <select className=' m-1 w-24 grow bg-slate-200 rounded'>
                        {document.getElementsByName("set")[0].toString() === "" ? <option key="-" value="-">-</option> : setTypes(document.getElementsByName("set")[0].toString())}
                    </select> */}
                    <select name="pack-type" className=' m-1 w-24 grow bg-slate-200 rounded'>
                        <option value="play">play</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className='bg-green-500 hover:bg-green-600 size-24 rounded'> GO </button>
            </div>
        </Form>
    );
};