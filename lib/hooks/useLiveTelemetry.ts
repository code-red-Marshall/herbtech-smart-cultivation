import { useState, useEffect, useCallback } from 'react';

// Types based on PRD requirements for plant monitoring
export interface PlantMetrics {
  chlorophyllA: number;
  chlorophyllB: number;
  soilHealth: 'optimal' | 'good' | 'dry' | 'poor';
  lightCondition: 'optimal' | 'good' | 'minimal' | 'poor';
  humidityLevel: number; // percentage
  fertilizationStatus: 'balanced' | 'high' | 'low' | 'needed';
  growthRate: number; // percentage change
  lastUpdated: Date;
}

export interface GrowthData {
  month: string;
  value: number;
  change: number; // percentage change
}

// WebSocket connection with fallback to HTTP polling
export function useLiveTelemetry(plantId: string) {
  const [metrics, setMetrics] = useState<PlantMetrics | null>(null);
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback HTTP fetch function
  const fetchLatestMetrics = useCallback(async () => {
    try {
      // Fallback to HTTP endpoint as specified in PRD
      const response = await fetch(`/api/telemetry/latest?plantId=${plantId}`);
      if (!response.ok) throw new Error('Failed to fetch telemetry');
      
      const data = await response.json();
      setMetrics(data.metrics);
      setGrowthData(data.growthData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Telemetry fetch error:', err);
    }
  }, [plantId]);

  // WebSocket connection
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout;
    let fallbackTimer: NodeJS.Timeout;

    const connectWebSocket = () => {
      try {
        // WebSocket endpoint as specified in PRD
        ws = new WebSocket(`ws://localhost:3000/ws/telemetry?plantId=${plantId}`);
        
        ws.onopen = () => {
          setIsConnected(true);
          setError(null);
          console.log('WebSocket connected for plant:', plantId);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'metrics_update') {
              setMetrics(data.metrics);
            } else if (data.type === 'growth_update') {
              setGrowthData(data.growthData);
            }
          } catch (err) {
            console.error('Failed to parse WebSocket message:', err);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          console.log('WebSocket disconnected, falling back to HTTP');
          
          // Fallback to HTTP polling
          fallbackTimer = setInterval(fetchLatestMetrics, 5000);
        };

        ws.onerror = (err) => {
          console.error('WebSocket error:', err);
          setIsConnected(false);
          setError('WebSocket connection failed');
        };

      } catch (err) {
        console.error('Failed to create WebSocket:', err);
        setIsConnected(false);
        setError('WebSocket not supported');
      }
    };

    // Initial connection attempt
    connectWebSocket();

    // Reconnection logic
    const handleReconnect = () => {
      if (ws?.readyState === WebSocket.CLOSED) {
        reconnectTimer = setTimeout(connectWebSocket, 3000);
      }
    };

    // Cleanup
    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      if (fallbackTimer) {
        clearInterval(fallbackTimer);
      }
    };
  }, [plantId, fetchLatestMetrics]);

  // Initial data fetch
  useEffect(() => {
    fetchLatestMetrics();
  }, [fetchLatestMetrics]);

  return {
    metrics,
    growthData,
    isConnected,
    error,
    refetch: fetchLatestMetrics,
  };
}
