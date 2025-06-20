import { BackLink } from "@/components/back-link";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  type: "legal",
  title: "Cookie Policy | webarc.day",
  description:
    "Learn about how webarc.day uses cookies and similar technologies to enhance your browsing experience and improve our services.",
  path: "/legal/cookies",
  documentType: "cookies",
});

function Header() {
  return (
    <header className="flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Cookie Policy
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

export default function CookiePolicy() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <BackLink />

      <Header />

      <article className="prose prose-lg">
        <div>
          <section aria-labelledby="what-are-cookies-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="what-are-cookies-heading"
            >
              1. What Are Cookies
            </h2>
            <p className="text-gray-600">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work more efficiently and provide useful information
              to website owners.
            </p>
          </section>

          <section aria-labelledby="how-we-use-cookies-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="how-we-use-cookies-heading"
            >
              2. How We Use Cookies
            </h2>
            <p className="text-gray-600">
              We use cookies for the following purposes:
            </p>
            <ul
              aria-labelledby="how-we-use-cookies-heading"
              className="list-disc text-gray-600"
            >
              <li>
                Essential cookies: Required for the website to function properly
              </li>
              <li>Authentication cookies: To keep you signed in</li>
              <li>
                Preference cookies: To remember your settings and preferences
              </li>
              <li>
                Analytics cookies: To understand how visitors interact with our
                website
              </li>
              <li>Marketing cookies: To deliver relevant advertisements</li>
            </ul>
          </section>

          <section aria-labelledby="types-of-cookies-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="types-of-cookies-heading"
            >
              3. Types of Cookies We Use
            </h2>
            <div>
              <div>
                <h3
                  className="text-xl font-medium text-gray-900"
                  id="essential-cookies-heading"
                >
                  Essential Cookies
                </h3>
                <p className="text-gray-600">
                  These cookies are necessary for the website to function and
                  cannot be switched off in our systems. They are usually only
                  set in response to actions made by you which amount to a
                  request for services, such as setting your privacy
                  preferences, logging in, or filling in forms.
                </p>
              </div>
              <div>
                <h3
                  className="text-xl font-medium text-gray-900"
                  id="performance-cookies-heading"
                >
                  Performance Cookies
                </h3>
                <p className="text-gray-600">
                  These cookies allow us to count visits and traffic sources so
                  we can measure and improve the performance of our site. They
                  help us to know which pages are the most and least popular and
                  see how visitors move around the site.
                </p>
              </div>
              <div>
                <h3
                  className="text-xl font-medium text-gray-900"
                  id="functional-cookies-heading"
                >
                  Functional Cookies
                </h3>
                <p className="text-gray-600">
                  These cookies enable the website to provide enhanced
                  functionality and personalization. They may be set by us or by
                  third-party providers whose services we have added to our
                  pages.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="third-party-cookies-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="third-party-cookies-heading"
            >
              4. Third-Party Cookies
            </h2>
            <p className="text-gray-600">
              In addition to our own cookies, we may also use various
              third-party cookies to report usage statistics of the website,
              deliver advertisements on and through the website, and so on.
            </p>
          </section>

          <section aria-labelledby="managing-cookies-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="managing-cookies-heading"
            >
              5. Managing Cookies
            </h2>
            <p className="text-gray-600">
              Most web browsers allow you to control cookies through their
              settings preferences. However, limiting cookies may impact your
              experience using our website. To learn more about cookies and how
              to manage them, visit:
            </p>
            <ul
              aria-labelledby="managing-cookies-heading"
              className="list-disc text-gray-600"
            >
              <li>
                <a
                  aria-label="Visit AboutCookies.org (opens in new tab)"
                  className="text-blue-600 transition-colors hover:text-blue-700"
                  href="https://www.aboutcookies.org"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  AboutCookies.org
                </a>
              </li>
              <li>
                <a
                  aria-label="Visit AllAboutCookies.org (opens in new tab)"
                  className="text-blue-600 transition-colors hover:text-blue-700"
                  href="https://www.allaboutcookies.org"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  AllAboutCookies.org
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="changes-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="changes-heading"
            >
              6. Changes to This Policy
            </h2>
            <p className="text-gray-600">
              We may update our Cookie Policy from time to time. We will notify
              you of any changes by posting the new Cookie Policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="contact-heading"
            >
              8. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about our use of cookies, please contact
              us at{" "}
              <a
                href="mailto:kenny@ketryon.com"
                className="text-blue-600 hover:text-blue-800"
              >
                kenny@ketryon.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
