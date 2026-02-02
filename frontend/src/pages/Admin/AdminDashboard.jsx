import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Calendar, Users, Ticket, TrendingUp } from 'lucide-react';
import AdminFooter from '../../components/Admin/AdminFooter';

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0
  });

  // දත්ත ලබාගන්නා function එක
  const fetchStats = useCallback(async () => {
    try {
      // const token = localStorage.getItem('adminToken');
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        console.error("No token found! Please login again.");
        return;
      }

      const config = {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      };

      const { data } = await axios.get('http://localhost:5000/api/users/stats', config);
      console.log("Stats Data Received:", data); // දත්ත එනවාදැයි බලා ගැනීමට
      setStatsData(data);
    } catch (error) {
      console.error("Error fetching stats:", error.response?.data?.message || error.message);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // පෙන්විය යුතු කාඩ්පත් ලැයිස්තුව
  const stats = [
    { title: 'Total Events', value: statsData.totalEvents, icon: Calendar, color: 'text-blue-500' },
    { title: 'Total Users', value: statsData.totalUsers, icon: Users, color: 'text-purple-500' },
    { title: 'Tickets Sold', value: statsData.totalBookings, icon: Ticket, color: 'text-green-500' },
    { title: 'Revenue', value: `Rs. ${statsData.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-orange-500' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      {/* ප්‍රධාන කොටස */}
      <div className="p-10 space-y-8 flex-grow ml-64"> 
        <header className="text-left border-b border-white/5 pb-6">
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            Admin <span className="text-lime-400">Dashboard</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Welcome back! Monitor your platform's performance in real-time.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-left hover:bg-white/[0.08] transition-all duration-300 group">
              <div className={`p-4 bg-white/5 rounded-2xl w-fit mb-6 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.title}</h3>
              <p className="text-4xl font-black text-white mt-2 tracking-tighter">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity Table (දැනට හිස්ව පවතී) */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-left backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
            Recent Bookings
          </h2>
          <div className="text-gray-600 font-bold text-center py-20 uppercase tracking-widest bg-black/20 rounded-[1.5rem] border border-dashed border-white/10">
            No recent bookings to display at the moment.
          </div>
        </div>
      </div>

      {/* Footer එක පහළින් */}
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;