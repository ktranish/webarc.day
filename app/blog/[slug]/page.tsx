import { AppImage } from "@/components/app-image";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import client from "@/lib/mongodb";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <>
      <Navbar />
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
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
              <time className="text-sm text-gray-500">
                {new Date(article.created_at).toLocaleDateString()}
              </time>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {article.image_url && (
            <div className="relative mb-8 aspect-video w-full">
              <AppImage
                src={article.image_url}
                alt={article.title}
                className="rounded-2xl"
              />
            </div>
          )}

          <div
            className="prose prose-lg prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
