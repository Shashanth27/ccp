import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Premium feel
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Retail Pulse | AI Shelf Monitoring",
  description: "Advanced RBAC-driven shelf monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
