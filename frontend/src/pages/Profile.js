import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiService.getMemberProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await apiService.updateMemberProfile(profile);
      setProfile(updatedProfile);
      updateUser(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
          ) : (
            <div className="space-y-4">
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>First Name:</strong> {profile.firstName}</p>
              <p><strong>Last Name:</strong> {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

