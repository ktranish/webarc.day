import { BackLink } from "@/components/back-link";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  type: "legal",
  title: "Terms of Service | webarc.day",
  description:
    "Read our Terms of Service to understand the rules and guidelines for using webarc.day. Learn about user responsibilities, content policies, and service terms.",
  path: "/legal/terms",
  documentType: "terms",
});

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
              Permission is granted to temporarily use webarc.day for personal,
              non-commercial purposes. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul
              aria-labelledby="license-heading"
              className="list-disc text-gray-600"
            >
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on webarc.day
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
              webarc.day, you grant us a worldwide, non-exclusive, royalty-free
              license to use, reproduce, modify, and distribute your content in
              connection with providing and improving our service.
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
                Pay all fees in accordance with the pricing and terms presented
                to you
              </li>
              <li>Provide accurate and complete payment information</li>
              <li>
                Authorize us to charge your payment method for the subscription
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
            <p className="text-gray-600">You agree not to use webarc.day to:</p>
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
              We may terminate or suspend your access to webarc.day immediately,
              without prior notice or liability, for any reason whatsoever,
              including without limitation if you breach the Terms.
            </p>
          </section>

          <section aria-labelledby="disclaimer-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="disclaimer-heading"
            >
              7. Disclaimer
            </h2>
            <p className="text-gray-600">
              The materials on webarc.day are provided on an &apos;as is&apos;
              basis. webarc.day makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section aria-labelledby="limitations-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="limitations-heading"
            >
              8. Limitations
            </h2>
            <p className="text-gray-600">
              In no event shall webarc.day or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on webarc.day, even if
              webarc.day or a webarc.day authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section aria-labelledby="revisions-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="revisions-heading"
            >
              9. Revisions and Errata
            </h2>
            <p className="text-gray-600">
              The materials appearing on webarc.day could include technical,
              typographical, or photographic errors. webarc.day does not warrant
              that any of the materials on its website are accurate, complete,
              or current. webarc.day may make changes to the materials contained
              on its website at any time without notice.
            </p>
          </section>

          <section aria-labelledby="links-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="links-heading"
            >
              10. Links
            </h2>
            <p className="text-gray-600">
              webarc.day has not reviewed all of the sites linked to its website
              and is not responsible for the contents of any such linked site.
              The inclusion of any link does not imply endorsement by webarc.day
              of the site. Use of any such linked website is at the user&apos;s
              own risk.
            </p>
          </section>

          <section aria-labelledby="modifications-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="modifications-heading"
            >
              11. Modifications
            </h2>
            <p className="text-gray-600">
              webarc.day may revise these terms of service for its website at
              any time without notice. By using this website you are agreeing to
              be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section aria-labelledby="governing-law-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="governing-law-heading"
            >
              12. Governing Law
            </h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in
              accordance with the laws and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="contact-heading"
            >
              13. Contact Information
            </h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please
              contact us at{" "}
              <a
                href="mailto:kenny@ketryon.com"
                className="text-blue-600 hover:text-blue-800"
              >
                kenny@ketryon.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
