import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
    const baseUrl = "https://www.flipitorripit.com";

    const today = new Date().toISOString();

    const pages = [
        { path: "", lastmod: today, priority: "1.0", changefreq: "weekly" },
        { path: "open", lastmod: today, priority: "0.9", changefreq: "monthly" },
        { path: "stats", lastmod: today, priority: "0.8", changefreq: "monthly" },
        { path: "settings", lastmod: today, priority: "0.8", changefreq: "monthly" },
        { path: "info", lastmod: today, priority: "0.7", changefreq: "monthly" },
    ];

    const urlEntries = pages.map(page => `
  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

    // Return with proper headers
    return new Response(sitemap, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=86400"
        }
    });
};