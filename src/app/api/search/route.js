import { NextResponse } from "next/server";
import axios from "axios";

const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;

export async function POST(request) {
  const { term, location } = await request.json();

  console.log("attempting search for", term, location, process.env);
  try {
    console.log("try worked for", term, location, googlePlacesApiKey);

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: `${term} in ${location}`,
          key: googlePlacesApiKey,
        },
      }
    );

    console.log("response", response);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to search restaurants" },
      { status: 500 }
    );
  }
}
