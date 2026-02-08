
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Tutorial from './components/Tutorial';
import OrderModal from './components/OrderModal';
import AdminDashboard from './components/AdminDashboard';
import { BotProduct, Order, OrderStatus } from './types';

const App: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<BotProduct | null>(null);
  const [view, setView] = useState<'home' | 'tutorial' | 'admin'>('home');
  const [orders, setOrders] = useState<Order[]>([]);

  // Simulate persistent orders in localStorage for demo
  useEffect(() => {
    const savedOrders = localStorage.getItem('morocco_ai_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('morocco_ai_orders', JSON.stringify(newOrders));
  };

  const handlePurchase = (bot: BotProduct) => {
    setSelectedBot(bot);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      status: OrderStatus.PENDING,
      createdAt: Date.now()
    };
    saveOrders([...orders, newOrder]);
    setSelectedBot(null);
    alert("Payment submitted! Our admin will verify your transaction shortly. Please check the 'My Purchases' section in a moment.");
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const newOrders = orders.map(o => o.id === orderId ? { ...o, status } : o);
    saveOrders(newOrders);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setView={setView} currentView={view} />

      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero />
            <Pricing onPurchase={handlePurchase} orders={orders} />
            
            {/* User's Active Downloads Section */}
            <section id="purchases" className="py-20 bg-slate-900/50">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">My Purchases (Morocco)</h2>
                {orders.length === 0 ? (
                  <p className="text-slate-400">You haven't purchased any bots yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map(order => (
                      <div key={order.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-left">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-lg">Order #{order.id}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            order.status === OrderStatus.APPROVED ? 'bg-emerald-500/20 text-emerald-400' : 
                            order.status === OrderStatus.PENDING ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">Transaction: {order.binanceTxId}</p>
                        {order.status === OrderStatus.APPROVED ? (
                          <button 
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-semibold transition flex items-center justify-center gap-2"
                            onClick={() => window.open('https://picsum.photos/200', '_blank')}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Download Bot File
                          </button>
                        ) : (
                          <p className="text-center text-slate-500 italic text-sm">Waiting for Admin to confirm payment...</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {view === 'tutorial' && <Tutorial />}
        
        {view === 'admin' && (
          <AdminDashboard 
            orders={orders} 
            onUpdateStatus={updateOrderStatus} 
          />
        )}
      </main>

      {selectedBot && (
        <OrderModal 
          bot={selectedBot} 
          onClose={() => setSelectedBot(null)} 
          onSubmit={createOrder} 
        />
      )}

      <footer className="py-10 border-t border-slate-800 text-center text-slate-500">
        <p>© 2024 AI Trading Bot Morocco. Specialized in MT4 & MT5 solutions.</p>
        <p className="text-xs mt-2">Trading carries risks. Please trade responsibly.</p>
      </footer>
    </div>
  );
};

export default App;
