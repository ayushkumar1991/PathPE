import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-purple/80 via-blue/60 to-pink/80 backdrop-blur-md border-b shadow-md">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* Enhanced Logo with Moving Glow */}
        <Link href="/" className="flex items-center">
          <span className="text-4xl relative flex items-end font-extrabold tracking-wide px-4 py-1 rounded-lg 
               bg-white/10 backdrop-blur-md border border-white/20 shadow-lg 
               bg-gradient-to-r from-[#ff0080] via-[#ff4500] via-[#ffd700] via-[#00ff40] via-[#00ffff] via-[#4169e1] to-[#ff1493] 
               bg-clip-text text-transparent 
               hover:shadow-xl hover:scale-105 transition-all duration-300
               animate-text-shimmer bg-[length:400%_100%]
               hover:shadow-[0_0_30px_rgba(255,0,128,0.5)]
               overflow-hidden select-none"
          >
            PathPE

            {/* Enhanced glass reflection overlay */}
            <span className="absolute inset-0 rounded-lg bg-gradient-to-t from-white/25 to-transparent opacity-50 pointer-events-none"></span>

            {/* Moving glow effect */}
            <span className="absolute inset-0 rounded-lg pointer-events-none moving-glow-overlay"></span>

            {/* Inner soft glow */}
            <span className="absolute inset-1 rounded-md bg-gradient-to-br from-pink-400/20 via-cyan-400/20 to-purple-400/20 pointer-events-none"></span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 border-green-500 text-white-700 hover:bg-purple-300 hover:shadow-md transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
              <Button
                variant="ghost"
                className="md:hidden w-10 h-10 p-0 text-green-700 hover:bg-green-50 rounded-full"
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white hover:shadow-lg transition-all">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-lg border border-gray-100 rounded-lg">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ai-cover-letter" className="flex items-center gap-2">
                    <PenBox className="h-4 w-4 text-green-600" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50 hover:shadow-md transition-all">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}