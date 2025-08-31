'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Leaf,
  ChevronRight
} from 'lucide-react';

interface NavigationProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Navigation({ isLoggedIn, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Analytics', href: '/charts', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  if (!isLoggedIn) {
    return (
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-xl font-light text-slate-900">HerbTech</span>
            </div>

            {/* Login Button */}
            <Link href="/login">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-6 py-2">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-light text-slate-900">HerbTech</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href}>
                  <Button 
                    variant="ghost" 
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 px-4 py-2 h-10 rounded-xl font-medium transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              onClick={onLogout}
              variant="outline" 
              className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-4 py-2 h-10 rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 px-4 py-3 h-12 rounded-xl font-medium transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.name}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}