import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aide.sh — Docker for AI Agents",
  description:
    "Package, deploy, and manage AI agents with Agentfile. Isolated credentials, public registry, Docker-style CLI.",
  openGraph: {
    title: "aide.sh — Docker for AI Agents",
    description: "Package, deploy, and manage AI agents with Agentfile.",
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
      </body>
    </html>
  );
}
