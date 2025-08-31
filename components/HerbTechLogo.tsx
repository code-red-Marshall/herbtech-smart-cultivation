import { Leaf } from 'lucide-react';

interface HerbTechLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'full';
  className?: string;
}

export function HerbTechLogo({ size = 'md', variant = 'default', className = '' }: HerbTechLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const logoContainer = (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${className}`}>
      <Leaf className={`${iconSizes[size]} text-white`} strokeWidth={2} />
    </div>
  );

  if (variant === 'minimal') {
    return logoContainer;
  }

  if (variant === 'full') {
    return (
      <div className="flex items-center space-x-3 group">
        {logoContainer}
        <div className="group-hover:scale-105 transition-transform duration-200">
          <h1 className={`${textSizes[size]} font-bold text-slate-900`}>HerbTech</h1>
          <p className={`text-xs text-slate-600 ${size === 'sm' ? 'hidden' : 'block'}`}>Smart Cultivation System</p>
        </div>
      </div>
    );
  }

  // Default variant - just logo with HerbTech text
  return (
    <div className="flex items-center space-x-3 group">
      {logoContainer}
      <div className="group-hover:scale-105 transition-transform duration-200">
        <h1 className={`${textSizes[size]} font-bold text-slate-900`}>HerbTech</h1>
      </div>
    </div>
  );
}
