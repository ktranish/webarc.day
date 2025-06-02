"use client";

import { categoryGradients, news } from "@/constants";
import { ExternalLink, Megaphone } from "lucide-react";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="flex flex-col gap-y-4">
      <h1 className="text-center text-3xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl">
        Daily News,
        <br />
        <span className="text-blue-600">Curated for You</span>
      </h1>
      <p className="mx-auto max-w-xl text-center text-gray-600 sm:text-lg">
        Discover the latest news, tutorials, and trends in web development, all
        curated and organized in one place.
      </p>
    </header>
  );
}

function AdSlot() {
  return (
    <div className="my-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-blue-100 bg-gradient-to-br from-blue-50/60 to-white px-4 py-20 text-center">
      <Megaphone className="mb-2 h-6 w-6 text-blue-200" />
      <div className="text-sm font-medium text-gray-400">
        Your ad could be here!
      </div>
      <div className="mt-1 text-xs text-gray-300">
        Reach thousands of web developers on webarc.day
      </div>
    </div>
  );
}

function News() {
  // Group news by date (descending)
  const newsByDate = news
    .sort((a, b) => b.date.localeCompare(a.date))
    .reduce((acc: Record<string, typeof news>, item) => {
      acc[item.date] = acc[item.date] || [];
      acc[item.date].push(item);
      return acc;
    }, {});
  const dateOrder = Object.keys(newsByDate).sort((a, b) => b.localeCompare(a));

  const adIndex = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    if (dateOrder.length <= 2) return null;
    // Pick a random index between 1 and dateOrder.length - 2
    return Math.floor(Math.random() * (dateOrder.length - 2)) + 1;
  }, [dateOrder.length]);

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 px-4 py-12">
      {dateOrder.map((date, i) => {
        // Insert ad slot after a random section (not first or last)
        const shouldShowAd = adIndex !== null && i === adIndex;
        return (
          <React.Fragment key={date}>
            {shouldShowAd && <AdSlot />}
            <div className="flex flex-col gap-y-4">
              <div className="mb-2 flex items-center justify-start">
                <span className="rounded-full border border-blue-50 bg-blue-50/60 px-3 py-0.5 text-xs font-semibold tracking-tight text-blue-500">
                  {new Date(date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex w-full flex-wrap justify-start gap-8">
                {newsByDate[date].map((item) => (
                  <Link
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/card animate-fade-in block w-full min-w-[260px] flex-1 rounded-3xl focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  >
                    <div className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-md backdrop-blur-sm transition hover:shadow-lg">
                      <ExternalLink
                        className="absolute top-4 right-4 h-4 w-4 text-gray-300 transition-colors group-hover/card:text-blue-400"
                        aria-label="External link"
                      />
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${categoryGradients[item.category]} text-2xl`}
                      >
                        {item.emoji}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="mb-1 self-start rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-xs font-semibold tracking-tight text-gray-500">
                          {item.category}
                        </span>
                        <h3 className="font-semibold tracking-tight text-gray-900 sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {i !== dateOrder.length - 1 && (
                <div className="mt-4 flex h-8 w-full items-center">
                  <div className="flex-1 border-t border-gray-100" />
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </section>
  );
}

export function Landing() {
  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 px-4 py-16">
      <div className="flex flex-col items-center gap-y-2">
        <Header />
      </div>
      <News />
    </main>
  );
}
