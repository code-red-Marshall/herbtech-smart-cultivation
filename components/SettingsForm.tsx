'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Sun, 
  Droplets, 
  Thermometer, 
  Fan, 
  Zap, 
  Save, 
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';
import { Settings as SettingsType } from '@/types';

export function SettingsForm() {
  const { 
    environmentalConditions, 
    systemStatus, 
    plantHealth,
    controlSystem,
    checkMaintenance 
  } = useDemoTelemetry();

  const [settings, setSettings] = useState<SettingsType>({
    photoperiodHours: 16,
    soilMin: 50,
    soilMax: 70,
    ledPWM: 75,
    wateringMs: 5000,
    targetTemp: 22,
    targetHumidity: 65,
    targetCO2: 450,
    autoWatering: true,
    autoLighting: true,
    autoVentilation: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const maintenance = checkMaintenance();

  // Check for changes
  useEffect(() => {
    const hasUnsavedChanges = Object.keys(settings).some(key => {
      const currentValue = settings[key as keyof SettingsType];
      // Add logic to compare with current system state
      return false; // Placeholder
    });
    setHasChanges(hasUnsavedChanges);
  }, [settings]);

  const handleSettingChange = (key: keyof SettingsType, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    setLastSaved(new Date());
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleReset = () => {
    setSettings({
      photoperiodHours: 16,
      soilMin: 50,
      soilMax: 70,
      ledPWM: 75,
      wateringMs: 5000,
      targetTemp: 22,
      targetHumidity: 65,
      targetCO2: 450,
      autoWatering: true,
      autoLighting: true,
      autoVentilation: true
    });
    setHasChanges(false);
  };

  const getSystemStatusColor = (status: boolean) => {
    return status ? 'bg-green-500' : 'bg-gray-400';
  };

  const getEnvironmentalStatus = (current: number, target: number, tolerance: number = 2) => {
    const diff = Math.abs(current - target);
    if (diff <= tolerance) return { status: 'Optimal', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (diff <= tolerance * 2) return { status: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { status: 'Needs Attention', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-2">Configure your smart garden system</p>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? "Cancel" : "Edit Settings"}
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            System Overview
          </CardTitle>
          <CardDescription>Current system status and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((plantHealth.brahmi.health + plantHealth.ashwagandha.health) / 2)}%
              </div>
              <div className="text-sm text-blue-600">Avg Plant Health</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {systemStatus.ledActive ? 'ON' : 'OFF'}
              </div>
              <div className="text-sm text-green-600">LED Status</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {systemStatus.pumpActive ? 'ACTIVE' : 'IDLE'}
              </div>
              <div className="text-sm text-purple-600">Pump Status</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {systemStatus.fanActive ? 'RUNNING' : 'STOPPED'}
              </div>
              <div className="text-sm text-orange-600">Fan Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            Environmental Targets
          </CardTitle>
          <CardDescription>Set optimal conditions for your plants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Temperature */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="targetTemp">Target Temperature</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Current: {environmentalConditions.temperature}°C</span>
                <Badge variant={getEnvironmentalStatus(environmentalConditions.temperature, settings.targetTemp).bgColor.includes('green') ? 'default' : 'destructive'}>
                  {getEnvironmentalStatus(environmentalConditions.temperature, settings.targetTemp).status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="targetTemp"
                min={18}
                max={30}
                step={0.5}
                value={[settings.targetTemp]}
                onValueChange={([value]) => handleSettingChange('targetTemp', value)}
                disabled={!isEditing}
                className="flex-1"
              />
              <Input
                type="number"
                value={settings.targetTemp}
                onChange={(e) => handleSettingChange('targetTemp', parseFloat(e.target.value))}
                disabled={!isEditing}
                className="w-20"
                min="18"
                max="30"
                step="0.5"
              />
              <span className="text-sm text-gray-500">°C</span>
            </div>
          </div>

          {/* Humidity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="targetHumidity">Target Humidity</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Current: {environmentalConditions.humidity}%</span>
                <Badge variant={getEnvironmentalStatus(environmentalConditions.humidity, settings.targetHumidity).bgColor.includes('green') ? 'default' : 'destructive'}>
                  {getEnvironmentalStatus(environmentalConditions.humidity, settings.targetHumidity).status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="targetHumidity"
                min={40}
                max={90}
                step={1}
                value={[settings.targetHumidity]}
                onValueChange={([value]) => handleSettingChange('targetHumidity', value)}
                disabled={!isEditing}
                className="flex-1"
              />
              <Input
                type="number"
                value={settings.targetHumidity}
                onChange={(e) => handleSettingChange('targetHumidity', parseInt(e.target.value))}
                disabled={!isEditing}
                className="w-20"
                min="40"
                max="90"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </div>

          {/* CO2 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="targetCO2">Target CO₂ Level</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Current: {environmentalConditions.co2Level} ppm</span>
                <Badge variant={getEnvironmentalStatus(environmentalConditions.co2Level, settings.targetCO2, 50).bgColor.includes('green') ? 'default' : 'destructive'}>
                  {getEnvironmentalStatus(environmentalConditions.co2Level, settings.targetCO2, 50).status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="targetCO2"
                min={300}
                max={800}
                step={10}
                value={[settings.targetCO2]}
                onValueChange={([value]) => handleSettingChange('targetCO2', value)}
                disabled={!isEditing}
                className="flex-1"
              />
              <Input
                type="number"
                value={settings.targetCO2}
                onChange={(e) => handleSettingChange('targetCO2', parseInt(e.target.value))}
                disabled={!isEditing}
                className="w-20"
                min="300"
                max="800"
                step="10"
              />
              <span className="text-sm text-gray-500">ppm</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lighting & Watering */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Lighting & Watering
          </CardTitle>
          <CardDescription>Configure photoperiod and irrigation settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Photoperiod */}
          <div className="space-y-3">
            <Label htmlFor="photoperiodHours">Photoperiod (Hours of Light)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="photoperiodHours"
                min={8}
                max={24}
                step={1}
                value={[settings.photoperiodHours]}
                onValueChange={([value]) => handleSettingChange('photoperiodHours', value)}
                disabled={!isEditing}
                className="flex-1"
              />
              <Input
                type="number"
                value={settings.photoperiodHours}
                onChange={(e) => handleSettingChange('photoperiodHours', parseInt(e.target.value))}
                disabled={!isEditing}
                className="w-20"
                min="8"
                max="24"
              />
              <span className="text-sm text-gray-500">hours</span>
            </div>
          </div>

          {/* LED Intensity */}
          <div className="space-y-3">
            <Label htmlFor="ledPWM">LED Intensity</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="ledPWM"
                min={0}
                max={100}
                step={5}
                value={[settings.ledPWM]}
                onValueChange={([value]) => handleSettingChange('ledPWM', value)}
                disabled={!isEditing}
                className="flex-1"
              />
              <Input
                type="number"
                value={settings.ledPWM}
                onChange={(e) => handleSettingChange('ledPWM', parseInt(e.target.value))}
                disabled={!isEditing}
                className="w-20"
                min="0"
                max="100"
                step="5"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </div>

          {/* Watering Duration */}
          <div className="space-y-3">
            <Label htmlFor="wateringMs">Watering Duration</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="wateringMs"
                min={1000}
                max={10000}
                step={500}
                value={[settings.wateringMs]}
                onValueChange={([value]) => handleSettingChange('wateringMs', value)}
                disabled={!isEditing}
                className="flex-1"
              />
              <Input
                type="number"
                value={settings.wateringMs}
                onChange={(e) => handleSettingChange('wateringMs', parseInt(e.target.value))}
                disabled={!isEditing}
                className="w-20"
                min="1000"
                max="10000"
                step="500"
              />
              <span className="text-sm text-gray-500">ms</span>
            </div>
          </div>

          {/* Soil Moisture Range */}
          <div className="space-y-3">
            <Label>Soil Moisture Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilMin" className="text-sm">Minimum</Label>
                <Input
                  id="soilMin"
                  type="number"
                  value={settings.soilMin}
                  onChange={(e) => handleSettingChange('soilMin', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full"
                  min="20"
                  max="80"
                />
              </div>
              <div>
                <Label htmlFor="soilMax" className="text-sm">Maximum</Label>
                <Input
                  id="soilMax"
                  type="number"
                  value={settings.soilMax}
                  onChange={(e) => handleSettingChange('soilMax', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full"
                  min="20"
                  max="80"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Automation Settings
          </CardTitle>
          <CardDescription>Enable or disable automatic system control</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="autoWatering">Automatic Watering</Label>
              <p className="text-sm text-gray-500">Automatically water plants based on soil moisture</p>
            </div>
            <Switch
              id="autoWatering"
              checked={settings.autoWatering}
              onCheckedChange={(checked) => handleSettingChange('autoWatering', checked)}
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="autoLighting">Automatic Lighting</Label>
              <p className="text-sm text-gray-500">Automatically control LED lights based on photoperiod</p>
            </div>
            <Switch
              id="autoLighting"
              checked={settings.autoLighting}
              onCheckedChange={(checked) => handleSettingChange('autoLighting', checked)}
              disabled={!isEditing}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="autoVentilation">Automatic Ventilation</Label>
              <p className="text-sm text-gray-500">Automatically control fans based on temperature and humidity</p>
            </div>
            <Switch
              id="autoVentilation"
              checked={settings.autoVentilation}
              onCheckedChange={(checked) => handleSettingChange('autoVentilation', checked)}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Alerts */}
      {maintenance.needed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
              Maintenance Required
            </CardTitle>
            <CardDescription>System maintenance is overdue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="font-medium text-amber-800 mb-2">
                Maintenance overdue by {maintenance.days} days
              </div>
              <div className="text-sm text-amber-700">
                <div className="font-medium mb-2">Required tasks:</div>
                <ul className="list-disc list-inside space-y-1">
                  {maintenance.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center justify-end gap-3">
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}