import { BASE_URL } from "@/constants";
import type { Metadata } from "next";
import Script from "next/script";
import { Landing } from "./components";

export const metadata: Metadata = {
  title: "Daily News, Curated for You | webarc.day",
  description:
    "Discover the latest news, tutorials, and trends in web development, all curated and organized in one place.",
  openGraph: {
    title: "Daily News, Curated for You | webarc.day",
    description:
      "Discover the latest news, tutorials, and trends in web development, all curated and organized in one place.",
    type: "website",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily News, Curated for You | webarc.day",
    description:
      "Discover the latest news, tutorials, and trends in web development, all curated and organized in one place.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function Page() {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "webarc.day",
            description:
              "Your daily source for web development news and resources",
            url: BASE_URL,
            publisher: {
              "@type": "Organization",
              name: "webarc.day",
              url: BASE_URL,
            },
          }),
        }}
        id="website-schema"
        type="application/ld+json"
      />
      <Landing />
    </>
  );
}
