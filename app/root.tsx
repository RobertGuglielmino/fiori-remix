import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useNavigation,
} from "@remix-run/react";
import stylesheet from "./tailwind.css?url";
import { useEffect, useState } from "react";
import HeaderContainer from "./components/headers/HeaderContainer";
import { FIORIProvider, FIORIDispatchContext, useFIORIDispatch, useFIORI } from "./FIORIContext";
import LoadingBox from "./components/LoadingBox";
import getUserId  from "~/localStorage.client";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: "../public/fiori favicon 64.png",
    type: "image/png",
  },
];


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
      <body className="w-full">
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
