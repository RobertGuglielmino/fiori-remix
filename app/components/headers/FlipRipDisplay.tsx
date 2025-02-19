import fioriFirst from '../../../images/FlipItHeader.png';
import fioriEnd from '../../../images/RipItHeader.png';
import { useFIORI } from '../../FIORIContext';

function FlipRipDisplay() {
    const state = useFIORI();

    let toFlip = (state!.action === "FLIP") || (state!.action === undefined);
    let toRip = (state!.action === "RIP") || (state!.action === undefined);
    return (
        <>
            <div className='flex flex-row gap-y-2 h-100 overflow-hidden'>
                <div className='h-25 transition delay-150  ease-in-out duration-300'>
                    <img className={`${toFlip ? "opacity-25" : "opacity-100"} object-scale-down transition duration-150`} src={fioriFirst} alt="" />
                </div>
                <div className='x-50 h-25'>
                    <img className={`${toRip ? "opacity-25" : "opacity-100"}  object-scale-down transition duration-150`} src={fioriEnd} alt="" />
                </div>
            </div>
        </>
    );
};

export default FlipRipDisplay;