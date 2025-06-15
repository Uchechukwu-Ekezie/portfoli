import Image from "next/image"

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
              src="/placeholder.svg?height=400&width=400"
              alt="Jacob West-Roberts"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-yellow-400">My Journey</h2>
            <p className="text-gray-300 leading-relaxed">
              I am a computational biologist and environmental scientist with a passion for understanding the complex
              relationships between organisms and their environments. My work focuses on developing innovative
              computational tools and methods to analyze biological data at scale.
            </p>

            <p className="text-gray-300 leading-relaxed">
              With a Ph.D. in Environmental Science, Policy and Management from UC Berkeley, I specialize in
              metagenomics, phylogenetics, and the development of scalable bioinformatics pipelines. My research has
              contributed to our understanding of microbial communities and their roles in various ecosystems.
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
              Currently, I work as a Computational Biologist at Siri Biosciences, where I develop pipelines for
              identifying peptide targets for cancer immunotherapy vaccine development. I am passionate about
              translating computational research into practical applications that can benefit human health and
              environmental conservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
