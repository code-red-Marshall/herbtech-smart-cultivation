'use client';

import { AnimatedPlant } from './AnimatedPlant';
import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Thermometer, Sun, Leaf, Activity } from 'lucide-react';

interface PodTileProps {
  name: string;
}

export function PodTile({ name }: PodTileProps) {
  const { plantHealth, environmentalConditions, telemetry } = useDemoTelemetry();
  
  // Get latest readings for this pod
  const latestReading = telemetry && Array.isArray(telemetry) && telemetry.length > 0
    ? telemetry
        .filter(t => t.pod.toLowerCase() === name.toLowerCase())
        .slice(-1)[0]
    : null;
  
  const soilMoisture = latestReading?.soil || 59;
  const temperature = latestReading?.tempC || 22;
  const humidity = latestReading?.rh || 55;
  const lightIntensity = latestReading?.lux || 3714;

  // Get plant health data
  const plantKey = name.toLowerCase() as 'brahmi' | 'ashwagandha';
  const health = plantHealth[plantKey]?.health || 75;
  const growth = plantHealth[plantKey]?.growth || 0.6;
  const stress = plantHealth[plantKey]?.stress || 0.1;

  // Calculate health status
  const getHealthStatus = (health: number) => {
    if (health >= 80) return { status: 'Excellent', color: 'bg-green-500', textColor: 'text-green-700' };
    if (health >= 60) return { status: 'Good', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    if (health >= 40) return { status: 'Fair', color: 'bg-orange-500', textColor: 'text-orange-700' };
    return { status: 'Poor', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  const healthStatus = getHealthStatus(health);

  return (
    <div className="w-full space-y-6">
      {/* Plant Display Card */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <CardContent className="p-8">
          {/* Header with name and status */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-2">{name}</h3>
              <p className="text-sm text-slate-500 font-medium">Plant Pod #{plantKey === 'brahmi' ? '1' : '2'}</p>
            </div>
            <Badge 
              variant="secondary" 
              className={`${healthStatus.color} ${healthStatus.textColor} border-0 text-white px-4 py-2 text-sm font-medium`}
            >
              {healthStatus.status}
            </Badge>
          </div>
          
          {/* Plant Container */}
          <div className="relative h-48 w-full bg-gradient-to-b from-slate-50 via-blue-50/20 to-indigo-50/20 rounded-2xl overflow-hidden border border-slate-100/50">
            {/* Soil Base */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600 rounded-b-2xl"></div>
            
            {/* Plant */}
            <div className="relative z-10 h-full flex items-end justify-center pb-12">
              <AnimatedPlant
                type={plantKey}
                soilMoisture={soilMoisture}
                temperature={temperature}
                humidity={humidity}
                lightIntensity={lightIntensity}
                className="scale-90"
              />
            </div>
            
            {/* Black Tube */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-14 bg-slate-800 rounded-full opacity-80 shadow-lg"></div>
            </div>

            {/* Health indicator dots */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${health >= 80 ? 'bg-green-500' : health >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <div className={`w-3 h-3 rounded-full ${growth >= 0.8 ? 'bg-green-500' : growth >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            </div>

            {/* Growth indicator */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-200/50 shadow-sm">
              <div className="text-sm font-medium text-slate-700">{Math.round(growth * 100)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Dashboard Card */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Health and Growth Overview */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50/80 to-blue-100/80 rounded-2xl border border-blue-200/50">
                <div className="text-3xl font-light text-blue-900 mb-2">{Math.round(health)}%</div>
                <div className="text-sm text-blue-600 font-medium">Health</div>
                <div className="mt-3">
                  <Progress value={health} className="h-2 bg-blue-100" />
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50/80 to-green-100/80 rounded-2xl border border-green-200/50">
                <div className="text-3xl font-light text-green-900 mb-2">{Math.round(growth * 100)}%</div>
                <div className="text-sm text-green-600 font-medium">Growth</div>
                <div className="mt-3">
                  <Progress value={growth * 100} className="h-2 bg-green-100" />
                </div>
              </div>
            </div>

            {/* Growth Progress */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">Growth Progress</span>
                <span className="text-slate-900 font-medium">{Math.round(growth * 100)}%</span>
              </div>
              <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${growth * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Environmental Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/80 rounded-xl border border-blue-200/50 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center justify-center mb-3">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-xl font-light text-blue-900 mb-1">{Math.round(soilMoisture)}%</div>
                <div className="text-xs text-blue-600 font-medium">Soil</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-red-50/80 to-red-100/80 rounded-xl border border-red-200/50 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center justify-center mb-3">
                  <Thermometer className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-xl font-light text-red-900 mb-1">{Math.round(temperature)}°</div>
                <div className="text-xs text-red-600 font-medium">Temp</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 rounded-xl border border-yellow-200/50 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center justify-center mb-3">
                  <Sun className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-xl font-light text-yellow-900 mb-1">{Math.round(lightIntensity / 100)}k</div>
                <div className="text-xs text-yellow-600 font-medium">Light</div>
              </div>
            </div>

            {/* Stress Indicator */}
            {stress > 0.3 && (
              <div className="flex items-center justify-center gap-3 text-sm text-orange-600 bg-gradient-to-r from-orange-50/80 to-orange-100/80 p-4 rounded-xl border border-orange-200/50">
                <Activity className="w-4 h-4" />
                <span className="font-medium">Stress Level: {Math.round(stress * 100)}%</span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl border border-blue-200/50 transition-colors duration-200 text-sm font-medium hover:shadow-sm">
                <Droplets className="w-4 h-4 mr-2 inline" />
                Water Plant
              </button>
              <button className="p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl border border-green-200/50 transition-colors duration-200 text-sm font-medium hover:shadow-sm">
                <Leaf className="w-4 h-4 mr-2 inline" />
                View Details
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}