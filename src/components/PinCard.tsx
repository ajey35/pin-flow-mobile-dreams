
import React, { useState } from 'react';
import { Heart, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PinDetailModal } from '@/components/PinDetailModal';

interface PinCardProps {
  pin: {
    id: string;
    imageUrl: string;
    title: string;
    description?: string;
    author: {
      name: string;
      avatar: string;
    };
    likes: number;
    isLiked: boolean;
    isSaved: boolean;
  };
}

export const PinCard: React.FC<PinCardProps> = ({ pin }) => {
  const [isLiked, setIsLiked] = useState(pin.isLiked);
  const [isSaved, setIsSaved] = useState(pin.isSaved);
  const [likesCount, setLikesCount] = useState(pin.likes);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card 
        className="break-inside-avoid mb-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative">
          <img 
            src={pin.imageUrl} 
            alt={pin.title}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute top-3 right-3 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleSave}
                className={`rounded-full transition-all duration-200 shadow-lg ${
                  isSaved ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white/95 hover:bg-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            {/* Quick actions on hover */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img 
                  src={pin.author.avatar} 
                  alt={pin.author.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
                <span className="text-white text-sm font-medium drop-shadow">{pin.author.name}</span>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLike}
                className="p-1 hover:bg-white/20 rounded-full"
              >
                <Heart 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                  }`} 
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Pin Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors duration-200">
            {pin.title}
          </h3>
          
          {pin.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{pin.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src={pin.author.avatar} 
                alt={pin.author.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-gray-600 font-medium">{pin.author.name}</span>
            </div>

            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">{likesCount}</span>
              <Heart 
                className={`w-4 h-4 transition-colors duration-200 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`} 
              />
            </div>
          </div>
        </div>
      </Card>

      <PinDetailModal 
        pin={pin}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
