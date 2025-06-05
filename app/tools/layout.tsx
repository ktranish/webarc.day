import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Tools & Resources | webarc.day",
  description:
    "A curated collection of essential developer tools and resources to enhance your development workflow. Find the best tools for web development, productivity, and more.",
  openGraph: {
    title: "Developer Tools & Resources | webarc.day",
    description:
      "A curated collection of essential developer tools and resources to enhance your development workflow. Find the best tools for web development, productivity, and more.",
    type: "website",
    url: "https://www.webarc.day/tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Tools & Resources | webarc.day",
    description:
      "A curated collection of essential developer tools and resources to enhance your development workflow. Find the best tools for web development, productivity, and more.",
  },
  alternates: {
    canonical: "https://www.webarc.day/tools",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    language: "en",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
