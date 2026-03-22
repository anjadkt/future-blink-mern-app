import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../validations/auth.validation'; // Assuming you have a registration schema
import axios from 'axios';
import api from '../services/axios';
import type { ErrorType } from './Login';
import { checkAuth } from '../context/CheckAuth';

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState<ErrorType>();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((pre) => ({
      ...pre,
      [e.target.name]: e.target.value
    }));

    setError(pre => ({ ...pre, [e.target.name]: null }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const formattedErrors: ErrorType = {};
      result.error.issues.forEach((v) => {
        const path = v.path[0] as keyof ErrorType;
        formattedErrors[path] = v.message;
      });
      setError(formattedErrors);
      return;
    }

    try {
      await api.post('/auth/register', form);
      await checkAuth();
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 409:
            setError(pre => ({ ...pre, email: "Email already exists!" }));
            break;
          case 400:
            setError(pre => ({ ...pre, email: "Check your data format!" }));
            break;
          default:
            setError(pre => ({ ...pre, email: "Server error! Try again later." }));
        }
      }
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      <div className="relative z-10 w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] mb-2">
            Join the Future
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="email">
              Email Address
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              id="email"
              className={`w-full bg-gray-950/50 border rounded-xl px-4 py-3 text-gray-100 focus:outline-none transition-all duration-300 placeholder-gray-600 
                ${error?.email ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' : 'border-gray-800 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/50'}`}
              placeholder="neon@future.blink"
            />
            {error?.email && <p className="text-[10px] text-red-400 ml-1 animate-pulse italic">{error.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              className={`w-full bg-gray-950/50 border rounded-xl px-4 py-3 text-gray-100 focus:outline-none transition-all duration-300 placeholder-gray-600 
                ${error?.password ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' : 'border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50'}`}
              placeholder="••••••••"
            />
            {error?.password && <p className="text-[10px] text-red-400 ml-1 animate-pulse italic">{error.password}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400 ml-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              className={`w-full bg-gray-950/50 border rounded-xl px-4 py-3 text-gray-100 focus:outline-none transition-all duration-300 placeholder-gray-600 
                ${error?.confirmPassword ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' : 'border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50'}`}
              placeholder="••••••••"
            />
            {error?.confirmPassword && <p className="text-[10px] text-red-400 ml-1 animate-pulse italic">{error.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 mt-6 bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Already a member?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-all hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}