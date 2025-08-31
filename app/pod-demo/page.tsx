'use client';

import React, { useState, useEffect } from 'react';
import PlantPod from "@/components/plant-pod/PlantPod";
import "@/components/plant-pod/plant-pod.css";
import { HerbTechLogo } from '@/components/HerbTechLogo';

export default function PodDemoPage() {
  // Advanced plant control states
  const [lightIntensity, setLightIntensity] = useState(0.75);
  const [plantHealth, setPlantHealth] = useState(85);
  const [growthStage, setGrowthStage] = useState(65);
  const [environmentalStress, setEnvironmentalStress] = useState(0.1);
  
  // Dynamic metrics based on controls
  const [metrics, setMetrics] = useState({
    pH: 6.4,
    soilM: "65%",
    hum: "72%",
    npk: "3-5-2",
    lux: "4500 lx"
  });

  // Update metrics based on light intensity
  useEffect(() => {
    const lux = Math.round(lightIntensity * 6000);
    const pH = 6.4 + (lightIntensity - 0.75) * 0.8;
    const soilM = Math.max(30, Math.min(90, 65 + (lightIntensity - 0.75) * 40));
    const hum = Math.max(50, Math.min(85, 72 + (lightIntensity - 0.75) * 20));
    
    setMetrics({
      pH: Math.round(pH * 10) / 10,
      soilM: `${Math.round(soilM)}%`,
      hum: `${Math.round(hum)}%`,
      npk: "3-5-2",
      lux: `${lux} lx`
    });
  }, [lightIntensity]);

  // Simulate environmental changes
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironmentalStress(prev => {
        const newStress = prev + (Math.random() - 0.5) * 0.1;
        return Math.max(0, Math.min(1, newStress));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      {/* Enhanced Header Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 mb-4">
            <HerbTechLogo size="md" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Plant Pod Demo
            </h1>
          </div>
          <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">
            Experience the interactive plant pod with advanced controls and watering animations
          </p>
        </div>
      </div>

      {/* Enhanced Plant Pod Display */}
      <div className="flex justify-center mb-8">
        <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 rounded-3xl p-8 shadow-2xl border-2 border-blue-200/50 min-w-[600px] min-h-[500px] flex flex-col items-center justify-start relative overflow-hidden">
          {/* Enhanced inner shadow for depth */}
          <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
          {/* Enhanced background pattern */}
          <div className="absolute inset-0 rounded-3xl opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.4)_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none"></div>
          
          {/* Enhanced Header Section */}
          <div className="text-center mb-6 mt-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🌱</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">GenA Plant</h2>
            </div>
            <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-white/30">
              <span className="text-green-600 font-semibold text-sm">Very Good</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 text-sm">Growth Stage: 3.0/5</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 text-sm">Health: 87%</span>
            </div>
          </div>
          
          <PlantPod
            name="GenA Plant"
            imageSrc="/plants/GenA.png"
            lightIntensity={lightIntensity}
            metrics={metrics}
          />
        </div>
      </div>

      {/* Advanced Control Panel - Moved to Bottom */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Advanced Control Panel</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Light Intensity Control */}
            <div className="space-y-3 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200">
              <label className="block text-sm font-semibold text-slate-700">
                💡 Light Intensity: {Math.round(lightIntensity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>🌙 Low</span>
                  <span>✨ Optimal</span>
                  <span>☀️ High</span>
                </div>
                {lightIntensity >= 0.9 && (
                  <div className="text-center p-2 rounded-lg bg-gradient-to-r from-yellow-200 to-orange-200 text-yellow-800 font-medium">
                    🌟 Maximum Intensity - Golden Glow
                  </div>
                )}
              </div>
            </div>

            {/* Plant Health Control */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                🩺 Plant Health: {plantHealth}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={plantHealth}
                onChange={(e) => setPlantHealth(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>🔴 Poor</span>
                  <span>🟡 Fair</span>
                  <span>🟢 Excellent</span>
                </div>
              </div>
            </div>

            {/* Growth Stage Control */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                🌿 Growth Stage: {growthStage}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={growthStage}
                onChange={(e) => setGrowthStage(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>🌱 Seedling</span>
                  <span>🌿 Growing</span>
                  <span>🌸 Blooming</span>
                </div>
              </div>
            </div>

            {/* Environmental Stress Control */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                🌪️ Environmental Stress: {Math.round(environmentalStress * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={environmentalStress}
                onChange={(e) => setEnvironmentalStress(parseFloat(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>🟢 Low</span>
                  <span>🟡 Medium</span>
                  <span>🔴 High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Status Indicators */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-100 rounded-lg border border-green-200">
              <div className="text-2xl">🌱</div>
              <div className="text-sm font-medium text-green-800">Plant Status</div>
              <div className="text-lg font-bold text-green-900">
                {plantHealth >= 80 ? 'Excellent' : plantHealth >= 60 ? 'Good' : 'Needs Care'}
              </div>
            </div>
            
            <div className="text-center p-3 bg-blue-100 rounded-lg border border-blue-200">
              <div className="text-2xl">💧</div>
              <div className="text-sm font-medium text-blue-800">Soil Moisture</div>
              <div className="text-lg font-bold text-blue-900">{metrics.soilM}</div>
            </div>
            
            <div className="text-center p-3 bg-yellow-100 rounded-lg border border-yellow-200">
              <div className="text-2xl">🌡️</div>
              <div className="text-sm font-medium text-yellow-800">pH Level</div>
              <div className="text-lg font-bold text-yellow-900">{metrics.pH}</div>
            </div>
            
            <div className="text-center p-3 bg-purple-100 rounded-lg border border-purple-200">
              <div className="text-2xl">🌺</div>
              <div className="text-sm font-medium text-purple-800">Growth Stage</div>
              <div className="text-lg font-bold text-purple-900">
                {growthStage >= 80 ? 'Blooming' : growthStage >= 50 ? 'Growing' : 'Seedling'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(145deg, #ffffff, #e6e6e6);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
          border: 2px solid #cbd5e1;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(145deg, #ffffff, #e6e6e6);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
          border: 2px solid #cbd5e1;
        }
      `}</style>
    </main>
  );
}
