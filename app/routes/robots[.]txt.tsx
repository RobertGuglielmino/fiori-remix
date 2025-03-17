import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
    const content = `User-agent: *
Allow: /
Sitemap: https://flipitorripit.com/sitemap.xml`;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=3600"
        }
    });
};