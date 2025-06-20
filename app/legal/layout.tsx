import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  type: "legal",
  title: "Legal | webarc.day",
  description:
    "Access webarc.day's legal documents including Terms of Service, Privacy Policy, Cookie Policy, and Refund Policy.",
  path: "/legal",
  documentType: "terms", // Default document type
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
