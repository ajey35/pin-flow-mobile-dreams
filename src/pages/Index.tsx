
import React from 'react';
import { Header } from '@/components/Header';
import { MasonryGrid } from '@/components/MasonryGrid';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { AppProvider } from '@/contexts/AppContext';

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-8 space-y-4">
            <SearchBar />
            <CategoryFilter />
          </div>
          <MasonryGrid />
        </main>
      </div>
    </AppProvider>
  );
};

export default Index;
