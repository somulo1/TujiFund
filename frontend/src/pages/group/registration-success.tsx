import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Typography } from '../../components/ui/typography';

export function RegistrationSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <Typography variant="h4" className="mt-3">
            Registration Successful!
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mt-2">
            Your group has been successfully registered.
          </Typography>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" className="px-4 py-8 shadow-xl">
          <CardContent>
            <div className="space-y-6">
              <Typography variant="body1" className="text-center">
                An email has been sent to all executive members with their login credentials.
                They can use these credentials to access their respective dashboards.
              </Typography>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Proceed to Login
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
