
import ValueLostBox from './ValueLostBox';
import ValueSavedBox from './ValueSavedBox';
import PackSelector from '../PackSelector';
import FlipRipDisplay from './FlipRipDisplay';
import { useState } from 'react';
import centsToDollars from './../../utils/centsToDollars';
import { Link, useFetcher, useNavigate, useSearchParams } from '@remix-run/react';
import PlayAgainButton from '../buttons/PlayAgainButton';
import HomeButton from '../buttons/HomeButton';


interface HeaderContainerProps {
    action: string;
    amountLost: number;
    amountSaved: number;
    changeValue: number;
    packFullyOpened: boolean;
    fetchNewPack: () => void;
    // packSetTypes: any;
}

function HeaderContainer({ action, amountLost, amountSaved, changeValue, packFullyOpened, fetchNewPack }: HeaderContainerProps) {

    let flipOpacity = action === "FLIP";
    const navigate = useNavigate();

    return (
        <div className="place-content-evenly flex items-center flex-row gap-6 m-4">
            {packFullyOpened ?
                <button onClick={() => navigate("/")} className='flex-basis-0 bg-sky-700 hover:bg-sky-600 active:bg-sky-800 size-24 rounded'>
                    <div className='object-center flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M266-200v-66.67h301.33q67.67 0 116.84-44.33 49.16-44.33 49.16-110.33t-49.16-110.34Q635-576 567.33-576H286.67l110.66 110.67-46.66 46.66L160-609.33 350.67-800l46.66 46.67-110.66 110.66h280q95.66 0 164.5 63.67Q800-515.33 800-421.33q0 94-68.83 157.66Q662.33-200 566.67-200H266Z" /></svg>
                    </div>
                </button> : <div className="size-24 border-black border-2"></div>}
            {/* {packFullyOpened && <HomeButton />} */}
            <div className='flex-basis-1'>
                <div className={`opacity-${flipOpacity ? "100" : "25"} flex flex-col items-center justify-center rounded-lg p-4 transition duration-150`}>
                    <span className="font-kanit text-2xl value">{centsToDollars(amountSaved)}</span>
                    <span className="font-kanit text-2xl label">Saved</span>
                </div>
            </div>
            <FlipRipDisplay action={action}></FlipRipDisplay>
            <div className='flex-basis-1'>
                <div className={`opacity-${flipOpacity ? "25" : "100"} flex flex-col items-center justify-center rounded-lg p-4 transition duration-150`}>
                    <span className="font-kanit text-2xl value-lost-box">{centsToDollars(amountLost)}</span>
                    <span className="font-kanit text-2xl label">Lost</span>
                </div>
            </div>
            {packFullyOpened ? <PlayAgainButton fetchNewPack={fetchNewPack} /> : <div className="size-24 border-black border-2"></div>}
        </div>
    );
};

export default HeaderContainer;