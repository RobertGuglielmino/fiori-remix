import { json, LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
} from "@remix-run/react"; 
import stylesheet from "./tailwind.css?url";
import HeaderContainer from "./components/headers/HeaderContainer";
import { useState } from "react";
import invariant from "tiny-invariant";
import packTypesJson from './routes/packTypes.json';
  
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
  const [amountLost, setAmountLost] = useState(0);
  
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

        <h1 className="object-center">Hello world!</h1>
        <HeaderContainer />
        
        <Link to="/"> HOME </Link>
        <Link to="/stats"> STATS </Link>
        <Link to="/info"> INFO </Link>
        <button></button>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
