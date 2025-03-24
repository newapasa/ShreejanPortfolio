import { NextResponse } from "next/server"

export async function GET() {
  const resumeData = {
    basics: {
      name: process.env.NEXT_PUBLIC_PORTFOLIO_OWNER || "Shreejan Prajapati",
      title: "Creative Frontend Developer",
      summary:
        "Passionate developer with expertise in creating immersive digital experiences using cutting-edge technologies. Specializing in interactive web applications with a focus on user experience and visual appeal.",
      location: "Bhaktapur, Thimi",
      email: "newapasa7@gmail.com",
      phone: "9861993999",
      profiles: [
        { network: "LinkedIn", url: "https://linkedin.com/in/username" },
        { network: "GitHub", url: "https://github.com/username" },
        { network: "Twitter", url: "https://twitter.com/username" },
      ],
    },
    skills: [
      {
        category: "Frontend Development",
        items: [
          { name: "React", level: 80 },
          { name: "Next.js", level: 70 },
          { name: "TypeScript", level: 65 },
          { name: "Tailwind CSS", level: 90 },
          { name: "Framer Motion", level: 70 },
        ],
      },
      // {
      //   category: "Backend Development",
      //   items: [
      //     { name: "Node.js", level: 75 },
      //     { name: "Express", level: 70 },
      //     { name: "MongoDB", level: 70 },
      //     { name: "MySql", level: 70 },
      //     { name: "Worpress", level: 90 },
      //   ],
      // },
      {
        category: "Design",
        items: [
          { name: "Responsive Design", level: 95 },
          { name: "Animation", level: 80 },
        ],
      },
    ],
    experience: [
      {
        company: "Creative Tech Solutions",
        position: "Senior Wordpress Developer",
        location: "Profoxstudio",
        startDate: "2023",
        endDate: "2024",
        highlights: [
          "Led the development of interactive web applications using wordpress, js",
          "Implemented responsive designs and animations using Bootstrap CSS and gsap",
          "Collaborated with designers to create seamless user experiences",
          "Mentored junior developers and conducted code reviews",
        ],
      },
    ],
    education: [
      {
        institution: "Swastik College",
        area: "Humanities, BCA",
        studyType: "Bachelor's Running",
        startDate: "2021-09",
        endDate: "2026",
        gpa: "NAN",
        courses: ["Web Development", "User Interface Design", "Data Structures and Algorithms", "Database Systems"],
      },
      {
        institution: "Broadway Infoysis",
        area: "MERN Stack",
        studyType: "Certificate",
        startDate: "2023",
        endDate: "2023-06",
        courses: ["MERN Stack"],
      },
    ],
    projects: [
      {
        name: "Immersive Portfolio",
        description: "A portfolio website with interactive 3D elements and animations",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        url: "https://example.com/portfolio",
      },
      {
        name: "E-commerce Platform",
        description: "A full-featured e-commerce platform with product management and checkout",
        technologies: ["Next.js", "MongoDB", "Tailwind CSS"],
        url: "https://example.com/ecommerce",
      },
    ],
    certifications: [
      {
        name: "Advanced React and Redux",
        issuer: "Frontend Masters",
        date: "2023",
      },
      {
        name: "Full Stack Web Development",
        issuer: "Udemy",
        date: "2024",
      },
    ],
    languages: [
      { language: "English", fluency: "Native" },
      { language: "Nepali", fluency: "Professional" },
    ],
    interests: [
      "Interactive Web Experiences",
      "UI Animation",
      "Emerging Web Technologies",
      "Open Source Contribution",
    ],
  }

  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(resumeData)
}

