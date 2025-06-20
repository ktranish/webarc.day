"use client";

import { format, formatDistanceToNow } from "date-fns";
import { ArrowRight, FileText, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Article {
  id: string;
  title: string;
  content_markdown: string;
  content_html: string;
  meta_description: string;
  created_at: string;
  image_url: string;
  slug: string;
  tags: string[];
}

function BlogHeader() {
  return (
    <header className="flex flex-col gap-y-4">
      <a
        className="mx-auto"
        href="https://frogdr.com/webarc.day?utm_source=webarc.day"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <img
          src="https://frogdr.com/webarc.day/badge-white-sm.svg?badge=1&round=1"
          alt="Monitor&#0032;your&#0032;Domain&#0032;Rating&#0032;with&#0032;FrogDR"
          width="249"
          height="36"
        />
      </a>
      <h1 className="text-center text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Web Development
        <br />
        <span className="text-blue-600">Insights & Tutorials</span>
      </h1>
      <p className="mx-auto max-w-xl text-center text-gray-600 sm:text-lg">
        Stay updated with the latest trends, technologies, and best practices in
        web development.
      </p>
    </header>
  );
}

function SearchCTA({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="rounded-3xl bg-white/80 py-6 backdrop-blur-sm">
        <div className="flex flex-col gap-y-6">
          {/* Search Input */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-12 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-blue-200 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 right-4 -translate-y-1/2"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-gray-400 transition-colors hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 rounded-3xl border border-gray-100 bg-white/80 p-12 text-center backdrop-blur-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
        <FileText className="h-8 w-8 text-blue-600" />
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-semibold text-gray-900">
          No Articles Available
        </h2>
        <p className="text-gray-600">
          We&apos;re currently working on new content.
          <br />
          Check back soon for new articles!
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

function BlogPost({ post }: { post: Article }) {
  const date = new Date(post.created_at);
  const now = new Date();
  const isRecent = now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-6 backdrop-blur-sm transition-all hover:border-gray-200 hover:shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10">
                {post.tags[0]}
              </span>
              <time
                dateTime={post.created_at}
                className="text-xs font-medium text-gray-500 tabular-nums"
              >
                {isRecent
                  ? formatDistanceToNow(date, { addSuffix: true })
                  : format(date, "MMM d, yyyy")}
              </time>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600">
              {post.title}
            </h2>
            <p className="line-clamp-2 text-gray-600">
              {post.meta_description}
            </p>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
              Read more
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [prefetchedData, setPrefetchedData] = useState<{
    articles: Article[];
    nextCursor: string | null;
    hasMore: boolean;
  } | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Reset articles when search changes
  useEffect(() => {
    setArticles([]);
    setHasMore(true);
    setNextCursor(null);
    setPrefetchedData(null);
    setLoading(true);
    setError(null);
  }, [searchQuery]);

  // Initial fetch
  useEffect(() => {
    async function fetchArticles() {
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
          params.append("search", searchQuery.trim());
        }

        const response = await fetch(`/api/articles?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data.articles);
        setHasMore(data.hasMore);
        setNextCursor(data.nextCursor);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [searchQuery]);

  // Prefetch next batch when we have a cursor
  useEffect(() => {
    if (!nextCursor || loadingMore || !hasMore) return;

    const prefetchNextBatch = async () => {
      try {
        const params = new URLSearchParams();
        params.append("cursor", nextCursor);
        if (searchQuery.trim()) {
          params.append("search", searchQuery.trim());
        }

        const res = await fetch(`/api/articles?${params.toString()}`);
        const data = await res.json();
        setPrefetchedData(data);
      } catch (error) {
        console.error("Error prefetching next batch:", error);
      }
    };

    prefetchNextBatch();
  }, [nextCursor, loadingMore, hasMore, searchQuery]);

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
              setArticles((prev) => [...prev, ...prefetchedData.articles]);
              setHasMore(prefetchedData.hasMore);
              setNextCursor(prefetchedData.nextCursor);
              setPrefetchedData(null);
            } else {
              const params = new URLSearchParams();
              params.append("cursor", nextCursor);
              if (searchQuery.trim()) {
                params.append("search", searchQuery.trim());
              }

              const res = await fetch(`/api/articles?${params.toString()}`);
              const data = await res.json();
              setArticles((prev) => [...prev, ...data.articles]);
              setHasMore(data.hasMore);
              setNextCursor(data.nextCursor);
            }
          } catch (error) {
            console.error("Error loading more articles:", error);
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
  }, [hasMore, loading, loadingMore, nextCursor, prefetchedData, searchQuery]);

  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-8 px-4 py-16">
      <BlogHeader />
      <SearchCTA searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <span className="inline-block size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {articles.map((article) => (
              <BlogPost key={article.id} post={article} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState />
      )}
      {hasMore && !loadingMore && !loading && (
        <div
          ref={observerTarget}
          className="flex w-full items-center justify-center py-16"
        >
          <span className="inline-block size-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </div>
      )}
      {!hasMore && !loading && articles.length > 0 && (
        <div className="flex w-full items-center justify-center py-8 text-base font-medium text-gray-300">
          {searchQuery ? "No more search results." : "All articles loaded."}
        </div>
      )}
    </main>
  );
}
