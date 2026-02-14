import { Target, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Our Club
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              The Tech Innovation Club is a vibrant community of passionate students dedicated to exploring
              the frontiers of technology. We bring together creative minds who are eager to learn, build,
              and innovate together.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Through workshops, hackathons, and collaborative projects, we provide a platform for students
              to develop their technical skills, network with industry professionals, and turn their ideas
              into reality.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-700">
                    To foster innovation and technical excellence by providing students with opportunities
                    to learn, collaborate, and create impactful technological solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-700">
                    To become the leading student technology community, inspiring the next generation of
                    innovators and problem-solvers who will shape the future of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
