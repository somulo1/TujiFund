import { Navbar } from '../components/ui/navbar';
import { Button } from '../components/ui/button';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight font-extrabold text-gray-900">
            <span className="block">Welcome to</span>
            <span className="block text-blue-600">TujiFund</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:text-2xl text-gray-600 font-medium md:mt-5 md:max-w-3xl">
            Empowering communities through collaborative savings and investments.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button
                className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-[#2c583e] hover:bg-[#1e3c2a] md:py-4 md:text-lg md:px-10"
                onClick={() => window.location.href = '/register-member'}
              >
                Register as Member
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#2c583e] text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white">Group Management</h3>
                  <p className="mt-3 text-lg font-medium text-gray-200">Easily manage your Chama groups, members, and roles.</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#2c583e] text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white">Financial Tracking</h3>
                  <p className="mt-3 text-lg font-medium text-gray-200">Track contributions, loans, and investments with ease.</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg shadow-lg bg-white/30 backdrop-filter backdrop-blur-sm border border-white/20 hover:bg-white/40 transition-all duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#2c583e] text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white">Documentation</h3>
                  <p className="mt-3 text-lg font-medium text-gray-200">Keep all your group records organized and accessible.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to manage your group savings effectively.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">About Us</h2>
            <p className="mt-4 text-lg text-gray-500">
              We're on a mission to make group savings and investments accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
