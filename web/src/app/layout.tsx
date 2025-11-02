import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3-Month Upside Radar",
  description:
    "Quantitative screen highlighting U.S. equities with 10%+ upside potential using momentum, analyst sentiment, and quality metrics.",
  openGraph: {
    title: "3-Month Upside Radar",
    description:
      "Top U.S. stock ideas targeting a 10% move over the next quarter. Blend of momentum, analyst outlook, and quality signals.",
    url: "https://agentic-928172cc.vercel.app",
    siteName: "3-Month Upside Radar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3-Month Upside Radar",
    description:
      "Research-backed shortlist of U.S. equities with projected 10% upside over the next three months.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
