import { AppImage } from "@/components/app-image";
import client from "@/lib/mongodb";
import { ArrowLeft } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";

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

// Force static generation
export const dynamic = "force-static";

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const db = client.db("webarc");
    const collection = db.collection("articles");
    const articles = await collection
      .find({}, { projection: { slug: 1 } })
      .toArray();

    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error("Error generating static paths:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.title,
    description: article.meta_description,
    openGraph: {
      title: article.title,
      description: article.meta_description,
      type: "article",
      publishedTime: article.created_at,
      authors: ["webarc.day"],
      tags: article.tags,
      images: article.image_url ? [article.image_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.meta_description,
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

// Server-side data fetching
async function getArticle(slug: string): Promise<Article | null> {
  try {
    const db = client.db("webarc");
    const collection = db.collection("articles");
    const article = await collection.findOne({ slug });
    return article as Article | null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const date = new Date(article.created_at);
  const now = new Date();
  const isRecent = now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <>
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-8 px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article className="prose prose-lg mx-auto w-full max-w-none">
          <header className="mb-8">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10">
                {article.tags[0]}
              </span>
              <time
                dateTime={article.created_at}
                className="text-xs font-medium text-gray-500 tabular-nums"
              >
                {isRecent
                  ? formatDistanceToNow(date, { addSuffix: true })
                  : format(date, "MMM d, yyyy")}
              </time>
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {article.image_url && (
            <div className="relative aspect-video w-full">
              <AppImage
                src={article.image_url}
                alt={article.title}
                className="rounded-2xl"
              />
            </div>
          )}

          <div
            className="prose prose-lg prose-blue mt-24 max-w-none [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-gray-900 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-gray-100 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_table]:my-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:rounded-lg [&_table]:border [&_table]:border-gray-200 [&_table_td]:p-4 [&_table_th]:bg-gray-50 [&_table_th]:p-4 [&_table_th]:font-semibold [&_table_tr]:border-b [&_table_tr]:border-gray-200 [&_table_tr:last-child]:border-0"
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />
        </article>
      </main>
    </>
  );
}
