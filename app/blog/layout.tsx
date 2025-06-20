import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  type: "blog-index",
  title: "Blog | webarc.day",
  description:
    "Stay updated with the latest trends, technologies, and best practices in web development. Expert insights, tutorials, and guides.",
  path: "/blog",
  posts: [], // Will be populated dynamically from the API
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
