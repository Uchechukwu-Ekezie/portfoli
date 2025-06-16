import Image from "next/image"
import show from "../../../public/osho.avif"

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">About Me</h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Image
              src={show}
              alt="Jacob West-Roberts"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-yellow-400">My Journey</h2>
            <p className="text-gray-300 leading-relaxed">
              I am a 3rd-year PhD candidate at UC Davis in the Population Biology Department, under the supervision of Dr. Brenna Henn. My research goals are two-fold:
            </p>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>Identifying sociodemographic, genetic, and transcriptomic correlates of active tuberculosis progression</li>
              <li>Optimizing statistical methods to analyze genetic data from diverse human populations</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              My work primarily focuses on the South African Coloured (SAC) communities, known for their exceptionally diverse human ancestry and residence in TB-endemic regions. Through this work, I aim to deepen our understanding of how genetic and social factors influence disease outcomes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              After graduation, I aspire to transition into the industry, where I can apply the computational and analytical skills honed during my PhD to advance global health solutions.
            </p>

            <h3 className="text-xl font-bold text-yellow-400 mt-8">Research Interests</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Computational biology and bioinformatics</li>
              <li>• Metagenomics and metatranscriptomics</li>
              <li>• Microbial ecology and evolution</li>
              <li>• Machine learning applications in biology</li>
              <li>• Environmental genomics</li>
            </ul>

            <h3 className="text-xl font-bold text-yellow-400 mt-8">Current Focus</h3>
            <p className="text-gray-300 leading-relaxed">
              I currently work as a Computational Biologist at Siri Biosciences, developing pipelines to identify peptide targets for cancer immunotherapy vaccine development. I am passionate about translating cutting-edge computational research into practical solutions that improve human health and promote environmental sustainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
