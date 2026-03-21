import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import FarmSchema from "@/components/FarmSchema"
import "../globals.css"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://forevermorefarmtn.com"),
  title: "Forevermore Farm — Lyles, Tennessee",
  description: "A regenerative farm in Lyles, TN where people gather, grow, and slow down.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Forevermore Farm",
    locale: "en_US",
    title: "Forevermore Farm — Lyles, Tennessee",
    description: "A regenerative farm in Lyles, TN where people gather, grow, and slow down.",
    images: [
      {
        url: "/images/property/stage-sunrise-fog-valley.jpg",
        width: 1200,
        height: 630,
        alt: "The stage at Forevermore Farm overlooking a fog-filled valley at sunrise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forevermore Farm — Lyles, Tennessee",
    description: "A regenerative farm in Lyles, TN where people gather, grow, and slow down.",
    images: ["/images/property/stage-sunrise-fog-valley.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-farm-cream min-h-screen`}>
        <FarmSchema />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
