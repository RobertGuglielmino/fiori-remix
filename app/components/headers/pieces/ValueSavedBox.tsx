import React from 'react';
import centsToDollars from './../../../utils/centsToDollars';

interface ValueSavedBoxProps {
    value: number;
}

function ValueSavedBox({ value }: ValueSavedBoxProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 size-24 bg-green-500">
            <span className="value">{centsToDollars(value)}</span>
            <span className="opacity-25 label">Saved</span>
        </div>
    );
};

export default ValueSavedBox;