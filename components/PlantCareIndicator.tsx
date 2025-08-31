'use client';

import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';

interface PlantCareIndicatorProps {
  podName: string;
}

export function PlantCareIndicator({ podName }: PlantCareIndicatorProps) {
  const { telemetry } = useDemoTelemetry();
  
  const latestReading = telemetry
    ? telemetry.filter(t => t.pod.toLowerCase() === podName.toLowerCase()).slice(-1)[0]
    : undefined;
  
  if (!latestReading) return null;

  const { soil, tempC, rh, lux } = latestReading;
  
  // Calculate care quality for each parameter
  const soilCare = soil >= 40 && soil <= 80 ? 'good' : soil < 30 ? 'poor' : 'fair';
  const tempCare = tempC >= 20 && tempC <= 26 ? 'good' : tempC < 18 || tempC > 28 ? 'poor' : 'fair';
  const humidityCare = rh >= 60 && rh <= 80 ? 'good' : rh < 50 || rh > 90 ? 'poor' : 'fair';
  const lightCare = lux >= 400 ? 'good' : lux < 200 ? 'poor' : 'fair';
  
  const careItems = [
    { label: 'Soil', value: `${soil.toFixed(1)}%`, care: soilCare },
    { label: 'Temp', value: `${tempC.toFixed(1)}°C`, care: tempCare },
    { label: 'Humidity', value: `${rh.toFixed(1)}%`, care: humidityCare },
    { label: 'Light', value: `${Math.round(lux)} lux`, care: lightCare },
  ];

  const getCareColor = (care: string) => {
    switch (care) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCareIcon = (care: string) => {
    switch (care) {
      case 'good': return '✓';
      case 'fair': return '!';
      case 'poor': return '✗';
      default: return '?';
    }
  };

  return (
    <div className="mt-3 space-y-1">
      {careItems.map((item) => (
        <div key={item.label} className="flex items-center justify-between text-xs">
          <span className="text-gray-500">{item.label}</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getCareColor(item.care)}`}>
            <span className="font-mono">{getCareIcon(item.care)}</span>
            <span className="tabular-nums">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}