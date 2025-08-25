export interface Telemetry {
  ts: string;
  tempC: number;
  rh: number;
  soil: number;
  ph?: number;
  lux: number;
  pumpPWM: number;
  ledPWM: number;
  pod: string;
  npk?: string;
  co2?: number;
  airFlow?: number;
}

export interface PlantHealthData {
  health: number;
  growth: number;
  stress: number;
  lastWatered: number;
}

export interface PlantHealth {
  brahmi: PlantHealthData;
  ashwagandha: PlantHealthData;
}

export interface EnvironmentalConditions {
  temperature: number;
  humidity: number;
  lightIntensity: number;
  co2Level: number;
  airFlow: number;
}

export interface SystemStatus {
  pumpActive: boolean;
  ledActive: boolean;
  fanActive: boolean;
  heaterActive: boolean;
  lastMaintenance: number;
}

export interface Settings {
  photoperiodHours: number;
  soilMin: number;
  soilMax: number;
  ledPWM: number;
  wateringMs: number;
  targetTemp: number;
  targetHumidity: number;
  targetCO2: number;
  autoWatering: boolean;
  autoLighting: boolean;
  autoVentilation: boolean;
}

export interface Pod {
  id: string;
  name: string;
  photoSrc: string;
}

export interface MaintenanceTask {
  needed: boolean;
  days: number;
  tasks: string[];
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  timestamp: number;
  acknowledged: boolean;
}

export interface PlantRecommendation {
  plantType: 'brahmi' | 'ashwagandha';
  action: 'water' | 'fertilize' | 'adjust_light' | 'adjust_temp' | 'adjust_humidity';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  suggestedValue?: number;
}