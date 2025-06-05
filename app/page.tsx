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
    url: "https://www.webarc.day",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily News, Curated for You | webarc.day",
    description:
      "Discover the latest news, tutorials, and trends in web development, all curated and organized in one place.",
  },
  alternates: {
    canonical: "https://www.webarc.day",
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
            url: "https://www.webarc.day",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.webarc.day/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            publisher: {
              "@type": "Organization",
              name: "webarc.day",
              url: "https://www.webarc.day",
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
