"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Scissors, Zap, Check } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { useToast } from "@/components/ui/toast";

// Define validation schema with zod
const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    agreeTerms: z.boolean(),
    marketingEmails: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registerSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {addToast}=useToast()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeTerms: false,
    marketingEmails: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for the field being edited
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setFormErrors({});

    // Validate form data
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFormErrors(
        Object.fromEntries(
          Object.entries(errors).map(([key, messages]) => [key, messages?.[0] || "Invalid input"])
        )
      );
      return;
    }
    const {confirmPassword,agreeTerms,marketingEmails,...payload}=formData
    setIsLoading(true);
    try {
      // Prepare payload for backend (exclude confirmPassword)
     
      const res=await fetch("/api/auth/register",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(payload)
      });
      const data=await res.json();
      if(data.success){
        addToast({
          type: 'success',
          title: 'Success!',
          description: 'Registered Successfully.',
          duration: 5000
        });
      }else{
        addToast({
          type: 'error',
          title: 'Error!',
          description: data,
          duration: 5000
        });
      }
     console.log(data)
    } catch (error) {
      console.log(error)
      
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "Contains number", met: /\d/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: "#F8F6F0" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-5 opacity-5">
          <Zap size={150} className="text-gray-400" />
        </div>
        <div className="absolute bottom-10 right-5 opacity-5 rotate-12">
          <Scissors size={120} className="text-gray-400" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-3 -rotate-45">
          <Zap size={80} className="text-gray-400" />
        </div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Main signup card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/logos/without-bg/logo.png" className="h-20 w-32" />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C2C2C" }}>
              Join EMBROWEAR
            </h1>
            <p className="text-gray-600">Create your account and start your embroidery journey</p>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: "#2C2C2C" }}>
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all ${
                    formErrors.firstName ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: "#FEFEFE" }}
                  placeholder="John"
                  required
                />
                {formErrors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: "#2C2C2C" }}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all ${
                    formErrors.lastName ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: "#FEFEFE" }}
                  placeholder="Doe"
                  required
                />
                {formErrors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#2C2C2C" }}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all ${
                  formErrors.email ? "border-red-500" : "border-gray-200"
                }`}
                style={{ backgroundColor: "#FEFEFE" }}
                placeholder="john@example.com"
                required
              />
              {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
            </div>

            {/* Phone field (optional, added for backend compatibility) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: "#2C2C2C" }}>
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all ${
                  formErrors.phone ? "border-red-500" : "border-gray-200"
                }`}
                style={{ backgroundColor: "#FEFEFE" }}
                placeholder="+1234567890"
              />
              {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#2C2C2C" }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all ${
                    formErrors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: "#FEFEFE" }}
                  placeholder="Create a strong password"
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
              {formErrors.password && (
                <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
              )}
              {formData.password && (
                <div className="mt-3 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <Check
                        size={12}
                        className={`mr-2 ${req.met ? "text-green-500" : "text-gray-300"}`}
                      />
                      <span className={req.met ? "text-green-600" : "text-gray-500"}>{req.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
                style={{ color: "#2C2C2C" }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-transparent outline-none transition-all ${
                    formErrors.confirmPassword ? "border-red-500" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: "#FEFEFE" }}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            {/* Agreements */}
            <div className="space-y-3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-200 mt-1"
                  required
                />
                <span className="ml-3 text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="hover:underline" style={{ color: "#8B4513" }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="hover:underline" style={{ color: "#8B4513" }}>
                    Privacy Policy
                  </a>
                </span>
              </label>
              {formErrors.agreeTerms && (
                <p className="text-xs text-red-500 mt-1">{formErrors.agreeTerms}</p>
              )}
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="marketingEmails"
                  checked={formData.marketingEmails}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-200 mt-1"
                />
                <span className="ml-3 text-sm text-gray-600">
                  I'd like to receive updates about new embroidery designs and special offers
                </span>
              </label>
            </div>

            {/* API error message */}
            {apiError && <p className="text-sm text-red-500 text-center">{apiError}</p>}

            {/* Sign up button */}
            <button
              type="submit"
              disabled={isLoading || !formData.agreeTerms || formData.password !== formData.confirmPassword}
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: "#8B4513" }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">or sign up with</span>
            </div>
          </div>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium hover:underline transition-colors"
                style={{ color: "#8B4513" }}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">© 2024 EMBROWEAR. Crafted with precision.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
