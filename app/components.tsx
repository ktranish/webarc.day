"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

type Category = "UX" | "Tech" | "Platform";

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
  const categoryGradients: Record<Category, string> = {
    UX: "from-pink-50 to-pink-100",
    Tech: "from-blue-50 to-blue-100",
    Platform: "from-green-50 to-green-100",
  };
  const news: Array<{
    emoji: string;
    title: string;
    description: string;
    category: Category;
    link: string;
  }> = [
    {
      emoji: "📰",
      title: "Automated News Scraping",
      description:
        "Webarc.day continuously scrapes top web dev news sources for the latest updates.",
      category: "Tech",
      link: "https://github.com/webarcday/webarc.day#scraping",
    },
    {
      emoji: "🧠",
      title: "Curated for Developers",
      description:
        "All news is filtered and organized for web professionals and enthusiasts.",
      category: "UX",
      link: "https://webarc.day/about",
    },
    {
      emoji: "⚡",
      title: "Real-Time Updates",
      description:
        "Stay ahead with instant updates as soon as new articles are published.",
      category: "Platform",
      link: "https://webarc.day/roadmap",
    },
    {
      emoji: "🔗",
      title: "Source Diversity",
      description:
        "Aggregates news from blogs, official docs, and community forums.",
      category: "Tech",
      link: "https://webarc.day/sources",
    },
    {
      emoji: "🎯",
      title: "Topic Tagging",
      description:
        "Find news by framework, language, or trending topic with smart tags.",
      category: "UX",
      link: "https://webarc.day/tags",
    },
    {
      emoji: "🔍",
      title: "Powerful Search",
      description:
        "Quickly search the archive for any web development topic or keyword.",
      category: "Platform",
      link: "https://webarc.day/search",
    },
    {
      emoji: "📅",
      title: "Daily Digest",
      description: "Get a daily summary of the most important web dev news.",
      category: "Platform",
      link: "https://webarc.day/digest",
    },
    {
      emoji: "🌐",
      title: "Global Coverage",
      description:
        "Covers news from international sources for a worldwide perspective.",
      category: "Tech",
      link: "https://webarc.day/global",
    },
    {
      emoji: "💬",
      title: "Community Picks",
      description:
        "See what the web dev community is reading and recommending.",
      category: "UX",
      link: "https://webarc.day/community",
    },
  ];

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-8 px-4 py-8 sm:py-16">
      <div className="columns-1 gap-6 p-6 sm:columns-2 lg:columns-3">
        {news.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 block break-inside-avoid rounded-3xl focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <div className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
              <ExternalLink
                className="absolute top-4 right-4 h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-400"
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
