import { useNavigate } from "@remix-run/react";
import PersonalStats from "../components/stats/PersonalStats";
import GlobalStats from "../components/stats/GlobalStats";
import HomeButton from "../components/buttons/HomeButton"

export default function Stats() {
    const navigate = useNavigate();

    // LINK CARD TO PAGE, SHOW ON HOVER?

    return (
        <>
            <div className="flex flex-row justify-center">
                <div className="w-2/5 ">
                    <PersonalStats />
                </div>
                <div className="w-2/5 ">
                    <GlobalStats />
                </div>
            </div>
            <div className="object-center"> 
                <HomeButton />
            </div>
        </>
    )
}