import { useNavigate } from "@remix-run/react";
import HomeButton from "../components/buttons/HomeButton";

export default function Info() {
    const navigate = useNavigate();

    return (
        <div className="center m-10">
            <div className="text-center font-quicksand">
                <b>Flip It Or Rip It</b> is a made using React, Remix, Tailwind, and deployed on Docker. <br /><br />
                If you enjoy clicking around on here every once in a while, consider donating to me on Ko-Fi.<br /><br />
                Feature suggestion<br /><br />
                <a className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" href="https://github.com/RobertGuglielmino/fiori-remix">GitHub Link</a><br /><br />
                <HomeButton />

            </div>
        </div>
    )
}