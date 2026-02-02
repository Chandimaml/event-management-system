import React from 'react';
import { Home, LayoutGrid, LifeBuoy, Info, Phone, LogOut, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserFooter from '../components/User/UserFooter'; // පරීක්ෂා කරන්න ඔබේ folder path එක නිවැරදිද කියා

const ContactUs = () => {
  // Logout Function
  const handleLogout = () => {
    if (window.confirm("Do you want to Logout??")) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white text-left font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-black/50 border-r border-white/5 flex flex-col p-6 fixed h-full z-20 backdrop-blur-xl">
        <div className="text-2xl font-black mb-12 tracking-tighter">
          EVENT<span className="text-lime-400">PASS</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <NavItem icon={<Home size={20}/>} label="Home" path="/home" />
          <NavItem icon={<LayoutGrid size={20}/>} label="Event View" path="/events" />
          <NavItem icon={<LifeBuoy size={20}/>} label="Supports" path="/support" />
          <NavItem icon={<Info size={20}/>} label="About Us" path="/aboutus" />
          <NavItem icon={<Phone size={20}/>} label="Contact Us" path="/contactus" active />
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 text-gray-500 hover:text-red-500 transition-all mt-auto border-t border-white/5 pt-6 cursor-pointer w-full text-left font-bold"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-grow relative flex flex-col min-h-screen">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="p-10 flex-grow">
          <header className="mb-12">
            <h1 className="text-5xl font-black italic uppercase">
              Contact Us / <span className="text-lime-400">සම්බන්ධ වන්න</span>
            </h1>
            <p className="text-gray-500 font-medium mt-2 italic">අපි ඔබව ඇසීමට බලා සිටින්නෙමු.</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContactCard 
              icon={<Phone className="text-lime-400" size={32}/>} 
              title="Call Us" 
              detail="+94 112 345 678" 
              detailSi="අපට අමතන්න" 
            />
            <ContactCard 
              icon={<Mail className="text-lime-400" size={32}/>} 
              title="Email" 
              detail="hello@eventpass.lk" 
              detailSi="ඊමේල් පණිවිඩයක් එවන්න" 
            />
            <ContactCard 
              icon={<MapPin className="text-lime-400" size={32}/>} 
              title="Location" 
              detail="Colombo, Sri Lanka" 
              detailSi="අපගේ ලිපිනය" 
            />
          </div>
        </div>

        
        {/* <UserFooter /> */}
      </main>
    </div>
  );
};

// --- Helper Components ---

const NavItem = ({ icon, label, path, active = false }) => (
  <Link to={path} className="block">
    <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
      active 
        ? 'bg-gradient-to-r from-lime-500/20 to-transparent text-lime-400 border-l-4 border-lime-500' 
        : 'text-gray-500 hover:bg-white/5 hover:text-white'
    }`}>
      {icon} <span className="font-bold">{label}</span>
    </div>
  </Link>
);

const ContactCard = ({ icon, title, detail, detailSi }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md hover:border-lime-500/30 transition-all group">
    <div className="mb-6 bg-lime-500/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">{title}</h3>
    <p className="text-gray-400 font-bold mb-1">{detail}</p>
    <p className="text-gray-500 text-sm font-medium">{detailSi}</p>
  </div>
);

// අනිවාර්යයෙන්ම මේ පේළිය අවසානයට තිබිය යුතුයි
export default ContactUs;