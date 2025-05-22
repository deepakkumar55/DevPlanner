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
  title: "DevPlanner | Productivity Suite for Developers",
  description:
    "Track job applications, manage tasks, plan content, and boost your productivity with DevPlanner - the all-in-one tool built specifically for developers.",
  keywords: [
    "developer tools",
    "productivity",
    "job tracker",
    "task scheduler",
    "content planner",
    "developer workflow",
    "freelance CRM",
  ],
  authors: [{ name: "DevPlanner Team" }],
  creator: "DevPlanner",
  publisher: "Campus Coders",
  metadataBase: new URL("https://devplanner.thecampuscoders.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devplanner.thecampuscoders.com",
    title: "DevPlanner - Developer Productivity Reimagined",
    description:
      "The ultimate productivity suite for developers - track job applications, manage tasks, and organize content all in one place.",
    siteName: "DevPlanner",
    images: [
      {
        url: "/og-image.png", // Create this image for social sharing
        width: 1200,
        height: 630,
        alt: "DevPlanner - Developer Productivity Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevPlanner - Developer Productivity Reimagined",
    description:
      "Track job applications, manage tasks, plan content, and boost your productivity with DevPlanner.",
    images: ["/twitter-image.png"], // Create this image for Twitter sharing
    creator: "@thecampuscoders",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#020617" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
