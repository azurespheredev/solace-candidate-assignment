import { db } from "@/db";
import { advocates } from "@/db/schema";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { sql } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE), 10);
  const offset = (page - 1) * pageSize;

  try {
    const data = await db
      .select()
      .from(advocates)
      .limit(pageSize)
      .offset(offset);

    const totalItemsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(advocates);

    const totalItems = totalItemsResult[0]?.count || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    return new Response(
      JSON.stringify({
        data,
        metadata: {
          page,
          pageSize,
          totalItems: parseInt(totalItems.toString(), 10),
          totalPages,
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching paginated advocates:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
