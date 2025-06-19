import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, BarChart3, BookOpen, Target } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Trade Journaling',
      description: 'Document your trades with detailed notes, screenshots, and analysis.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Performance Analytics',
      description: 'Track your win rate, profit/loss, and trading patterns over time.',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Strategy Management',
      description: 'Create and manage your trading strategies with detailed setups.',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Progress Tracking',
      description: 'Monitor your growth and identify areas for improvement.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Professional Trading Journal
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Track Your Trading
              <span className="text-blue-600 dark:text-blue-400"> Journey</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Elevate your trading performance with our comprehensive journaling platform. 
              Track trades, analyze patterns, and improve your strategy with data-driven insights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="group">
                <Link to="/auth">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Powerful features designed to help you become a better trader
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                    <div className="text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 dark:bg-blue-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to transform your trading?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of traders who are already improving their performance
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/auth">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 