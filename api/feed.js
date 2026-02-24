export default async function handler(req, res) {
    const BLOGGER_URL = "https://bsiw729rj38e9.blogspot.com"; // Your private source
    const { q, label, maxResults = 15 } = req.query;

    // SECURITY: Only allow your own Vercel domain to call this API
    const referer = req.headers.referer;
    if (!referer || !referer.includes(process.env.VERCEL_URL || "localhost")) {
        return res.status(403).json({ error: "Access denied" });
    }

    let targetUrl = `${BLOGGER_URL}/feeds/posts/default?alt=json&max-results=${maxResults}`;
    if (q) targetUrl += `&q=${encodeURIComponent(q)}`;
    if (label) targetUrl = `${BLOGGER_URL}/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json&max-results=${maxResults}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}