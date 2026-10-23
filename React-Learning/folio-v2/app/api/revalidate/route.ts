/**
 * app/api/revalidate/route.ts
 * ---------------------------------------------------------------------------
 * On-demand revalidation webhook for the headless CMS.
 *
 * Configure your CMS to POST here whenever content is published:
 *
 *   POST https://your-site.com/api/revalidate
 *   Header: x-revalidate-secret: <REVALIDATE_SECRET>
 *
 * (The secret may also be passed as ?secret=... for CMSs that cannot set
 * custom headers.) All CMS fetches share CONTENT_TAG, so a single call
 * refreshes every page that uses CMS data.
 */
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { CONTENT_TAG } from "@/lib/content";

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  const provided =
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret");

  // Reject if no secret is configured at all, or the caller's secret differs.
  if (!expected || provided !== expected) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 },
    );
  }

  // Purge cached CMS responses ('max' = serve stale while fetching fresh data)...
  revalidateTag(CONTENT_TAG, "max");
  // ...and the statically rendered pages that were built from them.
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
