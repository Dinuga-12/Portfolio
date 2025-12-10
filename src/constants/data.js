import { Code2, Cpu, Database, Layout, Server, PenTool } from "lucide-react";

// --- NEW IMPORTS FOR SKILLS (Requires: npm install react-icons) ---
import { FaJava, FaPython, FaReact, FaNodeJs, FaHtml5 } from "react-icons/fa";
import { SiCplusplus, SiArduino, SiMongodb, SiJavascript, SiMysql, SiGit } from "react-icons/si";

// --- IMPORT IMAGES DIRECTLY ---
// (Make sure files are in src/assets/certificates/)
import javaImg from "../assets/certificates/java.png";
import googleImg from "../assets/certificates/google.png";
import udemyImg from "../assets/certificates/udemy.png";
import courseraImg from "../assets/certificates/coursera.png";

export const personalInfo = {
  name: "Dinuga Methwan",
  titles: [
    "Web Designer",
    "Full-Stack Developer",
    "Mobile App Developer",
    "Data Scientist",
    "Graphic Designer",
    "UI/UX Designer"
  ],
  tagline: "Crafting digital experiences with clarity and impact.",
  microcopy: "I build clean, functional, and visually engaging web & mobile experiences — exploring 3D and interactive techniques.",
  email: "dinugamethwan34@gmail.com",
  phone: "0765677654",
  phoneIntl: "+947656777654",
  location: "Sri Lanka",
  socials: {
    github: "https://github.com/dinugamethwan",
    linkedin: "https://linkedin.com/in/dinugamethwan",
  }
};

export const aboutData = {
  background: "I’m Dinuga Methwan, a Computer Engineering undergraduate from Sri Lanka, passionate about creating digital experiences that blend logic, creativity, and purposeful design. With experience spanning full-stack development, web design, mobile app development, data science, and UI/UX, I enjoy building clean, functional, and visually immersive interfaces.",
  
  bio: "My background in both programming and graphic design allows me to approach problems from multiple angles — ensuring every solution is not only technically sound but also intuitive and engaging. Over the years, through coursework, freelance projects, and hands-on engineering work, I’ve developed strong skills in crafting responsive applications, interactive interfaces, and smart embedded systems. Curious by nature and detail-oriented in my process, I’m driven by the challenge of turning ideas into polished digital products. When I’m not coding or designing, I’m often exploring immersive video games, which continuously inspire the way I think about experience, storytelling, and user interaction.",
  
  personality: "Curious and detail-oriented — driven by the challenge of turning ideas into polished products.",
  motivation: "I thrive on creating digital experiences that blend logic, creativity, and purposeful design."
};

// --- UPDATED SKILLS DATA (3 & 6 Months Experience) ---
export const skillsData = [
  {
    name: "Java",
    category: "Programming",
    icon: FaJava,
    desc: "Object-oriented programming, Spring Framework, and enterprise applications.",
    experience: "6 Months Experience", // Updated
    color: "#e11d48", 
  },
  {
    name: "Python",
    category: "Programming",
    icon: FaPython,
    desc: "Data science, automation scripts, Django/Flask backends, and AI models.",
    experience: "3 Months Experience", // Updated
    color: "#3b82f6", 
  },
  {
    name: "C++",
    category: "Programming",
    icon: SiCplusplus,
    desc: "System programming, data structures, algorithms, and performance.",
    experience: "6 Months Experience", // Updated
    color: "#0ea5e9", 
  },
  {
    name: "React",
    category: "Web Development",
    icon: FaReact,
    desc: "Building interactive UIs, component architecture, hooks, and state.",
    experience: "3 Months Experience", // Updated
    color: "#06b6d4", 
  },
  {
    name: "JavaScript",
    category: "Web Development",
    icon: SiJavascript,
    desc: "ES6+, DOM manipulation, async programming, and modern web frameworks.",
    experience: "6 Months Experience", // Updated
    color: "#fbbf24", 
  },
  {
    name: "HTML/CSS",
    category: "Web Development",
    icon: FaHtml5,
    desc: "Semantic markup, responsive design, animations, and accessibility.",
    experience: "6 Months Experience", // Updated
    color: "#f97316", 
  },
  {
    name: "Node.js",
    category: "Web Development",
    icon: FaNodeJs,
    desc: "Server-side logic, REST APIs, database integration, and backend scalability.",
    experience: "3 Months Experience", // Updated
    color: "#22c55e", 
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: SiMongodb,
    desc: "NoSQL database design, schema modeling, and data aggregation.",
    experience: "3 Months Experience", // Updated
    color: "#16a34a", 
  },
  {
    name: "MySQL",
    category: "Database",
    icon: SiMysql,
    desc: "Relational database management, complex queries, and normalization.",
    experience: "6 Months Experience", // Updated
    color: "#00758f", 
  },
  {
    name: "Arduino / IoT",
    category: "Hardware",
    icon: SiArduino,
    desc: "Embedded systems, sensor integration, circuit design, and hardware logic.",
    experience: "6 Months Experience", // Updated
    color: "#00979d", 
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    icon: SiGit,
    desc: "Version control, collaboration, branching strategies, and CI/CD basics.",
    experience: "3 Months Experience", // Updated
    color: "#f1502f", 
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Automated Smart Shopping Cart",
    type: "Hardware / Embedded Systems / IoT",
    description: "A smart shopping cart designed to automate product detection, calculate totals in real time, and guide users through stores to reduce checkout time and improve convenience.",
    features: [
      "Automatic product detection (RFID / Weight / Ultrasonic)",
      "Real-time price calculation and display",
      "Navigation assistance"
    ],
    tech: ["Arduino", "C++", "Python", "RFID", "Ultrasonic Sensors", "IoT"],
    role: "Hardware Programmer, Project Lead",
    result: "Successfully built a working prototype.",
    image: "/projects/smart-cart.png"
  },
  {
    id: 2,
    title: "Healthcare Appointment System",
    type: "Full-Stack Web Application",
    description: "A full-stack appointment booking platform that manages doctors, medical centers, and hospitals. Admins can add/remove doctors; patients can book appointments easily.",
    features: [
      "Admin panel for doctor/hospital management",
      "Doctor dashboard for patient details",
      "Patient interface for searching and booking"
    ],
    tech: ["Node.js", "Express", "MySQL", "React", "Material-UI"],
    role: "UI/UX Designer, Project Lead",
    result: "Successfully built a fully functional appointment booking platform.",
    image: "/projects/healthcare.png"
  },
  {
    id: 3,
    title: "VisionGuard – AI Object Detection",
    type: "Data Science / Computer Vision",
    description: "An intelligent surveillance or monitoring system that uses machine-learning object detection to identify people, vehicles, or predefined objects in real time.",
    features: [
      "Real-time object detection (YOLO / OpenCV)",
      "Alert system via email/SMS",
      "Visual dashboard for camera feed & detection logs"
    ],
    tech: ["Python", "OpenCV", "YOLOv8", "Flask", "React"],
    role: "AI Engineer & Developer",
    result: "High-accuracy real-time detection system.",
    image: "/projects/vision-guard.png"
  },
  {
    id: 4,
    title: "Productivity & Workflow Manager",
    type: "Full-Stack Web App",
    description: "A clean, modern productivity tool for managing tasks, projects, deadlines, and team collaboration. Includes a drag-and-drop interface and visual dashboards.",
    features: [
      "Drag-drop Kanban board",
      "Task scheduling with reminders",
      "Team workspaces & Analytics dashboard"
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    role: "Full-Stack Developer",
    result: "Scalable collaboration platform.",
    image: "/projects/workflow.png"
  }
];

export const certificationsData = [
  {
    name: "Java Programming Masterclass",
    issuer: "Course Institute",
    date: "2024",
    link: "#", 
    image: javaImg 
  },
  {
    name: "Google IT Support Professional",
    issuer: "Google / Coursera",
    date: "2024",
    link: "#",
    image: googleImg 
  },
  {
    name: "The Complete Web Developer",
    issuer: "Udemy",
    date: "2023",
    link: "#",
    image: udemyImg 
  },
  {
    name: "Fundamentals of Digital Marketing",
    issuer: "Google Digital Garage",
    date: "2023",
    link: "#",
    image: courseraImg 
  }
];

export const educationData = [
  {
    school: "Siridhamma College",
    degree: "Primary & Junior Secondary Education",
    duration: "Grade 1 — Grade 11",
    desc: "Developed strong academic fundamentals, discipline, and early leadership skills. Built the foundation of my interest in technology and problem-solving while engaging in school activities and competitions."
  },
  {
    school: "Mahinda College – Galle",
    degree: "Advanced Level (A/L) – Physical Science Stream",
    duration: "Completed",
    desc: "Strengthened my analytical thinking through Mathematics, Physics, and ICT. Gained hands-on experience with scientific problem-solving and logical reasoning, which guided me toward the field of Computer Engineering."
  },
  {
    school: "Sir John Kotelawala Defence University",
    degree: "BSc. Computer Engineering",
    duration: "2025 — 2029 (Ongoing)",
    desc: "Focusing on embedded systems, full-stack development, and hardware. Continuously building practical skills through projects, research, and modern engineering tools to become an industry-ready engineer."
  }
];