
import ValueLostBox from './pieces/ValueLostBox';
import ValueSavedBox from './pieces/ValueSavedBox';
import PackSelector from './pieces/PackSelector';
import FlipRipDisplay from './pieces/FlipRipDisplay';
import { useState } from 'react';


interface HeaderContainerProps {
    amountLost: number;
    amountSaved: number;
    changeValue: number;
    nextAction: string;
    // packSetTypes: any;
}

function HeaderContainer({ amountLost, amountSaved, nextAction, changeValue }: HeaderContainerProps) {
    return (
        <div className="place-content-evenly     border-black border-2 flex items-center flex-row gap-6 mx-4">
            {/* <button className='flex-basis-0 bg-red-500 size-12 rounded'> <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M266-200v-66.67h301.33q67.67 0 116.84-44.33 49.16-44.33 49.16-110.33t-49.16-110.34Q635-576 567.33-576H286.67l110.66 110.67-46.66 46.66L160-609.33 350.67-800l46.66 46.67-110.66 110.66h280q95.66 0 164.5 63.67Q800-515.33 800-421.33q0 94-68.83 157.66Q662.33-200 566.67-200H266Z"/></svg> </button> */}
            <ValueLostBox value={amountLost} addValue={changeValue} />
            <FlipRipDisplay>FLIP IT OR RIP IT</FlipRipDisplay>
            <ValueSavedBox value={amountSaved} />

            {/* <PackSelector /> */}
        </div>
    );
};

export default HeaderContainer;