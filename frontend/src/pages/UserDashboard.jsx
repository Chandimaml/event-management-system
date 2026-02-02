import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Ticket, LayoutGrid, LifeBuoy, Info, Phone, 
  LogOut, CreditCard, Calendar, CheckCircle, Bell, Download, Trash2
} from 'lucide-react';
import axios from 'axios';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const res = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to retrieve booking data:", err);
      }
    };
    fetchMyBookings();
  }, []);

  // --- Logout Function ---
  const handleLogout = () => {
    if (window.confirm("Do you want to Logout?")) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
  };

  // --- Delete Booking Function (Updated) ---
  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const token = localStorage.getItem('userToken');
        // Backend Delete API Request
        await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // UI එක update කිරීම (මැකූ booking එක list එකෙන් අයින් කරයි)
        setBookings(bookings.filter(b => b._id !== bookingId));
        alert("Booking deleted successfully!.");
      } catch (err) {
        console.error("Delete failed:", err);
        alert(err.response?.data?.message || "Delete Failed.");
      }
    }
  };

  // ටිකට් එක ඩවුන්ලෝඩ් කිරීමේ function එක
  const handleDownloadTicket = async (bookingId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`http://localhost:5000/api/bookings/download/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Ticket-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Unable to download ticket..");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans text-left">
      <div className="flex flex-grow">
        
        {/* --- Sidebar Navigation --- */}
        <aside className="w-64 bg-black/50 border-r border-white/5 flex flex-col p-6 fixed h-full z-20 backdrop-blur-xl text-left">
          <div className="text-2xl font-black mb-12 tracking-tighter">
            EVENT<span className="text-lime-400">PASS</span>
          </div>
          
          <nav className="flex-grow space-y-2">
            <NavItem icon={<Home size={20}/>} label="Home" path="/home" active />
            <NavItem icon={<LayoutGrid size={20}/>} label="Event View" path="/events" />
            <NavItem icon={<LifeBuoy size={20}/>} label="Supports" path="/support" />
            <NavItem icon={<Info size={20}/>} label="About Us" path="/aboutus" />
            <NavItem icon={<Phone size={20}/>} label="Contact Us" path="/contactus" />
          </nav>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 transition-all mt-auto border-t border-white/5 pt-6 cursor-pointer w-full text-left font-bold"
          >
            <LogOut size={20} /> Logout
          </button>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="ml-64 flex-grow p-10 pb-20 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px] -z-10"></div>
          
          <header className="flex justify-between items-center mb-12">
            <div className="text-left">
              <h1 className="text-4xl font-black italic uppercase">WELCOME, {user?.name}!</h1>
              <p className="text-gray-500 font-medium">Here are your payment and ticket details.</p>
            </div>
            <div className="relative p-3 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer">
              <Bell className="text-lime-400 group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <StatCard title="Total Tickets" value={bookings.reduce((acc, b) => acc + (b.ticketsBooked || 0), 0)} icon={<Ticket className="text-lime-400"/>} />
            <StatCard title="Completed Payments" value={bookings.length} icon={<CheckCircle className="text-yellow-400"/>} />
            <StatCard title="Active Events" value={[...new Set(bookings.map(b => b.event?._id))].length} icon={<Calendar className="text-white"/>} />
          </div>

          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-left">
              <CreditCard className="text-lime-400" /> Recent Payments & Bookings
            </h2>
            
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
              {bookings.length === 0 ? (
                <div className="p-20 text-center text-gray-500 italic text-left">No bookings have been made yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="p-6">Event</th>
                        <th className="p-6">Date</th>
                        <th className="p-6">Tickets</th>
                        <th className="p-6">Amount</th>
                        <th className="p-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-white/5 transition-colors group">
                          <td className="p-6 text-left">
                             <div className="font-bold">{booking.event?.title || 'Unknown Event'}</div>
                             <div className="text-[10px] text-gray-500 uppercase tracking-tighter">{booking._id}</div>
                          </td>
                          <td className="p-6 text-gray-400 text-left">
                            {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : new Date(booking.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-6 text-lime-400 font-bold text-left">{booking.ticketsBooked}</td>
                          <td className="p-6 font-mono text-yellow-400 font-bold text-left">LKR {booking.totalAmount}</td>
                          <td className="p-6 flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleDownloadTicket(booking._id)}
                              className="bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-lime-500 transition-all flex items-center gap-2"
                            >
                              <Download size={14} /> Ticket
                            </button>
                            
                            {/* Delete Button (Action වලට දමා ඇත) */}
                            <button 
                              onClick={() => handleDeleteBooking(booking._id)}
                              className="bg-red-500/10 text-red-500 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                              title="Delete Booking"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, path, active = false }) => (
  <Link to={path}>
    <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-gradient-to-r from-lime-500/20 to-transparent text-lime-400 border-l-4 border-lime-500' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}>
      {icon} <span className="font-bold">{label}</span>
    </div>
  </Link>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform">{icon}</div>
    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2 text-left">{title}</p>
    <h3 className="text-5xl font-black italic tracking-tighter text-left">
      {typeof value === 'number' && value < 10 ? `0${value}` : value}
    </h3>
  </div>
);

export default UserDashboard;