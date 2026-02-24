export default async function handler(req, res) {
    const { q, label, maxResults = 15 } = req.query;
    const BLOG_URL = "https://bsiw729rj38e9.blogspot.com"; // Replace this
    
    // Construct the Blogger Feed URL based on request
    let bloggerUrl = `${BLOG_URL}/feeds/posts/default?alt=json&max-results=${maxResults}`;
    
    if (q) bloggerUrl += `&q=${q}`;
    if (label) bloggerUrl = `${BLOG_URL}/feeds/posts/default/-/${label}?alt=json&max-results=${maxResults}`;

    try {
        const response = await fetch(bloggerUrl, {
            headers: { 'User-Agent': 'Vercel-Proxy' }
        });
        const data = await response.json();
        
        // Return data to your Vercel frontend
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch feed" });
    }
}