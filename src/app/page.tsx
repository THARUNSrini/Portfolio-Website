import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <main className="relative">
            {/* 1. HERO */}
            <Hero />

            {/* 2. ABOUT */}
            <About />

            {/* 3. EDUCATION */}
            <Education />

            {/* 4. EXPERIENCE & PROJECTS */}
            <Experience />
            <Projects />

            {/* 5. PUBLICATIONS */}
            <Publications />

            {/* 6. SKILLS */}
            <Skills />

            {/* 7. CERTIFICATIONS */}
            <Certifications />

            {/* 8. CONTACT */}
            <Contact />
        </main>
    );
}
