export default async function handler(req, res) {
    // 1. YOUR PRIVATE BLOGGER URL
    const BLOG_URL = "https://bsiw729rj38e9.blogspot.com"; 


    const { q, label, maxResults = 15 } = req.query;

    // 2. Security: Verify request is from your own Vercel site
    const referer = req.headers.referer;
    // During local development, referer might be localhost. 
    // In production, process.env.VERCEL_URL is your domain.
    if (!referer || (!referer.includes('vercel.app') && !referer.includes('localhost'))) {
        return res.status(403).json({ error: "Access Denied" });
    }

    // 3. Construct the secret Blogger API URL
    let bloggerUrl = `${BLOG_URL}/feeds/posts/default?alt=json&max-results=${maxResults}`;
    
    if (q) {
        bloggerUrl += `&q=${encodeURIComponent(q)}`;
    } else if (label) {
        bloggerUrl = `${BLOG_URL}/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json&max-results=${maxResults}`;
    }

    try {
        const response = await fetch(bloggerUrl);
        const data = await response.json();
        
        // Return the data to your frontend
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Blogger feed" });
    }
}