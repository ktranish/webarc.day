import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { BASE_URL } from "@/constants";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "motion/react";
import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const sora = Sora({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#2b7fff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

const baseMetadata = buildMetadata({
  type: "news",
  title: "Daily News, Curated for You",
  description:
    "Discover the latest news, tutorials, and trends in web development, all curated and organized in one place.",
  path: "/",
  articles: [], // Will be populated dynamically
});

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(BASE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PP5R7VGW');
            `,
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "webarc.day",
              url: BASE_URL,
              logo: BASE_URL + "/logo.png",
              description:
                "Your daily dose of web development news and insights",
              sameAs: [
                "https://twitter.com/itsk3nny_",
                "https://github.com/iamk3nnyt",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "kenny@ketryon.com",
                availableLanguage: ["English"],
              },
              founder: {
                "@type": "Person",
                name: "Kenny Tran",
                url: "https://kennyt.me",
              },
              foundingDate: "2024",
              knowsAbout: [
                "Web Development",
                "Programming",
                "Developer Tools",
                "News Aggregation",
              ],
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "webarc.day",
              url: BASE_URL,
              description: "Daily curated web development news and tools",
              publisher: {
                "@type": "Organization",
                name: "webarc.day",
                url: BASE_URL,
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: BASE_URL + "/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={cn("antialiased", sora.className)}>
        <noscript>
          <iframe
            title="gtm"
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DF5DBCR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <MotionConfig reducedMotion="user">
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
        </MotionConfig>
      </body>
    </html>
  );
}
