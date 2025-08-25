'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  Droplets, 
  Sun, 
  Wind, 
  Flame, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Activity,
  Zap,
  Gauge
} from 'lucide-react';
import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';

interface ControlButtonsProps {
  isLoggedIn: boolean;
}

export function ControlButtons({ isLoggedIn }: ControlButtonsProps) {
  const { 
    plantHealth, 
    environmentalConditions, 
    systemStatus, 
    controlSystem,
    waterPlants,
    checkMaintenance 
  } = useDemoTelemetry();

  const [isWatering, setIsWatering] = useState(false);
  const [isLighting, setIsLighting] = useState(false);
  const [isVentilating, setIsVentilating] = useState(false);
  const [isHeating, setIsHeating] = useState(false);

  const handleWaterPlants = async () => {
    if (!isLoggedIn) return;
    setIsWatering(true);
    await waterPlants();
    setTimeout(() => setIsWatering(false), 2000);
  };

  const handleToggleLight = async () => {
    if (!isLoggedIn) return;
    setIsLighting(true);
    await controlSystem('led', !systemStatus.ledActive);
    setTimeout(() => setIsLighting(false), 1000);
  };

  const handleToggleFan = async () => {
    if (!isLoggedIn) return;
    setIsVentilating(true);
    await controlSystem('fan', !systemStatus.fanActive);
    setTimeout(() => setIsVentilating(false), 1000);
  };

  const handleToggleHeater = async () => {
    if (!isLoggedIn) return;
    setIsHeating(true);
    await controlSystem('heater', !systemStatus.heaterActive);
    setTimeout(() => setIsHeating(false), 1000);
  };

  const maintenance = checkMaintenance();
  const hasMaintenanceAlerts = maintenance.needed;

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-light text-slate-900">System Controls</CardTitle>
        <CardDescription className="text-slate-600 text-base mt-2">
          Manual control and system monitoring
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* System Status Overview */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-slate-900 mb-4">System Status</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${systemStatus.ledActive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></div>
                <span className="text-sm font-medium text-slate-700">Grow Light</span>
              </div>
              <Badge variant={systemStatus.ledActive ? "default" : "secondary"} className="px-3 py-1">
                {systemStatus.ledActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${systemStatus.pumpActive ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'}`}></div>
                <span className="text-sm font-medium text-slate-700">Water Pump</span>
              </div>
              <Badge variant={systemStatus.pumpActive ? "default" : "secondary"} className="px-3 py-1">
                {systemStatus.pumpActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${systemStatus.fanActive ? 'bg-purple-500 animate-pulse' : 'bg-slate-400'}`}></div>
                <span className="text-sm font-medium text-slate-700">Ventilation</span>
              </div>
              <Badge variant={systemStatus.fanActive ? "default" : "secondary"} className="px-3 py-1">
                {systemStatus.fanActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${systemStatus.heaterActive ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`}></div>
                <span className="text-sm font-medium text-slate-700">Heater</span>
              </div>
              <Badge variant={systemStatus.heaterActive ? "default" : "secondary"} className="px-3 py-1">
                {systemStatus.heaterActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-slate-900 mb-4">Manual Controls</h4>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleWaterPlants}
              disabled={!isLoggedIn || isWatering}
              variant="outline"
              className="h-12 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl transition-all duration-200"
            >
              <Droplets className="w-4 h-4 mr-2" />
              {isWatering ? 'Watering...' : 'Water Plants'}
            </Button>
            
            <Button
              onClick={handleToggleLight}
              disabled={!isLoggedIn || isLighting}
              variant="outline"
              className="h-12 border-yellow-200 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-300 rounded-xl transition-all duration-200"
            >
              <Sun className="w-4 h-4 mr-2" />
              {isLighting ? 'Toggling...' : (systemStatus.ledActive ? 'Turn Off' : 'Turn On')}
            </Button>
            
            <Button
              onClick={handleToggleFan}
              disabled={!isLoggedIn || isVentilating}
              variant="outline"
              className="h-12 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 rounded-xl transition-all duration-200"
            >
              <Wind className="w-4 h-4 mr-2" />
              {isVentilating ? 'Toggling...' : (systemStatus.fanActive ? 'Turn Off' : 'Turn On')}
            </Button>
            
            <Button
              onClick={handleToggleHeater}
              disabled={!isLoggedIn || isHeating}
              variant="outline"
              className="h-12 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-xl transition-all duration-200"
            >
              <Flame className="w-4 h-4 mr-2" />
              {isHeating ? 'Toggling...' : (systemStatus.heaterActive ? 'Turn Off' : 'Turn On')}
            </Button>
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-slate-900 mb-4">Smart Recommendations</h4>
          <div className="space-y-3">
            {environmentalConditions.temperature < 20 && (
              <Alert className="border-orange-200 bg-orange-50/50">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <AlertDescription className="text-orange-700">
                  Temperature is below optimal range. Consider activating the heater.
                </AlertDescription>
              </Alert>
            )}
            
            {environmentalConditions.humidity < 55 && (
              <Alert className="border-blue-200 bg-blue-50/50">
                <Droplets className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Humidity is low. Consider increasing watering frequency.
                </AlertDescription>
              </Alert>
            )}
            
            {environmentalConditions.co2Level > 600 && (
              <Alert className="border-purple-200 bg-purple-50/50">
                <Wind className="w-4 h-4 text-purple-600" />
                <AlertDescription className="text-purple-700">
                  CO₂ levels are high. Ventilation fan recommended.
                </AlertDescription>
              </Alert>
            )}
            
            {!hasMaintenanceAlerts && (
              <Alert className="border-green-200 bg-green-50/50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  All systems are operating within optimal parameters.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Maintenance Alerts */}
        {hasMaintenanceAlerts && (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-slate-900 mb-4">Maintenance Required</h4>
            <div className="space-y-3">
              <Alert className="border-red-200 bg-red-50/50">
                <Clock className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  Maintenance overdue by {maintenance.days} days. Required tasks: {maintenance.tasks.join(', ')}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}

        {/* System Performance */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-slate-900 mb-4">Performance Metrics</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">System Efficiency</span>
                <span className="text-slate-900 font-medium">
                  {Math.round(
                    ((plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2) * 0.6 +
                    (systemStatus.ledActive ? 20 : 0) +
                    (systemStatus.pumpActive ? 10 : 0) +
                    (systemStatus.fanActive ? 10 : 0)
                  )}%
                </span>
              </div>
              <Progress 
                value={
                  ((plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2) * 0.6 +
                  (systemStatus.ledActive ? 20 : 0) +
                  (systemStatus.pumpActive ? 10 : 0) +
                  (systemStatus.fanActive ? 10 : 0)
                } 
                className="h-2 bg-slate-100" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">Plant Health Average</span>
                <span className="text-slate-900 font-medium">
                  {Math.round((plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2)}%
                </span>
              </div>
              <Progress 
                value={(plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2} 
                className="h-2 bg-slate-100" 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}