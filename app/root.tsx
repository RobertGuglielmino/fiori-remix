import { json, LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import stylesheet from "./tailwind.css?url";
import { useReducer, useState } from "react";
import invariant from "tiny-invariant";
import packTypesJson from '../public/models/packTypes.json';
import FlipRipDisplay from "./components/headers/FlipRipDisplay";
import HeaderContainer from "./components/headers/HeaderContainer";
import { FIORIProvider, FIORIDispatchContext, useFIORIDispatch, useFIORI } from "./FIORIContext";
import { ReducerActions } from "./constants/ActionTypes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

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

export default function App() {
  const [changeValue, setChangeValue] = useState(100);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useFIORIDispatch();
    const state = useFIORI();
  
    function updatePackState(state: string) {
      dispatch!({
        type: ReducerActions.PACK_STATE,
        payload: {
          action: state,
        }
      });
    }

  function rippedCard(amount: number) {
    // setAmountLost(amountLost + amount);
    // setAction("FLIP");
    setChangeValue(amount); // Example with cents
  }


  const outletFunctions = {
    changeValue: changeValue
  }


  function resetNewPack() {
    // call api
    navigate(`/open?${searchParams.toString()}`);
    updatePackState("FLIP");
  }




  return (
    <html>
      <head >
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <FIORIProvider>
        <body className="w-full">
          <HeaderContainer
            changeValue={changeValue}
            fetchNewPack={() => resetNewPack()}
          />

          <Outlet context={{ ...outletFunctions }} />

          <Scripts />
        </body>
      </FIORIProvider>
    </html>
  );
}
