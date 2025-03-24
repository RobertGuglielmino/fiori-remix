import centsToDollars from '../../utils/centsToDollars';
import { useFIORI } from '../../FIORIContext';

function ValueSavedBox() {
    const state = useFIORI();
    let flipOpacity = (state!.action === "FLIP") || (state!.action === undefined);

    return (
        <div className='w-12 sm:w-24 grow-0 flex-basis-2'>
            <div className={`flex flex-col items-center justify-center rounded-lg transition duration-150`}>
                <span className="font-kanit text-2xl value">{centsToDollars(state!.amountSaved)}</span>
                <span className={`font-kanit text-4xl label transition duration-150`}>Saved</span>
            </div>
        </div>
    );
};

export default ValueSavedBox;