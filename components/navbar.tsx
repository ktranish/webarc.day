"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[60] border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-5xl px-8">
        <div className="flex h-16 items-center justify-between">
          <Link className="inline-block" href="/">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                webarc.day
              </h2>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                beta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-x-8">
              <li>
                <Link
                  className={cn(
                    "text-sm transition-colors",
                    pathname === "/"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600",
                  )}
                  href="/"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    "text-sm transition-colors",
                    pathname === "/blog"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600",
                  )}
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    "text-sm transition-colors",
                    pathname === "/tools"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600",
                  )}
                  href="/tools"
                >
                  Tools
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="-mx-8 border-t border-gray-100 px-8 py-4 md:hidden">
            <nav>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <Link
                    className={cn(
                      "text-sm transition-colors",
                      pathname === "/"
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600",
                    )}
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      "text-sm transition-colors",
                      pathname === "/blog"
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600",
                    )}
                    href="/blog"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className={cn(
                      "text-sm transition-colors",
                      pathname === "/tools"
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600",
                    )}
                    href="/tools"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tools
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
