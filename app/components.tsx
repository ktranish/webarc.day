"use client";

import { AppImage } from "@/components/app-image";
import { categoryGradients } from "@/constants";
import { ExternalLink, Megaphone } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";

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

function NewsletterCTA() {
  return (
    <div className="relative mx-auto flex w-full flex-col gap-y-4 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white p-8 backdrop-blur-sm">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Get Daily Updates
        </h2>
        <p className="text-sm text-gray-600 sm:text-base">
          Stay in the loop with the latest web development news, delivered
          straight to your inbox.
        </p>
      </div>
      <form className="flex w-full flex-col gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-200 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs text-gray-400">No spam, unsubscribe anytime.</p>
    </div>
  );
}

function AdSlot() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-blue-100 bg-gradient-to-br from-blue-50/60 to-white px-4 py-20 text-center">
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

type NewsItem = {
  favicon: string;
  title: string;
  description: string;
  category: string;
  link: string;
  date: string;
};

type GridItem = NewsItem | { __adSlot: true } | { __newsletter: true };

export function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [adSlotIndexes, setAdSlotIndexes] = useState<Record<string, number>>(
    {},
  );
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [newsletterSlotIndex, setNewsletterSlotIndex] = useState<number | null>(
    null,
  );

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
        // Set newsletter slot index after first load
        if (data.posts.length > 0) {
          setNewsletterSlotIndex(
            Math.floor(Math.random() * (data.posts.length - 1)) + 1,
          );
        }
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message || "Failed to load news.");
        } else setError("Failed to load news.");
        setLoading(false);
      });
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 400 &&
        !loadingMore &&
        hasMore &&
        nextCursor
      ) {
        setLoadingMore(true);
        fetch(`/api/news?cursor=${encodeURIComponent(nextCursor)}`)
          .then((res) => res.json())
          .then((data) => {
            // Deduplicate by link (or add by _id if available)
            setNews((prev) => {
              const seen = new Set(prev.map((p) => p.link));
              return [
                ...prev,
                ...data.posts.filter((p: NewsItem) => !seen.has(p.link)),
              ];
            });
            setHasMore(data.hasMore);
            setNextCursor(data.nextCursor);
            setLoadingMore(false);
          })
          .catch(() => {
            setLoadingMore(false);
          });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, loadingMore, nextCursor]);

  // Group news by date (descending)
  const newsByDate = useMemo(() => {
    if (!news) return {};
    return news.reduce((acc: Record<string, NewsItem[]>, item) => {
      acc[item.date] = acc[item.date] || [];
      acc[item.date].push(item);
      return acc;
    }, {});
  }, [news]);
  const dateOrder = useMemo(
    () => Object.keys(newsByDate).sort((a, b) => b.localeCompare(a)),
    [newsByDate],
  );

  // When news changes, ensure adSlotIndexes are set for new dates
  useEffect(() => {
    if (!news) return;
    setAdSlotIndexes((prev) => {
      const next = { ...prev };
      const grouped = news.reduce((acc: Record<string, NewsItem[]>, item) => {
        acc[item.date] = acc[item.date] || [];
        acc[item.date].push(item);
        return acc;
      }, {});
      Object.entries(grouped).forEach(([date, items]) => {
        if (next[date] === undefined) {
          let adSlotIndex = 0;
          if (items.length > 2) {
            adSlotIndex = Math.floor(Math.random() * (items.length - 2)) + 1;
          } else if (items.length === 2) {
            adSlotIndex = Math.floor(Math.random() * 2); // 0 or 1
          } // if 1, will be 0
          next[date] = adSlotIndex;
        }
      });
      return next;
    });
  }, [news]);

  let content;
  if (loading) {
    content = (
      <div className="flex w-full items-center justify-center py-16">
        <span className="inline-block size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex w-full items-center justify-center py-16 text-lg font-medium text-red-400">
        {error}
      </div>
    );
  } else if (!news || news.length === 0) {
    content = (
      <div className="flex w-full items-center justify-center py-16 text-lg font-medium text-gray-300">
        No news available.
      </div>
    );
  } else {
    content = dateOrder.map((date, i) => {
      const items = newsByDate[date];
      // Use persistent ad slot index for this date
      const adSlotIndex = adSlotIndexes[date] ?? 0;
      const rowWithAd: GridItem[] = [
        ...items.slice(0, adSlotIndex),
        { __adSlot: true },
        ...items.slice(adSlotIndex),
      ];

      // Insert newsletter CTA if this is the right date section
      const shouldInsertNewsletter =
        newsletterSlotIndex !== null &&
        i === Math.floor(newsletterSlotIndex / items.length);

      if (shouldInsertNewsletter) {
        const localIndex = newsletterSlotIndex % items.length;
        rowWithAd.splice(localIndex, 0, { __newsletter: true });
      }

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
              {rowWithAd.map((item, idx) =>
                "__adSlot" in item ? (
                  <AdSlot key={`adslot-${date}-${idx}`} />
                ) : "__newsletter" in item ? (
                  <NewsletterCTA key={`newsletter-${date}-${idx}`} />
                ) : (
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
                ),
              )}
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
  }

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 px-4 py-12">
      {content}
      {loadingMore && (
        <div className="flex w-full items-center justify-center py-16">
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
    </main>
  );
}
