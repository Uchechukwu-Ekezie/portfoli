import { BookOpen, Calendar, Clock, Users } from "lucide-react"

export default function ESPM112L() {
  const courseInfo = {
    title: "ESPM 112L: Biogeochemistry Laboratory",
    semester: "Fall 2024",
    credits: "2 Units",
    schedule: "Tuesdays & Thursdays, 2:00 PM - 5:00 PM",
    location: "Hilgard Hall, Room 101",
  }

  const labSessions = [
    {
      week: 1,
      title: "Introduction to Biogeochemical Cycles",
      topics: ["Carbon cycle overview", "Nitrogen fixation", "Laboratory safety"],
      date: "Aug 29",
    },
    {
      week: 2,
      title: "Soil Sampling and Analysis",
      topics: ["Field sampling techniques", "pH measurement", "Organic matter content"],
      date: "Sep 5",
    },
    {
      week: 3,
      title: "Water Chemistry Analysis",
      topics: ["Dissolved nutrients", "Ion chromatography", "Spectrophotometry"],
      date: "Sep 12",
    },
    {
      week: 4,
      title: "Microbial Activity Measurements",
      topics: ["Respiration rates", "Enzyme assays", "Microbial biomass"],
      date: "Sep 19",
    },
    {
      week: 5,
      title: "Plant-Soil Interactions",
      topics: ["Root exudates", "Mycorrhizal associations", "Nutrient uptake"],
      date: "Sep 26",
    },
    {
      week: 6,
      title: "Greenhouse Gas Measurements",
      topics: ["CO₂ flux", "N₂O emissions", "CH₄ production"],
      date: "Oct 3",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{courseInfo.title}</h1>
          <p className="text-gray-300 text-lg">Hands-on laboratory experience in environmental biogeochemistry</p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </div>

        {/* Course Information */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Course Information</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="text-yellow-400" size={24} />
              <div>
                <p className="font-semibold">Semester</p>
                <p className="text-gray-300">{courseInfo.semester}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="text-yellow-400" size={24} />
              <div>
                <p className="font-semibold">Credits</p>
                <p className="text-gray-300">{courseInfo.credits}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-yellow-400" size={24} />
              <div>
                <p className="font-semibold">Schedule</p>
                <p className="text-gray-300 text-sm">{courseInfo.schedule}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="text-yellow-400" size={24} />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-300 text-sm">{courseInfo.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Course Description</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              ESPM 112L provides hands-on laboratory experience in environmental biogeochemistry, focusing on the
              chemical, physical, and biological processes that control the cycling of elements in terrestrial and
              aquatic ecosystems.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Students will learn modern analytical techniques used in biogeochemical research, including
              spectrophotometry, chromatography, and gas flux measurements. The course emphasizes both theoretical
              understanding and practical application of biogeochemical principles.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Laboratory exercises are designed to complement the lecture material in ESPM 112 and provide students with
              valuable research experience in environmental science.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Learning Objectives</h2>
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Master fundamental analytical techniques in biogeochemistry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Understand biogeochemical cycling of carbon, nitrogen, and phosphorus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Develop skills in data collection, analysis, and interpretation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Learn to design and conduct biogeochemical experiments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>Practice scientific writing and data presentation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Lab Schedule */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-8">Laboratory Schedule</h2>

          <div className="grid gap-6">
            {labSessions.map((session, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400">
                    Week {session.week}: {session.title}
                  </h3>
                  <span className="text-gray-400 text-sm mt-2 md:mt-0">{session.date}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {session.topics.map((topic, topicIndex) => (
                    <span key={topicIndex} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mt-12 bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Course Resources</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Required Materials</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Laboratory notebook</li>
                <li>• Safety goggles and lab coat</li>
                <li>• Calculator (scientific)</li>
                <li>• Access to course bCourses site</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Recommended Reading</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Schlesinger & Bernhardt: Biogeochemistry (4th ed.)</li>
                <li>• Libes: Introduction to Marine Biogeochemistry</li>
                <li>• Selected journal articles (provided)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
