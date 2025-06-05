import { BackLink } from "@/components/back-link";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sitemap | webarc.day",
  description:
    "Explore all pages and features available on webarc.day. Find links to profiles, legal documents, and more.",
  openGraph: {
    title: "Sitemap | webarc.day",
    description:
      "Explore all pages and features available on webarc.day. Find links to profiles, legal documents, and more.",
    type: "website",
    url: "https://www.webarc.day/sitemap",
  },
  twitter: {
    card: "summary",
    title: "Sitemap | webarc.day",
    description:
      "Explore all pages and features available on webarc.day. Find links to profiles, legal documents, and more.",
  },
  alternates: {
    canonical: "https://www.webarc.day/sitemap",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SITEMAP_SECTIONS = [
  {
    title: "Main Pages",
    links: [
      { title: "News", href: "/" },
      { title: "Blog", href: "/blog" },
      { title: "Tools", href: "/tools" },
    ],
  },
  {
    title: "Help",
    links: [
      {
        title: "Contact",
        href: "/contact",
      },
      { title: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    title: "Legal Documents",
    links: [
      { title: "Legal index", href: "/legal" },
      { title: "Terms of Service", href: "/legal/terms" },
      { title: "Privacy Policy", href: "/legal/privacy-policy" },
    ],
  },
  {
    title: "Connect",
    links: [
      { title: "Twitter", href: "https://twitter.com/ktranish" },
      { title: "Github", href: "https://github.com/ktranish" },
    ],
  },
];

function Header() {
  return (
    <header className="flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Sitemap
      </h1>
      <p className="text-gray-600 sm:text-lg">
        Explore all pages and features available on webarc.day
      </p>
    </header>
  );
}

function Section({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <ul className="flex flex-col gap-y-2">
        {links.map((link) => (
          <li key={link.title}>
            <Link
              className="text-blue-600 transition-colors hover:text-blue-700"
              href={link.href}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SitemapPage() {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sitemap | webarc.day",
            description:
              "Explore all pages and features available on webarc.day. Find links to profiles, legal documents, and more.",
            url: "https://www.webarc.day/sitemap",
            publisher: {
              "@type": "Organization",
              name: "webarc.day",
              url: "https://www.webarc.day",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@id": "https://www.webarc.day",
                    name: "Home",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": "https://www.webarc.day/sitemap",
                    name: "Sitemap",
                  },
                },
              ],
            },
            mainEntity: {
              "@type": "SiteNavigationElement",
              name: "Site Navigation",
              url: "https://www.webarc.day/sitemap",
              hasPart: SITEMAP_SECTIONS.flatMap((section) =>
                section.links.map((link) => ({
                  "@type": "WebPage",
                  name: link.title,
                  url: link.href.startsWith("http")
                    ? link.href
                    : `https://www.webarc.day${link.href}`,
                })),
              ),
            },
          }),
        }}
        id="sitemap-schema"
        type="application/ld+json"
      />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <BackLink />
        <div className="flex flex-col gap-y-8">
          <Header />
          <div className="grid gap-8 sm:grid-cols-2">
            {SITEMAP_SECTIONS.map((section) => (
              <Section key={section.title} {...section} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
