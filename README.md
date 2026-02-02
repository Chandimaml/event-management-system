# 🎟️ Advanced Event Management System with Secure Payments

A modern, full-stack event booking and management solution built using the **MERN** stack (MongoDB, Express.js, React, Node.js). This system allows users to discover events, book tickets securely, and receive digital tickets with QR codes.

## 🚀 Key Features

### 🔐 Secure Authentication
- User and Admin authentication using **JWT (JSON Web Tokens)**.
- Password encryption using **Bcrypt.js**.
- Role-based access control (Protected routes for Admins).

### 💳 Stripe Payment Integration
- Fully integrated with **Stripe API** for secure online transactions.
- Automatic payment confirmation and booking generation.
- Support for various card types.

### 🎫 Smart Ticketing & QR Codes
- Automated digital ticket generation upon successful payment.
- **QR Code integration** for each ticket to ensure authenticity and easy check-in.
- Tickets are downloadable as PDF files.

### 📊 Admin Dashboard & Reporting
- Comprehensive dashboard for event and user management.
- **Sales Reports**: Admins can view detailed transaction history.
- **PDF Export**: Generate and download professional sales reports including ticket counts and revenue details using `jsPDF` and `jspdf-autotable`.

### 🎨 Modern UI/UX
- Responsive and sleek dark-themed interface built with **Tailwind CSS**.
- Interactive icons provided by **Lucide-React**.
- Smooth navigation and state management.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Lucide-React, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose ODM).
- **Payment Gateway:** Stripe.
- **Reporting & Tickets:** jsPDF, jspdf-autotable, QR Code generator.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/event-management-system.git](https://github.com/your-username/event-management-system.git)
