import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useNavigation,
} from "@remix-run/react";
import stylesheet from "./tailwind.css?url";
import { useState } from "react";
import HeaderContainer from "./components/headers/HeaderContainer";
import { FIORIProvider } from "./FIORIContext";
import LoadingBox from "./components/LoadingBox";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: "../public/fiori favicon 64.png",
    type: "image/png",
  },
  
];

export const meta = () => {
  return [
    { title: "Flip It or Rip It" },
    { name: "description", content: "Magic: The Gathering cards used to simulate Flip It or Rip It - without any of the risk. Now updated for Aetherdrift!" }
  ];
};


export default function App() {
  const [changeValue, setChangeValue] = useState(100);
  const navigate = useNavigation();

  const outletFunctions = {
    changeValue: changeValue
  }

  return (
    <html>
      <head >
        <Meta />
        <Links />
      </head>
      <body className="w-full bg-stone-200">
        <FIORIProvider>
          <HeaderContainer
            changeValue={changeValue}
          />
          {navigate.state === "loading" ? <LoadingBox /> : <Outlet context={{ ...outletFunctions }} />}

          <Scripts />
        </FIORIProvider>
      </body>
    </html>
  );
}
