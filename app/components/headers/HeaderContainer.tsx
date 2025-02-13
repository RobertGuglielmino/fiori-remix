
import ValueLostBox from './ValueLostBox';
import ValueSavedBox from './ValueSavedBox';
import PackSelector from '../PackSelector';
import FlipRipDisplay from './FlipRipDisplay';
import { useContext, useState } from 'react';
import centsToDollars from './../../utils/centsToDollars';
import { Link, useFetcher, useNavigate, useSearchParams } from '@remix-run/react';
import PlayAgainButton from '../buttons/PlayAgainButton';
import HomeButton from '../buttons/HomeButton';
import Hidden from '../Hidden';
import { useFIORI } from '../../FIORIContext';


interface HeaderContainerProps {
    changeValue: number;
    fetchNewPack: () => void;
}

function HeaderContainer({ changeValue, fetchNewPack }: HeaderContainerProps) {
    const state = useFIORI();

    let packGenerated = state!.action !== "NONE";
    let packFullyOpened = state!.action === "END";

    return (
        <div className="place-content-evenly flex items-center flex-row gap-6 m-4">
            <Hidden unless={packFullyOpened}>
                <HomeButton />
            </Hidden>

            <Hidden unless={packGenerated}>
                <ValueSavedBox  />
            </Hidden>

            <FlipRipDisplay></FlipRipDisplay>

            <Hidden unless={packGenerated}>
                <ValueLostBox  />
            </Hidden>

            <Hidden unless={packFullyOpened}>
                <PlayAgainButton fetchNewPack={fetchNewPack} />
            </Hidden>
        </div>
    );
};

export default HeaderContainer;