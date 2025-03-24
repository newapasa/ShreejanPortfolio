import type React from "react"
import "../globals.css"
import "./print.css"
import { ThemeProvider } from "@/components/theme-provider"

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

