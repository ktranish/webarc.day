"use client";

import { AppImage } from "@/components/app-image";
import { categoryGradients } from "@/constants";
import { NewsItem } from "@/types";
import { ExternalLink, Megaphone } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

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

function Dock() {
  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-x-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm">
        <a
          href="mailto:kenny@ketryon.com?subject=Source%20Submission"
          className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-700 transition hover:text-blue-600"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Submit Source
        </a>
      </div>
    </div>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Subscribed! Check your inbox.");
        setEmail("");
      } else {
        setError(data.error || "Failed to subscribe.");
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message || "Failed to subscribe.");
      else setError("Failed to subscribe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mx-auto flex w-full flex-col justify-between gap-y-4 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white p-8 backdrop-blur-sm">
      <div className="flex flex-col gap-y-2">
        <h3 className="font-semibold tracking-tight text-gray-900 sm:text-lg">
          Get Daily Updates
        </h3>
        <p className="text-sm text-gray-600">
          Stay in the loop with the latest web development news, delivered
          straight to your inbox.
        </p>
      </div>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-200 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-60"
          disabled={loading || !email}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
        <p className="text-xs text-gray-400">No spam, unsubscribe anytime.</p>
        {success && <p className="text-xs text-green-500">{success}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </div>
  );
}

function AdSlot() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-blue-200 bg-white/80 px-4 py-20 text-center">
      {/* Subtle background pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="24"
          fill="none"
          stroke="#bfdbfe"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>
      <Megaphone className="relative z-10 mb-2 h-6 w-6 text-blue-200" />
      <div className="relative z-10 text-sm font-medium text-gray-400">
        Your ad could be here!
      </div>
      <div className="relative z-10 mt-1 text-xs text-gray-300">
        Reach thousands of web developers on webarc.day
      </div>
    </div>
  );
}

function getConsistentRandomPosition(
  date: string,
  totalItems: number,
  type: "ad" | "newsletter",
): number[] {
  // Use date as seed for consistent positions
  const seed = date.split("-").join("");
  const positions: number[] = [];

  // Calculate number of items based on total posts
  // For ads: 1 per 6 posts, minimum 1
  // For newsletters: 1 per 12 posts, minimum 1
  const numItems = Math.max(
    1,
    Math.floor(totalItems / (type === "ad" ? 6 : 12)),
  );

  // Generate consistent positions
  for (let i = 0; i < numItems; i++) {
    const position = (parseInt(seed) * (i + 1)) % (totalItems - 1);
    positions.push(position + 1); // Add 1 to avoid placing at start
  }

  return positions.sort((a, b) => a - b);
}

export function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial fetch
  useEffect(() => {
    setLoading(true);
    fetch(`/api/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.posts);
        setHasMore(data.hasMore);
        setNextCursor(data.nextCursor);
        setLoading(false);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message || "Failed to load news.");
        } else setError("Failed to load news.");
        setLoading(false);
      });
  }, []);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0]?.isIntersecting && hasMore && nextCursor) {
          setLoadingMore(true);
          try {
            const res = await fetch(
              `/api/news?cursor=${encodeURIComponent(nextCursor)}`,
            );
            const data = await res.json();
            setNews((prev) => [...prev, ...data.posts]);
            setHasMore(data.hasMore);
            setNextCursor(data.nextCursor);
          } catch (error) {
            console.error("Error loading more news:", error);
          } finally {
            setLoadingMore(false);
          }
        }
      },
      { threshold: 1.0 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [hasMore, loading, loadingMore, nextCursor]);

  const content = useMemo(() => {
    if (loading && news.length === 0) {
      return (
        <div className="flex w-full items-center justify-center py-16">
          <span className="inline-block size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      );
    }

    if (!loading && news.length === 0) {
      return (
        <div className="flex w-full items-center justify-center py-16 text-base font-medium text-gray-300">
          No news available.
        </div>
      );
    }

    // Group news by date
    const newsByDate = news.reduce(
      (acc, item) => {
        const date = item.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      },
      {} as Record<string, NewsItem[]>,
    );

    // Sort dates in descending order
    const dateOrder = Object.keys(newsByDate).sort((a, b) =>
      b.localeCompare(a),
    );

    return dateOrder.map((date, i) => {
      const items = newsByDate[date];

      // Calculate positions for ads and newsletters
      const adPositions = getConsistentRandomPosition(date, items.length, "ad");
      const newsletterPositions = getConsistentRandomPosition(
        date,
        items.length,
        "newsletter",
      );

      // Create array with items and insert ads/newsletters at calculated positions
      const itemsWithAds = items.reduce(
        (acc: (NewsItem | "ad" | "newsletter")[], item, index) => {
          if (adPositions.includes(index)) {
            acc.push("ad");
          }
          if (newsletterPositions.includes(index)) {
            acc.push("newsletter");
          }
          acc.push(item);
          return acc;
        },
        [],
      );

      return (
        <Fragment key={date}>
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

            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {itemsWithAds.map((item, index) => {
                if (item === "ad") {
                  return <AdSlot key={`ad-${date}-${index}`} />;
                }
                if (item === "newsletter") {
                  return <NewsletterCTA key={`newsletter-${date}-${index}`} />;
                }
                return (
                  <Link
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/card animate-fade-in block w-full min-w-[260px] flex-1 rounded-3xl focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  >
                    <div className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-6 backdrop-blur-sm transition">
                      <ExternalLink
                        className="absolute top-4 right-4 h-4 w-4 text-gray-300 transition-colors group-hover/card:text-blue-400"
                        aria-label="External link"
                      />
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${categoryGradients[item.category as keyof typeof categoryGradients] ?? "from-gray-50 to-gray-100"}`}
                      >
                        <div className="relative h-8 w-8">
                          <AppImage
                            src={item.favicon}
                            alt={item.title + " favicon"}
                            className="rounded-lg border border-gray-100 bg-white object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {item.category && (
                          <span className="mb-1 self-start rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-xs font-semibold tracking-tight text-gray-500">
                            {item.category}
                          </span>
                        )}
                        <h3 className="font-semibold tracking-tight text-gray-900 sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {i !== dateOrder.length - 1 && (
              <div className="mt-4 flex h-8 w-full items-center">
                <div className="flex-1 border-t border-gray-100" />
              </div>
            )}
          </div>
        </Fragment>
      );
    });
  }, [news, loading]);

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 px-4 py-12">
      {content}
      {hasMore && !loadingMore && !loading && (
        <div
          ref={observerTarget}
          className="flex w-full items-center justify-center py-16"
        >
          <span className="inline-block size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      )}
      {!hasMore && !loading && news.length > 0 && (
        <div className="flex w-full items-center justify-center py-8 text-base font-medium text-gray-300">
          All news loaded.
        </div>
      )}
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
      <Dock />
    </main>
  );
}
