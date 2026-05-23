export const portfolioData = {
    name: "Tharun Srinivasan Sudha",
    title: "Immunology × AI × Biotech",
    tagline: "Decoding intestinal immunity through single-cell genomics · One cell at a time",
    quote: {
        text: "That we can now predict protein structures confers the greatest benefit to humankind.",
        author: "David Baker",
        context: "Nobel Prize in Chemistry 2024"
    },
    charpentierQuote: {
        text: "CRISPR emerged from curiosity and transformed our ability to rewrite the code of life.",
        author: "Emmanuelle Charpentier",
        context: "Nobel Prize in Chemistry 2020"
    },
    contact: {
        phone: "+91 9566036062",
        email: "tharunsrinivasan06@gmail.com",
        linkedin: "https://www.linkedin.com/in/tharun-s-s",
        location: "Freiburg, Baden-Württemberg, Germany"
    },
    summary: "Computational immunologist bridging wet-lab precision with AI-driven discovery. Currently at University Hospital Freiburg — performing single-cell analysis of γδ T cells in IBD and investigating BTN/BTNL epithelial regulation. 4 peer-reviewed publications across scRNA-seq, organoid culture, and deep learning.",
    highlights: {
        currentFocus: "scRNA-seq + TCR profiling of γδ T cells from Crohn's biopsies at University Hospital Freiburg, with organoid-based BTN/BTNL regulation studies",
        mission: "Using single-cell genomics, organoid models, and AI to decode how γδ T cells protect — or destroy — the gut barrier in IBD"
    },
    education: [
        {
            degree: "MSc Pharmaceutical and Industrial Biotechnology",
            school: "University of Freiburg, Baden-Württemberg, Germany",
            year: "2024 – Present",
            highlight: "Thesis: γδ T cell single-cell analysis (Univ. Hospital Freiburg). Minor: ML pipelines for protein optimization (Leibniz Institute)"
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
            title: "Master's Thesis — γδ T Cell & BTN/BTNL Research",
            organization: "University Hospital Freiburg, Dept. of Medicine II",
            status: "ongoing",
            description: "Comparative single-cell analysis of γδ T cells in intestinal inflammation and BTN/BTNL family regulation.",
            arms: [
                {
                    title: "Arm 1 — γδ T Cell Profiling",
                    subtitle: "Bioinformatics + Wet-Lab",
                    bullets: [
                        "Targeted scRNA-seq + TCR profiling from Crohn's biopsies (inflamed vs. remission)",
                        "Testing stem-like (TCF-1⁺ PD-1⁺) vs. effector (GZMB⁺ T-bet⁺) γδ populations across IBD subtypes",
                        "Reanalyzing public atlases (>1.6M gut cells, Oliver et al., Nature 2024)",
                        "Building integrated γδ reference map for CD vs. UC"
                    ]
                },
                {
                    title: "Arm 2 — Epithelial Regulation",
                    subtitle: "Organoid & Functional Studies",
                    bullets: [
                        "Human colonic 2D/3D organoids from EpCAM+ FACS-sorted biopsies",
                        "Cytokine screens (IFN-γ, TNF-α) for BTN3A1/3A3 upregulation & BTNL3/8 repression",
                        "Readouts: RNA-seq, TEER barrier function, HNF4 agonist rescue",
                        "Building on lab's Science Immunology (2026) findings"
                    ]
                }
            ]
        },
        {
            title: "Master's Minor Project",
            organization: "Computational Bioorganic Chemistry, Leibniz Institute for Plant Biochemistry",
            status: "9 months",
            description: "ESM-3 + AlphaFold protein mutation prediction pipelines using Bayesian neural networks"
        },
        {
            title: "Molecular Oncology Intern",
            organization: "WIA Cancer Institute, Adyar, Chennai",
            status: "4 months",
            description: "Cancer biology research and molecular techniques"
        },
        {
            title: "R&D Intern",
            organization: "EID Parry Nutraceuticals",
            status: "15 days",
            description: "Nutraceutical research and development"
        }
    ],
    projects: [
        {
            title: "Single-Cell Analysis of γδ T Cells in IBD",
            desc: "scRNA-seq + TCR profiling of γδ T cells, atlas reanalysis (>1.6M cells), and organoid BTN/BTNL regulation studies",
            tech: "scRNA-seq, TCR Profiling, FACS, Organoid Culture, RNA-seq",
            links: [],
            featured: true,
            details: [
                "Isolated γδ T cells from inflamed and remission Crohn's disease biopsies via multiplexed FACS.",
                "Performed targeted scRNA-seq and TCR profiling to evaluate stem-like (TCF-1⁺ PD-1⁺) versus effector states across different Inflammatory Bowel Disease subtypes.",
                "Computationally reanalyzed a massive public integrated atlas comprising >1.6 million gut cells to build an overarching reference map.",
                "Engineered 2D and 3D human colonic organoids to test specific cytokine disruptions, reading out barrier function via TEER and RNA-seq."
            ]
        },
        {
            title: "ML Protein Mutation Prediction",
            desc: "ESM-3 + AlphaFold pipelines predicting functional impact of mutations via Bayesian NNs",
            tech: "Python, PyTorch, AlphaFold, ESM-3, BNN",
            links: [],
            featured: true,
            details: [
                "Developed predictive pipelines combining Evolutionary Scale Modeling (ESM-3) with structural insights from AlphaFold.",
                "Engineered a Bayesian Neural Network architecture to predict the functional impact of point mutations with robust uncertainty quantification.",
                "Significantly improved mutation success rate mapping when optimizing proteins for thermal stability."
            ]
        },
        {
            title: "AI in Healthcare Web Apps",
            desc: "Two deployed AI-powered medical diagnosis platforms",
            tech: "Web Development, AI Integration",
            links: ["https://ai-healthcare.dorik.io", "https://tharmaraj132005.github.io/medicaldiagonsis/"],
            featured: false,
            details: [
                "Built and deployed fully functional diagnostic web applications incorporating ML models.",
                "Integrated backend AI APIs with dynamic, responsive frontend designs to assist early-stage medical screening.",
                "Ensured seamless user experience for both healthcare professionals and patients."
            ]
        },
        {
            title: "MMPs in Gestational Diabetes",
            desc: "Phthalate exposure effects on matrix metalloproteinases",
            tech: "Molecular Biology, Cell Culture",
            links: [],
            featured: false,
            details: [
                "Investigated the molecular mechanisms by which environmental phthalate exposure exacerbates gestational diabetes.",
                "Conducted extensive in vitro cell culture assays to track the upregulation of specific matrix metalloproteinases (MMPs).",
                "Identified potential biomarkers for early detection of exposure-related pregnancy complications."
            ]
        },
        {
            title: "Endocrine Disruptors & Insulin Resistance",
            desc: "Placental disruption mechanisms in metabolic disease",
            tech: "Toxicology, Molecular Biology",
            links: [],
            featured: false,
            details: [
                "Analyzed placental tissue disruptions caused by widespread endocrine disrupting chemicals.",
                "Traced biochemical pathways linking toxicological exposure directly to the onset of cellular insulin resistance.",
                "Utilized Western blotting and RT-qPCR to validate expression changes in key metabolic regulators."
            ]
        },
        {
            title: "Epitope Vaccine Design — M. morganii",
            desc: "Immunoinformatics-based vaccine candidate from complete proteome",
            tech: "Bioinformatics, Immunoinformatics",
            links: [],
            featured: false,
            details: [
                "Leveraged subtractive proteomics and immunoinformatics to screen the complete proteome of M. morganii.",
                "Identified highly conserved, highly immunogenic B-cell and T-cell epitopes.",
                "Designed a multi-epitope vaccine construct computationally validated through molecular docking and dynamics simulations."
            ]
        }
    ],
    publications: [
        {
            citation: "Tharun SS, Venkatraman Sairam et al. (2024). Amendment of Antioxidant...",
            journal: "AFJBS 6(10):654-665",
            doi: "10.33472/AFJBS.6.10.2024.654-665",
            type: "Research Article"
        },
        {
            citation: "Venkatraman Sairam, Tharun SS et al. (2024). Benzylacetophenone Chalcones...",
            journal: "AFJBS 6(9):963-978",
            doi: "10.33472/AFJBS.6.9.2024.963-978",
            type: "Research Article"
        },
        {
            citation: "Book Chapter (2023) – Regulating ROS in Rheumatoid Arthritis",
            journal: "IntechOpen",
            doi: "10.5772/intechopen.113191",
            type: "Book Chapter"
        },
        {
            citation: "Book Chapter (2024) – CRISPR-Cas9 in Type 2 Diabetes",
            journal: "IntechOpen",
            doi: "10.5772/intechopen.112924",
            type: "Book Chapter"
        }
    ],
    skills: {
        wet_lab: [
            "Western Blotting", "ELISA (enzyme-linked immunosorbent assay)", "SDS-PAGE",
            "Flow Cytometry (FACS)", "Cell Sorting", "Immunofluorescence (IF)",
            "Immunohistochemistry (IHC)", "Confocal Microscopy", "CRISPR/Cas9",
            "PCR & qRT-PCR", "Gel Electrophoresis", "Colony PCR", "Transfection",
            "Cell Culture (mammalian & bacterial)", "Aseptic Technique",
            "Size Exclusion Chromatography (SEC)", "Affinity Chromatography (IMAC)",
            "Ion Exchange Chromatography", "HPLC", "Protein Purification",
            "Bacterial Expression (E. coli BL21)", "Refolding & Dialysis",
            "Bradford & BCA Protein Assays", "Enzyme Kinetics Assays",
            "Basic Molecular Cloning", "Restriction Digestion & Ligation",
            "Gibson Assembly", "Transformation & Selection",
            "Drug Toxicity Assays (MTT/XTT)", "ELISA Plate Reader Operations",
            "Biosafety Level 2 Practices", "Buffer Preparation & Titration",
            "Micropipette Calibration & Usage", "Cryopreservation"
        ],
        computational: [
            "scRNA-seq Analysis (Seurat, Scanpy)", "TCR/BCR Repertoire Analysis",
            "Trajectory Inference (Monocle, RNA velocity)", "UMAP / t-SNE / PCA",
            "Differential Gene Expression (DESeq2, edgeR, Limma)",
            "Bulk RNA-seq Pipeline (STAR, HISAT2, featureCounts, Salmon)",
            "Genome Assembly & Annotation", "Variant Calling (GATK, bcftools)",
            "GSEA & Pathway Enrichment (clusterProfiler, fgsea)",
            "Single-cell Multiomics (CITE-seq, ATAC-seq integration)",
            "Protein Structure Prediction (AlphaFold2, ESMFold)",
            "Molecular Docking (AutoDock Vina, Glide)",
            "Multiple Sequence Alignment (MUSCLE, CLUSTALW)",
            "Phylogenetic Analysis (IQ-TREE, BEAST)",
            "BLAST", "UniProt", "Ensembl", "PDB annotation",
            "Nextflow / Snakemake Pipelines",
            "Docker & Conda Environments",
            "HPC / SLURM Job Scheduling",
            "Linux / Bash scripting", "Git & GitHub",
            "R (ggplot2, tidyverse, Bioconductor)", "Python (pandas, numpy, scipy, matplotlib, seaborn)"
        ],
        ai: [
            "Supervised Learning (Random Forest, SVM, XGBoost, Gradient Boosting)",
            "Unsupervised Learning (K-means, DBSCAN, Hierarchical Clustering)",
            "Deep Learning (PyTorch, TensorFlow/Keras)",
            "Convolutional Neural Networks (CNN) for image & sequence data",
            "Recurrent Neural Networks (LSTM, GRU) for time-series omics",
            "Transformer Models & Attention Mechanisms (BERT, protein language models)",
            "Graph Neural Networks (GNN) for biological networks",
            "Bayesian Neural Networks (BNN) for uncertainty quantification",
            "Transfer Learning & Fine-tuning (ESM-2, BioBERT)",
            "AutoML (TPOT, AutoSklearn)",
            "Explainability (SHAP, LIME, GradCAM)",
            "Hyperparameter Tuning (Optuna, Ray Tune)",
            "Cross-validation & Model Evaluation (AUC-ROC, Precision-Recall, RMSE, MAE)",
            "Feature Engineering & Selection for high-dimensional omics data",
            "Multi-task Learning for multi-omics integration",
            "Generative Models (VAE, GAN) for data augmentation",
            "Scikit-learn", "Scanpy ML modules",
            "Weights & Biases (experiment tracking)", "MLflow"
        ],
        tools: [
            "Python", "R", "Bash/Shell", "SQL (SQLite, PostgreSQL)",
            "VS Code", "RStudio", "Jupyter Notebooks",
            "Git & GitHub", "Docker", "Conda/Mamba",
            "SLURM / HPC", "AWS (basic)", "Google Colab",
            "LaTeX & BioRender (scientific visualization)",
            "Fiji/ImageJ (image analysis)", "FlowJo (flow cytometry analysis)",
            "GraphPad Prism", "Excel/Google Sheets"
        ]
    },
    certifications: [
        "IIT Kanpur – Functional Genomics & Human Molecular Genetics",
        "IISc Bangalore – Pharmacovigilance",
        "Peking University – Bioinformatics (14 weeks)",
        "Johns Hopkins – Computing for Cancer Informatics",
        "UCSD – Drug Discovery/Development/Commercialization",
        "CRISPR Cas9 Tech (Udemy)"
    ],
    languages: "Tamil (Native) • Telugu (Native) • English (Fluent) • Hindi • German (A2)",
    interests: "Single-Cell Genomics • γδ T Cell Immunology • Intestinal Organoids • CRISPR-Cas9 • Protein AI • Machine Learning",
    hobbies: "FIDE-rated Chess Player • Reading Science & Tech • Learning Languages"
};

export type PortfolioData = typeof portfolioData;
