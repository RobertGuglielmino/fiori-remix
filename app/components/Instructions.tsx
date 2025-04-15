// app/components/Instructions.tsx
import { ReactNode } from "react";

/**
 * Optimized Instructions component with improved semantic structure
 * while maintaining original Tailwind classes
 */
export default function Instructions() {
  return (
    <div className="sm:px-24 md:px-36 text-center">
      <p className="text-md italic">
        Choose a <span className="underline">Magic Set</span> and <span className="underline">Booster Type</span>.
      </p>
      
      <div className="flex items-center flex-col">
        <h2 className="text-2xl w-3/4 md:w-1/2 underline text-left mt-4">
          HOW TO PLAY
        </h2>
        
        {/* Converted to proper list structure but kept styling */}
        <ol className="text-3xl w-3/4 md:w-1/2 text-left list-none">
          <li className="mb-2">
            <span className="italic">1)</span> Open a pack of cards, shuffle them face down.
          </li>
          <li className="mb-2">
            <span className="italic">2)</span> <span className="text-green-600 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">FLIP</span> a card face up and <span className="underline decoration-dashed decoration-green-500">keep</span> it.
          </li>
          <li className="mb-2">
            <span className="italic">3)</span> <span className="text-red-800 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">RIP</span> a card and <span className="underline decoration-solid decoration-red-700">destroy</span> it forever.
          </li>
          <li className="mb-2">
            <span className="italic">4)</span> Repeat 2 and 3 until all cards are gone.
          </li>
        </ol>
      </div>
      
      <div className="text-lg mt-8">
        Engaging in this activity with real cards is exhilarating, and disgusting.<br />
        This website lets you simulate that experience.
      </div>
    </div>
  );
}