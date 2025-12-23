import type { Metadata } from "next";
import "./globals.css";

import AiAssistant from "@/components/AiAssistant";

export const metadata: Metadata = {
  title: "Portfolio Living",
  description: "Simple systems for wealth, career & communication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fallback to standard Google Fonts link to avoid build-time fetch issues in CI */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased font-sans text-gray-900 bg-white"
        style={{
          // @ts-expect-error
          "--font-inter": "'Inter', sans-serif",
          "--font-space-grotesk": "'Space Grotesk', sans-serif",
          "--font-playfair": "'Playfair Display', serif"
        }}
      >
        {children}
        <AiAssistant />
      </body>
    </html>
  );
}
