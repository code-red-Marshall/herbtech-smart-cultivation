'use client';

import { useState, useEffect } from 'react';
import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarRail } from '@/components/SidebarRail';
import { HerbTechLogo } from '@/components/HerbTechLogo';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  Droplets, 
  Thermometer, 
  Sun, 
  Zap, 
  Leaf, 
  RefreshCw,
  Calendar,
  Activity,
  Gauge
} from 'lucide-react';

export default function ChartsPage() {
  const { telemetry, plantHealth, environmentalConditions } = useDemoTelemetry();
  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Filter data based on time range
  const getFilteredData = (data: any[], range: string) => {
    if (!telemetry || !Array.isArray(telemetry)) return [];
    
    const now = Date.now();
    const ranges = {
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000
    };
    
    const cutoff = now - ranges[range as keyof typeof ranges];
    return data.filter(item => new Date(item.ts).getTime() > cutoff);
  };

  const filteredTelemetry = getFilteredData(telemetry, timeRange);

  // Calculate key metrics
  const avgTemperature = filteredTelemetry.length > 0 
    ? filteredTelemetry.reduce((sum, item) => sum + item.tempC, 0) / filteredTelemetry.length 
    : 0;
  
  const avgHumidity = filteredTelemetry.length > 0 
    ? filteredTelemetry.reduce((sum, item) => sum + item.rh, 0) / filteredTelemetry.length 
    : 0;
  
  const avgSoilMoisture = filteredTelemetry.length > 0 
    ? filteredTelemetry.reduce((sum, item) => sum + item.soil, 0) / filteredTelemetry.length 
    : 0;

  const systemEfficiency = Math.round(
    ((plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2) * 0.6 +
    (environmentalConditions.temperature >= 20 && environmentalConditions.temperature <= 26 ? 20 : 0) +
    (environmentalConditions.humidity >= 55 && environmentalConditions.humidity <= 80 ? 20 : 0)
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed Position */}
      <SidebarRail />
      
      {/* Main Content Area - Scrollable */}
      <div className="main-content-with-sidebar flex-1 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 p-4 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-light text-slate-900 mb-2">Analytics Dashboard</h1>
              <p className="text-sm text-slate-600 font-normal">
                Comprehensive system performance and plant health analytics
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                >
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                </select>
              </div>
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-blue-100/80 rounded-xl sm:rounded-2xl">
                    <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">{avgTemperature.toFixed(1)}°C</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Avg Temperature</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-purple-100/80 rounded-xl sm:rounded-2xl">
                    <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">{avgHumidity.toFixed(1)}%</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Avg Humidity</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-green-100/80 rounded-xl sm:rounded-2xl">
                    <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">{avgSoilMoisture.toFixed(1)}%</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">Avg Soil Moisture</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-orange-100/80 rounded-xl sm:rounded-2xl">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-2">{systemEfficiency}%</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">System Efficiency</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Environmental Trends */}
          <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">Environmental Trends</CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                Temperature and humidity over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <LineChart data={filteredTelemetry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="ts" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="#64748b"
                    fontSize={11}
                  />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="tempC" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                    name="Temperature (°C)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rh" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                    name="Humidity (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Soil and pH Analysis */}
          <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">Soil & pH Analysis</CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                Soil moisture and pH levels over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <AreaChart data={filteredTelemetry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="ts" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="#64748b"
                    fontSize={11}
                  />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="soil" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    name="Soil Moisture (%)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ph" 
                    stackId="2"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.3}
                    name="pH Level"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* System Performance */}
          <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">System Performance</CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                Pump and LED activity over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <BarChart data={filteredTelemetry}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="ts" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="#64748b"
                    fontSize={11}
                  />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="pumpPWM" 
                    fill="#3b82f6" 
                    radius={[3, 3, 0, 0]}
                    name="Pump Activity"
                  />
                  <Bar 
                    dataKey="ledPWM" 
                    fill="#f59e0b" 
                    radius={[3, 3, 0, 0]}
                    name="LED Activity"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Plant Health Distribution */}
          <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">Plant Health Distribution</CardTitle>
              <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
                Current plant health status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Brahmi', value: plantHealth.brahmi.health, color: '#10b981' },
                      { name: 'Ashwagandha', value: plantHealth.ashwagandha.health, color: '#3b82f6' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Brahmi', value: plantHealth.brahmi.health, color: '#10b981' },
                      { name: 'Ashwagandha', value: plantHealth.ashwagandha.health, color: '#3b82f6' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Statistical Summary */}
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-light text-slate-900">Statistical Summary</CardTitle>
            <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
              Key performance indicators and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-slate-900 mb-3">
                  {filteredTelemetry.length}
                </div>
                <div className="text-sm text-slate-600 font-medium">Data Points</div>
                <div className="text-xs text-slate-500 mt-1">Last {timeRange}</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-slate-900 mb-3">
                  {Math.round((plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2)}%
                </div>
                <div className="text-sm text-slate-600 font-medium">Avg Plant Health</div>
                <div className="text-xs text-slate-500 mt-1">Combined</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-slate-900 mb-3">
                  {systemEfficiency}%
                </div>
                <div className="text-sm text-slate-600 font-medium">System Efficiency</div>
                <div className="text-xs text-slate-500 mt-1">Overall</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}