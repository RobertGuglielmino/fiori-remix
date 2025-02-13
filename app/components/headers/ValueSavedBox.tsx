import centsToDollars from '../../utils/centsToDollars';
import {  useFIORI } from '../../FIORIContext';

function ValueSavedBox() {
  const state = useFIORI();

    let flipOpacity = (state!.action === "FLIP") || (state!.action === undefined);

    return (
        <div className='flex-basis-1'>
            <div className={`opacity-${flipOpacity ? "100" : "25"} flex flex-col items-center justify-center rounded-lg p-4 transition duration-150`}>
                <span className="font-kanit text-2xl value">{centsToDollars(state!.amountSaved)}</span>
                <span className="font-kanit text-2xl label">Saved</span>
            </div>
        </div>
    );
};

export default ValueSavedBox;