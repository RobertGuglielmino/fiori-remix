import{R as n,j as e}from"./index-CNcSpTgT.js";import{H as s}from"./HomeButton-D3VCfAR0.js";import"./FIORIContext-Cl75LApW.js";function d(){const[r,t]=n.useState(!1),o=()=>{navigator.clipboard.writeText("robert.gugliel@gmail.com").then(()=>{t(!0),setTimeout(()=>t(!1),2e3)}).catch(i=>{console.error("Failed to copy: ",i)})};return e.jsx("div",{className:"center m-10",children:e.jsxs("div",{className:"text-center font-quicksand text-xl",children:[e.jsx("b",{children:"Flip It Or Rip It"})," is a made using React, Remix, Tailwind, and deployed on Docker. ",e.jsx("br",{}),e.jsx("br",{}),"If you enjoy clicking around her, donate to me on ",e.jsx("a",{className:"text-blue-500 underline",target:"_blank",href:"https://ko-fi.com/robertguglielmino",children:"Ko-Fi."}),e.jsx("br",{}),e.jsx("br",{}),"Have a feature suggestion/bug report? Send me an email - ",e.jsx("span",{onClick:()=>{o()},className:"cursor-pointer text-blue-500 underline",children:"robert.gugliel@gmail.com"})," ",e.jsx("br",{}),e.jsx("br",{}),"Code available here - ",e.jsx("a",{className:"text-blue-500 underline",target:"_blank",rel:"noopener noreferrer",href:"https://github.com/RobertGuglielmino/fiori-remix",children:"GitHub Link"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(s,{}),e.jsxs("div",{className:`
                    fixed top-4 right-4 
                    bg-green-500 text-white px-3 py-1 rounded shadow-lg
                    flex items-center space-x-1
                    transition-all duration-300 z-50
                    ${r?"opacity-100 translate-y-0":"opacity-0 -translate-y-2"}
                    `,children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),e.jsx("span",{children:"Copied!"})]})]})})}export{d as default};
