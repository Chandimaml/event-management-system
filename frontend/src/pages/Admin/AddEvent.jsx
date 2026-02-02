import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Type, AlignLeft, Clock, Image as ImageIcon, Ticket } from 'lucide-react';
import axios from 'axios';
// 1. Footer එක මෙතනින් Import කරගන්න
import AdminFooter from '../../components/Admin/AdminFooter'; 

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    date: '',
    startTime: '',
    image: null,
    totalTickets:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2. Token එක ගන්න 'userToken' කියන නම පාවිච්චි කරන්න
      const token = localStorage.getItem('userToken'); 
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('location', formData.location);
      data.append('date', formData.date);
      data.append('startTime', formData.startTime);
      data.append('image', formData.image);
      data.append('totalTickets', formData.totalTickets);

      await axios.post('http://localhost:5000/api/events', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });

      alert('Event එක සාර්ථකව එකතු කළා!');
    } catch (err) {
      alert('Event එක දාන්න බැරි වුණා. පසුව උත්සාහ කරන්න.');
    }
  };

  return (
    // 3. මුළු පේජ් එකම Flex Column එකක් කිරීමෙන් Footer එක අඩියටම තල්ලු වේ
    <div className="flex flex-col min-h-screen">
      
      {/* 4. Form එක අඩංගු ප්‍රධාන කොටස (ml-64 Sidebar එක සඳහා) */}
      <main className="flex-grow p-10 ml-64 bg-[#050505]">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Add New Event</h1>
            <p className="text-gray-500 text-sm mt-1">Fill in the details to publish your next big event.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase ml-1 mb-2">Event Title</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" placeholder="Mega Music Festival" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-all placeholder:text-gray-700" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase ml-1 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" placeholder="Nelum Pokuna, Colombo" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-all placeholder:text-gray-700" onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold uppercase ml-1 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-all" onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold uppercase ml-1 mb-2">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="time" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-all" onChange={(e) => setFormData({...formData, startTime: e.target.value})} required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase ml-1 mb-2">Ticket Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="number" placeholder="25.00" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-all placeholder:text-gray-700" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase ml-1 mb-2">Total Tickets</label>
                <div className="relative">
                  <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="number" placeholder="200" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-all placeholder:text-gray-700" onChange={(e) => setFormData({...formData, totalTickets: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase ml-1 mb-2">Description</label>
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                  <textarea rows="4" placeholder="Describe your event in detail..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-all placeholder:text-gray-700" onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-semibold uppercase ml-1 mb-2">Event Banner</label>
                <div className="relative border-2 border-dashed border-white/10 rounded-[2rem] p-8 text-center hover:border-red-500/50 hover:bg-red-500/5 transition-all cursor-pointer group">
                  <input type="file" className="hidden" id="fileInput" accept="image/*" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />
                  <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6 text-gray-500 group-hover:text-red-500" />
                    </div>
                    <span className="text-gray-400 text-sm font-medium">
                      {formData.image ? formData.image.name : 'Click to upload image'}
                    </span>
                    <span className="text-gray-600 text-[10px] mt-1 italic">PNG, JPG up to 5MB</span>
                  </label>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-red-600/20 transition-all mt-4 uppercase tracking-widest text-sm"
              >
                Publish Event
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* 5. අවසානයට Footer එක */}
      <AdminFooter />

    </div>
  );
};

// 6. අමතක නොකර Export කරන්න
export default AddEvent;