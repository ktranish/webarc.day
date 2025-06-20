import { BackLink } from "@/components/back-link";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  type: "legal",
  title: "Refund Policy | webarc.day",
  description:
    "Learn about webarc.day's refund and cancellation policies for our services and subscriptions.",
  path: "/legal/refund",
  documentType: "refund",
});

function Header() {
  return (
    <header className="flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Refund Policy
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

export default function RefundPolicy() {
  return (
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
              At webarc.day, we strive to provide excellent service and value to
              our customers. This Refund Policy outlines the terms and
              conditions for refunds and cancellations of our services. We want
              you to be completely satisfied with your purchase.
            </p>
          </section>

          <section aria-labelledby="general-refund-policy-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="general-refund-policy-heading"
            >
              2. General Refund Policy
            </h2>
            <p className="text-gray-600">
              We offer refunds under the following circumstances:
            </p>
            <ul
              aria-labelledby="general-refund-policy-heading"
              className="list-disc text-gray-600"
            >
              <li>
                <strong>Service Issues:</strong> If our service is not
                functioning as advertised due to technical issues on our end
              </li>
              <li>
                <strong>Billing Errors:</strong> If you were charged incorrectly
                or for services you did not receive
              </li>
              <li>
                <strong>Duplicate Charges:</strong> If you were charged multiple
                times for the same service
              </li>
              <li>
                <strong>Unauthorized Charges:</strong> If charges were made
                without your authorization
              </li>
            </ul>
          </section>

          <section aria-labelledby="subscription-refunds-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="subscription-refunds-heading"
            >
              3. Subscription Refunds
            </h2>
            <div>
              <h3
                className="text-xl font-medium text-gray-900"
                id="monthly-subscriptions-heading"
              >
                3.1 Monthly Subscriptions
              </h3>
              <p className="text-gray-600">
                For monthly subscriptions, we offer a 30-day money-back
                guarantee. If you are not satisfied with our service within the
                first 30 days of your subscription, you may request a full
                refund.
              </p>

              <h3
                className="text-xl font-medium text-gray-900"
                id="annual-subscriptions-heading"
              >
                3.2 Annual Subscriptions
              </h3>
              <p className="text-gray-600">
                For annual subscriptions, we offer a 30-day money-back
                guarantee. After the first 30 days, refunds are provided on a
                prorated basis for the remaining unused period.
              </p>

              <h3
                className="text-xl font-medium text-gray-900"
                id="subscription-cancellation-heading"
              >
                3.3 Subscription Cancellation
              </h3>
              <p className="text-gray-600">
                You may cancel your subscription at any time through your
                account settings. Cancellation will take effect at the end of
                your current billing period. No refunds are provided for partial
                months of service after the initial 30-day period.
              </p>
            </div>
          </section>

          <section aria-labelledby="one-time-purchases-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="one-time-purchases-heading"
            >
              4. One-Time Purchases
            </h2>
            <p className="text-gray-600">
              For one-time purchases of digital products or services:
            </p>
            <ul
              aria-labelledby="one-time-purchases-heading"
              className="list-disc text-gray-600"
            >
              <li>
                <strong>Digital Products:</strong> Refunds are available within
                14 days of purchase if the product is defective or not as
                described
              </li>
              <li>
                <strong>Services:</strong> Refunds are available if the service
                cannot be delivered due to technical issues on our end
              </li>
              <li>
                <strong>Consulting Services:</strong> Refunds are available if
                the service has not been provided or if there are extenuating
                circumstances
              </li>
            </ul>
          </section>

          <section aria-labelledby="non-refundable-items-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="non-refundable-items-heading"
            >
              5. Non-Refundable Items
            </h2>
            <p className="text-gray-600">
              The following items are generally non-refundable:
            </p>
            <ul
              aria-labelledby="non-refundable-items-heading"
              className="list-disc text-gray-600"
            >
              <li>Custom development work that has been completed</li>
              <li>Consulting services that have been provided</li>
              <li>Digital products that have been downloaded or accessed</li>
              <li>Services that have been fully utilized</li>
              <li>Third-party fees or charges</li>
            </ul>
          </section>

          <section aria-labelledby="refund-process-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="refund-process-heading"
            >
              6. Refund Process
            </h2>
            <div>
              <h3
                className="text-xl font-medium text-gray-900"
                id="requesting-refund-heading"
              >
                6.1 Requesting a Refund
              </h3>
              <p className="text-gray-600">
                To request a refund, please contact us at{" "}
                <a
                  href="mailto:kenny@ketryon.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  kenny@ketryon.com
                </a>{" "}
                with the following information:
              </p>
              <ul
                aria-labelledby="requesting-refund-heading"
                className="list-disc text-gray-600"
              >
                <li>Your account email address</li>
                <li>Order or transaction ID</li>
                <li>Reason for the refund request</li>
                <li>Date of purchase</li>
              </ul>

              <h3
                className="text-xl font-medium text-gray-900"
                id="refund-processing-heading"
              >
                6.2 Refund Processing
              </h3>
              <p className="text-gray-600">
                Once we receive your refund request, we will review it within
                3-5 business days. If approved, refunds will be processed to
                your original payment method within 5-10 business days,
                depending on your payment provider.
              </p>
            </div>
          </section>

          <section aria-labelledby="dispute-resolution-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="dispute-resolution-heading"
            >
              7. Dispute Resolution
            </h2>
            <p className="text-gray-600">
              If you disagree with our refund decision, you may:
            </p>
            <ul
              aria-labelledby="dispute-resolution-heading"
              className="list-disc text-gray-600"
            >
              <li>
                Contact us to discuss the matter further and provide additional
                information
              </li>
              <li>
                Escalate the issue to our customer service team for review
              </li>
              <li>
                If you paid via credit card, you may contact your card issuer to
                dispute the charge
              </li>
            </ul>
          </section>

          <section aria-labelledby="policy-updates-heading">
            <h2
              className="text-2xl font-semibold text-gray-900"
              id="policy-updates-heading"
            >
              8. Policy Updates
            </h2>
            <p className="text-gray-600">
              We reserve the right to modify this Refund Policy at any time. Any
              changes will be posted on this page with an updated &quot;Last
              updated&quot; date. Continued use of our services after changes
              constitutes acceptance of the updated policy.
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
              If you have any questions about this Refund Policy or need to
              request a refund, please contact us at{" "}
              <a
                href="mailto:kenny@ketryon.com"
                className="text-blue-600 hover:text-blue-800"
              >
                kenny@ketryon.com
              </a>
              . We are here to help and will respond to your inquiry as quickly
              as possible.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
