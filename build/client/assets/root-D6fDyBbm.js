import{j as t,e as f,u as y,r as o,R as k,f as S,g as N,O as R}from"./index-Ivv8m7sf.js";import{c as x}from"./centsToDollars-BemH1-NO.js";import{a as l,u as v,R as p,F as P}from"./FIORIContext-B_fc8As3.js";import{j as I,M as A,L as E,S as _}from"./components-YI_IdiTz.js";import{H as $}from"./HomeButton-BbFWqNW7.js";const B="/assets/tailwind-BPwYzXDW.css";function F(){const e=l();return e.action==="RIP"||e.action,t.jsx("div",{className:"w-12 sm:w-24 grow-0 flex-basis-2",children:t.jsxs("div",{className:" flex flex-col items-center justify-center rounded-lg transition duration-150",children:[t.jsx("span",{className:"font-kanit text-2xl value-lost-box",children:x(e.amountLost)}),t.jsx("span",{className:"font-kanit text-4xl label transition duration-150",children:"Lost"})]})})}function L(){const e=l();return e.action==="FLIP"||e.action,t.jsx("div",{className:"w-12 sm:w-24 grow-0 flex-basis-2",children:t.jsxs("div",{className:"flex flex-col items-center justify-center rounded-lg transition duration-150",children:[t.jsx("span",{className:"font-kanit text-2xl value",children:x(e.amountSaved)}),t.jsx("span",{className:"font-kanit text-4xl label transition duration-150",children:"Saved"})]})})}const T="/images/FlipItHeader.webp",H="/images/RipItHeader.webp";function M(){const e=l(),n=f();let a=e.action==="FLIP"||e.action==="END"||n.pathname=="/"||n.pathname=="/stats"||n.pathname=="/info"||n.pathname=="/settings",i=e.action==="RIP"||e.action==="END"||n.pathname=="/"||n.pathname=="/stats"||n.pathname=="/info"||n.pathname=="/settings";return t.jsx(t.Fragment,{children:t.jsxs("div",{className:"flex flex-col md:flex-row w-full md:gap-2 h-100 overflow-hidden",children:[t.jsx("div",{className:"w-full md:w-auto flex justify-center",children:t.jsx("img",{fetchPriority:"high",className:`${a?"opacity-100":"opacity-25"} h-25 w-auto object-contain transition duration-150`,src:T,alt:""})}),t.jsx("div",{className:"w-full md:w-auto flex justify-center",children:t.jsx("img",{fetchPriority:"high",className:`${i?"opacity-100":"opacity-25"} h-25 w-auto object-contain transition duration-150`,src:H,alt:""})})]})})}function O(){const e=v(),n=y(),[a,i]=I();function s(){e({type:p.PACK_STARTED,payload:{}})}function r(){s(),n(`/open?${a.toString()}`,{replace:!0})}return t.jsx("button",{onClick:()=>r(),className:"flex-basis-0 bg-green-500 hover:bg-green-400 active:bg-green-600 size-8 sm:size-24 rounded",children:t.jsxs("div",{className:"object-center flex flex-col items-center justify-center",children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",height:"40px",viewBox:"0 -960 960 960",width:"40px",fill:"#000000",children:t.jsx("path",{d:"M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z"})}),t.jsx("div",{className:"text-xl text-black",children:"AGAIN"})]})})}function d({children:e,unless:n}){return t.jsx("div",{children:n?e:t.jsx("div",{className:"size-12 sm:size-24"})})}function C(){const e=v();function n(){a()}function a(){e({type:p.SET_HARD_MODE,payload:{hardMode:!1}})}return t.jsx("a",{href:"https://ko-fi.com/Y8Y0ZKQZ1",target:"_blank",rel:"noopener noreferrer",onClick:()=>n(),className:"button flex-basis-0 bg-red-600 hover:bg-red-500 active:bg-red-700 size-24 rounded flex flex-col justify-center object-center",children:t.jsxs("div",{className:"object-center flex flex-col items-center justify-center",children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",height:"40px",viewBox:"0 -960 960 960",width:"40px",fill:"#000000",children:t.jsx("path",{d:"M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z"})}),t.jsx("div",{className:"text-xl text-black",children:"PAY UP"})]})})}function D({changeValue:e}){const n=l();let i=f().pathname==="/open",s=n.action==="END";return t.jsxs("div",{className:"place-content-evenly flex items-center flex-row gap-2 sm:gap-6 m-4",children:[t.jsx("div",{className:"hidden sm:block",children:t.jsx(d,{unless:s,children:t.jsx($,{})})}),t.jsx("div",{className:"mx-6 sm:mx-0",children:t.jsx(d,{unless:i,children:t.jsx(L,{})})}),t.jsx(M,{}),t.jsx("div",{className:"mx-6 sm:mx-0",children:t.jsx(d,{unless:i,children:t.jsx(F,{})})}),t.jsx("div",{className:"hidden sm:block",children:t.jsx(d,{unless:s,children:n.hardMode?t.jsx(C,{}):t.jsx(O,{})})})]})}function V(){return t.jsxs("div",{className:"flex justify-center",children:[t.jsx("div",{className:"animate-bounce border-black border-2  min-h-50 p-4 m-4  rounded-full"}),t.jsx("div",{className:"animate-bounce animation-delay-200 border-blue-600 border-2 bg-blue-600 min-h-50 p-4 m-4 rounded-full"}),t.jsx("div",{className:"animate-bounce animation-delay-400 border-black border-2 bg-black min-h-50 p-4 m-4 rounded-full"}),t.jsx("div",{className:"animate-bounce animation-delay-600 border-red-600 border-2 bg-red-600 min-h-50 p-4 m-4 rounded-full"}),t.jsx("div",{className:"animate-bounce animation-delay-800 border-green-800 border-2 bg-green-800 min-h-50 p-4 m-4 rounded-full"})]})}var m={},q="@vercel/analytics",z="1.5.0",Q=()=>{window.va||(window.va=function(...n){(window.vaq=window.vaq||[]).push(n)})};function w(){return typeof window<"u"}function b(){try{const e="production"}catch{}return"production"}function Y(e="auto"){if(e==="auto"){window.vam=b();return}window.vam=e}function Z(){return(w()?window.vam:b())||"production"}function u(){return Z()==="development"}function G(e){return e.scriptSrc?e.scriptSrc:u()?"https://va.vercel-scripts.com/v1/script.debug.js":e.basePath?`${e.basePath}/insights/script.js`:"/_vercel/insights/script.js"}function W(e={debug:!0}){var n;if(!w())return;Y(e.mode),Q(),e.beforeSend&&((n=window.va)==null||n.call(window,"beforeSend",e.beforeSend));const a=G(e);if(document.head.querySelector(`script[src*="${a}"]`))return;const i=document.createElement("script");i.src=a,i.defer=!0,i.dataset.sdkn=q+(e.framework?`/${e.framework}`:""),i.dataset.sdkv=z,e.disableAutoTrack&&(i.dataset.disableAutoTrack="1"),e.endpoint?i.dataset.endpoint=e.endpoint:e.basePath&&(i.dataset.endpoint=`${e.basePath}/insights`),e.dsn&&(i.dataset.dsn=e.dsn),i.onerror=()=>{const s=u()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${a}. ${s}`)},u()&&e.debug===!1&&(i.dataset.debug="false"),document.head.appendChild(i)}function K({route:e,path:n}){var a;(a=window.va)==null||a.call(window,"pageview",{route:e,path:n})}function U(){if(!(typeof process>"u"||typeof m>"u"))return m.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH}function X(e){return o.useEffect(()=>{var n;e.beforeSend&&((n=window.va)==null||n.call(window,"beforeSend",e.beforeSend))},[e.beforeSend]),o.useEffect(()=>{W({framework:e.framework||"react",basePath:e.basePath??U(),...e.route!==void 0&&{disableAutoTrack:!0},...e})},[]),o.useEffect(()=>{e.route&&e.path&&K({route:e.route,path:e.path})},[e.route,e.path]),null}var h={},J="@vercel/speed-insights",ee="1.2.0",te=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function ne(){return typeof window<"u"}function ie(){try{const e="production"}catch{}return"production"}function j(){return ie()==="development"}function ae(e,n){if(!e||!n)return e;let a=e;try{const i=Object.entries(n);for(const[s,r]of i)if(!Array.isArray(r)){const c=g(r);c.test(a)&&(a=a.replace(c,`/[${s}]`))}for(const[s,r]of i)if(Array.isArray(r)){const c=g(r.join("/"));c.test(a)&&(a=a.replace(c,`/[...${s}]`))}return a}catch{return e}}function g(e){return new RegExp(`/${se(e)}(?=[/?#]|$)`)}function se(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function re(e){return e.scriptSrc?e.scriptSrc:j()?"https://va.vercel-scripts.com/v1/speed-insights/script.debug.js":e.dsn?"https://va.vercel-scripts.com/v1/speed-insights/script.js":e.basePath?`${e.basePath}/speed-insights/script.js`:"/_vercel/speed-insights/script.js"}function oe(e={}){var n;if(!ne()||e.route===null)return null;te();const a=re(e);if(document.head.querySelector(`script[src*="${a}"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,"beforeSend",e.beforeSend));const i=document.createElement("script");return i.src=a,i.defer=!0,i.dataset.sdkn=J+(e.framework?`/${e.framework}`:""),i.dataset.sdkv=ee,e.sampleRate&&(i.dataset.sampleRate=e.sampleRate.toString()),e.route&&(i.dataset.route=e.route),e.endpoint?i.dataset.endpoint=e.endpoint:e.basePath&&(i.dataset.endpoint=`${e.basePath}/speed-insights/vitals`),e.dsn&&(i.dataset.dsn=e.dsn),j()&&e.debug===!1&&(i.dataset.debug="false"),i.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${a}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(i),{setRoute:s=>{i.dataset.route=s??void 0}}}function ce(){if(!(typeof process>"u"||typeof h>"u"))return h.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH}function de(e){o.useEffect(()=>{var a;e.beforeSend&&((a=window.si)==null||a.call(window,"beforeSend",e.beforeSend))},[e.beforeSend]);const n=o.useRef(null);return o.useEffect(()=>{if(n.current)e.route&&n.current(e.route);else{const a=oe({framework:e.framework??"react",basePath:e.basePath??ce(),...e});a&&(n.current=a.setRoute)}},[e.route]),null}var le=()=>{const e=S(),n=f();return ae(n.pathname,e)};function ue(){try{return}catch{}}function fe(e){const n=le();return k.createElement(de,{route:n,...e,framework:"remix",basePath:ue()})}const pe=()=>[{rel:"stylesheet",href:B},{rel:"icon",href:"/fiori_favicon_64.png",type:"image/png"},{rel:"canonical",href:"https://flipitorripit.com"},{rel:"preload",href:"/images/FlipItHeader.webp",as:"image",type:"image/webp",fetchpriority:"high",crossOrigin:"anonymous"},{rel:"preload",href:"/images/RipItHeader.webp",as:"image",type:"image/webp",fetchpriority:"high",crossOrigin:"anonymous"},{rel:"preload",href:"/fonts/Quicksand/static/Quicksand-Bold.ttf",as:"font",type:"font/ttf",crossOrigin:"anonymous"},{rel:"preload",href:"/fonts/Quicksand/static/Quicksand-Regular.ttf",as:"font",type:"font/ttf",crossOrigin:"anonymous"},{rel:"preconnect",href:"https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com"}],we=()=>[{title:"Flip It or Rip It"},{name:"viewport",content:"width=device-width, initial-scale=1.0"},{name:"description",content:"Magic: The Gathering cards used to simulate Flip It or Rip It - without any of the risk. Now updated for Aetherdrift!"},{property:"og:title",content:"Flip It or Rip It"},{property:"og:image",content:"/fiori_favicon_64.png"},{property:"og:description",content:"Magic: The Gathering cards used to simulate Flip It or Rip It - without any of the risk. Now updated for Aetherdrift!"},{property:"og:url",content:"https://flipitorripit.com"},{property:"og:type",content:"website"},{name:"twitter:card",content:"/fiori_favicon_64.png"},{name:"twitter:title",content:"Flip It or Rip It"},{name:"twitter:description",content:"Magic: The Gathering cards used to simulate Flip It or Rip It - without any of the risk. Now updated for Aetherdrift!"},{name:"robots",content:"index, follow"}];function be(){const[e,n]=o.useState(100),a=N(),i={changeValue:e};return t.jsxs("html",{children:[t.jsxs("head",{children:[t.jsx(A,{}),t.jsx(E,{})]}),t.jsx("body",{className:"w-full bg-stone-200",children:t.jsxs(P,{children:[t.jsx(D,{changeValue:e}),a.state==="loading"?t.jsx(V,{}):t.jsx(R,{context:{...i}}),t.jsx(X,{}),t.jsx(fe,{}),t.jsx(_,{})]})})]})}export{be as default,pe as links,we as meta};
