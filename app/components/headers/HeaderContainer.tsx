
import ValueLostBox from './ValueLostBox';
import ValueSavedBox from './ValueSavedBox';
import FlipRipDisplay from './FlipRipDisplay';
import PlayAgainButton from '../buttons/PlayAgainButton';
import HomeButton from '../buttons/HomeButton';
import Hidden from '../cardEffects/Hidden';
import { useFIORI } from '../../FIORIContext';
import { useLocation } from '@remix-run/react';
import HardModeButton from '../buttons/HardModeButton';

interface HeaderContainerProps {
    changeValue: number;
}

export default function HeaderContainer({ changeValue }: HeaderContainerProps) {
    const state = useFIORI();
    const path = useLocation();


    let packGenerated = path.pathname === "/open";
    let packFullyOpened = state!.action === "END";

    return (
        <div className="flex justify-center">
            <div className="place-content-evenly flex items-center flex-row gap-2 sm:gap-6 m-4">
                <div className="hidden sm:block">
                    <Hidden unless={packFullyOpened}>
                        <HomeButton />
                    </Hidden>
                </div>

                <div className="mx-6 sm:mx-0">
                    <Hidden unless={packGenerated}>
                        <ValueSavedBox />
                    </Hidden>
                </div>

                <FlipRipDisplay />

                <div className="mx-6 sm:mx-0">
                    <Hidden unless={packGenerated}>
                        <ValueLostBox />
                    </Hidden>
                </div>

                <div className="hidden sm:block">
                    <Hidden unless={packFullyOpened}>
                        {state!.hardMode ? <HardModeButton /> : <PlayAgainButton />}
                    </Hidden>
                </div>
            </div>
        </div>
    );
};