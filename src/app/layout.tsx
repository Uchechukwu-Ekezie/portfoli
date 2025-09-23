import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import AuthProvider from "@/components/providers/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Oshiomah P. Oyageshio",
  description: " Interdisciplinary Scientist",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
