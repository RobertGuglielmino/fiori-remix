import { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react"; 
import stylesheet from "./tailwind.css?url";
import HeaderContainer from "./components/headers/HeaderContainer";
  
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
  

export default function App() {
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
