import { Button } from './ui/button';
import { Card } from './ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';

const stats = [
  { number: "10,000+", label: "Ocean Floats Monitored", icon: Globe },
  { number: "500M+", label: "Data Points Analyzed", icon: Target },
  { number: "150+", label: "Countries Served", icon: Award },
  { number: "1,000+", label: "Research Teams", icon: Users }
];

const timeline = [
  {
    year: "2025",
    title: "Climate Research",
    description: "Partnered with leading climate research institutions for advanced ocean-climate modeling."
  },
  {
    year: "2025",
    title: "Smart India Hackathon",
    description: "FloatChat was founded with a vision to democratize ocean data access through AI technology."
  },
  {
    year: "2025",
    title: "Next Generation Platform during SIH-2025",
    description: "Launched our most advanced platform with real-time AI insights and predictive analytics."
  },
  {
     year: "2025",
     title: "First AI Model",
     description: "Launched our first machine learning model for ocean data pattern recognition and analysis."
   },
   {
    year: "2025",
    title: "Conversational AI",
    description: "Introduced natural language processing capabilities for intuitive data queries."
  },
  {
    year: "2026",
    title: "Global Expansion",
    description: "Expanded our float network to cover all major ocean basins with real-time data streaming."
  },
  
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl mb-6">About FloatChat</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We're on a mission to unlock the secrets of our oceans through cutting-edge AI technology, 
              making critical ocean data accessible to researchers, scientists, and ocean enthusiasts worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-6">Our Mission</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                The ocean covers 71% of our planet's surface, yet we know less about it than we do about the surface of Mars. 
                FloatChat bridges this knowledge gap by making ocean data accessible, understandable, and actionable.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Through our advanced AI platform, we transform complex oceanographic data into insights that drive 
                climate research, marine conservation, and sustainable ocean management.
              </p>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
                Learn More
              </Button>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-8">
              <h3 className="text-2xl mb-6">Why Ocean Data Matters</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Climate regulation and weather pattern prediction</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Marine ecosystem health monitoring</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sustainable fisheries management</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ocean acidification tracking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sea level rise monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-center mb-12">Impact by Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 p-6 text-center">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-lg w-fit mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl text-cyan-400 mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full p-3 flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-cyan-400 text-xl">{item.year}</span>
                      <h3 className="text-xl text-white">{item.title}</h3>
                    </div>
                    <p className="text-slate-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/* <div className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl mb-6">Join Our Mission</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our vision of making ocean data accessible and actionable. 
            Together, we can build a better understanding of our planet's most vital resource.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
              View Open Positions
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3">
              Contact Us
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}