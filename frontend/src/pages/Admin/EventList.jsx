import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar, MapPin, Ticket, Clock, AlignLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Events fetch error:", err);
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('adminToken');
        
        // Header එක හරියටම සකස් කිරීම
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        await axios.delete(`http://localhost:5000/api/events/${id}`, config);
        
        // State එක අප්ඩේට් කර මකා දැමූ Event එක UI එකෙන් ඉවත් කිරීම
        setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
        alert('Event removed successfully!');
      } catch (err) {
        console.error("Delete Error:", err.response?.data);
        alert(err.response?.data?.message || 'Unable to remove. Please try again.');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
      <Loader2 className="w-10 h-10 animate-spin text-red-500 mb-4" />
      <p className="animate-pulse">Loading Events...</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Events</h1>
          <p className="text-gray-500 text-sm mt-1">Editing or removal can be done here.</p>
        </div>
        <div className="bg-red-500/10 text-red-500 px-6 py-3 rounded-2xl border border-red-500/20 font-bold">
          Total: {events.length}
        </div>
      </div>

      {/* Events List Grid */}
      <div className="grid gap-6">
        {events.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-[2.5rem] py-20 text-center">
            <p className="text-gray-500 italic">No events found. Add some first!</p>
            <Link to="/admin/add-event" className="text-red-500 mt-4 inline-block hover:underline">Click here to add new event</Link>
          </div>
        ) : (
          events.map((event) => (
            <motion.div 
              layout
              key={event._id} 
              className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col lg:flex-row items-center gap-6 hover:bg-white/10 transition-all border-l-4 border-l-transparent hover:border-l-red-500"
            >
              
              {/* Event Image */}
              <div className="w-full lg:w-48 h-32 flex-shrink-0 relative overflow-hidden rounded-3xl border border-white/10 shadow-xl">
                <img 
                  src={`http://localhost:5000${event.image}`} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                />
              </div>

              {/* Event Details */}
              <div className="flex-grow space-y-3 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{event.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Price:</span>
                    <span className="text-green-500 font-bold text-xl">${event.price}</span>
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="text-gray-400 text-sm line-clamp-1 flex items-center gap-2 bg-black/20 p-2 rounded-lg">
                  <AlignLeft size={14} className="text-gray-600 shrink-0" /> 
                  <span className="italic">{event.description}</span>
                </p>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-gray-400">
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <Calendar size={14} className="text-red-500" /> 
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <Clock size={14} className="text-red-500" /> 
                    {event.startTime || 'Not Set'}
                  </span>
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <MapPin size={14} className="text-red-500" /> 
                    {event.location}
                  </span>
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <Ticket size={14} className="text-red-500" /> 
                    {event.totalTickets} Total Tickets
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex lg:flex-col gap-3 w-full lg:w-auto">
                <Link to={`/admin/edit-event/${event._id}`} className="flex-1">
                  <button 
                    className="group w-full p-4 bg-blue-500/10 rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20 shadow-lg"
                    title="Edit Event"
                  >
                    <Edit size={20} className="mx-auto group-hover:scale-110 transition-transform" />
                  </button>
                </Link>
                <button 
                  onClick={() => deleteEvent(event._id)}
                  className="group flex-1 p-4 bg-red-500/10 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg"
                  title="Delete Event"
                >
                  <Trash2 size={20} className="mx-auto group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default EventList;