import { ActionFunctionArgs, json } from "@remix-run/node";
import CardGridContainer from "../components/cards/CardGridContainer";
import HeaderContainer from "../components/headers/HeaderContainer";
import { useState } from "react";
import packTypesJson from './packTypes.json'
import invariant from "tiny-invariant";
import PackSelector from "../components/headers/pieces/PackSelector";
import { isRouteErrorResponse, useActionData, useRouteError } from "@remix-run/react";

export async function loader() {
    console.log("WE GOT IT");
    //   return fetchSets();
    return null;
}

export function ErrorBoundary() {
    const error = useRouteError();

    console.log("IN THE OPEN ROUTE ERROR");
  
    if (isRouteErrorResponse(error)) {
      return (
        <div>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </div>
      );
    } else if (error instanceof Error) {
      return (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      );
    } else {
      return <h1>Unknown Error</h1>;
    }
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

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const set = formData.get('set')
    const pack_type = formData.get('pack_type')
    try {
        const response = await fetch("https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod", {
            method: 'POST',
            body: JSON.stringify({ set, pack_type }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('API call failed');
        }

        const data = await response.json();
        return json(data);
    } catch (error: any) {
        return json({ error: error.message }, { status: 500 });
    }
}

export default function Index() {
    // const navigation = useNavigation();
    const actionData = useActionData();
    // const isSubmitting = navigation.state === 'submitting';
    const [amountLost, setAmountLost] = useState(0);


    console.log("IN THE OPEN ROUTE");

    return (
        <p id="index-page">
            <PackSelector packSetTypes={json(packTypesJson)} />
            {/* {isSubmitting && <div>Loading...</div>} */}
            {actionData?.error && (
                <div className="text-red-500 mt-4">{actionData.error}</div>
            )}
            {actionData && !actionData.error && (
                <div className="mt-8">
                    <pre>{JSON.stringify(actionData, null, 2)}</pre>
                </div>
            )}
            <CardGridContainer amountLost={amountLost} setAmountLost={setAmountLost} />
        </p>
    );
}

