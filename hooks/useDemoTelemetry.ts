'use client';

import { useState, useEffect, useCallback } from 'react';
import { Telemetry, PlantHealth, EnvironmentalConditions } from '@/types';

export function useDemoTelemetry() {
  const [telemetry, setTelemetry] = useState<Telemetry[]>([
    {
      ts: new Date().toISOString(),
      tempC: 22,
      rh: 65,
      soil: 59,
      ph: 6.4,
      lux: 600,
      pumpPWM: 0,
      ledPWM: 75,
      pod: 'brahmi',
      npk: '3-5-2',
      co2: 400,
      airFlow: 0.3
    }
  ]);
  const [plantHealth, setPlantHealth] = useState<PlantHealth>({
    brahmi: { health: 85, growth: 0.7, stress: 0.1, lastWatered: Date.now() },
    ashwagandha: { health: 78, growth: 0.6, stress: 0.15, lastWatered: Date.now() }
  });
  const [environmentalConditions, setEnvironmentalConditions] = useState<EnvironmentalConditions>({
    temperature: 22,
    humidity: 65,
    lightIntensity: 600,
    co2Level: 400,
    airFlow: 0.3
  });
  const [systemStatus, setSystemStatus] = useState({
    pumpActive: false,
    ledActive: true,
    fanActive: false,
    heaterActive: false,
    lastMaintenance: Date.now() - 7 * 24 * 60 * 60 * 1000 // 7 days ago
  });

  // Realistic plant growth simulation
  const calculatePlantHealth = useCallback((plantType: 'brahmi' | 'ashwagandha', conditions: EnvironmentalConditions) => {
    const optimal = plantType === 'brahmi' ? {
      temp: { min: 22, max: 26, optimal: 24 },
      humidity: { min: 60, max: 80, optimal: 70 },
      light: { min: 400, max: 800, optimal: 600 },
      soil: { min: 55, max: 75, optimal: 65 }
    } : {
      temp: { min: 20, max: 24, optimal: 22 },
      humidity: { min: 55, max: 75, optimal: 65 },
      light: { min: 500, max: 900, optimal: 700 },
      soil: { min: 50, max: 70, optimal: 60 }
    };

    // Calculate individual factor scores (0-1)
    const tempScore = Math.max(0, 1 - Math.abs(conditions.temperature - optimal.temp.optimal) / (optimal.temp.max - optimal.temp.min));
    const humidityScore = Math.max(0, 1 - Math.abs(conditions.humidity - optimal.humidity.optimal) / (optimal.humidity.max - optimal.humidity.min));
    const lightScore = Math.max(0, 1 - Math.abs(conditions.lightIntensity - optimal.light.optimal) / (optimal.light.max - optimal.light.min));
    
    // Weighted health calculation
    const health = (tempScore * 0.3 + humidityScore * 0.25 + lightScore * 0.25 + 0.2) * 100;
    
    return Math.max(0, Math.min(100, health));
  }, []);

  // Dynamic environmental simulation
  const simulateEnvironmentalChanges = useCallback(() => {
    const now = Date.now();
    const timeOfDay = (new Date().getHours() + new Date().getMinutes() / 60) / 24;
    
    // Temperature: follows daily cycle with some randomness
    const baseTemp = 22;
    const dailyVariation = 3 * Math.sin(timeOfDay * 2 * Math.PI);
    const randomVariation = (Math.random() - 0.5) * 2;
    const newTemp = baseTemp + dailyVariation + randomVariation;
    
    // Humidity: inverse relationship with temperature
    const baseHumidity = 70;
    const tempEffect = (newTemp - 22) * -2;
    const randomHumidity = (Math.random() - 0.5) * 10;
    const newHumidity = Math.max(40, Math.min(90, baseHumidity + tempEffect + randomHumidity));
    
    // Light: follows photoperiod with cloud simulation
    const isDaytime = timeOfDay > 0.25 && timeOfDay < 0.75;
    const baseLight = isDaytime ? 800 : 50;
    const cloudCover = Math.random() > 0.7 ? 0.3 : 1; // 30% chance of cloudy conditions
    const newLight = baseLight * cloudCover + (Math.random() - 0.5) * 100;
    
    // CO2: varies with plant activity and ventilation
    const baseCO2 = 400;
    const plantActivity = isDaytime ? 50 : -30;
    const ventilationEffect = systemStatus.fanActive ? -20 : 0;
    const newCO2 = Math.max(350, Math.min(600, baseCO2 + plantActivity + ventilationEffect));
    
    // Air flow: varies with fan status and environmental conditions
    const baseAirFlow = systemStatus.fanActive ? 0.8 : 0.2;
    const windVariation = (Math.random() - 0.5) * 0.3;
    const newAirFlow = Math.max(0, Math.min(1, baseAirFlow + windVariation));

    setEnvironmentalConditions({
      temperature: Math.round(newTemp * 10) / 10,
      humidity: Math.round(newHumidity * 10) / 10,
      lightIntensity: Math.max(0, Math.round(newLight)),
      co2Level: Math.round(newCO2),
      airFlow: Math.round(newAirFlow * 100) / 100
    });
  }, [systemStatus.fanActive]);

  // Plant health evolution
  const updatePlantHealth = useCallback(() => {
    setPlantHealth(prev => {
      const newHealth = { ...prev };
      
      Object.keys(newHealth).forEach(plantKey => {
        const plant = newHealth[plantKey as keyof typeof newHealth];
        const plantType = plantKey as 'brahmi' | 'ashwagandha';
        
        // Calculate current health based on environmental conditions
        const currentHealth = calculatePlantHealth(plantType, environmentalConditions);
        
        // Gradual health change (plants don't change health instantly)
        const healthDiff = currentHealth - plant.health;
        const healthChange = Math.sign(healthDiff) * Math.min(Math.abs(healthDiff), 2); // Max 2% change per update
        
        plant.health = Math.max(0, Math.min(100, plant.health + healthChange));
        
        // Growth simulation
        if (plant.health > 70) {
          plant.growth = Math.min(1, plant.growth + 0.01);
        } else if (plant.health < 50) {
          plant.growth = Math.max(0, plant.growth - 0.005);
        }
        
        // Stress accumulation
        if (plant.health < 60) {
          plant.stress = Math.min(1, plant.stress + 0.02);
        } else {
          plant.stress = Math.max(0, plant.stress - 0.01);
        }
        
        // Watering effect
        const timeSinceWatering = Date.now() - plant.lastWatered;
        const daysSinceWatering = timeSinceWatering / (24 * 60 * 60 * 1000);
        if (daysSinceWatering > 2) {
          plant.health = Math.max(0, plant.health - 1);
        }
      });
      
      return newHealth;
    });
  }, [environmentalConditions, calculatePlantHealth]);

  // Generate realistic telemetry data
  const generateTelemetry = useCallback(() => {
    const now = Date.now();
    const timeOfDay = (new Date().getHours() + new Date().getMinutes() / 60) / 24;
    
    // Soil moisture: decreases over time, increases with watering
    const baseSoilMoisture = 60;
    const timeEffect = Math.sin(timeOfDay * 2 * Math.PI) * 10;
    const wateringEffect = systemStatus.pumpActive ? 20 : 0;
    const randomVariation = (Math.random() - 0.5) * 8;
    const soilMoisture = Math.max(20, Math.min(90, baseSoilMoisture + timeEffect + wateringEffect + randomVariation));
    
    // pH: stable with slight variations
    const basePH = 6.4;
    const phVariation = (Math.random() - 0.5) * 0.4;
    const ph = Math.max(5.5, Math.min(7.5, basePH + phVariation));
    
    // NPK: varies with plant growth and soil conditions
    const baseNPK = { n: 3, p: 5, k: 2 };
    const growthEffect = (plantHealth.brahmi.growth + plantHealth.ashwagandha.growth) / 2;
    const npkVariation = (Math.random() - 0.5) * 0.5;
    const npk = {
      n: Math.max(1, Math.min(5, baseNPK.n + growthEffect + npkVariation)),
      p: Math.max(2, Math.min(7, baseNPK.p + growthEffect + npkVariation)),
      k: Math.max(1, Math.min(4, baseNPK.k + growthEffect + npkVariation))
    };
    
    // Pump and LED status
    const pumpPWM = systemStatus.pumpActive ? 100 : 0;
    const ledPWM = systemStatus.ledActive && timeOfDay > 0.25 && timeOfDay < 0.75 ? 75 : 0;
    
    const newReading: Telemetry = {
      ts: new Date().toISOString(),
      tempC: environmentalConditions.temperature,
      rh: environmentalConditions.humidity,
      soil: Math.round(soilMoisture * 10) / 10,
      ph: Math.round(ph * 10) / 10,
      lux: environmentalConditions.lightIntensity,
      pumpPWM,
      ledPWM,
      pod: Math.random() > 0.5 ? 'brahmi' : 'ashwagandha',
      npk: `${Math.round(npk.n)}-${Math.round(npk.p)}-${Math.round(npk.k)}`,
      co2: environmentalConditions.co2Level,
      airFlow: environmentalConditions.airFlow
    };

    setTelemetry(prev => {
      const updated = [...prev, newReading];
      return updated.length > 2000 ? updated.slice(-2000) : updated;
    });
  }, [environmentalConditions, plantHealth, systemStatus]);

  // System control functions
  const controlSystem = useCallback((action: 'pump' | 'led' | 'fan' | 'heater', value: boolean) => {
    setSystemStatus(prev => ({
      ...prev,
      [action === 'pump' ? 'pumpActive' : action === 'led' ? 'ledActive' : action === 'fan' ? 'fanActive' : 'heaterActive']: value
    }));
  }, []);

  // Water plants
  const waterPlants = useCallback(() => {
    setPlantHealth(prev => {
      const newHealth = { ...prev };
      Object.keys(newHealth).forEach(plantKey => {
        newHealth[plantKey as keyof typeof newHealth].lastWatered = Date.now();
      });
      return newHealth;
    });
    controlSystem('pump', true);
    setTimeout(() => controlSystem('pump', false), 5000); // Water for 5 seconds
  }, [controlSystem]);

  // Maintenance reminder
  const checkMaintenance = useCallback(() => {
    const daysSinceMaintenance = (Date.now() - systemStatus.lastMaintenance) / (24 * 60 * 60 * 1000);
    if (daysSinceMaintenance > 14) { // 2 weeks
      return {
        needed: true,
        days: Math.floor(daysSinceMaintenance),
        tasks: ['Clean sensors', 'Check pH calibration', 'Inspect tubing', 'Replace filters']
      };
    }
    return { needed: false, days: 0, tasks: [] };
  }, [systemStatus.lastMaintenance]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      simulateEnvironmentalChanges();
      updatePlantHealth();
      generateTelemetry();
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [simulateEnvironmentalChanges, updatePlantHealth, generateTelemetry]);

  return {
    telemetry,
    plantHealth,
    environmentalConditions,
    systemStatus,
    controlSystem,
    waterPlants,
    checkMaintenance
  };
}