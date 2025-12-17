import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

import { Footer, Header } from "@/components/layout";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Quals",
  description:
    "Play fair, compete smarter, connect better. We build communities, host events, and play with transparency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
