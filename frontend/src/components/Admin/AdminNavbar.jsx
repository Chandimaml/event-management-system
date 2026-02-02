import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, Users, List, BarChart3, LogOut } from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', icon: Home, path: '/admin/dashboard' },
    { name: 'Add Event', icon: PlusCircle, path: '/admin/add-event' },
    { name: 'User List', icon: Users, path: '/admin/users' },
    { name: 'Event List', icon: List, path: '/admin/events' },
    { name: 'Reports', icon: BarChart3, path: '/admin/reports' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white/5 border-r border-white/10 backdrop-blur-md p-6 z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-8 h-8 bg-red-600 rounded-lg"></div>
        <h1 className="text-xl font-black text-white tracking-tighter">ADMIN PANEL</h1>
      </div>

      <div className="space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <item.icon className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      <button 
        onClick={() => navigate('/')}
        className="absolute bottom-8 left-6 right-6 flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;