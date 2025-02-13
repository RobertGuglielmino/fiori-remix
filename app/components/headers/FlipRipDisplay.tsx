import React from 'react';
import fioriFirst from '../../../images/fiori first 3.png';
import fioriEnd from '../../../images/fiori end 3.png';
import { useFIORI } from '../../FIORIContext';

function FlipRipDisplay() {
    const state = useFIORI();

    let toFlip = (state!.action === "FLIP") || (state!.action === undefined);
    let toRip = (state!.action === "RIP") || (state!.action === undefined);

    console.log(toFlip);
    console.log(toRip);

    return (
        <>
            <div className='flex flex-row gap-y-2 h-100 overflow-hidden'>
                <div className='h-25 transition delay-150  ease-in-out duration-300'>
                    <img className={`opacity-${toFlip ? "100" : "25"} object-scale-down transition duration-150`} src={fioriFirst} alt="" />
                </div>
                <div>
                    
                {`opacity-${toFlip ? "100" : "25"}`}
                </div>
                <div>
                    {`opacity-${toRip ? "100" : "25"}`}
                </div>

                <div className='x-50 h-25'>
                    <img className={`opacity-${toRip ? "100" : "25"}  object-scale-down transition duration-150`} src={fioriEnd} alt="" />
                </div>
            </div>
        </>
    );
};

export default FlipRipDisplay;