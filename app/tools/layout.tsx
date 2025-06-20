import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  type: "tools",
  title: "Developer Tools & Resources | webarc.day",
  description:
    "A curated collection of essential developer tools and resources to enhance your development workflow. Find the best tools for web development, productivity, and more.",
  path: "/tools",
  tools: [], // Will be populated dynamically from the API
});

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
