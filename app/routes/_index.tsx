import PackSelector from "../components/PackSelector"
import invariant from "tiny-invariant";
import { useNavigate } from "@remix-run/react";

export async function loader() {
  console.log("data");
  const response = await fetch('https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod/flip-or-rip-lambda/sets')
    .then(async res => {
      const data = await res.json();
      console.log(data);
      return data.body;
    });
  invariant(response, "Missing data from scryfall");

  return response;
}

export default function Index() {
  const navigate = useNavigate();

  return (<div className="bg-stone-200">
    <div className="center m-2">
      <div className="text-center font-quicksand content-center">
        <div className="flex flex-row justify-center text-xl">
          <PackSelector />
        </div>
        <div className="sm:px-24 md:px-36 text-center">
          <span className="text-md italic">
            Choose a <span className="underline">Magic Set</span> and <span className="underline">Booster Type</span>.<br />
          </span>
          <div className="flex items-center flex-col">
            <div className="text-2xl w-3/4 md:w-1/2 underline text-left">
              <br />HOW TO PLAY
            </div>
            <div className="text-3xl w-3/4 md:w-1/2 text-left">
              <span className="italic">1)</span> Open a pack of cards, shuffle them face down.
              <br /><span className="italic">2)</span> <span className="text-green-600 font-bold">FLIP</span> a card face up and <span className="underline decoration-dashed decoration-green-500">keep</span> it.
              <br /><span className="italic">3)</span> <span className="text-red-800 font-bold">RIP</span> a card and <span className="underline decoration-solid decoration-red-700">destroy</span> it forever.
              <br /><span className="italic">4)</span> Repeat 2 and 3 until all cards are gone.
            </div>
          </div>
          <br /><br />
          <div className="text-lg">
            Engaging in this activity with real cards is exhilarating, and disgusting.<br /> This website lets you simulate that experience.<br />
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-row justify-center gap-2 pb-4">
      {/* <button onClick={() => navigate("/stats")} className="disabled bg-amber-500 hover:bg-amber-400 active:bg-amber-600  font-quicksand p-12 rounded mb-4"> */}
      <button className="disabled bg-amber-500 grayscale font-quicksand p-4 md:p-8 pb-2 rounded">
        <div className='object-center flex flex-col items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M146.67-186.67h178v-346.66h-178v346.66Zm244.66 0h177.34v-586.66H391.33v586.66Zm244 0h178v-266.66h-178v266.66ZM80-120v-480h244.67v-240h310.66v320H880v400H80Z" /></svg>
          <div className="text-xl">
            STATS
          </div>
          <div className="text-md">
            (soon!)
          </div>
        </div>
      </button>
      <button onClick={() => navigate("/info")} className="bg-red-500 hover:bg-red-400 active:bg-red-600 font-quicksand p-4 md:p-8 rounded">
        <div className='object-center flex flex-col items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M448.67-280h66.66v-240h-66.66v240Zm31.32-316q15.01 0 25.18-9.97 10.16-9.96 10.16-24.7 0-15.3-10.15-25.65-10.16-10.35-25.17-10.35-15.01 0-25.18 10.35-10.16 10.35-10.16 25.65 0 14.74 10.15 24.7 10.16 9.97 25.17 9.97Zm.19 516q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z" /></svg>
          <div className="text-xl">
            INFO
          </div>
        </div>
      </button>
      <button onClick={() => navigate("/settings")} className="bg-slate-400 hover:bg-slate-300 active:bg-slate-500 font-quicksand p-4 md:p-8 rounded">
        <div className='object-center flex flex-col items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm55.33-66.67h85l14-110q32.34-8 60.84-24.5T649-321l103.67 44.33 39.66-70.66L701-415q4.33-16 6.67-32.17Q710-463.33 710-480q0-16.67-2-32.83-2-16.17-7-32.17l91.33-67.67-39.66-70.66L649-638.67q-22.67-25-50.83-41.83-28.17-16.83-61.84-22.83l-13.66-110h-85l-14 110q-33 7.33-61.5 23.83T311-639l-103.67-44.33-39.66 70.66L259-545.33Q254.67-529 252.33-513 250-497 250-480q0 16.67 2.33 32.67 2.34 16 6.67 32.33l-91.33 67.67 39.66 70.66L311-321.33q23.33 23.66 51.83 40.16 28.5 16.5 60.84 24.5l13.66 110Zm43.34-200q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39ZM480-480Z" /></svg>
          <div className="text-xl">
            SETTINGS
          </div>
        </div>
      </button>
    </div>
  </div>
  );
}