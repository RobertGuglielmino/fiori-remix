import HomeButton from "../components/buttons/HomeButton";
import React from "react";

export default function Info() {
    const [showNotification, setShowNotification] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("robert.gugliel@gmail.com")
            .then(() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="center m-10">
            <div className="text-center font-quicksand text-xl">
                <b>Flip It Or Rip It</b> is a made using React, Remix, Tailwind, and deployed on Docker. <br /><br />
                If you enjoy clicking around her, donate to me on <a className="text-blue-500 underline" target="_blank" href="https://ko-fi.com/robertguglielmino">Ko-Fi.</a><br /><br />
                Have a feature suggestion/bug report? Send me an email - <span onClick={() => { copyToClipboard() }} className="cursor-pointer text-blue-500 underline">robert.gugliel@gmail.com</span> <br /><br />
                Code available here - <a className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" href="https://github.com/RobertGuglielmino/fiori-remix">GitHub Link</a><br /><br />
                <HomeButton />

                <div
                    className={`
                    fixed top-4 right-4 
                    bg-green-500 text-white px-3 py-1 rounded shadow-lg
                    flex items-center space-x-1
                    transition-all duration-300 z-50
                    ${showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                    `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                </div>
            </div>
        </div>
    )
}