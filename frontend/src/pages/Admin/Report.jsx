import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Error එක නැති කිරීමට මෙලෙස import කරන්න
import { Download, FileText, Loader2, Ticket } from 'lucide-react';
import AdminFooter from '../../components/Admin/AdminFooter';

const Report = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('http://localhost:5000/api/bookings/admin/report', config);
                setBookings(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching reports", err);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const generatePDF = () => {
        if (bookings.length === 0) {
            alert("Data not found!");
            return;
        }

        const doc = new jsPDF();
        
        // PDF Header
        doc.setFontSize(18);
        doc.text("Event Management System - Sales Report", 14, 20);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Report Generated: ${new Date().toLocaleString()}`, 14, 28);

        // Table එක සඳහා දත්ත සකස් කිරීම
        const tableColumn = ["User Name", "Event Title", "Tickets", "Total Amount", "Date"];
        const tableRows = bookings.map(b => [
            b.user?.name || 'N/A',
            b.event?.title || 'N/A',
            b.tickets || '1', // Ticket count එක මෙතැනට
            `Rs. ${b.totalAmount}`,
            new Date(b.createdAt).toLocaleDateString()
        ]);

        // autoTable භාවිතා කරන නිවැරදි ක්‍රමය
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [220, 38, 38] }, // Red Header
            styles: { fontSize: 10 }
        });

        doc.save(`Sales_Report_${new Date().getTime()}.pdf`);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
                <Loader2 className="w-10 h-10 animate-spin text-red-600 mb-4" />
                <p className="text-xl font-bold italic tracking-widest uppercase">Fetching Records...</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-transparent min-h-screen text-white font-sans animate-in fade-in duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-red-600/20 p-3 rounded-2xl">
                        <FileText className="text-red-600" size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Sales Report</h1>
                        <p className="text-gray-500 text-sm">Monitor event ticket sales and revenue.</p>
                    </div>
                </div>
                
                <button 
                    onClick={generatePDF}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95"
                >
                    <Download size={20} /> Download PDF
                </button>
            </div>

            {/* Table */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase font-black tracking-widest border-b border-white/10">
                            <tr>
                                <th className="p-6">User Details</th>
                                <th className="p-6">Event</th>
                                <th className="p-6">Tickets</th>
                                <th className="p-6">Total Paid</th>
                                <th className="p-6">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {bookings.length > 0 ? (
                                bookings.map((b) => (
                                    <tr key={b._id} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-lg group-hover:text-red-500 transition-colors">
                                                    {b.user?.name || 'Unknown'}
                                                </span>
                                                <span className="text-xs text-gray-500">{b.user?.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="font-medium text-gray-300 italic">{b.event?.title}</span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <Ticket size={16} className="text-red-500" />
                                                <span className="font-bold">{b.tickets || 1}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-red-500 font-black text-lg">
                                                Rs. {b.totalAmount?.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="p-6 text-gray-500 text-sm font-medium">
                                            {new Date(b.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-24 text-center">
                                        <p className="text-xl font-bold italic opacity-30 uppercase">No Records Found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AdminFooter />
        </div>
    );
};

export default Report;