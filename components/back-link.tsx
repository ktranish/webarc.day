import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      className="mb-16 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to News
    </Link>
  );
}
