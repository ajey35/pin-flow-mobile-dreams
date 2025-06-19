
import React, { useState } from 'react';
import { Search, User, Heart, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Pinspire</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button 
                variant="ghost" 
                className={`font-medium ${isActive('/') ? 'bg-gray-100' : ''}`}
              >
                Home
              </Button>
            </Link>
            <Link to="/explore">
              <Button 
                variant="ghost" 
                className={`font-medium ${isActive('/explore') ? 'bg-gray-100' : ''}`}
              >
                Explore
              </Button>
            </Link>
            <Link to="/create">
              <Button 
                variant="ghost" 
                className={`font-medium ${isActive('/create') ? 'bg-gray-100' : ''}`}
              >
                Create
              </Button>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/create">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="w-4 h-4 mr-1" />
                Create
              </Button>
            </Link>
            
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
