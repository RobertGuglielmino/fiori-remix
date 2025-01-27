import React from 'react';

interface FlipRipDisplayProps {
    value: number;
}

function FlipRipDisplay({ children }: any) {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 size-24 bg-red-500">
            {children}
        </div>
    );
};

export default FlipRipDisplay;