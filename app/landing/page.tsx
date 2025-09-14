'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { HerbTechLogo } from '@/components/HerbTechLogo';
import { ArrowRight, Leaf, Zap, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 mb-8">
              <HerbTechLogo size="xl" />
              <div className="text-left">
                <p className="text-lg text-slate-600 font-medium">
                  Smart Cultivation System
                </p>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Grow Smarter,<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Grow Better
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the future of automated plant cultivation with our intelligent monitoring system, 
              real-time analytics, and precision controls.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-16">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/login'}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-3">Let's Begin</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              Start your smart cultivation journey
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 border-t border-white/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © 2024 HerbTech Solutions. Advanced Smart Cultivation Technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
