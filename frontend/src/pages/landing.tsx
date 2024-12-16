import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Navbar } from '../components/layout/navbar';
import { motion } from 'framer-motion';
import { 
  Users, Shield, TrendingUp, Smartphone, 
  CreditCard, PieChart, BookOpen, Settings,
  CheckCircle, Clock
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg.webp)',
          backgroundSize: 'contain',
          backgroundPosition: 'left',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-grow">
        {/* Hero Section */}
        <motion.div 
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="max-w-3xl text-center" variants={itemVariants}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              Welcome to{' '}
              <span className="text-[#2c583e]">TujiFund</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-200 font-medium">
              The Ultimate Solution to  local investment and saving groups. Streamline your group savings, 
              automate record keeping, and grow your investments together.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 text-xl font-semibold rounded-md text-white bg-[#2c583e] hover:bg-[#1e3c2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c583e]"
                >
                  Go to Dashboard
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 text-xl font-semibold rounded-md text-white bg-[#2c583e] hover:bg-[#1e3c2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c583e]"
                  >
                    Start Free Trial
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/register-chairperson')}
                    className="px-8 py-4 text-xl font-semibold rounded-md text-white bg-transparent border-2 border-white hover:bg-white hover:text-[#2c583e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Schedule Demo
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center p-6 rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="text-3xl font-bold text-[#2c583e]">{stat.value}</div>
              <div className="mt-2 text-white">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Features Section */}
        <motion.div 
          className="py-20 w-full max-w-7xl px-4 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
            variants={itemVariants}
          >
            Everything You Need to Manage in Your Chama
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-md bg-[#2c583e] text-white">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">{feature.title}</h3>
                <p className="mt-3 text-lg font-medium text-gray-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="py-20 w-full max-w-7xl px-4 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
            variants={itemVariants}
          >
            Why Choose TujiFund?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-[#f66151]" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">{benefit.title}</h3>
                  <p className="mt-2 text-gray-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          className="py-20 w-full max-w-7xl px-4 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
            variants={itemVariants}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index} 
                className="p-8 rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-[#2c583e]">{plan.price}</span>
                  <span className="text-xl font-medium text-gray-200">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-lg font-medium text-gray-200 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-[#2c583e] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register-chairperson')}
                  className="mt-8 w-full px-6 py-4 text-xl font-semibold text-white bg-[#2c583e] rounded-md hover:bg-[#1e3c2a]"
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-300 bg-black bg-opacity-50">
        <p> 2024 TujiFund. All rights reserved.</p>
      </footer>
    </div>
  );
}

const stats = [
  { value: '1000+', label: 'Active Chamas' },
  { value: 'KSH 50M+', label: 'Total Savings' },
  { value: '10,000+', label: 'Members' },
];

const features = [
  {
    title: 'Member Management',
    description: 'Easily manage members, roles, and permissions. Track member contributions and participation.',
    icon: Users,
  },
  {
    title: 'Financial Tracking',
    description: 'Record and monitor all financial transactions with detailed reports and analytics.',
    icon: PieChart,
  },
  {
    title: 'Mobile Access',
    description: 'Access your Chama information anytime, anywhere through our mobile-friendly platform.',
    icon: Smartphone,
  },
  {
    title: 'Automated Payments',
    description: 'Set up automatic contribution reminders and integrate with M-Pesa for easy payments.',
    icon: CreditCard,
  },
  {
    title: 'Meeting Management',
    description: 'Schedule meetings, take minutes, and share documents with all members.',
    icon: BookOpen,
  },
  {
    title: 'Loan Management',
    description: 'Process loan applications, track repayments, and manage interest calculations.',
    icon: Settings,
  },
];

const benefits = [
  {
    title: 'Save Time',
    description: 'Automate routine tasks and reduce administrative work by up to 80%.',
  },
  {
    title: 'Increase Transparency',
    description: 'Every transaction is recorded and visible to authorized members.',
  },
  {
    title: 'Reduce Errors',
    description: 'Automated calculations and reconciliation prevent manual mistakes.',
  },
  {
    title: 'Grow Faster',
    description: 'Make data-driven decisions with comprehensive financial reports.',
  },
];

const pricingPlans = [
  {
    name: 'Basic',
    price: 'KSH 1,000',
    features: [
      'Up to 20 members',
      'Basic reporting',
      'Mobile access',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: 'KSH 2,500',
    features: [
      'Up to 50 members',
      'Advanced reporting',
      'Loan management',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'KSH 5,000',
    features: [
      'Unlimited members',
      'Custom features',
      'API access',
      '24/7 support',
    ],
  },
];
