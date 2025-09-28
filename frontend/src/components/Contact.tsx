import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Mail, Phone, MapPin, MessageCircle, Clock, Globe } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "kramniwash68@gmail.com",
    description: "Don't Send me an email anytime"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 7877749532",
    description: "Mon-Fri from 8am to 5pm"
  },
  {
    icon: MapPin,
    title: "Collage",
    value: "GGV,Bilaspur",
    description: "Studing B.Tech in Information Technology"
  }
];

const officeHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM PST" },
  { day: "Saturday", hours: "9:00 AM - 2:00 PM PST" },
  { day: "Sunday", hours: "Closed" }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-300">
              Have questions about FloatChat? Want to collaborate on ocean research? 
              We'd love to hear from you. Reach out to our team anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 p-6 text-center">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-lg w-fit mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-white">{info.title}</h3>
                <p className="text-cyan-400 text-lg mb-2">{info.value}</p>
                <p className="text-slate-300">{info.description}</p>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-300 mb-2">Subject</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-slate-800 border-slate-600 text-white"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-300 mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-slate-800 border-slate-600 text-white"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white w-full py-3"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-xl text-white">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-slate-300">{schedule.day}</span>
                      <span className="text-cyan-400">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Support */}
              <Card className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-xl text-white">Quick Support</h3>
                </div>
                <p className="text-slate-300 mb-4">
                  Need immediate assistance? Check out our resources:
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                    Documentation
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                    FAQ
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                    Video Tutorials
                  </Button>
                </div>
              </Card>

              {/* Global Presence */}
              <Card className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-xl text-white">Global Presence</h3>
                </div>
                <p className="text-slate-300 mb-4">
                  We work with ocean researchers and institutions worldwide:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                  <div>In India</div>
                  <div>us United state</div>
                  <div>🇪🇺 European Union</div>
                  <div>🇯🇵 Japan</div>
                  <div>🇦🇺 Australia</div>
                  <div>🇧🇷 Brazil</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl mb-4">Ready to Start Exploring?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Don't wait to unlock the power of ocean data. Get started with FloatChat today 
            and join the community of researchers making groundbreaking discoveries.
          </p>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
            Start Free Trial
          </Button>
        </div>
      </div> */}
    </div>
  );
}