import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, User, Mail, ShieldCheck, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminFooter from '../../components/Admin/AdminFooter';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // සියලුම Users ලා ලබාගැනීම
  const fetchUsers = async () => {
    try {
      // මෙතන 'userToken' ලෙස තිබිය යුතුයි
      const token = localStorage.getItem('userToken');
      console.log("යවන Token එක:", token); 
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // ඔයාගේ route එක api/users/users නිසා URL එක මෙසේ විය යුතුයි
      const { data } = await axios.get('http://localhost:5000/api/users/users', config);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // User කෙනෙක්ව Delete කිරීම
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // වැරැද්ද මෙතනයි: 'adminToken' වෙනුවට 'userToken' ලෙස තිබිය යුතුයි
        const token = localStorage.getItem('userToken'); 
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Delete route එකත් හරියටම api/users/users/:id විය යුතුයි
        await axios.delete(`http://localhost:5000/api/users/users/${id}`, config);
        
        fetchUsers(); // ලැයිස්තුව Refresh කරන්න
      } catch (error) {
        console.error("Error deleting user", error);
        alert("Error deleting user");
      }
    }
  };

  // Search filter
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      <main className="flex-grow p-10 ml-64">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black text-white uppercase italic">Registered Users</h1>
              <p className="text-gray-500 text-sm">Manage and monitor all platform members.</p>
            </div>
            {/* Search Bar */}
            <div className="relative w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:border-red-500 outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </header>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-6 text-gray-400 text-xs font-black uppercase tracking-widest">User Details</th>
                  <th className="p-6 text-gray-400 text-xs font-black uppercase tracking-widest">Role</th>
                  <th className="p-6 text-gray-400 text-xs font-black uppercase tracking-widest">Joined Date</th>
                  <th className="p-6 text-gray-400 text-xs font-black uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-white/10">
                          <User className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold">{user.name}</p>
                          <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                            <Mail size={12} /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-sm">
                      {user.role === 'admin' ? (
                        <span className="flex items-center gap-1 text-red-500 font-bold uppercase text-[10px] tracking-tighter">
                          <ShieldCheck size={14} /> Administrator
                        </span>
                      ) : (
                        <span className="text-gray-400 font-medium text-xs">Member</span>
                      )}
                    </td>
                    <td className="p-6 text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6 text-right">
                      {user.role !== 'admin' && ( 
                        <button 
                          onClick={() => deleteHandler(user._id)}
                          className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="py-20 text-center text-gray-600 font-bold uppercase tracking-widest">
                No users found matching your search.
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default UserList;