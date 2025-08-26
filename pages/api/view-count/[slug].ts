import type { NextApiRequest, NextApiResponse } from "next";

// In-memory store for views
const viewsStore: Record<string, number> = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ total?: string; message?: string }>
) {
  const slug = req.query.slug?.toString();

  if (!slug) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    if (req.method === "POST") {
      // Increment view count
      if (!viewsStore[slug]) {
        viewsStore[slug] = 1;
      } else {
        viewsStore[slug] += 1;
      }

      return res.status(200).json({
        total: viewsStore[slug].toString(),
      });
    }

    if (req.method === "GET") {
      const count = viewsStore[slug] || 0;
      return res.status(200).json({ total: count.toString() });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
