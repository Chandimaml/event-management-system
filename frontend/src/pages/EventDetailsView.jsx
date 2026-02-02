import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, LayoutGrid, LifeBuoy, Info, Phone, LogOut, 
  Calendar, Plus, Minus, Ticket, ArrowLeft, Clock, X, CreditCard, Lock, MapPin
} from 'lucide-react';
import UserFooter from '../components/User/UserFooter';

const EventDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };
    fetchEvent();
  }, [id, BACKEND_URL]);
  // --- Logout Function ---
  const handleLogout = () => {
    if (window.confirm("ඔබට Logout වීමට අවශ්‍යද?")) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      // කෙලින්ම ලොගින් පේජ් එකට යවමු
      window.location.href = '/login';
    }
  };

  // පේමන්ට් එක සාර්ථක වූ පසු Dashboard එකට යවන function එක
  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('userToken');
      
      const bookingData = {
        eventId: event._id,
        numTickets: ticketCount
      };

      const response = await axios.post(`${BACKEND_URL}/api/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // සාර්ථක නම් පමණක් Alert එක දී Dashboard එකට යවමු
      if (response.status === 201 || response.status === 200) {
        setIsCheckoutOpen(false);
        
        // Alert එක 'OK' කළ සැණින් Dashboard එකට යන්න window.location පාවිච්චි කරමු
        alert("🎉 Payment Successful! Your tickets are booked.");
        window.location.href = '/home'; 
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!event) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-lime-400 font-bold uppercase italic text-4xl animate-pulse">Loading...</div>;

  const finalImageUrl = event.image ? `${BACKEND_URL}/${event.image.replace(/\\/g, '/').replace(/^\//, '')}` : "";

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans text-left">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black/50 border-r border-white/5 flex flex-col p-6 fixed h-full z-20 backdrop-blur-xl">
        <div className="text-2xl font-black mb-12 tracking-tighter">EVENT<span className="text-lime-400">PASS</span></div>
        <nav className="flex-grow space-y-2 text-left">
          <NavItem icon={<Home size={20}/>} label="Home" path="/home" />
          <NavItem icon={<LayoutGrid size={20}/>} label="Event View" path="/events" active />
          <NavItem icon={<LifeBuoy size={20}/>} label="Supports" path="/support" />
          <NavItem icon={<Info size={20}/>} label="About Us" path="/aboutus" />
          <NavItem icon={<Phone size={20}/>} label="Contact Us" path="/contactusS" />
        </nav>
        {/* Logout Button Fixed */}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 transition-all mt-auto border-t border-white/5 pt-6 cursor-pointer w-full text-left"
                  >
                    <LogOut size={20} /> <span className="font-bold">Logout</span>
                  </button>
      </aside>

      <div className="ml-64 flex-grow flex flex-col">
        <main className="p-10 flex-grow relative text-left">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-lime-400 mb-8 font-bold uppercase tracking-widest text-xs transition-colors">
            <ArrowLeft size={18} /> Back to Events
          </button>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 shadow-2xl">
            
            {/* Image Section */}
            <div className="lg:w-1/2 h-[550px] rounded-[3rem] overflow-hidden border border-white/10 shadow-lg">
              <img src={finalImageUrl} alt={event.title} className="w-full h-full object-cover" />
            </div>

            {/* Info Section */}
            <div className="lg:w-1/2 flex flex-col justify-between py-4 text-left">
              <div>
                <h1 className="text-5xl font-black italic uppercase text-white mb-6 tracking-tighter leading-tight text-left">{event.title}</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[1.5rem] border border-white/5">
                    <Calendar className="text-lime-500" size={20} />
                    <p className="text-sm font-bold uppercase italic">{formattedDate}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[1.5rem] border border-white/5">
                    <Clock className="text-lime-500" size={20} />
                    <p className="text-sm font-bold uppercase italic">{formattedTime}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[1.5rem] border border-white/5 sm:col-span-2">
                    <MapPin className="text-lime-500" size={20} />
                    <p className="text-sm font-bold uppercase italic tracking-wide">{event.location || "Location not specified"}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-[10px] uppercase text-lime-500 font-black mb-2 tracking-[0.2em] text-left">About Event</h3>
                  <p className="text-gray-400 text-lg italic leading-relaxed border-l-2 border-lime-500/20 pl-6 text-left">
                    {event.description || "No description available for this event."}
                  </p>
                </div>
              </div>

              <div className="bg-[#111] p-8 rounded-[3rem] border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Select Quantity</span>
                  <div className="flex items-center gap-4 bg-black p-2 rounded-full border border-white/10">
                    <button onClick={() => ticketCount > 1 && setTicketCount(ticketCount - 1)} className="w-10 h-10 rounded-full hover:bg-lime-500 hover:text-black transition-all flex items-center justify-center"><Minus size={18}/></button>
                    <span className="text-xl font-bold text-lime-400 w-6 text-center">{ticketCount}</span>
                    <button onClick={() => ticketCount < (event.availableTickets || 10) && setTicketCount(ticketCount + 1)} className="w-10 h-10 rounded-full hover:bg-lime-500 hover:text-black transition-all flex items-center justify-center"><Plus size={18}/></button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex flex-col text-left">
                    <span className="text-gray-500 text-[10px] uppercase font-black">Total Price</span>
                    <span className="text-4xl font-black text-white italic tracking-tighter">
                      LKR {(event.price * ticketCount).toLocaleString()}
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="bg-lime-500 text-black px-10 py-5 rounded-[2rem] font-black uppercase italic hover:bg-white transition-all shadow-xl shadow-lime-500/20 flex items-center gap-2"
                  >
                    <Ticket size={20} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <UserFooter />
      </div>

      {/* --- STRIPE DUMMY CHECKOUT MODAL --- */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/80">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f0f0f] border border-white/10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 text-left">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black italic uppercase tracking-tighter">Secure Checkout</h2>
                  <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-500 hover:text-white"><X /></button>
                </div>

                <div className="mb-6 bg-lime-500/5 border border-lime-500/20 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase text-lime-500 font-black mb-1">Total Payable</p>
                    <p className="text-3xl font-black italic">LKR {(event.price * ticketCount).toLocaleString()}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-bold block mb-2 px-1">Card Number</label>
                    <div className="bg-black border border-white/10 p-4 rounded-2xl flex items-center gap-3 focus-within:border-lime-500 transition-colors">
                        <CreditCard className="text-gray-500" size={18} />
                        <input type="text" placeholder="4242 4242 4242 4242" className="bg-transparent outline-none w-full font-mono text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black border border-white/10 p-4 rounded-2xl focus-within:border-lime-500 transition-colors">
                        <input type="text" placeholder="MM/YY" className="bg-transparent outline-none w-full font-mono text-sm text-white" />
                    </div>
                    <div className="bg-black border border-white/10 p-4 rounded-2xl flex items-center gap-2 focus-within:border-lime-500 transition-colors">
                        <Lock className="text-gray-500" size={14} />
                        <input type="text" placeholder="CVC" className="bg-transparent outline-none w-full font-mono text-sm text-white" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePaymentSuccess}
                  disabled={isProcessing}
                  className="w-full mt-8 bg-lime-500 text-black py-5 rounded-2xl font-black uppercase italic hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : `Pay LKR ${(event.price * ticketCount).toLocaleString()}`}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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

export default EventDetailsView;