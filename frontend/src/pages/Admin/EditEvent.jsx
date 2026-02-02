import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Type, AlignLeft, Clock, Ticket, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', location: '', date: '', startTime: '', totalTickets: '', image: null
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        const data = res.data;
        const formattedDate = data.date ? data.date.split('T')[0] : '';
        setFormData({ 
          title: data.title || '',
          description: data.description || '',
          price: data.price || '',
          location: data.location || '',
          date: formattedDate,
          startTime: data.startTime || '',
          totalTickets: data.totalTickets || '',
          image: null 
        });
      } catch (err) {
        alert("Data not found!!!");
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key] === null) return;
        data.append(key, formData[key]);
      });

      await axios.put(`http://localhost:5000/api/events/${id}`, data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      alert('Event එක සාර්ථකව Update කළා!');
      navigate('/admin/events');
    } catch (err) {
      alert('Update කිරීම අසාර්ථකයි.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Event</h1>
        <p className="text-gray-500 text-sm mt-1">Update the details for "{formData.title}"</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl">
        {/* Left Column */}
        <div className="space-y-5">
          <div>
            <label className="text-gray-400 text-xs font-bold uppercase ml-1">Event Title</label>
            <div className="relative mt-2">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" value={formData.title} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-500 transition-all" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs font-bold uppercase ml-1">Location</label>
            <div className="relative mt-2">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" value={formData.location} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-500 transition-all" onChange={(e) => setFormData({...formData, location: e.target.value})} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase ml-1">Date</label>
              <input type="date" value={formData.date} className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:border-red-500" onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase ml-1">Start Time</label>
              <input type="time" value={formData.startTime} className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:border-red-500" onChange={(e) => setFormData({...formData, startTime: e.target.value})} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase ml-1">Price ($)</label>
              <input type="number" value={formData.price} className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:border-red-500" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase ml-1">Tickets</label>
              <input type="number" value={formData.totalTickets} className="w-full mt-2 bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:border-red-500" onChange={(e) => setFormData({...formData, totalTickets: e.target.value})} required />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          <div>
            <label className="text-gray-400 text-xs font-bold uppercase ml-1">Description</label>
            <div className="relative mt-2">
              <AlignLeft className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
              <textarea rows="6" value={formData.description} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-red-500 transition-all" onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
            </div>
          </div>
          
          <div>
            <label className="text-red-500 text-xs font-bold uppercase ml-1 italic">Update Banner (Leave empty to keep current)</label>
            <input type="file" className="w-full mt-2 text-gray-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500/10 file:text-red-500 hover:file:bg-red-500/20 cursor-pointer" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all mt-4 uppercase tracking-widest text-sm">
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditEvent;