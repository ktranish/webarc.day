import { cn } from "@/lib/utils";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", sora.className)}>{children}</body>
    </html>
  );
}
