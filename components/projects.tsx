"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden z-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-500">
            My Projects
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore my latest work showcasing creative solutions and technical expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Glass decoration */}
      <div className="absolute top-40 -left-20 w-60 h-60 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full backdrop-blur-sm border border-white/10 -z-20"></div>
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-green-500/10 rounded-full backdrop-blur-sm border border-white/10 -z-20"></div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.2 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return

      const { left, top, width, height } = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      const rotateX = 10 - y * 20
      const rotateY = x * 20 - 10

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      cardRef.current.style.setProperty("--mouse-x", `${x}`)
      cardRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    const handleMouseLeave = () => {
      if (!cardRef.current) return
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener("mousemove", handleMouseMove)
      card.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove)
        card.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-full transition-all duration-300 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10 p-6 transition-all duration-300">
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(123, 31, 162, 0.15), transparent 40%)",
          }}
        ></div>

        <div className="relative z-10">
          <div className="mb-6 overflow-hidden rounded-lg">
            <img
              src={project.image || "/placeholder.svg?height=400&width=600"}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-green-500 transition-all duration-300">
            {project.title}
          </h3>

          <p className="text-white/70 mb-4 text-sm">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex space-x-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-white/80 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" /> Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-white/80 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 mr-1" /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

