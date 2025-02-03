import React from 'react';

interface FlipRipDisplayProps {
    value: number;
}

function FlipRipDisplay({ children }: any) {
    return (
        <body className='custom'>
            <h1 className="flex flex-col font-custom items-center justify-center bg-white text-4xl rounded-lg p-4 w-50 bg-red-500">
                {children}
            </h1>
            {/* <h1 className="flex flex-col text-green-500 font-custom items-center justify-center bg-white text-3xl rounded-lg p-4 w-50 bg-red-500">
                FLIP IT
            </h1>
            <h1 className="flex flex-col font-custom items-center justify-center bg-white text-xl rounded-lg w-50 bg-red-500">
                OR
            </h1>
            <h1 className="flex flex-col text-red-500 font-custom items-center justify-center bg-white text-3xl rounded-lg p-4 w-50 bg-red-500">
                RIP IT
            </h1> */}
        </body>
    );
};

export default FlipRipDisplay;