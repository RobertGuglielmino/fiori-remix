import { ActionFunctionArgs, json } from "@remix-run/node";
import CardGridContainer from "../components/cards/CardGridContainer";
import HeaderContainer from "../components/headers/HeaderContainer";
import { useState } from "react";
import packTypesJson from './packTypes.json'
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return fetchSets();
}

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

export default function Index() {
  const [amountLost, setAmountLost] = useState(0);
  const packSetTypes = useLoaderData<typeof loader>();
  
    return (
      <p id="index-page">
        <div className='w-full'>
            <HeaderContainer amountLost={amountLost} packSetTypes={packSetTypes} setTypes={(set: string) => generateSetTypes(set)}/>
            <CardGridContainer amountLost={amountLost} setAmountLost={setAmountLost} />
        </div>
        This is a demo for Remix.
        <br />
        Check out{" "}
        <a href="https://remix.run">the docs at remix.run</a>.
      </p>
    );
  }