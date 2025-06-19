
import React, { useState, useEffect } from 'react';
import { PinCard } from '@/components/PinCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { generatePinData } from '@/utils/generatePinData';

export const MasonryGrid = () => {
  const [pins, setPins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMorePins = async () => {
    if (loading) return;
    
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPins = generatePinData(20);
    setPins(prev => [...prev, ...newPins]);
    setLoading(false);
  };

  useInfiniteScroll(loadMorePins);

  useEffect(() => {
    loadMorePins();
  }, []);

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
      {pins.map((pin, index) => (
        <PinCard key={`${pin.id}-${index}`} pin={pin} />
      ))}
      
      {loading && (
        <div className="col-span-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      )}
    </div>
  );
};
