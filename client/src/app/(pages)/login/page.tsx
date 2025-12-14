"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Pin, Scissors } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/toast';
import userStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {addToast}=useToast();
  const {setUser}=userStore();
  const router=useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    const payload={email,password}
    try{
      if(!email || !password){
        alert("Please provide email and password")
      }
      const res=await fetch("/api/auth/login",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(payload)
      });
      const data=await res.json();
      console.log("data",data);
      if(data.success){
        addToast({
          type: 'success',
          title: 'Success!',
          description: 'Logged In Successfully.',
          duration: 5000
        });
        setUser(data.data.user);
        localStorage.setItem("token",data.data.token);
        router.push("/")
      }else{
        addToast({
          type: 'error',
          title: 'Error!',
          description: data,
          duration: 5000
        });
      }

    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F8F6F0' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-5">
          <Pin size={200} className="text-gray-400" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5 rotate-45">
          <Scissors size={150} className="text-gray-400" />
        </div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main login card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {/* <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-3 rounded-full"> */}
                {/* <Pin size={32} style={{ color: '#8B4513' }} /> */}
                <img src="/logos/without-bg/logo.png" className='h-20 w-32' />
              {/* </div> */}
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#2C2C2C' }}>
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your embroidery collection
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#2C2C2C' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all"
                style={{ backgroundColor: '#FEFEFE' }}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#2C2C2C' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all"
                  style={{ backgroundColor: '#FEFEFE' }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-200"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a 
                href="#" 
                className="text-sm hover:underline transition-colors"
                style={{ color: '#8B4513' }}
              >
                Forgot password?
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: '#8B4513' }}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/register" 
                className="font-medium hover:underline transition-colors"
                style={{ color: '#8B4513' }}
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2025 EMBROWEAR. Crafted with precision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;