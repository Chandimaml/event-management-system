import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShieldCheck, CalendarDays } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* --- MOVING LIGHT BEAMS (Musical Show Style) --- */}
      
      {/* Beam 1: Blue Scanning Light */}
      <motion.div 
        animate={{ 
          rotate: [-45, 45, -45],
          opacity: [0.1, 0.4, 0.1],
          x: [-100, 100, -100]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[10%] w-[30%] h-[150%] bg-gradient-to-b from-blue-600/40 to-transparent blur-[100px] origin-top pointer-events-none"
      />

      {/* Beam 2: Purple Scanning Light */}
      <motion.div 
        animate={{ 
          rotate: [45, -45, 45],
          opacity: [0.1, 0.3, 0.1],
          x: [100, -100, 100]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] right-[10%] w-[30%] h-[150%] bg-gradient-to-b from-purple-600/30 to-transparent blur-[100px] origin-top pointer-events-none"
      />

      {/* Pulsing Floor Light */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-[-10%] w-full h-1/2 bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"
      />

      {/* --- MAIN CONTENT --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10 px-4"
      >
        <div className="flex justify-center mb-8">
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-xl"
          >
            <CalendarDays className="w-14 h-14 text-blue-500" />
          </motion.div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic">
          EVENT<span className="text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.6)]">PASS</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-14 max-w-lg mx-auto font-medium leading-relaxed">
          The ultimate VIP gateway to the world's most <br/> exclusive and incredible events.
        </p>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {/* Admin Card */}
          <motion.div 
            whileHover={{ y: -20, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-80 p-10 bg-white/5 border border-white/10 rounded-[3.5rem] cursor-pointer transition-all backdrop-blur-md hover:bg-white/[0.08] hover:border-red-500/50 group"
            onClick={() => navigate('/admin-login')}
          >
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500/20 transition-all">
              <ShieldCheck className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">Admin Portal</h2>
            <p className="text-gray-500 text-sm">Organize and track everything.</p>
          </motion.div>

          {/* User Card */}
          <motion.div 
            whileHover={{ y: -20, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-80 p-10 bg-white/5 border border-white/10 rounded-[3.5rem] cursor-pointer transition-all backdrop-blur-md hover:bg-white/[0.08] hover:border-blue-500/50 group"
            onClick={() => navigate('/login')}
          >
            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-all">
              <User className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">User Portal</h2>
            <p className="text-gray-500 text-sm">Book your tickets and join now.</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 text-gray-700 text-[10px] font-black tracking-[0.4em] uppercase">
        © 2026 EVENTPASS PRO • THE ULTIMATE EXPERIENCE
      </div>
    </div>
  );
};

export default LandingPage;