import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Shield, Zap, ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Create, edit, and organize tasks with ease. Track progress and stay on top of deadlines.',
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Protected routes with JWT-based authentication. Your data stays safe and secure.',
    },
    {
      icon: Zap,
      title: 'Fast & Responsive',
      description: 'Built with modern technologies for a smooth experience on any device.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="text-foreground font-semibold text-lg">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn-ghost">
              Sign in
            </Link>
            <Link to="/signup" className="btn-primary py-2">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Manage Tasks with
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Clarity</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up">
            A clean, modern task management application built for productivity. 
            Stay organized, track progress, and achieve more every day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-4">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Everything you need
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="dashboard-card text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who are already managing their tasks more efficiently.
          </p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Create your account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 TaskFlow. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
