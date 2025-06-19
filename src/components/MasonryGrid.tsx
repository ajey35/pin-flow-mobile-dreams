
import React, { useState, useEffect } from 'react';
import { PinCard } from '@/components/PinCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { generatePinData } from '@/utils/generatePinData';
import { useAppContext } from '@/contexts/AppContext';
import { Loader2, Search } from 'lucide-react';

export const MasonryGrid = () => {
  const { filteredPins, setFilteredPins, allPins, setAllPins, searchQuery, activeCategory } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMorePins = async () => {
    if (loading) return;
    
    setLoading(true);
    console.log('Loading more pins...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPins = generatePinData(24);
    const updatedAllPins = [...allPins, ...newPins];
    setAllPins(updatedAllPins);
    
    // Apply current filters to the updated pins
    let filtered = updatedAllPins;
    
    if (activeCategory !== 'All') {
      filtered = filtered.filter(pin => 
        pin.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
        pin.description?.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(pin =>
        pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredPins(filtered);
    setLoading(false);
    setInitialLoading(false);
  };

  useInfiniteScroll(loadMorePins);

  useEffect(() => {
    // Load initial pins only if we don't have any
    if (allPins.length === 0) {
      loadMorePins();
    } else {
      setInitialLoading(false);
    }
  }, []);

  const pinsToDisplay = filteredPins.length > 0 || searchQuery || activeCategory !== 'All' ? filteredPins : allPins;

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-red-500 mb-4" />
        <p className="text-gray-600 text-lg">Loading amazing pins for you...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-6 space-y-6">
        {pinsToDisplay.map((pin, index) => (
          <div 
            key={`${pin.id}-${index}`} 
            className="animate-fade-in"
            style={{ animationDelay: `${(index % 20) * 50}ms` }}
          >
            <PinCard pin={pin} />
          </div>
        ))}
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-lg">
            <Loader2 className="w-5 h-5 animate-spin text-red-500" />
            <span className="text-gray-600 font-medium">Loading more pins...</span>
          </div>
        </div>
      )}
      
      {/* No Results State */}
      {pinsToDisplay.length === 0 && !loading && (searchQuery || activeCategory !== 'All') && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No pins found</h3>
          <p className="text-gray-600 text-center max-w-md">
            Try searching for something else or browse our trending categories to discover new ideas
          </p>
        </div>
      )}
    </div>
  );
};
