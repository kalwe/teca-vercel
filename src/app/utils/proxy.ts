import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API Proxy Hit:", req.method, req.url);
  console.log("Request Headers:", req.headers);

  try {
    const apiUrl = "https://stou.ifractal.com.br/teca/rest/";

    // Construct the full URL for GET requests with query parameters
    const fullUrl = req.method === "GET" && req.query
      ? `${apiUrl}?${new URLSearchParams(req.query as Record<string, string>).toString()}`
      : apiUrl;

    console.log("Full URL:", fullUrl);

    // Forward headers, ensuring the Token is included
    const forwardedHeaders = {
      "Content-Type": "application/json",
      "User": req.headers.user || "",
      "Token": req.headers.token || "",
    };

    console.log("Forwarded Headers:", forwardedHeaders);

    // Make the request to the external API
    const apiResponse = await fetch(fullUrl, {
      method: req.method,
      headers: forwardedHeaders,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    // Get the content type
    const contentType = apiResponse.headers.get("content-type");

    // Check if the response is JSON
    const responseData =
      contentType && contentType.includes("application/json")
        ? await apiResponse.json()
        : await apiResponse.text();

    console.log("API Response:", responseData);

    // Return the API response with the original status
    res.status(apiResponse.status).json(responseData);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error" });
  }
}
