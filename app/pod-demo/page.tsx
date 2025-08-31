'use client';

import React, { useState, useEffect } from 'react';
import PlantPod from "@/components/plant-pod/PlantPod";
import "@/components/plant-pod/plant-pod.css";
import { HerbTechLogo } from '@/components/HerbTechLogo';
import { SidebarRail } from '@/components/SidebarRail';

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex">
      {/* Sidebar Navigation */}
      <SidebarRail className="flex-shrink-0" />
      
      {/* Main Content */}
      <main className="flex-1 p-6">
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

             {/* Main Content - Side by Side Layout */}
       <div className="max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
           
           {/* LEFT SIDE - Plant Pod Display */}
           <div className="flex justify-center">
             <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 rounded-3xl p-6 shadow-2xl border-2 border-blue-200/50 w-full max-w-[450px] flex flex-col items-center justify-start relative overflow-hidden">
               {/* Enhanced inner shadow for depth */}
               <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
               {/* Enhanced background pattern */}
               <div className="absolute inset-0 rounded-3xl opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.4)_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none"></div>
               
               {/* Enhanced Header Section */}
               <div className="text-center mb-4 mt-2">
                 <div className="flex items-center justify-center gap-3 mb-2">
                   <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                     <span className="text-xl">🌱</span>
                   </div>
                   <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Ashwagandha Plant</h2>
                 </div>
                 <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-white/30">
                   <span className="text-green-600 font-semibold text-xs">Very Good</span>
                   <span className="text-slate-400">•</span>
                   <span className="text-slate-600 text-xs">Growth: 3.0/5</span>
                   <span className="text-slate-400">•</span>
                   <span className="text-slate-600 text-xs">Health: 87%</span>
                 </div>
               </div>
               
               <PlantPod
                 name="Ashwagandha Plant"
                 imageSrc="/plants/Ashwagandha.png"
                 lightIntensity={lightIntensity}
                 metrics={metrics}
               />
             </div>
           </div>

           {/* RIGHT SIDE - iPhone 16 Pro Style Control Panel */}
           <div className="flex justify-center">
             <div className="bg-black rounded-[3rem] p-2 shadow-2xl border-4 border-gray-800 w-[375px] h-[812px]">
               {/* Phone Notch */}
               <div className="w-32 h-6 bg-black rounded-b-2xl mx-auto mb-2 relative">
                 <div className="absolute inset-0 bg-gray-900 rounded-b-2xl"></div>
                 <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full border border-gray-700"></div>
               </div>
               
               {/* Phone Screen - Scrollable Content */}
               <div className="bg-black rounded-[2.5rem] h-[750px] overflow-hidden">
                 {/* Scrollable Content Container */}
                 <div className="h-full overflow-y-auto scrollbar-hide">
                   <div className="p-4">
                     {/* Screen Header */}
                     <div className="text-center mb-4">
                       <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                         <span className="text-2xl">🌱</span>
                       </div>
                       <h2 className="text-lg font-bold text-blue-400 mb-1">Plant Controls</h2>
                       <p className="text-blue-300 text-xs">Advanced Pod Management</p>
                     </div>

                     {/* Main Control Panel - Compact Design */}
                     <div className="space-y-3">
                       {/* Light Intensity Control */}
                       <div className="space-y-2 p-3 bg-gray-900/50 rounded-xl border border-blue-500/30 hover:bg-gray-800/50 transition-all duration-200">
                         <label className="block text-xs font-semibold text-blue-300">
                           💡 Light: {Math.round(lightIntensity * 100)}%
                         </label>
                         <input
                           type="range"
                           min="0"
                           max="1"
                           step="0.01"
                           value={lightIntensity}
                           onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                           className="w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg appearance-none cursor-pointer slider"
                         />
                         <div className="text-xs text-blue-400/70 flex justify-between">
                           <span>🌙</span>
                           <span>✨</span>
                           <span>☀️</span>
                         </div>
                       </div>

                                               {/* Moisture Control */}
                        <div className="space-y-2 p-3 bg-gray-900/50 rounded-xl border border-blue-500/30 hover:bg-gray-800/50 transition-all duration-200">
                          <label className="block text-xs font-semibold text-blue-300">
                            💧 Moisture: {plantHealth}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={plantHealth}
                            onChange={(e) => setPlantHealth(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="text-xs text-blue-400/70 flex justify-between">
                            <span>🌵</span>
                            <span>💧</span>
                            <span>🌊</span>
                          </div>
                        </div>

                        {/* Temperature Control */}
                        <div className="space-y-2 p-3 bg-gray-900/50 rounded-xl border border-blue-500/30 hover:bg-gray-800/50 transition-all duration-200">
                          <label className="block text-xs font-semibold text-blue-300">
                            🌡️ Temperature: {growthStage}°C
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={growthStage}
                            onChange={(e) => setGrowthStage(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="text-xs text-blue-400/70 flex justify-between">
                            <span>❄️</span>
                            <span>🌡️</span>
                            <span>🔥</span>
                          </div>
                        </div>

                       {/* Environmental Stress Control */}
                       <div className="space-y-2 p-3 bg-gray-900/50 rounded-xl border border-blue-500/30 hover:bg-gray-800/50 transition-all duration-200">
                         <label className="block text-xs font-semibold text-blue-300">
                           🌪️ Stress: {Math.round(environmentalStress * 100)}%
                         </label>
                         <input
                           type="range"
                           min="0"
                           max="1"
                           step="0.01"
                           value={environmentalStress}
                           onChange={(e) => setEnvironmentalStress(parseFloat(e.target.value))}
                           className="w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg appearance-none cursor-pointer slider"
                         />
                         <div className="text-xs text-blue-400/70 flex justify-between">
                           <span>🟢</span>
                           <span>🟡</span>
                           <span>🔴</span>
                         </div>
                       </div>
                     </div>

                     {/* Real-time Status Indicators - Compact Grid */}
                     <div className="mt-4">
                       <h3 className="text-sm font-bold text-blue-400 text-center mb-3">Status</h3>
                       <div className="grid grid-cols-2 gap-2">
                         <div className="text-center p-2 bg-gray-900/50 rounded-lg border border-blue-500/30">
                           <div className="text-lg">🌱</div>
                           <div className="text-xs text-blue-300">Status</div>
                           <div className="text-xs font-bold text-blue-400">
                             {plantHealth >= 80 ? 'Excellent' : plantHealth >= 60 ? 'Good' : 'Needs Care'}
                           </div>
                         </div>
                         
                         <div className="text-center p-2 bg-gray-900/50 rounded-lg border border-blue-500/30">
                           <div className="text-lg">💧</div>
                           <div className="text-xs text-blue-300">Moisture</div>
                           <div className="text-xs font-bold text-blue-400">{metrics.soilM}</div>
                         </div>
                         
                         <div className="text-center p-2 bg-gray-900/50 rounded-lg border border-blue-500/30">
                           <div className="text-lg">🌡️</div>
                           <div className="text-xs text-blue-300">pH</div>
                           <div className="text-xs font-bold text-blue-400">{metrics.pH}</div>
                         </div>
                         
                         <div className="text-center p-2 bg-gray-900/50 rounded-lg border border-blue-500/30">
                           <div className="text-lg">🌺</div>
                           <div className="text-xs text-blue-300">Stage</div>
                           <div className="text-xs font-bold text-blue-400">
                             {growthStage >= 80 ? 'Blooming' : growthStage >= 50 ? 'Growing' : 'Seedling'}
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Additional Metrics Row */}
                     <div className="mt-3 p-2 bg-gray-900/50 rounded-lg border border-blue-500/30">
                       <div className="grid grid-cols-3 gap-2 text-center">
                         <div>
                           <div className="text-xs text-blue-300">Humidity</div>
                           <div className="text-xs font-bold text-blue-400">{metrics.hum}</div>
                         </div>
                         <div>
                           <div className="text-xs text-blue-300">NPK</div>
                           <div className="text-xs font-bold text-blue-400">{metrics.npk}</div>
                         </div>
                         <div>
                           <div className="text-xs text-blue-300">Lux</div>
                           <div className="text-xs font-bold text-blue-400">{metrics.lux}</div>
                         </div>
                       </div>
                     </div>

                     {/* Extra Content to Demonstrate Scrolling */}
                     <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-blue-500/30">
                       <h4 className="text-sm font-bold text-blue-400 text-center mb-2">System Info</h4>
                       <div className="space-y-1 text-xs text-blue-300">
                         <div className="flex justify-between">
                           <span>Firmware:</span>
                           <span className="text-blue-400">v2.1.4</span>
                         </div>
                         <div className="flex justify-between">
                           <span>Uptime:</span>
                           <span className="text-blue-400">72h 34m</span>
                         </div>
                         <div className="flex justify-between">
                           <span>Last Update:</span>
                           <span className="text-blue-400">2h ago</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
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
      </div>
    );
}
