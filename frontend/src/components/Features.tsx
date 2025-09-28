import { Button } from './ui/button';
import { Card } from './ui/card';
import { Brain, Map, BarChart3, MessageSquare, Globe, Shield, Zap, Database } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze ocean data patterns in real-time, providing intelligent insights and predictions."
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description: "Explore ocean data through our intuitive, interactive maps showing float positions, currents, and environmental conditions."
  },
  {
    icon: BarChart3,
    title: "Real-time Visualization",
    description: "Dynamic charts and graphs that update in real-time, displaying temperature, depth, salinity, and other critical ocean metrics."
  },
  {
    icon: MessageSquare,
    title: "Conversational Interface",
    description: "Ask questions about ocean data in natural language and get instant, detailed responses from our AI assistant."
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Access data from thousands of ocean floats deployed across the world's oceans, providing comprehensive global coverage."
  },
  {
    icon: Database,
    title: "Historical Data Access",
    description: "Dive deep into historical ocean data spanning decades, enabling trend analysis and long-term climate research."
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Lightning-fast data processing capabilities that can handle massive datasets and complex queries in seconds."
  },
  {
    icon: Shield,
    title: "Reliable Infrastructure",
    description: "Built on robust, scalable infrastructure ensuring 99.9% uptime and secure access to critical ocean data."
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl mb-6">Powerful Features for Ocean Data Analysis</h1>
            <p className="text-xl text-slate-300 mb-8">
              Discover how FloatChat revolutionizes ocean data exploration with cutting-edge AI technology and intuitive visualization tools.
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 p-6 hover:bg-slate-800/70 transition-colors">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl mb-4">Ready to Explore Ocean Data?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers, scientists, and ocean enthusiasts who are already using FloatChat to unlock the secrets of our oceans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3">
              View Documentation
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}