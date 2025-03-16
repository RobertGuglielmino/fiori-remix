import { useFIORIDispatch } from "../../FIORIContext";
import { ReducerActions } from "../../constants/ActionTypes";

export default function HardModeButton() {
    const dispatch = useFIORIDispatch();

    function buttonClick() {
        setHardMode();
    }

    function setHardMode() {
        dispatch!({
            type: ReducerActions.SET_HARD_MODE,
            payload: {
                hardMode: false
            }
        });
    }

    return (
        <a
            href="https://ko-fi.com/Y8Y0ZKQZ1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => buttonClick()}
            className='button flex-basis-0 bg-red-600 hover:bg-red-500 active:bg-red-700 size-24 rounded flex flex-col justify-center object-center'>
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z" /></svg>
            <div className="text-xl text-white">
                AGAIN
            </div>
        </a>
    )
}
