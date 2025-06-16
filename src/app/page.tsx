import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Mail, Linkedin, ChevronDown, Download } from "lucide-react";
import WireframeSphere from "@/components/wireframe-sphere";
import osho from "../../public/osho.avif";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-4xl mx-auto lg:mx-0 lg:ml-8">
            <div className="text-center lg:text-left md:pl-12">
              <div className="mb-8">
                <Image
                  src={osho}
                  alt="Jacob West-Roberts"
                  width={350}
                  height={350}
                  className="rounded-full mx-auto lg:mx-0 border-4 border-yellow-400"
                />
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-4">
                Hi, I&#39;m Oshiomah P. Oyageshio
              </h1>

              <h2 className="text-xl lg:text-2xl text-gray-300 mb-6">
                Interdisciplinary Scientist
              </h2>

              <p className="text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                I am a 3rd Year PhD Candidate at UCDavis in the Population
                Biology Department supervised by Dr. Brenna Henn.
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
                <a
                  href="https://github.com/oshiomah1"
                  className="text-yellow-400 hover:text-white transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="#"
                  className="text-yellow-400 hover:text-white transition-colors"                >
                  <Twitter size={24} />
                </a>
                <a
                  href="oyageshio@ucdavis.edu"
                  className="text-yellow-400 hover:text-white transition-colors"                >
                  <Mail size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/oshiomah/"
                  className="text-yellow-400 hover:text-white transition-colors"                >
                  <Linkedin size={24} />
                </a>
              </div>

              <div className="text-center lg:text-left">
                <ChevronDown
                  className="text-yellow-400 mx-auto lg:mx-0 animate-bounce"
                  size={32}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CV Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4 sm:mb-0">
                Curriculum Vitae
              </h2>
              
              <a
                href="/cv.pdf" // Place your CV PDF in the public folder as cv.pdf
                download="Oshiomah_Oyageshio_CV.pdf"
                className="group bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold 
                         hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105
                         flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
              >
                <Download size={18} className="group-hover:animate-bounce" />
                <span>Download CV</span>
              </a>
            </div>

            <div className="space-y-12">
              {/* Education */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2">
                  Education
                </h3>

                <div className="space-y-8">
                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">
                      2020 - 2026
                    </div>
                    <h4 className="text-xl font-bold mb-2">
                      Ph.D. in Population Biology
                    </h4>
                    <p className="text-gray-400">
                      University of California Davis, CA
                    </p>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">
                      2018 - 2020
                    </div>
                    <h4 className="text-xl font-bold mb-2">
                      M.Sc. in Ecology & Evolutionary Biology
                    </h4>
                    <p className="text-gray-400">
                      University of California Los Angeles, CA
                    </p>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">
                      2014 - 2018
                    </div>
                    <h4 className="text-xl font-bold mb-2">
                      B.Sc. in Biochemistry & Molecular Biology
                    </h4>
                    <p className="text-gray-400">
                      University of Massachusetts Amherst, MA
                    </p>
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
                    <div className="text-yellow-400 font-semibold mb-1">
                      Jun 2024 – Aug 2024
                    </div>
                    <h4 className="text-xl font-bold mb-2">
                      Genomics Data Scientist (PhD Intern)
                    </h4>
                    <p className="text-gray-400 mb-2">
                      Regeneron Genetics Center, Tarrytown, NY
                    </p>
                    <ul className="text-gray-400 text-sm list-disc list-inside">
                      <li>
                        Analyzed large-scale multiomic datasets using advanced
                        bioinformatics tools and statistical models
                      </li>
                      <li>
                        Performed proteomic deconvolution of UK Biobank data to
                        identify immune cell-type signatures in autoimmune
                        diseases
                      </li>
                      <li>
                        Created custom phenotypes for GWAS meta-analyses by
                        integrating epidemiological and immunological data
                      </li>
                      <li>
                        Conducted GWAS to explore genetic mechanisms in
                        inflammatory conditions
                      </li>
                      <li>
                        Presented results to a multidisciplinary team of
                        researchers and clinicians
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">
                      Sept 2020 – Present
                    </div>
                    <h4 className="text-xl font-bold mb-2">
                      Graduate Research Associate
                    </h4>
                    <p className="text-gray-400 mb-2">
                      University of California Davis
                    </p>
                    <ul className="text-gray-400 text-sm list-disc list-inside">
                      <li>
                        Built tuberculosis case-control assignment algorithms
                        from 50+ clinical variables
                      </li>
                      <li>
                        Applied Random Forest and Logistic Regression to predict
                        TB progression from 1000+ patient samples
                      </li>
                      <li>
                        Annotated pathogenic variants for the CAAPA Consortium
                      </li>
                      <li>
                        Performed single-cell RNA-seq on PBMCs from TB cohort
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">
                      Sept 2023 – Present
                    </div>
                    <h4 className="text-xl font-bold mb-2">
                      Teaching Assistant: Computational Genomics
                    </h4>
                    <p className="text-gray-400 mb-2">
                      University of California Davis
                    </p>
                    <ul className="text-gray-400 text-sm list-disc list-inside">
                      <li>
                        Facilitated advanced genetics course with 25 PhD
                        students
                      </li>
                      <li>
                        Developed instructional materials and hosted weekly
                        coding sessions
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-yellow-400 font-semibold mb-1">
                      Sept 2022 – Apr 2023
                    </div>
                    <h4 className="text-xl font-bold mb-2">Visiting Scholar</h4>
                    <p className="text-gray-400 mb-2">
                      Stellenbosch University, Cape Town, South Africa
                    </p>
                    <ul className="text-gray-400 text-sm list-disc list-inside">
                      <li>
                        Led a 2-month fieldwork expedition collecting blood,
                        saliva, and biometric data
                      </li>
                      <li>
                        Developed data harmonization pipelines for accurate
                        longitudinal tracking
                      </li>
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
                    <h4 className="text-lg font-semibold mb-3">
                      Programming Languages
                    </h4>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                      <li>Python</li>
                      <li>Bash</li>
                      <li>R</li>
                      <li>Markdown</li>
                      <li>C++</li>
                      <li>Linux Shell Scripting</li>
                      <li>UNIX</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">
                      Fields of Expertise
                    </h4>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                      <li>Bioinformatics</li>
                      <li>Computational biology</li>
                      <li>Evolutional Genomics</li>
                      <li>Statistical Genetics</li>
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
                    Oyageshio, O. P., Myrick, J. W., Saayman, J., van der
                    Westhuizen, L., Al-Hindi, D. R., Reynolds, A. W., ... &
                    Henn, B. M. (2024).{" "}
                    <em>
                      Strong effect of demographic changes on Tuberculosis
                      susceptibility in South Africa
                    </em>
                    . PLOS Global Public Health, 4(7), e0002643.
                  </p>
                  <p>
                    Smith, M. H., Myrick, J. W., Oyageshio, O.P., Uren, C.,
                    Saayman, J., Boolay, S., ... & Reynolds, A. W. (2023).{" "}
                    <em>
                      Epidemiological correlates of overweight and obesity in
                      the Northern Cape Province, South Africa
                    </em>
                    . PeerJ, 11, e14723.
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
  );
}