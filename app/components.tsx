"use client";

import { AppImage } from "@/components/app-image";
import { TrustBadge } from "@/components/trust-badge";
import { categoryGradients } from "@/constants";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { cn, getContentSlots } from "@/lib/utils";
import { type NewsItem } from "@/types";
import { Eye, Megaphone, MousePointer, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

function HeaderNewsletterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { current: waitlistCount } = useAnimatedNumber(1247); // Example count

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
        setSuccess("You're on the list! Check your inbox.");
        setEmail("");
      } else {
        setError(data.error || "Failed to subscribe.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mx-auto mt-8 w-full max-w-2xl">
      <div className="rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-y-6">
          {/* Header with trust elements */}
          <div className="flex items-start sm:justify-between">
            <div className="flex flex-col gap-y-3">
              <TrustBadge />
              <div className="flex flex-col gap-y-1">
                <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                  Get Weekly Web Development Tips
                </h3>
                <p className="text-sm text-gray-600">
                  Join our community of developers and get the latest insights,
                  tutorials, and best practices delivered straight to your
                  inbox.
                </p>
              </div>
            </div>
            <div className="hidden flex-col items-end gap-y-1 text-right sm:flex">
              <span className="text-2xl font-bold text-blue-600">
                {waitlistCount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">subscribers</span>
            </div>
          </div>

          {/* Form */}
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-blue-200 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {/* Status messages */}
            {success && (
              <p className="text-sm font-medium text-green-600">{success}</p>
            )}
            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}

            {/* Legal text */}
            <p className="text-xs leading-relaxed text-gray-400">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-blue-500 transition-colors hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                className="text-blue-500 transition-colors hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex flex-col gap-y-4 px-4">
      <h1 className="text-center text-3xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl">
        Daily News,
        <br />
        <span className="text-blue-600">Curated for You</span>
      </h1>
      <p className="mx-auto max-w-xl text-center text-gray-600 sm:text-lg">
        Discover the latest news, tutorials, and trends in web development, all
        curated and organized in one place.
      </p>
      <HeaderNewsletterCTA />
    </header>
  );
}

function Dock() {
  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-x-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm">
        <Link
          href="/contact"
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
        </Link>
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
    <Link
      href="/contact"
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
    </Link>
  );
}

function Analytics() {
  const [metrics, setMetrics] = useState<{
    visitors: number;
    pageviews: number;
    clicks: number;
    dailyMetrics: {
      visitors: number;
      pageviews: number;
      clicks: number;
    };
    periodGrowth: {
      visitors: number;
      pageviews: number;
      clicks: number;
    };
    dailyGrowth: {
      visitors: number;
      pageviews: number;
      clicks: number;
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

  const { current: animatedVisitors } = useAnimatedNumber(
    metrics?.visitors || 0,
  );
  const { current: animatedPageviews } = useAnimatedNumber(
    metrics?.pageviews || 0,
  );
  const { current: animatedClicks } = useAnimatedNumber(metrics?.clicks || 0);
  const { current: animatedDailyVisitors } = useAnimatedNumber(
    metrics?.dailyMetrics.visitors || 0,
  );
  const { current: animatedDailyPageviews } = useAnimatedNumber(
    metrics?.dailyMetrics.pageviews || 0,
  );
  const { current: animatedDailyClicks } = useAnimatedNumber(
    metrics?.dailyMetrics.clicks || 0,
  );

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                {animatedVisitors.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">total</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">
                {animatedDailyVisitors.toLocaleString()}
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
                {animatedPageviews.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">total</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">
                {animatedDailyPageviews.toLocaleString()}
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

        <div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-50 p-2">
              <MousePointer className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Clicks</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-gray-900">
                {animatedClicks.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">total</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">
                {animatedDailyClicks.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">per day</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <TrendingUp
                className={cn(
                  "h-3 w-3",
                  metrics.periodGrowth.clicks >= 0
                    ? "text-green-500"
                    : "rotate-180 text-red-500",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  metrics.periodGrowth.clicks >= 0
                    ? "text-green-500"
                    : "text-red-500",
                )}
              >
                {metrics.periodGrowth.clicks > 0 ? "+" : ""}
                {metrics.periodGrowth.clicks}% vs last period
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

function AISummary({ date, items }: { date: string; items: NewsItem[] }) {
  // Mock AI summary - in production, this would be generated by an AI model
  const summary = useMemo(() => {
    const categories = items.reduce(
      (acc, item) => {
        const category = item.category;
        if (!acc[category]) acc[category] = 0;
        acc[category]++;
        return acc;
      },
      {} as Record<string, number>,
    );

    const topCategories = Object.entries(categories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);

    return `Today's web development landscape is buzzing with activity in ${topCategories.join(", ")}. Key highlights include ${items.length} significant updates and developments that are shaping the future of web development.`;
  }, [items]);

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50/60 to-white p-8 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Summary</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <p className="text-xl leading-relaxed text-gray-700">{summary}</p>
    </div>
  );
}

export function News(): React.ReactElement {
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

  // Initial fetch
  useEffect(() => {
    setLoading(true);
    setNews([]); // Clear existing news when categories change
    setNextCursor(null); // Reset cursor
    setHasMore(true); // Reset hasMore
    setPrefetchedData(null); // Clear prefetched data

    fetch(
      `/api/news${selectedCategories.length > 0 ? `?categories=${selectedCategories.join(",")}` : ""}`,
    )
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
  }, [selectedCategories]); // Refetch when categories change

  // Prefetch next batch when we have a cursor
  useEffect(() => {
    if (!nextCursor || loadingMore || !hasMore) return;

    const prefetchNextBatch = async () => {
      try {
        const res = await fetch(
          `/api/news?cursor=${encodeURIComponent(nextCursor)}${
            selectedCategories.length > 0
              ? `&categories=${selectedCategories.join(",")}`
              : ""
          }`,
        );
        const data = await res.json();
        setPrefetchedData(data);
      } catch (error) {
        console.error("Error prefetching next batch:", error);
      }
    };

    prefetchNextBatch();
  }, [nextCursor, loadingMore, hasMore, selectedCategories]);

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
                `/api/news?cursor=${encodeURIComponent(nextCursor)}${
                  selectedCategories.length > 0
                    ? `&categories=${selectedCategories.join(",")}`
                    : ""
                }`,
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
  }, [
    hasMore,
    loading,
    loadingMore,
    nextCursor,
    prefetchedData,
    selectedCategories,
  ]);

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

    if (!loading && news.length === 0) {
      return (
        <div className="flex w-full items-center justify-center py-16 text-base font-medium text-gray-300">
          No news available for the selected filters.
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

    return (
      <div className="flex flex-col gap-y-8">
        {dateOrder.map((date) => {
          const items = newsByDate[date] ?? [];

          // Calculate positions for ads and newsletters
          const { adSlots, newsletterSlots } = getContentSlots(items.length);

          // Create array with items and insert ads/newsletters at calculated positions
          const itemsWithAds = items.reduce(
            (acc: (NewsItem | "ad" | "newsletter")[], item, index) => {
              if (adSlots.includes(index + 1)) {
                acc.push("ad");
              }
              if (newsletterSlots.includes(index + 1)) {
                acc.push("newsletter");
              }
              acc.push(item);
              return acc;
            },
            [],
          );

          return (
            <div key={date} className="relative">
              <div className="sticky top-16 z-50 -mx-4 bg-white/80 px-4 py-4 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-gray-900">{date}</h2>
              </div>
              <AISummary date={date} items={items} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {itemsWithAds.map((item, index) => {
                  if (item === "ad") {
                    return (
                      <motion.div
                        key={`ad-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AdSlot />
                      </motion.div>
                    );
                  }
                  if (item === "newsletter") {
                    return (
                      <motion.div
                        key={`newsletter-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <NewsletterCTA />
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={cn(
                          "group relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-gradient-to-br p-6 backdrop-blur-sm transition",
                          categoryGradients[item.category] ??
                            "from-gray-50 to-gray-100",
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
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [news, loading]);

  return (
    <section className="relative mx-auto mt-12 flex w-full max-w-5xl flex-col gap-y-4 px-4">
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
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 py-16">
        <Header />
        <Analytics />
        <News />
        <Dock />
      </main>
    </GoogleReCaptchaProvider>
  );
}
