import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | webarc.day",
  description:
    "Stay updated with the latest trends, technologies, and best practices in web development. Expert insights, tutorials, and guides.",
  openGraph: {
    title: "Blog | webarc.day",
    description:
      "Stay updated with the latest trends, technologies, and best practices in web development. Expert insights, tutorials, and guides.",
    type: "website",
    url: "https://webarc.day/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | webarc.day",
    description:
      "Stay updated with the latest trends, technologies, and best practices in web development. Expert insights, tutorials, and guides.",
  },
  alternates: {
    canonical: "https://webarc.day/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    language: "en",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
