import { Form, useFetcher, useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import packTypesJson from './packTypes.json';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { loader } from '~/root';


// PROBS URL PARAM
// ALSO COUPLE SET/PACKTYPES LMAO 
// WE GOT THIS


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


export default function PackSelector() {
  const setInfo = useLoaderData();
  const fetcher = useFetcher();
  const [selectedSet, setSelectedSet] = useState<string>("");
  const packSetTypes = useLoaderData<typeof loader>();

  function handleSetChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSet(event.target.value);
  };

  return (
    <Form action="/open" method="post" className=''>
      <div className="grid grid-cols-2 h-24 w-48">
        <div className='flex flex-col flex-shrink-1'>
          <select className=' m-1 w-24 grow bg-slate-200 rounded'
            onChange={handleSetChange}
            name="set">

            {packSetTypes.map((set: any) => (<option key={set.setCode} value={set.setCode}>{set.setCode}</option>))}

          </select>
          <select className=' m-1 w-24 grow bg-slate-200 rounded'
            disabled={selectedSet === ""}
            name="pack-type">

            {selectedSet === "" ? <option key="-" value="-">-</option> : generateSetTypes(selectedSet)}

          </select>
        </div>
        <button className='m-1 bg-green-500 hover:bg-green-600 size-24 rounded'
          type="submit">
          GO
        </button>
      </div>
    </Form>
  );
};