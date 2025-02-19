import { json, LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import stylesheet from "./tailwind.css?url";
import { useState } from "react";
import invariant from "tiny-invariant";
import packTypesJson from '../public/models/packTypes.json';
import HeaderContainer from "./components/headers/HeaderContainer";
import { FIORIProvider, FIORIDispatchContext, useFIORIDispatch, useFIORI } from "./FIORIContext";
import { ReducerActions } from "./constants/ActionTypes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: "../public/fiori favicon 64.png",
    type: "image/png",
  },
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
  const navigate = useNavigation();
  const dispatch = useFIORIDispatch();
  const state = useFIORI();

  const outletFunctions = {
    changeValue: changeValue
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
      <body className="w-full">
        <FIORIProvider>
          <HeaderContainer
            changeValue={changeValue}
          />

          {navigate.state === "loading" ? <div>HOLY LOSADING</div> : <Outlet context={{ ...outletFunctions }} />}

          <Scripts />
        </FIORIProvider>
      </body>
    </html>
  );
}
