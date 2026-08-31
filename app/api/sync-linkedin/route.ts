import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { Redis } from "@upstash/redis";
import { getCertifications, getExperience, getProjects, getAbout, getSkills } from "@/lib/sanity";

/**
 * Called by Vercel Cron (see vercel.json) on a daily schedule, or manually
 * via POST with the SYNC_SECRET header for an instant refresh.
 *
 * Data source: Sanity CMS (see README for why this replaces a direct
 * LinkedIn API pull). This route's job is caching + revalidation, not
 * fetching from LinkedIn.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  // Vercel's Cron jobs automatically send "Authorization: Bearer <value>"
  // using an env var specifically named CRON_SECRET — that's the one that
  // actually arrives on scheduled runs. SYNC_SECRET is kept as a fallback
  // so a manual curl/Postman trigger with that same header still works.
  const expected = process.env.CRON_SECRET || process.env.SYNC_SECRET;
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const redis = Redis.fromEnv();
    const [about, skills, certifications, experience, projects] = await Promise.all([
      getAbout(),
      getSkills(),
      getCertifications(),
      getExperience(),
      getProjects(),
    ]);

    // Stale-while-revalidate: write fresh data to Redis with a TTL.
    // If Sanity is ever unreachable, reads fall back to whatever's cached here.
    await redis.set("portfolio:snapshot", JSON.stringify({ about, skills, certifications, experience, projects, syncedAt: Date.now() }), {
      ex: 60 * 60 * 24 * 3, // 3-day TTL — stale data still beats a broken page
    });

    // Trigger ISR so already-built pages pick up the new content
    revalidateTag("linkedin-data");
    revalidateTag("linkedin-projects");

    return NextResponse.json({ ok: true, syncedAt: new Date().toISOString() });
  } catch (err) {
    console.error("sync-linkedin failed", err);
    // Graceful fallback: don't throw 500s that could take the site down —
    // stale cached content keeps serving until the next successful sync.
    return NextResponse.json({ ok: false, error: "sync failed, serving cached data" }, { status: 200 });
  }
}
