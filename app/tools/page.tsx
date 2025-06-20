"use client";

import { AppImage } from "@/components/app-image";
import { cn } from "@/lib/utils";
import type { ToolItem } from "@/types";
import { ArrowRight, Megaphone, Wrench } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function Header() {
  return (
    <header className="flex flex-col gap-y-4 px-4">
      <h1 className="text-center text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Developer
        <br />
        <span className="text-blue-600">Tools & Resources</span>
      </h1>
      <p className="mx-auto max-w-xl text-center text-gray-600 sm:text-lg">
        A curated collection of tools and resources to enhance your development
        workflow.
      </p>
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
          Submit Tool
        </Link>
      </div>
    </div>
  );
}

function Awards() {
  return (
    <div className="mt-12 flex flex-col gap-y-4 px-4">
      <p className="text-sm font-medium text-gray-500">Awards recieved</p>
      <div className="flex gap-4 overflow-x-auto">
        <a
          href="https://fazier.com/launches/webarc-day"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="min-w-fit"
        >
          <img
            src="https://fazier.com/api/v1/public/badges/embed_image.svg?launch_id=4594&badge_type=daily&theme=light"
            width="270"
            alt="Fazier badge"
          />
        </a>
        <a
          href="https://fazier.com/launches/webarc-day"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="min-w-fit"
        >
          <img
            src="https://fazier.com/api/v1/public/badges/embed_image.svg?launch_id=4594&badge_type=weekly&theme=light"
            width="270"
            alt="Fazier badge"
          />
        </a>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 rounded-3xl border border-gray-100 bg-white/80 p-12 text-center backdrop-blur-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
        <Wrench className="h-8 w-8 text-blue-600" />
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-semibold text-gray-900">
          No Tools Available
        </h2>
        <p className="text-gray-600">
          We&apos;re currently curating our collection of development tools.
          <br />
          Check back soon for new resources!
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
      >
        Return Home
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Tool({ tool, isFeatured }: { tool: ToolItem; isFeatured?: boolean }) {
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${tool.url}&sz=64`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={cn(
          !isFeatured && "sm:flex-row sm:items-center sm:gap-6",
          "group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-6 backdrop-blur-sm transition hover:shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
        )}
        aria-label={`Try ${tool.title}`}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50">
          <div className="relative size-6">
            <AppImage
              src={faviconUrl}
              alt={`${tool.title} favicon`}
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600">
              {tool.title}
            </h2>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10">
              {tool.category}
            </span>
          </div>
          <p className="text-sm text-gray-600">{tool.description}</p>
        </div>
        <div
          className={cn(
            !isFeatured && "sm:self-center",
            "inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700",
          )}
        >
          Try it now
          <ArrowRight className="h-4 w-4" />
        </div>
      </a>
    </motion.div>
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

function FeaturedSlot() {
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
        Your tool could be featured here!
      </div>
      <div className="relative z-10 mt-1 text-xs text-gray-300 transition group-hover:text-gray-400">
        Get premium visibility for your tool
      </div>
    </Link>
  );
}

function FeaturedToolsSkeleton() {
  return (
    <section className="relative mx-auto mt-12 flex w-full max-w-5xl flex-col gap-y-4 px-4">
      <div className="flex items-center justify-between">
        <div className="shimmer h-6 w-32 rounded-lg bg-gray-100" />
        <div className="shimmer h-4 w-16 rounded-lg bg-gray-100" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <div className="shimmer size-12 rounded-xl bg-gray-100" />
              <div className="flex flex-col gap-2">
                <div className="shimmer h-5 w-32 rounded-lg bg-gray-100" />
                <div className="shimmer h-4 w-24 rounded-lg bg-gray-100" />
              </div>
            </div>
            <div className="shimmer h-16 w-full rounded-lg bg-gray-100" />
            <div className="shimmer h-6 w-24 rounded-lg bg-gray-100" />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedTools({
  tools,
  loadingFeatured,
}: {
  tools: ToolItem[];
  loadingFeatured: boolean;
}) {
  if (loadingFeatured) {
    return <FeaturedToolsSkeleton />;
  }

  return (
    <section className="relative mx-auto mt-12 flex w-full max-w-5xl flex-col gap-y-4 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-gray-900">
          Featured Tools
        </h2>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
          {tools.length} tools
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {tools.map((tool) => (
            <Tool key={tool.url} tool={tool} isFeatured={true} />
          ))}
          <FeaturedSlot />
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function ToolsPage() {
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [featuredTools, setFeaturedTools] = useState<ToolItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prefetchedData, setPrefetchedData] = useState<{
    tools: ToolItem[];
    nextCursor: string | null;
    hasMore: boolean;
  } | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch featured tools
  useEffect(() => {
    const fetchFeaturedTools = async () => {
      try {
        const res = await fetch("/api/tools/featured");
        const data = await res.json();
        setFeaturedTools(data.tools);
      } catch (error) {
        console.error("Error fetching featured tools:", error);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeaturedTools();
  }, []);

  // Initial fetch of categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/tools/categories");
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
    setTools([]); // Clear existing tools when categories change
    setNextCursor(null); // Reset cursor
    setHasMore(true); // Reset hasMore
    setPrefetchedData(null); // Clear prefetched data

    fetch(
      `/api/tools${selectedCategories.length > 0 ? `?categories=${selectedCategories.join(",")}` : ""}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setTools(data.tools);
        setHasMore(data.hasMore);
        setNextCursor(data.nextCursor);
        setLoading(false);
      })
      .catch((e) => {
        if (e instanceof Error) {
          console.log(e.message || "Failed to load tools.");
        } else console.log("Failed to load tools.");
        setLoading(false);
      });
  }, [selectedCategories]); // Refetch when categories change

  // Prefetch next batch when we have a cursor
  useEffect(() => {
    if (!nextCursor || loadingMore || !hasMore) return;

    const prefetchNextBatch = async () => {
      try {
        const res = await fetch(
          `/api/tools?cursor=${encodeURIComponent(nextCursor)}${
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
              setTools((prev) => [...prev, ...prefetchedData.tools]);
              setHasMore(prefetchedData.hasMore);
              setNextCursor(prefetchedData.nextCursor);
              setPrefetchedData(null);
            } else {
              const res = await fetch(
                `/api/tools?cursor=${encodeURIComponent(nextCursor)}${
                  selectedCategories.length > 0
                    ? `&categories=${selectedCategories.join(",")}`
                    : ""
                }`,
              );
              const data = await res.json();
              setTools((prev) => [...prev, ...data.tools]);
              setHasMore(data.hasMore);
              setNextCursor(data.nextCursor);
            }
          } catch (error) {
            console.error("Error loading more tools:", error);
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
    if (loading && tools.length === 0) {
      return (
        <div className="flex w-full items-center justify-center py-16">
          <span className="inline-block size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      );
    }

    if (!loading && tools.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {tools.map((tool) => (
            <Tool key={tool.url} tool={tool} />
          ))}
        </AnimatePresence>
      </div>
    );
  }, [loading, tools]);

  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-4 py-16">
      <Header />
      <Awards />
      <FeaturedTools tools={featuredTools} loadingFeatured={loadingFeatured} />
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
        {!hasMore && !loading && tools.length > 0 && (
          <div className="flex w-full items-center justify-center py-8 text-base font-medium text-gray-300">
            All tools loaded.
          </div>
        )}
      </section>
      <Dock />
    </main>
  );
}
