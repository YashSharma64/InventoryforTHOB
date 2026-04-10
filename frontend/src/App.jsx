import React, { useState, useEffect } from 'react';

// --- COMPONENTS ---

const Sidebar = ({ activeTab }) => {
  const navItems = [
    { name: 'Inventory', active: true },
    { name: 'Assets (future)', active: false },
    { name: 'Materials (future)', active: false },
    { name: 'Template', active: false }
  ];

  return (
    <aside className="w-64 flex flex-col pt-12 relative flex-shrink-0">
      <div className="pl-12 mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-[#F28B59]">thob</h1>
      </div>
      <div className="bg-[#FAEBE4] flex-1 rounded-tr-[40px] pt-12 pl-12 flex flex-col gap-8 shadow-sm">
        {navItems.map((item, i) => (
          <div 
            key={i} 
            className={`cursor-pointer transition-colors ${
              (item.active || activeTab === item.name) 
                ? 'text-gray-900 font-medium' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </aside>
  );
};

const Header = ({ onAddClick }) => (
  <header className="border-y border-[#E5DFD9] py-5 flex items-center justify-between mb-8 relative">
    <div className="flex-1 flex justify-center pr-32">
      <h2 className="text-2xl text-[#9C9A98]">Inventory</h2>
    </div>
    <button 
      onClick={onAddClick}
      className="absolute right-0 bg-[#FCAE8F] text-gray-900 px-6 py-2 rounded font-medium hover:bg-[#faa17d] transition-colors shadow-sm"
    >
      + Add items
    </button>
  </header>
);

const FilterBar = ({ filter, setFilter }) => (
  <div className="flex gap-8 mb-6 border-b border-[#EAE3DE]">
    {['All', 'Completed', 'In Progress'].map(f => (
      <button 
        key={f}
        onClick={() => setFilter(f)}
        className={`pb-3 font-medium transition-colors border-b-2 pt-1 px-1 -mb-[1px] ${
          filter === f 
            ? 'border-gray-900 text-gray-900' 
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        {f}
      </button>
    ))}
  </div>
);

const Card = ({ item, onMarkCompleted }) => {
  // Ensure metadata exists to avoid crashes
  const metadata = item.metadata || {};
  const status = metadata.progress_status || 'in_progress';
  const type = metadata.type || 'Unknown';
  const isCompleted = status === 'completed';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#EAE3DE] flex flex-col transition-all hover:shadow-md">
      {item.thumbnail && (
        <div className="h-40 w-full mb-4 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block mt-2">
            {type.replace('_', ' ')}
          </span>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize whitespace-nowrap ${
          isCompleted 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
        }`}>
          {status.replace('_', ' ')}
        </span>
      </div>
      
      <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3 overflow-hidden">
        {item.description}
      </p>
      
      {!isCompleted ? (
        <button 
          onClick={() => onMarkCompleted(item.id)}
          className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium transition-colors text-sm"
        >
          Mark Completed
        </button>
      ) : (
        <button 
          onClick={() => window.open(metadata.builder_link || 'https://example.com', '_blank')}
          className="w-full py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium transition-colors text-sm"
        >
          View Asset
        </button>
      )}
    </div>
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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => setFormData({ title: '', description: '', type: '3d_model', thumbnail: '', builder_link: '' }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200 custom-scrollbar">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#FFFCF1]/50">
          <h3 className="font-semibold text-lg text-gray-900">Add New Item</h3>
          <button onClick={onClose} disabled={isSubmitting} className="text-gray-400 hover:text-gray-600 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" required disabled={isSubmitting} value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FCAE8F] transition-shadow bg-gray-50 disabled:opacity-50"
              placeholder="e.g. Ergonomic Keyboard"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              value={formData.description} disabled={isSubmitting} onChange={e => setFormData({...formData, description: e.target.value})}
              rows="3" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FCAE8F] transition-shadow bg-gray-50 resize-none disabled:opacity-50"
              placeholder="Details about the item..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              value={formData.type} disabled={isSubmitting} onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FCAE8F] transition-shadow bg-gray-50 disabled:opacity-50"
            >
              <option value="3d_model">3D Model</option>
              <option value="material">Material</option>
              <option value="template">Template</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL <span className="text-gray-400 font-normal ml-1">(Optional)</span>
            </label>
            <input 
              type="url" disabled={isSubmitting} value={formData.thumbnail}
              onChange={e => setFormData({...formData, thumbnail: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FCAE8F] transition-shadow bg-gray-50 disabled:opacity-50"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Builder Link <span className="text-gray-400 font-normal ml-1">(Optional)</span>
            </label>
            <input 
              type="url" disabled={isSubmitting} value={formData.builder_link}
              onChange={e => setFormData({...formData, builder_link: e.target.value})}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FCAE8F] transition-shadow bg-gray-50 disabled:opacity-50"
              placeholder="https://thob.builder/asset-id"
            />
          </div>
          <button 
            type="submit" disabled={isSubmitting}
            className="w-full bg-[#F28B59] text-white font-medium py-3 rounded-lg mt-4 hover:bg-[#e27e4e] transition-colors shadow-md shadow-[#F28B59]/20 disabled:opacity-70 flex justify-center items-center h-12"
          >
            {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Create Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- MAIN APP ENTRY ---

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
    // 1. Optimistic UI update
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

    // 2. Perform Backend Call
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
      // Silently succeed, as optimistic update is already placed
    } catch (error) {
      console.error("Failed to mark completed:", error);
      alert("Failed to update status on the server. Reverting.");
      setItems(prevItems); // Revert UI
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
      await fetchInventory(); // Refresh true state from backend
    } catch (error) {
      console.error("Failed to create item:", error);
      alert("Error creating item. Check connection and CORS configuration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = items.filter(item => {
    const status = item.metadata?.progress_status || 'in_progress';
    if (filter === 'All') return true;
    if (filter === 'Completed') return status === 'completed';
    if (filter === 'In Progress') return status === 'in_progress';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFCF1] flex font-sans text-gray-900">
      <Sidebar activeTab="Inventory" />
      
      <main className="flex-1 flex flex-col pt-16 px-16 max-w-6xl w-full">
        <Header onAddClick={() => setModalOpen(true)} />
        <FilterBar filter={filter} setFilter={setFilter} />

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center pb-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCAE8F]"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-gray-500 border border-dashed border-[#EAE3DE] rounded-xl font-medium">
            No items found. Click "+ Add items" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {filteredItems.map(item => (
              <Card 
                key={item.id} 
                item={item} 
                onMarkCompleted={handleMarkCompleted} 
              />
            ))}
          </div>
        )}
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
