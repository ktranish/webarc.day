"use client";

import { AppImage } from "@/components/app-image";
import { categoryGradients } from "@/constants";
import { cn } from "@/lib/utils";
import { NewsItem } from "@/types";
import { Eye, Megaphone, TrendingUp, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

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
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not initialized");
      }

      const token = await executeRecaptcha("newsletter_subscribe");

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, recaptchaToken: token }),
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
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
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
        {success && <p className="text-xs text-green-500">{success}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </div>
  );
}

function AdSlot() {
  return (
    <a
      href="mailto:kenny@ketryon.com?subject=Ad%20Inquiry"
      className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-blue-200 bg-white/80 px-4 py-20 text-center transition hover:border-blue-300 hover:bg-white/90"
    >
      {/* Subtle background pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-10 transition group-hover:opacity-20"
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
      <Megaphone className="relative z-10 mb-2 h-6 w-6 text-blue-200 transition group-hover:text-blue-300" />
      <div className="relative z-10 text-sm font-medium text-gray-400 transition group-hover:text-gray-500">
        Your ad could be here!
      </div>
      <div className="relative z-10 mt-1 text-xs text-gray-300 transition group-hover:text-gray-400">
        Reach thousands of web developers on webarc.day
      </div>
    </a>
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

function Analytics() {
  const [metrics, setMetrics] = useState<{
    visitors: number;
    pageviews: number;
    dailyMetrics: {
      visitors: number;
      pageviews: number;
    };
    periodGrowth: {
      visitors: number;
      pageviews: number;
    };
    dailyGrowth: {
      visitors: number;
      pageviews: number;
    };
    dateRanges: {
      current: {
        start: string;
        end: string;
      };
      last: {
        start: string;
        end: string;
      };
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="mt-12 flex flex-col gap-4 px-4">
        <div className="flex items-center justify-between">
          <div className="shimmer h-6 w-24 rounded-lg bg-gray-100" />
          <div className="shimmer h-4 w-24 rounded-lg bg-gray-100" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <div className="shimmer h-8 w-8 rounded-lg bg-gray-100" />
                <div className="shimmer h-4 w-16 rounded-lg bg-gray-100" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <div className="shimmer h-8 w-24 rounded-lg bg-gray-100" />
                  <div className="shimmer h-4 w-12 rounded-lg bg-gray-100" />
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="shimmer h-4 w-16 rounded-lg bg-gray-100" />
                  <div className="shimmer h-3 w-12 rounded-lg bg-gray-100" />
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <div className="shimmer h-3 w-3 rounded-lg bg-gray-100" />
                  <div className="shimmer h-3 w-20 rounded-lg bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  // Format date range for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const dateRange = `${formatDate(metrics.dateRanges.current.start)} - ${formatDate(metrics.dateRanges.current.end)}`;

  return (
    <div className="mt-12 flex flex-col gap-4 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-gray-900">
          Analytics
        </h2>
        <span className="text-sm text-gray-500">{dateRange}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-50 p-2">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Visitors</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-gray-900">
                {metrics.visitors.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">total</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">
                {metrics.dailyMetrics.visitors.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">per day</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <TrendingUp
                className={cn(
                  "h-3 w-3",
                  metrics.periodGrowth.visitors >= 0
                    ? "text-green-500"
                    : "rotate-180 text-red-500",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  metrics.periodGrowth.visitors >= 0
                    ? "text-green-500"
                    : "text-red-500",
                )}
              >
                {metrics.periodGrowth.visitors > 0 ? "+" : ""}
                {metrics.periodGrowth.visitors}% vs last period
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-50 p-2">
              <Eye className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Pageviews</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-gray-900">
                {metrics.pageviews.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">total</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">
                {metrics.dailyMetrics.pageviews.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">per day</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <TrendingUp
                className={cn(
                  "h-3 w-3",
                  metrics.periodGrowth.pageviews >= 0
                    ? "text-green-500"
                    : "rotate-180 text-red-500",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  metrics.periodGrowth.pageviews >= 0
                    ? "text-green-500"
                    : "text-red-500",
                )}
              >
                {metrics.periodGrowth.pageviews > 0 ? "+" : ""}
                {metrics.periodGrowth.pageviews}% vs last period
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBar({
  categories,
  selectedCategories,
  onCategoryChange,
  loading,
}: {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="mb-6 flex flex-col gap-6 border-b border-gray-100 bg-white/80 pb-10 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="shimmer h-6 w-24 rounded-lg bg-gray-100" />
            <div className="shimmer h-6 w-24 rounded-lg bg-gray-100" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="shimmer h-8 w-24 rounded-full bg-gray-100"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-col gap-6 border-b border-gray-100 bg-white/80 pb-10 backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              Categories
            </h2>
            {selectedCategories.length > 0 && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                {selectedCategories.length} selected
              </span>
            )}
          </div>
          {selectedCategories.length > 0 && (
            <button
              onClick={() => onCategoryChange("clear")}
              className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "group relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                selectedCategories.includes(category)
                  ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <span className="relative z-10">{category}</span>
              {selectedCategories.includes(category) && (
                <motion.span
                  layoutId="categoryBackground"
                  className="absolute inset-0 rounded-full bg-blue-50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prefetchedData, setPrefetchedData] = useState<{
    posts: NewsItem[];
    nextCursor: string | null;
    hasMore: boolean;
  } | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial fetch of categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter news based on selected categories
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      // If no categories selected, show all
      if (selectedCategories.length === 0) return true;

      // Exact match for selected categories
      return selectedCategories.some((category) => category === item.category);
    });
  }, [news, selectedCategories]);

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
          console.log(e.message || "Failed to load news.");
        } else console.log("Failed to load news.");
        setLoading(false);
      });
  }, []);

  // Prefetch next batch when we have a cursor
  useEffect(() => {
    if (!nextCursor || loadingMore || !hasMore) return;

    const prefetchNextBatch = async () => {
      try {
        const res = await fetch(
          `/api/news?cursor=${encodeURIComponent(nextCursor)}`,
        );
        const data = await res.json();
        setPrefetchedData(data);
      } catch (error) {
        console.error("Error prefetching next batch:", error);
      }
    };

    prefetchNextBatch();
  }, [nextCursor, loadingMore, hasMore]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0]?.isIntersecting && hasMore && nextCursor) {
          setLoadingMore(true);
          try {
            // Use prefetched data if available
            if (prefetchedData) {
              setNews((prev) => [...prev, ...prefetchedData.posts]);
              setHasMore(prefetchedData.hasMore);
              setNextCursor(prefetchedData.nextCursor);
              setPrefetchedData(null);
            } else {
              const res = await fetch(
                `/api/news?cursor=${encodeURIComponent(nextCursor)}`,
              );
              const data = await res.json();
              setNews((prev) => [...prev, ...data.posts]);
              setHasMore(data.hasMore);
              setNextCursor(data.nextCursor);
            }
          } catch (error) {
            console.error("Error loading more news:", error);
          } finally {
            setLoadingMore(false);
          }
        }
      },
      { threshold: 0.5 },
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
  }, [hasMore, loading, loadingMore, nextCursor, prefetchedData]);

  const handleCategoryChange = (category: string) => {
    if (category === "clear") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category],
      );
    }
  };

  const content = useMemo(() => {
    if (loading && news.length === 0) {
      return (
        <div className="flex w-full items-center justify-center py-16">
          <span className="inline-block size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      );
    }

    if (!loading && filteredNews.length === 0) {
      return (
        <div className="flex w-full items-center justify-center py-16 text-base font-medium text-gray-300">
          No news available for the selected filters.
        </div>
      );
    }

    // Group news by date
    const newsByDate = filteredNews.reduce(
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
              <AnimatePresence mode="popLayout">
                {itemsWithAds.map((item, index) => {
                  if (item === "ad") {
                    return (
                      <motion.div
                        key={`ad-${date}-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <AdSlot />
                      </motion.div>
                    );
                  }
                  if (item === "newsletter") {
                    return (
                      <motion.div
                        key={`newsletter-${date}-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <NewsletterCTA />
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="group/card animate-fade-in block h-fit w-full min-w-[260px] flex-1 overflow-hidden rounded-3xl focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      >
                        <div
                          className={cn(
                            categoryGradients[
                              item.category as keyof typeof categoryGradients
                            ] ?? "from-gray-50 to-gray-100",
                            "relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-gradient-to-br p-6 backdrop-blur-sm transition",
                          )}
                        >
                          <div className="flex size-8 items-center justify-center rounded-xl">
                            <div className="relative size-8">
                              <AppImage
                                src={item.favicon}
                                alt={item.title + " favicon"}
                                className="rounded-lg border border-gray-100 bg-white object-contain"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <h3
                              className="font-semibold tracking-tight text-gray-900 sm:text-lg"
                              dangerouslySetInnerHTML={{
                                __html: item.title,
                              }}
                            />
                            <p
                              className="text-sm text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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
  }, [filteredNews, loading]);

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 px-4 py-12">
      <FilterBar
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        loading={loadingCategories}
      />
      {content}
      {hasMore && !loadingMore && !loading && (
        <div
          ref={observerTarget}
          className="flex w-full items-center justify-center py-16"
        >
          <span className="inline-block size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      )}
      {!hasMore && !loading && filteredNews.length > 0 && (
        <div className="flex w-full items-center justify-center py-8 text-base font-medium text-gray-300">
          All news loaded.
        </div>
      )}
    </section>
  );
}

export function Landing() {
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
        <Header />
        <Analytics />
        <News />
        <Dock />
      </main>
    </GoogleReCaptchaProvider>
  );
}
