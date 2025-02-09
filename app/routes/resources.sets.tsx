import { json, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import packTypesJson from '../../public/models/packTypes.json';

export async function loader({
    params,
}: LoaderFunctionArgs) {
    const response = await fetch('https://api.scryfall.com/sets');
    const data = await response.json();
    invariant(data, "Missing data from scryfall");

    const packSetTypes = ['core', 'expansion', 'draft_innovation', 'masters', 'funny', 'remastered'];

    // Filter sets that can be purchased as packs
    const packSets = data.data
        .filter((set: any) => packSetTypes.includes(set.set_type))
        .filter((set: any) => set.code.length === 3)
        .filter((set: any) => Object.keys(packTypesJson).includes(set.code.toUpperCase()))
        .map((set: any) => {
            return {
                setCode: set.code.toUpperCase(),
                setName: set.name
            }
        });
    return json(packSets);
}

export async function action({
    params,
}: LoaderFunctionArgs) {
    const response = await fetch('https://api.scryfall.com/sets');
    const data = await response.json();
    invariant(data, "Missing data from scryfall");

    const packSetTypes = ['core', 'expansion', 'draft_innovation', 'masters', 'funny', 'remastered'];

    // Filter sets that can be purchased as packs
    const packSets = data.data
        .filter((set: any) => packSetTypes.includes(set.set_type))
        .filter((set: any) => set.code.length === 3)
        .filter((set: any) => Object.keys(packTypesJson).includes(set.code.toUpperCase()))
        .map((set: any) => {
            return {
                setCode: set.code.toUpperCase(),
                setName: set.name
            }
        });
    return json(packSets);
}