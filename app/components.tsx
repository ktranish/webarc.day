"use client";

import { categoryGradients, news } from "@/constants";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

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

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 px-4 py-12">
      {dateOrder.map((date, i) => (
        <div key={date} className="flex flex-col gap-y-4">
          <div className="mb-2 flex items-center justify-start">
            <span className="rounded-full border border-gray-100 bg-gray-50 px-4 py-1 text-sm font-medium tracking-tight text-gray-500 shadow-sm">
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
                    <p className="text-sm text-gray-600">{item.description}</p>
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
      ))}
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
