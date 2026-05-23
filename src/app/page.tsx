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
import LabBenchDivider from "@/components/ui/LabBenchDivider";

export default function Home() {
    return (
        <main className="relative">
            {/* 1. HERO */}
            <Hero />

            <LabBenchDivider iconType="dna" />

            {/* 2. ABOUT */}
            <About />

            <LabBenchDivider iconType="beaker" />

            {/* 3. EDUCATION */}
            <Education />

            <LabBenchDivider iconType="pipette" />

            {/* 4. EXPERIENCE & PROJECTS */}
            <Experience />

            <LabBenchDivider iconType="flask" />

            <Projects />

            <LabBenchDivider iconType="dna" />

            {/* 5. PUBLICATIONS */}
            <Publications />

            <LabBenchDivider iconType="beaker" />

            {/* 6. SKILLS */}
            <Skills />

            <LabBenchDivider iconType="pipette" />

            {/* 7. CERTIFICATIONS */}
            <Certifications />

            <LabBenchDivider iconType="flask" />

            {/* 8. PERSONAL - Languages, Interests, Hobbies */}
            <Personal />

            <LabBenchDivider iconType="dna" />

            {/* 9. CONTACT */}
            <Contact />
        </main>
    );
}
