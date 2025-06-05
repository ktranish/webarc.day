import Script from "next/script";
import { ContactClient } from "./components";

export const metadata = {
  title: "Contact | webarc.day",
  description:
    "Get in touch with the webarc.day team. We're here to help with any questions or feedback you may have.",
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
            url: "https://webarc.day/contact",
            mainEntity: {
              "@type": "Organization",
              name: "webarc.day",
              url: "https://webarc.day",
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
