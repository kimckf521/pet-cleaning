'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Trash2, CheckCircle, Clock, Search, RefreshCw, LogOut, ChevronRight, User, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  numCats: number;
  frequency: number;
  timeOfDay: string;
  notes?: string;
  createdAt: string;
  status?: 'pending' | 'contacted';
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        headers: { 'admin-token': token || 'scoopo-admin-2026' }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
        setIsAuthenticated(true);
      } else {
        setError('Unauthorized or server error');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'admin-token': token || 'scoopo-admin-2026' 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
      }
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'admin-token': token || 'scoopo-admin-2026' }
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b.id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.address.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-6">
          <div className="flex items-center gap-3 text-brand-blue mb-4">
            <ShieldCheck size={32} />
            <h1 className="text-2xl font-bold">Admin Login</h1>
          </div>
          <p className="text-gray-500 text-sm">Please enter your administrative token to continue.</p>
          <input 
            type="password" 
            placeholder="Admin Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue"
          />
          <button 
            onClick={fetchBookings}
            className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition-all"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-50 flex items-center gap-2 text-brand-blue font-bold text-xl">
          <ShieldCheck />
          ScooPo Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="bg-blue-50 text-brand-blue px-4 py-3 rounded-xl font-bold flex items-center gap-3">
            <Clock size={20} />
            Recent Bookings
          </div>
        </nav>
        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full text-gray-400 hover:text-red-500 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl w-full max-w-md">
            <Search className="text-gray-400" size={18} />
            <input 
              placeholder="Search by name or address..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm"
            />
          </div>
          <button 
            onClick={fetchBookings}
            className="ml-4 p-2 text-gray-400 hover:text-brand-blue transition-colors rounded-lg hover:bg-blue-50"
            title="Refresh"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </header>

        <section className="p-8 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            <div className="flex gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                <span className="text-gray-400 text-sm font-medium">Total:</span>
                <span className="text-brand-blue font-bold">{bookings.length}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
                <RefreshCw size={40} className="animate-spin" />
                <p>Loading bookings...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                <p className="text-gray-400">No bookings found.</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className={`bg-white p-6 rounded-3xl shadow-sm border ${booking.status === 'contacted' ? 'border-green-100 opacity-75' : 'border-gray-100'} hover:shadow-md transition-shadow group flex items-start gap-6`}>
                  <div className={`w-12 h-12 ${booking.status === 'contacted' ? 'bg-green-50 text-brand-green' : 'bg-blue-50 text-brand-blue'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    {booking.status === 'contacted' ? <CheckCircle size={24} /> : <User size={24} />}
                  </div>
                  <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <h3 className="font-bold text-gray-900 truncate">{booking.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock size={12} />
                        {new Date(booking.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-brand-blue" />
                        {booking.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-brand-blue" />
                        <span className="truncate">{booking.email}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                       <div className="flex items-start gap-2 text-sm text-gray-600 truncate">
                        <MapPin size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
                        {booking.address}
                      </div>
                      <div className="flex gap-2">
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                           {booking.numCats} Cats
                        </span>
                        <span className="bg-blue-100 text-brand-blue text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                           {booking.frequency}x / Week
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Archive"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, booking.status === 'contacted' ? 'pending' : 'contacted')}
                      className={`p-2 transition-all rounded-xl ${booking.status === 'contacted' ? 'text-brand-green bg-green-50' : 'text-gray-300 hover:text-brand-green hover:bg-green-50'}`}
                      title={booking.status === 'contacted' ? "Mark as Pending" : "Mark as Contacted"}
                    >
                      <CheckCircle size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
