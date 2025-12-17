import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Buy from './pages/Buy';
import CarDetail from './pages/CarDetail';
import Sell from './pages/Sell';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import ManageCars from './pages/ManageCars';
import CarForm from './pages/CarForm';
import Dashboard from './pages/Dashboard';
import CarsInBahriaTown from './pages/CarsInBahriaTown';
import SalePurchaseBahriaTown from './pages/SalePurchaseBahriaTown';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - with TopBar and Footer */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/buy" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <Buy />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/car/:id" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <CarDetail />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/sell" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <Sell />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <About />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <Contact />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/login" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <Login />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/cars-in-bahria-town" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <CarsInBahriaTown />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/sale-purchase-cars-bahria-town" element={
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-grow">
              <SalePurchaseBahriaTown />
            </main>
            <Footer />
          </div>
        } />

        {/* Protected Admin Routes - with AdminLayout (no TopBar/Footer) */}
        <Route path="/adminhome" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/cars" element={
          <ProtectedRoute>
            <AdminLayout>
              <ManageCars />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/cars/add" element={
          <ProtectedRoute>
            <AdminLayout>
              <CarForm />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/cars/edit/:id" element={
          <ProtectedRoute>
            <AdminLayout>
              <CarForm />
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
