import Image from "next/image"
import Link from "next/link"
import { Github, Twitter, Mail, Linkedin, ChevronDown } from "lucide-react"
import WireframeSphere from "@/components/wireframe-sphere"


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-8">
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Jacob West-Roberts"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto lg:mx-0 border-4 border-yellow-400"
                />
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-4">Hi, I&#39;m Jacob West-Roberts</h1>

              <h2 className="text-xl lg:text-2xl text-gray-300 mb-6">
                Computational Biologist & Environmental Scientist
              </h2>

              <p className="text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                I work to understand biological sequences, describe new and rare organisms, and develop tools to further
                biological research.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  href="/about"
                  className="bg-yellow-400 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors"
                >
                  About Me
                </Link>
                <Link
                  href="/contact"
                  className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-md font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  Contact
                </Link>
              </div>

              <div className="flex gap-4 justify-center lg:justify-start mb-8">
                <a href="#" className="text-yellow-400 hover:text-yellow-500 transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="text-yellow-400 hover:text-yellow-500 transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-yellow-400 hover:text-yellow-500 transition-colors">
                  <Mail size={24} />
                </a>
                <a href="#" className="text-yellow-400 hover:text-yellow-500 transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>

              <div className="text-center lg:text-left">
                <ChevronDown className="text-yellow-400 mx-auto lg:mx-0 animate-bounce" size={32} />
              </div>
            </div>
          </div>
        </section>

        {/* CV Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-yellow-400 mb-12 text-center">Curriculum Vitae</h2>

            <div className="space-y-12">
              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2">Education</h3>

                <div className="space-y-8">
                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">2018 - 2023</div>
                    <h4 className="text-xl font-bold mb-2">Ph.D. in Environmental Science, Policy and Management</h4>
                    <p className="text-gray-400">University of California, Berkeley</p>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">2016 - 2017</div>
                    <h4 className="text-xl font-bold mb-2">M.S. in Computational Biology</h4>
                    <p className="text-gray-400">Carnegie Mellon University</p>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">2012 - 2016</div>
                    <h4 className="text-xl font-bold mb-2">B.A. in Molecular, Cellular and Developmental Biology</h4>
                    <p className="text-gray-400">University of Colorado at Boulder</p>
                    <p className="text-gray-400 text-sm">Minors in Math and Chemistry</p>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2">
                  Professional Experience
                </h3>

                <div className="space-y-8">
                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">2024 - Present</div>
                    <h4 className="text-xl font-bold mb-2">Computational Biologist</h4>
                    <p className="text-gray-400 mb-2">Siri Biosciences, San Carlos, CA</p>
                    <ul className="text-gray-400 text-sm list-disc list-inside">
                      <li>
                        Pipeline construction for identifying peptide targets for cancer immunotherapy vaccine
                        development
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">2024</div>
                    <h4 className="text-xl font-bold mb-2">Computational Biologist</h4>
                    <p className="text-gray-400 mb-2">Tata Bio, Remote</p>
                    <ul className="text-gray-400 text-sm list-disc list-inside">
                      <li>Development of genome context-aware similarity search webpage</li>
                      <li>Search tool methods for protein language model assessment</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">2018 - 2023</div>
                    <h4 className="text-xl font-bold mb-2">Ph.D. Candidate</h4>
                    <p className="text-gray-400 mb-2">UC Berkeley - Banfield Lab</p>
                    <ul className="text-gray-400 text-sm list-disc list-inside">
                      <li>Developed methods to detect giant genes in candidate phylum Omnitrophota</li>
                      <li>Metatranscriptomic and metagenomic analysis of montane soil datasets</li>
                      <li>Development of scalable HMM-based metagenome annotation pipeline</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Proficiencies */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2">
                  Technical Proficiencies
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Programming Languages</h4>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                      <li>Python</li>
                      <li>Bash</li>
                      <li>R</li>
                      <li>Julia</li>
                      <li>C++</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Fields of Expertise</h4>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                      <li>Metagenomics</li>
                      <li>Phylogenetics</li>
                      <li>Metatranscriptomics</li>
                      <li>Machine Learning</li>
                      <li>Metaproteomics</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Selected Publications */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2">
                  Selected Publications
                </h3>

                <div className="space-y-4 text-sm text-gray-400">
                  <p>
                    West-Roberts, J.A., et al. (2024). &quot;Diverse Genomic Embedding Benchmarks for functional evaluation
                    across the tree of life.&quot; BioRxiv.
                  </p>

                  <p>
                    West-Roberts, J.A., et al. (2023). &quot;Giant genes are rare but implicated in cell wall degradation by
                    predatory bacteria.&quot; BioRxiv.
                  </p>

                  <p>
                    Al-Shayeb, B., et al. (2021). &quot;Borgs are Giant Extrachromosomal Elements with the Potential to
                    Expand Metabolic Capacity.&quot; Nature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Side - Fixed Wireframe Sphere */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 items-center justify-center bg-black sticky top-0 h-screen">
        <WireframeSphere />
      </div>
    </div>
  )
}
