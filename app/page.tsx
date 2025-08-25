'use client';

import { useState, useEffect } from 'react';
import { PodTile } from '@/components/PodTile';
import { StatsPanel } from '@/components/StatsPanel';
import { ControlButtons } from '@/components/ControlButtons';
import { useDemoEvents } from '@/hooks/useDemoEvents';
import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Droplets, 
  Thermometer, 
  Sun, 
  Zap, 
  Leaf,
  Wifi,
  Activity,
  ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useDemoEvents();
  const { 
    plantHealth, 
    environmentalConditions, 
    systemStatus, 
    telemetry,
    checkMaintenance 
  } = useDemoTelemetry();

  useEffect(() => {
    const loggedIn = localStorage.getItem('herbtech-loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('herbtech-loggedIn');
    setIsLoggedIn(false);
  };

  const maintenance = checkMaintenance();
  const latestReading = telemetry && telemetry.length > 0 ? telemetry[telemetry.length - 1] : null;

  // Calculate system efficiency
  const systemEfficiency = Math.round(
    ((plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2) * 0.6 +
    (systemStatus.ledActive ? 20 : 0) +
    (systemStatus.pumpActive ? 10 : 0) +
    (systemStatus.fanActive ? 10 : 0)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
      <main className="h-[calc(100vh-4rem)] p-8 overflow-auto">

        
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-blue-100/80 rounded-2xl group-hover:bg-blue-200/80 transition-colors">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-light text-slate-900 mb-3">{systemEfficiency}%</div>
              <div className="text-sm text-slate-600 font-medium">System Efficiency</div>
              <div className="mt-4">
                <Progress value={systemEfficiency} className="h-2 bg-slate-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-green-100/80 rounded-2xl group-hover:bg-green-200/80 transition-colors">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-2 sm:mb-3">
                {Math.round((plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2)}%
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Plant Health</div>
              <div className="mt-3 sm:mt-4">
                <Progress value={(plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2} className="h-2 bg-slate-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-red-100/80 rounded-2xl group-hover:bg-red-200/80 transition-colors">
                  <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-2 sm:mb-3">{environmentalConditions.temperature}°</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Temperature</div>
              <div className="mt-3 sm:mt-4 text-xs text-slate-500">
                Target: 20-26°C
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-purple-100/80 rounded-2xl group-hover:bg-purple-200/80 transition-colors">
                  <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-2 sm:mb-3">{environmentalConditions.humidity}%</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Humidity</div>
              <div className="mt-3 sm:mt-4 text-xs text-slate-500">
                Target: 55-80%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Left side - Plant Garden */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            {/* Plant Garden Section */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-light text-slate-900">Plant Garden</CardTitle>
                    <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                      Real-time plant health and growth monitoring
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-sm font-medium text-slate-700">Grow Light</span>
                    <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      systemStatus.ledActive 
                        ? 'bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-pulse' 
                        : 'bg-slate-400'
                    }`}></div>
                    <Badge variant={systemStatus.ledActive ? "default" : "secondary"} className="px-3 py-1">
                      {systemStatus.ledActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <PodTile name="Brahmi" />
                  <PodTile name="Ashwagandha" />
                </div>
              </CardContent>
            </Card>

            {/* System Metrics */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-light text-slate-900">System Metrics</CardTitle>
                <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                  Current environmental and system conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 font-medium">pH Level</div>
                    <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">
                      {latestReading?.ph?.toFixed(1) || '6.4'}
                    </div>
                    <div className="text-xs text-slate-500">Optimal: 6.0-7.0</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 font-medium">Soil Moisture</div>
                    <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">
                      {latestReading?.soil?.toFixed(1) || '59'}%
                    </div>
                    <div className="text-xs text-slate-500">Target: 50-70%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 font-medium">Humidity</div>
                    <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">
                      {latestReading?.rh?.toFixed(1) || '55'}%
                    </div>
                    <div className="text-xs text-slate-500">Target: 55-80%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 font-medium">NPK Ratio</div>
                    <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">
                      {latestReading?.npk || '3-5-2'}
                    </div>
                    <div className="text-xs text-slate-500">Balanced</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Controls and Status */}
          <div className="space-y-6 sm:space-y-8">
            {/* iPhone Demo Interface */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">Mobile App</CardTitle>
                <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                  Smart Garden mobile interface
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                {/* iPhone Mockup */}
                <div className="relative">
                  {/* iPhone Frame */}
                  <div className="w-64 sm:w-72 h-[480px] sm:h-[560px] bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl">
                    {/* Screen */}
                    <div className="w-full h-full bg-white rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="h-8 sm:h-10 bg-slate-900 text-white text-xs flex items-center justify-between px-6 sm:px-8 pt-1 sm:pt-2">
                        <span className="font-medium">9:41</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 sm:w-5 h-3 sm:h-4 border border-white rounded-sm">
                            <div className="w-3 sm:w-4 h-2 bg-white rounded-sm m-0.5"></div>
                          </div>
                          <div className="w-6 sm:w-7 h-2 sm:h-3 border border-white rounded-full">
                            <div className="w-5 sm:w-6 h-1 sm:h-2 bg-white rounded-full m-0.5"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="p-6 sm:p-8 text-center">
                        {/* App Icon */}
                        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl sm:rounded-3xl mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg">
                          <Leaf className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-light text-slate-900 mb-6 sm:mb-8">Smart Garden</h3>
                        
                        {/* Metrics Grid */}
                        <div className="space-y-3 sm:space-y-4 text-left">
                          <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                            <span className="text-slate-600 text-xs sm:text-sm font-medium">pH</span>
                            <span className="font-light text-slate-900 text-sm sm:text-lg">{latestReading?.ph?.toFixed(1) || '6.2'}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                            <span className="text-slate-600 text-xs sm:text-sm font-medium">Soil</span>
                            <span className="font-light text-slate-900 text-sm sm:text-lg">{latestReading?.soil?.toFixed(1) || '60.9'}%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                            <span className="text-slate-600 text-xs sm:text-sm font-medium">Humidity</span>
                            <span className="font-light text-slate-900 text-sm sm:text-lg">{latestReading?.rh?.toFixed(1) || '70.1'}%</span>
                          </div>
                          <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                            <span className="text-slate-600 text-xs sm:text-sm font-medium">NPK</span>
                            <span className="font-light text-slate-900 text-sm sm:text-lg">{latestReading?.npk || '4-6-3'}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                            <span className="text-slate-600 text-xs sm:text-sm font-medium">Light</span>
                            <span className="font-light text-slate-900 text-sm sm:text-lg">{Math.round((latestReading?.lux || 7900) / 100)} lx</span>
                          </div>
                        </div>
                        
                        {/* Quick Action Button */}
                        <button className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
                          View Details
                        </button>
                      </div>
                      
                      {/* Home Indicator */}
                      <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2">
                        <div className="w-28 sm:w-36 h-1 bg-slate-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Status */}
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">System Status</CardTitle>
                <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                  Live system monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">Temperature</span>
                  <Badge variant={environmentalConditions.temperature >= 20 && environmentalConditions.temperature <= 26 ? "default" : "destructive"} className="px-2 sm:px-3 py-1">
                    {environmentalConditions.temperature}°C
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">Humidity</span>
                  <Badge variant={environmentalConditions.humidity >= 55 && environmentalConditions.humidity <= 80 ? "default" : "destructive"} className="px-2 sm:px-3 py-1">
                    {environmentalConditions.humidity}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">CO₂</span>
                  <Badge variant={environmentalConditions.co2Level >= 350 && environmentalConditions.co2Level <= 600 ? "default" : "destructive"} className="px-2 sm:px-3 py-1">
                    {environmentalConditions.co2Level} ppm
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">Air Flow</span>
                  <Badge variant={environmentalConditions.airFlow >= 0.3 ? "default" : "destructive"} className="px-2 sm:px-3 py-1">
                    {Math.round(environmentalConditions.airFlow * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            {/* System Controls */}
            <ControlButtons isLoggedIn={isLoggedIn} />
          </div>
        </div>

        {/* Footer Section */}
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
      </main>
    </div>
  );
}