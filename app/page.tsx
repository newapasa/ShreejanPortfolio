import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat/chat-widget";
import GameLauncher from "@/components/games/game-launcher";
import { portfolioData } from "@/data/portfolio-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <div className="relative z-10">
        <Navbar links={portfolioData.navLinks} />
        <main>
          <Hero data={portfolioData.hero} />
          <Projects projects={portfolioData.projects} />
          <About data={portfolioData.about} />
          <Contact data={portfolioData.contact} />
        </main>
        <Footer data={portfolioData.footer} />
        <ChatWidget />
        <GameLauncher />
      </div>

      {/* Background animated blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
