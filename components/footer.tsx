"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-y-4">
            <Link className="inline-block" href="/">
              <h2 className="text-lg font-semibold text-gray-900">
                webarc.day
              </h2>
            </Link>
            <p className="text-sm text-gray-600">
              Your daily dose of web development news and insights.
            </p>
          </div>

          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Help</h2>
            <ul className="flex flex-col gap-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition-colors hover:text-blue-600"
                  href="mailto:kenny@ketryon.com?subject=Contact%20Support"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition-colors hover:text-blue-600"
                  href="#"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Legal</h2>
            <ul className="flex flex-col gap-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition-colors hover:text-blue-600"
                  href="#"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition-colors hover:text-blue-600"
                  href="#"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Connect</h2>
            <ul className="flex flex-col gap-y-2 text-sm">
              <li>
                <a
                  className="text-gray-600 transition-colors hover:text-blue-600"
                  href="https://twitter.com/ktranish"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className="text-gray-600 transition-colors hover:text-blue-600"
                  href="https://github.com/ktranish"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-y-4 pt-8 pb-16 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} webarc.day. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
