import { useLocation } from '@remix-run/react';
import { useFIORI } from '~/FIORIContext';

export default function FlipRipDisplay() {
    const state = useFIORI();
    const location = useLocation();

    const FIORI_FLIP_IMAGE = "https://d3vjinhen5j20w.cloudfront.net/FlipItHeader.webp"
    const FIORI_RIP_IMAGE = "https://d3vjinhen5j20w.cloudfront.net/RipItHeader.webp"


    //FIORI header full opacity only if we're opening a pack, and if the action is appropriate
    //yes this is ugly no i'm not fixing it right now
    let toFlip = (state!.action === "FLIP") || (state!.action === "END") || (location.pathname == "/") || (location.pathname == "/stats") || (location.pathname == "/info") || (location.pathname == "/settings");
    let toRip = (state!.action === "RIP") || (state!.action === "END") || (location.pathname == "/") || (location.pathname == "/stats") || (location.pathname == "/info") || (location.pathname == "/settings");

    return (
        <>
            <div className='flex flex-col md:flex-row w-full md:gap-2 h-100 overflow-hidden'>
                <div className='w-full md:w-auto flex justify-center'>
                    <img fetchPriority="high" className={`${toFlip ? "opacity-100" : "opacity-25"} h-25 w-auto object-contain transition duration-150`} src={FIORI_FLIP_IMAGE} alt="" />
                </div>
                <div className='w-full md:w-auto flex justify-center'>
                    <img fetchPriority="high" className={`${toRip ? "opacity-100" : "opacity-25"} h-25 w-auto object-contain transition duration-150`} src={FIORI_RIP_IMAGE} alt="" />
                </div>
            </div>
        </>
    );
};