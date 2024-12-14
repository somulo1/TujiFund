import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Typography } from '../../components/ui/typography';
import { ArrowLeft } from 'lucide-react';


interface GroupRegistrationData {
  group_name: string;
  email: string;
  account_no: string;
  chairman_name: string;
  chairman_email: string;
  secretary_name: string;
  secretary_email: string;
  treasurer_name: string;
  treasurer_email: string;
}

export function ChairpersonRegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<GroupRegistrationData>({
    group_name: '',
    email: '',
    account_no: '',
    chairman_name: '',
    chairman_email: '',
    secretary_name: '',
    secretary_email: '',
    treasurer_name: '',
    treasurer_email: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Log form data before sending
    console.log('Form Data:', formData);
    console.log('Selected File:', selectedFile);

    // Validation: Check if group name is empty
    if (!formData.group_name) {
      setError('Group name is required');
      setLoading(false);
      return;
    }

    try {
      const groupFormData = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        groupFormData.append(key, value);
      });

      // Append the selected file if it exists
      if (selectedFile) {
        groupFormData.append('file', selectedFile);
      }

      // Debug log the FormData object
      for (let [key, value] of groupFormData.entries()) {
        console.log(key, value);
      }

      // Make the fetch request
      const response = await fetch('http://localhost:8080/register/group', {
        method: 'POST',
        body: groupFormData, // FormData handles the headers automatically
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Group registration failed');
      }

      navigate('/dashboard');
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
          Register a New Chama Group
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Set up your group and add official members
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" className="px-4 py-8 shadow-xl">
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <Typography variant="h6" className="text-gray-900">
                  Group Information
                </Typography>
                <p className="text-sm text-gray-500 -mt-4">
                  Provide details about your Chama group
                </p>

                <Input
                  label="Group Name"
                  name="group_name"
                  value={formData.group_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your group's name"
                  helperText="Choose a unique and meaningful name for your group"
                />

                <Input
                  label="Group Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="group@example.com"
                  helperText="This will be used for group communications"
                />

                <Input
                  label="Account Number"
                  name="account_no"
                  type="text"
                  value={formData.account_no}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your group's bank account number"
                  helperText="This account will be used for group transactions"
                />

                <Typography variant="h6" className="text-gray-900 !mt-8">
                  Group Officials
                </Typography>
                <p className="text-sm text-gray-500 -mt-4">
                  Enter details for the group's executive team
                </p>

                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <Typography variant="subtitle2" className="text-gray-700 mb-3">
                      Chairman Details
                    </Typography>
                    <div className="space-y-4">
                      <Input
                        label="Chairman Name"
                        name="chairman_name"
                        value={formData.chairman_name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter chairman's full name"
                      />
                      <Input
                        label="Chairman Email"
                        name="chairman_email"
                        type="email"
                        value={formData.chairman_email}
                        onChange={handleInputChange}
                        required
                        placeholder="chairman@example.com"
                      />
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <Typography variant="subtitle2" className="text-gray-700 mb-3">
                      Secretary Details
                    </Typography>
                    <div className="space-y-4">
                      <Input
                        label="Secretary Name"
                        name="secretary_name"
                        value={formData.secretary_name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter secretary's full name"
                      />
                      <Input
                        label="Secretary Email"
                        name="secretary_email"
                        type="email"
                        value={formData.secretary_email}
                        onChange={handleInputChange}
                        required
                        placeholder="secretary@example.com"
                      />
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <Typography variant="subtitle2" className="text-gray-700 mb-3">
                      Treasurer Details
                    </Typography>
                    <div className="space-y-4">
                      <Input
                        label="Treasurer Name"
                        name="treasurer_name"
                        value={formData.treasurer_name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter treasurer's full name"
                      />
                      <Input
                        label="Treasurer Email"
                        name="treasurer_email"
                        type="email"
                        value={formData.treasurer_email}
                        onChange={handleInputChange}
                        required
                        placeholder="treasurer@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Group Documents
                  </label>
                  <div className="mt-1">
                    <input
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload any required group registration documents
                  </p>
                </div>
                <Input
                        label="Chairman Passowrd"
                        name="  chairman_password"
                        type="password"
                        value={formData.Chairman_password}
                        onChange={handleInputChange}
                        required
                        placeholder="enter your password"
                      />
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

              <p className="mt-4 text-sm text-gray-500 text-center">
                After registration, the group officials will receive invitations to create their accounts
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
