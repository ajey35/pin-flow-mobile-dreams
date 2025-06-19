
import React, { useState, useEffect } from 'react';
import { PinCard } from '@/components/PinCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { generatePinData } from '@/utils/generatePinData';
import { useAppContext } from '@/contexts/AppContext';

export const MasonryGrid = () => {
  const { filteredPins, setFilteredPins, allPins, setAllPins, searchQuery, activeCategory } = useAppContext();
  const [loading, setLoading] = useState(false);

  const loadMorePins = async () => {
    if (loading) return;
    
    setLoading(true);
    console.log('Loading more pins...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPins = generatePinData(20);
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
  };

  useInfiniteScroll(loadMorePins);

  useEffect(() => {
    // Load initial pins only if we don't have any
    if (allPins.length === 0) {
      loadMorePins();
    }
  }, []);

  const pinsToDisplay = filteredPins.length > 0 || searchQuery || activeCategory !== 'All' ? filteredPins : allPins;

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
      {pinsToDisplay.map((pin, index) => (
        <PinCard key={`${pin.id}-${index}`} pin={pin} />
      ))}
      
      {loading && (
        <div className="col-span-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      )}
      
      {pinsToDisplay.length === 0 && !loading && (searchQuery || activeCategory !== 'All') && (
        <div className="col-span-full flex justify-center py-12">
          <div className="text-center text-gray-500">
            <p className="text-lg mb-2">No pins found</p>
            <p className="text-sm">Try searching for something else or changing the category</p>
          </div>
        </div>
      )}
    </div>
  );
};
