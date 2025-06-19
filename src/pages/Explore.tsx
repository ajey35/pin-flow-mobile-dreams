
import React, { useState, useEffect } from 'react';
import { MasonryGrid } from '@/components/MasonryGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Camera, Palette, Home, Plane, Coffee, Heart } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const trendingCategories = [
  { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop', icon: Home, color: 'bg-blue-500' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop', icon: Heart, color: 'bg-pink-500' },
  { name: 'Travel', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop', icon: Plane, color: 'bg-green-500' },
  { name: 'Food', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop', icon: Coffee, color: 'bg-orange-500' },
  { name: 'Photography', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop', icon: Camera, color: 'bg-purple-500' },
  { name: 'Art', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop', icon: Palette, color: 'bg-red-500' },
];

const trendingSearches = [
  'minimalist design', 'cozy home', 'nature photography', 'healthy recipes',
  'travel destinations', 'modern architecture', 'vintage fashion', 'art inspiration'
];

export const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [exploreQuery, setExploreQuery] = useState('');
  const { setSearchQuery, setActiveCategory, setFilteredPins, allPins } = useAppContext();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveCategory(categoryName);
    setSearchQuery('');
    
    // Filter pins by category
    const filtered = allPins.filter(pin => 
      pin.title.toLowerCase().includes(categoryName.toLowerCase()) ||
      pin.description?.toLowerCase().includes(categoryName.toLowerCase())
    );
    setFilteredPins(filtered);
  };

  const handleTrendingSearch = (query: string) => {
    setExploreQuery(query);
    setSearchQuery(query);
    setActiveCategory('All');
    setSelectedCategory('');
    
    // Filter pins by search query
    const filtered = allPins.filter(pin =>
      pin.title.toLowerCase().includes(query.toLowerCase()) ||
      pin.description?.toLowerCase().includes(query.toLowerCase()) ||
      pin.author.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPins(filtered);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exploreQuery.trim()) {
      handleTrendingSearch(exploreQuery);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setExploreQuery('');
    setSearchQuery('');
    setActiveCategory('All');
    setFilteredPins([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Ideas</h1>
        <p className="text-xl text-gray-600 mb-8">Discover inspiration for your next project</p>
        
        {/* Enhanced Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for ideas, trends, or inspiration..."
              value={exploreQuery}
              onChange={(e) => setExploreQuery(e.target.value)}
              className="pl-12 pr-4 py-4 w-full text-lg border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-lg"
            />
          </div>
        </form>

        {/* Trending Searches */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-semibold text-gray-700">Trending Searches</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingSearches.map((search) => (
              <Button
                key={search}
                variant="outline"
                size="sm"
                onClick={() => handleTrendingSearch(search)}
                className="rounded-full text-sm px-4 py-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all duration-200"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trendingCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.name}
                className="relative rounded-2xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => handleCategorySelect(category.name)}
              >
                <div className="aspect-square">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-center group-hover:scale-105 transition-transform duration-300">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Active Filter Display */}
      {(selectedCategory || exploreQuery) && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-2xl">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategory ? `${selectedCategory} Ideas` : `Results for "${exploreQuery}"`}
              </h2>
              <p className="text-gray-600">Explore curated pins and ideas</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearFilters}
              className="rounded-full px-6 py-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
      
      {/* Masonry Grid */}
      <MasonryGrid />
    </div>
  );
};
