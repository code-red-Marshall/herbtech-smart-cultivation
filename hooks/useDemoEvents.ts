'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export function useDemoEvents() {
  useEffect(() => {
    const interval = setInterval(() => {
      const events = [
        'auto_watering',
        'thermal_cap',
        'light_cycle_start',
        'nutrient_check'
      ];
      
      if (Math.random() > 0.85) { // 15% chance every 10 seconds
        const event = events[Math.floor(Math.random() * events.length)];
        
        switch (event) {
          case 'auto_watering':
            toast.info('🌱 Auto watering activated', {
              position: 'bottom-right',
              autoClose: 3000,
            });
            break;
          case 'thermal_cap':
            toast.warning('🌡️ Temperature regulation active', {
              position: 'bottom-right',
              autoClose: 3000,
            });
            break;
          case 'light_cycle_start':
            toast.success('💡 Light cycle initiated', {
              position: 'bottom-right',
              autoClose: 3000,
            });
            break;
          case 'nutrient_check':
            toast.info('🧪 Nutrient levels optimal', {
              position: 'bottom-right',
              autoClose: 3000,
            });
            break;
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);
}