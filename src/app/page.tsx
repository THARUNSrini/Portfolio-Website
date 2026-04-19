import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Personal from "@/components/Personal";
import Contact from "@/components/Contact";
import CinematicTransition from "@/components/ui/CinematicTransition";

export default function Home() {
    return (
        <main className="relative">
            {/* 1. HERO */}
            <Hero />

            <CinematicTransition variant="dna-strand" />

            {/* 2. ABOUT */}
            <About />

            <CinematicTransition variant="molecular-wipe" />

            {/* 3. EDUCATION */}
            <Education />

            <CinematicTransition variant="cell-division" />

            {/* 4. EXPERIENCE & PROJECTS */}
            <Experience />

            <CinematicTransition variant="particle-burst" />

            <Projects />

            <CinematicTransition variant="dna-strand" />

            {/* 5. PUBLICATIONS */}
            <Publications />

            <CinematicTransition variant="molecular-wipe" />

            {/* 6. SKILLS */}
            <Skills />

            <CinematicTransition variant="cell-division" />

            {/* 7. CERTIFICATIONS */}
            <Certifications />

            <CinematicTransition variant="particle-burst" />

            {/* 8. PERSONAL - Languages, Interests, Hobbies */}
            <Personal />

            <CinematicTransition variant="dna-strand" />

            {/* 9. CONTACT */}
            <Contact />
        </main>
    );
}
