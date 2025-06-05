"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

const BLOG_POSTS: {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
}[] = [];

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

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 rounded-3xl border border-gray-100 bg-white/80 p-12 text-center backdrop-blur-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
        <FileText className="h-8 w-8 text-blue-600" />
      </div>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-xl font-semibold text-gray-900">No Articles Yet</h2>
        <p className="text-gray-600">
          We're working on bringing you the latest insights and tutorials.
          <br />
          Check back soon for new content!
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

function BlogPost({ post }: { post: (typeof BLOG_POSTS)[0] }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-6 backdrop-blur-sm">
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">
            {post.title}
          </h2>
          <p className="truncate text-gray-600">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between">
          <time className="text-sm text-gray-500">{post.date}</time>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-8 px-4 py-16">
        <BlogHeader />
        {BLOG_POSTS.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
      <Footer />
    </>
  );
}
