

import React from 'react';
import SearchBar from './components/SearchBar'; 

function App() {
  
  const mockSearchFunction = (query) => {
    console.log(`[SANDBOX] Search Initiated with query: ${query}`);
    alert(`Searching for: ${query}`); 
    
  };

  return (
    
    <div className="min-h-screen bg-slate-950 text-white font-sans p-10">
      <h1 className="text-3xl font-bold mb-8">SearchBar Sandbox View</h1>
      
      
      <SearchBar onSearch={mockSearchFunction} />
      
      <p className="mt-4 text-slate-400">
        (Check your browser's console after submitting a search query)
      </p>
    </div>
  );
}

export default App;