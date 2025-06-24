import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const photoReference = searchParams.get("photoReference");

  if (!photoReference) {
    return new NextResponse("Missing photoReference", { status: 400 });
  }

  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new NextResponse("Failed to fetch image", { status: 500 });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Optional: cache for 1 day
      },
    });
  } catch (err) {
    console.error("Image proxy error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
