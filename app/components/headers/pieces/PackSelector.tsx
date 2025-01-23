import { Form } from '@remix-run/react';
import React from 'react';
import packTypesJson from './packTypes.json';

interface PackSelectorProps {
    packSetTypes: any;
}

const PackSelector: React.FC<PackSelectorProps> = ({ packSetTypes }) => {
    return (
        <Form method="get" className=''>
            <div className="grid grid-cols-2">
                <div className='flex flex-col flex-shrink-1'>
                    <select name="set" className=' m-1 w-24 grow bg-slate-200 rounded'>
                        {packSetTypes.map((set: any) => (<option key={set.setCode} value={set.setCode}>{set.setCode}</option>))}
                    </select>
                    {/* <select className=' m-1 w-24 grow bg-slate-200 rounded'>
                        {document.getElementsByName("set")[0].toString() === "" ? <option key="-" value="-">-</option> : setTypes(document.getElementsByName("set")[0].toString())}
                    </select> */}
                    <input name="pack-type" type="text" className=' m-1 w-24 grow bg-slate-200 rounded'
                        placeholder='Pick a Booster!' />
                </div>
                <button type="submit" className='bg-green-500 hover:bg-green-600 size-24 rounded'> GO </button>
            </div>
        </Form>
    );
};

export default PackSelector;