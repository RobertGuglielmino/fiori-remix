import { useLocation } from '@remix-run/react';
import fioriFirst from '../../../images/FlipItHeader.png';
import fioriEnd from '../../../images/RipItHeader.png';
import { useFIORI } from '../../FIORIContext';

export default function FlipRipDisplay() {
    const state = useFIORI();
    const location = useLocation();

    let toFlip = (state!.action === "FLIP") || (state!.action === "END") || (location.pathname == "/");
    let toRip = (state!.action === "RIP") || (state!.action === "END") || (location.pathname == "/");

    return (
        <>
            <div className='flex flex-row h-100 overflow-hidden'>
                <div className='h-25 transition delay-150 ease-in-out duration-500'>
                    <img className={`${toFlip ? "opacity-100" : "opacity-25"} object-scale-down transition duration-150`} src={fioriFirst} alt="" />
                </div>
                <div className='x-50 h-25'>
                    <img className={`${toRip ? "opacity-100" : "opacity-25"}  object-scale-down transition duration-150`} src={fioriEnd} alt="" />
                </div>
            </div>
        </>
    );
};