import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ShieldAlert, Loader2 } from 'lucide-react';
import axios from 'axios'; // Axios import කරගන්න

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state එකක් එකතු කළා
  const [error, setError] = useState(''); // Error පෙන්වන්න state එකක්
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // මෙතන 'http://localhost:5000/api/admin/login' වෙනුවට ඔයාගේ Backend URL එක දාන්න
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Backend එකෙන් සාර්ථකව response එකක් ආවොත්
      if (response.data.token) {
        // Token එක සහ Admin විස්තර LocalStorage එකේ Save කරමු
        // localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        
        // සාර්ථක නම් Dashboard එකට යමු
        navigate('/admin/dashboard');
      }
    } catch (err) {
      // Backend එකෙන් එන error message එක පෙන්වමු
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-red-500/20">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Admin Portal</h2>
          <p className="text-gray-500 mt-2 text-sm">Secure access for event administrators</p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-2xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative mt-2">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                value={email}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-700"
                placeholder="admin@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider ml-1">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                value={password}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-700"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button 
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              'Access Dashboard'
            )}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-8 italic">
          Authorized personnel only. All login attempts are logged.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;