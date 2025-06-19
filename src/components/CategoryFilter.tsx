
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const categories = [
  'All', 'Photography', 'Design', 'Architecture', 'Food', 'Fashion', 'Travel', 'Art', 'Nature'
];

export const CategoryFilter = () => {
  const { activeCategory, setActiveCategory, allPins, setFilteredPins, searchQuery } = useAppContext();

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    console.log('Selected category:', category);
    
    // Filter pins based on category and current search query
    let filtered = allPins;
    
    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(pin => 
        pin.title.toLowerCase().includes(category.toLowerCase()) ||
        pin.description?.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Apply search query filter if exists
    if (searchQuery.trim()) {
      filtered = filtered.filter(pin =>
        pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredPins(filtered);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(category)}
          className={`rounded-full transition-all duration-200 ${
            activeCategory === category 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'hover:bg-gray-100'
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
