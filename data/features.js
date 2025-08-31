// data/features.js
import { BrainCircuit, Briefcase, LineChart, ScrollText } from "lucide-react";

const IconWrapper = ({ children, gradient }) => (
  <div
    className={`
      w-16 h-16 mb-4 flex items-center justify-center 
      bg-gradient-to-br ${gradient} rounded-2xl shadow-lg relative overflow-hidden
      transition-all duration-500 transform hover:scale-110 hover:shadow-2xl
    `}
  >
    {/* Soft inner glow */}
    <div className="absolute inset-0 bg-white/10 rounded-2xl blur-md opacity-50"></div>
    {children}
  </div>
);

export const features = [
  {
    icon: (
      <IconWrapper gradient="from-pink-500 via-purple-500 to-indigo-500">
        <BrainCircuit className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.5} />
      </IconWrapper>
    ),
    title: "AI-Powered Career Navigation",
    description:
      "Harness next-gen AI to discover your perfect career path — uniquely tailored to your skills, ambitions, and the latest market demands.",
  },
  {
    icon: (
      <IconWrapper gradient="from-emerald-800 via-teal-900 to-cyan-800">
        <Briefcase className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.5} />
      </IconWrapper>
    ),
    title: "Smart Interview Prep",
    description:
      "Practice in realistic interview simulations, get AI feedback instantly, and walk into interviews with unshakable confidence.",
  },
  {
    icon: (
      <IconWrapper gradient="from-cyan-400 via-sky-400 to-blue-500">
        <LineChart className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.5} />
      </IconWrapper>
    ),
    title: "Live Industry Intelligence",
    description:
      "Stay ahead with real-time hiring trends, salary benchmarks, and industry insights that keep your career competitive.",
  },
  {
    icon: (
      <IconWrapper gradient="from-amber-400 via-orange-400 to-rose-500">
        <ScrollText className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.5} />
      </IconWrapper>
    ),
    title: "AI Resume Architect",
    description:
      "Build polished, ATS-ready resumes in minutes, guided by AI-driven suggestions for each role and industry.",
  },
];
