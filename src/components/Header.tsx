
import React, { useState } from 'react';
import { Search, User, Heart, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { ProfileDropdown } from '@/components/ProfileDropdown';

export const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Pinspire</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="font-medium">Home</Button>
            <Button variant="ghost" className="font-medium">Explore</Button>
            <Button variant="ghost" className="font-medium">Create</Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
            
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </header>
  );
};
