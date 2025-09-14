'use client';

import { Home, Settings, LogOut, BarChart3, Leaf } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarRailProps {
  className?: string;
}

export function SidebarRail({ className = '' }: SidebarRailProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('herbtech-loggedIn');
      }
    } catch (_) {
      // ignore
    }
    // Navigate to login after clearing session
    router.push('/login');
  };
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Plant Pod Demo', href: '/pod-demo', icon: Leaf },
    { name: 'Charts', href: '/charts', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <nav className={`pd-sidebar ${className}`}>
      {/* Navigation Items - Top Section */}
      <div className="flex flex-col items-center space-y-4 w-full px-3 pt-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative p-3 rounded-xl transition-all duration-200 w-full max-w-[72px] flex flex-col items-center justify-center ${
                pathname === item.href
                  ? 'bg-gradient-to-br from-green-50 to-blue-50 text-green-700 shadow-sm border border-green-200/50'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:scale-102'
              }`}
              title={item.name}
            >
              <Icon className={`w-4 h-4 mb-1.5 ${pathname === item.href ? 'text-green-600' : 'text-slate-500'}`} />
              <span className="text-xs font-medium text-center leading-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section - Logout */}
      <div className="w-full flex justify-center px-3 pb-8 mt-auto">
        <button
          className="p-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 flex flex-col items-center justify-center hover:scale-102 max-w-[72px] w-full group"
          title="Logout"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mb-1.5 group-hover:text-red-600" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
