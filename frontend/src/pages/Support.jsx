import React from 'react';
import { Home, LayoutGrid, LifeBuoy, Info, Phone, LogOut, HelpCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserFooter from '../components/User/UserFooter'; //  folder path එක පරීක්ෂා කරන්න

const Support = () => {
  // Logout Function
  const handleLogout = () => {
    if (window.confirm("Do you want to Logout?")) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
  };

  const faqs = [
    { 
      q: "How to download my ticket?", 
      a: "Go to your dashboard and click the 'Download' button next to your booking.", 
      qS: "ටිකට් එක ඩවුන්ලෝඩ් කරන්නේ කොහොමද?", 
      aS: "ඔබේ Dashboard එකට ගොස් අදාළ වෙන්කිරීම අසල ඇති 'Download' බොත්තම ක්ලික් කරන්න." 
    },
    { 
      q: "Can I cancel a booking?", 
      a: "Yes, you can use the delete button in the dashboard to cancel bookings before the event starts.", 
      qS: "වෙන්කිරීමක් අවලංගු කළ හැකිද?", 
      aS: "ඔව්, උත්සවය ආරම්භ වීමට පෙර Dashboard එකේ ඇති 'Delete' බොත්තම මඟින් එය අවලංගු කළ හැක." 
    },
    { 
      q: "Is digital ticket enough for entry?", 
      a: "Absolutely! Just show your QR code at the entrance of the event venue.", 
      qS: "ඇතුල් වීමට ඩිජිටල් ටිකට් එක ප්‍රමාණවත්ද?", 
      aS: "අනිවාර්යයෙන්ම! උත්සව භූමියට ඇතුල් වීමේදී ඔබේ QR කේතය පෙන්වන්න." 
    }
  ];

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
          <NavItem icon={<LifeBuoy size={20}/>} label="Supports" path="/support" active />
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

      {/* Main Content Area */}
      <main className="ml-64 flex-grow relative flex flex-col min-h-screen">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="p-10 flex-grow">
          <header className="mb-12">
            <h1 className="text-5xl font-black italic uppercase">
              Support / <span className="text-lime-400">HELP</span>
            </h1>
            <p className="text-gray-500 font-medium mt-2 italic">Check the information below to get any assistance you need.</p>
          </header>
          
          <div className="space-y-6 max-w-4xl">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md hover:border-lime-500/20 transition-all group">
                <div className="flex gap-4 items-start">
                  <div className="bg-lime-500/10 p-3 rounded-xl text-lime-400">
                    <HelpCircle size={24} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:text-lime-400 transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{faq.a}</p>
                    
                    <div className="h-px bg-white/5 w-full my-4"></div>
                    
                    <h3 className="text-lg font-bold text-gray-300 mb-2">{faq.qS}</h3>
                    <p className="text-gray-500 leading-relaxed">{faq.aS}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Support Card */}
          <div className="mt-12 bg-lime-500/10 border border-lime-500/20 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-black italic uppercase mb-2">Still need help?</h2>
              <p className="text-gray-400 font-medium">Contact our customer service team.</p>
            </div>
            <Link to="/contactus">
              <button className="bg-lime-500 text-black px-8 py-4 rounded-2xl font-black uppercase flex items-center gap-2 hover:bg-lime-400 transition-all">
                Contact Support <ChevronRight size={20} />
              </button>
            </Link>
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

export default Support;