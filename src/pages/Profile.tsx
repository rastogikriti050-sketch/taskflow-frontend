import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Save, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Input from '@/components/ui/FormInput';
import Button from '@/components/ui/FormButton';
import Alert from '@/components/ui/FormAlert';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    setSuccessMessage(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProfile(name, email);
    setIsEditing(false);
    setIsSaving(false);
    setSuccessMessage('Your profile has been updated successfully.');
    
    toast({
      title: 'Profile updated',
      description: 'Your profile has been updated successfully.',
    });
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setErrors({});
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="max-w-2xl">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 animate-fade-in">
            <Alert 
              type="success" 
              message={successMessage}
              onClose={() => setSuccessMessage(null)}
            />
          </div>
        )}

        {/* Profile Card */}
        <div className="dashboard-card animate-slide-up">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-3xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <Input
                id="name"
                type="text"
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={User}
                placeholder="John Doe"
                disabled={!isEditing || isSaving}
                error={errors.name}
              />

              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                placeholder="you@example.com"
                disabled={!isEditing || isSaving}
                error={errors.email}
              />
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSave}
                  isLoading={isSaving}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  Save changes
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="dashboard-card mt-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-medium text-foreground mb-4">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Account ID</span>
              <span className="text-foreground font-mono text-sm">{user?.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Member since</span>
              <span className="text-foreground">January 2024</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Account status</span>
              <span className="status-badge status-completed">Active</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
