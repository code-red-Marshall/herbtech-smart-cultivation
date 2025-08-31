'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SettingsForm } from '@/components/SettingsForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SidebarRail } from '@/components/SidebarRail';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Database, 
  Network, 
  Bell,
  ChevronLeft,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { HerbTechLogo } from '@/components/HerbTechLogo';
import { Button } from '@/components/ui/button';

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
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed Position */}
      <SidebarRail />
      
      {/* Main Content Area - Scrollable */}
      <div className="main-content-with-sidebar flex-1 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 p-4 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200">
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-light text-slate-900 mb-2">System Settings</h1>
              <p className="text-sm text-slate-600 font-normal">
                Configure system parameters and automation preferences
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area with Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Settings Form - Left Side (2/3 width) */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm h-full">
              <CardContent className="p-8">
                <SettingsForm />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side (1/3 width) */}
          <div className="space-y-6">
            {/* System Information Tile */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">System Information</CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Current system status and version details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">Version</span>
                  <Badge variant="outline" className="px-3 py-1 text-xs font-medium">v1.0.0</Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">Status</span>
                  <Badge variant="default" className="px-3 py-1 text-xs font-medium">Online</Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">Uptime</span>
                  <span className="text-sm font-medium text-slate-900">24h 32m</span>
                </div>
              </CardContent>
            </Card>

            {/* Network Status Tile */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">Network Status</CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Connection and network performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">Connection</span>
                  <Badge variant="default" className="px-3 py-1 text-xs font-medium">Connected</Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">Latency</span>
                  <span className="text-sm font-medium text-slate-900">12ms</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">Signal</span>
                  <Badge variant="outline" className="px-3 py-1 text-xs font-medium">Excellent</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Tile */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Common system operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh System
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Database className="w-4 h-4 mr-2" />
                  Backup Data
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Check
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 lg:pt-12 border-t border-slate-200/50">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <HerbTechLogo size="md" />
            </div>
            <p className="text-slate-500 text-sm font-medium">
              Smart Cultivation System v1.0
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Built with Next.js • Tailwind CSS • React
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}