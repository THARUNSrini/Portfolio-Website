export const portfolioData = {
    name: "Tharun Srinivasan Sudha",
    title: "MSc Pharmaceutical & Industrial Biotechnology | ML × Biotech Researcher | CRISPR & Protein AI",
    tagline: "Turning mutations into predictions, genes into therapies, and data into discoveries.",
    contact: {
        phone: "+91 9566036062",
        email: "tharunsrinivasan06@gmail.com",
        linkedin: "https://www.linkedin.com/in/tharun-s-s",
        location: "Halle (Saale), Germany"
    },
    heroSummary: "Dedicated and research-driven Master's student in Pharmaceutical and Industrial Biotechnology at Martin Luther University Halle-Wittenberg, with strong wet-lab + computational skills in molecular biology, cancer biology, RNA biology, and AI-driven protein engineering. Authored multiple peer-reviewed papers and book chapters on CRISPR therapeutics and AI in life sciences. Passionate about translational research and building innovative biomedical solutions.",
    education: [
        {
            degree: "MSc Pharmaceutical and Industrial Biotechnology",
            school: "Martin Luther University Halle-Wittenberg, Germany",
            year: "2024 – Present",
            highlight: "Current minor project: ML pipelines for mutation-induced protein function optimization at Leibniz Institute for Plant Biochemistry"
        },
        {
            degree: "B.Tech Biotechnology",
            school: "SRM Institute of Science and Technology, Chennai, India",
            year: "2020 – 2024",
            highlight: ""
        }
    ],
    experience: [
        {
            title: "Master's Minor Project",
            organization: "Computational Bioorganic Chemistry, Leibniz Institute for Plant Biochemistry, Halle",
            status: "ongoing"
        },
        {
            title: "Molecular Oncology Intern",
            organization: "WIA Cancer Institute, Adyar, Chennai",
            status: "4 months"
        },
        {
            title: "R&D Intern",
            organization: "EID Parry Nutraceuticals",
            status: "15 days"
        }
    ],
    projects: [
        {
            title: "ML Pipelines for Mutation-Induced Protein Function Optimization",
            desc: "Master's minor project – building ESM-3 + PyTorch pipelines to predict functional impact of mutations (current, Leibniz Institute)",
            tech: "Python, PyTorch, AlphaFold, ESM-3, BNN",
            links: []
        },
        {
            title: "AI in Healthcare Web Apps",
            desc: "Two live projects built with CSE/ECE students",
            tech: "",
            links: ["https://ai-healthcare.dorik.io", "https://tharmaraj132005.github.io/medicaldiagonsis/"]
        },
        {
            title: "Matrix Metalloproteinases in Gestational Diabetes (phthalate exposure)",
            desc: "Bachelor Major Project",
            tech: "",
            links: []
        },
        {
            title: "Endocrine Disruptive Chemicals in Placenta & Insulin Resistance",
            desc: "Bachelor Minor Project",
            tech: "",
            links: []
        },
        {
            title: "Epitope-based Vaccine Design for Morganella morganii",
            desc: "Immunoinformatics project using complete proteome",
            tech: "",
            links: []
        }
    ],
    publications: [
        {
            citation: "Tharun SS, Venkatraman Sairam et al. (2024). Amendment of Antioxidant... AFJBS 6(10):654-665",
            doi: "10.33472/AFJBS.6.10.2024.654-665"
        },
        {
            citation: "Venkatraman Sairam, Tharun SS et al. (2024). Benzylacetophenone Chalcones... AFJBS 6(9):963-978",
            doi: "10.33472/AFJBS.6.9.2024.963-978"
        },
        {
            citation: "Book Chapter (2023) – Regulating ROS in Rheumatoid Arthritis",
            doi: "10.5772/intechopen.113191"
        },
        {
            citation: "Book Chapter (2024) – CRISPR-Cas9 in Type 2 Diabetes",
            doi: "10.5772/intechopen.112924"
        }
    ],
    skills: {
        laboratory: [
            "Cell Culture (HeLa, SiHa, BeWo)",
            "Basic Biochemistry and Molecular Biology Tech",
            "Microbiology Techniques",
            "RNA Isolation",
            "Protein Analysis",
            "Microscopy",
            "Pharmacopeia Basics",
            "Animal Handling",
            "Fermentation Engineering",
            "PCR Techniques",
            "Biological Assays (Alamar, MTT)",
            "Spectrophotometry",
            "Algae Culture"
        ],
        aiExpertise: [
            "Generative AI",
            "Context Engineering",
            "AI Agent Development & Usage",
            "AI Automation",
            "Vibe Coding",
            "Prompt Engineering",
            "Machine Learning"
        ],
        computational: [
            "Python",
            "C/C++",
            "SQL",
            "R Programming",
            "MATLAB",
            "Data Visualization",
            "Statistical Analysis (SPSS/PSPP, JASP, Jamovi, SOFA Stat)",
            "Bioinformatics Database Management & Analysis",
            "CRISPR gRNA Design (CHOPCHOP, CRISPOR)",
            "Primer Design (Primer3, NCBI Primer-BLAST)",
            "Molecular Docking (AutoDock Vina, CB Dock, PyMOL)",
            "Protein Structure Prediction (SWISS-MODEL, AlphaFold)",
            "Microsoft Office (Excel, Word, PowerPoint)",
            "Software (Vectorbee, Latex, Gel analyser, ImageJ)"
        ]
    },
    quote: {
        text: "Chance favours only the prepared mind.",
        author: "Emmanuelle Charpentier",
        context: "Nobel Prize in Chemistry 2020 (her favourite Louis Pasteur quote)"
    },
    certifications: [
        "IIT Kanpur – Functional Genomics & Human Molecular Genetics",
        "IISc Bangalore – Pharmacovigilance",
        "Peking University – Bioinformatics (14 weeks)",
        "Johns Hopkins – Computing for Cancer Informatics",
        "UCSD Drug Discovery/Development/Commercialization",
        "CRISPR Cas9 Tech (Udemy)"
    ],
    languages: "Tamil (Native) • Telugu (Native) • English (Fluent) • Hindi • German (A2)",
    interests: "CRISPR-Cas9 • Synthetic Biology • Protein AI • Gene Therapy • Bioinformatics • Machine Learning in Biotech",
    hobbies: "FIDE-rated Chess Player • Reading Science & Tech Books • Learning Languages"
};

export type PortfolioData = typeof portfolioData;
