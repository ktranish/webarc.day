import { BASE_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
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
      <body className={cn("antialiased", sora.className)}>{children}</body>
    </html>
  );
}
