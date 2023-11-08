import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";

const inter = Inter({ subsets: ["latin"] });
ReactGA.initialize("G-SGD74WQ9M0");

export const metadata = {
  metadataBase: new URL("https://jeffkmeng.com"),

  title: "Jeffrey Meng",
  description:
    "I'm a software engineer thinking about Programming Languages, Systems, and the Web. I currently study CS at UC Irvine.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Jeffrey Meng",
    description:
      "I'm a software engineer thinking about Programming Languages, Systems, and the Web. I currently study CS at UC Irvine.",
    url: "https://jeffkmeng.com",
    siteName: "Jeffrey Meng",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  );
}
