
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './index.css';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminNavbar from './components/Admin/AdminNavbar';
import AdminDashboard from './pages/Admin/AdminDashboard';

import AddEvent from './pages/Admin/AddEvent';
import EventList from './pages/Admin/EventList';
import EditEvent from './pages/Admin/EditEvent';

import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import UserFooter from './components/User/UserFooter';
import EventListView from './pages/EventListView';

import EventDetailsView from './pages/EventDetailsView';
import AboutUs from './pages/AboutUs';
import ContactUs from'./pages/ContactUs';
import Support from './pages/Support';

import UserList from './pages/Admin/UserList';


import Report from './pages/Admin/Report';
// import ProtectedRoute from './components/ProtectedRoute'; // ඔයාගේ ProtectedRoute එක තියෙන path එක දෙන්න

// Dashboard එක ඇතුළේ Navbar එක පේන්න ඕනේ නිසා පොඩි Helper එකක්
const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-[#050505] pl-64">
    <AdminNavbar />
    <div className="p-8">{children}</div>
  </div>
);


// User Layout Helper
const UserLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-[#050505]">
    <div className="flex-grow">
      {children}
    </div>
    <UserFooter /> {/* මෙතන Footer එක දැම්මම හැම User පේජ් එකකටම වැටෙනවා */}
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* පසුව මෙතනට Admin Login සහ User Login Routes එකතු කරමු */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Dashboard Routes */}
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /><h1 className="text-white text-3xl font-bold">Welcome Home, Admin</h1></AdminLayout>} />
        {/* <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} /> */}

        <Route path="/admin/add-event" element={<AdminLayout><AddEvent /></AdminLayout>} />

        <Route path="/admin/events" element={<AdminLayout><EventList /></AdminLayout>} />

        <Route path="/admin/edit-event/:id" element={<AdminLayout><EditEvent /></AdminLayout>} />

        <Route path="/admin/users" element={<AdminLayout><UserList /></AdminLayout>} />

        {/* සාමාන්‍ය යූසර් ලොගින් එක - දැන් බටන් එක වැඩ කරයි! */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        {/* <Route path="/home" element={<UserDashboard />} /> */}
        <Route path="/home" element={<UserLayout><UserDashboard /></UserLayout>} />
        {/* <Route path="/events" element={<UserLayout><EventListView /></UserLayout>} /> */}

        <Route path="/events" element={<UserLayout><EventListView /></UserLayout>} />
        <Route path="/event/:id" element={<EventDetailsView />} />
        <Route path="/aboutus" element={<UserLayout><AboutUs/></UserLayout>} />
        <Route path="/contactus" element={<UserLayout><ContactUs/></UserLayout>} />
        <Route path="/support" element={<UserLayout><Support/></UserLayout>} />

        {/* <Route path="/admin/reports" element={
  <ProtectedRoute adminOnly={true}>
    <Report />
  </ProtectedRoute>
} /> */}


{/* <Route path="/admin/reports" element={<Report />} /> */}

<Route path="/admin/reports" element={<AdminLayout><Report/></AdminLayout>} />

        {/* <Route path="/admin/users" element={<UserList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;