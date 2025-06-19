
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/AppContext';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, allPins, setFilteredPins, activeCategory } = useAppContext();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    
    // Filter pins based on search query and active category
    let filtered = allPins;
    
    // Filter by category first
    if (activeCategory !== 'All') {
      filtered = filtered.filter(pin => 
        pin.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
        pin.description?.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }
    
    // Then filter by search query
    if (query.trim()) {
      filtered = filtered.filter(pin =>
        pin.title.toLowerCase().includes(query.toLowerCase()) ||
        pin.description?.toLowerCase().includes(query.toLowerCase()) ||
        pin.author.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredPins(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for ideas..."
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
            handleSearch(value);
          }}
          className="pl-10 pr-4 py-3 w-full text-lg border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>
    </form>
  );
};
