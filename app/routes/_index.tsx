import { json } from "@remix-run/node";
import PackSelector from "../components/headers/pieces/PackSelector"
import invariant from "tiny-invariant";
import packTypesJson from './packTypes.json';
import { useOutletContext } from "@remix-run/react";

export async function loader() {
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

export default function Index() {
  const outletContext = useOutletContext();
  // const packSetTypes = ['core', 'expansion', 'draft_innovation', 'masters', 'funny', 'remastered'];
  const helperText =
    <>
      <div className="center">
        <PackSelector/> 
      </div>
      <b>What?</b> Flip It Or Rip It is played by opening a pack of trading cards, placing them face down, alternating between Flipping a card face up (where you keep the card) and Ripping a card, so that it is destroyed forever.<br /><br />
      <b>Why?</b> Someone thought that the rush of opening packs wasn't enough, so they adding in the potential of "losing money".<br /><br />
      <b>How?</b> Pick some options from the drop down menus, generate the booster pack, and start clicking! The first card we will FLIP.
    </>;

  return (
    <div className="center m-10">
      {helperText}
    </div>
  );
}