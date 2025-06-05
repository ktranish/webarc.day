import { BackLink } from "@/components/back-link";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Privacy Policy | webarc.day",
  description:
    "Learn about how webarc.day collects, uses, and protects your personal information. Understand your privacy rights and data protection measures.",
};

function Header() {
  return (
    <header className="flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Privacy Policy
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

export default function PrivacyPolicy() {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy | webarc.day",
            description:
              "Learn about how webarc.day collects, uses, and protects your personal information. Understand your privacy rights and data protection measures.",
            publisher: {
              "@type": "Organization",
              name: "webarc.day",
              url: "https://webarc.day",
            },
            mainEntity: {
              "@type": "Article",
              name: "Privacy Policy",
              headline: "Privacy Policy | webarc.day",
              datePublished: "2024-01-01",
              dateModified: "2024-01-01",
              author: {
                "@type": "Organization",
                name: "webarc.day",
              },
            },
          }),
        }}
        id="privacy-policy-schema"
        type="application/ld+json"
      />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <BackLink />

        <Header />

        <article className="prose prose-lg">
          <div>
            <section aria-labelledby="introduction-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="introduction-heading"
              >
                1. Introduction
              </h2>
              <p className="text-gray-600">
                webarc.day (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our service.
              </p>
            </section>

            <section aria-labelledby="information-collection-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="information-collection-heading"
              >
                2. Information We Collect
              </h2>
              <div>
                <div>
                  <h3
                    className="text-xl font-medium text-gray-900"
                    id="personal-info-heading"
                  >
                    2.1 Personal Information
                  </h3>
                  <p className="text-gray-600">
                    We collect information that you provide directly to us,
                    including:
                  </p>
                  <ul
                    aria-labelledby="personal-info-heading"
                    className="list-disc text-gray-600"
                  >
                    <li>Email address</li>
                    <li>Full name</li>
                    <li>Profile information (bio, avatar, header image)</li>
                    <li>Links and their associated data</li>
                  </ul>
                </div>

                <div>
                  <h3
                    className="text-xl font-medium text-gray-900"
                    id="usage-info-heading"
                  >
                    2.2 Usage Information
                  </h3>
                  <p className="text-gray-600">
                    We automatically collect certain information about your
                    device and usage, including:
                  </p>
                  <ul
                    aria-labelledby="usage-info-heading"
                    className="list-disc text-gray-600"
                  >
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Operating system</li>
                    <li>Pages visited</li>
                    <li>Time and date of visits</li>
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="information-use-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="information-use-heading"
              >
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600">
                We use the information we collect to:
              </p>
              <ul
                aria-labelledby="information-use-heading"
                className="list-disc text-gray-600"
              >
                <li>Provide and maintain our service</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our service</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </section>

            <section aria-labelledby="data-security-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="data-security-heading"
              >
                4. Data Storage and Security
              </h2>
              <p className="text-gray-600">
                We use Supabase for data storage and authentication. Your data
                is stored securely and encrypted in transit and at rest. We
                implement appropriate technical and organizational measures to
                protect your personal information.
              </p>
            </section>

            <section aria-labelledby="third-party-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="third-party-heading"
              >
                5. Third-Party Services
              </h2>
              <p className="text-gray-600">
                We use the following third-party services:
              </p>
              <ul
                aria-labelledby="third-party-heading"
                className="list-disc text-gray-600"
              >
                <li>Supabase for database and authentication</li>
                <li>Stripe for payment processing</li>
                <li>Vercel for hosting</li>
              </ul>
            </section>

            <section aria-labelledby="your-rights-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="your-rights-heading"
              >
                6. Your Rights
              </h2>
              <p className="text-gray-600">You have the right to:</p>
              <ul
                aria-labelledby="your-rights-heading"
                className="list-disc text-gray-600"
              >
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section aria-labelledby="contact-heading">
              <h2
                className="text-2xl font-semibold text-gray-900"
                id="contact-heading"
              >
                7. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please{" "}
                <Link
                  aria-label="Send email to privacy team"
                  className="text-blue-600 transition-colors hover:text-blue-700"
                  href="/contact"
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
