
import React, { useState, useEffect } from 'react';
import { OrderStatus, BotProduct, Order } from './types';
import { BOTS, BINANCE_PAY_ID, USDT_ADDRESS } from './constants';

// --- COMPONENTS ---

const Navbar: React.FC<{ setView: (v: 'home' | 'tutorial' | 'admin') => void, currentView: string }> = ({ setView, currentView }) => (
  <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
      <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <svg className="text-white w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
      </div>
      <span className="font-bold text-xl tracking-tight hidden sm:block text-white">MOROCCO <span className="text-emerald-500">AI BOT</span></span>
    </div>
    <div className="flex items-center gap-6">
      <button onClick={() => setView('home')} className={`text-sm font-medium hover:text-emerald-400 transition ${currentView === 'home' ? 'text-emerald-500' : 'text-slate-300'}`}>Home</button>
      <button onClick={() => setView('tutorial')} className={`text-sm font-medium hover:text-emerald-400 transition ${currentView === 'tutorial' ? 'text-emerald-500' : 'text-slate-300'}`}>How to Install</button>
      <button onClick={() => setView('admin')} className={`text-sm font-medium px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-800 transition ${currentView === 'admin' ? 'bg-slate-800 text-white' : 'text-slate-300'}`}>Admin</button>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <header className="relative py-20 lg:py-32 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -z-10"></div>
    <div className="container mx-auto px-6 text-center">
      <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-400/10 border border-emerald-400/20 rounded-full">
        #1 AI Trading Bot in Morocco 🇲🇦
      </div>
      <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight text-white">
        Automate Your Trading <br />
        <span className="gradient-text">With Moroccan Intelligence</span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
        Professional MT4 and MT5 Expert Advisors designed for maximum profitability and minimum risk. Trusted by traders across Casablanca, Rabat, and Marrakech.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#pricing" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition transform hover:scale-105 shadow-xl shadow-emerald-500/20">
          View Pricing & Features
        </a>
        <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition">
          See Live Results
        </button>
      </div>
    </div>
  </header>
);

const Pricing: React.FC<{ onPurchase: (bot: BotProduct) => void }> = ({ onPurchase }) => (
  <section id="pricing" className="py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Choose Your Solution</h2>
        <p className="text-slate-400">All bots come with lifetime licenses and installation support.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {BOTS.map((bot) => (
          <div key={bot.id} className="relative group p-1 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-900 overflow-hidden transition transform hover:-translate-y-2">
            <div className="bg-slate-900 rounded-2xl p-8 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-white">{bot.name}</h3>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white uppercase">{bot.type}</span>
                </div>
                <div className="text-3xl font-bold text-emerald-400">${bot.price}</div>
              </div>
              <p className="text-slate-400 text-sm mb-6 flex-grow">{bot.description}</p>
              <ul className="space-y-3 mb-8">
                {bot.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => onPurchase(bot)} className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition shadow-lg">Buy Now via Binance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const OrderModal: React.FC<{ bot: BotProduct, onClose: () => void, onSubmit: (d: any) => void }> = ({ bot, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [txId, setTxId] = useState('');
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Secure Checkout</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-6">
          <p className="text-sm font-semibold text-emerald-400 mb-1">Payment Instructions:</p>
          <p className="text-xs text-slate-300">Send <span className="text-white font-bold">${bot.price} USDT</span> to Binance:</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded text-xs"><span className="text-slate-500">Binance Pay ID:</span><span className="font-mono text-white">{BINANCE_PAY_ID}</span></div>
            <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded text-xs"><span className="text-slate-500">USDT (TRC20):</span><span className="font-mono text-white">{USDT_ADDRESS}</span></div>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ botId: bot.id, userName: name, userEmail: email, binanceTxId: txId }); }} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white" required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white" required />
          <input type="text" placeholder="Binance TxID" value={txId} onChange={e => setTxId(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white" required />
          <button type="submit" className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl mt-4 hover:bg-emerald-600 transition">Confirm Payment Sent</button>
        </form>
      </div>
    </div>
  );
};

const Tutorial: React.FC = () => (
  <div className="container mx-auto px-6 py-20">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-white">How to Install Your AI Bot</h1>
      <div className="space-y-12 mt-10">
        {[
          { t: "Download the File", d: "Get the .ex4 or .ex5 file from 'My Purchases'." },
          { t: "Open MetaTrader Data Folder", d: "Go to File -> Open Data Folder in MT4/MT5." },
          { t: "Paste the Bot File", d: "Put the file in MQL4/Experts or MQL5/Experts/Advisors." },
          { t: "Refresh and Activate", d: "Right-click Expert Advisors in the Navigator and Refresh." },
          { t: "Enable Algo Trading", d: "Click the Algo Trading button and allow DLL imports in settings." }
        ].map((step, i) => (
          <div key={i} className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-xl text-white">{i+1}</div>
            <div><h3 className="text-2xl font-bold mb-2 text-white">{step.t}</h3><p className="text-slate-400">{step.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AdminDashboard: React.FC<{ orders: Order[], onUpdate: (id: string, s: OrderStatus) => void }> = ({ orders, onUpdate }) => (
  <div className="container mx-auto px-6 py-20">
    <h1 className="text-3xl font-bold mb-10 text-white">Admin Control Panel</h1>
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-800/50 text-xs font-bold uppercase text-slate-400">
          <tr><th className="px-6 py-4">User</th><th className="px-6 py-4">Bot</th><th className="px-6 py-4">TxID</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {orders.map(o => (
            <tr key={o.id} className="text-sm">
              <td className="px-6 py-4 text-white">{o.userName}<br/><span className="text-xs text-slate-500">{o.userEmail}</span></td>
              <td className="px-6 py-4 text-slate-300">{o.botId}</td>
              <td className="px-6 py-4 font-mono text-xs text-slate-400">{o.binanceTxId}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${o.status === OrderStatus.APPROVED ? 'text-emerald-400' : 'text-amber-400'}`}>{o.status}</span>
              </td>
              <td className="px-6 py-4 text-right">
                {o.status === OrderStatus.PENDING && (
                  <button onClick={() => onUpdate(o.id, OrderStatus.APPROVED)} className="bg-emerald-600 px-3 py-1 rounded text-white text-xs">Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- MAIN APP ---

const App: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<BotProduct | null>(null);
  const [view, setView] = useState<'home' | 'tutorial' | 'admin'>('home');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('morocco_ai_orders');
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('morocco_ai_orders', JSON.stringify(newOrders));
  };

  const createOrder = (orderData: any) => {
    const newOrder: Order = { ...orderData, id: Math.random().toString(36).substr(2, 9), status: OrderStatus.PENDING, createdAt: Date.now() };
    saveOrders([...orders, newOrder]);
    setSelectedBot(null);
    alert("Payment submitted for Morocco Admin approval!");
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    saveOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar setView={setView} currentView={view} />
      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero />
            <Pricing onPurchase={setSelectedBot} />
            <section className="py-20 bg-slate-900/50">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12 text-white">My Purchases</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {orders.map(o => (
                    <div key={o.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-left">
                      <h3 className="font-bold text-white">Bot: {o.botId}</h3>
                      <p className="text-xs text-slate-400 mt-1">Tx: {o.binanceTxId}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-500">{o.status}</span>
                        {o.status === OrderStatus.APPROVED && (
                          <button onClick={() => alert("Downloading bot file...")} className="bg-emerald-600 text-white px-4 py-2 rounded text-xs">Download File</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        {view === 'tutorial' && <Tutorial />}
        {view === 'admin' && <AdminDashboard orders={orders} onUpdate={updateOrderStatus} />}
      </main>
      {selectedBot && <OrderModal bot={selectedBot} onClose={() => setSelectedBot(null)} onSubmit={createOrder} />}
      <footer className="py-10 border-t border-slate-800 text-center text-slate-500 text-xs">
        © 2024 AI Trading Bot Morocco. Professional MT4/MT5 Solutions.
      </footer>
    </div>
  );
};

export default App;
