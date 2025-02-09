import { defer, json, LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'

export async function loader({ request }: LoaderFunctionArgs) {

    const url = new URL(request.url)
    const set = url.searchParams.get('set')
    const pack_type = url.searchParams.get('pack-type')
    invariant(typeof set === 'string', 'set is required')
    invariant(typeof pack_type === 'string', 'pack-type is required')

    const api_url = "https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod"

    console.log("QWEQQWEQWWE")

    const responsePromise = fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "set": set,
            "pack_type": pack_type
        }),
    });
    const safePromise = responsePromise.then(data => {
      if (data === undefined) return null;
      return data;
    });

    return defer({ data: safePromise });
}

