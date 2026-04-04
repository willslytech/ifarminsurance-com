import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iFarmInsurance - Compare Farm, Home, Auto & Renters Insurance",
  description: "Compare insurance quotes from top carriers in minutes. Protect your farm, home, and family with comprehensive insurance coverage designed for farmers.",
  keywords: ["farm insurance", "home insurance", "auto insurance", "renters insurance", "agricultural insurance", "iFarmInsurance"],
  authors: [{ name: "iFarmInsurance Team" }],
  icons: {
    icon: "/upload/logo.jpg",
  },
  openGraph: {
    title: "iFarmInsurance - Farm Insurance Simplified",
    description: "Compare insurance quotes from top carriers in minutes. Protect what matters most.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iFarmInsurance - Farm Insurance Simplified",
    description: "Compare insurance quotes from top carriers in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
