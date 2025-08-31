'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PlantPodProps {
  name: string;
  imageSrc: string;
  lightIntensity: number;
  metrics: {
    pH: number | string;
    soilM: string;
    hum: string;
    npk: string;
    lux: string;
  };
}

// PlantPod Component - Plant Roots Connected to Soil with Synchronized Tint
export default function PlantPod({ name, imageSrc, lightIntensity, metrics }: PlantPodProps) {
  const [isWatering, setIsWatering] = useState(false);

  const handleWatering = () => {
    setIsWatering(true);
    // Reset watering state after animation completes
    setTimeout(() => setIsWatering(false), 3000);
  };

  return (
    <div className="plant-pod-container">
      {/* Pod Canopy - Dark grey rounded rectangle */}
      <div className="pod-canopy">
        <div className="canopy-glow" data-light-intensity={lightIntensity.toFixed(1)}></div>
      </div>
      
      {/* Plant and Soil Container */}
      <div className="plant-soil-container">
        {/* Plant Image - Positioned so roots connect to soil */}
        <div 
          className={`plant-image-container ${isWatering ? 'watering' : ''}`}
          data-light-intensity={lightIntensity.toFixed(1)}
        >
          <Image
            src={imageSrc}
            alt={name}
            width={200}
            height={300}
            className="plant-image"
            priority
          />
          
          {/* Water Drop Animation */}
          {isWatering && (
            <>
              <div className="water-drop water-drop-1"></div>
              <div className="water-drop water-drop-2"></div>
              <div className="water-drop water-drop-3"></div>
            </>
          )}
        </div>
        
        {/* Soil Tub - Where roots are embedded */}
        <div className={`soil-tub ${isWatering ? 'watering' : ''}`}>
          <div className="soil-texture"></div>
          
          {/* Soil Moisture Effect */}
          {isWatering && <div className="soil-moisture-effect"></div>}
        </div>
      </div>
      
      {/* Watering Button */}
      <button 
        className="watering-button"
        onClick={handleWatering}
        disabled={isWatering}
      >
        {isWatering ? '💧 Watering...' : '💧 Water Plant'}
      </button>
    </div>
  );
}
