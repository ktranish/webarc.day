import { BASE_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "Daily News, Curated for You",
  description:
    "Discover the latest news, tutorials, and trends in web development, all curated and organized in one place.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Daily News, Curated for You",
    description:
      "Discover the latest news, tutorials, and trends in web development, all curated and organized in one place.",
    url: "./",
    siteName: "webarc.day",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "webarc.day - Your Daily Web Development News Source",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily News, Curated for You",
    description:
      "Discover the latest news, tutorials, and trends in web development, all curated and organized in one place.",
    images: ["/og.png"],
  },
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
      </head>
      <body className={cn("antialiased", sora.className)}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DF5DBCR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
