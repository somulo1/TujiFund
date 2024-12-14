import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Typography } from '../../components/ui/typography';
import { ArrowLeft } from 'lucide-react';

interface MemberRegistrationData {
  name: string;
  email: string;
  password: string;
  national_id: string;
  dob: string;
  country: string;
  gender: string;
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
    national_id: '',
    dob: '',
    country: '',
    gender: '',
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
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a Member
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our Chama as a member and start contributing to your financial future
        </p>
        <div className="mt-2 text-center text-sm text-gray-500">
          Want to create a new group? 
          <Button
            variant="link"
            onClick={() => navigate('/register/admin')}
            className="font-medium text-primary-600 hover:text-primary-500 ml-1"
          >
            Register as a Chairperson instead
          </Button>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" className="px-4 py-8 shadow-xl">
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name as it appears on your ID"
                helperText="This should match your official identification documents"
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="you@example.com"
                helperText="We'll use this email for all communications"
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••"
                helperText="At least 8 characters with numbers and special characters"
              />

              <Input
                label="National ID Number"
                name="national_id"
                value={formData.national_id}
                onChange={handleInputChange}
                required
                placeholder="Enter your national ID number"
                helperText="This helps us verify your identity"
              />

              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                required
                helperText="You must be at least 18 years old"
              />

              <Input
                label="Country of Residence"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                placeholder="Enter your country of residence"
                helperText="This helps us comply with local regulations"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  This information helps us understand our member demographics
                </p>
              </div>

              {error && (
                <Typography variant="body2" color="error" className="mt-2">
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
              >
                Register as Member
              </Button>

              <p className="mt-4 text-sm text-gray-500 text-center">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
