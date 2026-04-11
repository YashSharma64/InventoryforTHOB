import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const Sidebar = ({ activeTab }) => {
  const navItems = [
    { name: 'Inventory', active: true },
    { name: 'Assets (future)', active: false },
    { name: 'Materials (future)', active: false },
    { name: 'Template', active: false }
  ];

  return (
    <aside className="w-64 flex flex-col pt-12 relative flex-shrink-0 bg-[#0B0B0B] border-r border-white/5">
      <div className="pl-12 mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-[#FF7A00] tracking-wider">thob.</h1>
      </div>
      <div className="flex-1 pt-4 pl-12 flex flex-col gap-6">
        {navItems.map((item, i) => {
          const isActive = item.active || activeTab === item.name;
          return (
            <div 
              key={i} 
              className={`group relative cursor-pointer font-medium tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'text-white' 
                  : 'text-[#9CA3AF] hover:text-white hover:opacity-80'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeSidebar"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FF7A00] rounded-r-[2px] shadow-[0_0_10px_rgba(255,122,0,0.5)]"
                />
              )}
              {item.name}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

const Header = ({ onAddClick }) => (
  <header className="pb-6 pt-8 flex items-center justify-between relative">
    <div className="flex-1 flex justify-start">
      <h2 className="text-3xl font-semibold text-white tracking-tight font-sans">Inventory Management</h2>
    </div>
    <motion.button 
      whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(255,122,0,0.3)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onAddClick}
      className="bg-[#111111] border border-white/10 text-white px-6 py-2.5 rounded-[5px] font-medium transition-colors hover:border-[#FF7A00] hover:text-[#FF7A00]"
    >
      + Add Item
    </motion.button>
  </header>
);

const FilterBar = ({ filter, setFilter }) => {
  const tabs = ['All', 'Completed', 'In Progress'];
  
  return (
    <div className="flex gap-8 border-b border-white/5 relative">
      {tabs.map(f => {
        const isActive = filter === f;
        return (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`pb-4 font-medium transition-colors relative ${
              isActive 
                ? 'text-white' 
                : 'text-[#9CA3AF] hover:text-gray-300'
            }`}
          >
            {f}
            {isActive && (
              <motion.div 
                layoutId="activeFilter"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF7A00] shadow-[0_0_8px_rgba(255,122,0,0.8)]"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

const Card = ({ item, onMarkCompleted }) => {
  const metadata = item.metadata || {};
  const status = metadata.progress_status || 'in_progress';
  const type = metadata.type || 'Unknown';
  const isCompleted = status === 'completed';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.15)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-[#111111] rounded-[5px] p-6 shadow-2xl border border-white/5 flex flex-col relative overflow-hidden group"
    >
      {/* Subtle Glow Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {item.thumbnail && (
        <div className="h-44 w-full mb-5 bg-black rounded-[3px] overflow-hidden border border-white/5 flex-shrink-0 relative">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4 z-10">
        <div>
          <h3 className="font-semibold text-xl text-white tracking-tight">{item.title}</h3>
          <span className="text-xs text-[#9CA3AF] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded-[3px] inline-block mt-2 font-medium">
            {type.replace('_', ' ')}
          </span>
        </div>
        <div className={`w-2 h-2 rounded-full mt-2 ${
          isCompleted ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
        }`} title={status === 'not_started' ? 'in_progress' : status} />
      </div>
      
      <p className="text-[#9CA3AF] text-sm mb-8 flex-1 line-clamp-3 overflow-hidden leading-relaxed z-10">
        {item.description}
      </p>
      
      <div className="z-10 mt-auto">
        {!isCompleted ? (
          <motion.button 
            whileHover={{ backgroundColor: '#FF7A00', color: '#000', borderColor: '#FF7A00' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onMarkCompleted(item.id)}
            className="w-full py-2.5 rounded-[5px] border border-white/10 text-[#9CA3AF] font-medium transition-colors text-sm uppercase tracking-wider"
          >
            Mark Completed
          </motion.button>
        ) : (
          <motion.button 
            whileHover={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open(metadata.builder_link || 'https://example.com', '_blank')}
            className="w-full py-2.5 rounded-[5px] bg-white/5 border border-white/10 text-[#9CA3AF] hover:text-white font-medium transition-colors text-sm uppercase tracking-wider shadow-inner"
          >
            View Asset
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

const AddItemModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '3d_model',
    thumbnail: '',
    builder_link: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => setFormData({ title: '', description: '', type: '3d_model', thumbnail: '', builder_link: '' }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="bg-[#111111] rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-semibold text-xl text-white tracking-tight">New Asset</h3>
              <button onClick={onClose} disabled={isSubmitting} className="text-[#9CA3AF] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#9CA3AF] mb-2 uppercase tracking-wide">Title</label>
                <input 
                  type="text" required disabled={isSubmitting} value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-[3px] px-4 py-3 text-white focus:outline-none focus:border-[#FF7A00] transition-colors disabled:opacity-50"
                  placeholder="Asset Name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#9CA3AF] mb-2 uppercase tracking-wide">Description</label>
                <textarea 
                  value={formData.description} disabled={isSubmitting} onChange={e => setFormData({...formData, description: e.target.value})}
                  rows="3" className="w-full bg-[#0B0B0B] border border-white/10 rounded-[3px] px-4 py-3 text-white focus:outline-none focus:border-[#FF7A00] transition-colors resize-none disabled:opacity-50"
                  placeholder="Asset specifications..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#9CA3AF] mb-2 uppercase tracking-wide">Type</label>
                <select 
                  value={formData.type} disabled={isSubmitting} onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-[3px] px-4 py-3 text-white focus:outline-none focus:border-[#FF7A00] transition-colors disabled:opacity-50 appearance-none"
                >
                  <option value="3d_model">3D Model</option>
                  <option value="material">Material</option>
                  <option value="template">Template</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#9CA3AF] mb-2 uppercase tracking-wide">
                  Thumbnail <span className="text-white/30 font-normal ml-1 normal-case">(Optional)</span>
                </label>
                <input 
                  type="url" disabled={isSubmitting} value={formData.thumbnail}
                  onChange={e => setFormData({...formData, thumbnail: e.target.value})}
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-[3px] px-4 py-3 text-white focus:outline-none focus:border-[#FF7A00] transition-colors disabled:opacity-50"
                  placeholder="https://"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#9CA3AF] mb-2 uppercase tracking-wide">
                  Builder Link <span className="text-white/30 font-normal ml-1 normal-case">(Optional)</span>
                </label>
                <input 
                  type="url" disabled={isSubmitting} value={formData.builder_link}
                  onChange={e => setFormData({...formData, builder_link: e.target.value})}
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-[3px] px-4 py-3 text-white focus:outline-none focus:border-[#FF7A00] transition-colors disabled:opacity-50"
                  placeholder="https://"
                />
              </div>
              
              <motion.button 
                whileHover={!isSubmitting ? { backgroundColor: '#FF8A1A' } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                type="submit" disabled={isSubmitting}
                className="w-full bg-[#FF7A00] text-black font-semibold py-3.5 rounded-[3px] mt-6 transition-colors shadow-[0_0_15px_rgba(255,122,0,0.3)] disabled:opacity-70 flex justify-center items-center h-14"
              >
                {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div> : 'Initialize Asset'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:9000/custom/inventory");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      
      const inventoryArray = data.inventory_items || data.inventory || data.products || [];
      setItems(inventoryArray);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleMarkCompleted = async (id) => {
    const prevItems = [...items];
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          metadata: { ...item.metadata, progress_status: 'completed' }
        };
      }
      return item;
    }));

    try {
      const res = await fetch(`http://localhost:9000/custom/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progress_status: "completed",
          builder_link: "https://example.com"
        })
      });
      if (!res.ok) throw new Error("Failed to update on server");
    } catch (error) {
      console.error("Failed to mark completed:", error);
      alert("Failed to update status on the server. Reverting.");
      setItems(prevItems);
    }
  };

  const handleAddItem = async (formData, resetForm) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:9000/custom/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error(await res.text());
      
      resetForm();
      setModalOpen(false);
      await fetchInventory();
    } catch (error) {
      console.error("Failed to create item:", error);
      alert("Error creating item. Check connection and CORS configuration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = items.filter(item => {
    const status = item.metadata?.progress_status || 'not_started';
    if (filter === 'All') return true;
    if (filter === 'Completed') return status === 'completed';
    if (filter === 'In Progress') return status === 'in_progress' || status === 'not_started';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex font-sans text-white overflow-hidden">
      <Sidebar activeTab="Inventory" />
      
      <main className="flex-1 flex flex-col px-20 max-w-7xl relative h-screen overflow-y-auto custom-scrollbar">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FF7A00]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl w-full mx-auto relative z-10 pb-20">
          <div className="sticky top-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-md pt-12 pb-4 mb-8 -mx-2 px-2">
            <Header onAddClick={() => setModalOpen(true)} />
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center py-40">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="rounded-full h-8 w-8 border-t-2 border-[#FF7A00]"
              />
            </div>
          ) : items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-32 text-center text-[#9CA3AF] border border-white/5 rounded-[5px] bg-[#111111]/50 font-medium tracking-wide"
            >
              No assets in orbit. Click "+ Add Item" to initialize one.
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredItems.map(item => (
                  <Card 
                    key={item.id} 
                    item={item} 
                    onMarkCompleted={handleMarkCompleted} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={handleAddItem}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default App;
