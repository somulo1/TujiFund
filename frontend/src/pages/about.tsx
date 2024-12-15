import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Shield, Users, TrendingUp, Smartphone, Clock, Lock } from 'lucide-react';
import { Navbar } from '../components/layout/navbar';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Back Button */}
      <div className="absolute top-20 left-4 z-20">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="max-w-3xl text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
            About <span className="text-[#2c583e]">TujiFund</span>
          </h1>
          <p className="text-xl text-gray-600">
            To revolutionize group savings in Africa by providing accessible, secure, and transparent 
            financial solutions that empower communities to achieve their financial goals together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#2c583e] bg-opacity-10">
                <feature.icon className="h-6 w-6 text-[#2c583e]" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mt-20 w-full max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg border border-gray-100 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-[#2c583e] mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-[#2c583e] mt-1">{member.role}</p>
                <p className="mt-4 text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 bg-gray-50">
        <p> 2024 TujiFund. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Features Data
const features = [
  {
    name: 'Secure Platform',
    description: "Bank-grade security protocols to protect your group's financial data",
    icon: Shield,
  },
  {
    name: 'Community Focused',
    description: 'Built specifically for African Chamas and investment groups',
    icon: Users,
  },
  {
    name: 'Growth Tracking',
    description: "Real-time monitoring of your group's financial progress",
    icon: TrendingUp,
  },
  {
    name: 'Mobile Access',
    description: 'Manage your Chama from anywhere using our mobile platform',
    icon: Smartphone,
  },
  {
    name: 'Always Available',
    description: "24/7 access to your group's financial information",
    icon: Clock,
  },
  {
    name: 'Data Privacy',
    description: 'Your information is encrypted and never shared with third parties',
    icon: Lock,
  },
];

// Team Data
const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    description: 'Financial technology expert with 15 years of experience in community banking',
  },
  {
    name: 'David Kimani',
    role: 'Head of Technology',
    description: 'Seasoned software engineer specializing in secure financial systems',
  },
  {
    name: 'Grace Muthoni',
    role: 'Community Lead',
    description: 'Passionate about empowering communities through financial education',
  },
];
