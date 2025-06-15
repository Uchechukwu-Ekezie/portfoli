import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Metagenome Annotation Pipeline",
      description: "Scalable HMM-based pipeline for annotating metagenomic datasets with improved accuracy and speed.",
      technologies: ["Python", "HMM", "Bioinformatics", "Docker"],
      github: "#",
      demo: "#",
      status: "Active",
    },
    {
      title: "Giant Gene Detection Tool",
      description: "Novel method for detecting unusually large genes in candidate phylum Omnitrophota genomes.",
      technologies: ["Python", "Phylogenetics", "Machine Learning"],
      github: "#",
      demo: "#",
      status: "Published",
    },
    {
      title: "Genome Context Search",
      description: "Web-based tool for context-aware similarity searches across genomic databases.",
      technologies: ["React", "Python", "PostgreSQL", "Docker"],
      github: "#",
      demo: "#",
      status: "Active",
    },
    {
      title: "Protein Language Model Assessment",
      description: "Benchmarking framework for evaluating protein language models across diverse biological contexts.",
      technologies: ["Python", "PyTorch", "Transformers", "Bioinformatics"],
      github: "#",
      demo: "#",
      status: "In Development",
    },
    {
      title: "Montane Soil Microbiome Analysis",
      description:
        "Comprehensive analysis of microbial communities in montane soil ecosystems using multi-omics approaches.",
      technologies: ["R", "Python", "Metagenomics", "Statistics"],
      github: "#",
      demo: "#",
      status: "Published",
    },
    {
      title: "Cancer Immunotherapy Pipeline",
      description:
        "Automated pipeline for identifying and validating peptide targets for personalized cancer vaccines.",
      technologies: ["Python", "Immunoinformatics", "Machine Learning"],
      github: "#",
      demo: "#",
      status: "Proprietary",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Projects</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A collection of computational biology tools, research projects, and software solutions I've developed
            throughout my career.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-yellow-400">{project.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    project.status === "Active"
                      ? "bg-green-900 text-green-300"
                      : project.status === "Published"
                        ? "bg-blue-900 text-blue-300"
                        : project.status === "In Development"
                          ? "bg-orange-900 text-orange-300"
                          : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.status !== "Proprietary" && (
                  <a href={project.github} className="text-yellow-400 hover:text-yellow-500 transition-colors">
                    <Github size={20} />
                  </a>
                )}
                <a href={project.demo} className="text-yellow-400 hover:text-yellow-500 transition-colors">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
