"use client";

import { useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import toast from "react-hot-toast";

function Arrows() {
  return (
    <div aria-hidden="true">
      <svg
        aria-label="Decorative arrow pattern"
        className="absolute top-44 left-[-80px] hidden rotate-[-15deg] opacity-40 md:block"
        height={204.723}
        width={170.95}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeLinecap="round">
          <path
            d="M10.002 14.635c15.79-.47 70.3-8.66 95.23-2.09 24.93 6.57 49.77 23.34 54.36 41.51 4.59 18.17-1.99 44.08-26.84 67.52-24.84 23.45-101.66 60.75-122.23 73.15"
            fill="none"
            stroke="#1e1e1e"
            strokeDasharray="8 10"
            strokeWidth={2.5}
          />
          <path
            d="M27.032 175.945c-7.8 7.05-14.36 15.01-16.51 18.78M35.232 190.955c-10.97 1.26-20.72 3.4-24.71 3.77"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth={2.5}
          />
        </g>
      </svg>
      <svg
        aria-label="Decorative arrow pattern"
        className="absolute top-4 right-[-80px] hidden rotate-[195deg] opacity-40 md:block"
        height={204.723}
        width={170.95}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeLinecap="round">
          <path
            d="M10.002 14.635c15.79-.47 70.3-8.66 95.23-2.09 24.93 6.57 49.77 23.34 54.36 41.51 4.59 18.17-1.99 44.08-26.84 67.52-24.84 23.45-101.66 60.75-122.23 73.15"
            fill="none"
            stroke="#1e1e1e"
            strokeDasharray="8 10"
            strokeWidth={2.5}
          />
          <path
            d="M27.032 175.945c-7.8 7.05-14.36 15.01-16.51 18.78M35.232 190.955c-10.97 1.26-20.72 3.4-24.71 3.77"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth={2.5}
          />
        </g>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <header className="flex flex-col gap-y-4">
      <h1 className="text-center text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Get in Touch,
        <br />
        <span className="text-blue-600">We&apos;re Here to Help</span>
      </h1>
      <p className="mx-auto max-w-xl text-center text-gray-600 sm:text-lg">
        Have questions or feedback? We&apos;d love to hear from you. Fill out
        the form below and we&apos;ll get back to you as soon as possible.
      </p>
    </header>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not initialized");
      }

      const token = await executeRecaptcha("contact_form_submit");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          recaptchaToken: token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message || "Failed to send message. Please try again.");
      else toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mx-auto flex w-full max-w-xl flex-col gap-y-10"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            className="block text-sm leading-6 font-semibold text-gray-900"
            htmlFor="name"
          >
            Name
          </label>
          <div className="mt-2.5">
            <input
              autoComplete="name"
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              type="text"
              value={name}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm leading-6 font-semibold text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              autoComplete="email"
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              type="email"
              value={email}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm leading-6 font-semibold text-gray-900"
            htmlFor="message"
          >
            Message
          </label>
          <div className="mt-2.5">
            <textarea
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              required
              rows={4}
              value={message}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        This site is protected by reCAPTCHA and the Google
        <a
          href="https://policies.google.com/privacy"
          className="mx-1 text-blue-500"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Privacy Policy
        </a>{" "}
        and
        <a
          href="https://policies.google.com/terms"
          className="mx-1 text-blue-500"
          rel="noopener noreferrer nofollow"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
      <div>
        <button
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

export function ContactClient() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 px-4 py-16">
        <Arrows />
        <Header />
        <ContactForm />
      </main>
    </GoogleReCaptchaProvider>
  );
}
