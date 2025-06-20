import { BASE_URL } from "@/constants";
import type { Metadata } from "next";
import Script from "next/script";
import { ContactClient } from "./components";

export const metadata: Metadata = {
  title: "Contact | webarc.day",
  description:
    "Get in touch with the webarc.day team. We're here to help with any questions or feedback you may have.",
  openGraph: {
    title: "Contact | webarc.day",
    description:
      "Get in touch with the webarc.day team. We're here to help with any questions or feedback you may have.",
    type: "website",
    url: BASE_URL + "/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact | webarc.day",
    description:
      "Get in touch with the webarc.day team. We're here to help with any questions or feedback you may have.",
  },
  alternates: {
    canonical: BASE_URL + "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact webarc.day",
            description:
              "Get in touch with the webarc.day team. We're here to help with any questions or feedback you may have.",
            url: BASE_URL + "/contact",
            mainEntity: {
              "@type": "Organization",
              name: "webarc.day",
              url: BASE_URL,
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@id": BASE_URL,
                    name: "Home",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": BASE_URL + "/contact",
                    name: "Contact",
                  },
                },
              ],
            },
          }),
        }}
        id="contact-schema"
        type="application/ld+json"
      />
      <ContactClient />
    </>
  );
}
