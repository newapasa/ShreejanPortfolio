export const portfolioData = {
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/#projects" },
    { name: "About", href: "/#about" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/#contact" },
  ],

  hero: {
    title: "Crafting Digital Experiences",
    subtitle: "Frontend Developer",
    description:
      "I build modern, responsive, and interactive web applications with cutting-edge technologies and a focus on user experience.",
    ctaText: "View My Work",
  },

  projects: [
    {
      id: "project-1",
      title: "Nebula Dashboard",
      description:
        "A modern analytics dashboard with real-time data visualization and interactive charts.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project-2",
      title: "Quantum E-commerce",
      description:
        "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Prisma", "Stripe", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project-3",
      title: "Prism Social",
      description:
        "A social media platform with real-time messaging, post sharing, and user profiles.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Firebase", "Tailwind CSS", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project-4",
      title: "Spectrum Portfolio",
      description:
        "A creative portfolio website with smooth animations and interactive elements.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Framer Motion", "Three.js", "GSAP"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project-5",
      title: "Aurora Weather",
      description:
        "A weather application with beautiful visualizations and accurate forecasts.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "OpenWeather API", "Tailwind CSS", "D3.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project-6",
      title: "Pulse Music",
      description:
        "A music streaming application with playlist management and audio visualization.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Spotify API", "Tailwind CSS", "Web Audio API"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ],

  about: {
    title: "About Me",
    subtitle: "Learn more about my background, skills, and experience",
    description: [
      "I'm a passionate developer, functional, and user-friendly web applications.",
      "My journey in web development started with a curiosity about how websites work, which quickly evolved into a deep passion for creating digital experiences that are both visually appealing and technically sound.",
      "I specialize in front-end development with a focus on creating responsive, accessible, and performant web applications. I'm constantly learning and exploring new technologies to stay at the forefront of web development.",
    ],
    skills: [
      {
        category: "Frontend",
        items: [
          "HTML",
          "CSS",
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Vue.js",
          "Tailwind CSS",
          "Framer Motion",
        ],
      },
      {
        category: "Backend",
        items: [
          "Node.js",
          "Express",
          "MongoDB",
          "MySql"
        ],
      },
      {
        category: "Tools & Others",
        items: [
          "Git",
          "GitHub",
          "VS Code",
          "Responsive Design",
          "Web Accessibility",
          "SEO",
          "Performance Optimization",
        ],
      },
    ],
  },

  contact: {
    title: "Contact Me",
    subtitle: "Have a project in mind? Let's work together!",
    email: "newapasa7@gmail.com",
    socials: [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: "github",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: "linkedin",
      },
      {
        name: "Twitter",
        url: "https://twitter.com",
        icon: "twitter",
      },
      {
        name: "Instagram",
        url: "https://instagram.com",
        icon: "instagram",
      },
    ],
  },

  footer: {
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Sitemap", href: "#" },
    ],
  },
  owner: process.env.NEXT_PUBLIC_PORTFOLIO_OWNER || "Portfolio Owner",
};
