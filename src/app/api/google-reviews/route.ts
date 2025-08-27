import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) {
    return NextResponse.json({ reviews: [] }, { status: 200 });
  }
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,reviews&reviews_no_translations=true&key=${key}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; dental-clinic-website/1.0)',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Google API responded with status: ${res.status}`);
      return NextResponse.json({ reviews: [] }, { status: 200 });
    }

    const json = await res.json();
    const reviews = (json?.result?.reviews || []).slice(0, 3);
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Google Reviews API error:', errorMessage);
    return NextResponse.json({ reviews: [] }, { status: 200 });
  }
}
