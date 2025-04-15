import { Form, useLoaderData } from '@remix-run/react';
import  { useState } from 'react';
import { loader } from '~/routes/_index';

function formatBoosterType(type: any) {
  const words = type.split("-");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

export default function PackSelector() {
  const {apiData} = useLoaderData<typeof loader>();
  // const formattedRes = Object.getOwnPropertyNames(packSetTypes).map(
  //   (key) => { return { [key]: packSetTypes[key] }; }
  // );
  const [selectedSet, setSelectedSet] = useState<string>("");
  const setKeys = Object.keys(apiData).sort((a, b) => apiData[a]["releaseDate"] < apiData[b]["releaseDate"] ? 1 : -1);


  function generateSetTypes(set: string) {
    return apiData[set]["boosterTypes"].map((type: any) => (<option key={type} value={type}>{formatBoosterType(type)}</option>))
  }

  return (
    <Form action="/open" method="get" className=''>
      <div className="grid grid-cols-3 h-24 w-72">
        <div className='col-span-2 flex flex-col flex-shrink-1'>
          <select aria-label="Magic Set" className='m-1 grow rounded'
            id="set"
            name="set"
            defaultValue='-'
            onChange={(e) => {
              setSelectedSet(e.target.value);
            }}>

            <option key="-" disabled value="-">Pick a Magic Set!</option>
            {setKeys.map((set: any) => (<option key={set} value={set}>{set} - {apiData[set]["name"]}</option>))}
          </select>
          <select aria-label="Booster Type" className='m-1 grow rounded'
            id="pack-type"
            name="pack-type"
            disabled={selectedSet === ""}>

            {selectedSet === "" ? <option key="-" value="-">-</option> : generateSetTypes(selectedSet)}

          </select>
        </div>
        <button className='m-1 bg-green-500 disabled:grayscale hover:not-disabled:bg-green-400 active:not-disabled:bg-green-600 rounded' disabled={selectedSet == ""} type="submit">
          <div className='object-center flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z" /></svg>
          </div>
          <div className="text-xl text-black">
            OPEN
          </div>
        </button>
      </div>
    </Form>
  );
};