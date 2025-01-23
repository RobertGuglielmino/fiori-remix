import React from 'react';

interface ValueLostBoxProps {
    value: number;
}

function ValueLostBox({ value }: ValueLostBoxProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 size-24 bg-red-500">
            <span className="value">{value}</span>
            <span className="label">Lost</span>
        </div>
    );
};

export default ValueLostBox;