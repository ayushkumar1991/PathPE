import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

           <footer className="relative mt-12 overflow-hidden">
  {/* Enhanced Gradient Background with Animation */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 backdrop-blur-2xl">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
  </div>
  
  {/* Subtle Pattern Overlay */}
  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
  
  {/* Border with Gradient */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>

  <div className="relative container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-gray-300">
    {/* Left Side - Enhanced Logo + Text */}
    <div className="flex flex-col items-center md:items-start space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
          PathPE
        </h2>
      </div>
      <p className="text-sm text-gray-400 text-center md:text-left max-w-xs">
        Empowering careers through AI-driven insights and personalized guidance 🚀
      </p>
      
      {/* Quick Stats or Features */}
      <div className="flex gap-4 text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          AI Powered
        </span>
        <span>•</span>
        <span>24/7 Available</span>
        <span>•</span>
        <span>Personalized</span>
      </div>
    </div>

    {/* Middle - Enhanced Navigation */}
    <div className="flex flex-col items-center gap-4">
      <nav className="flex flex-wrap justify-center gap-6 text-sm">
        <a href="/about" className="hover:text-pink-400 transition-all duration-300 hover:scale-105 relative group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/features" className="hover:text-cyan-400 transition-all duration-300 hover:scale-105 relative group">
          Features
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/pricing" className="hover:text-purple-400 transition-all duration-300 hover:scale-105 relative group">
          Pricing
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/privacy" className="hover:text-pink-400 transition-all duration-300 hover:scale-105 relative group">
          Privacy
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/contact" className="hover:text-cyan-400 transition-all duration-300 hover:scale-105 relative group">
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
        </a>
      </nav>
      
      {/* Newsletter Signup */}
      <div className="flex items-center gap-2 mt-2">
        <input 
          type="email" 
          placeholder="Stay updated..." 
          className="px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-full focus:border-pink-400/50 focus:outline-none transition-colors backdrop-blur-sm"
        />
        <button className="px-3 py-1 text-xs bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-400 hover:to-purple-400 transition-all duration-300 hover:scale-105">
          Subscribe
        </button>
      </div>
    </div>

    {/* Right - Enhanced Social Icons */}
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3">
        <a href="https://github.com/ayushkumar1991" target="_blank" rel="noopener noreferrer" 
           className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-gray-400 hover:to-gray-600 transition-all duration-300 hover:scale-110 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current group-hover:text-white" viewBox="0 0 24 24">
            <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.5-4-1.5-.6-1.5-1.4-1.9-1.4-1.9-1.2-.9.1-.9.1-.9 1.3.1 2 .9 2 .9 1.2 2 3.1 1.4 3.8 1 .1-.9.5-1.4.8-1.8-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3 0-.3-.5-1.4.1-3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.1 2.7.1 3 .8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.5.4.9 1.2.9 2.4v3.5c0 .4.2.7.8.6A12 12 0 0 0 12 .5z"/>
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
           className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-600 transition-all duration-300 hover:scale-110 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current group-hover:text-white" viewBox="0 0 24 24">
            <path d="M24 4.6c-.9.4-1.8.6-2.8.8a4.9 4.9 0 0 0 2.1-2.7c-1 .6-2 .9-3.1 1.1A4.8 4.8 0 0 0 16.6 3c-2.7 0-4.8 2.2-4.8 4.9 0 .4 0 .8.1 1.1-4-.2-7.6-2.1-10-5a4.8 4.8 0 0 0-.7 2.5c0 1.7.9 3.3 2.2 4.2a4.8 4.8 0 0 1-2.2-.6v.1c0 2.4 1.7 4.4 4 4.9a4.8 4.8 0 0 1-2.2.1 4.9 4.9 0 0 0 4.5 3.4A9.6 9.6 0 0 1 0 19.5 13.6 13.6 0 0 0 7.4 21c8.9 0 13.7-7.5 13.7-13.9v-.6c1-.7 1.8-1.6 2.4-2.6z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/ayush-kumar-607444242/" target="_blank" rel="noopener noreferrer" 
           className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-110 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current group-hover:text-white" viewBox="0 0 24 24">
            <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.8 3.5-1.8 3.7 0 4.4 2.4 4.4 5.6v6zm-15.6-12c-1.2 0-2.1-.9-2.1-2.1s.9-2.1 2.1-2.1 2.1.9 2.1 2.1-.9 2.1-2.1 2.1zM6.6 20.4H3V9h3.6v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>

  {/* Enhanced Bottom Section */}
  <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
    <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
      <div className="flex items-center gap-4">
        <span>© 2025 PathPE. All rights reserved.</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">Version 2.0</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span>Made with</span>
        <span className="text-red-400 animate-pulse">💗</span>
        <span>by</span>
        <span className="text-pink-400 font-medium hover:text-pink-300 transition-colors">Ayush Kumar</span>
        <span className="ml-2 px-2 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full text-green-400 text-xs flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          Online
        </span>
      </div>
    </div>
  </div>
</footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
