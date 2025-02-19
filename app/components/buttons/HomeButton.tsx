import { useNavigate } from "@remix-run/react";
import { ReducerActions } from "../../constants/ActionTypes";
import { useFIORIDispatch } from "../../FIORIContext";

export default function HomeButton() {
    const navigate = useNavigate();
    const dispatch = useFIORIDispatch();

    function updatePackState(state: string) {
        dispatch!({
            type: ReducerActions.PACK_STATE,
            payload: {
                action: state,
            }
        });
    }
    
    function buttonClick() {
        updatePackState("NONE");
        navigate("/");
    }

    return (
        <button onClick={() => buttonClick()} className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 font-quicksand size-24 rounded m-4">
            <div className='object-center flex flex-col items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M226.67-186.67h140v-246.66h226.66v246.66h140v-380L480-756.67l-253.33 190v380ZM160-120v-480l320-240 320 240v480H526.67v-246.67h-93.34V-120H160Zm320-352Z" /></svg>
                <div className="text-xl">
                    HOME
                </div>
            </div>
        </button>
    )
}
