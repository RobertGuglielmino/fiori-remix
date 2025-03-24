import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, defer, json, redirect } from "@remix-run/node";
import { RemixServer, useLocation, useNavigate, useSearchParams, useNavigation, Meta, Links, Outlet, Scripts, useLoaderData, Form, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { createContext, useReducer, useContext, useState, useRef, useCallback, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/remix";
import invariant from "tiny-invariant";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/tailwind-DkM4rao3.css";
function centsToDollars(amount) {
  let unit = amount;
  const cents = unit % 100;
  const dollars = (unit - cents) / 100;
  const centsDisplay = cents < 10 ? "0" + cents : cents;
  return "$" + dollars + "." + centsDisplay;
}
var ReducerActions = /* @__PURE__ */ ((ReducerActions2) => {
  ReducerActions2[ReducerActions2["ADD_TO_SAVED"] = 0] = "ADD_TO_SAVED";
  ReducerActions2[ReducerActions2["ADD_TO_LOST"] = 1] = "ADD_TO_LOST";
  ReducerActions2[ReducerActions2["PACK_STATE"] = 2] = "PACK_STATE";
  ReducerActions2[ReducerActions2["NEW_PACK"] = 3] = "NEW_PACK";
  ReducerActions2[ReducerActions2["FLIP_CARD"] = 4] = "FLIP_CARD";
  ReducerActions2[ReducerActions2["RIP_CARD"] = 5] = "RIP_CARD";
  ReducerActions2[ReducerActions2["RESET_PACK_STATE"] = 6] = "RESET_PACK_STATE";
  ReducerActions2[ReducerActions2["UPDATE_PACK_STATE"] = 7] = "UPDATE_PACK_STATE";
  ReducerActions2[ReducerActions2["PACK_COMPLETED"] = 8] = "PACK_COMPLETED";
  ReducerActions2[ReducerActions2["PACK_STARTED"] = 9] = "PACK_STARTED";
  ReducerActions2[ReducerActions2["SET_HARD_MODE"] = 10] = "SET_HARD_MODE";
  return ReducerActions2;
})(ReducerActions || {});
const FIORIContext = createContext(null);
const FIORIDispatchContext = createContext(null);
function addAmountSaved(state, action2) {
  return {
    ...state,
    amountSaved: state.amountSaved + action2.amount
  };
}
function addAmountLost(state, action2) {
  return {
    ...state,
    amountLost: state.amountLost + action2.amount
  };
}
function setCardPackActionState(state, action2) {
  if (state.action === action2.action) {
    return state;
  }
  if (!["NONE", "FLIP", "RIP", "END"].includes(action2.action)) {
    throw Error("Unknown action: " + action2.action);
  }
  return {
    ...state,
    action: action2.action
  };
}
function newPack(state, action2) {
  return {
    ...state,
    action: "RIP",
    amountSaved: state.amountSaved + action2.amountSaved,
    packState: state.packState.map((card) => {
      return card.id === action2.id ? { id: action2.id, status: "FLIPPED", rotation: 0, maskImage: -1 } : card;
    })
  };
}
function flipCard(state, action2) {
  return {
    ...state,
    action: "RIP",
    amountSaved: state.amountSaved + action2.amountSaved
  };
}
function ripCard(state, action2) {
  return {
    ...state,
    action: "FLIP",
    amountLost: state.amountLost + action2.amountLost,
    packState: state.packState.map((card) => {
      return card.id === action2.id ? { ...card, id: action2.id, status: "RIPPED" } : card;
    })
  };
}
function resetPackState(state, action2) {
  console.log("resetPackState", action2.size);
  const newState = initializeCardStateArray(action2.size);
  return {
    ...state,
    packState: newState
  };
}
function packCompleted(state) {
  return {
    ...state,
    packCompleted: true
  };
}
function packStarted(state) {
  return {
    ...state,
    action: "FLIP",
    packCompleted: false
  };
}
function setHardMode(state, action2) {
  return {
    ...state,
    hardMode: action2.hardMode
  };
}
function FIORIProvider({ children }) {
  const initialState = {
    action: "FLIP",
    amountLost: 0,
    amountSaved: 0,
    packCompleted: false,
    hardMode: false,
    packState: [{
      id: 0,
      status: "NONE",
      rotation: 0,
      maskImage: 0
    }]
  };
  const actionMap = /* @__PURE__ */ new Map([
    [ReducerActions.ADD_TO_SAVED, (state2, action2) => addAmountSaved(state2, action2)],
    [ReducerActions.ADD_TO_LOST, (state2, action2) => addAmountLost(state2, action2)],
    [ReducerActions.PACK_STATE, (state2, action2) => setCardPackActionState(state2, action2)],
    [ReducerActions.NEW_PACK, (state2, action2) => newPack(state2, action2)],
    [ReducerActions.FLIP_CARD, (state2, action2) => flipCard(state2, action2)],
    [ReducerActions.RIP_CARD, (state2, action2) => ripCard(state2, action2)],
    [ReducerActions.RESET_PACK_STATE, (state2, action2) => resetPackState(state2, action2)],
    [ReducerActions.PACK_COMPLETED, (state2, _) => packCompleted(state2)],
    [ReducerActions.PACK_STARTED, (state2, _) => packStarted(state2)],
    [ReducerActions.SET_HARD_MODE, (state2, action2) => setHardMode(state2, action2)]
  ]);
  function reducer(state2, { type, payload }) {
    const mappedAction = actionMap.get(type);
    if (!mappedAction) {
      console.warn("⚠️ No action found for type:", type);
      return state2;
    }
    return mappedAction(state2, payload);
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return /* @__PURE__ */ jsx(FIORIContext.Provider, { value: state, children: /* @__PURE__ */ jsx(FIORIDispatchContext.Provider, { value: dispatch, children }) });
}
function useFIORI() {
  return useContext(FIORIContext);
}
function useFIORIDispatch() {
  return useContext(FIORIDispatchContext);
}
function ValueLostBox() {
  const state = useFIORI();
  state.action === "RIP" || state.action === void 0;
  return /* @__PURE__ */ jsx("div", { className: "w-12 sm:w-24 grow-0 flex-basis-2", children: /* @__PURE__ */ jsxs("div", { className: ` flex flex-col items-center justify-center rounded-lg transition duration-150`, children: [
    /* @__PURE__ */ jsx("span", { className: "font-kanit text-2xl value-lost-box", children: centsToDollars(state.amountLost) }),
    /* @__PURE__ */ jsx("span", { className: `font-kanit text-4xl label transition duration-150`, children: "Lost" })
  ] }) });
}
function ValueSavedBox() {
  const state = useFIORI();
  state.action === "FLIP" || state.action === void 0;
  return /* @__PURE__ */ jsx("div", { className: "w-12 sm:w-24 grow-0 flex-basis-2", children: /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center justify-center rounded-lg transition duration-150`, children: [
    /* @__PURE__ */ jsx("span", { className: "font-kanit text-2xl value", children: centsToDollars(state.amountSaved) }),
    /* @__PURE__ */ jsx("span", { className: `font-kanit text-4xl label transition duration-150`, children: "Saved" })
  ] }) });
}
const fioriFirst = "/assets/FlipItHeader-xTgI1e2n.webp";
const fioriEnd = "/assets/RipItHeader-DynYGx9s.webp";
function FlipRipDisplay() {
  const state = useFIORI();
  const location = useLocation();
  let toFlip = state.action === "FLIP" || state.action === "END" || location.pathname == "/" || location.pathname == "/stats" || location.pathname == "/info" || location.pathname == "/settings";
  let toRip = state.action === "RIP" || state.action === "END" || location.pathname == "/" || location.pathname == "/stats" || location.pathname == "/info" || location.pathname == "/settings";
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row w-full md:gap-2 h-100 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full md:w-auto flex justify-center", children: /* @__PURE__ */ jsx("img", { fetchPriority: "high", className: `${toFlip ? "opacity-100" : "opacity-25"} h-25 w-auto object-contain transition duration-150`, src: fioriFirst, alt: "" }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full md:w-auto flex justify-center", children: /* @__PURE__ */ jsx("img", { fetchPriority: "high", className: `${toRip ? "opacity-100" : "opacity-25"} h-25 w-auto object-contain transition duration-150`, src: fioriEnd, alt: "" }) })
  ] }) });
}
function PlayAgainButton() {
  const dispatch = useFIORIDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  function updatePackState() {
    dispatch({
      type: ReducerActions.PACK_STARTED,
      payload: {}
    });
  }
  function buttonClick() {
    updatePackState();
    navigate(`/open?${searchParams.toString()}`, {
      replace: true
    });
  }
  return /* @__PURE__ */ jsx("button", { onClick: () => buttonClick(), className: "flex-basis-0 bg-green-500 hover:bg-green-400 active:bg-green-600 size-8 sm:size-24 rounded", children: /* @__PURE__ */ jsxs("div", { className: "object-center flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "40px", viewBox: "0 -960 960 960", width: "40px", fill: "#000000", children: /* @__PURE__ */ jsx("path", { d: "M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z" }) }),
    /* @__PURE__ */ jsx("div", { className: "text-xl text-black", children: "AGAIN" })
  ] }) });
}
function HomeButton() {
  const navigate = useNavigate();
  const dispatch = useFIORIDispatch();
  function updatePackState(state) {
    dispatch({
      type: ReducerActions.PACK_STATE,
      payload: {
        action: state
      }
    });
  }
  function buttonClick() {
    updatePackState("FLIP");
    navigate("/");
  }
  return /* @__PURE__ */ jsx("button", { onClick: () => buttonClick(), className: "bg-blue-500 hover:bg-blue-400 active:bg-blue-600 font-quicksand size-8 sm:size-24 rounded", children: /* @__PURE__ */ jsxs("div", { className: "object-center flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "40px", viewBox: "0 -960 960 960", width: "40px", fill: "#000000", children: /* @__PURE__ */ jsx("path", { d: "M226.67-186.67h140v-246.66h226.66v246.66h140v-380L480-756.67l-253.33 190v380ZM160-120v-480l320-240 320 240v480H526.67v-246.67h-93.34V-120H160Zm320-352Z" }) }),
    /* @__PURE__ */ jsx("div", { className: "text-xl", children: "HOME" })
  ] }) });
}
function Hidden({ children, unless }) {
  return /* @__PURE__ */ jsx("div", { children: unless ? children : /* @__PURE__ */ jsx("div", { className: "size-12 sm:size-24" }) });
}
function HardModeButton() {
  const dispatch = useFIORIDispatch();
  function buttonClick() {
    setHardMode2();
  }
  function setHardMode2() {
    dispatch({
      type: ReducerActions.SET_HARD_MODE,
      payload: {
        hardMode: false
      }
    });
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "https://ko-fi.com/Y8Y0ZKQZ1",
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: () => buttonClick(),
      className: "button flex-basis-0 bg-red-600 hover:bg-red-500 active:bg-red-700 size-24 rounded flex flex-col justify-center object-center",
      children: /* @__PURE__ */ jsxs("div", { className: "object-center flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "40px", viewBox: "0 -960 960 960", width: "40px", fill: "#000000", children: /* @__PURE__ */ jsx("path", { d: "M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-xl text-black", children: "PAY UP" })
      ] })
    }
  );
}
function HeaderContainer({ changeValue }) {
  const state = useFIORI();
  const path = useLocation();
  let packGenerated = path.pathname === "/open";
  let packFullyOpened = state.action === "END";
  return /* @__PURE__ */ jsxs("div", { className: "place-content-evenly flex items-center flex-row gap-2 sm:gap-6 m-4", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx(Hidden, { unless: packFullyOpened, children: /* @__PURE__ */ jsx(HomeButton, {}) }) }),
    /* @__PURE__ */ jsx("div", { className: "mx-6 sm:mx-0", children: /* @__PURE__ */ jsx(Hidden, { unless: packGenerated, children: /* @__PURE__ */ jsx(ValueSavedBox, {}) }) }),
    /* @__PURE__ */ jsx(FlipRipDisplay, {}),
    /* @__PURE__ */ jsx("div", { className: "mx-6 sm:mx-0", children: /* @__PURE__ */ jsx(Hidden, { unless: packGenerated, children: /* @__PURE__ */ jsx(ValueLostBox, {}) }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx(Hidden, { unless: packFullyOpened, children: state.hardMode ? /* @__PURE__ */ jsx(HardModeButton, {}) : /* @__PURE__ */ jsx(PlayAgainButton, {}) }) })
  ] });
}
function LoadingBox() {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "animate-bounce border-black border-2  min-h-50 p-4 m-4  rounded-full" }),
    /* @__PURE__ */ jsx("div", { className: "animate-bounce animation-delay-200 border-blue-600 border-2 bg-blue-600 min-h-50 p-4 m-4 rounded-full" }),
    /* @__PURE__ */ jsx("div", { className: "animate-bounce animation-delay-400 border-black border-2 bg-black min-h-50 p-4 m-4 rounded-full" }),
    /* @__PURE__ */ jsx("div", { className: "animate-bounce animation-delay-600 border-red-600 border-2 bg-red-600 min-h-50 p-4 m-4 rounded-full" }),
    /* @__PURE__ */ jsx("div", { className: "animate-bounce animation-delay-800 border-green-800 border-2 bg-green-800 min-h-50 p-4 m-4 rounded-full" })
  ] });
}
const links = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: "/fiori_favicon_64.png",
    type: "image/png"
  },
  {
    rel: "canonical",
    href: "https://flipitorripit.com"
  },
  {
    rel: "preload",
    href: "/images/FlipItHeader.webp",
    as: "image",
    type: "image/webp",
    imagesrcset: "/images/FlipItHeader.webp",
    fetchpriority: "high"
  },
  {
    rel: "preload",
    href: "/images/RipItHeader.webp",
    as: "image",
    type: "image/webp",
    imagesrcset: "/images/FlipItHeader.webp",
    fetchpriority: "high"
  },
  {
    rel: "preload",
    href: "/fonts/Quicksand/static/Quicksand-Bold.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous"
  },
  {
    rel: "preload",
    href: "/fonts/Quicksand/static/Quicksand-Regular.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous"
  },
  {
    rel: "preconnect",
    href: "https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com"
  }
];
const meta = () => {
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
function App() {
  const [changeValue, setChangeValue] = useState(100);
  const navigate = useNavigation();
  const outletFunctions = {
    changeValue
  };
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsx("body", { className: "w-full bg-stone-200", children: /* @__PURE__ */ jsxs(FIORIProvider, { children: [
      /* @__PURE__ */ jsx(
        HeaderContainer,
        {
          changeValue
        }
      ),
      navigate.state === "loading" ? /* @__PURE__ */ jsx(LoadingBox, {}) : /* @__PURE__ */ jsx(Outlet, { context: { ...outletFunctions } }),
      /* @__PURE__ */ jsx(Analytics, {}),
      /* @__PURE__ */ jsx(SpeedInsights, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] }) })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links,
  meta
}, Symbol.toStringTag, { value: "Module" }));
async function loader$5({ request }) {
  const url = new URL(request.url);
  const set = url.searchParams.get("set");
  const pack_type = url.searchParams.get("pack-type");
  invariant(typeof set === "string", "set is required");
  invariant(typeof pack_type === "string", "pack-type is required");
  const api_url = "https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod";
  console.log("QWEQQWEQWWE");
  const responsePromise = fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "set": set,
      "pack_type": pack_type
    })
  });
  const safePromise = responsePromise.then((data) => {
    if (data === void 0) return null;
    return data;
  });
  return defer({ data: safePromise });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const A25 = [
  "draft"
];
const AER = [
  "draft",
  "prerelease"
];
const AFR = [
  "arena",
  "collector",
  "draft",
  "prerelease",
  "set",
  "theme-b",
  "theme-dungeons",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-w"
];
const AKH = [
  "draft",
  "prerelease"
];
const ALA = [
  "draft",
  "premium",
  "tournament"
];
const ALL = [
  "default"
];
const APC = [
  "draft",
  "fat-pack"
];
const ARB = [
  "draft",
  "six"
];
const ARN = [
  "default"
];
const ATQ = [
  "default"
];
const AVR = [
  "draft",
  "six"
];
const BFZ = [
  "draft",
  "prerelease"
];
const BNG = [
  "draft"
];
const BOK = [
  "draft",
  "fat-pack"
];
const BRO = [
  "arena",
  "collector",
  "collector-sample",
  "draft",
  "jumpstart",
  "prerelease",
  "set"
];
const CHK = [
  "draft",
  "fat-pack",
  "tournament"
];
const CMM = [
  "collector",
  "collector-sample",
  "draft",
  "set"
];
const CSP = [
  "draft"
];
const DGM = [
  "draft",
  "six"
];
const DIS = [
  "draft"
];
const DKA = [
  "draft",
  "six"
];
const DMR = [
  "collector",
  "draft"
];
const DMU = [
  "arena",
  "box-topper",
  "collector",
  "collector-sample",
  "draft",
  "jumpstart",
  "prerelease",
  "set"
];
const DOM = [
  "arena",
  "draft",
  "prerelease",
  "theme-b",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-w"
];
const DRK = [
  "default"
];
const DST = [
  "draft",
  "fat-pack"
];
const DTK = [
  "draft",
  "fat-pack"
];
const ELD = [
  "arena",
  "collector",
  "draft",
  "prerelease",
  "theme-b",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-w"
];
const EMA = [
  "draft"
];
const EMN = [
  "draft",
  "prerelease"
];
const EVE = [
  "draft"
];
const EXO = [
  "draft"
];
const FEM = [
  "default"
];
const FRF = [
  "draft"
];
const FUT = [
  "draft"
];
const GRN = [
  "arena",
  "draft",
  "theme-boros",
  "theme-dimir",
  "theme-golgari",
  "theme-izzet",
  "theme-selesnya"
];
const GTC = [
  "draft",
  "prerelease-boros",
  "prerelease-dimir",
  "prerelease-gruul",
  "prerelease-orzhov",
  "prerelease-simic",
  "six"
];
const HML = [
  "default"
];
const HOU = [
  "draft",
  "prerelease"
];
const ICE = [
  "default",
  "starter"
];
const IKO = [
  "arena",
  "box-topper",
  "collector",
  "collector-jp",
  "draft",
  "jp",
  "prerelease",
  "theme-b",
  "theme-g",
  "theme-monsters",
  "theme-r",
  "theme-u",
  "theme-w"
];
const IMA = [
  "draft"
];
const INV = [
  "draft",
  "fat-pack",
  "tournament"
];
const ISD = [
  "draft",
  "six"
];
const JOU = [
  "draft"
];
const JUD = [
  "draft",
  "fat-pack"
];
const KHM = [
  "arena",
  "collector",
  "draft",
  "prerelease",
  "set",
  "theme-b",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-vikings",
  "theme-w"
];
const KLD = [
  "draft",
  "prerelease"
];
const KTK = [
  "arena",
  "draft"
];
const LCI = [
  "arena",
  "box-topper",
  "box-topper-foil",
  "bundle-promo",
  "collector",
  "collector-sample",
  "draft",
  "gift-bundle-promo",
  "prerelease",
  "set"
];
const LEA = [
  "default",
  "starter"
];
const LEB = [
  "default",
  "starter"
];
const LEG = [
  "default"
];
const LGN = [
  "draft",
  "fat-pack"
];
const LRW = [
  "draft",
  "tournament"
];
const LTR = [
  "arena",
  "box-topper",
  "collector",
  "collector-sample",
  "collector-special",
  "draft",
  "jumpstart",
  "jumpstart-v2",
  "prerelease",
  "set"
];
const M10 = [
  "draft",
  "six"
];
const M11 = [
  "draft",
  "six"
];
const M12 = [
  "draft",
  "six"
];
const M13 = [
  "draft",
  "six"
];
const M14 = [
  "draft",
  "six"
];
const M15 = [
  "draft"
];
const M19 = [
  "arena",
  "draft",
  "prerelease"
];
const M20 = [
  "arena",
  "draft",
  "prerelease",
  "theme-b",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-w"
];
const M21 = [
  "arena",
  "collector",
  "draft",
  "prerelease"
];
const MAT = [
  "arena",
  "collector",
  "default"
];
const MB1 = [
  "convention",
  "convention-2021",
  "draft"
];
const MBS = [
  "draft",
  "six"
];
const MH1 = [
  "draft"
];
const MH2 = [
  "collector",
  "draft",
  "set"
];
const MH3 = [
  "collector",
  "play"
];
const MID = [
  "arena",
  "collector",
  "draft",
  "prerelease",
  "set",
  "theme-b",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-w",
  "theme-werewolves"
];
const MIR = [
  "draft",
  "starter"
];
const MKM = [
  "collector",
  "play",
  "play-arena"
];
const MM2 = [
  "draft"
];
const MM3 = [
  "draft"
];
const MMA = [
  "draft"
];
const MMQ = [
  "draft",
  "fat-pack",
  "tournament"
];
const MOM = [
  "arena",
  "collector",
  "collector-sample",
  "draft",
  "jumpstart",
  "prerelease",
  "set"
];
const MOR = [
  "draft"
];
const MRD = [
  "draft",
  "fat-pack",
  "tournament"
];
const NEM = [
  "draft",
  "fat-pack"
];
const NEO = [
  "arena",
  "collector",
  "draft",
  "prerelease",
  "set",
  "theme-b",
  "theme-g",
  "theme-ninjas",
  "theme-r",
  "theme-u",
  "theme-w"
];
const NPH = [
  "draft",
  "six"
];
const ODY = [
  "draft",
  "fat-pack",
  "tournament"
];
const OGW = [
  "draft"
];
const ONE = [
  "arena",
  "collector",
  "collector-sample",
  "compleat",
  "draft",
  "jumpstart",
  "prerelease",
  "set"
];
const ONS = [
  "draft",
  "fat-pack",
  "tournament"
];
const ORI = [
  "draft"
];
const OTJ = [
  "collector",
  "collector-sample",
  "play"
];
const PCY = [
  "draft",
  "fat-pack"
];
const PLC = [
  "draft"
];
const PLS = [
  "draft",
  "fat-pack"
];
const RAV = [
  "draft",
  "tournament"
];
const RIX = [
  "arena",
  "draft"
];
const RNA = [
  "arena",
  "draft",
  "theme-azorius",
  "theme-gruul",
  "theme-orzhov",
  "theme-rakdos",
  "theme-simic"
];
const ROE = [
  "draft",
  "six"
];
const RTR = [
  "draft",
  "prerelease-azorius",
  "prerelease-golgari",
  "prerelease-izzet",
  "prerelease-rakdos",
  "prerelease-selesnya",
  "six"
];
const RVR = [
  "collector",
  "draft"
];
const SCG = [
  "draft",
  "fat-pack"
];
const SHM = [
  "draft",
  "tournament"
];
const SNC = [
  "arena",
  "collector",
  "collector-sample",
  "draft",
  "prerelease-brokers",
  "prerelease-cabaretti",
  "prerelease-maestros",
  "prerelease-obscura",
  "prerelease-riveteers",
  "set",
  "theme-brokers",
  "theme-cabaretti",
  "theme-maestros",
  "theme-obscura",
  "theme-riveteers"
];
const SOI = [
  "draft"
];
const SOK = [
  "draft",
  "fat-pack"
];
const SOM = [
  "draft",
  "six"
];
const STH = [
  "draft"
];
const STX = [
  "arena",
  "collector",
  "draft",
  "jp",
  "set",
  "set-jp",
  "theme-lorehold",
  "theme-prismari",
  "theme-quandrix",
  "theme-silverquill",
  "theme-witherbloom"
];
const THB = [
  "arena",
  "collector",
  "draft",
  "theme-b",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-w"
];
const THS = [
  "draft"
];
const TMP = [
  "draft",
  "starter"
];
const TOR = [
  "draft",
  "fat-pack"
];
const TSP = [
  "draft"
];
const TSR = [
  "draft"
];
const UDS = [
  "draft"
];
const UGL = [
  "draft"
];
const ULG = [
  "draft"
];
const UMA = [
  "box-topper",
  "draft"
];
const UNF = [
  "box-topper",
  "collector",
  "draft"
];
const USG = [
  "draft",
  "tournament"
];
const UST = [
  "draft"
];
const VIS = [
  "draft"
];
const VOW = [
  "arena",
  "box-topper",
  "collector",
  "draft",
  "prerelease",
  "set",
  "theme-b",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-vampires",
  "theme-w"
];
const WAR = [
  "arena",
  "draft",
  "jp",
  "prerelease",
  "theme-b",
  "theme-g",
  "theme-r",
  "theme-u",
  "theme-w"
];
const WOE = [
  "arena",
  "collector",
  "collector-sample",
  "draft",
  "prerelease",
  "set"
];
const WTH = [
  "draft"
];
const WWK = [
  "draft",
  "six"
];
const XLN = [
  "arena",
  "draft",
  "prerelease"
];
const ZEN = [
  "draft",
  "six"
];
const ZNR = [
  "arena",
  "collector",
  "draft",
  "prerelease",
  "set",
  "theme-b",
  "theme-g",
  "theme-party",
  "theme-r",
  "theme-u",
  "theme-w"
];
const packTypesJson = {
  "10E": [
    "draft"
  ],
  "2ED": [
    "default",
    "starter"
  ],
  "2X2": [
    "collector",
    "draft"
  ],
  "2XM": [
    "box-topper",
    "draft",
    "vip"
  ],
  "3ED": [
    "default",
    "starter"
  ],
  "4ED": [
    "default",
    "starter"
  ],
  "5DN": [
    "draft",
    "fat-pack"
  ],
  "5ED": [
    "draft",
    "starter"
  ],
  "6ED": [
    "draft",
    "tournament"
  ],
  "7ED": [
    "draft"
  ],
  "8ED": [
    "draft"
  ],
  "9ED": [
    "draft"
  ],
  A25,
  AER,
  AFR,
  AKH,
  ALA,
  ALL,
  APC,
  ARB,
  ARN,
  ATQ,
  AVR,
  BFZ,
  BNG,
  BOK,
  BRO,
  CHK,
  CMM,
  CSP,
  DGM,
  DIS,
  DKA,
  DMR,
  DMU,
  DOM,
  DRK,
  DST,
  DTK,
  ELD,
  EMA,
  EMN,
  EVE,
  EXO,
  FEM,
  FRF,
  FUT,
  GRN,
  GTC,
  HML,
  HOU,
  ICE,
  IKO,
  IMA,
  INV,
  ISD,
  JOU,
  JUD,
  KHM,
  KLD,
  KTK,
  LCI,
  LEA,
  LEB,
  LEG,
  LGN,
  LRW,
  LTR,
  M10,
  M11,
  M12,
  M13,
  M14,
  M15,
  M19,
  M20,
  M21,
  MAT,
  MB1,
  MBS,
  MH1,
  MH2,
  MH3,
  MID,
  MIR,
  MKM,
  MM2,
  MM3,
  MMA,
  MMQ,
  MOM,
  MOR,
  MRD,
  NEM,
  NEO,
  NPH,
  ODY,
  OGW,
  ONE,
  ONS,
  ORI,
  OTJ,
  PCY,
  PLC,
  PLS,
  RAV,
  RIX,
  RNA,
  ROE,
  RTR,
  RVR,
  SCG,
  SHM,
  SNC,
  SOI,
  SOK,
  SOM,
  STH,
  STX,
  THB,
  THS,
  TMP,
  TOR,
  TSP,
  TSR,
  UDS,
  UGL,
  ULG,
  UMA,
  UNF,
  USG,
  UST,
  VIS,
  VOW,
  WAR,
  WOE,
  WTH,
  WWK,
  XLN,
  ZEN,
  ZNR
};
async function loader$4() {
  const response = await fetch("https://api.scryfall.com/sets");
  const data = await response.json();
  invariant(data, "Missing data from scryfall");
  const packSetTypes = ["core", "expansion", "draft_innovation", "masters", "funny", "remastered"];
  const packSets = data.data.filter((set) => packSetTypes.includes(set.set_type)).filter((set) => set.code.length === 3).filter((set) => Object.keys(packTypesJson).includes(set.code.toUpperCase())).map((set) => {
    return {
      setCode: set.code.toUpperCase(),
      setName: set.name
    };
  });
  return json(packSets);
}
async function action$1() {
  const response = await fetch("https://api.scryfall.com/sets");
  const data = await response.json();
  invariant(data, "Missing data from scryfall");
  const packSetTypes = ["core", "expansion", "draft_innovation", "masters", "funny", "remastered"];
  const packSets = data.data.filter((set) => packSetTypes.includes(set.set_type)).filter((set) => set.code.length === 3).filter((set) => Object.keys(packTypesJson).includes(set.code.toUpperCase())).map((set) => {
    return {
      setCode: set.code.toUpperCase(),
      setName: set.name
    };
  });
  return json(packSets);
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async () => {
  const baseUrl = "https://www.flipitorripit.com";
  const today = (/* @__PURE__ */ new Date()).toISOString();
  const pages = [
    { path: "", lastmod: today, priority: "1.0", changefreq: "weekly" },
    { path: "open", lastmod: today, priority: "0.9", changefreq: "monthly" },
    { path: "stats", lastmod: today, priority: "0.8", changefreq: "monthly" },
    { path: "settings", lastmod: today, priority: "0.8", changefreq: "monthly" },
    { path: "info", lastmod: today, priority: "0.7", changefreq: "monthly" }
  ];
  const urlEntries = pages.map((page) => `
  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400"
    }
  });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async () => {
  const content = `User-agent: *
Allow: /
Sitemap: https://flipitorripit.com/sitemap.xml`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600"
    }
  });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function StatsTableBase({ title, data }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-center font-quicksand m-4 text-4xl", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "center grid grid-cols-4 divide-solid border-black border-2 rounded m-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-sky-200 text-center font-quicksand col-span-1", children: "Ranking" }),
      /* @__PURE__ */ jsx("div", { className: "bg-sky-200 border-x-2 border-gray-400 text-center font-quicksand col-span-2 w-50", children: /* @__PURE__ */ jsx("b", { children: "Card Name" }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-sky-200 text-center font-quicksand col-span-1", children: "Total Amount Lost" }),
      data.map((stat, index) => {
        const rowStyle = index % 2 === 0 ? "bg-white" : "bg-sky-100";
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: `${rowStyle} text-center font-quicksand col-span-1`, children: index }),
          /* @__PURE__ */ jsx("div", { className: `${rowStyle} border-x-2 border-gray-400 text-center font-quicksand col-span-2 w-50`, children: /* @__PURE__ */ jsx("b", { children: stat.name }) }),
          /* @__PURE__ */ jsx("div", { className: `${rowStyle} text-center font-quicksand col-span-1`, children: centsToDollars(stat.value) })
        ] });
      })
    ] })
  ] });
}
function PersonalStats() {
  const stats = [{ name: "card1", value: 1 }, { name: "card2", value: 2 }, { name: "card3", value: 3 }, { name: "card4", value: 465 }, { name: "card5", value: 5 }];
  const [data, setData] = useState(stats);
  return /* @__PURE__ */ jsx(StatsTableBase, { title: "Personal Stats", data });
}
function GlobalStats() {
  const stats = [{ name: "card1", value: 1 }, { name: "card2", value: 2 }, { name: "card3", value: 3 }, { name: "card4", value: 465 }, { name: "card5", value: 5 }];
  const [data, setData] = useState(stats);
  return /* @__PURE__ */ jsx(StatsTableBase, { title: "Global Stats", data });
}
function Stats() {
  useNavigate();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "text-4xl", children: "Congrats! you found the test page. you get a free pack opening." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-2/5 ", children: /* @__PURE__ */ jsx(PersonalStats, {}) }),
      /* @__PURE__ */ jsx("div", { className: "w-2/5 ", children: /* @__PURE__ */ jsx(GlobalStats, {}) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "object-center", children: /* @__PURE__ */ jsx(HomeButton, {}) })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Stats
}, Symbol.toStringTag, { value: "Module" }));
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function Settings() {
  const dispatch = useFIORIDispatch();
  const state = useFIORI();
  return /* @__PURE__ */ jsxs("div", { className: "text-xl text-center center m-10 flex items-center flex-col", children: [
    /* @__PURE__ */ jsx("button", { onClick: () => setHardMode2(), disabled: state.hardMode, className: "m-4 bg-red-700 hover:not-disabled:bg-red-600 active:not-disabled:bg-red-800 disabled:bg-gray-500 rounded p-4 strong", children: "Hard Mode" }, "hard"),
    /* @__PURE__ */ jsx(HomeButton, {})
  ] });
  function setHardMode2() {
    dispatch({
      type: ReducerActions.SET_HARD_MODE,
      payload: {
        hardMode: true
      }
    });
  }
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Settings
}, Symbol.toStringTag, { value: "Module" }));
function formatBoosterType(type) {
  const words = type.split("-");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}
function PackSelector() {
  const packSetTypes = useLoaderData();
  Object.getOwnPropertyNames(packSetTypes).map(
    (key) => {
      return { [key]: packSetTypes[key] };
    }
  );
  const [selectedSet, setSelectedSet] = useState("");
  const setKeys = Object.keys(packSetTypes).sort((a, b) => packSetTypes[a]["releaseDate"] < packSetTypes[b]["releaseDate"] ? 1 : -1);
  function generateSetTypes(set) {
    return packSetTypes[set]["boosterTypes"].map((type) => /* @__PURE__ */ jsx("option", { value: type, children: formatBoosterType(type) }, type));
  }
  return /* @__PURE__ */ jsx(Form, { action: "/open", method: "get", className: "", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 h-24 w-72", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-2 flex flex-col flex-shrink-1", children: [
      /* @__PURE__ */ jsxs(
        "select",
        {
          className: "m-1 grow rounded",
          id: "set",
          name: "set",
          defaultValue: "-",
          onChange: (e) => {
            setSelectedSet(e.target.value);
          },
          children: [
            /* @__PURE__ */ jsx("option", { disabled: true, value: "-", children: "Pick a Magic Set!" }, "-"),
            setKeys.map((set) => /* @__PURE__ */ jsxs("option", { value: set, children: [
              set,
              " - ",
              packSetTypes[set]["name"]
            ] }, set))
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "select",
        {
          className: "m-1 grow rounded",
          id: "pack-type",
          name: "pack-type",
          disabled: selectedSet === "",
          children: selectedSet === "" ? /* @__PURE__ */ jsx("option", { value: "-", children: "-" }, "-") : generateSetTypes(selectedSet)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("button", { className: "m-1 bg-green-500 disabled:grayscale hover:not-disabled:bg-green-400 active:not-disabled:bg-green-600 rounded", disabled: selectedSet == "", type: "submit", children: [
      /* @__PURE__ */ jsx("div", { className: "object-center flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "40px", viewBox: "0 -960 960 960", width: "40px", fill: "#000000", children: /* @__PURE__ */ jsx("path", { d: "M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "text-xl text-black", children: "OPEN" })
    ] })
  ] }) });
}
async function loader$1() {
  console.log("data");
  const response = await fetch("https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod/flip-or-rip-lambda/sets").then(async (res) => {
    const data = await res.json();
    console.log(data);
    return data.body;
  });
  invariant(response, "Missing data from scryfall");
  return response;
}
function Index() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { className: "bg-stone-200", children: [
    /* @__PURE__ */ jsx("div", { className: "center m-2", children: /* @__PURE__ */ jsxs("div", { className: "text-center font-quicksand content-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-center text-xl", children: /* @__PURE__ */ jsx(PackSelector, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "sm:px-24 md:px-36 text-center", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-md italic", children: [
          "Choose a ",
          /* @__PURE__ */ jsx("span", { className: "underline", children: "Magic Set" }),
          " and ",
          /* @__PURE__ */ jsx("span", { className: "underline", children: "Booster Type" }),
          ".",
          /* @__PURE__ */ jsx("br", {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl w-3/4 md:w-1/2 underline text-left", children: [
            /* @__PURE__ */ jsx("br", {}),
            "HOW TO PLAY"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-3xl w-3/4 md:w-1/2 text-left", children: [
            /* @__PURE__ */ jsx("span", { className: "italic", children: "1)" }),
            " Open a pack of cards, shuffle them face down.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "italic", children: "2)" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-green-600 font-bold", children: "FLIP" }),
            " a card face up and ",
            /* @__PURE__ */ jsx("span", { className: "underline decoration-dashed decoration-green-500", children: "keep" }),
            " it.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "italic", children: "3)" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-red-800 font-bold", children: "RIP" }),
            " a card and ",
            /* @__PURE__ */ jsx("span", { className: "underline decoration-solid decoration-red-700", children: "destroy" }),
            " it forever.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "italic", children: "4)" }),
            " Repeat 2 and 3 until all cards are gone."
          ] })
        ] }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("div", { className: "text-lg", children: [
          "Engaging in this activity with real cards is exhilarating, and disgusting.",
          /* @__PURE__ */ jsx("br", {}),
          " This website lets you simulate that experience.",
          /* @__PURE__ */ jsx("br", {})
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-center gap-2 pb-4", children: [
      /* @__PURE__ */ jsx("button", { className: "disabled bg-amber-500 grayscale font-quicksand p-4 md:p-8 pb-2 rounded", children: /* @__PURE__ */ jsxs("div", { className: "object-center flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "40px", viewBox: "0 -960 960 960", width: "40px", fill: "#000000", children: /* @__PURE__ */ jsx("path", { d: "M146.67-186.67h178v-346.66h-178v346.66Zm244.66 0h177.34v-586.66H391.33v586.66Zm244 0h178v-266.66h-178v266.66ZM80-120v-480h244.67v-240h310.66v320H880v400H80Z" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-xl", children: "STATS" }),
        /* @__PURE__ */ jsx("div", { className: "text-md", children: "(soon!)" })
      ] }) }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate("/info"), className: "bg-red-500 hover:bg-red-400 active:bg-red-600 font-quicksand p-4 md:p-8 rounded", children: /* @__PURE__ */ jsxs("div", { className: "object-center flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "40px", viewBox: "0 -960 960 960", width: "40px", fill: "#000000", children: /* @__PURE__ */ jsx("path", { d: "M448.67-280h66.66v-240h-66.66v240Zm31.32-316q15.01 0 25.18-9.97 10.16-9.96 10.16-24.7 0-15.3-10.15-25.65-10.16-10.35-25.17-10.35-15.01 0-25.18 10.35-10.16 10.35-10.16 25.65 0 14.74 10.15 24.7 10.16 9.97 25.17 9.97Zm.19 516q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-xl", children: "INFO" })
      ] }) }),
      /* @__PURE__ */ jsx("button", { onClick: () => navigate("/settings"), className: "bg-slate-400 hover:bg-slate-300 active:bg-slate-500 font-quicksand p-4 md:p-8 rounded", children: /* @__PURE__ */ jsxs("div", { className: "object-center flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "40px", viewBox: "0 -960 960 960", width: "40px", fill: "#000000", children: /* @__PURE__ */ jsx("path", { d: "m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm55.33-66.67h85l14-110q32.34-8 60.84-24.5T649-321l103.67 44.33 39.66-70.66L701-415q4.33-16 6.67-32.17Q710-463.33 710-480q0-16.67-2-32.83-2-16.17-7-32.17l91.33-67.67-39.66-70.66L649-638.67q-22.67-25-50.83-41.83-28.17-16.83-61.84-22.83l-13.66-110h-85l-14 110q-33 7.33-61.5 23.83T311-639l-103.67-44.33-39.66 70.66L259-545.33Q254.67-529 252.33-513 250-497 250-480q0 16.67 2.33 32.67 2.34 16 6.67 32.33l-91.33 67.67 39.66 70.66L311-321.33q23.33 23.66 51.83 40.16 28.5 16.5 60.84 24.5l13.66 110Zm43.34-200q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39ZM480-480Z" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-xl", children: "SETTINGS" })
      ] }) })
    ] })
  ] });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function Info() {
  const [showNotification, setShowNotification] = React.useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText("robert.gugliel@gmail.com").then(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2e3);
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "center m-10", children: /* @__PURE__ */ jsxs("div", { className: "text-center font-quicksand text-xl", children: [
    /* @__PURE__ */ jsx("b", { children: "Flip It Or Rip It" }),
    " is a made using React, Remix, Tailwind, and deployed on Docker. ",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "If you enjoy clicking around her, donate to me on ",
    /* @__PURE__ */ jsx("a", { className: "text-blue-500 underline", target: "_blank", href: "https://ko-fi.com/robertguglielmino", children: "Ko-Fi." }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Have a feature suggestion/bug report? Send me an email - ",
    /* @__PURE__ */ jsx("span", { onClick: () => {
      copyToClipboard();
    }, className: "cursor-pointer text-blue-500 underline", children: "robert.gugliel@gmail.com" }),
    " ",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Code available here - ",
    /* @__PURE__ */ jsx("a", { className: "text-blue-500 underline", target: "_blank", rel: "noopener noreferrer", href: "https://github.com/RobertGuglielmino/fiori-remix", children: "GitHub Link" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(HomeButton, {}),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `
                    fixed top-4 right-4 
                    bg-green-500 text-white px-3 py-1 rounded shadow-lg
                    flex items-center space-x-1
                    transition-all duration-300 z-50
                    ${showNotification ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                    `,
        children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
          /* @__PURE__ */ jsx("span", { children: "Copied!" })
        ]
      }
    )
  ] }) });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Info
}, Symbol.toStringTag, { value: "Module" }));
function EnhancedCard({ src, alt, handleCardClick }) {
  const [style, setStyle] = useState({});
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const isHoveringRef = useRef(false);
  const maxTilt = 15;
  const handleMouseMove = useCallback((e) => {
    if (!isHoveringRef.current || !cardRef.current) return;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (mouseY - centerY) / centerY * -15;
        const rotateY = (mouseX - centerX) / centerX * maxTilt;
        setStyle({
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
        });
      }
    });
  }, []);
  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    setStyle({
      transform: "translateZ(20px) scale(1.02)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
    });
  }, []);
  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setStyle({
      transform: "",
      boxShadow: ""
    });
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "relative w-full h-full relative", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: cardRef,
      className: "w-full h-full rounded-lg shadow-xl overflow-hidden transition-all duration-200 ease-out",
      style: {
        ...style,
        transformStyle: "preserve-3d",
        willChange: "transform"
      },
      onMouseEnter: handleMouseEnter,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: alt || "Interactive image",
          className: `w-full h-full object-cover `,
          loading: "lazy",
          onClick: () => handleCardClick()
        }
      )
    }
  ) });
}
const cardBack = "/assets/mtg_back-xLlnET8g.png";
function RippedCard({
  maskImage,
  maskPosition,
  src
}) {
  const MASK_IMAGES = [
    `mask-image-[url(/images/masks/mask1.png)]`,
    `mask-image-[url(/images/masks/mask2.png)]`,
    `mask-image-[url(/images/masks/mask3.png)]`,
    `mask-image-[url(/images/masks/mask4.png)]`,
    `mask-image-[url(/images/masks/mask5.png)]`
  ];
  return /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: /* @__PURE__ */ jsx(
    "img",
    {
      src,
      loading: "lazy",
      className: `w-full h-full object-cover relative overflow-hidden rounded-xl transition-all duration-500 scale-90 grayscale rotate-[3deg] rayscale ${MASK_IMAGES[maskImage]} scale-[90%] mask-position-[50%_50%] mask-size-cover`
    }
  ) });
}
function FlippedCard({ src, alt, foil }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full relative", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt: alt || "Interactive image",
        className: `w-full h-full object-cover rounded-xl`,
        loading: "lazy"
      }
    ),
    foil && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-foil-ray bg-400 animate-foil pointer-events-none rounded-lg" })
  ] });
}
function CardContainer({ name, cents, image, cf_image, status, foil, rotation, maskImage, handleCardClick }) {
  const [maskPosition, setMaskPosition] = useState("25%_25%");
  useEffect(() => {
    const frontImage = new Image();
    frontImage.src = cf_image;
    const backImage = new Image();
    backImage.src = cardBack;
  }, [cf_image]);
  let revealed = status === "FLIPPED" || status === "RIPPED";
  const nonBreakingSpace = " ";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center rounded-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute top-0 left-0 w-full h-full transition-opacity duration-200 ${status === "NONE" ? "opacity-100 z-10" : "opacity-0 z-0"}`,
          children: /* @__PURE__ */ jsx(
            EnhancedCard,
            {
              src: cardBack,
              alt: "Card Back",
              handleCardClick
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute top-0 left-0 w-full h-full transition-opacity duration-200 ${status === "FLIPPED" ? "opacity-100 z-10" : "opacity-0 z-0"}`,
          children: /* @__PURE__ */ jsx(
            FlippedCard,
            {
              src: cf_image,
              alt: name,
              foil
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute top-0 left-0 w-full h-full transition-opacity duration-100 ${status === "RIPPED" ? "scale-80 opacity-100 z-10" : "opacity-0 z-0"}`,
          children: /* @__PURE__ */ jsx(
            RippedCard,
            {
              src: cf_image,
              maskImage,
              maskPosition
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "invisible", children: /* @__PURE__ */ jsx(
        EnhancedCard,
        {
          src: cardBack,
          alt: "placeholder",
          handleCardClick: () => {
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "font-kanit text-center text-sm", children: revealed ? name : nonBreakingSpace }),
    /* @__PURE__ */ jsx("div", { className: "font-kanit text-center text-sm", children: revealed ? centsToDollars(cents) : nonBreakingSpace })
  ] });
}
const getUserId = void 0;
async function sendStatsData(packState, userId, packId) {
  await fetch("https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod/flip-or-rip-lambda/stats", {
    method: "POST",
    body: JSON.stringify({
      "cardStatusList": packState,
      "userId": userId,
      "packId": packId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(async (res) => {
    const data = await res.json();
    console.log("Loader data received:", data);
    return data;
  });
}
function CardGrid() {
  const dispatch = useFIORIDispatch();
  const state = useFIORI();
  const loaderData = useLoaderData()["body"];
  const cards = loaderData["cards"];
  const packId = loaderData["packId"];
  const [packState, setPackState] = useState(initializeCardStateArray$1(cards.length));
  const handleCardClick = (id, action2) => {
    switch (action2) {
      case "FLIP":
        flipCard2(id);
        break;
      case "RIP":
        ripCard2(id);
        break;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center sm:px-4 sm:px-8 lg:px-4 2xl:px-0 py-4", children: cards.map((card, index) => {
    return /* @__PURE__ */ jsx("div", { className: "grow-0 shrink basis-[30vw] sm:basis-[20vw]  lg:basis-[14vw] xl:basis-[12vw] p-2", children: /* @__PURE__ */ jsx(
      CardContainer,
      {
        index,
        ...card,
        status: packState[index].status,
        foil: cards[index].foil,
        rotation: packState[index].rotation,
        maskImage: packState[index].maskImage,
        handleCardClick: () => handleCardClick(index, state.action)
      },
      cards[index].scryfallId
    ) });
  }) });
  function flipCard2(id) {
    const amount = cards[id]["cents"];
    setPackState(
      packState.map((card) => {
        return card.id === id ? { id, status: "FLIPPED", rotation: 0, maskImage: -1 } : card;
      })
    );
    dispatch({
      type: ReducerActions.FLIP_CARD,
      payload: {
        amountSaved: amount
      }
    });
    cardStateHandler();
  }
  function ripCard2(id) {
    const amount = cards[id]["cents"];
    const rotation = packState[id]["rotation"];
    const maskImage = packState[id]["maskImage"];
    setPackState(
      packState.map((card) => {
        return card.id === id ? { id, status: "RIPPED", rotation, maskImage } : card;
      })
    );
    dispatch({
      type: ReducerActions.RIP_CARD,
      payload: {
        amountLost: amount
      }
    });
    cardStateHandler();
  }
  function cardStateHandler() {
    if (allCardsTouched(packState)) {
      console.log("All cards have been flipped or ripped");
      handleNewPack();
      handlePackCompletion();
      sendStatsData(packState, getUserId(), packId);
    }
  }
  function handleNewPack() {
    dispatch({
      type: ReducerActions.PACK_STATE,
      payload: {
        action: "END"
      }
    });
  }
  function handlePackCompletion() {
    dispatch({
      type: ReducerActions.PACK_COMPLETED,
      payload: {}
    });
  }
}
function initializeCardStateArray$1(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push({
      id: i,
      status: "NONE",
      rotation: getRandomRotation(),
      maskImage: getRandomMask()
    });
  }
  return arr;
}
function getRandomRotation() {
  return Math.floor(Math.random() * 7) - 3;
}
function getRandomMask() {
  return Math.floor(Math.random() * 5);
}
function allCardsTouched(cardState) {
  return cardState.filter((card) => {
    return card["status"] == "NONE";
  }).length == 1;
}
async function loader({
  request
}) {
  console.log("Loader started");
  const url = new URL(request.url);
  if (!url.searchParams.has("set") || !url.searchParams.has("pack-type")) {
    console.log("Missing URL params, redirecting");
    return redirect("/");
  }
  const set = url.searchParams.get("set");
  const pack_type = url.searchParams.get("pack-type");
  console.log("Fetching data for set:", set, "pack_type:", pack_type);
  let response = await fetch("https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod", {
    method: "POST",
    body: JSON.stringify({ set, pack_type }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
  return response;
}
function ErrorBoundary() {
  const error = useRouteError();
  console.log("IN THE OPEN ROUTE ERROR");
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h1", { children: [
        error.status,
        " ",
        error.statusText
      ] }),
      /* @__PURE__ */ jsx("p", { children: error.data })
    ] });
  } else if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Error" }),
      /* @__PURE__ */ jsx("p", { children: error.message }),
      /* @__PURE__ */ jsx("p", { children: "The stack trace is:" }),
      /* @__PURE__ */ jsx("pre", { children: error.stack })
    ] });
  } else {
    return /* @__PURE__ */ jsx("h1", { children: "Unknown Error" });
  }
}
async function action({ request }) {
  console.log("ACTION");
  const formData = await request.formData();
  const set = formData.get("set");
  const pack_type = formData.get("pack-type");
  console.log("Set:", set);
  console.log("Pack Type:", pack_type);
  try {
    const response = await fetch("https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod", {
      method: "POST",
      body: JSON.stringify({ set, pack_type }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("API call failed");
    }
    console.log("WE GOT IT");
    const data = await response.json();
    return json(data);
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}
function Open() {
  return /* @__PURE__ */ jsx("div", { className: "", id: "index-page", children: /* @__PURE__ */ jsx(CardGrid, {}) });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  action,
  default: Open,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CWF3EnNN.js", "imports": ["/assets/index-Ivv8m7sf.js", "/assets/components-YI_IdiTz.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DCbtNdj0.js", "imports": ["/assets/index-Ivv8m7sf.js", "/assets/components-YI_IdiTz.js", "/assets/centsToDollars-BemH1-NO.js", "/assets/FIORIContext-B_fc8As3.js", "/assets/HomeButton-BbFWqNW7.js"], "css": [] }, "routes/resources.packs": { "id": "routes/resources.packs", "parentId": "root", "path": "resources/packs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/resources.packs-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/resources.sets": { "id": "routes/resources.sets", "parentId": "root", "path": "resources/sets", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/resources.sets-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/sitemap[.]xml": { "id": "routes/sitemap[.]xml", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sitemap_._xml-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/robots[.]txt": { "id": "routes/robots[.]txt", "parentId": "root", "path": "robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/robots_._txt-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/stats.global": { "id": "routes/stats.global", "parentId": "root", "path": "stats/global", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/stats.global-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/stats._index": { "id": "routes/stats._index", "parentId": "root", "path": "stats", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/stats._index-kzf6nVKu.js", "imports": ["/assets/index-Ivv8m7sf.js", "/assets/centsToDollars-BemH1-NO.js", "/assets/HomeButton-BbFWqNW7.js", "/assets/FIORIContext-B_fc8As3.js"], "css": [] }, "routes/stats.user": { "id": "routes/stats.user", "parentId": "root", "path": "stats/user", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/stats.user-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/settings": { "id": "routes/settings", "parentId": "root", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/settings-Cqmo3WfK.js", "imports": ["/assets/index-Ivv8m7sf.js", "/assets/HomeButton-BbFWqNW7.js", "/assets/FIORIContext-B_fc8As3.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-C-rkilg8.js", "imports": ["/assets/index-Ivv8m7sf.js", "/assets/components-YI_IdiTz.js"], "css": [] }, "routes/info": { "id": "routes/info", "parentId": "root", "path": "info", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/info-etz5tnfk.js", "imports": ["/assets/index-Ivv8m7sf.js", "/assets/HomeButton-BbFWqNW7.js", "/assets/FIORIContext-B_fc8As3.js"], "css": [] }, "routes/open": { "id": "routes/open", "parentId": "root", "path": "open", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/open-Ca14EaB5.js", "imports": ["/assets/index-Ivv8m7sf.js", "/assets/centsToDollars-BemH1-NO.js", "/assets/FIORIContext-B_fc8As3.js", "/assets/components-YI_IdiTz.js"], "css": [] } }, "url": "/assets/manifest-b4d46ebf.js", "version": "b4d46ebf" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/resources.packs": {
    id: "routes/resources.packs",
    parentId: "root",
    path: "resources/packs",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/resources.sets": {
    id: "routes/resources.sets",
    parentId: "root",
    path: "resources/sets",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/sitemap[.]xml": {
    id: "routes/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/robots[.]txt": {
    id: "routes/robots[.]txt",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/stats.global": {
    id: "routes/stats.global",
    parentId: "root",
    path: "stats/global",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/stats._index": {
    id: "routes/stats._index",
    parentId: "root",
    path: "stats",
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/stats.user": {
    id: "routes/stats.user",
    parentId: "root",
    path: "stats/user",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route9
  },
  "routes/info": {
    id: "routes/info",
    parentId: "root",
    path: "info",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/open": {
    id: "routes/open",
    parentId: "root",
    path: "open",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
