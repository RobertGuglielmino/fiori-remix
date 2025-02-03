import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import CardGridContainer from "../components/cards/CardGridContainer";
import { useState } from "react";
import { isRouteErrorResponse, useActionData, useOutletContext, useRouteError } from "@remix-run/react";
import CardGrid from "../components/cards/CardGrid";

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  if (!url.searchParams.has('set') || !url.searchParams.has('pack-type')) { 
    redirect("/");
  }
  const set = url.searchParams.get('set');
  const pack_type = url.searchParams.get('pack-type');

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
    console.log("WE GOT IT");

    const data = await response.json();
    return json(data);
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const set = formData.get('set')
  const pack_type = formData.get('pack-type')
  // Process the form data
  console.log('Set:', set);
  console.log('Pack Type:', pack_type);
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
    console.log("WE GOT IT");

    const data = await response.json();
    return json(data);
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}

export default function Index() {
  // const navigation = useNavigation();
  // const actionData = useActionData();
  const outletContext = useOutletContext();
  // const isSubmitting = navigation.state === 'submitting';

  return (
    <div className='' id="index-page">
      {/* {isSubmitting && <div>Loading...</div>} */}
      <CardGrid action={outletContext.action} setAmountLost={(amount) => outletContext.rippedCard(amount)} setAmountSaved={(amount) => outletContext.flippedCard(amount)} />
    </div>
  );
}

