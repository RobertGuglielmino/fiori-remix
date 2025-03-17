import HomeButton from "../components/buttons/HomeButton"
import { useFIORI, useFIORIDispatch } from "../FIORIContext";
import { ReducerActions } from "../constants/ActionTypes";

export default function Settings() {
    const dispatch = useFIORIDispatch();
    const state = useFIORI();

    return (
        <div className="text-xl text-center center m-10 flex items-center flex-col">
            <h1>show saved</h1>
            <h1>reset money every time</h1>
            <h1>reset money on home page return</h1>
            <h1>hard mode!</h1>
            <button key="hard" onClick={() => setHardMode()} disabled={state!.hardMode} className="bg-red-700 hover:not-disabled:bg-red-600 active:not-disabled:bg-red-800 disabled:bg-gray-500 rounded p-4 strong">Hard Mode</button>
            <HomeButton />
        </div>
    )

    function setHardMode() {
            dispatch!({
                type: ReducerActions.SET_HARD_MODE,
                payload: {
                    hardMode: true
                }
            });
    }
}