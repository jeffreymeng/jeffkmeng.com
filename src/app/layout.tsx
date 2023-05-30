import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://jeffkmeng.com"),

  title: "Jeffrey Meng",
  description:
    "I'm Jeffrey Meng, a software engineer interested in Programming Languages, Systems, and the Web. I currently study CS at UC Irvine.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Jeffrey Meng",
    description:
      "Software engineer interested in Programming Languages, Systems, and the Web. Currently studying CS at UC Irvine.",
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
    </html>
  );
}
