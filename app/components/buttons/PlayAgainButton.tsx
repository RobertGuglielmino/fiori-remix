import { useNavigate, useSearchParams } from "@remix-run/react";
import { useFIORIDispatch } from "../../FIORIContext";
import { ReducerActions } from "../../constants/ActionTypes";

export default function PlayAgainButton() {
    const dispatch = useFIORIDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    function updatePackState() {
        dispatch!({
            type: ReducerActions.PACK_STARTED,
            payload: {}
        });
    }


    function buttonClick() {
        updatePackState();
        // call api
        navigate(`/open?${searchParams.toString()}`, {
            replace: true
        });
    }


    return (
        <button onClick={() => buttonClick()} className='flex-basis-0 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 size-24 rounded'>
            <div className='object-center flex flex-col items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M80-240v-480h66.67v480H80Zm559.33.67L591.67-286l160.66-160.67h-513v-66.66h513L592.67-674l46.66-46.67L880-480 639.33-239.33Z" /></svg>
                <div className="text-xl text-white">
                    AGAIN
                </div>
            </div>
        </button>
    )
}
