import { json, LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'

export async function loader({ request }: LoaderFunctionArgs) {

    const url = new URL(request.url)
    const set = url.searchParams.get('set')
    const pack_type = url.searchParams.get('pack_type')
    invariant(typeof set === 'string', 'set is required')
    invariant(typeof pack_type === 'string', 'pack_type is required')

    const api_url = "https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod"

    console.log("QWEQQWEQWWE")

    const response = await fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "set": set,
            "pack_type": pack_type
        }),
    });

    const result = await response.json();
    return result;
}

