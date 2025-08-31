import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { HerbTechLogo } from '@/components/HerbTechLogo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HerbTech Smart Cultivation',
  description: 'Intelligent hydroponic cultivation system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
          {/* Top Panel Header - Fixed Position, Covers Entire Canvas */}
          <div className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 px-8 py-4 shadow-sm w-full z-50">
            <div className="flex items-center justify-between">
              {/* Left: Logo and Branding */}
              <HerbTechLogo size="lg" variant="full" />
              
              {/* Right: System Status Indicators */}
              <div className="flex items-center space-x-6">
                {/* Connected Status */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Connected</span>
                </div>
                
                {/* Logged In Status */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Logged In</span>
                </div>
                
                {/* Live Monitoring Status */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Live Monitoring</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area with Top Padding to Account for Fixed Header */}
          <div className="pt-24">
            {children}
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
