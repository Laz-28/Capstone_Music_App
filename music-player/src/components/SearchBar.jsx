import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md relative flex items-center">
      <Search className="absolute left-3 text-slate-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for artist, song, or album..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-slate-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-lg placeholder-slate-500"
      />
      <button 
        type="submit" 
        className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;