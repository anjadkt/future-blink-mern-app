import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseSchema } from '../validations/auth.validation';
import axios from 'axios';
import api from '../services/axios';

export type ErrorType = {
  email ?: string;
  password ?: string;
  confirmPassword?:string ;
}

export default function Login() {
  const [form,setForm] = useState({
    email : "",
    password : ""
  });

  const [error,setError] = useState<ErrorType>();

  const navigate = useNavigate();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setForm((pre)=>({
      ...pre , 
      [e.target.name] : e.target.value
    }));

    setError(pre => ({...pre , [e.target.name] : null }));
  }

  const handleLogin = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = baseSchema.safeParse(form);

    if(!result.success){
      result.error.issues.map((v) => {
        setError(pre => ({...pre , [v.path[0]] : v.message}));
      });
      return;
    }

    try{
      await api.post('/auth/login',form);
      navigate('/');
    }catch(error){
      if(axios.isAxiosError(error)){
        switch(error.response?.status){
          case 404 : 
           setError(pre => ({...pre , email : "User not found!"}));
           break;
          case 400 :
            setError(pre => ({...pre , email : "Invalid format!", password : "Invalid format!"}));
            break;
          case 403 : 
            setError(pre => ({...pre , password : "Wrong password!"}));
            break;
          default :
            setError(pre => ({...pre , email : "Server error!"}));
        }
      }
    }
  }


  return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
    
    <div className="relative z-10 w-full max-w-sm bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(217,70,239,0.3)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)] mb-2">
          Welcome Back
        </h1>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative group">
            <input
              onChange={handleChange}
              name="email"
              type="email"
              id="email"
              className={`w-full bg-gray-950/50 border rounded-xl px-4 py-3 text-gray-100 focus:outline-none transition-all duration-300 placeholder-gray-600 group-hover:border-gray-700 
                ${error?.email 
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' 
                  : 'border-gray-800 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/50'
                }`}
              placeholder="neon@future.blink"
            />
          </div>
          {/* Email Error Message */}
          {error?.email && (
            <p className="text-xs text-red-400 ml-1 animate-pulse italic">
              {error.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1" htmlFor="password">
            Password
          </label>
          <div className="relative group">
            <input
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              className={`w-full bg-gray-950/50 border rounded-xl px-4 py-3 text-gray-100 focus:outline-none transition-all duration-300 placeholder-gray-600 group-hover:border-gray-700
                ${error?.password 
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' 
                  : 'border-gray-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50'
                }`}
              placeholder="••••••••"
            />
          </div>
          {/* Password Error Message */}
          {error?.password && (
            <p className="text-xs text-red-400 ml-1 animate-pulse italic">
              {error.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 mt-4 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
        >
          LOGIN
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-all hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}