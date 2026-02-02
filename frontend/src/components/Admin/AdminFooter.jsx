import React from 'react';
import { ShieldCheck, HardDrive, RefreshCw } from 'lucide-react';

const AdminFooter = () => {
  return (
    <footer className="bg-black/20 border-t border-white/5 py-8 px-10 mt-auto ml-64">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: System Status */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Online</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <ShieldCheck size={14} className="text-lime-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Admin Secure Mode</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <HardDrive size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">v2.0.4 - 2026</span>
          </div>
        </div>

        {/* Center: Brand */}
        <div className="text-sm font-black tracking-tighter text-gray-500">
          EVENT<span className="text-lime-400">PASS</span> <span className="text-[10px] ml-1 bg-white/5 px-2 py-0.5 rounded border border-white/10 uppercase italic">Control Panel</span>
        </div>

        {/* Right Side: Quick Actions */}
        <div className="flex gap-6 items-center">
            <button 
                onClick={() => window.location.reload()} 
                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
            >
                <RefreshCw size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Sync Data</span>
            </button>
            <p className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">
                © 2026 INTERNAL USE ONLY
            </p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;