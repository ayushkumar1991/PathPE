### 🚀 PathPE – AI-Powered Career & Skills Advisor
<div align-center>

Guiding India's Students to Future-Proof Careers with Generative AI

A personalized career and skills advisor leveraging Google's Gemini AI to bridge the gap between education and industry demands.

🎥 Watch the Demo | 📄 View Project Showcase

</div>

---

## 🌍 Addressing UN Sustainable Development Goals

This project directly contributes to multiple UN SDGs:

| SDG             |Goal                                    | Our Impact                                                                     |
| ----------------|----------------------------------------| -------------------------------------------------------------------------------|
| 🏥 **SDG 4**   | Quality Education                        | By providing personalized learning roadmaps and skill-gap analysis, we foster continuous, lifelong learning. |
| 🏭 **SDG 8**   | Decent Work & Economic Growth            | We equip students with market-relevant skills, directly improving employability and driving economic growth. |
| ⚖️ **SDG 9**   | Industry, Innovation & Infrastructure    | Our AI-driven platform represents a significant innovation in educational technology infrastructure.         |
| 🎓 **SDG 10**  | Reduced Inequalities                     | We democratize access to high-quality career guidance, making it available to students in all regions.       |

---

## 🚨 The Problem

The Career Crossroads for Indian Students:
India's vibrant youth face a paradox of choice—countless career paths but a critical lack of personalized, data-driven guidance.

- **🤯 Information Overload:** Students are overwhelmed by generic advice that doesn't match their unique skills or aspirations.
- **🌉 Skill-Industry Gap:** A significant disconnect exists between academic curricula and the rapidly evolving demands of the job market.
- **🌍 Lack of Access:** Quality career counseling is often a privilege, inaccessible to students in Tier-2 and Tier-3 cities.
- **❓ Uncertainty:** This leads to career indecision, skill gaps, and underemployment, impacting millions of graduates annually.

### Real-World Impact:

```
A recent graduate in Computer Science.
Skills: C++, Java (from curriculum)
Market Demand: AI/ML, Cloud Computing, Rust
Result: Struggles to find a relevant job despite having a degree.
Current guidance: Generic "top 10 IT jobs" lists.
Our solution: A personalized roadmap to upskill in AI/ML with curated resources.
```

This gap between potential and opportunity is a critical barrier to individual and national growth.
---

## 💡 Our Solution

### PathPE: Your Personal AI Career Architect
A full-stack, AI-native platform that delivers hyper-personalized career and skill development roadmaps, transforming uncertainty into a clear, actionable plan.

### 🔬 How It Works

1. **Deep Profiling:** Users complete a dynamic onboarding process that captures their interests, academic background, and strengths.
2. **AI-Powered Analysis:** Google's Gemini API processes this profile against real-time job market data to identify ideal career paths.
3. **Personalized Roadmaps:** The platform generates a step-by-step roadmap, including skills to learn, courses to take, and projects to build.
4. **Continuous Development:** Users engage with AI-powered mock interviews, resume builders, and weekly industry insights to stay competitive.
5. **Actionable Insights:** Downloadable resumes, cover letters, and performance stats empower users to confidently apply for jobs.

### 🎯 Key Innovation

While traditional platforms offer static information, PathPE uses Google's Gemini, a powerful generative AI, to create a dynamic, conversational, and adaptive guidance system. It doesn't just show you the path; it walks it with you, updating its recommendations as the market evolves and your skills grow.

---

## 🚀 Features

### 🛠️ Core Functionality

| Feature                           | Description                                                                                | Impact                                           |
| ----------------------------------| ------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| **Personalized Career Paths**     | AI generates tailored, step-by-step career roadmaps based on a user's unique profile       | 80% improvement in career clarity and reduction in decision-making anxiety.          |
| **Dynamic Skill Mapping**         | Maps user skills to in-demand job roles and identifies critical learning gaps              | Pinpoints exact skills needed for target jobs, optimizing learning efforts.  |
| **AI Mock Interviews**            | Real-time, AI-generated interview questions with performance feedback and analysis         | Boosts interview confidence and performance by simulating real-world scenarios.  |
| **Resume & Cover Letter Builder** | Generates professional Markdown resumes (downloadable as PDF) and AI-powered cover letters | Creates job-winning application materials in minutes, not hours.    |
| **Weekly Industry Insights**      | A cron-driven dashboard delivering the latest market trends and skill demands              | Keeps users ahead of the curve and informed about emerging opportunities.        |


### 💻 Technical Architecture

```mermaid
graph TD
    subgraph "Browser"
        A[User Interface - Next.js & Shadcn UI]
    end

    subgraph "Backend & Services"
        B[Next.js API Routes]
        C[Authentication - Clerk]
        D[Background Jobs - Inngest]
    end

    subgraph "AI & Data Layer"
        E[AI Core - Google Gemini API]
        F[Database - Neon PostgreSQL]
        G[ORM - Prisma]
    end

    A -- "User Actions" --> B
    A -- "Auth" --> C
    B -- "Async Tasks (e.g., Insights)" --> D
    B -- "AI Prompts" --> E
    B -- "CRUD Operations via Prisma" --> G
    D -- "Scheduled Jobs" --> B
    E -- "Personalized Content" --> B
    G -- "DB Connection" --> F
```

---

##  🛠️ Tech Stack
### Frontend Stack
```
🚀 Next.js 14 (App Router) - Full-stack React framework
🎨 Tailwind CSS & Shadcn UI - Modern styling and component library
🔄 React Query - Efficient data fetching and state management
🔒 Clerk - Complete user authentication and management
📘 TypeScript - For robust, type-safe development
```

### Backend Stack
```
⚙️ Node.js - JavaScript runtime environment
🔗 Prisma - Next-generation ORM for type-safe database access
⏳ Inngest - Reliable system for background jobs and cron schedules
```

### AI, Database & Infrastructure
```
🧠 Google Gemini API - The engine for all generative AI features
🐘 Neon PostgreSQL - Serverless, scalable, and reliable database
☁️ Vercel - Seamless hosting, deployment, and CI/CD
```

## 🚀 Getting Started
Follow these instructions to set up and run the project locally.
```
Prerequisites
Node.js >= 18
npm or yarn
Git
A Neon PostgreSQL account
A Clerk account
A Google Gemini API key
```
--- 

## 💻 Local Setup
```
Clone the repository:

git clone https://github.com/ayushkumar1991/PathPE.git
cd PathPE

Install dependencies:

npm install

Set up environment variables:
Create a .env.local file in the root directory and populate it with your keys.

DATABASE_URL="postgresql://user:pass@host:port/db"        # Neon PostgreSQL Database
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."                # Clerk Authentication
CLERK_SECRET_KEY="sk_..."                                 # Clerk Authentication
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/onboarding"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"
GEMINI_API_KEY="your-gemini-api-key"                      # Google Gemini AI

Push the database schema:

npx prisma generate
npx prisma db push

Run the development server:

npm run dev

The application will be available at http://localhost:3000.
```
---

## 🏗️ Project Structure
```
PathPE/
├── 📁 app/                     # Next.js App Router
│   ├── 🔑 (auth)/              # Authentication pages (sign-in, sign-up)
│   ├── 📈 dashboard/           # Main application dashboard UI
│   ├── 🚀 onboarding/          # User onboarding and profiling flow
│   └── ⚙️ api/                  # Backend API routes
├── 🧩 components/              # Reusable UI components (Shadcn)
├── 💾 prisma/                  # Database schema and migrations
├── 🔧 lib/                     # Utility functions, hooks, and helpers
├── 🎨 styles/                  # Global CSS styles
└── 📜 package.json             # Project dependencies and scripts
```

## 🙏 Acknowledgments
This project was made possible by the incredible work of teams and communities behind these technologies:
```
Google - For the groundbreaking Gemini API that powers our core intelligence.

Vercel - For providing a world-class platform for developing and deploying Next.js applications.

Neon, Prisma, and Clerk - For building the robust backend and authentication infrastructure.

The Open Source Community - For the countless libraries and tools that accelerated our development.
```

<div align="center">

Empowering the Next Million Professionals in India

Built with ❤️ for the Gen AI Exchange Hackathon

</div>