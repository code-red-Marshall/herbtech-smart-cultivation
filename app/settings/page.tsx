'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SettingsForm } from '@/components/SettingsForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Database, 
  Network, 
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('herbtech-loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (!loggedIn) {
      router.push('/login');
    }
  }, [router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-3 sm:gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-white/50 rounded-lg sm:rounded-xl transition-colors duration-200">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl sm:text-4xl font-light text-slate-900 mb-3">System Settings</h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal">
              Configure system parameters and automation preferences
            </p>
          </div>
        </div>

        {/* Settings Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-blue-100/80 rounded-xl sm:rounded-2xl">
                  <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-light text-slate-900 mb-2">System</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Core Settings</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-green-100/80 rounded-xl sm:rounded-2xl">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-light text-slate-900 mb-2">Security</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Access Control</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-purple-100/80 rounded-xl sm:rounded-2xl">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-light text-slate-900 mb-2">Data</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Storage & Backup</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-orange-100/80 rounded-xl sm:rounded-2xl">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-light text-slate-900 mb-2">Alerts</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Notifications</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Settings Form */}
      <div className="mb-8 sm:mb-12">
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-light text-slate-900">System Configuration</CardTitle>
            <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
              Adjust environmental targets and automation settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm />
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* System Information */}
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">System Information</CardTitle>
            <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
              Current system status and version details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Version</span>
              <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs">v1.0.0</Badge>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Status</span>
              <Badge variant="default" className="px-2 sm:px-3 py-1 text-xs">Online</Badge>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Uptime</span>
              <span className="text-xs sm:text-sm text-slate-900 font-medium">24h 32m</span>
            </div>
          </CardContent>
        </Card>

        {/* Network Status */}
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">Network Status</CardTitle>
            <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
              Connection and network performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Connection</span>
              <Badge variant="default" className="px-2 sm:px-3 py-1 text-xs">Connected</Badge>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Latency</span>
              <span className="text-xs sm:text-sm text-slate-900 font-medium">12ms</span>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Signal</span>
              <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs">Excellent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 lg:pt-12 border-t border-slate-200/50">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            HerbTech Smart Cultivation System v1.0
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Built with Next.js • Tailwind CSS • React
          </p>
        </div>
      </footer>
    </div>
  );
}