import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend එකට ගැලපෙන විදිහට /api/users/login හෝ /api/auth/login ලෙස වෙනස් කරන්න
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      localStorage.setItem('userToken', res.data.token);
      
      alert('Login Successfull!...');
      navigate('/home'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed!!!.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glows for User Theme (Yellow/Green) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-lime-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-2xl shadow-2xl z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-lime-500/10 mb-4">
             <Sparkles className="text-lime-400 w-8 h-8" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">User Login</h2>
          <p className="text-gray-400 mt-2 font-medium">Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-lime-400 transition-colors" size={20} />
              <input 
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-lime-500/50 focus:bg-lime-500/5 transition-all text-white"
                placeholder="email@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-yellow-500/50 focus:bg-yellow-500/5 transition-all text-white"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-lime-500 to-yellow-500 hover:from-lime-400 hover:to-yellow-400 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-lime-500/20 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                SIGN IN <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-10 space-y-2">
          <p className="text-gray-500 text-sm">
            Don't have an account? 
            <Link to="/register" className="text-lime-400 hover:text-lime-300 font-bold ml-2 transition-colors">
              Register Now
            </Link>
          </p>
          <div className="pt-4">
             <Link to="/" className="text-gray-600 text-xs hover:text-gray-400 transition-colors underline decoration-dotted">Back to landing page</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;