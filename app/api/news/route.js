import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const HN_URL =
  'https://hn.algolia.com/api/v1/search?query=artificial%20intelligence&tags=story&hitsPerPage=10';

export async function GET() {
  try {
    const response = await fetch(HN_URL, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 0 },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream news API failed (${response.status}).` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const items = (data.hits || [])
      .filter((hit) => hit.title)
      .map((hit) => ({
        id: String(hit.objectID),
        title: hit.title,
        url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        points: hit.points ?? 0,
        author: hit.author || 'unknown',
        comments: hit.num_comments ?? 0,
        createdAt: hit.created_at || null,
        source: 'Hacker News',
      }));

    return NextResponse.json({
      topic: 'AI',
      fetchedAt: new Date().toISOString(),
      items,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch news.' },
      { status: 500 }
    );
  }
}
