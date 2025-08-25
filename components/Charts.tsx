'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDemoTelemetry } from '@/hooks/useDemoTelemetry';
import { format } from 'date-fns';

export function Charts() {
  const telemetry = useDemoTelemetry();
  
  // Get last 24 hours of data
  const last24h = telemetry.slice(-720); // 720 readings = 24 hours at 2-minute intervals
  
  const chartData = last24h.map(reading => ({
    time: format(new Date(reading.ts), 'HH:mm'),
    timestamp: reading.ts,
    tempC: reading.tempC,
    humidity: reading.rh,
    soil: reading.soil,
    light: reading.lux,
  }));

  const ChartCard = ({ title, dataKey, color, unit }: { 
    title: string; 
    dataKey: string; 
    color: string; 
    unit: string;
  }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#666"
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              labelFormatter={(value) => `Time: ${value}`}
              formatter={(value: number) => [`${value.toFixed(1)}${unit}`, title]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="text-center text-gray-500">Loading telemetry data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">24-Hour Telemetry</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Temperature" 
          dataKey="tempC" 
          color="#ef4444" 
          unit="°C"
        />
        <ChartCard 
          title="Humidity" 
          dataKey="humidity" 
          color="#3b82f6" 
          unit="%"
        />
        <ChartCard 
          title="Soil Moisture" 
          dataKey="soil" 
          color="#10b981" 
          unit="%"
        />
        <ChartCard 
          title="Light Intensity" 
          dataKey="light" 
          color="#f59e0b" 
          unit=" lux"
        />
      </div>
    </div>
  );
}