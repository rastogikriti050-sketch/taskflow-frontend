import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Input from '@/components/ui/FormInput';
import Button from '@/components/ui/FormButton';
import Alert from '@/components/ui/FormAlert';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(name, email, password);
      toast({
        title: 'Account created!',
        description: 'Welcome to TaskFlow. Let\'s get started!',
      });
      navigate('/dashboard');
    } catch (error) {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="auth-card animate-scale-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          <span className="text-foreground font-semibold text-xl">TaskFlow</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground">Start managing your tasks efficiently</p>
        </div>

        {/* Error Alert */}
        {formError && (
          <div className="mb-6">
            <Alert 
              type="error" 
              message={formError}
              onClose={() => setFormError(null)}
            />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            type="text"
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={User}
            placeholder="John Doe"
            error={errors.name}
            disabled={isLoading}
          />

          <Input
            id="email"
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            placeholder="you@example.com"
            error={errors.email}
            disabled={isLoading}
          />

          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            placeholder="••••••••"
            error={errors.password}
            disabled={isLoading}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />

          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            label="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={Lock}
            placeholder="••••••••"
            error={errors.confirmPassword}
            disabled={isLoading}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full mt-6"
          >
            Create account
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
