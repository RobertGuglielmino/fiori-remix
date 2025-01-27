import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import CardGridContainer from "../components/cards/CardGridContainer";
import HeaderContainer from "../components/headers/HeaderContainer";
import packTypesJson from './packTypes.json'
import invariant from "tiny-invariant";
import PackSelector from "../components/headers/pieces/PackSelector";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export async function loader() {
  return null;
}



export default function Index() {
  const [amountLost, setAmountLost] = useState(0);
  const packSetTypes = useLoaderData<typeof loader>();
  // const packSetTypes = ['core', 'expansion', 'draft_innovation', 'masters', 'funny', 'remastered'];

  return (
    <div id="index-page">
      <div className='w-full'>
        <HeaderContainer amountLost={amountLost} packSetTypes={packSetTypes}  />

      </div>
      This is a demo for Remix.
      <br />
      Check out{" "}
      <a href="https://remix.run">the docs at remix.run</a>.
    </div>
  );
}