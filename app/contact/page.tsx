import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { ContactClient } from "./components";

export const metadata: Metadata = buildMetadata({
  type: "contact",
  title: "Contact | webarc.day",
  description:
    "Get in touch with the webarc.day team. We're here to help with any questions or feedback you may have.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
