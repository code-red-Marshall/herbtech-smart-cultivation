'use client';

import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';

interface StatRowProps {
  label: string;
  value: string;
  unit?: string;
}

function StatRow({ label, value, unit }: StatRowProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="text-gray-900 font-medium tabular-nums">
        {value}{unit && <span className="text-gray-500 ml-1">{unit}</span>}
      </span>
    </div>
  );
}

function ConnectionBadge() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      <span className="text-xs text-gray-500 font-medium">Demo Mode</span>
    </div>
  );
}

export function StatsPanel() {
  const telemetry = useDemoTelemetry();
  
  const latest = telemetry.slice(-1)[0];
  
  if (!latest) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <ConnectionBadge />
        <div className="text-center text-gray-500">Loading telemetry...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <ConnectionBadge />
      
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Metrics</h3>
      
      <div className="space-y-1">
        <StatRow label="pH Level" value="6.4" />
        <StatRow label="Soil Moisture" value={latest.soil.toFixed(1)} unit="%" />
        <StatRow label="Humidity" value={latest.rh.toFixed(1)} unit="%" />
        <StatRow label="NPK Ratio" value="3-5-2" />
        <StatRow label="Light Intensity" value={Math.round(latest.lux).toString()} unit="lux" />
        <StatRow label="Temperature" value={latest.tempC.toFixed(1)} unit="°C" />
      </div>
    </div>
  );
}