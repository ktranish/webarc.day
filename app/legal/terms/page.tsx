import { BackLink } from "@/components/back-link";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Terms of Service | webarc.day",
  description:
    "Read our Terms of Service to understand the rules and guidelines for using webarc.day. Learn about user responsibilities, content policies, and service terms.",
};

function Header() {
  return (
    <header className="flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Terms of Service
      </h1>
      <p className="text-gray-600 sm:text-lg">
        Last updated:{" "}
        <time dateTime={new Date().toISOString()}>
          {new Date().toLocaleDateString()}
        </time>
      </p>
    </header>
  );
}

export default function TermsOfService() {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms of Service | webarc.day",
            description:
              "Read our Terms of Service to understand the rules and guidelines for using webarc.day. Learn about user responsibilities, content policies, and service terms.",
            publisher: {
              "@type": "Organization",
              name: "webarc.day",
              url: "https://webarc.day",
            },
            mainEntity: {
              "@type": "Article",
              name: "Terms of Service",
              headline: "Terms of Service | webarc.day",
              datePublished: "2024-01-01",
              dateModified: "2024-01-01",
              author: {
                "@type": "Organization",
                name: "webarc.day",
              },
            },
          }),
        }}
        id="terms-of-service-schema"
        type="application/ld+json"
      />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <BackLink />

        <Header />

        <article className="prose prose-lg">
          <div>
            <section aria-labelledby="agreement-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="agreement-heading"
              >
                1. Agreement to Terms
              </h2>
              <p className="text-gray-600">
                By accessing or using webarc.day, you agree to be bound by these
                Terms of Service and all applicable laws and regulations. If you
                do not agree with any of these terms, you are prohibited from
                using or accessing this site.
              </p>
            </section>

            <section aria-labelledby="license-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="license-heading"
              >
                2. Use License
              </h2>
              <p className="text-gray-600">
                Permission is granted to temporarily use webarc.day for
                personal, non-commercial purposes. This is the grant of a
                license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul
                aria-labelledby="license-heading"
                className="list-disc text-gray-600"
              >
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained on webarc.day
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
                <li>
                  Transfer the materials to another person or &quot;mirror&quot;
                  the materials on any other server
                </li>
              </ul>
            </section>

            <section aria-labelledby="content-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="content-heading"
              >
                3. User Content
              </h2>
              <p className="text-gray-600">
                You retain all rights to your content. By posting content to
                webarc.day, you grant us a worldwide, non-exclusive,
                royalty-free license to use, reproduce, modify, and distribute
                your content in connection with providing and improving our
                service.
              </p>
            </section>

            <section aria-labelledby="subscription-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="subscription-heading"
              >
                4. Subscription and Payments
              </h2>
              <p className="text-gray-600">
                Some features of webarc.day require a paid subscription. By
                subscribing, you agree to:
              </p>
              <ul
                aria-labelledby="subscription-heading"
                className="list-disc text-gray-600"
              >
                <li>
                  Pay all fees in accordance with the pricing and terms
                  presented to you
                </li>
                <li>Provide accurate and complete payment information</li>
                <li>
                  Authorize us to charge your payment method for the
                  subscription
                </li>
                <li>
                  Understand that subscription fees are non-refundable except as
                  required by law
                </li>
              </ul>
            </section>

            <section aria-labelledby="prohibited-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="prohibited-heading"
              >
                5. Prohibited Uses
              </h2>
              <p className="text-gray-600">
                You agree not to use webarc.day to:
              </p>
              <ul
                aria-labelledby="prohibited-heading"
                className="list-disc text-gray-600"
              >
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>
                  Post or transmit any harmful, offensive, or inappropriate
                  content
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the service
                </li>
                <li>Interfere with the proper functioning of the service</li>
              </ul>
            </section>

            <section aria-labelledby="termination-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="termination-heading"
              >
                6. Termination
              </h2>
              <p className="text-gray-600">
                We may terminate or suspend your access to webarc.day
                immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the
                Terms.
              </p>
            </section>

            <section aria-labelledby="liability-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="liability-heading"
              >
                7. Limitation of Liability
              </h2>
              <p className="text-gray-600">
                In no event shall webarc.day, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses.
              </p>
            </section>

            <section aria-labelledby="changes-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="changes-heading"
              >
                8. Changes to Terms
              </h2>
              <p className="text-gray-600">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will provide at least 30
                days&apos; notice prior to any new terms taking effect.
              </p>
            </section>

            <section aria-labelledby="contact-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="contact-heading"
              >
                9. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please{" "}
                <Link
                  aria-label="Send email to legal team"
                  className="text-blue-600 transition-colors hover:text-blue-700"
                  href="mailto:kenny@ketryon.com?subject=Contact%20Support"
                >
                  contact us
                </Link>
              </p>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
