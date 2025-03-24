import { Suspense } from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { portfolioData } from "@/data/portfolio-data"
import ResumeContent from "@/components/resume/resume-content"

export const metadata: Metadata = {
  title: "Resume | Shreejan.SP Portfolio",
  description: "Professional resume and qualifications",
}
async function ResumeWithData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/resume`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch resume data")
    }

    const resumeData = await response.json()
    return <ResumeContent initialData={resumeData} />
  } catch (error) {
    console.error("Error pre-fetching resume data:", error)
    return <ResumeContent />
  }
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <div className="relative z-10">
        <Navbar links={portfolioData.navLinks} />
        <main className="pt-24 pb-16">
          <Suspense
            fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-16 h-16">
                  <div className="w-full h-full rounded-full border-4 border-white/10 border-t-cyan-400 animate-spin"></div>
                </div>
              </div>
            }
          >
            <ResumeWithData />
          </Suspense>
        </main>
        <Footer data={portfolioData.footer} />
      </div>

      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}

