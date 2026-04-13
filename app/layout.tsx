import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aide.sh — One file to agentize your Claude project",
  description:
    "Drop an Aidefile into any Claude Code project. Budget, vault, hooks, triggers. Fire and forget.",
  openGraph: {
    title: "aide.sh — One file to agentize your Claude project",
    description: "Drop an Aidefile into any Claude Code project. Budget, vault, hooks, triggers. Fire and forget.",
    url: "https://aide.sh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${mono.variable} antialiased bg-black text-white`}>
        {children}
        <Script
          src="/tip.js"
          data-wallet="0x9C461A35FB6F48698E559Db402e9b0f5d08c1979"
          data-amounts="1,2,5"
          data-theme="dark"
          data-label="Tip"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
