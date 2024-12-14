import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Navbar } from '../components/layout/navbar';

export function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Welcome to{' '}
            <span className="text-[#2c583e]">TujiFund</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Empowering communities through organized savings and investments. Join our Chama platform
            for transparent and efficient financial management.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 text-lg font-medium rounded-md text-white bg-[#2c583e] hover:bg-[#1e3c2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c583e]"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 text-lg font-medium rounded-md text-white bg-[#2c583e] hover:bg-[#1e3c2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c583e]"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register-chairperson')}
                  className="px-8 py-3 text-lg font-medium rounded-md text-white bg-transparent border-2 border-white hover:bg-white hover:text-[#2c583e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full px-4">
          {[
            {
              title: 'Secure Savings',
              description: 'Safely manage and grow your group savings with our secure platform.',
              icon: (
                <svg className="h-6 w-6 text-[#2c583e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
            },
            {
              title: 'Transparent Management',
              description: 'Track contributions, loans, and dividends with complete transparency.',
              icon: (
                <svg className="h-6 w-6 text-[#2c583e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
            },
            {
              title: 'Easy Collaboration',
              description: 'Work together seamlessly with group members on financial decisions.',
              icon: (
                <svg className="h-6 w-6 text-[#2c583e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur-lg"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-white bg-opacity-10">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-medium text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-300 bg-black bg-opacity-50">
        <p> 2024 TujiFund. All rights reserved.</p>
      </footer>
    </div>
  );
}
