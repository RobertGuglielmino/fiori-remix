import { useLocation } from '@remix-run/react';
import fioriFirst from '../../../public/images/FlipItHeader.webp';
import fioriEnd from '../../../public/images/RipItHeader.webp';
import { useFIORI } from '~/FIORIContext';

export default function FlipRipDisplay() {
    const state = useFIORI();
    const location = useLocation();

    //FIORI header full opacity only if we're opening a pack, and if the action is appropriate
    //yes this is ugly no i'm not fixing it right now
    let toFlip = (state!.action === "FLIP") || (state!.action === "END") || (location.pathname == "/") || (location.pathname == "/stats") || (location.pathname == "/info") || (location.pathname == "/settings");
    let toRip = (state!.action === "RIP") || (state!.action === "END") || (location.pathname == "/") || (location.pathname == "/stats") || (location.pathname == "/info") || (location.pathname == "/settings");

    return (
        <>
            <div className='flex flex-row h-100 overflow-hidden'>
                <div className='h-25 transition delay-150 ease-in-out duration-500'>
                    <img fetchPriority="high" className={`${toFlip ? "opacity-100" : "opacity-25"} object-scale-down transition duration-150`} src={fioriFirst} alt="" />
                </div>
                <div className='x-50 h-25'>
                    <img fetchPriority="high" className={`${toRip ? "opacity-100" : "opacity-25"}  object-scale-down transition duration-150`} src={fioriEnd} alt="" />
                </div>
            </div>
        </>
    );
};