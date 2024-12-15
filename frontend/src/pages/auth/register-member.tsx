import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Typography } from '../../components/ui/typography';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../../components/ui/navbar';

interface MemberRegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  national_id: string;
  dob: string;
  country: string;
  gender: string;
  occupation: string;
  monthly_income: string;
  role: 'member';
}

export function MemberRegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<MemberRegistrationData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    national_id: '',
    dob: '',
    country: '',
    gender: '',
    occupation: '',
    monthly_income: '',
    role: 'member',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed');
      }

      navigate('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a472a] to-[#2c583e]">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">
            Register as a Member
          </h2>
          <p className="mt-3 text-xl text-gray-200">
            Join our Chama as a member and start contributing to your financial future
          </p>
        </div>

        <Card className="bg-white/20 backdrop-filter backdrop-blur-lg border-white/20">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    National ID
                  </label>
                  <Input
                    type="text"
                    name="national_id"
                    value={formData.national_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Enter your ID number"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300 rounded-md"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Country
                  </label>
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Enter your country"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Occupation
                  </label>
                  <Input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Enter your occupation"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Monthly Income
                  </label>
                  <Input
                    type="number"
                    name="monthly_income"
                    value={formData.monthly_income}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Enter your monthly income"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 text-xl font-semibold text-white bg-[#2c583e] rounded-md hover:bg-[#1e3c2a] transition-colors"
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-lg text-gray-200">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-semibold text-white hover:text-[#2c583e] transition-colors"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
