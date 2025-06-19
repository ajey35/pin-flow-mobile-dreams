
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  'All', 'Photography', 'Design', 'Architecture', 'Food', 'Fashion', 'Travel', 'Art', 'Nature'
];

export const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(category)}
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
