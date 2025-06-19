
import React from 'react';
import { MasonryGrid } from '@/components/MasonryGrid';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';

export const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8 space-y-4">
        <SearchBar />
        <CategoryFilter />
      </div>
      <MasonryGrid />
    </div>
  );
};
