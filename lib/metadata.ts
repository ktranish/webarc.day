import { BASE_URL } from "@/constants";
import type { Metadata } from "next";

interface BaseMetadata {
  title: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
}

interface NewsArticleMetadata extends BaseMetadata {
  type: "article";
  publishedTime: string;
  modifiedTime: string;
  author: string;
  source: string;
  category: string;
  keywords: string[];
}

interface NewsIndexMetadata extends BaseMetadata {
  type: "news";
  articles: Array<{
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    source: string;
    category: string;
    image?: string;
  }>;
}

interface ToolsIndexMetadata extends BaseMetadata {
  type: "tools";
  tools: Array<{
    title: string;
    description: string;
    category: string;
    url: string;
  }>;
}

interface ToolMetadata extends BaseMetadata {
  type: "tool";
  category: string;
  features: string[];
  pricing?: "free" | "freemium" | "paid";
}

interface BlogArticleMetadata extends BaseMetadata {
  type: "blog";
  publishedTime: string;
  modifiedTime: string;
  author: string;
  wordCount: number;
  readingTime: string;
  keywords: string[];
}

interface BlogIndexMetadata extends BaseMetadata {
  type: "blog-index";
  posts: Array<{
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    image?: string;
  }>;
}

interface ContactMetadata extends BaseMetadata {
  type: "contact";
}

interface LegalMetadata extends BaseMetadata {
  type: "legal";
  documentType: "privacy" | "terms" | "cookies" | "refund";
}

interface AboutMetadata extends BaseMetadata {
  type: "about";
  mission: string;
  features: string[];
}

type PageMetadata =
  | NewsArticleMetadata
  | NewsIndexMetadata
  | ToolsIndexMetadata
  | ToolMetadata
  | BlogArticleMetadata
  | BlogIndexMetadata
  | ContactMetadata
  | LegalMetadata
  | AboutMetadata;

function generateSchemaOrg(metadata: PageMetadata) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type":
      metadata.type === "article" || metadata.type === "blog"
        ? "BlogPosting"
        : "WebPage",
    name: metadata.title,
    description: metadata.description,
    url: `${BASE_URL}${metadata.path}`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  };

  switch (metadata.type) {
    case "article":
      return {
        ...baseSchema,
        "@type": "BlogPosting",
        headline: metadata.title,
        articleBody: metadata.description,
        datePublished: metadata.publishedTime,
        dateModified: metadata.modifiedTime,
        keywords: metadata.keywords,
        articleSection: metadata.category,
        author: {
          "@type": "Person",
          name: metadata.author,
        },
        publisher: {
          "@type": "Organization",
          name: metadata.source,
        },
        image: metadata.image
          ? {
              "@type": "ImageObject",
              url: metadata.image.url,
              width: metadata.image.width,
              height: metadata.image.height,
            }
          : undefined,
      };
    case "news":
      return {
        ...baseSchema,
        "@type": "CollectionPage",
        about: {
          "@type": "Thing",
          name: "Web Development News",
          description: "Curated web development news and tutorials",
        },
        hasPart: metadata.articles.map((article, index) => ({
          "@type": "BlogPosting",
          "@id": `${BASE_URL}/news/${article.slug}`,
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          dateModified: article.date,
          articleSection: article.category,
          author: {
            "@type": "Organization",
            name: article.source,
          },
          image: article.image
            ? {
                "@type": "ImageObject",
                url: article.image,
                width: 1200,
                height: 630,
              }
            : undefined,
          position: index + 1,
        })),
      };
    case "tools":
      return {
        ...baseSchema,
        "@type": "CollectionPage",
        about: {
          "@type": "Thing",
          name: "Developer Tools",
          description:
            "Curated collection of web development tools and resources",
        },
        hasPart: metadata.tools.map((tool, index) => ({
          "@type": "SoftwareApplication",
          name: tool.title,
          description: tool.description,
          applicationCategory: tool.category,
          url: tool.url,
          position: index + 1,
        })),
      };
    case "tool":
      return {
        ...baseSchema,
        "@type": "SoftwareApplication",
        name: metadata.title,
        description: metadata.description,
        applicationCategory: metadata.category,
        featureList: metadata.features,
        ...(metadata.pricing && {
          offers: {
            "@type": "Offer",
            price: metadata.pricing === "free" ? "0" : undefined,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        }),
      };
    case "blog":
      return {
        ...baseSchema,
        "@type": "BlogPosting",
        headline: metadata.title,
        articleBody: metadata.description,
        wordCount: metadata.wordCount,
        datePublished: metadata.publishedTime,
        dateModified: metadata.modifiedTime,
        keywords: metadata.keywords,
        timeRequired: metadata.readingTime,
        articleSection: "Web Development",
        author: {
          "@type": "Person",
          name: metadata.author,
        },
        publisher: {
          "@type": "Organization",
          name: "webarc.day",
          url: BASE_URL,
        },
        image: metadata.image
          ? {
              "@type": "ImageObject",
              url: metadata.image.url,
              width: metadata.image.width,
              height: metadata.image.height,
            }
          : undefined,
      };
    case "blog-index":
      return {
        ...baseSchema,
        "@type": "Blog",
        blogPosts: metadata.posts.map((post, index) => ({
          "@type": "BlogPosting",
          "@id": `${BASE_URL}/blog/${post.slug}`,
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          image: post.image
            ? {
                "@type": "ImageObject",
                url: post.image,
                width: 1200,
                height: 630,
              }
            : undefined,
          position: index + 1,
        })),
      };
    case "contact":
      return {
        ...baseSchema,
        "@type": "ContactPage",
        mainEntity: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "kenny@ketryon.com",
          availableLanguage: ["English"],
        },
      };
    case "legal":
      return {
        ...baseSchema,
        "@type": "WebPage",
        about: {
          "@type": "Thing",
          name:
            metadata.documentType === "privacy"
              ? "Privacy Policy"
              : metadata.documentType === "terms"
                ? "Terms of Service"
                : metadata.documentType === "cookies"
                  ? "Cookie Policy"
                  : "Refund Policy",
        },
      };
    case "about":
      return {
        ...baseSchema,
        "@type": "WebPage",
        about: {
          "@type": "Organization",
          name: "webarc.day",
          description: metadata.mission,
          url: BASE_URL,
          sameAs: [],
        },
      };
    default:
      return baseSchema;
  }
}

export function buildMetadata(metadata: PageMetadata): Metadata {
  const defaultImage = {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: metadata.title,
  };

  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: metadata.path,
      type:
        metadata.type === "article" || metadata.type === "blog"
          ? "article"
          : "website",
      siteName: "webarc.day",
      ...(metadata.type === "article" && {
        publishedTime: (metadata as NewsArticleMetadata).publishedTime,
        modifiedTime: (metadata as NewsArticleMetadata).modifiedTime,
        authors: [(metadata as NewsArticleMetadata).author],
      }),
      ...(metadata.type === "blog" && {
        publishedTime: (metadata as BlogArticleMetadata).publishedTime,
        modifiedTime: (metadata as BlogArticleMetadata).modifiedTime,
        authors: [(metadata as BlogArticleMetadata).author],
      }),
      images: [metadata.image || defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [metadata.image?.url || defaultImage.url],
      creator: "@itsk3nny_",
    },
    alternates: {
      canonical: metadata.path,
    },
    other: {
      "application/ld+json": JSON.stringify(generateSchemaOrg(metadata)),
    },
  };
}

export function extractKeywords(content: string): string[] {
  const commonTerms = [
    "web development",
    "programming",
    "tutorial",
    "news",
    "tools",
    "resources",
  ];
  const words = content.toLowerCase().split(/\W+/);
  const wordFreq = new Map<string, number>();

  words.forEach((word) => {
    if (word.length > 3) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  });

  const topWords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  return [...new Set([...commonTerms, ...topWords])];
}
