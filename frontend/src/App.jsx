import { useState } from 'react';

function App() {
  const [items, setItems] = useState([
    { id: 1, title: 'MacBook Pro 16"', type: 'Electronics', status: 'completed', desc: 'M3 Max, 64GB RAM' },
    { id: 2, title: 'Herman Miller Chair', type: 'Furniture', status: 'in_progress', desc: 'Aeron Office Chair' },
    { id: 3, title: 'Figma Enterprise', type: 'Software', status: 'completed', desc: 'Annual seat license' },
    { id: 4, title: 'Standing Desk', type: 'Furniture', status: 'in_progress', desc: 'Motorized standing desk' },
    { id: 5, title: 'External Monitor', type: 'Electronics', status: 'completed', desc: '27" 4K Display' },
  ]);

  const [filter, setFilter] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);
  
  const [newItem, setNewItem] = useState({
    title: '',
    desc: '',
    type: 'Electronics'
  });

  const markCompleted = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, status: 'completed' } : item));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.title) return;
    
    setItems([{
      id: Date.now(),
      title: newItem.title,
      desc: newItem.desc,
      type: newItem.type,
      status: 'in_progress'
    }, ...items]);
    
    setModalOpen(false);
    setNewItem({ title: '', desc: '', type: 'Electronics' });
  };

  const filteredItems = items.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return item.status === 'completed';
    if (filter === 'In Progress') return item.status === 'in_progress';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFCF1] flex font-sans text-gray-900">
      
      {/* Sidebar Area */}
      <div className="w-64 flex flex-col pt-12 relative">
        {/* thob logo */}
        <div className="pl-12 mb-8">
          <h1 className="text-3xl font-medium tracking-tight text-[#F28B59]">thob</h1>
        </div>

        {/* Sidebar Navigation */}
        <div className="bg-[#FAEBE4] flex-1 rounded-tr-[40px] pt-12 pl-12 flex flex-col gap-8 shadow-sm">
          <div className="text-gray-900 font-medium cursor-pointer relative">
            Inventory
            {/* Active indicator dot can be added if needed, but styling is minimal */}
          </div>
          <div className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">Assets (future)</div>
          <div className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">Materials (future)</div>
          <div className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">Template</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pt-16 px-16 max-w-6xl">
        
        {/* Top Header */}
        <div className="border-y border-[#E5DFD9] py-5 flex items-center justify-between mb-8 relative">
          <div className="flex-1 flex justify-center pr-32">
            <h2 className="text-2xl text-[#9C9A98]">Inventory</h2>
          </div>
          <button 
            onClick={() => setModalOpen(true)}
            className="absolute right-0 bg-[#FCAE8F] text-gray-900 px-6 py-2 rounded font-medium hover:bg-[#faa17d] transition-colors shadow-sm"
          >
            + Add items
          </button>
        </div>

        {/* Filter Bar */}
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

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#EAE3DE] flex flex-col transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block mt-2">{item.type}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  item.status === 'completed' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                }`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>
              
              <p className="text-gray-500 text-sm mb-6 flex-1">{item.desc}</p>
              
              {item.status === 'in_progress' ? (
                <button 
                  onClick={() => markCompleted(item.id)}
                  className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium transition-colors text-sm"
                >
                  Mark Completed
                </button>
              ) : (
                <button className="w-full py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium transition-colors text-sm">
                  View Asset
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#FFFCF1]/50">
              <h3 className="font-semibold text-lg text-gray-900">Add New Item</h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={addItem} className="px-6 py-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FCAE8F] focus:border-transparent transition-shadow bg-gray-50"
                  placeholder="e.g. Ergonomic Keyboard"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={newItem.desc}
                  onChange={(e) => setNewItem({...newItem, desc: e.target.value})}
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FCAE8F] focus:border-transparent transition-shadow bg-gray-50 resize-none"
                  placeholder="Details about the item..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select 
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FCAE8F] focus:border-transparent transition-shadow bg-gray-50 appearance-none"
                >
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Software</option>
                  <option>Apparel</option>
                  <option>Other</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#F28B59] text-white font-medium py-3 rounded-lg mt-4 hover:bg-[#e27e4e] transition-colors shadow-md shadow-[#F28B59]/20"
              >
                Create Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
