'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Leaf, Droplets, Thermometer, Sun, Zap, Gauge, Sparkles, Target } from 'lucide-react';
import { SidebarRail } from '@/components/SidebarRail';
import PlantPod from '@/components/plant-pod/PlantPod';
import '@/components/plant-pod/plant-pod.css';
import { HerbTechLogo } from '@/components/HerbTechLogo';

export default function DashboardPage() {
  const [luminance, setLuminance] = useState([75]);
  const [temperature, setTemperature] = useState([24]);
  const [soilMoisture, setSoilMoisture] = useState([65]);
  const [npk, setNpk] = useState([7.2]);
  const [watering, setWatering] = useState(false);
  const [plantHealth, setPlantHealth] = useState(85);
  const [growthStage, setGrowthStage] = useState(3.0);
  const [leafCount, setLeafCount] = useState(12);

  // Calculate light intensity from luminance percentage
  const lightIntensity = useMemo(() => {
    return luminance[0] / 100;
  }, [luminance]);

  // Calculate lux from luminance percentage
  const luxValue = useMemo(() => {
    return Math.round((luminance[0] / 100) * 6000);
  }, [luminance]);

  // Handle watering
  const handleWatering = useCallback(() => {
    setWatering(true);
    setSoilMoisture([Math.min(100, soilMoisture[0] + 15)]);
    
    setTimeout(() => {
      setWatering(false);
    }, 2000);
  }, [soilMoisture]);

  // Auto-adjust plant health based on conditions
  useEffect(() => {
    const interval = setInterval(() => {
      setPlantHealth(prev => {
        let newHealth = prev;
        
        // Adjust based on light
        if (luminance[0] < 30 || luminance[0] > 90) {
          newHealth = Math.max(60, newHealth - 0.5);
        } else if (luminance[0] >= 60 && luminance[0] <= 80) {
          newHealth = Math.min(95, newHealth + 0.3);
        }
        
        // Adjust based on temperature
        if (temperature[0] < 18 || temperature[0] > 30) {
          newHealth = Math.max(60, newHealth - 0.3);
        } else if (temperature[0] >= 22 && temperature[0] <= 26) {
          newHealth = Math.min(95, newHealth + 0.2);
        }
        
        // Adjust based on soil moisture
        if (soilMoisture[0] < 40 || soilMoisture[0] > 85) {
          newHealth = Math.max(60, newHealth - 0.4);
        } else if (soilMoisture[0] >= 55 && soilMoisture[0] <= 75) {
          newHealth = Math.min(95, newHealth + 0.2);
        }
        
        return Math.round(newHealth * 10) / 10;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [luminance, temperature, soilMoisture]);

  // Auto-growth progression
  useEffect(() => {
    const interval = setInterval(() => {
      if (plantHealth > 80) {
        setGrowthStage(prev => Math.min(5.0, prev + 0.01));
        setLeafCount(prev => Math.min(20, prev + 0.1));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [plantHealth]);

  return (
    <div className="flex min-h-screen">
      <SidebarRail />
      <div className="main-content-with-sidebar flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
              <p className="text-slate-600 text-base">
                Real-time monitoring and control of your medicinal herb growth environment
              </p>
            </div>

            {/* System Status - Clean Horizontal Layout */}
            <div className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 px-6 py-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">Active</span>
              </div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Last Watering</span>
                <span className="text-sm text-slate-600">2h ago</span>
              </div>
              <div className="w-px h-6 bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Next Maintenance</span>
                <span className="text-sm text-slate-600">3 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Plant Pod Display - Left Side (2/3 width) */}
          <div className="xl:col-span-2 space-y-6">
            {/* Plant Pod Card */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-3 mb-2">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                  Ashwagandha Plant Pod
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Growth Stage: {growthStage.toFixed(1)}/5 • Health: {plantHealth}%
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <PlantPod
                  name="Ashwagandha"
                  imageSrc="/plants/Ashwagandha.png"
                  lightIntensity={lightIntensity}
                  isWatering={watering}
                  showWaterButton={false}
                  metrics={{
                    pH: 6.4,
                    soilM: `${soilMoisture[0]}%`,
                    hum: "55%",
                    npk: "7-5-2",
                    lux: `${luxValue} lx`
                  }}
                />
              </CardContent>
            </Card>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Sun className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-800 mb-1">{luminance[0]}%</div>
                  <div className="text-sm text-blue-700 font-medium">Luminance</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Thermometer className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-800 mb-1">{temperature[0]}°C</div>
                  <div className="text-sm text-red-700 font-medium">Temperature</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Droplets className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-800 mb-1">{soilMoisture[0]}%</div>
                  <div className="text-sm text-emerald-700 font-medium">Soil Moisture</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-800 mb-1">{npk[0]}</div>
                  <div className="text-sm text-purple-700 font-medium">NPK Level</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - Control Panel & Info */}
          <div className="space-y-6">
            {/* Plant Health Status */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">Plant Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Overall Health</span>
                  <Badge variant="secondary" className={`${
                    plantHealth >= 90 ? 'bg-green-100 text-green-800' :
                    plantHealth >= 80 ? 'bg-blue-100 text-blue-800' :
                    plantHealth >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {plantHealth}%
                  </Badge>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      plantHealth >= 90 ? 'bg-green-500' :
                      plantHealth >= 80 ? 'bg-blue-500' :
                      plantHealth >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${plantHealth}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Growth Stage</span>
                    <div className="font-medium text-slate-900">{growthStage.toFixed(1)}/5</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Leaf Count</span>
                    <div className="font-medium text-slate-900">{Math.round(leafCount)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pod Controls */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">Pod Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Luminance</label>
                    <Slider
                      value={luminance}
                      onValueChange={setLuminance}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-slate-500 mt-1">{luxValue} lux</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Temperature</label>
                    <Slider
                      value={temperature}
                      onValueChange={setTemperature}
                      max={35}
                      min={15}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="text-xs text-slate-500 mt-1">{temperature[0]}°C</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Soil Moisture</label>
                    <Slider
                      value={soilMoisture}
                      onValueChange={setSoilMoisture}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-slate-500 mt-1">{soilMoisture[0]}%</div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleWatering} 
                  disabled={watering}
                  className="w-full"
                  variant="outline"
                >
                  {watering ? (
                    <>
                      <Droplets className="w-4 h-4 mr-2 animate-pulse" />
                      Watering...
                    </>
                  ) : (
                    <>
                      <Droplets className="w-4 h-4 mr-2" />
                      Water Plant
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
