import React from 'react';

interface ValueSavedBoxProps {
    value: number;
}

function ValueSavedBox({ value }: ValueSavedBoxProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 size-24 bg-green-500">
            <span className="value">{value}</span>
            <span className="label">Saved</span>
        </div>
    );
};

export default ValueSavedBox;