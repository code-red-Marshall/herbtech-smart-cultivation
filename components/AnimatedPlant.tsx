'use client';

import { useState, useEffect, useMemo } from 'react';
import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';

interface AnimatedPlantProps {
  type: 'brahmi' | 'ashwagandha';
  soilMoisture: number;
  temperature: number;
  humidity: number;
  lightIntensity: number;
  className?: string;
}

export function AnimatedPlant({ 
  type, 
  soilMoisture, 
  temperature, 
  humidity, 
  lightIntensity,
  className = "" 
}: AnimatedPlantProps) {
  const [isGrowing, setIsGrowing] = useState(true);
  const { plantHealth } = useDemoTelemetry();
  
  // Get current plant health data
  const currentHealth = plantHealth[type];
  const health = currentHealth?.health || 75;
  const growth = currentHealth?.growth || 0.6;
  const stress = currentHealth?.stress || 0.1;
  
  // Calculate plant health based on optimal conditions
  const plantHealthScore = useMemo(() => {
    const optimal = type === 'brahmi' ? {
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
    
    const soilScore = 1 - Math.abs(soilMoisture - optimal.soil.optimal) / 50;
    const tempScore = 1 - Math.abs(temperature - optimal.temp.optimal) / 10;
    const humidityScore = 1 - Math.abs(humidity - optimal.humidity.optimal) / 30;
    const lightScore = Math.min(lightIntensity / optimal.light.optimal, 1);
    
    return Math.max(0.3, (soilScore + tempScore + humidityScore + lightScore) / 4);
  }, [type, soilMoisture, temperature, humidity, lightIntensity]);

  // Calculate growth scale based on health and growth stage
  const growthScale = 0.4 + (health / 100) * 0.8;
  
  // Dynamic colors based on health
  const getPlantColors = () => {
    if (health >= 80) {
      return {
        leafColor: '#22c55e', // Vibrant green
        stemColor: '#16a34a', // Dark green
        veinColor: '#15803d'  // Dark green
      };
    } else if (health >= 60) {
      return {
        leafColor: '#84cc16', // Lime green
        stemColor: '#65a30d', // Dark lime
        veinColor: '#4d7c0f'  // Dark lime
      };
    } else if (health >= 40) {
      return {
        leafColor: '#eab308', // Yellow
        stemColor: '#ca8a04', // Dark yellow
        veinColor: '#a16207'  // Dark yellow
      };
    } else {
      return {
        leafColor: '#ef4444', // Red
        stemColor: '#dc2626', // Dark red
        veinColor: '#b91c1c'  // Dark red
      };
    }
  };

  const colors = getPlantColors();

  // Growth animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGrowing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Animation intensity based on health
  const getAnimationIntensity = () => {
    if (health >= 80) return 'normal';
    if (health >= 60) return 'reduced';
    return 'minimal';
  };

  const animationIntensity = getAnimationIntensity();

  if (type === 'brahmi') {
    return (
      <div className={`relative ${className}`} style={{ 
        transform: `scale(${growthScale})`,
        animation: isGrowing ? 'plantGrow 2s ease-out forwards' : 'none'
      }}>
        {/* Brahmi plant - bushy with small round leaves */}
        <svg width="100" height="120" viewBox="0 0 100 120" className="drop-shadow-sm">
          {/* Main stem */}
          <path
            d="M50 120 Q48 100 50 80 Q52 60 50 40 Q49 20 50 15"
            stroke={colors.stemColor}
            strokeWidth="3"
            fill="none"
            className="origin-bottom"
            strokeLinecap="round"
            style={{
              animation: animationIntensity === 'minimal' ? 'none' : 'stemSway 8s ease-in-out infinite',
              animationDuration: animationIntensity === 'reduced' ? '12s' : '8s'
            }}
          />
          
          {/* Branch stems for bushy appearance */}
          {[
            { path: "M50 30 Q40 25 30 20", delay: '0s' },
            { path: "M50 30 Q60 25 70 20", delay: '0.5s' },
            { path: "M50 45 Q35 40 20 35", delay: '1s' },
            { path: "M50 45 Q65 40 80 35", delay: '1.5s' },
            { path: "M50 60 Q40 55 25 50", delay: '2s' },
            { path: "M50 60 Q60 55 75 50", delay: '2.5s' },
            { path: "M50 75 Q45 70 35 65", delay: '3s' },
            { path: "M50 75 Q55 70 65 65", delay: '3.5s' },
          ].map((branch, index) => (
            <path 
              key={index}
              d={branch.path} 
              stroke={colors.stemColor} 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round"
              className="origin-center"
              style={{
                animation: animationIntensity === 'minimal' ? 'none' : 'stemSway 6s ease-in-out infinite',
                animationDelay: branch.delay,
                animationDuration: animationIntensity === 'reduced' ? '9s' : '6s'
              }}
            />
          ))}
          
          {/* Small round leaves for bushy appearance */}
          {[
            { x: 30, y: 20, delay: '0s', size: 6 },
            { x: 70, y: 20, delay: '0.3s', size: 5 },
            { x: 20, y: 35, delay: '0.6s', size: 7 },
            { x: 80, y: 35, delay: '0.9s', size: 6 },
            { x: 25, y: 50, delay: '1.2s', size: 8 },
            { x: 75, y: 50, delay: '1.5s', size: 7 },
            { x: 35, y: 65, delay: '1.8s', size: 6 },
            { x: 65, y: 65, delay: '2.1s', size: 5 },
            { x: 50, y: 18, delay: '2.4s', size: 4 },
            { x: 45, y: 25, delay: '2.7s', size: 5 },
            { x: 55, y: 25, delay: '3s', size: 5 },
          ].map((leaf, index) => (
            <ellipse
              key={index}
              cx={leaf.x}
              cy={leaf.y}
              rx={leaf.size}
              ry={leaf.size * 0.8}
              fill={colors.leafColor}
              className="origin-center"
              style={{
                animation: animationIntensity === 'minimal' ? 'none' : `leafSway 4s ease-in-out infinite`,
                animationDelay: leaf.delay,
                transformOrigin: `${leaf.x}px ${leaf.y + leaf.size * 0.8}px`,
                animationDuration: animationIntensity === 'reduced' ? `${5 + Math.random() * 3}s` : `${3 + Math.random() * 2}s`
              }}
            />
          ))}

          {/* Stress indicators for unhealthy plants */}
          {stress > 0.5 && (
            <g>
              {/* Wilting effect - drooping leaves */}
              {[20, 35, 50, 65].map((y, index) => (
                <ellipse
                  key={`stress-${index}`}
                  cx={50 + (index % 2 === 0 ? -15 : 15)}
                  cy={y}
                  rx={4}
                  ry={3}
                  fill={colors.leafColor}
                  opacity="0.6"
                  style={{
                    transform: `rotate(${stress * 45}deg)`,
                    transformOrigin: `${50 + (index % 2 === 0 ? -15 : 15)}px ${y}px`
                  }}
                />
              ))}
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Ashwagandha plant
  return (
    <div className={`relative ${className}`} style={{ 
      transform: `scale(${growthScale})`,
      animation: isGrowing ? 'plantGrow 2s ease-out forwards' : 'none'
    }}>
      <svg width="100" height="120" viewBox="0 0 100 120" className="drop-shadow-sm">
        {/* Main stem - taller and straighter */}
        <path
          d="M50 120 Q50 100 50 80 Q50 60 50 40 Q50 20 50 10"
          stroke={colors.stemColor}
          strokeWidth="4"
          fill="none"
          className="origin-bottom"
          strokeLinecap="round"
          style={{
            animation: animationIntensity === 'minimal' ? 'none' : 'stemSway 10s ease-in-out infinite',
            animationDuration: animationIntensity === 'reduced' ? '15s' : '10s'
          }}
        />
        
        {/* Branch stems for leaf clusters */}
        {[
          { path: "M50 25 Q40 20 30 15", delay: '0s' },
          { path: "M50 25 Q60 20 70 15", delay: '0.8s' },
          { path: "M50 40 Q35 35 20 30", delay: '1.6s' },
          { path: "M50 40 Q65 35 80 30", delay: '2.4s' },
          { path: "M50 55 Q40 50 25 45", delay: '3.2s' },
          { path: "M50 55 Q60 50 75 45", delay: '4s' },
          { path: "M50 70 Q45 65 35 60", delay: '4.8s' },
          { path: "M50 70 Q55 65 65 60", delay: '5.6s' },
        ].map((branch, index) => (
          <path 
            key={index}
            d={branch.path} 
            stroke={colors.stemColor} 
            strokeWidth="2.5" 
            fill="none" 
            strokeLinecap="round"
            className="origin-center"
            style={{
              animation: animationIntensity === 'minimal' ? 'none' : 'stemSway 8s ease-in-out infinite',
              animationDelay: branch.delay,
              animationDuration: animationIntensity === 'reduced' ? '12s' : '8s'
            }}
          />
        ))}
        
        {/* Larger, elongated leaves for Ashwagandha */}
        {[
          { x: 30, y: 15, delay: '0s', length: 12, width: 6 },
          { x: 70, y: 15, delay: '0.4s', length: 11, width: 5 },
          { x: 20, y: 30, delay: '0.8s', length: 14, width: 7 },
          { x: 80, y: 30, delay: '1.2s', length: 13, width: 6 },
          { x: 25, y: 45, delay: '1.6s', length: 15, width: 8 },
          { x: 75, y: 45, delay: '2s', length: 14, width: 7 },
          { x: 35, y: 60, delay: '2.4s', length: 13, width: 6 },
          { x: 65, y: 60, delay: '2.8s', length: 12, width: 5 },
        ].map((leaf, index) => (
          <ellipse
            key={index}
            cx={leaf.x}
            cy={leaf.y}
            rx={leaf.length}
            ry={leaf.width}
            fill={colors.leafColor}
            className="origin-center"
            style={{
              animation: animationIntensity === 'minimal' ? 'none' : `leafSway 5s ease-in-out infinite`,
              animationDelay: leaf.delay,
              transformOrigin: `${leaf.x}px ${leaf.y + leaf.width}px`,
              animationDuration: animationIntensity === 'reduced' ? `${7 + Math.random() * 3}s` : `${4 + Math.random() * 2}s`
            }}
          />
        ))}

        {/* Stress indicators for unhealthy plants */}
        {stress > 0.5 && (
          <g>
            {/* Wilting effect - drooping leaves */}
            {[15, 30, 45, 60].map((y, index) => (
              <ellipse
                key={`stress-${index}`}
                cx={50 + (index % 2 === 0 ? -20 : 20)}
                cy={y}
                rx={8}
                ry={4}
                fill={colors.leafColor}
                opacity="0.6"
                style={{
                  transform: `rotate(${stress * 60}deg)`,
                  transformOrigin: `${50 + (index % 2 === 0 ? -20 : 20)}px ${y}px`
                }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}