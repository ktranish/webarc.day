"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { back } = useRouter();
  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-8 px-4 py-16">
      <div className="flex flex-col items-center justify-center gap-y-6 rounded-3xl border border-gray-100 bg-white/80 p-12 text-center backdrop-blur-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <Search className="h-8 w-8 text-blue-600" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has
            been moved. Please check the URL or return to the homepage.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <button
            onClick={back}
            className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
