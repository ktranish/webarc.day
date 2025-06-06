"use client";

import { AppImage } from "@/components/app-image";
import { ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

const TOOLS: {
  title: string;
  description: string;
  category: string;
  url: string;
}[] = [
  {
    category: "IDE",
    description:
      "Tabnine is the world’s most contextually aware AI software development platform, helping mature engineering teams speed up and simplify.",
    title: "Tabnine",
    url: "https://www.tabnine.com/",
  },
  {
    category: "IDE",
    description:
      "Fine is a software development tool for startup founders, builders and developers.",
    title: "Fine",
    url: "https://www.fine.dev/",
  },
  {
    category: "IDE",
    description:
      "GoCodeo is an AI-driven development platform that automates coding, testing, and deployment - right inside your IDE",
    title: "GoCodeo",
    url: "https://www.gocodeo.com/",
  },
];

function ToolsHeader() {
  return (
    <header className="flex flex-col gap-y-4">
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

function Awards() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <p className="text-sm font-medium text-gray-500">Awards recieved</p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        <a
          href="https://fazier.com/launches/webarc-day"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <img
            src="https://fazier.com/api/v1/public/badges/embed_image.svg?launch_id=4594&badge_type=daily&theme=light"
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

function ToolItem({ tool }: { tool: (typeof TOOLS)[0] }) {
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${tool.url}&sz=64`;

  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white/80 p-6 backdrop-blur-sm transition hover:shadow-sm sm:flex-row sm:items-center sm:gap-6">
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
          <h2 className="text-lg font-semibold tracking-tight text-gray-900">
            {tool.title}
          </h2>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10">
            {tool.category}
          </span>
        </div>
        <p className="text-sm text-gray-600">{tool.description}</p>
      </div>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 sm:self-center"
      >
        Try it now
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

export default function ToolsPage() {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Developer Tools & Resources | webarc.day",
            description:
              "A curated collection of essential developer tools and resources to enhance your development workflow.",
            url: "https://www.webarc.day/tools",
            publisher: {
              "@type": "Organization",
              name: "webarc.day",
              url: "https://www.webarc.day",
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: TOOLS.map((tool, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "SoftwareApplication",
                  name: tool.title,
                  description: tool.description,
                  applicationCategory: tool.category,
                  url: tool.url,
                },
              })),
            },
          }),
        }}
        id="tools-schema"
        type="application/ld+json"
      />

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-16 px-4 py-16">
        <ToolsHeader />
        <Awards />
        {TOOLS.length > 0 ? (
          <div className="flex flex-col gap-4">
            {TOOLS.map((tool, index) => (
              <ToolItem key={index} tool={tool} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </>
  );
}
