import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal | webarc.day",
  description:
    "Access webarc.day's legal documents including Terms of Service, Privacy Policy, Cookie Policy, and Refund Policy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
