import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Calendar, ArrowRight, Sparkles, 
  Home, LayoutGrid, LifeBuoy, Info, Phone, LogOut 
} from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Footer එක Import කරන්න
import UserFooter from '../components/User/UserFooter';

const EventListView = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/events`);
        setEvents(res.data);
      } catch (err) {
        console.error("Events fetch error:", err);
      }
    };
    fetchEvents();
  }, []);

    // --- Logout Function ---
  const handleLogout = () => {
    if (window.confirm("ඔබට Logout වීමට අවශ්‍යද?")) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      // කෙලින්ම ලොගින් පේජ් එකට යවමු
      window.location.href = '/login';
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      
      {/* --- Sidebar Navigation (Dashboard එකේ විදිහටම) --- */}
      <aside className="w-64 bg-black/50 border-r border-white/5 flex flex-col p-6 fixed h-full z-20 backdrop-blur-xl">
        <div className="text-2xl font-black mb-12 tracking-tighter">
          EVENT<span className="text-lime-400">PASS</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <NavItem icon={<Home size={20}/>} label="Home" path="/home" />
          <NavItem icon={<LayoutGrid size={20}/>} label="Event View" path="/events" active />
          <NavItem icon={<LifeBuoy size={20}/>} label="Supports" path="/support" />
          <NavItem icon={<Info size={20}/>} label="About Us" path="/aboutus" />
          <NavItem icon={<Phone size={20}/>} label="Contact Us" path="/contactus" />
        </nav>

        {/* Logout Button Fixed */}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 transition-all mt-auto border-t border-white/5 pt-6 cursor-pointer w-full text-left"
                  >
                    <LogOut size={20} /> <span className="font-bold">Logout</span>
                  </button>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="ml-64 flex-grow flex flex-col min-h-screen">
        <main className="p-10 flex-grow relative">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-lime-500/5 rounded-full blur-[150px] -z-10"></div>
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 text-lime-400 font-bold mb-2 uppercase tracking-widest text-[10px]">
                <Sparkles size={14} /> Official Event Tickets
              </div>
              <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
                Explore <span className="text-lime-400">Events</span>
              </h1>
            </motion.div>

            {/* Search Bar */}
            <div className="relative group w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-lime-400 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search events..."
                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-6 rounded-2xl outline-none focus:border-lime-500/40 transition-all backdrop-blur-md placeholder:text-gray-600"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEvents.map((event, index) => {
              let finalImageUrl = event.image 
                ? `${BACKEND_URL}/${event.image.replace(/\\/g, '/').replace(/^\//, '')}`
                : "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4";

              return (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden hover:border-lime-500/20 transition-all duration-500 shadow-xl"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={finalImageUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"; }}
                    />
                    <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl">
                      <span className="text-lime-400 font-black tracking-tighter text-xl">${event.price}</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-black italic uppercase leading-tight mb-6 group-hover:text-lime-400 transition-colors line-clamp-1">
                      {event.title}
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-gray-400">
                        <Calendar size={18} className="text-lime-500" />
                        <span className="text-xs font-bold uppercase">{new Date(event.date).toDateString()}</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                        <MapPin size={18} className="text-lime-500" />
                        <span className="text-xs font-medium line-clamp-1 italic">{event.location}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/event/${event._id}`)}
                      className="w-full bg-white/5 border border-white/10 hover:bg-lime-500 hover:text-black py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all group/btn"
                    >
                      Book Seat <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        {/* <UserFooter /> */}
      </div>
    </div>
  );
};

// NavItem Component (Sidebar එක සඳහා)
const NavItem = ({ icon, label, path, active = false }) => (
  <Link to={path}>
    <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-gradient-to-r from-lime-500/20 to-transparent text-lime-400 border-l-4 border-lime-500' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}>
      {icon} <span className="font-bold">{label}</span>
    </div>
  </Link>
);

export default EventListView;