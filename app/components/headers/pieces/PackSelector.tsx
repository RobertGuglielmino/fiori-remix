import { Form, useFetcher, useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import packTypesJson from './packTypes.json';
import { loader } from '~/root';

// ALSO COUPLE SET/PACKTYPES LMAO 

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
    <Form action="/open" method="get" className=''>
      <div className="grid grid-cols-2 h-24 w-48">
        <div className='flex flex-col flex-shrink-1'>
          <select className='m-1 grow bg-slate-200 rounded'
            id="set"
            defaultValue='-'
            onChange={handleSetChange}
            name="set">
            <option key="-" disabled value="-">Pick a Magic Set!</option>
            {packSetTypes.map((set: any) => (<option key={set.setCode} value={set.setCode}>{set.setCode}</option>))}

          </select>
          <select id="pack-type" className='m-1 grow bg-slate-200 rounded'
            disabled={selectedSet === ""}
            name="pack-type">

            {selectedSet === "" ? <option key="-" value="-">-</option> : generateSetTypes(selectedSet)}

          </select>
        </div>
        <button className='m-1 bg-green-500 hover:bg-green-400 rounded'
          type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z"/></svg>
        </button>
      </div>
    </Form>
  );
};