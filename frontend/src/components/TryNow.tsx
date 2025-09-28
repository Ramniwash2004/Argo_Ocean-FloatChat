import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Star, Users, Zap, Shield, Clock } from 'lucide-react';

// const plans = [
//   {
//     name: "Starter",
//     price: "Free",
//     period: "forever",
//     description: "Perfect for students and individual researchers",
//     features: [
//       "Access to basic ocean data",
//       "1,000 AI queries per month",
//       "Standard visualizations",
//       "Community support",
//       "Educational resources"
//     ],
//     buttonText: "Get Started Free",
//     popular: false
//   },
//   {
//     name: "Professional",
//     price: "$49",
//     period: "per month",
//     description: "Ideal for research teams and institutions",
//     features: [
//       "Full ocean data access",
//       "Unlimited AI queries",
//       "Advanced visualizations",
//       "Priority support",
//       "API access",
//       "Custom dashboards",
//       "Data export tools"
//     ],
//     buttonText: "Start Free Trial",
//     popular: true
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     period: "pricing",
//     description: "For large organizations and government agencies",
//     features: [
//       "Everything in Professional",
//       "Dedicated support team",
//       "Custom integrations",
//       "Advanced security",
//       "SLA guarantees",
//       "Training & onboarding",
//       "White-label options"
//     ],
//     buttonText: "Contact Sales",
//     popular: false
//   }
// ];

const testimonials = [
  {
    name: "Ramniwash Kumawat",
    role: "Information-Technology, GGV",
    content: "FloatChat has revolutionized how we analyze ocean data. The AI insights save us hours of manual analysis.",
    rating: 5
  },
  {
    name: "Jhon wick",
    role: "Climate Researcher, MIT",
    content: "The real-time visualization capabilities are incredible. Our students love the interactive interface.",
    rating: 5
  },
  {
    name: "Rajnath singh tomar",
    role: "Minister of Defence,India",
    content: "We've discovered patterns in our data that we never would have found without FloatChat's AI analysis.",
    rating: 4
  }
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process massive datasets in seconds"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and 99.9% uptime"
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "Share insights with your team effortlessly"
  },
  {
    icon: Clock,
    title: "Real-time",
    description: "Live data updates and instant notifications"
  }
];

export default function TryNow() {
  const [email, setEmail] = useState('');
  // const [selectedPlan, setSelectedPlan] = useState('Professional');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    alert('Thanks for signing up! Check your email for next steps.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl mb-6">Start Your Ocean Data Journey</h1>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of researchers who are already using FloatChat to unlock ocean insights. 
              Start with a free trial - no credit card required.
            </p>
            
            {/* Quick signup */}
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex space-x-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white flex-1"
                  required
                />
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white px-6">
                  Get Started
                </Button>
              </div>
            </form>
            
            {/* <p className="text-slate-400 text-sm">
              ✓ No credit card required  ✓ 14-day free trial  ✓ Cancel anytime
            </p> */}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      {/* <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4">Choose Your Plan</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Whether you're a student, researcher, or enterprise organization, 
              we have the perfect plan to meet your ocean data needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`bg-slate-800/50 border-slate-700 p-8 relative ${
                  plan.popular ? 'border-cyan-500 ring-2 ring-cyan-500/20' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl mb-2 text-white">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl text-cyan-400">{plan.price}</span>
                    {plan.price !== 'Free' && plan.price !== 'Custom' && (
                      <span className="text-slate-400 ml-2">{plan.period}</span>
                    )}
                    {plan.price === 'Free' && (
                      <span className="text-slate-400 ml-2">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'bg-cyan-500 hover:bg-cyan-600' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  } text-white`}
                  onClick={() => setSelectedPlan(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div> */}

      {/* Features Section */}
      <div className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-center mb-12">Why Choose FloatChat?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-4 rounded-lg w-fit mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-center mb-12">What Researchers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="text-white">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      {/* <div className="bg-gradient-to-br from-cyan-600 to-blue-700 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl mb-4">Ready to Dive Deep?</h2>
          <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">
            Start exploring ocean data with AI today. Join the community of researchers 
            who are making breakthrough discoveries with FloatChat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}