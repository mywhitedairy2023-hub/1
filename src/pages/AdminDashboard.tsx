import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Order {
  id: string;
  customerName: string;
  item: string;
  quantity: string;
  status: 'Pending' | 'Completed';
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  // Pull orders from client storage dynamically on view authorization change
  useEffect(() => {
    if (isAuthenticated) {
      const loadedOrders = JSON.parse(localStorage.getItem('white_dairy_orders') || '[]');
      setOrders(loadedOrders);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'WhiteDairy2026!') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin credentials.');
    }
  };

  const toggleOrderStatus = (id: string) => {
    const updatedOrders = orders.map(order => 
      order.id === id 
        ? { ...order, status: (order.status === 'Pending' ? 'Completed' : 'Pending') as 'Pending' | 'Completed' } 
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('white_dairy_orders', JSON.stringify(updatedOrders));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin} 
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">White Dairy Admin Login</h2>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-xl outline-none focus:border-cyan-500 text-gray-800"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-xl outline-none focus:border-cyan-500 text-gray-800"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white font-semibold rounded-xl shadow-lg cursor-pointer">
            Login
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6 pb-20">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Incoming Dairy Orders</h1>
          <button 
            onClick={() => {
              setIsAuthenticated(false);
              setUsername('');
              setPassword('');
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-medium">
              No orders have been placed yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                    <th className="p-4 w-24">Order ID</th>
                    <th className="p-4 w-1/3">Customer & Logistics Details</th>
                    <th className="p-4">Product Details</th>
                    <th className="p-4 text-center w-28">Status</th>
                    <th className="p-4 text-right w-44">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-semibold text-gray-800">#{order.id}</td>
                      <td className="p-4 text-sm text-gray-700 leading-relaxed break-words">{order.customerName}</td>
                      <td className="p-4 text-sm text-gray-600 font-medium">
                        {order.item} <span className="ml-1 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">Total items: {order.quantity}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => toggleOrderStatus(order.id)}
                          className={`px-4 py-1.5 border rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            order.status === 'Pending' 
                              ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' 
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          Mark as {order.status === 'Pending' ? 'Completed' : 'Pending'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}