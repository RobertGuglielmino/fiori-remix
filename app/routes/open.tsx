import { ActionFunctionArgs, defer, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Suspense, useState } from "react";
import { Await, isRouteErrorResponse, useActionData, useLoaderData, useFetcher, useOutletContext, useRouteError, useSearchParams, useNavigate } from "@remix-run/react";
import CardGrid from "../components/cards/CardGrid";
import HeaderContainer from "../components/headers/HeaderContainer";

export async function loader({
  request,
}: LoaderFunctionArgs) {
  console.log("Loader started");
  const url = new URL(request.url);
  if (!url.searchParams.has('set') || !url.searchParams.has('pack-type')) {
    console.log(url);
    redirect("/");
  }
  const set = url.searchParams.get('set');
  const pack_type = url.searchParams.get('pack-type');

  const responsePromise = await fetch("https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod", {
    method: 'POST',
    body: JSON.stringify({ set, pack_type }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log("Loader finished");
  console.log(responsePromise);

  return responsePromise;
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


interface OutletContextType {
  action: string;
  setAction: (action: string) => void;
  amountLost: number;
  amountSaved: number;
  changeValue: number;
  allCardsClicked: () => void;
  rippedCard: (amount: number) => void;
  flippedCard: (amount: number) => void;
  // Add other properties as needed
}

export default function Open() {
  // const navigation = useNavigation();
  const outletContext = useOutletContext<OutletContextType>();
  const [packFullyOpened, setPackFullyOpened] = useState(false);
  const [cardClickCount, setCardClickCount] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function allCardsClicked() {
    console.log("All cards have been flipped or ripped");
    setPackFullyOpened(true);
  }

  function incrementCardClick() {
    setCardClickCount(cardClickCount + 1);
  }

  function resetNewPack() {
    // call api
    navigate(`/open?${searchParams.toString()}`);
    outletContext.setAction("FLIP");
    setCardClickCount(0);
  }

  function fetchNewPack() {
    
  }

  return (
    <div className='' id="index-page">
      <HeaderContainer
        action={outletContext.action}
        amountLost={outletContext.amountLost}
        amountSaved={outletContext.amountSaved}
        changeValue={outletContext.changeValue}
        fetchNewPack={() => resetNewPack()}
        packFullyOpened={packFullyOpened} />
      <CardGrid
        action={outletContext.action}
        allCardsClicked={() => allCardsClicked()}
        cardClickCount={cardClickCount}
        incrementCardClick={() => incrementCardClick()}
        setAmountLost={(amount) => outletContext.rippedCard(amount)}
        setAmountSaved={(amount) => outletContext.flippedCard(amount)} />
    </div>
  );
}

