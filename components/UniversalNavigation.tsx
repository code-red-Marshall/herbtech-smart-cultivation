'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Leaf,
  ChevronRight,
  Wifi,
  Activity
} from 'lucide-react';

export function UniversalNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem('herbtech-loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('herbtech-loggedIn');
    setIsLoggedIn(false);
    // Redirect to login page
    window.location.href = '/login';
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, description: 'Main dashboard view' },
    { name: 'Analytics', href: '/charts', icon: BarChart3, description: 'Data analysis and charts' },
    { name: 'Settings', href: '/settings', icon: Settings, description: 'System configuration' },
  ];

  // Don't show navigation on login page
  if (pathname === '/login') {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 shadow-sm sticky top-0 z-50">
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
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 shadow-sm sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-lg sm:text-xl font-light text-slate-900">HerbTech</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button 
                    variant={isActive ? "default" : "ghost"} 
                    className={`${
                      isActive 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                    } px-3 sm:px-4 py-2 h-9 sm:h-10 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Status Indicators and User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Status Badges */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50/50 px-2 sm:px-3 py-1 text-xs">
                <Wifi className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50/50 px-2 sm:px-3 py-1 text-xs">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="hidden sm:block text-xs sm:text-sm text-slate-600 font-medium">Demo User</span>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-3 sm:px-4 py-2 h-9 sm:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg"
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
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button 
                      variant="ghost" 
                      className={`${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                      } w-full justify-start px-4 py-3 h-12 rounded-xl font-medium transition-all duration-200`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-slate-500 font-normal">{item.description}</span>
                      </div>
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
