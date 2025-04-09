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
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/remix"


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: "/fiori_favicon_64.png",
    type: "image/png",
  },
  {
    rel: "canonical",
    href: "https://flipitorripit.com",
  },
  {
    rel: "preload",
    href: "/images/FlipItHeader.webp",
    as: "image",
    type: "image/webp",
    fetchpriority: "high",
  },
  {
    rel: "preload",
    href: "/images/RipItHeader.webp",
    as: "image",
    type: "image/webp",
    fetchpriority: "high",
  },
  {
    rel: "preload",
    href: "/fonts/Quicksand/Quicksand-VariableFont_wght.ttf",
    as: "font",
    type: "font/ttf"
  },
  {
    rel: "preconnect",
    href: "https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com",
  },
  
];

export const meta = () => {
  return [
    { title: "Flip It or Rip It" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "description", content: "Magic: The Gathering cards used to simulate Flip It or Rip It - without any of the risk. Now updated for Aetherdrift!" },
    { property: "og:title", content: "Flip It or Rip It" },
    { property: "og:image", content: "/fiori_favicon_64.png" },
    { property: "og:description", content: "Magic: The Gathering cards used to simulate Flip It or Rip It - without any of the risk. Now updated for Aetherdrift!" },
    { property: "og:url", content: "https://flipitorripit.com" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "/fiori_favicon_64.png" },
    { name: "twitter:title", content: "Flip It or Rip It" },
    { name: "twitter:description", content: "Magic: The Gathering cards used to simulate Flip It or Rip It - without any of the risk. Now updated for Aetherdrift!" },
    { name: "robots", content: "index, follow" }
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

          <Analytics />
          <SpeedInsights />
          <Scripts />
        </FIORIProvider>
      </body>
    </html>
  );
}
