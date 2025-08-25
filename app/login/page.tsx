'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  Activity,
  Zap
} from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('herbtech-loggedIn') === 'true';
    if (loggedIn) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'admin' && password === 'password') {
      localStorage.setItem('herbtech-loggedIn', 'true');
      router.push('/');
    } else {
      setError('Invalid credentials. Use admin/password for demo.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-xl">
            <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight">
            HerbTech
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-sm mx-auto leading-relaxed mb-6 sm:mb-8">
            Intelligent hydroponic cultivation system with real-time monitoring and automated control
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Secure
            </Badge>
            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50/50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Live
            </Badge>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl sm:text-3xl font-light text-slate-900">Welcome Back</CardTitle>
            <CardDescription className="text-slate-600 text-sm sm:text-base mt-2">
              Sign in to access your smart garden dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-11 sm:h-12 border-slate-200/50 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 h-11 sm:h-12 border-slate-200/50 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 sm:p-4 bg-red-50/80 border border-red-200/50 rounded-lg sm:rounded-xl">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              )}
            </Button>

            {/* Demo Credentials */}
            <div className="p-3 sm:p-4 bg-blue-50/50 border border-blue-200/50 rounded-lg sm:rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Demo Credentials</span>
              </div>
              <p className="text-xs text-blue-600">
                Username: <span className="font-mono font-medium">admin</span> | 
                Password: <span className="font-mono font-medium">password</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              HerbTech Smart Cultivation System v1.0
            </p>
            <p className="text-slate-400 text-xs mt-2">
              Built with Next.js • Tailwind CSS • React
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}