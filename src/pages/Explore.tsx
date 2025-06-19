
import React, { useState } from 'react';
import { MasonryGrid } from '@/components/MasonryGrid';
import { Button } from '@/components/ui/button';

const trendingCategories = [
  { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop' },
  { name: 'Travel', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop' },
  { name: 'Food', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop' },
  { name: 'Architecture', image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=300&h=200&fit=crop' },
  { name: 'Art', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop' },
];

export const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Explore</h1>
        <p className="text-gray-600 text-center mb-6">Discover new ideas and inspiration</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {trendingCategories.map((category) => (
            <div 
              key={category.name}
              className="relative rounded-xl overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedCategory(category.name)}
            >
              <img 
                src={category.image}
                alt={category.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white font-semibold text-sm text-center px-2">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedCategory && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Trending in {selectedCategory}</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
      
      <MasonryGrid />
    </div>
  );
};
