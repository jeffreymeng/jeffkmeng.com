import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jeffrey Meng",
  description:
    "I'm Jeffrey Meng, a software engineer interested in Programming Languages, Systems, and the Web. I currently study CS @ UC Irvine.",
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
