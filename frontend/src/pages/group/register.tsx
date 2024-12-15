import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Typography } from '../../components/ui/typography';

interface GroupRegistrationData {
  name: string;
  'account-no': string;
  chairman_name: string;
  chairman_email: string;
  treasurer_name: string;
  treasurer_email: string;
  secretary_name: string;
  secretary_email: string;
  file: File | null;
}

export function GroupRegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<GroupRegistrationData>({
    name: '',
    'account-no': '',
    chairman_name: '',
    chairman_email: '',
    treasurer_name: '',
    treasurer_email: '',
    secretary_name: '',
    secretary_email: '',
    file: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files) {
      setFormData(prev => ({
        ...prev,
        file: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('/register/group', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed');
      }

      navigate('/group/registration-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register New Chama Group
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Fill in the details below to register your group
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <Card variant="elevated" className="px-4 py-8 shadow-xl">
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <Typography variant="h6" className="text-gray-900">
                  Group Information
                </Typography>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="Group Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Account Number"
                    name="account-no"
                    type="number"
                    value={formData['account-no']}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Typography variant="h6" className="text-gray-900">
                  Chairman Details
                </Typography>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="Chairman Name"
                    name="chairman_name"
                    value={formData.chairman_name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Chairman Email"
                    name="chairman_email"
                    type="email"
                    value={formData.chairman_email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Typography variant="h6" className="text-gray-900">
                  Treasurer Details
                </Typography>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="Treasurer Name"
                    name="treasurer_name"
                    value={formData.treasurer_name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Treasurer Email"
                    name="treasurer_email"
                    type="email"
                    value={formData.treasurer_email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Typography variant="h6" className="text-gray-900">
                  Secretary Details
                </Typography>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="Secretary Name"
                    name="secretary_name"
                    value={formData.secretary_name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Secretary Email"
                    name="secretary_email"
                    type="email"
                    value={formData.secretary_email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Typography variant="h6" className="text-gray-900">
                  Document Upload
                </Typography>
                
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file"
                          type="file"
                          className="sr-only"
                          onChange={handleInputChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC up to 10MB
                    </p>
                  </div>
                </div>
                {formData.file && (
                  <p className="text-sm text-gray-500">
                    Selected file: {formData.file.name}
                  </p>
                )}
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
                Register Group
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
