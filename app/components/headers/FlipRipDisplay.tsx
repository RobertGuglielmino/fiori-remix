import React from 'react';
import fioriFirst from '../../../public/images/fiori first 3.png';
import fioriEnd from '../../../public/images/fiori end 3.png';

interface FlipRipDisplayProps {
    action: string;
}

function FlipRipDisplay({ action }: FlipRipDisplayProps) {

    let toFlip = (action === "FLIP") || (action === "NONE");
    let toRip = (action === "RIP") || (action === "NONE");

    return (
        <>
            <div className='flex flex-row gap-y-2 h-100 overflow-hidden'>
                <div className='h-25 transition delay-150  ease-in-out duration-300'>
                    <img className={`opacity-${toFlip ? "100" : "25"} object-scale-down transition duration-150`} src={fioriFirst} alt="" />
                </div>

                <div className='x-50 h-25'>
                    <img className={`opacity-${toRip ? "100" : "25"}  object-scale-down transition duration-150`} src={fioriEnd} alt="" />
                </div>
            </div>
        </>
    );
};

export default FlipRipDisplay;