import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-y-8 px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-y-6 rounded-3xl border border-gray-100 bg-white/80 p-12 text-center backdrop-blur-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Article Not Found
            </h2>
            <p className="text-gray-600">
              The article you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
