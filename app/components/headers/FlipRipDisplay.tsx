import fioriFirst from '../../../images/FlipItHeader.png';
import fioriEnd from '../../../images/RipItHeader.png';
import { useFIORI } from '../../FIORIContext';

function FlipRipDisplay() {
    const state = useFIORI();

    let toFlip = (state!.action !== "RIP");
    let toRip = (state!.action !== "FLIP");
    return (
        <>
            <div className='flex flex-row h-100 overflow-hidden'>
                <div className='h-25 transition delay-150 ease-in-out duration-300'>
                    <img className={`${toFlip ? "opacity-100" : "opacity-25"} object-scale-down transition duration-150`} src={fioriFirst} alt="" />
                </div>
                <div className='x-50 h-25'>
                    <img className={`${toRip ? "opacity-100" : "opacity-25"}  object-scale-down transition duration-150`} src={fioriEnd} alt="" />
                </div>
            </div>
        </>
    );
};

export default FlipRipDisplay;