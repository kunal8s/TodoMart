import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'

const Homepage = () => {
  const features = [
    {
      icon: '📱',
      title: 'Cross-Platform Sync',
      description: 'Access your shopping list from any device - phone, tablet, or computer.'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Sharing',
      description: 'Share lists with family members and collaborate in real-time.'
    },
    {
      icon: '🔔',
      title: 'Smart Reminders',
      description: 'Get notifications when you\'re near stores or when items are running low.'
    },
    {
      icon: '📊',
      title: 'Spending Insights',
      description: 'Track your shopping habits and save money with budget insights.'
    },
    {
      icon: '🏷️',
      title: 'Price Tracking',
      description: 'Monitor prices across stores and get alerts for the best deals.'
    },
    {
      icon: '🎯',
      title: 'Smart Suggestions',
      description: 'AI-powered suggestions based on your shopping history and preferences.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Busy Mom',
      content: 'TodoMART has saved me so much time! I never forget what to buy anymore.',
      avatar: '👩'
    },
    {
      name: 'Mike Chen',
      role: 'Professional Chef',
      content: 'The category organization is perfect for managing my restaurant supplies.',
      avatar: '👨‍🍳'
    },
    {
      name: 'Emma Davis',
      role: 'College Student',
      content: 'Shared lists with my roommates make grocery shopping so much easier!',
      avatar: '👩‍🎓'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Create Your List',
      description: 'Quickly add items with our intuitive interface or voice commands.'
    },
    {
      step: '2',
      title: 'Organize & Categorize',
      description: 'Group items by store, category, or priority for efficient shopping.'
    },
    {
      step: '3',
      title: 'Share & Collaborate',
      description: 'Invite family members to contribute to shared shopping lists.'
    },
    {
      step: '4',
      title: 'Shop Smart',
      description: 'Check off items as you shop and never miss anything again.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🛒</span>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  TodoMART
                </h1>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  Smart Shopping Made Simple
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="cursor-pointer text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="cursor-pointer text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="cursor-pointer text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <Link to="/signin">
                <button className="px-6 py-2.5 border border-gray-300 rounded-xl font-semibold text-gray-700 cursor-pointer hover:border-purple-500 hover:text-purple-600 transition-all duration-200">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="cursor-pointer px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl text-gray-700">
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Hero Text */}
            <div className="mb-12 lg:mb-0">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Never Forget{' '}
                <span className="bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent relative">
                  What to Buy
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600/20 to-green-500/20 rounded-full"></span>
                </span>{' '}
                Again
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                The intelligent shopping list app that remembers everything
                so you don't have to. Organize, share, and shop smarter.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/signup">
                  <button className="cursor-pointer group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Start Your Free Trial</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="cursor-pointer px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 text-lg hover:border-purple-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2">
                    <span className="text-purple-600">▶</span>
                    <span>Watch Demo</span>
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-gray-600 font-medium">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    1M+
                  </div>
                  <div className="text-gray-600 font-medium">Items Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    4.9
                  </div>
                  <div className="text-gray-600 font-medium">App Store Rating</div>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center">
              <div className="relative bg-white p-3 rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="w-72 h-[500px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 flex flex-col">
                  {/* App Header */}
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-white font-bold text-lg">TodoMART</span>
                    <span className="text-white/80 text-sm">Today</span>
                  </div>

                  {/* Shopping List Items */}
                  <div className="space-y-3 flex-1">
                    {['Milk', 'Eggs', 'Bread', 'Apples'].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors duration-200">
                        <div className={`w-6 h-6 rounded-lg border-2 ${index === 1 ? 'bg-green-500 border-green-500' : 'border-white/30'} flex items-center justify-center`}>
                          {index === 1 && (
                            <span className="text-white font-bold">✓</span>
                          )}
                        </div>
                        <span className={`flex-1 text-white font-medium ${index === 1 ? 'line-through opacity-70' : ''}`}>
                          {item}
                        </span>
                        <span className="text-white/70">×{index + 2}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add Item Button */}
                  <div className="flex items-center space-x-3 p-4 text-white/80 hover:text-white cursor-pointer transition-colors duration-200">
                    <div className="w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <span className="text-xl">+</span>
                    </div>
                    <span>Add new item</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Why Choose TodoMART
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need for Smarter Shopping
            </h3>
            <p className="text-xl text-gray-600">
              Powerful features designed to make your shopping experience effortless and efficient.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Get Started in Minutes
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              How TodoMART Works
            </h3>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number */}
                <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.step}
                </div>

                {/* Step Content */}
                <div className="px-4">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (except for last item) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-3/4 w-full h-1 bg-gradient-to-r from-blue-400/50 to-purple-400/50"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Loved by Shoppers
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h3>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-2xl text-gray-300 mb-6">"</div>
                <p className="text-gray-700 text-lg italic mb-8 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-700 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Shopping Experience?
          </h3>
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Join thousands of smart shoppers who never forget what to buy.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link to="/signup">
              <button className="cursor-pointer group px-10 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-3">
                <span>Get Started Free</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </Link>
            <Link to="/signup">
              <button className="cursor-pointer px-10 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300">
                Schedule a Demo
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-3 text-purple-200">
            <span className="text-green-300 text-xl">✓</span>
            <span className="text-lg">
              No credit card required • 14-day free trial • Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl">🛒</span>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-white">TodoMART</h3>
                  <span className="text-sm text-gray-500">Smart Shopping Made Simple</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8 max-w-md">
                The intelligent shopping list app that helps you remember,
                organize, and shop smarter.
              </p>
              <div className="flex space-x-4">
                {['𝕏', 'f', 'in', 'ig'].map((icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center hover:text-white transition-all duration-200"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {['Product', 'Company', 'Support'].map((category, index) => (
              <div key={index}>
                <h4 className="text-white font-bold text-lg mb-6">{category}</h4>
                <ul className="space-y-4">
                  {['Features', 'How It Works', 'Pricing', 'Mobile App'].map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="hover:text-white hover:pl-2 transition-all duration-200 block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © 2024 TodoMART. All rights reserved.
            </p>
            <div className="flex space-x-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-500 hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;