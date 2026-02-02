import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader2, UserPlus } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend එකේ authRoutes වල තියෙන register route එකට data යැවීම
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      
      alert('Registration Successfull! please Login Now!!');
      navigate('/login'); // Register වුණාම Login පේජ් එකට යවනවා
    } catch (err) {
      alert(err.response?.data?.message || 'Failed Your Registration!!!.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glows (User Theme) */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-lime-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-2xl shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-lime-500/10 mb-4">
             <UserPlus className="text-lime-400 w-8 h-8" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">Create Account</h2>
          <p className="text-gray-400 mt-2 font-medium">Join us today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-lime-400 transition-colors" size={20} />
              <input 
                type="text" 
                required
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-lime-500/50 focus:bg-lime-500/5 transition-all text-white"
                placeholder="John Doe"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

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
            className="w-full bg-gradient-to-r from-lime-500 to-yellow-500 hover:from-lime-400 hover:to-yellow-400 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-lime-500/20 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                REGISTER NOW <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Already have an account? 
          <Link to="/login" className="text-lime-400 hover:text-lime-300 font-bold ml-2 transition-colors">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;