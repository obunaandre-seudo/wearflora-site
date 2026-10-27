import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const script = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wearflora — Elegant Women's Fashion",
    template: "%s | Wearflora",
  },
  description:
    "Timeless styles. Modern femininity. Discover women's fashion that feels like you — dresses, tops, trousers, blazers and more from Wearflora.",
  openGraph: {
    title: "Wearflora — Elegant Women's Fashion",
    description:
      "Timeless styles. Modern femininity. Discover fashion that feels like you.",
    siteName: "Wearflora",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('wf-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}" }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${script.variable} ${mono.variable} font-body antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgb(var(--surface))",
              color: "rgb(var(--text))",
              border: "1px solid rgb(var(--border))",
              borderRadius: "999px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
