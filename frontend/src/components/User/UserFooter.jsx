import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Send } from 'lucide-react';

const UserFooter = () => {
  return (
    // මෙන්න මෙතනට ml-64 එකතු කළා Sidebar එක මගහරින්න
    <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-8 px-10 relative overflow-hidden ml-64">
      {/* Background Neon Glows */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-500/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 text-left">
        
        {/* Logo & About */}
        <div className="col-span-1 md:col-span-1">
          <div className="text-3xl font-black tracking-tighter mb-6">
            EVENT<span className="text-lime-400 italic">PASS</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            ලංකාවේ අංක එකේ Event Booking ප්ලැට්ෆෝම් එක. අප හා එක්වී ඔබේ මතකයන් වඩාත් වර්ණවත් කරගන්න.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em] border-l-4 border-lime-500 pl-3">Quick Links</h4>
          <ul className="space-y-3 text-gray-500 text-sm font-medium">
            <li className="hover:text-lime-400 cursor-pointer transition-all">Upcoming Events</li>
            <li className="hover:text-lime-400 cursor-pointer transition-all">Support Center</li>
            <li className="hover:text-lime-400 cursor-pointer transition-all">About Our Journey</li>
            <li className="hover:text-lime-400 cursor-pointer transition-all">Privacy & Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em] border-l-4 border-yellow-500 pl-3">Get in Touch</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-lime-400 shrink-0" />
              <span>No 123, Event Plaza, <br/> Colombo 07, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-lime-400" />
              <span>+94 112 345 678</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-lime-400" />
              <span>hello@eventpass.lk</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-[0.2em] border-l-4 border-white pl-3">Newsletter</h4>
          <p className="text-gray-500 text-xs mb-4 italic">අලුත්ම Event ගැන දැනගන්න අපිත් එක්ක එකතු වෙන්න.</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Your email..." 
              className="w-full bg-white/5 border border-white/10 py-3 pl-4 pr-12 rounded-xl outline-none focus:border-lime-500 transition-all text-white text-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-lime-500 p-2 rounded-lg hover:bg-lime-400 transition-colors">
              <Send size={16} className="text-black" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 tracking-widest uppercase">
        <p>© 2026 EVENTPASS PRO • ALL RIGHTS RESERVED</p>
        <div className="flex gap-6">
          <span className="hover:text-lime-400 cursor-pointer">Sitemap</span>
          <span className="hover:text-lime-400 cursor-pointer">Cookies</span>
          <span className="hover:text-lime-400 cursor-pointer">Security</span>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-lime-400 hover:border-lime-400 hover:bg-lime-400/5 transition-all cursor-pointer">
    {icon}
  </div>
);

export default UserFooter;